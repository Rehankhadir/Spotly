# Spotly

Spotly is a personal travel atlas with a searchable Explore view, a saved-spots collection, an illustrated map, and a journal. Guest mode includes sample destinations. When Supabase is connected, sign in to add spots to your account and access them across devices. Theme preferences stay in the current browser.

## Run locally

Open `index.html` in a browser, or run this command from the project directory and visit [the local preview](http://127.0.0.1:4173/).

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

The illustrated map shows approximate positions for sample destinations. User-added places appear in the location list, and places with a GPS pin can be opened in Google Maps.

## Deploy on Vercel from Git

Push this project to your Git remote and import the repository in Vercel. Select **Other** as the framework preset, keep the root directory at the repository root, enable the **Build Command** override and leave it empty, and set the **Output Directory** to `.`. Vercel serves the static files directly. [Vercel build settings](https://vercel.com/docs/builds/configure-a-build)

## Connect Supabase

1. Run `supabase/migrations/20261109000000_spotly_records.sql` once in the Supabase project's SQL Editor. If your local Supabase CLI is already linked to the project, use `supabase db push` to apply the migration instead.
2. Copy the project URL and **publishable key** into `supabase-config.js`. A legacy **anon** key also works. The browser reads this file directly, so use a public client key. [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys)
3. Enable the email provider in Supabase Auth. Under **URL Configuration**, set the Site URL to the deployed Spotly URL and allow the exact URLs where users will sign in, including `http://127.0.0.1:4173/` for local testing. Keep the magic link email template enabled. Configure custom SMTP to send sign-in links to users outside the Supabase project team. [Auth redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls) · [Custom SMTP](https://supabase.com/docs/guides/auth/auth-smtp)
4. Push the updated project to Vercel through Git. Open Spotly over HTTP for local testing or HTTPS on Vercel, choose **Sign in** in the header, and follow the email link. New accounts start with an empty atlas.
5. To bring over earlier data, open **Your account** and choose **Import browser data** on the same site and browser where it was saved. Import preserves any record already in the account. Data from a different site address stays in that address's browser storage.

Each spot, journal entry, and custom category has its own database record. Row Level Security limits records to the account that owns them. Spot and item photos use Spotly's existing compressed image format and are saved with their spot record.

In **Add a spot**, choose a category or select **+ Add a category…** to create one with the spot. For food and drink categories, use **Add another item** for each additional dish or drink. Each item has its own name and optional photo, which appear together in the spot’s details. A spot can also have up to five separate gallery photos. Spotly resizes images before saving them in the current browser. The first gallery image becomes the spot’s cover.

For a **Stay** spot, use **Best places to stay** to add hotels, homestays, or other recommendations. Each recommendation can have its own photo and appears in the spot’s details.

Enter the city or address by hand, or choose **Use my current location** while at the spot and allow location access in your browser. Spotly saves a single GPS reading with the spot. You can add a city or address alongside the pin, refresh it, or remove it when editing.

## Design system

Theme tokens and component styles live in `styles.css`. Headings use Plus Jakarta Sans and body copy uses Inter, loaded from Google Fonts with system fallbacks. Light mode uses mint-white and white surfaces. Dark mode uses separate navy and ocean-teal tokens.

| Status | Color family | Components |
| --- | --- | --- |
| Want to Visit | Lavender | Badge, filter, pin, progress chart |
| Planned | Sky blue | Badge, filter, pin, progress chart |
| Visited | Mint | Badge, filter, pin, progress chart |
| Favorites | Peach | Heart control, badge, filter, pin, progress legend |

## Image assets

The built-in image generator produced two contact sheets. Their eight crops are stored as WebP files in `assets/`. The images are illustrative.

<details>
<summary>Image generation prompts</summary>

> Use case: photorealistic-natural. Create one landscape editorial travel photography contact sheet for the Spotly app. EXACT edge-to-edge 2 by 2 equal rectangular grid, straight boundaries precisely at 50 percent width and height, no border or gutters, four separate full-bleed photos, no text or watermark. TOP LEFT: sunny summer Amalfi coast from a slightly elevated angle, famous Positano pink and ochre hillside villas, turquoise Mediterranean beach bay on right, fine coastal details, vacation magazine cover, preserve soft clear blue sky and water in right half. TOP RIGHT: architecturally beautiful cozy Italian cafe with plants and retro ochre awning, open doors, bistro tables and cappuccino on foreground, warm sun. BOTTOM LEFT: vivid turquoise alpine lake in the Italian Dolomites backed by dramatic craggy mountains and pines, a wooden canoe near shore, sunny day. BOTTOM RIGHT: authentic Neapolitan pizza with cherry tomatoes and basil on a ceramic plate on a sunny peach-toned restaurant table, overhead editorial shot. Realistic photography, cohesive bright and fresh color grading, premium travel editorial art direction.

> Use case: photorealistic-natural. One square contact sheet for Spotly travel app, precise edge-to-edge 2 by 2 grid with four equal square photos, no gutters, no borders, no text. TOP LEFT authentic Lisbon old town scenic hillside overlook with terracotta roofs, colorful villas, blue sky, sunny. TOP RIGHT crisp pink bougainvillea and pastel peach ancient courtyard at Villa Rufolo Ravello, glimpses of the turquoise sea. BOTTOM LEFT hand holding a small lemon gelato in cone, sunshine in a pastel Italian street backdrop. BOTTOM RIGHT idyllic sea cliffs and sparkling teal sea at Cala Goloritzé in Sardinia, from sea level, early evening. Beautiful naturally lit professional vacation editorial photographs, luminous fresh color, realistic textures, four perfectly separate sections.

</details>
"# Spotly" 
