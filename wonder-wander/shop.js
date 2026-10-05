// Shop All page: filtering, sorting, search and a tiny cart counter.
(() => {
  const cats = window.CATEGORIES;
  const products = window.PRODUCTS;
  const catById = Object.fromEntries(cats.map((c) => [c.id, c]));

  const grid = document.getElementById('grid');
  const chips = document.getElementById('chips');
  const results = document.getElementById('results');
  const empty = document.getElementById('empty');
  const q = document.getElementById('q');
  const sort = document.getElementById('sort');

  const params = new URLSearchParams(location.search);
  const state = {
    cat: catById[params.get('cat')] ? params.get('cat') : 'all',
    q: params.get('q') || '',
    sort: 'featured'
  };
  q.value = state.q;

  const money = (n) => (n == null ? '[price]' : `$${n.toFixed(2)}`);
  const esc = (s) => s.replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));

  // Category chips
  const chipHtml = (id, name, art) => `
    <button class="chip" type="button" data-cat="${id}" aria-pressed="false">
      ${art ? `<img src="characters/${art}.svg" alt="">` : ''}<span>${esc(name)}</span>
    </button>`;
  chips.innerHTML = chipHtml('all', 'Everything', 'ladybug') + cats.map((c) => chipHtml(c.id, c.name, c.art)).join('');
  chips.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    state.cat = chip.dataset.cat;
    render();
  });

  q.addEventListener('input', () => { state.q = q.value; render(); });
  sort.addEventListener('change', () => { state.sort = sort.value; render(); });
  document.getElementById('reset').addEventListener('click', () => {
    state.cat = 'all'; state.q = ''; q.value = ''; render();
  });

  const sorters = {
    featured: (a, b) => (a.featured ?? 999) - (b.featured ?? 999),
    'price-asc': (a, b) => (a.price ?? Infinity) - (b.price ?? Infinity),
    'price-desc': (a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity),
    name: (a, b) => a.name.localeCompare(b.name)
  };

  // Until real photos are in, give each product its own character so the grid feels varied
  const crew = ['frog', 'mushroom', 'bird', 'leaf', 'ladybug'];
  const placeholderArt = (id) => crew[[...id].reduce((h, ch) => h + ch.charCodeAt(0), 0) % crew.length];

  function card(p) {
    const c = catById[p.cat];
    const pic = p.img
      ? `<img class="photo" src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy">`
      : `<img class="art" src="characters/${placeholderArt(p.id)}.svg" alt="">`;
    return `
      <li class="shop-card">
        <div class="product-img ${c.tint}">
          ${pic}
          ${p.lowStock ? '<span class="sticker">Almost gone!</span>' : ''}
          ${p.ages ? `<span class="ages">Ages ${esc(p.ages)}</span>` : ''}
        </div>
        <span class="tag">${esc(c.name)}</span>
        <h3>${esc(p.name)}</h3>
        <div class="card-foot">
          <p class="price">${money(p.price)}</p>
          <button class="add" type="button" data-id="${p.id}" aria-label="Add ${esc(p.name)} to cart">
            <span aria-hidden="true">+</span> Add
          </button>
        </div>
      </li>`;
  }

  function render() {
    const term = state.q.trim().toLowerCase();
    const list = products
      .filter((p) => state.cat === 'all' || p.cat === state.cat)
      .filter((p) => !term || p.name.toLowerCase().includes(term) || catById[p.cat].name.toLowerCase().includes(term))
      .sort(sorters[state.sort]);

    grid.innerHTML = list.map(card).join('');
    empty.hidden = list.length > 0;
    results.textContent = `${list.length} ${list.length === 1 ? 'toy' : 'toys'}${state.cat !== 'all' ? ` in ${catById[state.cat].name}` : ''}`;
    chips.querySelectorAll('.chip').forEach((ch) => ch.setAttribute('aria-pressed', String(ch.dataset.cat === state.cat)));

    // Keep the URL shareable (e.g. shop.html?cat=outdoor)
    const next = new URLSearchParams();
    if (state.cat !== 'all') next.set('cat', state.cat);
    if (term) next.set('q', state.q.trim());
    history.replaceState(null, '', next.toString() ? `?${next}` : location.pathname);
  }

  // Cart counter (front-end only until checkout is connected)
  const countEl = document.querySelector('.cart-count');
  const toast = document.getElementById('toast');
  let count = 0;
  try { count = +localStorage.getItem('ww-cart') || 0; } catch (e) { /* storage blocked */ }
  const showCount = () => { countEl.textContent = count; countEl.hidden = count === 0; };
  showCount();

  let toastTimer;
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.add');
    if (!btn) return;
    const p = products.find((x) => x.id === btn.dataset.id);
    count += 1;
    try { localStorage.setItem('ww-cart', count); } catch (err) { /* storage blocked */ }
    showCount();
    countEl.classList.remove('bump'); void countEl.offsetWidth; countEl.classList.add('bump');
    btn.classList.add('added'); btn.innerHTML = '<span aria-hidden="true">✓</span> Added';
    setTimeout(() => { btn.classList.remove('added'); btn.innerHTML = '<span aria-hidden="true">+</span> Add'; }, 1400);
    toast.textContent = `${p.name} hopped into your cart!`;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  });

  render();
})();
