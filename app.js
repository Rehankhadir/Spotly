'use strict';

const paths = {
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.8 8.2-2.4 5.2-5.2 2.4 2.4-5.2 5.2-2.4Z"/>',
  bookmark: '<path d="M6 5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16l-6-4-6 4z"/>',
  map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15m6-12v15"/>',
  book: '<path d="M4 19V5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1 0-4h13M8 7h7m-7 4h5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  moon: '<path d="M20.5 14a8.7 8.7 0 0 1-10.6-10.6A8.7 8.7 0 1 0 20.5 14Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5"/>',
  sparkles: '<path d="M10 3l2.1 5.9L18 11l-5.9 2.1L10 19l-2.1-5.9L2 11l5.9-2.1L10 3Zm9 11 1 2.5 2.5 1L20 18.5 19 21l-1-2.5-2.5-1 2.5-1L19 14Zm1-11v4m-2-2h4"/>',
  search: '<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 4.5 4.5"/>',
  pin: '<path d="M19 10c0 5-7 10-7 10s-7-5-7-10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.2"/>',
  heart: '<path d="M20.8 8.6c0 4.3-8.8 9.9-8.8 9.9s-8.8-5.6-8.8-9.9A4.6 4.6 0 0 1 12 6.7a4.6 4.6 0 0 1 8.8 1.9Z"/>',
  coffee: '<path d="M3 9h14v5a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Zm14 1h2a2 2 0 0 1 0 4h-2M2 21h17M7 3v3m5-3v3"/>',
  food: '<path d="M5 3v7m4-7v7M3 6h8v2a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm4 5v10m13 0V3c-3 1.5-4 5-4 9h4"/>',
  mountain: '<path d="m2 19 7-13 4 7 2-3 7 9H2Zm5-9 2 2 2-2"/>',
  culture: '<path d="m3 8 9-5 9 5H3Zm0 13h18M5 18V11m5 7v-7m4 7v-7m5 7v-7"/>',
  waves: '<path d="M2 8c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 13c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 18c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/>',
  arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
  diagonal: '<path d="M6 18 18 6M8 6h10v10"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  x: '<path d="m6 6 12 12M18 6 6 18"/>',
  check: '<path d="m5 12 5 5L20 7"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  pencil: '<path d="m4 16 11-11a2 2 0 0 1 3 0l1 1a2 2 0 0 1 0 3L8 20l-5 1 1-5Zm9-9 4 4"/>',
};

function icon(name, size = 18) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
}

const builtInCategories = {
  all: ['All spots', 'grid'],
  cafe: ['Cafés', 'coffee', 'peach', true],
  food: ['Food', 'food', 'peach', true],
  restaurant: ['Restaurant', 'food', 'peach', true],
  dhaba: ['Dhaba', 'food', 'peach', true],
  bakery: ['Bakery', 'food', 'peach', true],
  streetFood: ['Street food', 'food', 'peach', true],
  dessert: ['Dessert shop', 'food', 'peach', true],
  pub: ['Bar or pub', 'food', 'peach', true],
  outdoors: ['Outdoors', 'mountain', 'mint'],
  culture: ['Culture', 'culture', 'lavender'],
  coast: ['Coast', 'waves', 'sky'],
  shopping: ['Shopping', 'pin', 'lavender'],
  stay: ['Stay', 'pin', 'sky'],
};

const statuses = {
  want: ['Want to Visit', 'bookmark', 'lavender'],
  planned: ['Planned', 'calendar', 'sky'],
  visited: ['Visited', 'check', 'mint'],
  favorite: ['Favorites', 'heart', 'peach'],
};

const sampleSpots = [
  { id: 'cafe', name: 'Caffè delle Rose', location: 'Florence, Italy', category: 'cafe', status: 'want', alt: 'Sunlight on a café terrace with an ochre awning', point: [61.6, 41.3], description: 'A slow-morning sort of place. Take your cappuccino outside and linger at a little table in the sun.' },
  { id: 'lake', name: 'Lago di Braies', location: 'Dolomites, Italy', category: 'outdoors', status: 'planned', alt: 'An alpine lake, a canoe and rugged Dolomite peaks', point: [64.4, 23.1], description: 'Turquoise water, dramatic peaks and a lakeside trail made for taking the long way around.' },
  { id: 'lisbon', name: 'Miradouro da Graça', location: 'Lisbon, Portugal', category: 'culture', status: 'visited', favorite: true, alt: 'Terracotta rooftops on a sunny Lisbon hillside', point: [11.7, 65.5], description: 'Find a seat at the viewpoint and watch the warm evening light move over Lisbon’s terracotta rooftops.' },
  { id: 'positano', name: 'Spiaggia Grande', location: 'Positano, Italy', category: 'coast', status: 'want', alt: 'Positano’s colorful villas above a vivid blue bay', point: [72, 57.5], description: 'An afternoon by the water, with pastel villas rising behind the beach and boats coming and going across the bay.' },
  { id: 'pizza', name: 'A slice in Naples', location: 'Naples, Italy', category: 'food', status: '', alt: 'Neapolitan pizza with basil and cherry tomatoes', point: [69.8, 51.7], description: 'Start with a margherita and an appetite for wandering.' },
  { id: 'ravello', name: 'Villa Rufolo Gardens', location: 'Ravello, Italy', category: 'culture', status: 'planned', alt: 'Bougainvillea in a terraced courtyard above the sea', point: [76.1, 53.6], description: 'Shady courtyards, flowering terraces and little glimpses of blue sea.' },
  { id: 'gelato', name: 'Lemon gelato by the water', location: 'Sorrento, Italy', category: 'food', status: 'visited', alt: 'Lemon gelato in a cone on a sunlit Italian street', point: [67, 59], description: 'A bright scoop of lemon gelato, best enjoyed on a long, easy walk through town.' },
  { id: 'cala', name: 'Cala Goloritzé', location: 'Sardinia, Italy', category: 'coast', status: '', alt: 'Sparkling water below Sardinian limestone cliffs', point: [59.8, 62.8], description: 'Pale limestone drops into a clear blue cove on the wild side of the coast.' },
];

const sampleEntries = [
  { id: 'lisbon-note', title: 'Golden hour in Graça', spotId: 'lisbon', date: '2026-07-12', body: 'We found a spot on the low wall just before sunset. The rooftops turned pink, someone started playing guitar, and we stayed until the lights came on.' },
  { id: 'sorrento-note', title: 'An afternoon that tasted like lemons', spotId: 'gelato', date: '2026-06-29', body: 'We took our cones down a quiet side street and ate them in a little patch of sun. I’d go back just for that.' },
];

const pages = {
  explore: ['Explore', 'compass'],
  spots: ['My Spots', 'bookmark'],
  map: ['Map', 'map'],
  journal: ['Journal', 'book'],
};

const allStatuses = { all: builtInCategories.all, ...statuses };
const main = document.querySelector('#main');
const dialog = document.querySelector('#dialog');
const navigation = document.querySelector('#navigation');
const headerActions = document.querySelector('#header-actions');

function read(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(`spotly-${key}`)) ?? fallback;
  } catch {
    return fallback;
  }
}

