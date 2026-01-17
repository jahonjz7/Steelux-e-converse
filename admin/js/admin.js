// Элементы
const form = document.getElementById("product-form");
const productsList = document.getElementById("products-list");
const imgInput = document.getElementById("img");
const preview = document.getElementById("preview");

const nameInput = document.getElementById("name");
const categoryInput = document.getElementById("category");
const priceInput = document.getElementById("price");
const oldPriceInput = document.getElementById("oldPrice");
const descInput = document.getElementById("description");

// Вкладки
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// Выход
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("isAdmin");
  window.location.href = "admin-login.html";
});

// Превью
imgInput.addEventListener("change", () => {
  const file = imgInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    preview.src = e.target.result;
    preview.style.display = "block";
  };
  reader.readAsDataURL(file);
});

// Сжатие изображения
function compressImage(file, callback) {
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const max = 800;
      let w = img.width;
      let h = img.height;

      if (w > h && w > max) {
        h *= max / w;
        w = max;
      } else if (h > max) {
        w *= max / h;
        h = max;
      }

      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);

      callback(canvas.toDataURL("image/jpeg", 0.7));
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Добавление товара
form.addEventListener("submit", e => {
  e.preventDefault();
  const file = imgInput.files[0];
  if (!file) return alert("Загрузите фото");

  compressImage(file, imgData => {
    const products = JSON.parse(localStorage.getItem("products")) || [];

    products.push({
      id: Date.now(),
      name: nameInput.value,
      category: categoryInput.value,
      img: imgData,
      price: Number(priceInput.value),
      oldPrice: oldPriceInput.value ? Number(oldPriceInput.value) : null,
      description: descInput.value,
      available: true
    });

    localStorage.setItem("products", JSON.stringify(products));
    form.reset();
    preview.style.display = "none";

    renderProducts();
    alert("Товар добавлен ✅");
  });
});

// Формат цены
function formatUZS(price) {
  return price.toLocaleString("ru-RU") + " сум";
}

// Рендер списка
function renderProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  productsList.innerHTML = "";

  products.forEach((p, index) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${p.img}">
      <h4>${p.name}</h4>
      <p>${p.category}</p>

      <div class="price">
        ${p.oldPrice ? `<s>${formatUZS(p.oldPrice)}</s>` : ""} <strong>${formatUZS(p.price)}</strong>
      </div>

      <button onclick="toggleStock(${index})">
        ${p.available ? "Нет в наличии" : "В наличии"}
      </button>

      <button onclick="deleteProduct(${index})">Удалить</button>
    `;

    productsList.appendChild(card);
  });
}

// Удаление
function deleteProduct(index) {
  const products = JSON.parse(localStorage.getItem("products"));
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

// Нет в наличии
function toggleStock(index) {
  const products = JSON.parse(localStorage.getItem("products"));
  products[index].available = !products[index].available;
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

// Переход на главную
document.getElementById("to-main").addEventListener("click", () => {
  window.location.href = "index.html";
});

// Старт
renderProducts();
