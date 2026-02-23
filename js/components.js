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
   HEADER + МОБІЛЬНЕ МЕНЮ
   Вставляється у <div id="site-header"></div>
   ───────────────────────────────────────────── */
function renderHeader() {
  const el = document.getElementById('site-header');
  if (!el) return;

  el.innerHTML = `
<header id="header">
  <div class="container">
    <nav class="nav-inner">

      <a href="index.html" class="nav-logo">
        <img src="images/logo.jpg" alt="ВікнаДім — логотип">
      </a>

      <ul class="nav-links">
        <li><a href="index.html">Головна</a></li>
        <li><a href="services.html">Послуги</a></li>
        <li><a href="portfolio.html">Наші роботи</a></li>
        <li><a href="about.html">Про нас</a></li>
        <li><a href="blog.html">Блог</a></li>
        <li><a href="contacts.html">Контакти</a></li>
      </ul>

      <div class="nav-right">
        <a class="nav-phone" href="tel:+380963046234">+38 (096) 304-62-34</a>
        <a href="contacts.html" class="btn btn-primary nav-cta">Замовити</a>
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
    <li><a href="index.html">Головна</a></li>
    <li><a href="services.html">Послуги</a></li>
    <li><a href="portfolio.html">Наші роботи</a></li>
    <li><a href="about.html">Про нас</a></li>
    <li><a href="blog.html">Блог</a></li>
    <li><a href="contacts.html">Контакти</a></li>
  </ul>
  <div class="mobile-menu-bottom">
    <a class="nav-phone" href="tel:+380963046234">+38 (096) 304-62-34</a>
    <a href="contacts.html" class="btn btn-primary">Замовити</a>
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

  el.innerHTML = `
<footer>
  <div class="container">
    <div class="footer-inner">
      <div class="footer-brand">
        <img src="images/logo.jpg" alt="ВікнаДім">
        <p>Виробник, монтажник металопластикових та алюмінієвих конструкцій, цільноскляних систем, сонцезахисту.</p>
      </div>
      <div class="footer-col">
        <h4>Послуги</h4>
        <ul>
          <li><a href="services.html">Металопластикові конструкції</a></li>
          <li><a href="services.html">Алюмінієві системи</a></li>
          <li><a href="services.html">ЦільноСкляні конструкції</a></li>
          <li><a href="services.html">Сонцезахист</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Компанія</h4>
        <ul>
          <li><a href="about.html">Про нас</a></li>
          <li><a href="portfolio.html">Наші роботи</a></li>
          <li><a href="blog.html">Блог</a></li>
          <li><a href="contacts.html">Контакти</a></li>
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
      <span>&copy; ${year} ВікнаДім. Усі права захищені.</span>
      <div class="footer-social">
        <a href="#" aria-label="Facebook">fb</a>
        <a href="#" aria-label="Instagram">ig</a>
        <a href="#" aria-label="Telegram">tg</a>
      </div>
    </div>
  </div>
</footer>`;
}


/* ─────────────────────────────────────────────
   АВТОЗАПУСК
   Як тільки браузер завантажує цей файл —
   header і footer вставляються в DOM.
   ───────────────────────────────────────────── */
renderHeader();
renderFooter();
