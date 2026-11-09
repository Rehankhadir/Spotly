'use strict';

const spotlyCloud = (() => {
  const { url, publishableKey } = window.SPOTLY_SUPABASE;
  const configured = Boolean(url && publishableKey);
  let client;

  async function connect(onSession) {
    if (!client) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
        script.onload = resolve;
        script.onerror = () => {
          script.remove();
          reject(new Error('Could not load Supabase.'));
        };
        document.head.append(script);
      });
      client = window.supabase.createClient(url, publishableKey);
      client.auth.onAuthStateChange((_event, session) => {
        // Run database requests after the auth callback has returned.
        setTimeout(() => onSession(session), 0);
      });
    }
  }

  async function load(userId) {
    const records = [];
    const pageSize = 50;
    for (let offset = 0; ; offset += pageSize) {
      const { data, error } = await client.from('spotly_records')
        .select('kind, record_id, data, revision')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .order('kind')
        .order('record_id')
        .range(offset, offset + pageSize - 1);
      if (error) throw error;
      records.push(...data);
      if (data.length < pageSize) return records;
    }
  }

  async function write(userId, kind, id, data, revision, category) {
    const { data: nextRevision, error } = await client.rpc('spotly_write_record', {
      p_user_id: userId,
      p_kind: kind,
      p_record_id: id,
      p_data: data,
      p_revision: revision ?? null,
      p_category_id: category?.[0] ?? null,
      p_category_data: category ? { choice: category[1] } : null,
    });
    if (error) throw error;
    return nextRevision;
  }

  async function importRecords(userId, snapshot) {
    const now = Date.now();
    const records = [
      ...snapshot.spots.map(spot => ({ kind: 'spot', record_id: spot.id, data: spot })),
      ...snapshot.entries.map(entry => ({ kind: 'entry', record_id: entry.id, data: entry })),
      ...snapshot.categories.map(([id, choice]) => ({ kind: 'category', record_id: id, data: { choice } })),
    ].map((record, index) => ({ ...record, user_id: userId, created_at: new Date(now - index).toISOString() }));
    if (!records.length) return;
    const { error } = await client.from('spotly_records').upsert(records, {
      onConflict: 'user_id,kind,record_id',
      ignoreDuplicates: true,
    });
    if (error) throw error;
  }

  async function signIn(email) {
    const redirect = new URL(location.pathname, location.origin);
    const { error } = await client.auth.signInWithOtp({ email, options: { emailRedirectTo: redirect.href } });
    if (error) throw error;
  }

  async function signOut() {
    const { error } = await client.auth.signOut({ scope: 'local' });
    if (error) throw error;
  }

  return { configured, connect, load, write, importRecords, signIn, signOut };
})();