const savedAtlas = read('spots', sampleSpots);
const savedSpots = Array.isArray(savedAtlas) ? savedAtlas : savedAtlas.spots ?? sampleSpots;
let spots = savedSpots.map(spot => spot.foodItems ? {
  ...spot,
  foodItems: spot.foodItems.map(item => typeof item === 'string' ? { name: item } : item),
} : spot);
let customCategories = Array.isArray(savedAtlas.categories) ? savedAtlas.categories : [];
let categories = { ...builtInCategories, ...Object.fromEntries(customCategories) };
let entries = read('entries', sampleEntries);
if (!Array.isArray(entries)) entries = sampleEntries;
const photoDrafts = new WeakMap();
const locationDrafts = new WeakMap();
const maxPhotos = 5;
const photoTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
const photoFormatHelp = 'Choose JPEG, PNG, WebP, GIF, or AVIF images up to 15 MB each.';
const spotItemTypes = {
  food: {
    label: 'Food and drink items',
    plural: 'food items',
    heading: 'Food and drinks',
    help: 'Give each dish or drink its own name and optional photo.',
    name: 'Food or drink name',
    example: 'e.g. Masala dosa',
    add: 'Add another item',
  },
  stay: {
    label: 'Best places to stay',
    plural: 'stays',
    heading: 'Best places to stay',
    help: 'Add hotels, homestays, or other places you recommend. Each can have its own photo.',
    name: 'Stay name',
    example: 'e.g. Hillside Homestay',
    add: 'Add another stay',
  },
  shopping: {
    label: 'Items to shop',
    plural: 'shopping items',
    heading: 'Items to shop',
    help: 'List what you want to buy or look for here. Each item can have its own photo.',
    name: 'Shopping item name',
    example: 'e.g. Handmade pottery',
    add: 'Add another item',
  },
};
let page = 'explore';
let category = 'all';
let collectionFilter = 'all';
let collectionCategory = 'all';
let collectionQuery = '';
let mapFilter = 'all';
let mapSelection = '';
let query = '';
let sort = 'featured';
let dialogOpener;
let toastTimer;

function save(key, data, message) {
  try {
    localStorage.setItem(`spotly-${key}`, JSON.stringify(data));
  } catch {
    message = 'Saved for this visit. Browser storage is unavailable.';
  }
  showToast(message);
}

function showToast(message) {
  const status = document.querySelector('#toast');
  status.textContent = message;
  status.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => status.classList.remove('visible'), 3000);
}

