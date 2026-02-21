/* ============================================================
   ВікнаДім — головний JavaScript-файл
   Файл: js/main.js
   Підключається в кінці <body> кожної HTML-сторінки:
   <script src="js/main.js"></script>
   ============================================================ */


/* ─────────────────────────────────────────────
   1. ХЕДЕР — тінь при скролі
   ───────────────────────────────────────────── */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});


/* ─────────────────────────────────────────────
   2. БУРГЕР-МЕНЮ (мобільна навігація)

   В HTML потрібні два елементи:
   — кнопка: <button id="burger" class="burger">
   — меню:   <div id="mobileMenu" class="mobile-menu">

   Обидва вже є в index.html та services.html
   ───────────────────────────────────────────── */
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

if (burger && mobileMenu) {

  // Клік на бургер — відкрити/закрити меню
  burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    // Забороняємо скрол сторінки коли меню відкрите
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Клік на будь-яке посилання в меню — закрити
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Клік поза меню — закрити
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target) && !mobileMenu.contains(e.target)) {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}


/* ─────────────────────────────────────────────
   3. АКТИВНЕ ПОСИЛАННЯ В НАВІГАЦІЇ
   Підсвічує поточну сторінку в меню (десктоп + мобільне)
   ───────────────────────────────────────────── */
const currentPath = window.location.pathname;

document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
  const href = link.getAttribute('href');
  if (!href) return;

  if (href !== 'index.html' && currentPath.includes(href)) {
    link.classList.add('active');
  }
  if (href === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('index.html'))) {
    link.classList.add('active');
  }
});


/* ─────────────────────────────────────────────
   4. АНІМАЦІЯ ПОЯВИ ПРИ СКРОЛІ (Intersection Observer)
   ───────────────────────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Каскадна затримка для елементів в одному ряду (сітки)
      const parent = entry.target.parentElement;
      const siblings = [...parent.querySelectorAll('.fade-up')];
      const index = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = (index * 0.09) + 's';

      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // більше не стежимо після появи
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));


/* ─────────────────────────────────────────────
   5. ПЛАВНИЙ СКРОЛ ДО СЕКЦІЙ (якорі #)
   ───────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const headerHeight = 70;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
