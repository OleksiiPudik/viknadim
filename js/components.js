/* ============================================================
   ВікнаДім — спільні компоненти (header, мобільне меню, footer)
   Файл: js/components.js

   Цей файл вставляє однаковий header та footer на КОЖНІЙ сторінці.
   Завдяки цьому зміни в навігації чи футері робляться ОДИН раз тут,
   а не в кожному HTML-файлі окремо.

   Підключається ПЕРЕД main.js:
   <script src="js/components.js"></script>
   <script src="js/main.js"></script>
   ============================================================ */


/* ─────────────────────────────────────────────
   ВИЗНАЧЕННЯ БАЗОВОГО ШЛЯХУ
   Якщо сторінка у підпапці (наприклад services/),
   шляхи до інших сторінок мають починатись з "../"
   ───────────────────────────────────────────── */
const basePath = (function() {
  const scriptSrc = document.querySelector('script[src*="components.js"]');
  if (scriptSrc) {
    const src = scriptSrc.getAttribute('src');
    return src.replace('js/components.js', '');
  }
  return '';
})();


/* ─────────────────────────────────────────────
   HEADER + МОБІЛЬНЕ МЕНЮ
   Вставляється у <div id="site-header"></div>
   ───────────────────────────────────────────── */
function renderHeader() {
  const el = document.getElementById('site-header');
  if (!el) return;

  const b = basePath;

  el.innerHTML = `
<header id="header">
  <div class="container">
    <nav class="nav-inner">

      <a href="${b}index.html" class="nav-logo">
        <img src="${b}images/logo.jpg" alt="ВікнаДім — логотип">
      </a>

      <ul class="nav-links">
        <li><a href="${b}index.html">Головна</a></li>
        <li><a href="${b}services.html">Товари та Послуги</a></li>
        <li><a href="${b}portfolio.html">Наші роботи</a></li>
        <li><a href="${b}about.html">Про нас</a></li>
        <li><a href="${b}blog.html">Блог</a></li>
        <li><a href="${b}contacts.html">Контакти</a></li>
      </ul>

      <div class="nav-right">
        <a class="nav-phone" href="tel:+380963046234">+38 (096) 304-62-34</a>
        <a href="${b}contacts.html" class="btn btn-primary nav-cta">Замовити</a>
        <button id="burger" class="burger" aria-label="Меню">
          <span class="burger-line"></span>
          <span class="burger-line"></span>
          <span class="burger-line"></span>
        </button>
      </div>

    </nav>
  </div>
</header>

<div id="mobileMenu" class="mobile-menu">
  <ul>
    <li><a href="${b}index.html">Головна</a></li>
    <li><a href="${b}services.html">Товари та Послуги</a></li>
    <li><a href="${b}portfolio.html">Наші роботи</a></li>
    <li><a href="${b}about.html">Про нас</a></li>
    <li><a href="${b}blog.html">Блог</a></li>
    <li><a href="${b}contacts.html">Контакти</a></li>
  </ul>
  <div class="mobile-menu-bottom">
    <a class="nav-phone" href="tel:+380963046234">+38 (096) 304-62-34</a>
    <a href="${b}contacts.html" class="btn btn-primary">Замовити</a>
  </div>
</div>`;
}


/* ─────────────────────────────────────────────
   FOOTER
   Вставляється у <div id="site-footer"></div>
   ───────────────────────────────────────────── */
function renderFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;

  const year = new Date().getFullYear();
  const b = basePath;

  el.innerHTML = `
<footer>
  <div class="container">
    <div class="footer-inner">
      <div class="footer-brand">
        <img src="${b}images/logo.jpg" alt="ВікнаДім">
        <p>Виробник, монтажник металопластикових та алюмінієвих конструкцій, цільноскляних систем, сонцезахисту.</p>
      </div>
      <div class="footer-col">
        <h4>Товари та Послуги</h4>
        <ul>
          <li><a href="${b}services.html">Металопластикові конструкції</a></li>
          <li><a href="${b}services.html">Алюмінієві системи</a></li>
          <li><a href="${b}services.html">ЦільноСкляні конструкції</a></li>
          <li><a href="${b}services.html">Сонцезахист</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Компанія</h4>
        <ul>
          <li><a href="${b}about.html">Про нас</a></li>
          <li><a href="${b}portfolio.html">Наші роботи</a></li>
          <li><a href="${b}blog.html">Блог</a></li>
          <li><a href="${b}contacts.html">Контакти</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Контакти</h4>
        <ul>
          <li><a href="tel:+380963046234">+38 (096) 304-62-34</a></li>
          <li><a href="tel:+380996036351">+38 (099) 603-63-51</a></li>
          <li><a href="mailto:oknadom.dp@gmail.com">oknadom.dp@gmail.com</a></li>
          <li>пр. Слобожанський 95, Дніпро</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; ${year} ВікнаДім. Усі права захищені. <a href="${b}privacy.html" class="footer-privacy">Політика конфіденційності</a></span>
      <div class="footer-social">
        <a href="https://www.facebook.com/profile.php?id=61586546707363" target="_blank" rel="noopener" aria-label="Facebook">fb</a>
        <a href="https://www.instagram.com/vikna_dim/" target="_blank" rel="noopener" aria-label="Instagram">ig</a>
        <a href="https://www.threads.com/@vikna_dim?hl=ru" target="_blank" rel="noopener" aria-label="Threads">th</a>
      </div>
    </div>
  </div>
</footer>`;
}


/* ─────────────────────────────────────────────
   SEO: CANONICAL TAG
   Додає <link rel="canonical"> автоматично
   на кожну сторінку на основі поточного URL.
   ───────────────────────────────────────────── */
function addCanonical() {
  const domain = 'https://viknadim.dp.ua';
  // Визначаємо шлях сторінки відносно кореня сайту
  let path = location.pathname;
  // Прибираємо index.html з кінця — канонічний URL головної = /
  if (path.endsWith('/index.html')) {
    path = path.substring(0, path.lastIndexOf('/') + 1);
  }
  const link = document.createElement('link');
  link.rel = 'canonical';
  link.href = domain + path;
  document.head.appendChild(link);
}


/* ─────────────────────────────────────────────
   SEO: STRUCTURED DATA (JSON-LD)
   — LocalBusiness schema на головній сторінці
   — BreadcrumbList на сторінках із хлібними крихтами
   ───────────────────────────────────────────── */
function addStructuredData() {
  const domain = 'https://viknadim.dp.ua';

  // LocalBusiness — тільки на головній
  const isHome = location.pathname === '/' ||
                 location.pathname.endsWith('/index.html') ||
                 location.pathname.endsWith('/');
  if (isHome) {
    const business = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "ВікнаДім",
      "description": "Виготовляємо та встановлюємо вікна, двері, алюмінієві фасади, цільноскляні конструкції та сонцезахист у Дніпрі. Гарантія 5 років.",
      "url": domain,
      "telephone": ["+380963046234", "+380996036351"],
      "email": "oknadom.dp@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "пр. Слобожанський 95",
        "addressLocality": "Дніпро",
        "addressCountry": "UA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 48.51417972617358,
        "longitude": 35.077707071846035
      },
      "sameAs": [
        "https://www.facebook.com/profile.php?id=61586546707363",
        "https://www.instagram.com/vikna_dim/",
        "https://www.threads.com/@vikna_dim"
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "09:00",
          "closes": "15:00"
        }
      ]
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(business);
    document.head.appendChild(script);
  }

  // BreadcrumbList — на сторінках з breadcrumbs
  const crumbs = document.querySelectorAll('.breadcrumbs a, .breadcrumbs > span:last-child');
  if (crumbs.length > 0) {
    const items = [];
    crumbs.forEach(function(el, i) {
      const item = {
        "@type": "ListItem",
        "position": i + 1
      };
      if (el.tagName === 'A') {
        // Перетворюємо відносний href в абсолютний
        item.name = el.textContent.trim();
        item.item = el.href; // браузер автоматично робить абсолютний URL
      } else {
        // Останній елемент — поточна сторінка (span)
        item.name = el.textContent.trim();
      }
      items.push(item);
    });

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script);
  }
}


/* ─────────────────────────────────────────────
   АВТОЗАПУСК
   Як тільки браузер завантажує цей файл —
   header, footer, canonical і structured data
   вставляються в DOM.
   ───────────────────────────────────────────── */
renderHeader();
renderFooter();
addCanonical();
addStructuredData();