function esc(value = '') {
  const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(value).replace(/[&<>"']/g, character => entities[character]);
}

function themeButton() {
  const dark = document.documentElement.dataset.theme === 'dark';
  const label = dark ? 'Switch to light mode' : 'Switch to dark mode';
  return `<button class="icon-btn" data-action="theme" aria-label="${label}" title="${label}">${icon(dark ? 'sun' : 'moon')}</button>`;
}

function renderHeader() {
  const addTab = `<button type="button" class="nav-link nav-add" data-action="add" aria-label="Add a spot" aria-haspopup="dialog"><span class="nav-icon">${icon('plus', 24)}</span><span>Add</span></button>`;
  navigation.innerHTML = Object.entries(pages).map(([id, [label, graphic]]) =>
    `${id === 'map' ? addTab : ''}<a href="#${id}" class="nav-link"${page === id ? ' aria-current="page"' : ''}><span class="nav-icon">${icon(graphic, 17)}</span><span>${label}</span></a>`
  ).join('');
  headerActions.innerHTML = `${themeButton()}<button class="btn btn-primary" data-action="add">${icon('plus', 17)} Add a spot</button>`;
}

function badge(status, label = statuses[status][0]) {
  return `<span class="badge tone-${statuses[status][2]}">${label}</span>`;
}

function photo(spot, loading = 'lazy') {
  const upload = spot.photos?.[0];
  if (upload) return `<img src="${esc(upload)}" alt="${esc(spot.name)}, photo 1" loading="${loading}">`;
  if (spot.alt) return `<img src="./assets/${esc(spot.id)}.webp" alt="${esc(spot.alt)}" loading="${loading}">`;
  return `<span class="photo-placeholder">${icon(categories[spot.category][1], 37)}</span>`;
}

function itemTags(kind, items = [], limit = items.length) {
  if (!items.length) return '';
  const extra = items.length - limit;
  return `<ul class="item-tags" data-kind="${kind}" aria-label="${spotItemTypes[kind].label}">${items.slice(0, limit).map(({ name }) =>
    `<li>${esc(name)}</li>`
  ).join('')}${extra > 0 ? `<li aria-label="${extra} more ${spotItemTypes[kind].plural}">+${extra}</li>` : ''}</ul>`;
}

function favoriteButton(spot, compact = false) {
  const name = compact ? `Favorite ${esc(spot.name)}` : 'Favorite';
  const content = compact ? '' : ' Favorite';
  return `<button type="button" class="${compact ? 'icon-btn favorite-btn' : 'btn btn-quiet favorite-toggle'}" data-action="favorite" data-id="${esc(spot.id)}" aria-label="${name}" aria-pressed="${Boolean(spot.favorite)}">${icon('heart', 17)}${content}</button>`;
}

function coordinateLabel({ latitude, longitude }) {
  return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
}

function spotLocation(spot) {
  const { location = '', city, coordinates } = spot;
  if (city && !location.split(',').some(part => searchKey(part.trim()) === searchKey(city))) {
    return location ? `${location}, ${city}` : city;
  }
  return location || (coordinates ? coordinateLabel(coordinates) : '');
}

function locationLink(spot) {
  if (!spot.coordinates) return '';
  const query = encodeURIComponent(coordinateLabel(spot.coordinates));
  return `<a class="btn btn-secondary" href="https://www.google.com/maps/search/?api=1&amp;query=${query}" target="_blank" rel="noopener noreferrer">Open in Google Maps ${icon('diagonal', 15)}</a>`;
}

function spotCard(spot, index) {
  const [label, graphic] = categories[spot.category];
  return `<article class="spot-card">
    <div class="card-photo">${photo(spot, index < 3 ? 'eager' : 'lazy')}<span class="card-kind">${icon(graphic, 13)}${esc(label)}</span></div>
    ${favoriteButton(spot, true)}
    <div class="card-body">
      <h3><button type="button" class="card-open" data-action="detail" data-id="${esc(spot.id)}">${esc(spot.name)}</button></h3>
      <p class="location">${icon('pin', 14)}${esc(spotLocation(spot))}</p>
      ${itemTags('food', spot.foodItems, 2)}
      ${itemTags('stay', spot.stayPlaces, 2)}
      ${itemTags('shopping', spot.shoppingItems, 2)}
      <div class="card-meta"><span>${spot.status ? badge(spot.status) : ''}</span><span class="card-arrow">${icon('diagonal', 16)}</span></div>
    </div>
  </article>`;
}

function chips(choices, selected, action) {
  return Object.entries(choices).map(([id, [label, graphic, tone]]) =>
    `<button type="button" class="chip${tone ? ` tone-${tone}` : ''}" data-action="${action}" data-id="${esc(id)}" aria-pressed="${selected === id}">${icon(graphic, 15)}${esc(label)}</button>`
  ).join('');
}

function matchesStatus(spot, filter) {
  if (filter === 'all') return true;
  return filter === 'favorite' ? Boolean(spot.favorite) : spot.status === filter;
}

function emptyState(graphic, title, description, button = '') {
  return `<div class="empty">${icon(graphic, 27)}<h2>${title}</h2><p>${description}</p>${button}</div>`;
}

function searchKey(value) {
  return value.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
}

function matchesSearch(spot, search) {
  return !search || searchKey([
    spot.name,
    spotLocation(spot),
    categories[spot.category][0],
    ...(spot.foodItems ?? []).map(item => item.name),
    ...(spot.stayPlaces ?? []).map(stay => stay.name),
    ...(spot.shoppingItems ?? []).map(item => item.name),
  ].join(' ')).includes(search);
}

function results() {
  const exploring = page === 'explore';
  const currentQuery = exploring ? query : collectionQuery;
  const activeCategory = exploring ? category : collectionCategory;
  const search = searchKey(currentQuery);
  const list = spots.filter(spot =>
    (exploring || ((spot.status || spot.favorite) && matchesStatus(spot, collectionFilter)))
    && (activeCategory === 'all' || spot.category === activeCategory)
    && matchesSearch(spot, search));
  if (exploring && sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
  if (exploring && sort === 'location') list.sort((a, b) => spotLocation(a).localeCompare(spotLocation(b)));
  const count = currentQuery
    ? `${list.length} ${list.length === 1 ? 'result' : 'results'} for “${esc(currentQuery)}”`
    : `${list.length} ${list.length === 1 ? 'spot' : 'spots'}`;
  const note = `<p class="${exploring && !query ? 'sr-only' : 'result-note'}">${count}</p>`;
  if (list.length) return note + `<div class="card-grid">${list.map(spotCard).join('')}</div>`;
  if (exploring) {
    return note + emptyState('search', 'No spots found', 'Try a different search or browse all spots.',
      '<button class="btn btn-secondary" data-action="reset-search">Browse all spots</button>');
  }
  if (currentQuery || activeCategory !== 'all' || collectionFilter !== 'all') {
    return note + emptyState('search', 'No matching spots', 'Try a different search or clear your filters.',
      '<button class="btn btn-secondary" data-action="reset-collection-search">Clear search and filters</button>');
  }
  return note + emptyState('search', 'No spots found', 'Places you save or favorite will show up here.',
    '<a href="#explore" class="btn btn-secondary">Explore spots</a>');
}

function explorePage() {
  const availableCategories = new Set(spots.map(spot => spot.category));
  const filters = Object.fromEntries(Object.entries(categories).filter(([id]) => id === 'all' || availableCategories.has(id)));
  return `<section class="hero" aria-labelledby="hero-title">
    <div class="hero-content">
      <span class="eyebrow">${icon('sparkles', 15)} Your personal travel atlas</span>
      <h1 id="hero-title">Good places.<br><span>Great memories.</span></h1>
      <p>Discover little gems and big adventures. Save the places you love and make every trip yours.</p>
      <form class="search-form" id="search-form" role="search">
        ${icon('search', 20)}<label for="search" class="sr-only">Search spots</label>
        <input type="search" id="search" name="query" placeholder="Search places, categories, or dishes" value="${esc(query)}">
        <button class="btn btn-primary" type="submit">Explore</button>
      </form>
    </div>
    <div class="hero-photo"><img src="./assets/positano.webp" alt="Sunlit Positano villas above the turquoise Amalfi Coast" fetchpriority="high"></div>
    <button class="hero-caption" data-action="detail" data-id="positano">${icon('pin', 19)}<span><small>Postcard from</small><strong>Positano, Italy</strong></span>${icon('diagonal', 14)}</button>
  </section>
  <section class="spot-section" id="discover" aria-labelledby="discover-title">
    <div class="section-head"><div><span class="eyebrow">Wander a little</span><h2 id="discover-title" tabindex="-1">Find your next favorite</h2><p>A few good places to get you going.</p></div>
    <a href="#map" class="btn btn-secondary">${icon('map', 17)} View map</a></div>
    <div class="list-tools">
      <div class="chips" role="group" aria-label="Filter by category">${chips(filters, category, 'category')}</div>
      <label class="select-wrap"><span class="sr-only">Sort spots</span><select id="sort">
        <option value="featured"${sort === 'featured' ? ' selected' : ''}>Featured</option>
        <option value="name"${sort === 'name' ? ' selected' : ''}>Name A–Z</option>
        <option value="location"${sort === 'location' ? ' selected' : ''}>Location A–Z</option>
      </select>${icon('chevron', 14)}</label>
    </div>
    <div id="results">${results()}</div>
  </section>
  <aside class="journal-callout"><div class="feature-icon">${icon('book', 24)}</div><div><h2>Some days are worth keeping.</h2><p>Give your favorite moments a home in your travel journal.</p></div><a class="btn btn-quiet" href="#journal">Open journal ${icon('arrow', 16)}</a></aside>`;
}

function intro(graphic, eyebrow, title, copy, actions = '', modifier = '') {
  return `<section class="page-intro ${modifier}"><div><span class="eyebrow">${icon(graphic, 16)} ${eyebrow}</span><h1>${title}</h1><p>${copy}</p></div>${actions}</section>`;
}

function collectionSummary() {
  const breakdown = ['want', 'planned', 'visited'].map(id => [id, spots.filter(spot => spot.status === id).length]);
  return `<figure class="atlas-summary"><figcaption>Your travel progress</figcaption>
    <div class="summary-bar" aria-hidden="true">${breakdown.filter(([, count]) => count).map(([id, count]) => `<span class="tone-${statuses[id][2]}" style="flex-grow:${count}"></span>`).join('')}</div>
    <div class="summary-legend">${breakdown.map(([id, count]) => badge(id, `${statuses[id][0]} · ${count}`)).join('')}${badge('favorite', `Favorites · ${spots.filter(spot => spot.favorite).length}`)}</div></figure>`;
}

function spotsPage() {
  return `${intro('bookmark', 'Your collection', 'My Spots', 'From “someday” to “remember when”, keep all your places together.', '<button class="btn btn-primary" data-action="add">Add a spot</button>', 'collection')}
    <section class="page-content" aria-label="Your saved spots">${collectionSummary()}
      <div class="collection-tools" role="search" aria-label="Find saved spots">
        <div>
          <label for="collection-search">Search My Spots</label>
          <div class="search-form">${icon('search', 18)}
            <input type="search" id="collection-search" placeholder="Search names, cities, or items" value="${esc(collectionQuery)}">
          </div>
        </div>
        <div>
          <label for="collection-category">Category</label>
          <div class="select-wrap"><select id="collection-category">
            <option value="all">All categories</option>
            ${options(categories, collectionCategory, 'all')}
          </select>${icon('chevron', 14)}</div>
        </div>
      </div>
      <div class="list-tools"><div class="chips" role="group" aria-label="Filter by status">${chips(allStatuses, collectionFilter, 'collection-filter')}</div></div>
      <div id="results">${results()}</div>
    </section>`;
}

function mapShapes() {
  return `<svg class="map-shapes" viewBox="0 0 800 400" preserveAspectRatio="none" aria-hidden="true">
    <path class="map-land" d="M-10-10H810V122l-26 13-27 35-35-6-27-24-14-3-20-19-24-10-22 11-2 15 17 18 8 26 15 19 32 17 14 19-8 8-19-13-19-1 6 13-10 23-15 10-6-12 16-19-16-16-33-7-18-30-22-21-16-29-22-7-17 9-24-3-32-1-24 13-18 24-33 11-36-2-29 10-15 34-26 15-18 27-34 20-21-10-20-2-17 26-26 17-32-2-26-16 5-34 11-22 3-28 11-28-4-28-10-19 13-24 32-6 23 17 29 1 45-7 45-9 38-1 15-16-5-27-21-18-5-25-41-5-9-22-35-4-13-23 21-17 12-25Z"/>
    <path class="map-land" d="m465 235 11-7 13 9 6 16-8 29-13 6-12-15 4-14Zm11-18 4-15 9-8 4 12-8 19Zm111 56 32 5 14-8-1 18-15 14-29-10-11-11ZM-10 383l40-10 33-29 25 4 29 11 35-12 20-21 41-5 29 18 29-10 20 5 44-8 34-17 50 4 36-9 30 11 41 3 8 13 24 6 12 14 32 10 20 29H-10Z"/>
    <path class="map-borders" d="m76 294 23-18 7-23 17-23-4-21 10-27-10-18m106-13 35-8 28 16 34 6 26 10m132-77 23-16 24 10 28-3 28 15m63 8 9-16 25-1 26 15"/>
    <text class="map-label" x="143" y="209">SPAIN</text><text class="map-label" x="36" y="247">PORTUGAL</text>
    <text class="map-label" x="389" y="111">FRANCE</text><text class="map-label" x="571" y="128">ITALY</text>
    <text class="map-label map-water" x="270" y="269">Mediterranean Sea</text>
  </svg>`;
}

function mapResults() {
  const list = spots.filter(spot => matchesStatus(spot, mapFilter));
  const selected = list.find(spot => spot.id === mapSelection);
  const pins = list.filter(spot => spot.point).map(spot => {
    const tone = statuses[spot.favorite && (mapFilter === 'all' || mapFilter === 'favorite') ? 'favorite' : spot.status]?.[2] ?? 'sky';
    return `<button class="map-pin tone-${tone}" style="left:${spot.point[0]}%;top:${spot.point[1]}%" data-action="map-pin" data-id="${spot.id}" aria-label="${esc(spot.name)}" title="${esc(spot.name)}" aria-pressed="${selected === spot}">${icon(tone === 'peach' ? 'heart' : 'pin', 18)}</button>`;
  }).join('');
  const mapList = list.map(spot => `<button class="map-item" data-action="map-select" data-id="${esc(spot.id)}" aria-pressed="${selected === spot}">${photo(spot)}<span><strong>${esc(spot.name)}</strong><span class="location">${esc(spotLocation(spot))}${spot.coordinates ? ' · GPS pin' : spot.point ? '' : ' · No map pin'}</span></span>${icon('arrow', 15)}</button>`).join('');
  return `<div>
    <div class="map-canvas" role="group" aria-label="Illustrated map of southern Europe">${mapShapes()}${pins}<span class="map-caption">Illustrated map</span></div>
    ${selected ? `<div class="map-detail"><h3>${esc(selected.name)}</h3><p class="location">${icon('pin', 14)}${esc(spotLocation(selected))}</p>
    <div class="card-meta"><span>${selected.status ? badge(selected.status) : ''}${selected.favorite ? badge('favorite', 'Favorite') : ''}</span></div>
    <div class="detail-actions"><button class="btn btn-secondary" data-action="detail" data-id="${esc(selected.id)}">Spot details ${icon('arrow', 15)}</button>${locationLink(selected)}</div></div>` : ''}
    </div>
    <aside class="map-list" aria-label="Map locations">${mapList || '<p class="result-note">No spots match this filter.</p>'}</aside>`;
}

function mapPage() {
  return `${intro('map', 'The places we go', 'Explore the map', 'See where your next adventure could take you.')}
    <section class="page-content" aria-label="Map and locations"><div class="list-tools"><div class="chips" role="group" aria-label="Filter map by status">${chips(allStatuses, mapFilter, 'map-filter')}</div></div>
    <div class="map-layout" id="map-results">${mapResults()}</div></section>`;
}

function journalPage() {
  const list = [...entries].sort((a, b) => b.date.localeCompare(a.date));
  const dateFormat = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeZone: 'UTC' });
  return `${intro('book', 'The stories you bring home', 'Travel Journal', 'Write down the little details you’ll want to remember.', '<button class="btn btn-primary" data-action="entry">New entry</button>', 'journal')}
    <section class="page-content" aria-label="Journal entries">${list.length ? `<div class="journal-grid">${list.map(entry => {
      const place = spots.find(spot => spot.id === entry.spotId);
      return `<article class="entry"><div class="entry-top"><span class="feature-icon">${icon('book', 21)}</span><time datetime="${esc(entry.date)}">${dateFormat.format(new Date(entry.date))}</time></div>
      <h2>${esc(entry.title)}</h2>${place ? `<div class="location">${icon('pin', 14)}${esc(place.name)}</div>` : ''}<p>${esc(entry.body)}</p>
      <button class="text-btn" data-action="entry" data-id="${esc(entry.id)}" aria-label="Edit ${esc(entry.title)}">${icon('pencil', 15)} Edit entry</button></article>`;
    }).join('')}</div>` : emptyState('book', 'A fresh page', 'Your travel notes will appear here.')}</section>`;
}

function renderPage() {
  main.innerHTML = { explore: explorePage, spots: spotsPage, map: mapPage, journal: journalPage }[page]();
}

function navigate(focus = true) {
  const hash = location.hash.slice(1);
  page = Object.hasOwn(pages, hash) ? hash : 'explore';
  document.title = page === 'explore' ? 'Spotly — The good places go here' : `${pages[page][0]} — Spotly`;
  renderHeader();
  renderPage();
  if (focus) {
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  }
}

function showDialog(markup) {
  if (!dialog.open) {
    const button = document.activeElement;
    dialogOpener = { button, action: button?.dataset.action, id: button?.dataset.id };
  }
  dialog.innerHTML = `<div class="dialog-inner"><button type="button" class="icon-btn" data-action="close" aria-label="Close dialog">${icon('x', 20)}</button>${markup}</div>`;
  if (!dialog.open) dialog.showModal();
  (dialog.querySelector('input') || dialog.querySelector('[data-action="close"]')).focus();
}

function options(choices, selected, exclude) {
  return Object.entries(choices).filter(([id]) => id !== exclude).map(([id, [label]]) =>
    `<option value="${esc(id)}"${id === selected ? ' selected' : ''}>${esc(label)}</option>`
  ).join('');
}

function statusOptions(status) {
  return `<option value="">No status</option>${options(statuses, status, 'favorite')}`;
}

function itemDetails(kind, items = []) {
  if (!items.length) return '';
  if (kind === 'food' && !items.some(item => item.photo)) return itemTags(kind, items);
  return `<section class="item-details" data-kind="${kind}" aria-labelledby="${kind}-details-title">
    <h3 id="${kind}-details-title">${spotItemTypes[kind].heading}</h3>
    <ul class="item-detail-list">${items.map(({ name, photo }) => `<li>
      ${photo ? `<img src="${esc(photo)}" alt="Photo of ${esc(name)}" loading="lazy">` : ''}
      <span>${esc(name)}</span>
    </li>`).join('')}</ul>
  </section>`;
}

function detail(spot) {
  const [label, graphic] = categories[spot.category];
  const photos = spot.photos ?? [];
  showDialog(`<div class="detail-photo">${photo(spot, 'eager')}</div>
    ${photos.length > 1 ? `<div class="photo-gallery" role="group" aria-label="Spot photos">${photos.map((src, index) =>
      `<button type="button" class="photo-thumb" data-action="show-photo" data-id="${esc(spot.id)}" data-index="${index}" aria-pressed="${index === 0}" aria-label="Show photo ${index + 1}"><img src="${esc(src)}" alt=""></button>`
    ).join('')}</div>` : ''}
    <span class="eyebrow">${icon(graphic, 16)} ${esc(label)}</span>
    <h2 id="dialog-title">${esc(spot.name)}</h2>
    <div class="location">${icon('pin', 16)} ${esc(spotLocation(spot))}</div>
    ${spot.description ? `<p>${esc(spot.description)}</p>` : ''}
    ${itemDetails('food', spot.foodItems)}
    ${itemDetails('stay', spot.stayPlaces)}
    ${itemDetails('shopping', spot.shoppingItems)}
    <div class="card-meta" id="detail-status"${spot.status ? '' : ' hidden'}>${spot.status ? badge(spot.status) : ''}</div>
    <div class="dialog-form"><label class="field">Travel status<select id="detail-status-select" data-id="${esc(spot.id)}">${statusOptions(spot.status)}</select></label></div>
    <div class="detail-actions">${locationLink(spot)}${favoriteButton(spot)}
      <button class="btn btn-secondary" data-action="entry" data-spot="${esc(spot.id)}">${icon('book', 17)} Write a note</button>
      ${spot.custom ? `<button class="btn btn-quiet" data-action="add" data-id="${esc(spot.id)}">${icon('pencil', 16)} Edit spot</button>` : ''}
    </div>`);
}

function formActions(label, extra = '') {
  return `<div class="dialog-actions">${extra}<button type="button" class="btn btn-quiet" data-action="close">Cancel</button><button type="submit" class="btn btn-primary">${label}</button></div>`;
}

function spotItemRow(kind, { name = '', photo = '' } = {}) {
  const type = spotItemTypes[kind];
  return `<div class="spot-item-row">
    <label class="field"><span class="sr-only">${type.name}</span>
      <input name="itemName" maxlength="1200" placeholder="${type.example}" value="${esc(name)}">
    </label>
    <button type="button" class="icon-btn" data-action="remove-spot-item" aria-label="${kind === 'stay' ? 'Remove this stay' : 'Remove this item'}">${icon('x', 16)}</button>
    <div class="spot-item-photo">
      <label class="field"><span>${kind === 'stay' ? 'Stay photo' : 'Item photo'} <small>Optional</small></span>
        <input type="file" name="itemPhoto" accept="${photoTypes.join(',')}">
      </label>
      <div class="photo-preview"${photo ? '' : ' hidden'}>
        <img${photo ? ` src="${esc(photo)}"` : ''} alt="Photo preview">
        <button type="button" class="icon-btn photo-remove" data-action="remove-item-photo" aria-label="Remove this photo">${icon('x', 14)}</button>
      </div>
      <p class="form-message" role="status"></p>
    </div>
  </div>`;
}

function spotItemsEditor(kind, items, enabled) {
  const type = spotItemTypes[kind];
  const rows = items?.length ? items : [{}];
  return `<fieldset id="${kind}-field" class="spot-items-editor" data-kind="${kind}" aria-describedby="${kind}-help"${enabled ? '' : ' hidden disabled'}>
    <legend>${type.label}</legend>
    <p id="${kind}-help" class="spot-items-help">${type.help}</p>
    <div class="spot-item-list">${rows.map(item => spotItemRow(kind, item)).join('')}</div>
    <button type="button" class="btn btn-secondary" data-action="add-spot-item">${icon('plus', 15)} ${type.add}</button>
  </fieldset>`;
}

function spotForm(spot) {
  const selectedCategory = spot?.category ?? 'cafe';
  showDialog(`<form class="spot-form" id="spot-form" data-id="${esc(spot?.id)}">
    <header class="spot-form-header">
      <span class="eyebrow">${icon('pin', 16)} Your atlas</span>
      <h2 id="dialog-title">${spot ? 'Edit spot' : 'Add a spot'}</h2>
    </header>
    <div class="dialog-form spot-form-body">
      <p>Save a place you’ve been or somewhere you’re dreaming of.</p>
      <label class="field">Place name<input name="name" required maxlength="80" placeholder="e.g. The little corner café" value="${esc(spot?.name)}"></label>
      <div class="location-capture">
        <label class="field">City name<input name="city" maxlength="100" placeholder="e.g. Pune" value="${esc(spot?.city)}" aria-describedby="location-help"></label>
        <label class="field">Address or area<input name="location" maxlength="100" placeholder="Street, neighborhood or landmark" value="${esc(spot?.location)}" aria-describedby="location-help"></label>
        <div class="location-actions">
          <button type="button" class="btn btn-secondary" data-action="capture-location">${icon('pin', 16)} Use my current location</button>
          <button type="button" class="btn btn-quiet" data-action="remove-location" hidden>Remove pin</button>
        </div>
        <small id="location-help">Enter a city or address, or capture a GPS pin when you’re at the spot.</small>
        <p id="location-coordinates" class="form-message"></p>
        <p id="location-status" class="form-message" role="status"></p>
      </div>
      <div class="form-row"><label class="field">Category<select name="category">${options(categories, selectedCategory, 'all')}<option value="new">+ Add a category…</option></select></label>
      <label class="field">Travel status<select name="status">${statusOptions(spot?.status ?? 'want')}</select></label></div>
      <div class="category-editor" id="category-editor" hidden>
        <label class="field">New category name<input name="categoryName" maxlength="36" placeholder="e.g. Tiffin centre" disabled></label>
        <label class="field-check"><input type="checkbox" name="categoryFood" disabled> This is a food or drink category</label>
      </div>
      ${spotItemsEditor('food', spot?.foodItems, categories[selectedCategory][3])}
      ${spotItemsEditor('stay', spot?.stayPlaces, selectedCategory === 'stay')}
      ${spotItemsEditor('shopping', spot?.shoppingItems, selectedCategory === 'shopping')}
      <div class="photo-field">
        <label class="field">Spot photos<input type="file" name="uploads" multiple accept="${photoTypes.join(',')}" aria-describedby="photo-help photo-status"></label>
        <small id="photo-help">Add up to ${maxPhotos} photos. The first photo is the cover.</small>
        <div class="photo-gallery" id="photo-drafts"></div>
        <p id="photo-status" class="form-message" role="status"></p>
      </div>
      <label class="field">Notes <textarea name="description" maxlength="750" placeholder="What makes this spot special?">${esc(spot?.description)}</textarea></label>
    </div>
    <footer class="spot-form-footer">
      <p id="spot-error" class="form-message" role="alert"></p>
      ${formActions('Save spot')}
    </footer>
  </form>`);
  const form = dialog.querySelector('#spot-form');
  photoDrafts.set(form, [...(spot?.photos ?? [])]);
  setLocationDraft(form, spot?.coordinates);
  renderPhotoDrafts(form);
  updateCategoryFields(form);
}

function updateLocationRequirement(form) {
  const { city, location } = form.elements;
  location.required = !city.value.trim() && !locationDrafts.get(form);
  if (!location.required) location.setCustomValidity('');
}

function setLocationDraft(form, coordinates) {
  locationDrafts.set(form, coordinates);
  updateLocationRequirement(form);
  form.querySelector('[data-action="remove-location"]').hidden = !coordinates;
  const summary = form.querySelector('#location-coordinates');
  if (coordinates) {
    const accuracy = coordinates.accuracy === undefined ? '' : ` (±${Math.ceil(coordinates.accuracy)} m)`;
    summary.textContent = `GPS pin · ${coordinateLabel(coordinates)}${accuracy}`;
  } else {
    summary.textContent = '';
  }
}

async function captureLocation(button) {
  const form = button.form;
  const status = form.querySelector('#location-status');
  if (!window.isSecureContext || !navigator.geolocation) {
    status.textContent = 'Location access is unavailable here. Open Spotly over HTTPS or enter the location by hand.';
    return;
  }
  const removeButton = form.querySelector('[data-action="remove-location"]');
  button.disabled = true;
  removeButton.disabled = true;
  button.setAttribute('data-location-pending', '');
  syncSpotSubmit(form);
  status.textContent = 'Getting your location…';
  try {
    const { coords: { latitude, longitude, accuracy } } = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, maximumAge: 0, timeout: 12000 });
    });
    if (!Number.isFinite(latitude) || Math.abs(latitude) > 90 || !Number.isFinite(longitude) || Math.abs(longitude) > 180) {
      throw new Error('Invalid location coordinates');
    }
    const coordinates = { latitude, longitude };
    if (Number.isFinite(accuracy) && accuracy >= 0) coordinates.accuracy = accuracy;
    setLocationDraft(form, coordinates);
    status.textContent = 'Location captured. Save the spot to keep this pin.';
  } catch (error) {
    const errors = {
      1: 'Location access was denied. Allow it in your browser to try again, or enter the location by hand.',
      2: 'Your device could not find its location. Try again or enter the location by hand.',
      3: 'Finding your location took too long. Try again or enter the location by hand.',
    };
    status.textContent = errors[error.code] ?? 'Could not capture your location. Enter it by hand or try again.';
  } finally {
    button.disabled = false;
    removeButton.disabled = false;
    button.removeAttribute('data-location-pending');
    syncSpotSubmit(form);
  }
}

