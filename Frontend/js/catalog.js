// ===== ЭЛЕМЕНТЫ =====
const productsContainer = document.getElementById("products");
const catButtons = document.querySelectorAll(".cat-btn");

// ===== ПЕРЕМЕННЫЕ =====
let products = [];
let currentCategory = "all";

// ===== API PATHS (ВАЖНО: БЕЗ localhost) =====
const API_PRODUCTS = "/api/products";
const UPLOADS_PATH = "/uploads/";

// ===== ПЕРЕВОДЫ =====
const translations = {
  ru: {
    "cat-all": "Все",
    "no-products": "Товаров нет",
    "out-of-stock": "Нет в наличии",
    "currency": "сум"
  },
  uz: {
    "cat-all": "Barchasi",
    "no-products": "Mahsulotlar mavjud emas",
    "out-of-stock": "Mavjud emas",
    "currency": "so'm"
  },
  en: {
    "cat-all": "All",
    "no-products": "No products found",
    "out-of-stock": "Out of stock",
    "currency": "UZS"
  }
};

// ===== ЗАГРУЗКА ТОВАРОВ =====
async function fetchProducts() {
  try {
    const res = await fetch(API_PRODUCTS);
    products = await res.json();
    renderCatalog();
  } catch (err) {
    console.error("Ошибка загрузки:", err);
    productsContainer.innerHTML = "<p>Ошибка загрузки товаров</p>";
  }
}

// ===== ФОРМАТ ЦЕНЫ =====
function formatPrice(price) {
  const lang = localStorage.getItem("selected_lang") || "ru";
  return price.toLocaleString("ru-RU") + " " + translations[lang].currency;
}

// ===== РЕНДЕР =====
function renderCatalog() {
  const lang = localStorage.getItem("selected_lang") || "ru";
  productsContainer.innerHTML = "";

  const filtered =
    currentCategory === "all"
      ? products
      : products.filter(p => p.category === currentCategory);

  if (filtered.length === 0) {
    productsContainer.innerHTML = `
      <p class="no-products">
        ${translations[lang]["no-products"]}
      </p>`;
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      ${!p.available ? `<div class="out-badge">${translations[lang]["out-of-stock"]}</div>` : ""}
      <img src="${UPLOADS_PATH}${p.img}" alt="${p.name}">
      <div class="product-body">
        <h4>${p.name}</h4>
        <p class="category">${p.category}</p>
        <div class="price-box">
          ${p.oldPrice ? `<s class="old-price">${formatPrice(p.oldPrice)}</s>` : ""}
          <span class="price">${formatPrice(p.price)}</span>
        </div>
      </div>
    `;

    productsContainer.appendChild(card);
  });
}

// ===== КАТЕГОРИИ =====
catButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    catButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    renderCatalog();
  });
});

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});
