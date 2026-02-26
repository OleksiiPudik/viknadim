/* ============================================================
   ВікнаДім — Двигун каталогу (SPA-навігація)
   Файл: js/catalog.js

   Залежить від: catalog-data.js (масив CATALOG)

   Як працює:
   - Читає хеш з URL: services.html#metaloplast/wds
   - Знаходить відповідний вузол у дереві CATALOG
   - Рендерить картки дочірніх елементів
   - Оновлює хлібні крихти, заголовок, опис
   - Кнопка «назад» у браузері працює через hashchange
   ============================================================ */

(function () {
  'use strict';

  /* ── DOM-елементи ── */
  var root       = document.getElementById('catalog-root');
  var heroTitle  = document.getElementById('catalog-title');
  var heroDesc   = document.getElementById('catalog-desc');
  var heroCrumbs = document.getElementById('catalog-breadcrumbs');
  var heroTag    = document.getElementById('catalog-tag');

  if (!root) return;                 // не на сторінці каталогу


  /* ── SVG-іконки для категорій рівня 1 ── */
  var ICONS = {
    metaloplast:
      '<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="1"/>' +
      '<line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>',

    aluminium:
      '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="1"/>' +
      '<path d="M3 8h18M3 16h18M8 3v18"/></svg>',

    accessories:
      '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/>' +
      '<path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1.08-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1.08 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H10a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V10c.26.6.77 1.02 1.51 1.08H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',

    glass:
      '<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="2"/>' +
      '<line x1="2" y1="9" x2="22" y2="9"/><line x1="9" y1="2" x2="9" y2="22"/></svg>',

    sunprotect:
      '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/>' +
      '<line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>' +
      '<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>' +
      '<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>' +
      '<line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>' +
      '<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>' +
      '<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
  };


  /* ── Генерична іконка для вузлів з дочірніми ── */
  var ICON_FOLDER =
    '<svg viewBox="0 0 24 24"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>';

  /* ── Генерична іконка для «листових» вузлів ── */
  var ICON_ITEM =
    '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>' +
    '<polyline points="14 2 14 8 20 8"/></svg>';

  /* ── Стрілка для кнопки ── */
  var ARROW = ' <span class="catalog-arrow">→</span>';


  /* ════════════════════════════════════════════
     УТИЛІТИ
     ════════════════════════════════════════════ */

  /** Повертає масив сегментів шляху з хеша URL */
  function getPath() {
    return window.location.hash
      .replace(/^#\/?/, '')
      .split('/')
      .filter(Boolean);
  }

  /** Знаходить вузол по шляху і повертає ланцюжок (breadcrumb chain) */
  function findByPath(path) {
    var nodes = CATALOG;
    var chain = [];

    for (var i = 0; i < path.length; i++) {
      var found = null;
      for (var j = 0; j < nodes.length; j++) {
        if (nodes[j].id === path[i]) { found = nodes[j]; break; }
      }
      if (!found) return null;
      chain.push(found);
      nodes = found.children || [];
    }

    return {
      chain: chain,
      current: chain.length ? chain[chain.length - 1] : null,
      children: nodes
    };
  }

  /** Підраховує кількість дочірніх елементів */
  function childCount(node) {
    return (node.children && node.children.length) || 0;
  }

  /** Формує слово «варіант / варіанти / варіантів» */
  function pluralize(n) {
    var last = n % 10;
    var lastTwo = n % 100;
    if (lastTwo >= 11 && lastTwo <= 19) return n + ' позицій';
    if (last === 1) return n + ' позиція';
    if (last >= 2 && last <= 4) return n + ' позиції';
    return n + ' позицій';
  }


  /* ════════════════════════════════════════════
     РЕНДЕРИНГ
     ════════════════════════════════════════════ */

  /** Генерує HTML хлібних крихт */
  function renderBreadcrumbs(chain) {
    var html = '<a href="index.html">Головна</a>' +
               '<span class="breadcrumbs-sep">/</span>' +
               (chain.length
                 ? '<a href="services.html">Товари та послуги</a>'
                 : '<span>Товари та послуги</span>');

    for (var i = 0; i < chain.length; i++) {
      html += '<span class="breadcrumbs-sep">/</span>';
      if (i < chain.length - 1) {
        // посилання на проміжний рівень
        var href = '#' + chain.slice(0, i + 1).map(function(n) { return n.id; }).join('/');
        html += '<a href="' + href + '">' + chain[i].title + '</a>';
      } else {
        // активний (поточний) рівень
        html += '<span>' + chain[i].title + '</span>';
      }
    }

    return html;
  }


  /** Генерує кнопку «← Назад» */
  function renderBackBtn(chain) {
    if (!chain.length) return '';

    var parentHash = chain.length > 1
      ? '#' + chain.slice(0, -1).map(function(n) { return n.id; }).join('/')
      : 'services.html';

    var parentTitle = chain.length > 1
      ? chain[chain.length - 2].title
      : 'Всі категорії';

    return '<a href="' + parentHash + '" class="catalog-back">' +
           '<svg viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"/>' +
           '<polyline points="12 19 5 12 12 5"/></svg>' +
           parentTitle + '</a>';
  }


  /** Генерує одну картку */
  function renderCard(item, hashPrefix, depth) {
    var hasKids = childCount(item) > 0;
    var href = '#' + hashPrefix + item.id;

    var icon = '';
    if (depth === 0 && ICONS[item.id]) {
      icon = '<div class="catalog-card-icon">' + ICONS[item.id] + '</div>';
    } else if (hasKids) {
      icon = '<div class="catalog-card-icon catalog-card-icon--small">' + ICON_FOLDER + '</div>';
    } else {
      icon = '<div class="catalog-card-icon catalog-card-icon--small">' + ICON_ITEM + '</div>';
    }

    var badge = item.badge
      ? '<span class="catalog-badge">' + item.badge + '</span>'
      : '';

    var desc = item.desc
      ? '<p class="catalog-card-desc">' + item.desc + '</p>'
      : '';

    var count = hasKids
      ? '<span class="catalog-card-count">' + pluralize(childCount(item)) + '</span>'
      : '';

    var btnLabel = hasKids ? 'Детальніше' + ARROW : 'Переглянути' + ARROW;

    var classModifier = depth === 0
      ? ' catalog-card--top'
      : (hasKids ? '' : ' catalog-card--leaf');

    return '<a href="' + href + '" class="catalog-card' + classModifier + '">' +
             icon + badge +
             '<h3 class="catalog-card-title">' + item.title + '</h3>' +
             desc + count +
             '<span class="catalog-card-btn">' + btnLabel + '</span>' +
           '</a>';
  }


  /** Головна функція рендерингу */
  function render() {
    var path = getPath();
    var result;

    if (path.length) {
      result = findByPath(path);
      if (!result) {
        // невалідний хеш — повертаємось на головну
        window.location.hash = '';
        return;
      }
    } else {
      result = { chain: [], current: null, children: CATALOG };
    }

    var chain    = result.chain;
    var current  = result.current;
    var children = result.children;

    /* ── Оновлюємо hero ── */
    heroCrumbs.innerHTML = renderBreadcrumbs(chain);

    if (current) {
      heroTitle.innerHTML = current.title;
      heroDesc.textContent = current.desc || '';
      heroTag.textContent = current.title;
      document.title = current.title + ' — ВікнаДім';
    } else {
      heroTitle.innerHTML = 'Товари та <span>послуги</span>';
      heroDesc.textContent = 'Повний цикл виготовлення та монтажу — металопластик, алюміній, скло, сонцезахист.';
      heroTag.textContent = 'Каталог';
      document.title = 'Товари та послуги — ВікнаДім';
    }

    /* ── Визначаємо глибину для стилізації ── */
    var depth = chain.length;
    var hashPrefix = path.length ? path.join('/') + '/' : '';

    /* ── Рендеримо сітку карток ── */
    var html = renderBackBtn(chain);

    if (children.length) {
      var gridClass = depth === 0
        ? 'catalog-grid catalog-grid--top'
        : 'catalog-grid catalog-grid--inner';

      html += '<div class="' + gridClass + '">';
      for (var i = 0; i < children.length; i++) {
        html += renderCard(children[i], hashPrefix, depth);
      }
      html += '</div>';
    } else if (current) {
      /* Лист без дочірніх — показуємо деталі товару + кнопку замовити */
      html += '<div class="catalog-leaf-detail">';
      if (current.desc) {
        html += '<p>' + current.desc + '</p>';
      }
      html += '<div class="catalog-leaf-actions">' +
                '<a href="contacts.html" class="btn btn-primary">Замовити</a>' +
              '</div>' +
              '</div>';
    }

    root.innerHTML = html;

    /* ── Скролимо до каталогу при переході (крім початкового завантаження) ── */
    if (path.length) {
      var section = document.querySelector('.catalog-section');
      if (section) {
        var top = section.getBoundingClientRect().top + window.scrollY - 90;
        if (window.scrollY > top + 100 || window.scrollY < top - 200) {
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    }

    /* ── Перезапускаємо fade-up анімації (якщо main.js IntersectionObserver) ── */
    root.querySelectorAll('.fade-up').forEach(function (el) {
      if (window.catalogObserver) window.catalogObserver.observe(el);
    });
  }


  /* ════════════════════════════════════════════
     ІНІЦІАЛІЗАЦІЯ
     ════════════════════════════════════════════ */
  window.addEventListener('hashchange', render);
  render();

})();