function updateCategoryFields(form) {
  const fields = form.elements;
  const isNew = fields.category.value === 'new';
  form.querySelector('#category-editor').hidden = !isNew;
  fields.categoryName.disabled = !isNew;
  fields.categoryName.required = isNew;
  fields.categoryFood.disabled = !isNew;
  const isFood = isNew ? fields.categoryFood.checked : categories[fields.category.value][3];
  for (const [kind, enabled] of [
    ['food', isFood],
    ['stay', fields.category.value === 'stay'],
    ['shopping', fields.category.value === 'shopping'],
  ]) {
    const editor = form.querySelector(`#${kind}-field`);
    editor.hidden = editor.disabled = !enabled;
  }
}

function renderPhotoDrafts(form) {
  form.querySelector('#photo-drafts').innerHTML = photoDrafts.get(form).map((src, index) =>
    `<div class="photo-preview"><img src="${esc(src)}" alt="Photo ${index + 1}">
      <button type="button" class="icon-btn photo-remove" data-action="remove-photo" data-index="${index}" aria-label="Remove photo ${index + 1}">${icon('x', 14)}</button>
    </div>`
  ).join('');
}

async function preparePhoto(file) {
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    for (const size of [1200, 900, 600]) {
      const scale = Math.min(1, size / Math.max(image.naturalWidth, image.naturalHeight));
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      context.fillStyle = '#fff';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const data = canvas.toDataURL('image/jpeg', 0.76);
      if (data.startsWith('data:image/jpeg;base64,') && data.length <= 320000) return data;
    }
    throw new Error('Image could not be resized');
  } finally {
    URL.revokeObjectURL(url);
  }
}

