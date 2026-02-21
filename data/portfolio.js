/* ============================================================
   ВікнаДім — дані портфоліо
   Файл: data/portfolio.js

   ЯК ДОДАТИ НОВУ РОБОТУ:
   1. Покладіть фото в папку images/works/
   2. Скопіюйте останній блок { ... } нижче
   3. Змініть дані на свої
   4. Збережіть файл — нова робота з'явиться на сайті

   Поля:
   - id       → унікальний номер (наступний після останнього)
   - title    → назва проєкту
   - category → категорія: "metaplastic", "aluminium", "glass", "sunprotect"
   - tags     → короткий опис через · (відображається на картці)
   - image    → шлях до фото (наприклад "images/works/photo.jpg")
   - city     → місто
   - year     → рік виконання
   ============================================================ */

const PORTFOLIO = [
  {
    id: 1,
    title: "Скляний фасад ТЦ",
    category: "aluminium",
    tags: "Алюміній · Структурне скління",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80",
    city: "Дніпро",
    year: "2024"
  },
  {
    id: 2,
    title: "Панорамні вікна",
    category: "metaplastic",
    tags: "Металопластик · REHAU",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=80",
    city: "Київ",
    year: "2024"
  },
  {
    id: 3,
    title: "Скляні перегородки",
    category: "glass",
    tags: "Цільноскляні · Без рам",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80",
    city: "Дніпро",
    year: "2023"
  },
  {
    id: 4,
    title: "Розсувна тераса",
    category: "aluminium",
    tags: "Алюміній · HST",
    image: "https://images.unsplash.com/photo-1609766856987-8ea9cec30bf4?w=700&q=80",
    city: "Запоріжжя",
    year: "2024"
  },
  {
    id: 5,
    title: "Рулонні штори",
    category: "sunprotect",
    tags: "Сонцезахист · Авто",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80",
    city: "Харків",
    year: "2023"
  }
];
