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
    title: "Скляний фасад заміського будинку",
    category: "metaplastic",
    tags: "Металопластик WDS",
    image: "../images/index_page/portfolio/vertical.jpg",
    city: "Губініха, Дніпропетровська обл.",
    year: "2022"
  },
  {
    id: 2,
    title: "Безрамне скління",
    category: "glass",
    tags: "Цільноскляна конструкція",
    image: "../images/index_page/portfolio/gorizont_1.jpg",
    city: "Дніпро",
    year: "2024"
  },
  {
    id: 3,
    title: "Алюмінієві перегородки",
    category: "aluminium",
    tags: "Алюміній · Структурне скління",
    image: "../images/index_page/portfolio/gorizont_2.jpg",
    city: "Дніпро",
    year: "2024"
  },
  {
    id: 4,
    title: "Терасса",
    category: "metaplastic",
    tags: "Металопластик WDS",
    image: "../images/index_page/portfolio/gorizont_3.jpg",
    city: "Новоселівка, Дніпропетровська обл.",
    year: "2024"
  },
  {
    id: 5,
    title: "Ресторан в заміському комплексі",
    category: "metaplastic",
    tags: "Металопластик WDS",
    image: "../images/index_page/portfolio/gorizont_4.jpg",
    city: "Обухівка, Дніпропетровська обл.",
    year: "2023"
  }
];