function supportedPhoto(file) {
  return photoTypes.includes(file.type) && file.size <= 15 * 1024 * 1024;
}

function syncSpotSubmit(form) {
  form.querySelector('[type="submit"]').disabled = Boolean(form.querySelector('[data-photo-pending], [data-location-pending]'));
}

function setPhotoPending(form, input, pending) {
  input.disabled = pending;
  input.toggleAttribute('data-photo-pending', pending);
  syncSpotSubmit(form);
}

async function addPhotos(input) {
  const form = input.form;
  const files = [...input.files];
  const photos = photoDrafts.get(form);
  const status = form.querySelector('#photo-status');
  input.value = '';
  if (!files.length) return;
  if (photos.length + files.length > maxPhotos) {
    status.textContent = `You can add up to ${maxPhotos} photos per spot.`;
    return;
  }
  if (files.some(file => !supportedPhoto(file))) {
    status.textContent = photoFormatHelp;
    return;
  }
  setPhotoPending(form, input, true);
  status.textContent = 'Preparing photos…';
  try {
    const uploads = [];
    for (const file of files) uploads.push(await preparePhoto(file));
    photos.push(...uploads);
    renderPhotoDrafts(form);
    status.textContent = `${photos.length} of ${maxPhotos} photos ready.`;
    form.querySelector('#spot-error').textContent = '';
  } catch {
    status.textContent = 'These photos could not be added. Try a different image or choose one at a time.';
  } finally {
    setPhotoPending(form, input, false);
  }
}

