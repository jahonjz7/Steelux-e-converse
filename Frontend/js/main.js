const translations = {
  ru: {
    "nav-home": "Главная",
    "nav-catalog": "Каталог",
    "nav-about": "О нас",
    "hero-title": "Премиальные решения для кухни",
    "hero-p": "Кухонные мойки, смесители, техника и аксессуары с гарантией качества",
    "hero-btn": "Перейти в каталог",
    "cont-title-1": "Наш адрес",
    "cont-title-2": "Связаться с нами",
    "address": "г. Ташкент, Чиланзарский р-н, ТКАД (М39), рынок Бек Топи, 11 Магазин",
    "name-1": "Музаффар",
    "name-2": "Жамолиддин",
    "name-3": "Абдуллох",
    "name-4": "Абдулазиз",
    "footer-copy": "© 2026 Steelux Bektopi. Все права защищены."
  },
  uz: {
    "nav-home": "Asosiy",
    "nav-catalog": "Katalog",
    "nav-about": "Biz haqimizda",
    "hero-title": "Oshxona uchun premium yechimlar",
    "hero-p": "Sifat kafolati bilan oshxona yuvish vositalari va texnikasi",
    "hero-btn": "Katalogga o'tish",
    "cont-title-1": "Bizning manzil",
    "cont-title-2": "Biz bilan bog'lanish",
    "address": "Toshkent sh., Chilonzor t-ni, THAY (M39), Bek Topi bozori, 11-do'kon",
    "name-1": "Muzaffar",
    "name-2": "Jamoliddin",
    "name-3": "Abdulloh",
    "name-4": "Abdulaziz",
    "footer-copy": "© 2026 Steelux Bektopi. Barcha huquqlar himoyalangan."
  },
  en: {
    "nav-home": "Home",
    "nav-catalog": "Catalog",
    "nav-about": "About Us",
    "hero-title": "Premium Kitchen Solutions",
    "hero-p": "Kitchen sinks and appliances with quality guarantee",
    "hero-btn": "Go to Catalog",
    "cont-title-1": "Our Address",
    "cont-title-2": "Contact Us",
    "address": "Tashkent, Chilanzar dist., TKAD (M39), Bek Topi market, Shop 11",
    "name-1": "Muzaffar",
    "name-2": "Jamoliddin",
    "name-3": "Abdulloh",
    "name-4": "Abdulaziz",
    "footer-copy": "© 2026 Steelux Bektopi. All rights reserved."
  }
};

// Функция changeLanguage остается без изменений
function changeLanguage(lang) {
  console.log("Switching to:", lang);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent.toLowerCase() === lang) {
      btn.classList.add('active');
    }
  });

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  localStorage.setItem('selected_lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('selected_lang') || 'ru';
  changeLanguage(savedLang);
});