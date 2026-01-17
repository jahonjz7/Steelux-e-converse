const productsContainer = document.getElementById("products");
const catButtons = document.querySelectorAll(".cat-btn");

let products = JSON.parse(localStorage.getItem("products")) || [];
let currentCategory = "all";

// --- СИСТЕМА ПЕРЕВОДА ---
const translations = {
  ru: {
    "nav-home": "Домой",
    "nav-catalog": "Каталог",
    "nav-about": "О нас",
    "cat-all": "Все",
    "cat-moiki": "Мойки",
    "cat-smes": "Смесители",
    "cat-vityaj": "Вытяжки",
    "cat-plity": "Газ плиты",
    "cat-duhov": "Духовки",
    "cat-micro": "Микроволновки",
    "cat-filtr": "Фильтры",
    "cat-acc": "Аксессуары",
    "no-products": "Товаров нет",
    "out-of-stock": "Нет в наличии",
    "currency": "сум"
  },
  uz: {
    "nav-home": "Asosiy",
    "nav-catalog": "Katalog",
    "nav-about": "Biz haqimizda",
    "cat-all": "Barchasi",
    "cat-moiki": "Moykalar",
    "cat-smes": "Smesitellar",
    "cat-vityaj": "Vityajkalar",
    "cat-plity": "Gaz plitalari",
    "cat-duhov": "Duxovkalar",
    "cat-micro": "Mikroto'lqinli pech",
    "cat-filtr": "Filtrlar",
    "cat-acc": "Aksessuarlar",
    "no-products": "Mahsulotlar mavjud emas",
    "out-of-stock": "Mavjud emas",
    "currency": "so'm"
  },
  en: {
    "nav-home": "Home",
    "nav-catalog": "Catalog",
    "nav-about": "About Us",
    "cat-all": "All",
    "cat-moiki": "Sinks",
    "cat-smes": "Faucets",
    "cat-vityaj": "Hoods",
    "cat-plity": "Gas Stoves",
    "cat-duhov": "Ovens",
    "cat-micro": "Microwaves",
    "cat-filtr": "Water Filters",
    "cat-acc": "Accessories",
    "no-products": "No products found",
    "out-of-stock": "Out of stock",
    "currency": "uzs"
  }
};

function changeLanguage(lang) {
  localStorage.setItem('selected_lang', lang);
  
  // Кнопки языков
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.toLowerCase() === lang);
  });

  // Статичные тексты
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) el.textContent = translations[lang][key];
  });

  renderCatalog(); // Перерисовываем карточки (для цен и статусов)
}

function formatPrice(price) {
  const lang = localStorage.getItem('selected_lang') || 'ru';
  const currency = translations[lang]["currency"];
  return price.toLocaleString("ru-RU") + " " + currency;
}

function renderCatalog() {
  const lang = localStorage.getItem('selected_lang') || 'ru';
  productsContainer.innerHTML = "";

  const filtered = currentCategory === "all"
    ? products
    : products.filter(p => p.category === currentCategory);

  if (filtered.length === 0) {
    productsContainer.innerHTML = `<p>${translations[lang]["no-products"]}</p>`;
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      ${!p.available ? `<div class="out-badge">${translations[lang]["out-of-stock"]}</div>` : ""}
      <img src="${p.img}" alt="${p.name}">
      <div class="product-body">
        <h4>${p.name}</h4>
        <p>${p.category}</p>
        <div class="price-box">
          ${p.oldPrice ? `<s class="old-price">${formatPrice(p.oldPrice)}</s>` : ""}
          <span class="price">${formatPrice(p.price)}</span>
        </div>
      </div>
    `;
    productsContainer.appendChild(card);
  });
}

// Фильтр по категориям
catButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    catButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    renderCatalog();
  });
});

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('selected_lang') || 'ru';
  changeLanguage(savedLang);
});