async function addItemPhoto(input) {
  const file = input.files[0];
  input.value = '';
  if (!file) return;
  const form = input.form;
  const row = input.closest('.spot-item-row');
  const status = row.querySelector('.form-message');
  if (!supportedPhoto(file)) {
    status.textContent = photoFormatHelp;
    return;
  }
  const preview = row.querySelector('.photo-preview');
  const remove = preview.querySelector('button');
  setPhotoPending(form, input, true);
  remove.disabled = true;
  status.textContent = 'Preparing item photo…';
  try {
    preview.querySelector('img').src = await preparePhoto(file);
    preview.hidden = false;
    status.textContent = 'Item photo ready.';
    form.querySelector('#spot-error').textContent = '';
  } catch {
    status.textContent = 'This photo could not be added. Try a different image.';
  } finally {
    remove.disabled = false;
    setPhotoPending(form, input, false);
  }
}

function readSpotItems(editor) {
  if (editor.disabled) return [];
  const items = [];
  for (const row of editor.querySelectorAll('.spot-item-row')) {
    const input = row.querySelector('[name="itemName"]');
    const name = input.value.trim();
    const photo = row.querySelector('.photo-preview img').getAttribute('src');
    if (photo && !name) {
      input.setCustomValidity('Enter a name for this photo.');
      input.reportValidity();
      return null;
    }
    if (name) items.push(photo ? { name, photo } : { name });
  }
  return items;
}

