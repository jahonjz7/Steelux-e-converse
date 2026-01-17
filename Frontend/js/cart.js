const translations = {
  ru: {
    "nav-home": "Домой",
    "nav-catalog": "Каталог",
    "nav-about": "О нас",
    "about-history": "Наша история",
    "about-title": "Steelux Bektopi",
    "about-p": "Премиальное качество кухонных решений в самом сердце рынка Бек Топи.",
    "stat-years": "Лет",
    "stat-clients": "Клиентов",
    "partners-title": "Наши официальные партнеры",
    "footer-copy": "© 2026 STEELUX BEKTOPI. ВСЕ ПРАВА ЗАЩИЩЕНЫ."
  },
  uz: {
    "nav-home": "Asosiy",
    "nav-catalog": "Katalog",
    "nav-about": "Biz haqimizda",
    "about-history": "Bizning tariximiz",
    "about-title": "Steelux Bektopi",
    "about-p": "Bek Topi bozorining markazidagi yuqori sifatli oshxona jihozlari.",
    "stat-years": "Yil",
    "stat-clients": "Mijozlar",
    "partners-title": "Bizning rasmiy hamkorlarimiz",
    "footer-copy": "© 2026 STEELUX BEKTOPI. BARCHA HUQUQLAR HIMOYALANGAN."
  },
  en: {
    "nav-home": "Home",
    "nav-catalog": "Catalog",
    "nav-about": "About Us",
    "about-history": "Our History",
    "about-title": "Steelux Bektopi",
    "about-p": "Premium quality kitchen solutions in the heart of Bek Topi market.",
    "stat-years": "Years",
    "stat-clients": "Clients",
    "partners-title": "Our Official Partners",
    "footer-copy": "© 2026 STEELUX BEKTOPI. ALL RIGHTS RESERVED."
  }
};

function changeLanguage(lang) {
  // Сохраняем выбор
  localStorage.setItem('selected_lang', lang);

  // Обновляем кнопки
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.toLowerCase() === lang);
  });

  // Переводим тексты
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('selected_lang') || 'ru';
  changeLanguage(savedLang);
});