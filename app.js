(function () {
  const MAX_CARD_COLORS = 9;

  // Filter state
  const state = {
    search: '',
    line: 'all',
    gramMin: null,
    gramMax: null,
    widths: new Set(),
    ligamentos: new Set(),
    applications: new Set(),
    colorSearch: ''
  };

  // ─── Helpers ─────────────────────────────────────────────────
  const colorCodeFrom = str => str.split(' ')[0];
  const compositionText = comp => comp.map(c => `${c.material} ${c.percentage}%`).join(' · ');
  const fabricImagePath = code => `${code}.jpg`;

  // Ícones das instruções de lavagem (na mesma ordem de washingInstructions)
  // Seguem o estilo de símbolos têxteis (tina/balde + modificadores) quando aplicável
  const washIcons = [
    // 1. Lavar separadamente — duas camisetas lado a lado
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6l1.5-1.5h2l1 1 1-1h2L12 6l-1.2.8V13H4.2V6.8L3 6z"/><path d="M13 6l1.5-1.5h2l1 1 1-1h2L22 6l-1.2.8V13h-6.6V6.8L13 6z"/><line x1="12" y1="16" x2="12" y2="20"/></svg>',

    // 2. Lavagem manual — tina com mão dentro (símbolo ISO de lavagem à mão)
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9l2-4h16l2 4"/><path d="M3 9l1.5 10a2 2 0 0 0 2 1.7h11a2 2 0 0 0 2-1.7L21 9"/><path d="M9 13v-2a1 1 0 0 1 2 0v2"/><path d="M11 13v-3.5a1 1 0 0 1 2 0V13"/><path d="M13 13v-2.5a1 1 0 0 1 2 0v3.5"/><path d="M15 11.5a1 1 0 0 1 2 0V14"/></svg>',

    // 3. Não misturar cores — duas bolinhas (clara/escura) com proibição
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="12" r="4"/><circle cx="16" cy="12" r="4" fill="currentColor" fill-opacity="0.35"/><circle cx="12" cy="12" r="10.5"/><line x1="4.5" y1="19.5" x2="19.5" y2="4.5"/></svg>',

    // 4. Não friccionar — mão esfregando com proibição
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 14v-3a1 1 0 0 1 2 0v2"/><path d="M9 12v-4a1 1 0 0 1 2 0v4"/><path d="M11 8V6a1 1 0 0 1 2 0v6"/><path d="M13 9a1 1 0 0 1 2 0v5a4 4 0 0 1-4 4H9a3 3 0 0 1-3-3v-3"/><path d="M4 17l4 3"/><circle cx="12" cy="12" r="10.5"/><line x1="4.5" y1="19.5" x2="19.5" y2="4.5"/></svg>',

    // 5. Não misturar leves com pesadas — pena + peso
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3c3 0 4 3 4 6s-2 5-5 5H4l5-5h-3l5-6z"/><path d="M4 14l-1 7"/><path d="M15 15l-1-2h6l-1 2"/><rect x="13" y="15" width="8" height="6" rx="1"/><path d="M17 12v1"/></svg>',

    // 6. Enxaguar com água em abundância — tina com várias gotas
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 11l2-4h16l2 4"/><path d="M3 11l1.5 8a2 2 0 0 0 2 1.7h11a2 2 0 0 0 2-1.7L21 11"/><path d="M8 14c0 1 1 1.5 1 2.5S8 18 8 18s-1-.5-1-1.5S8 14 8 14z" fill="currentColor"/><path d="M12 13c0 1 1 1.5 1 2.5S12 17 12 17s-1-.5-1-1.5S12 13 12 13z" fill="currentColor"/><path d="M16 14c0 1 1 1.5 1 2.5S16 18 16 18s-1-.5-1-1.5S16 14 16 14z" fill="currentColor"/></svg>',

    // 7. Temperatura ambiente — tina com um ponto (símbolo ISO: 1 ponto = lavagem fria)
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9l2-4h16l2 4"/><path d="M3 9l1.5 10a2 2 0 0 0 2 1.7h11a2 2 0 0 0 2-1.7L21 9"/><circle cx="12" cy="14" r="1.5" fill="currentColor"/></svg>',

    // 8. Não deixar de molho — tina com X (proibido)
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9l2-4h16l2 4"/><path d="M3 9l1.5 10a2 2 0 0 0 2 1.7h11a2 2 0 0 0 2-1.7L21 9"/><line x1="5" y1="21" x2="19" y2="5"/><line x1="5" y1="5" x2="19" y2="21"/></svg>',

    // 9. Não torcer — pano torcido com proibição (símbolo ISO clássico)
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><circle cx="12" cy="12" r="10.5"/><line x1="4.5" y1="19.5" x2="19.5" y2="4.5"/></svg>'
  ];

  function normalizeText(s) {
    return (s || '').toString().toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  // Color search matching: returns true if the fabric has any color matching the query
  function fabricMatchesColorSearch(fabric, query) {
    if (!query) return true;
    const q = normalizeText(query);
    return fabric.colors.some(colorStr => {
      if (colorStr === 'N/A') return false;
      const code = colorCodeFrom(colorStr);
      const data = colorData[code];
      const fullName = data ? normalizeText(data.name) : normalizeText(colorStr);
      return fullName.includes(q) || normalizeText(code).includes(q);
    });
  }

  // Color should be highlighted (matched the search)?
  function colorMatchesSearch(colorStr, query) {
    if (!query || colorStr === 'N/A') return false;
    const q = normalizeText(query);
    const code = colorCodeFrom(colorStr);
    const data = colorData[code];
    const fullName = data ? normalizeText(data.name) : normalizeText(colorStr);
    return fullName.includes(q) || normalizeText(code).includes(q);
  }

  function buildColorDot(colorStr, highlight) {
    if (colorStr === 'N/A') return '';
    const code = colorCodeFrom(colorStr);
    const data = colorData[code];
    if (!data) return '';
    const hex = data.hex || '#ccc';
    const img = data.img && data.img !== 'NA.png'
      ? `<img src="${data.img}" alt="${data.name}" loading="lazy" onerror="this.remove()">`
      : '';
    return `<div class="color-dot${highlight ? ' highlight' : ''}" style="background:${hex}" title="${data.name}">${img}</div>`;
  }

  function buildColorSwatch(colorStr, highlight) {
    if (colorStr === 'N/A') return '';
    const code = colorCodeFrom(colorStr);
    const data = colorData[code];
    if (!data) return '';
    const hex = data.hex || '#ccc';
    const parts = data.name.split(' - ');
    const label = parts.length > 1 ? parts.slice(1).join(' - ') : data.name;
    const img = data.img && data.img !== 'NA.png'
      ? `<img src="${data.img}" alt="${data.name}" loading="lazy" onerror="this.remove()">`
      : '';
    return `
      <div class="color-item">
        <div class="color-swatch${highlight ? ' highlight' : ''}" style="background:${hex}">${img}</div>
        <div class="color-name">${label}</div>
        <div class="color-pantone">${data.pantone}</div>
      </div>`;
  }

  // ─── Filter options ──────────────────────────────────────────
  function allLines() {
    const set = new Set();
    fabrics.forEach(f => f.line.forEach(l => set.add(l)));
    return Array.from(set).sort();
  }
  function allWidths() {
    const set = new Set();
    fabrics.forEach(f => set.add(f.width));
    return Array.from(set).sort((a, b) => a - b);
  }
  function allLigamentos() {
    const set = new Set();
    fabrics.forEach(f => set.add(f.ligamento));
    return Array.from(set).sort();
  }
  function allApplications() {
    const set = new Set();
    fabrics.forEach(f => f.application.forEach(a => { if (a) set.add(a); }));
    return Array.from(set).sort();
  }
  function gramRange() {
    const vals = fabrics.map(f => f.gramWeight);
    return { min: Math.min(...vals), max: Math.max(...vals) };
  }

  function activeFilterCount() {
    let n = 0;
    if (state.gramMin != null) n++;
    if (state.gramMax != null) n++;
    n += state.widths.size;
    n += state.ligamentos.size;
    n += state.applications.size;
    if (state.colorSearch) n++;
    return n;
  }

  // ─── Filtering ───────────────────────────────────────────────
  function filteredFabrics() {
    const q = normalizeText(state.search);
    return fabrics.filter(f => {
      if (q) {
        const nameOk = normalizeText(f.name).includes(q) || f.code.includes(state.search);
        if (!nameOk) return false;
      }
      if (state.line !== 'all' && !f.line.includes(state.line)) return false;
      if (state.gramMin != null && f.gramWeight < state.gramMin) return false;
      if (state.gramMax != null && f.gramWeight > state.gramMax) return false;
      if (state.widths.size && !state.widths.has(f.width)) return false;
      if (state.ligamentos.size && !state.ligamentos.has(f.ligamento)) return false;
      if (state.applications.size) {
        const hasAny = f.application.some(a => state.applications.has(a));
        if (!hasAny) return false;
      }
      if (state.colorSearch && !fabricMatchesColorSearch(f, state.colorSearch)) return false;
      return true;
    });
  }

  // ─── Render: filter chips (linhas) ───────────────────────────
  function renderLineChips() {
    const lines = allLines();
    const container = document.getElementById('line-filters');
    container.innerHTML =
      `<button class="chip active" data-filter="all">Todos</button>` +
      lines.map(l => `<button class="chip" data-filter="${l}">${l}</button>`).join('');

    container.addEventListener('click', e => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      container.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.line = chip.dataset.filter;
      renderGrid();
    });
  }

  // ─── Render: advanced filters ────────────────────────────────
  function renderAdvancedFilters() {
    const { min, max } = gramRange();
    document.getElementById('gram-hint').textContent = `(faixa: ${min}–${max})`;
    document.getElementById('gram-min').min = min;
    document.getElementById('gram-min').max = max;
    document.getElementById('gram-max').min = min;
    document.getElementById('gram-max').max = max;

    const widthContainer = document.getElementById('width-filters');
    widthContainer.innerHTML = allWidths()
      .map(w => `<button class="pill" data-value="${w}">${w.toFixed(2)} m</button>`).join('');

    const ligContainer = document.getElementById('ligamento-filters');
    ligContainer.innerHTML = allLigamentos()
      .map(l => `<button class="pill" data-value="${l}">${l}</button>`).join('');

    const appContainer = document.getElementById('application-filters');
    appContainer.innerHTML = allApplications()
      .map(a => `<button class="pill" data-value="${a}">${a}</button>`).join('');

    bindPillGroup(widthContainer, state.widths, parseFloat);
    bindPillGroup(ligContainer, state.ligamentos, v => v);
    bindPillGroup(appContainer, state.applications, v => v);
  }

  function bindPillGroup(container, stateSet, parser) {
    container.addEventListener('click', e => {
      const pill = e.target.closest('.pill');
      if (!pill) return;
      const val = parser(pill.dataset.value);
      if (stateSet.has(val)) { stateSet.delete(val); pill.classList.remove('active'); }
      else { stateSet.add(val); pill.classList.add('active'); }
      updateBadge();
      renderGrid();
    });
  }

  function updateBadge() {
    const n = activeFilterCount();
    const badge = document.getElementById('filter-badge');
    badge.textContent = n;
    badge.classList.toggle('hidden', n === 0);
  }

  function clearFilters() {
    state.gramMin = null;
    state.gramMax = null;
    state.widths.clear();
    state.ligamentos.clear();
    state.applications.clear();
    state.colorSearch = '';
    document.getElementById('gram-min').value = '';
    document.getElementById('gram-max').value = '';
    document.getElementById('color-search').value = '';
    document.querySelectorAll('.advanced-panel .pill.active').forEach(p => p.classList.remove('active'));
    updateBadge();
    renderGrid();
  }

  // ─── Render: card ────────────────────────────────────────────
  function renderCard(f) {
    const isNA = f.colors[0] === 'N/A';
    const imgPath = fabricImagePath(f.code);

    const imageHtml = `
      <img src="${imgPath}" alt="${f.name}"
           onerror="this.parentElement.innerHTML='<div class=\\'card-image-placeholder\\'><svg viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'1.5\\'><rect x=\\'3\\' y=\\'3\\' width=\\'18\\' height=\\'18\\' rx=\\'2\\'/><path d=\\'M3 9h18M9 21V9\\'/></svg><span>Foto em breve</span></div>'">`;

    const visible = f.colors.slice(0, MAX_CARD_COLORS);
    const more = f.colors.length - MAX_CARD_COLORS;
    const cs = state.colorSearch;
    const colorsHtml = isNA
      ? '<span class="colors-na-badge">Sob consulta</span>'
      : visible.map(c => buildColorDot(c, colorMatchesSearch(c, cs))).join('') +
        (more > 0 ? `<span class="colors-more">+${more}</span>` : '');

    return `
      <article class="fabric-card" data-code="${f.code}">
        <div class="card-image">${imageHtml}</div>
        <div class="card-body">
          <div class="card-header">
            <h2 class="card-name">${f.name}</h2>
            <span class="card-code">${f.code}</span>
          </div>
          <div class="card-specs">
            <div class="spec-item">
              <span class="spec-label">Composição</span>
              <span class="spec-value">${compositionText(f.composition)}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Gramatura</span>
              <span class="spec-value">${f.gramWeight} g/m²</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Largura</span>
              <span class="spec-value">${f.width.toFixed(2)} m</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Ligamento</span>
              <span class="spec-value">${f.ligamento}</span>
            </div>
          </div>
          <div class="card-lines">
            ${f.line.map(l => `<span class="line-tag">${l}</span>`).join('')}
          </div>
          <div class="card-colors">${colorsHtml}</div>
        </div>
      </article>`;
  }

  // ─── Render: grid ────────────────────────────────────────────
  function renderGrid() {
    const list = filteredFabrics();
    const grid = document.getElementById('fabric-grid');
    const noResults = document.getElementById('no-results');
    const count = document.getElementById('results-count');

    if (list.length === 0) {
      grid.innerHTML = '';
      noResults.classList.remove('hidden');
    } else {
      noResults.classList.add('hidden');
      grid.innerHTML = list.map(renderCard).join('');
    }
    const n = list.length;
    count.textContent = `${n} tecido${n !== 1 ? 's' : ''} encontrado${n !== 1 ? 's' : ''} (de ${fabrics.length})`;
  }

  // ─── Modal ───────────────────────────────────────────────────
  function openModal(f) {
    const isNA = f.colors[0] === 'N/A';
    const apps = f.application.filter(a => a && a !== '#');
    const imgPath = fabricImagePath(f.code);
    const cs = state.colorSearch;

    const html = `
      <div class="modal-header">
        <div>
          <h2 class="modal-name">${f.name}</h2>
          <div class="modal-lines">
            ${f.line.map(l => `<span class="modal-line-tag">${l}</span>`).join('')}
          </div>
        </div>
        <span class="modal-code">Cód. ${f.code}</span>
      </div>

      <div class="modal-image">
        <img src="${imgPath}" alt="${f.name}"
             onerror="this.parentElement.innerHTML='<div class=\\'modal-image-placeholder\\'><svg viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'1.5\\'><rect x=\\'3\\' y=\\'3\\' width=\\'18\\' height=\\'18\\' rx=\\'2\\'/><path d=\\'M3 9h18M9 21V9\\'/></svg><span>Foto em breve</span></div>'">
      </div>

      <div class="modal-grid">
        <div class="modal-field full">
          <span class="field-label">Composição</span>
          <div class="comp-list">
            ${f.composition.map(c => `
              <div class="comp-item">
                <div class="comp-bar-track">
                  <div class="comp-bar-fill" style="width:${c.percentage}%"></div>
                </div>
                <span class="comp-bar-label">${c.material} — ${c.percentage}%</span>
              </div>`).join('')}
          </div>
        </div>

        <div class="modal-field">
          <span class="field-label">Gramatura</span>
          <span class="field-value">${f.gramWeight} g/m²</span>
        </div>
        <div class="modal-field">
          <span class="field-label">Largura</span>
          <span class="field-value">${f.width.toFixed(2)} m</span>
        </div>
        <div class="modal-field">
          <span class="field-label">Ligamento</span>
          <span class="field-value">${f.ligamento}</span>
        </div>
        <div class="modal-field">
          <span class="field-label">Segmento / Linha</span>
          <span class="field-value">${f.line.join(', ')}</span>
        </div>

        ${apps.length > 0 ? `
        <div class="modal-field full">
          <span class="field-label">Aplicações</span>
          <div class="tag-list">
            ${apps.map(a => `<span class="tag">${a}</span>`).join('')}
          </div>
        </div>` : ''}

        <div class="modal-field full">
          <span class="field-label">Instruções de Lavagem</span>
          <ul class="wash-list">
            ${washingInstructions.map((w, i) => `
              <li class="wash-item">
                <span class="wash-icon">${washIcons[i] || ''}</span>
                <span>${w}</span>
              </li>`).join('')}
          </ul>
        </div>
      </div>

      <hr class="section-divider">
      <p class="section-label">Cores disponíveis${isNA ? '' : ` (${f.colors.length})`}</p>
      ${isNA
        ? '<p class="colors-na-text">Cores disponíveis apenas sob consulta.</p>'
        : `<div class="colors-grid">${f.colors.map(c => buildColorSwatch(c, colorMatchesSearch(c, cs))).join('')}</div>`}
    `;

    document.getElementById('modal-content').innerHTML = html;
    document.getElementById('modal-overlay').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
    document.body.style.overflow = '';
  }

  // ─── Calendar ────────────────────────────────────────────────
  const MONTH_NAMES = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
  const EVENT_TYPE_LABELS = { feira: 'Feira', lancamento: 'Lançamento', promocao: 'Promoção', feriado: 'Feriado', interno: 'Interno' };

  let calDate = new Date(); // current month shown

  function formatDateBR(dateStr) {
    const [y, m, d] = dateStr.split('-').map(Number);
    return `${String(d).padStart(2,'0')}/${String(m).padStart(2,'0')}/${y}`;
  }
  function sameYMD(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }
  function parseEventDate(str) {
    const [y, m, d] = str.split('-').map(Number);
    return new Date(y, m - 1, d);
  }
  function eventsOnDate(date) {
    return events.filter(e => {
      const ed = parseEventDate(e.date);
      return sameYMD(ed, date);
    });
  }

  function renderCalendar() {
    const year = calDate.getFullYear();
    const month = calDate.getMonth();
    const today = new Date();

    document.getElementById('cal-title').textContent = `${MONTH_NAMES[month]} de ${year}`;

    const firstDay = new Date(year, month, 1);
    const startOffset = firstDay.getDay(); // 0 = Sunday
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const cells = [];
    // Leading days from prev month
    for (let i = startOffset - 1; i >= 0; i--) {
      cells.push({ day: daysInPrevMonth - i, date: new Date(year, month - 1, daysInPrevMonth - i), other: true });
    }
    // This month
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, date: new Date(year, month, d), other: false });
    }
    // Trailing days — fill to complete weeks (multiple of 7)
    while (cells.length % 7 !== 0) {
      const next = cells.length - (startOffset + daysInMonth) + 1;
      cells.push({ day: next, date: new Date(year, month + 1, next), other: true });
    }

    const grid = document.getElementById('cal-grid');
    grid.innerHTML = cells.map(c => {
      const evts = eventsOnDate(c.date);
      const isToday = sameYMD(c.date, today);
      const cls = ['cal-cell'];
      if (c.other) cls.push('other-month');
      if (isToday) cls.push('today');
      if (evts.length) cls.push('has-event');

      const pills = evts.slice(0, 2).map(e =>
        `<span class="cal-event-pill ${e.type}" title="${e.title}">${e.title}</span>`
      ).join('');
      const more = evts.length > 2 ? `<span class="cal-event-more">+${evts.length - 2}</span>` : '';

      const iso = `${c.date.getFullYear()}-${String(c.date.getMonth()+1).padStart(2,'0')}-${String(c.date.getDate()).padStart(2,'0')}`;
      return `<div class="${cls.join(' ')}" data-date="${iso}">
        <span class="cal-day-num">${c.day}</span>
        <div class="cal-events">${pills}${more}</div>
      </div>`;
    }).join('');
  }

  function renderEventsList() {
    const today = new Date(); today.setHours(0,0,0,0);
    const upcoming = events
      .map(e => ({ ...e, _d: parseEventDate(e.date) }))
      .filter(e => e._d >= today)
      .sort((a, b) => a._d - b._d)
      .slice(0, 15);

    const list = document.getElementById('events-list');
    if (upcoming.length === 0) {
      list.innerHTML = '<p style="font-size:0.82rem;color:var(--text-muted)">Nenhum evento futuro cadastrado.</p>';
      return;
    }
    list.innerHTML = upcoming.map(e => `
      <div class="event-card ${e.type}" data-date="${e.date}">
        <div class="event-date-row">
          <span class="event-date">${formatDateBR(e.date)}</span>
          <span class="event-type-badge ${e.type}">${EVENT_TYPE_LABELS[e.type] || e.type}</span>
        </div>
        <div class="event-name">${e.title}</div>
        ${e.location && e.location !== '-' ? `<div class="event-loc">📍 ${e.location}</div>` : ''}
      </div>
    `).join('');
  }

  function openEventModal(date) {
    const evts = events.filter(e => e.date === date);
    if (evts.length === 0) return;

    const html = evts.map(e => `
      <div class="event-modal" ${evts.length > 1 ? 'style="margin-bottom:1.5rem;padding-bottom:1.5rem;border-bottom:1px solid var(--border)"' : ''}>
        <div class="modal-header" style="border-bottom:none;padding-bottom:0;margin-bottom:1rem">
          <div>
            <h2 class="modal-name">${e.title}</h2>
            <div class="modal-lines">
              <span class="event-type-badge ${e.type}">${EVENT_TYPE_LABELS[e.type] || e.type}</span>
            </div>
          </div>
        </div>
        <div class="event-meta">
          <div class="event-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            ${formatDateBR(e.date)}
          </div>
          ${e.location && e.location !== '-' ? `
          <div class="event-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${e.location}
          </div>` : ''}
        </div>
        <p class="event-desc">${e.description || ''}</p>
      </div>
    `).join('');

    document.getElementById('modal-content').innerHTML = html;
    document.getElementById('modal-overlay').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function switchView(view) {
    document.querySelectorAll('.view-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.view === view);
    });
    document.getElementById('fabrics-view').classList.toggle('hidden', view !== 'fabrics');
    document.getElementById('events-view').classList.toggle('hidden', view !== 'events');
    document.getElementById('reps-view').classList.toggle('hidden', view !== 'reps');
    document.getElementById('filter-bar').classList.toggle('hidden', view !== 'fabrics');
    const adv = document.getElementById('advanced-panel');
    if (view !== 'fabrics') adv.classList.add('hidden');

    if (view === 'events') {
      renderCalendar();
      renderEventsList();
    }
    if (view === 'reps') {
      renderBrazilMap();
      renderRepsList();
    }
  }

  // ─── Representantes / Mapa do Brasil ─────────────────────────
  let selectedRepId = null;

  function repForState(uf) {
    return representatives.find(r => r.states.includes(uf));
  }

  let mapLoaded = false;
  async function renderBrazilMap() {
    if (mapLoaded) return;
    const container = document.getElementById('brazil-map');
    try {
      const res = await fetch('brazil.svg');
      const svgText = await res.text();
      container.innerHTML = svgText;

      // Annotate each <path> with UF, region, name, rep
      container.querySelectorAll('path[id]').forEach(path => {
        const uf = path.id.toUpperCase();
        const meta = UF_GRID[uf];
        if (!meta) return;
        const [, , name, region] = meta;
        const rep = repForState(uf);
        path.setAttribute('data-uf', uf);
        path.setAttribute('data-region', region);
        path.setAttribute('data-name', name);
        if (rep) path.setAttribute('data-rep', rep.id);
      });

      mapLoaded = true;
      // Re-apply any current highlight
      updateMapHighlight();
    } catch (err) {
      container.innerHTML = '<p style="padding:2rem;text-align:center;color:var(--text-muted)">Não foi possível carregar o mapa. Verifique se <code>brazil.svg</code> está na mesma pasta.</p>';
    }
  }

  function renderRepsList() {
    const list = document.getElementById('reps-list');
    const title = document.getElementById('reps-sidebar-title');

    const ordered = [...representatives].sort((a, b) => {
      const regionOrder = ['Norte','Nordeste','Centro-Oeste','Sudeste','Sul'];
      return regionOrder.indexOf(a.region) - regionOrder.indexOf(b.region) || a.name.localeCompare(b.name);
    });

    title.textContent = selectedRepId
      ? 'Representante selecionado'
      : `Todos os representantes (${representatives.length})`;

    const visible = selectedRepId
      ? ordered.filter(r => r.id === selectedRepId)
      : ordered;

    list.innerHTML = visible.map(r => `
      <div class="rep-card${r.id === selectedRepId ? ' active' : ''}"
           data-rep="${r.id}" data-region="${r.region}">
        <div class="rep-header">
          <span class="rep-name">${r.name}</span>
          <span class="rep-region-badge" data-region="${r.region}">${r.region}</span>
        </div>
        <div class="rep-states">
          ${r.states.map(s => `<span class="rep-state-chip">${s}</span>`).join('')}
        </div>
        <div class="rep-contacts">
          <a class="rep-contact" href="tel:+55${r.phone.replace(/\D/g,'')}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            ${r.phone}
          </a>
          <a class="rep-contact whatsapp" href="https://wa.me/${r.whatsapp}" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-1.77-.89-2.93-1.58-4.1-3.58-.31-.53.31-.5.89-1.65.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.23 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35zM12 2A10 10 0 0 0 2 12c0 1.76.46 3.42 1.27 4.86L2 22l5.25-1.38A9.99 9.99 0 1 0 12 2z"/></svg>
            WhatsApp
          </a>
          <a class="rep-contact" href="mailto:${r.email}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/></svg>
            ${r.email}
          </a>
        </div>
      </div>
    `).join('');

    if (selectedRepId) {
      list.insertAdjacentHTML('afterend',
        `<button class="btn-clear-rep" id="btn-clear-rep">Ver todos os representantes</button>`);
    }
  }

  function selectRep(repId) {
    selectedRepId = (selectedRepId === repId) ? null : repId;
    updateMapHighlight();
    renderRepsList();
  }

  function updateMapHighlight() {
    const paths = document.querySelectorAll('#brazil-map path[data-uf]');
    if (!selectedRepId) {
      paths.forEach(p => p.classList.remove('highlight', 'dim'));
      return;
    }
    const rep = representatives.find(r => r.id === selectedRepId);
    if (!rep) return;
    paths.forEach(p => {
      if (rep.states.includes(p.dataset.uf)) {
        p.classList.add('highlight');
        p.classList.remove('dim');
      } else {
        p.classList.remove('highlight');
        p.classList.add('dim');
      }
    });
  }

  function showMapTooltip(path) {
    const tooltip = document.getElementById('map-tooltip');
    const rep = representatives.find(r => r.id == path.dataset.rep);
    tooltip.innerHTML = `
      <strong>${path.dataset.name} (${path.dataset.uf})</strong>
      ${rep ? rep.name : 'Sem representante'}
      ${rep ? `<small>${rep.phone}</small>` : ''}
    `;
    tooltip.classList.remove('hidden');
    const rect = path.getBoundingClientRect();
    const tipRect = tooltip.getBoundingClientRect();
    tooltip.style.left = (rect.left + rect.width / 2 - tipRect.width / 2) + 'px';
    tooltip.style.top = (rect.top - tipRect.height - 8) + 'px';
  }
  function hideMapTooltip() {
    document.getElementById('map-tooltip').classList.add('hidden');
  }

  // ─── Init ────────────────────────────────────────────────────
  function init() {
    renderLineChips();
    renderAdvancedFilters();
    renderGrid();

    // Top search
    document.getElementById('search-input').addEventListener('input', e => {
      state.search = e.target.value.trim();
      renderGrid();
    });

    // Advanced panel toggle
    const toggle = document.getElementById('advanced-toggle');
    const panel = document.getElementById('advanced-panel');
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      panel.classList.toggle('hidden', expanded);
    });

    // Gramatura inputs
    document.getElementById('gram-min').addEventListener('input', e => {
      const v = e.target.value.trim();
      state.gramMin = v === '' ? null : Number(v);
      updateBadge(); renderGrid();
    });
    document.getElementById('gram-max').addEventListener('input', e => {
      const v = e.target.value.trim();
      state.gramMax = v === '' ? null : Number(v);
      updateBadge(); renderGrid();
    });

    // Color search
    document.getElementById('color-search').addEventListener('input', e => {
      state.colorSearch = e.target.value.trim();
      updateBadge(); renderGrid();
    });

    // Clear filters
    document.getElementById('clear-filters').addEventListener('click', clearFilters);

    // Card click → modal
    document.getElementById('fabric-grid').addEventListener('click', e => {
      const card = e.target.closest('.fabric-card');
      if (!card) return;
      const fabric = fabrics.find(f => f.code === card.dataset.code);
      if (fabric) openModal(fabric);
    });

    // View tabs
    document.querySelectorAll('.view-tab').forEach(tab => {
      tab.addEventListener('click', () => switchView(tab.dataset.view));
    });

    // Calendar navigation
    document.getElementById('cal-prev').addEventListener('click', () => {
      calDate = new Date(calDate.getFullYear(), calDate.getMonth() - 1, 1);
      renderCalendar();
    });
    document.getElementById('cal-next').addEventListener('click', () => {
      calDate = new Date(calDate.getFullYear(), calDate.getMonth() + 1, 1);
      renderCalendar();
    });
    document.getElementById('cal-today').addEventListener('click', () => {
      calDate = new Date();
      renderCalendar();
    });

    // Calendar cell click
    document.getElementById('cal-grid').addEventListener('click', e => {
      const cell = e.target.closest('.cal-cell.has-event');
      if (!cell) return;
      openEventModal(cell.dataset.date);
    });

    // Events sidebar click
    document.getElementById('events-list').addEventListener('click', e => {
      const card = e.target.closest('.event-card');
      if (!card) return;
      openEventModal(card.dataset.date);
    });

    // Brazil map interactions (event delegation works after async SVG inject)
    const mapEl = document.getElementById('brazil-map');
    mapEl.addEventListener('click', e => {
      const path = e.target.closest('path[data-uf]');
      if (!path || !path.dataset.rep) return;
      selectRep(Number(path.dataset.rep));
    });
    mapEl.addEventListener('mouseover', e => {
      const path = e.target.closest('path[data-uf]');
      if (path) showMapTooltip(path);
    });
    mapEl.addEventListener('mouseout', e => {
      if (e.target.closest('path[data-uf]')) hideMapTooltip();
    });

    // Reps sidebar click
    document.getElementById('reps-list').addEventListener('click', e => {
      const card = e.target.closest('.rep-card');
      if (card) selectRep(Number(card.dataset.rep));
    });
    document.addEventListener('click', e => {
      if (e.target.id === 'btn-clear-rep') {
        selectedRepId = null;
        updateMapHighlight();
        renderRepsList();
      }
    });

    // Modal close
    document.getElementById('modal-close').addEventListener('click', closeModal);
    document.getElementById('modal-overlay').addEventListener('click', e => {
      if (e.target.id === 'modal-overlay') closeModal();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  }

  init();
})();
