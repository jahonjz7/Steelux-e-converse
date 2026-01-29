const API = "http://localhost:3000/api/products";

const form = document.getElementById("product-form");
const productsList = document.getElementById("products-list");

const nameInput = document.getElementById("name");
const categoryInput = document.getElementById("category");
const priceInput = document.getElementById("price");
const oldPriceInput = document.getElementById("oldPrice");
const descInput = document.getElementById("description");
const imgInput = document.getElementById("img");

// ===== ВКЛАДКИ =====
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  };
});

// ===== ВЫХОД =====
document.getElementById("logout").onclick = () => {
  localStorage.removeItem("isAdmin");
  location.href = "admin-login.html";
};

// ===== ДОБАВЛЕНИЕ ТОВАРА =====
form.onsubmit = async (e) => {
  e.preventDefault();

  const fd = new FormData();
  fd.append("name", nameInput.value);
  fd.append("category", categoryInput.value);
  fd.append("price", priceInput.value);
  fd.append("oldPrice", oldPriceInput.value);
  fd.append("description", descInput.value);
  fd.append("img", imgInput.files[0]);

  const res = await fetch(API, {
    method: "POST",
    body: fd
  });

  if (res.ok) {
    alert("Товар добавлен ✅");
    form.reset();
    loadProducts();
  } else {
    alert("Ошибка при добавлении ❌");
  }
};

// ===== ЗАГРУЗКА ТОВАРОВ =====
async function loadProducts() {
  const res = await fetch(API);
  const products = await res.json();

  productsList.innerHTML = "";

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product-card";

    div.innerHTML = `
      ${!p.available ? `<div class="out-badge">Нет в наличии</div>` : ""}
      <img src="http://localhost:3000/uploads/${p.img}">
      <h4>${p.name}</h4>
      <p>${p.category}</p>
      <strong>${p.price.toLocaleString()} сум</strong>

      <div class="buttons">
        <button onclick="toggleStock(${p.id})">
          ${p.available ? "Нет в наличии" : "В наличии"}
        </button>
        <button onclick="deleteProduct(${p.id})">Удалить</button>
      </div>
    `;

    productsList.appendChild(div);
  });
}

// ===== УДАЛЕНИЕ =====
async function deleteProduct(id) {
  if (!confirm("Удалить товар?")) return;

  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadProducts();
}

// ===== НЕТ В НАЛИЧИИ =====
async function toggleStock(id) {
  await fetch(`${API}/${id}/stock`, { method: "PUT" });
  loadProducts();
}

// ===== ПЕРЕХОД =====
document.getElementById("to-main").onclick = () => {
  location.href = "../index.html";
};

// ===== СТАРТ =====
loadProducts();
function renderAdminList() {
  const productsList = document.getElementById("products-list");
  productsList.innerHTML = "";

  const data = JSON.parse(localStorage.getItem("products")) || [];

  data.forEach(p => {
    const div = document.createElement("div");
    div.className = "product-item";
    div.innerHTML = `
      <img src="../backend/uploads/${p.img}" width="80">
      <strong>${p.name}</strong>
      <button class="delete-btn" data-id="${p.id}">Удалить</button>
    `;
    productsList.appendChild(div);
  });

  // Обработчик удаления
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      await fetch(`http://localhost:3000/api/products/${id}`, { method: "DELETE" });
      fetchProducts(); // обновляем список товаров
    };
  });
}