function localDate() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function entryForm(entry, spotId) {
  showDialog(`<span class="eyebrow">${icon('book', 16)} Travel journal</span><h2 id="dialog-title">${entry ? 'Edit entry' : 'Write a journal entry'}</h2>
    <form class="dialog-form" id="entry-form" data-id="${esc(entry?.id)}">
      <label class="field">Title<input name="title" required maxlength="100" value="${esc(entry?.title)}" placeholder="Give this memory a name"></label>
      <div class="form-row"><label class="field">Date<input name="date" type="date" required min="1900-01-01" max="9999-12-31" value="${esc(entry?.date ?? localDate())}"></label>
      <label class="field">Spot<select name="spotId"><option value="">No linked spot</option>${spots.map(spot => `<option value="${esc(spot.id)}"${(entry?.spotId ?? spotId) === spot.id ? ' selected' : ''}>${esc(spot.name)}</option>`).join('')}</select></label></div>
      <label class="field">Your story<textarea name="body" required maxlength="4000" placeholder="What do you want to remember?">${esc(entry?.body)}</textarea></label>
      ${formActions('Save entry', entry ? '<button type="button" class="btn btn-quiet btn-danger" data-action="delete-entry">Delete entry</button>' : '')}
    </form>`);
}

function confirmDelete(entry) {
  showDialog(`<h2 id="dialog-title">Delete this entry?</h2><p>“${esc(entry.title)}” will be removed from your journal.</p>
    <div class="dialog-actions"><button class="btn btn-quiet" data-action="entry" data-id="${esc(entry.id)}">Keep entry</button>
    <button class="btn btn-quiet btn-danger" data-action="confirm-delete" data-id="${esc(entry.id)}">Delete entry</button></div>`);
}

function setPressed(action, selected) {
  main.querySelectorAll(`[data-action="${action}"]`).forEach(button => {
    button.setAttribute('aria-pressed', button.dataset.id === selected);
  });
}

function findButton(action, id) {
  const buttons = document.querySelectorAll(`[data-action="${CSS.escape(action)}"]`);
  return [...buttons].find(button => id === button.dataset.id && !dialog.contains(button));
}

function refreshResults() {
  const area = document.querySelector('#results');
  if (area) area.innerHTML = results();
}

function refreshMap() {
  const area = document.querySelector('#map-results');
  if (area) area.innerHTML = mapResults();
}

function updateSpot(spot, message) {
  spots = spots.map(current => current.id === spot.id ? spot : current);
  save('spots', { spots, categories: customCategories }, message);
  if (page === 'spots') main.querySelector('.atlas-summary').outerHTML = collectionSummary();
  refreshResults();
  refreshMap();
}

function onAction(event) {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const { action, id, spot: spotId } = button.dataset;

  switch (action) {
    case 'theme': {
      const dark = document.documentElement.dataset.theme !== 'dark';
      document.documentElement.dataset.theme = dark ? 'dark' : 'light';
      try { localStorage.setItem('spotly-theme', dark ? 'dark' : 'light'); } catch {}
      document.querySelector('meta[name="theme-color"]').content = dark ? '#0c1c27' : '#F5FCFB';
      button.outerHTML = themeButton();
      headerActions.querySelector('[data-action="theme"]').focus();
      break;
    }
    case 'category':
      category = id;
      setPressed(action, id);
      refreshResults();
      break;
    case 'collection-filter':
      collectionFilter = id;
      setPressed(action, id);
      refreshResults();
      break;
    case 'map-filter':
      mapFilter = id;
      setPressed(action, id);
      refreshMap();
      break;
    case 'map-pin':
    case 'map-select':
      mapSelection = id;
      refreshMap();
      findButton(action, id)?.focus({ preventScroll: true });
      break;
    case 'reset-search':
      query = '';
      category = 'all';
      document.querySelector('#search').value = '';
      setPressed('category', category);
      refreshResults();
      findButton('category', category)?.focus();
      break;
    case 'reset-collection-search': {
      collectionQuery = '';
      collectionCategory = 'all';
      collectionFilter = 'all';
      const input = document.querySelector('#collection-search');
      input.value = '';
      document.querySelector('#collection-category').value = 'all';
      setPressed('collection-filter', collectionFilter);
      refreshResults();
      input.focus();
      break;
    }
    case 'detail':
      detail(spots.find(spot => spot.id === id));
      break;
    case 'show-photo': {
      const spot = spots.find(spot => spot.id === id);
      const index = Number(button.dataset.index);
      const image = dialog.querySelector('.detail-photo img');
      image.src = spot.photos[index];
      image.alt = `${spot.name}, photo ${index + 1}`;
      dialog.querySelector('[data-action="show-photo"][aria-pressed="true"]').setAttribute('aria-pressed', 'false');
      button.setAttribute('aria-pressed', 'true');
      break;
    }
    case 'remove-photo': {
      const form = button.form;
      const photos = photoDrafts.get(form);
      const index = Number(button.dataset.index);
      photos.splice(index, 1);
      renderPhotoDrafts(form);
      const next = form.querySelectorAll('[data-action="remove-photo"]')[Math.min(index, photos.length - 1)];
      (next ?? form.elements.uploads).focus();
      form.querySelector('#photo-status').textContent = `Photo removed. ${photos.length} of ${maxPhotos} photos ready.`;
      form.querySelector('#spot-error').textContent = '';
      break;
    }
    case 'favorite': {
      const spot = spots.find(spot => spot.id === id);
      const updated = { ...spot, favorite: !spot.favorite };
      updateSpot(updated, updated.favorite ? 'Added to Favorites' : 'Removed from Favorites');
      if (dialog.open) button.setAttribute('aria-pressed', updated.favorite);
      else (findButton(action, id) || findButton('collection-filter', collectionFilter) || main).focus({ preventScroll: true });
      break;
    }
    case 'add':
      spotForm(spots.find(spot => spot.id === id));
      break;
    case 'capture-location':
      captureLocation(button);
      break;
    case 'remove-location': {
      const form = button.form;
      setLocationDraft(form, undefined);
      form.querySelector('#location-status').textContent = 'GPS pin removed.';
      form.querySelector('[data-action="capture-location"]').focus();
      break;
    }
    case 'add-spot-item': {
      const editor = button.closest('.spot-items-editor');
      const list = editor.querySelector('.spot-item-list');
      list.insertAdjacentHTML('beforeend', spotItemRow(editor.dataset.kind));
      list.lastElementChild.querySelector('input').focus();
      break;
    }
    case 'remove-spot-item': {
      const row = button.closest('.spot-item-row');
      const neighbor = row.nextElementSibling ?? row.previousElementSibling;
      const next = neighbor?.querySelector('input') ?? button.closest('.spot-items-editor').querySelector('[data-action="add-spot-item"]');
      const form = button.form;
      row.remove();
      syncSpotSubmit(form);
      next.focus();
      break;
    }
    case 'remove-item-photo': {
      const row = button.closest('.spot-item-row');
      const preview = row.querySelector('.photo-preview');
      preview.querySelector('img').removeAttribute('src');
      preview.hidden = true;
      row.querySelector('[name="itemName"]').setCustomValidity('');
      row.querySelector('.form-message').textContent = 'Item photo removed.';
      button.form.querySelector('#spot-error').textContent = '';
      row.querySelector('[name="itemPhoto"]').focus();
      break;
    }
    case 'entry':
      entryForm(entries.find(entry => entry.id === id), spotId);
      break;
    case 'delete-entry':
      confirmDelete(entries.find(entry => entry.id === document.querySelector('#entry-form').dataset.id));
      break;
    case 'confirm-delete':
      entries = entries.filter(entry => entry.id !== id);
      save('entries', entries, 'Journal entry deleted');
      if (page === 'journal') renderPage();
      dialog.close();
      break;
    case 'close':
      dialog.close();
      break;
  }
}

