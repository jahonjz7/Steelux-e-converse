const form = document.getElementById("login-form");
const errorMsg = document.getElementById("error-msg");

const ADMIN_LOGIN = "admin";
const ADMIN_PASSWORD = "0500";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const login = document.getElementById("login").value.trim();
  const password = document.getElementById("password").value.trim();

  if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
    localStorage.setItem("isAdmin", "true");
    window.location.href = "admin.html";
  } else {
    errorMsg.textContent = "Неверный логин или пароль";
  }
});
