"use strict";

// =========================================================
// Parée — основной JavaScript
// Навигация, меню, фильтры, карточки товаров и модальное окно
// =========================================================

const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");
const modal = document.getElementById("productModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const modalFacts = document.getElementById("modalFacts");
const year = document.getElementById("year");

const allProducts = document.querySelectorAll("[data-product]");
const catalogProducts = document.querySelectorAll(".product-card");
const filters = document.querySelectorAll(".filter");

// =========================================================
// НАВИГАЦИЯ
// Используем нативные якоря браузера + CSS scroll-behavior.
// Не перехватываем touch/scroll события — мобильная прокрутка остаётся нативной.
// =========================================================
function closeMenu() {
  if (!mainNav || !menuButton) return;
  mainNav.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Открыть меню");
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", () => {
    // Не отменяем переход по якорю: браузер сам корректно прокручивает
    // страницу, в том числе на мобильных устройствах.
    closeMenu();
  });
});

// =========================================================
// МОБИЛЬНОЕ МЕНЮ
// =========================================================
if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const opened = mainNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(opened));
    menuButton.setAttribute("aria-label", opened ? "Закрыть меню" : "Открыть меню");
    document.body.classList.toggle("menu-open", opened);
  });
}

// =========================================================
// ФИЛЬТРЫ ОСНОВНОЙ КОЛЛЕКЦИИ
// =========================================================
filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(item => {
      const active = item === filter;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    const category = filter.dataset.filter;

    catalogProducts.forEach(product => {
      const show = category === "all" || product.dataset.category === category;
      product.classList.toggle("hidden", !show);
    });
  });
});

// =========================================================
// ДАННЫЕ ТОВАРОВ
// =========================================================
const productData = {
  1: {
    title: "Платье миди",
    category: "Платья",
    description: "Лаконичный вариант для тех случаев, когда хочется собрать образ одной вещью.",
    image: "https://images.unsplash.com/photo-1667218578593-1d8d433e4b33?auto=format&fit=crop&w=1200&q=78",
    alt: "Платье миди",
    facts: [["Категория", "Платья"], ["Стиль", "Повседневный / нарядный"], ["Наличие", "Уточнить в магазине"]]
  },
  2: {
    title: "Рубашка",
    category: "Верх",
    description: "Базовая вещь, которую удобно использовать как основу спокойного повседневного образа.",
    image: "https://images.unsplash.com/photo-1573651235591-221193be5229?auto=format&fit=crop&w=1200&q=78",
    alt: "Белая рубашка",
    facts: [["Категория", "Верх"], ["Стиль", "База / everyday"], ["Наличие", "Уточнить в магазине"]]
  },
  3: {
    title: "Брюки",
    category: "Низ",
    description: "Универсальная часть гардероба, которую легко сочетать с рубашкой, жакетом или трикотажем.",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=78",
    alt: "Женские брюки",
    facts: [["Категория", "Низ"], ["Стиль", "Повседневный"], ["Наличие", "Уточнить в магазине"]]
  },
  4: {
    title: "Жакет",
    category: "Верх",
    description: "Акцентная верхняя вещь для более собранного образа.",
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=1200&q=78",
    alt: "Жакет и женский образ",
    facts: [["Категория", "Верх"], ["Стиль", "Собранный / editorial"], ["Наличие", "Уточнить в магазине"]]
  },
  5: {
    title: "Вечернее платье",
    category: "Платья",
    description: "Более выразительный вариант для события или вечера.",
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1200&q=78",
    alt: "Платье для особого случая",
    facts: [["Категория", "Платья"], ["Стиль", "Вечерний"], ["Наличие", "Уточнить в магазине"]]
  },
  6: {
    title: "Сумка",
    category: "Аксессуары",
    description: "Аксессуар, который помогает завершить образ и собрать комплект.",
    image: "https://images.unsplash.com/photo-1560891958-68bb1fe7fb78?auto=format&fit=crop&w=1200&q=78",
    alt: "Женская сумка",
    facts: [["Категория", "Аксессуары"], ["Назначение", "Завершение образа"], ["Наличие", "Уточнить в магазине"]]
  },
  7: {
    title: "Пальто",
    category: "Новая коллекция · Верх",
    description: "Лаконичное пальто для прохладного сезона. Спокойный силуэт легко вписывается в повседневный гардероб.",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=78",
    alt: "Пальто из новой коллекции",
    facts: [["Коллекция", "New / 2026"], ["Категория", "Верх"], ["Наличие", "Уточнить в магазине"]]
  },
  8: {
    title: "Мягкий трикотаж",
    category: "Новая коллекция · Верх",
    description: "Тёплая фактура и спокойная посадка — универсальная вещь для многослойных образов.",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=78",
    alt: "Трикотаж из новой коллекции",
    facts: [["Коллекция", "New / 2026"], ["Категория", "Верх"], ["Наличие", "Уточнить в магазине"]]
  },
  9: {
    title: "Юбка миди",
    category: "Новая коллекция · Низ",
    description: "Универсальная длина для разных сочетаний — от повседневных до более собранных.",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=1200&q=78",
    alt: "Юбка миди из новой коллекции",
    facts: [["Коллекция", "New / 2026"], ["Категория", "Низ"], ["Наличие", "Уточнить в магазине"]]
  },
  10: {
    title: "Новый силуэт",
    category: "Новая коллекция · Образ",
    description: "Сочетание базовых вещей с выразительными деталями — один из образов новой коллекции.",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=78",
    alt: "Образ из новой коллекции",
    facts: [["Коллекция", "New / 2026"], ["Категория", "Образ"], ["Наличие", "Уточнить в магазине"]]
  }
};

// =========================================================
// МОДАЛЬНОЕ ОКНО ТОВАРА
// =========================================================
function openProduct(productId) {
  const product = productData[productId];
  if (!product || !modal) return;

  modalImage.src = product.image;
  modalImage.alt = product.alt;
  modalTitle.textContent = product.title;
  modalCategory.textContent = product.category;
  modalDescription.textContent = product.description;
  modalFacts.innerHTML = product.facts.map(([label, value]) => `
    <div class="modal-fact">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `).join("");

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  const closeButton = modal.querySelector(".modal-close");
  if (closeButton) closeButton.focus();
}

function closeProduct() {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

// Открытие основной и новой коллекции одинаково.
allProducts.forEach(card => {
  card.addEventListener("click", event => {
    if (event.target.closest("a")) return;
    openProduct(card.dataset.product);
  });

  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProduct(card.dataset.product);
    }
  });
});

// Закрытие модального окна.
if (modal) {
  modal.querySelectorAll("[data-close-modal]").forEach(element => {
    element.addEventListener("click", event => {
      if (element.tagName === "A") {
        closeProduct();
      } else if (event.target === element || element.classList.contains("modal-close")) {
        closeProduct();
      }
    });
  });

  const backdrop = modal.querySelector(".product-modal-backdrop");
  if (backdrop) backdrop.addEventListener("click", closeProduct);
}

// =========================================================
// ESCAPE
// =========================================================
document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;

  if (modal && modal.classList.contains("open")) closeProduct();
  if (mainNav && mainNav.classList.contains("open")) closeMenu();
});

// =========================================================
// ГОД
// =========================================================
if (year) year.textContent = new Date().getFullYear();