function saveSpot(form, data, { foodItems, stayPlaces, shoppingItems }) {
  const existing = spots.find(spot => spot.id === form.dataset.id);
  let categoryId = data.category;
  let nextCategories = customCategories;
  if (categoryId === 'new') {
    const name = data.categoryName.trim().replace(/\s+/g, ' ');
    if (Object.values(categories).some(([label]) => searchKey(label) === searchKey(name))) {
      form.elements.categoryName.setCustomValidity('This category already exists. Select it from the list.');
      form.elements.categoryName.reportValidity();
      return false;
    }
    const isFood = Boolean(data.categoryFood);
    categoryId = `category-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    nextCategories = [...customCategories, [categoryId, [name, isFood ? 'food' : 'pin', isFood ? 'peach' : 'lavender', isFood]]];
  }
  const spot = {
    ...existing,
    id: existing?.id ?? `spot-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    custom: true,
    name: data.name.trim(),
    city: data.city.trim(),
    location: data.location.trim(),
    coordinates: locationDrafts.get(form),
    description: data.description.trim(),
    category: categoryId,
    status: data.status,
    foodItems,
    stayPlaces,
    shoppingItems,
    photos: photoDrafts.get(form),
  };
  const nextSpots = existing ? spots.map(current => current.id === spot.id ? spot : current) : [spot, ...spots];
  let message = existing ? 'Spot updated' : 'Spot added to your atlas';
  try {
    localStorage.setItem('spotly-spots', JSON.stringify({ spots: nextSpots, categories: nextCategories }));
  } catch (error) {
    const hasPhotos = spot.photos.length || [...foodItems, ...stayPlaces, ...shoppingItems].some(item => item.photo);
    if (spot.coordinates || hasPhotos) {
      let storageError = 'Browser storage is unavailable. Enable site storage and try again.';
      if (error.name === 'QuotaExceededError') {
        storageError = hasPhotos
          ? 'Browser storage is full. Remove some photos and try saving again.'
          : 'Browser storage is full. Free up space and try saving again.';
      }
      form.querySelector('#spot-error').textContent = storageError;
      return false;
    }
    message = 'Saved for this visit. Browser storage is unavailable.';
  }
  spots = nextSpots;
  customCategories = nextCategories;
  categories = { ...builtInCategories, ...Object.fromEntries(customCategories) };
  if (!existing) {
    query = '';
    category = 'all';
    sort = 'featured';
    if (page === 'spots') {
      collectionQuery = '';
      collectionCategory = 'all';
      collectionFilter = 'all';
    }
  } else if (!spots.some(current => current.category === category)) {
    category = 'all';
  }
  renderPage();
  showToast(message);
  return true;
}

function onSubmit(event) {
  const form = event.target;
  if (!['search-form', 'spot-form', 'entry-form'].includes(form.id)) return;
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  if (form.id === 'search-form') {
    query = data.query.trim();
    category = 'all';
    setPressed('category', category);
    refreshResults();
    document.querySelector('#discover-title').focus({ preventScroll: true });
    document.querySelector('#discover').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    return;
  }

  for (const field of form.querySelectorAll('input[required], textarea[required]')) {
    if (!field.value.trim()) {
      field.setCustomValidity('Enter a value before saving.');
      field.reportValidity();
      return;
    }
  }

  if (form.id === 'spot-form') {
    if (form.querySelector('[type="submit"]').disabled) return;
    const foodItems = readSpotItems(form.querySelector('#food-field'));
    if (!foodItems) return;
    const stayPlaces = readSpotItems(form.querySelector('#stay-field'));
    if (!stayPlaces) return;
    const shoppingItems = readSpotItems(form.querySelector('#shopping-field'));
    if (!shoppingItems || !saveSpot(form, data, { foodItems, stayPlaces, shoppingItems })) return;
  } else {
    const existing = entries.find(entry => entry.id === form.dataset.id);
    const entry = { ...data, id: existing?.id ?? `entry-${Date.now()}`, title: data.title.trim(), body: data.body.trim() };
    entries = existing ? entries.map(current => current.id === entry.id ? entry : current) : [entry, ...entries];
    save('entries', entries, existing ? 'Journal entry updated' : 'Journal entry saved');
    if (page === 'journal') renderPage();
  }
  dialog.close();
}

document.addEventListener('click', onAction);
document.addEventListener('submit', onSubmit);
document.addEventListener('input', event => {
  if (event.target.validity?.customError) event.target.setCustomValidity('');
  if (event.target.name === 'city' && event.target.form?.id === 'spot-form') {
    updateLocationRequirement(event.target.form);
  }
  if (event.target.id === 'search' && !event.target.value && query) {
    query = '';
    refreshResults();
  }
  if (event.target.id === 'collection-search') {
    const search = event.target.value.trim();
    if (search !== collectionQuery) {
      collectionQuery = search;
      refreshResults();
    }
  }
});
document.addEventListener('change', event => {
  const field = event.target;
  if (field.form?.id === 'spot-form') {
    if (field.name === 'category' || field.name === 'categoryFood') updateCategoryFields(field.form);
    if (field.name === 'uploads') addPhotos(field);
    if (field.name === 'itemPhoto') addItemPhoto(field);
  }
  if (event.target.id === 'sort') {
    sort = event.target.value;
    refreshResults();
  }
  if (event.target.id === 'collection-category') {
    collectionCategory = field.value;
    refreshResults();
  }
  if (event.target.id === 'detail-status-select') {
    const spot = spots.find(current => current.id === event.target.dataset.id);
    const status = event.target.value;
    updateSpot({ ...spot, status }, 'Travel status updated');
    const indicator = dialog.querySelector('#detail-status');
    indicator.innerHTML = status ? badge(status) : '';
    indicator.hidden = !status;
  }
});
dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  }
});
dialog.addEventListener('close', () => {
  const { button, action, id } = dialogOpener;
  const target = button?.isConnected ? button : action && findButton(action, id);
  (target || main).focus({ preventScroll: true });
});
document.querySelector('.skip-link').addEventListener('click', event => {
  event.preventDefault();
  main.focus();
  main.scrollIntoView();
});
window.addEventListener('hashchange', () => navigate());
navigate(false);

