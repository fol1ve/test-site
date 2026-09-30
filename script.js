```javascript
const productData = {
  1: {
    title: "Платье миди",
    category: "Платья",
    description:
      "Лаконичное платье миди для повседневного образа и более собранных сочетаний.",
    image:
      "https://images.unsplash.com/photo-1667218578593-1d8d433e4b33?auto=format&fit=crop&w=1000&q=80",
    alt: "Платье миди",
    facts: [
      ["Категория", "Платья"],
      ["Стиль", "Повседневный / нарядный"],
      ["Наличие", "Уточнить в магазине"]
    ]
  },

  2: {
    title: "Рубашка",
    category: "Верх",
    description:
      "Универсальная рубашка, которую можно носить самостоятельно или собирать с ней многослойные образы.",
    image:
      "https://images.unsplash.com/photo-1573651235591-221193be5229?auto=format&fit=crop&w=1000&q=80",
    alt: "Белая рубашка",
    facts: [
      ["Категория", "Верх"],
      ["Стиль", "База / everyday"],
      ["Наличие", "Уточнить в магазине"]
    ]
  },

  3: {
    title: "Брюки",
    category: "Низ",
    description:
      "Спокойный силуэт и чистая линия — база для образов на каждый день.",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80",
    alt: "Женские брюки",
    facts: [
      ["Категория", "Низ"],
      ["Стиль", "Повседневный"],
      ["Наличие", "Уточнить в магазине"]
    ]
  },

  4: {
    title: "Жакет",
    category: "Верх",
    description:
      "Структурированный жакет, который добавляет образу форму и выразительность.",
    image:
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=1000&q=80",
    alt: "Жакет",
    facts: [
      ["Категория", "Верх"],
      ["Стиль", "Собранный / editorial"],
      ["Наличие", "Уточнить в магазине"]
    ]
  },

  5: {
    title: "Вечернее платье",
    category: "Платья",
    description:
      "Сдержанный вечерний силуэт для случаев, когда образу нужна особенная выразительность.",
    image:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1000&q=80",
    alt: "Вечернее платье",
    facts: [
      ["Категория", "Платья"],
      ["Стиль", "Вечерний"],
      ["Наличие", "Уточнить в магазине"]
    ]
  },

  6: {
    title: "Сумка",
    category: "Аксессуары",
    description:
      "Минималистичный аксессуар, который завершает образ и не перетягивает внимание.",
    image:
      "https://images.unsplash.com/photo-1560891958-68bb1fe7fb78?auto=format&fit=crop&w=1000&q=80",
    alt: "Женская сумка",
    facts: [
      ["Категория", "Аксессуары"],
      ["Назначение", "Завершение образа"],
      ["Наличие", "Уточнить в магазине"]
    ]
  },

  7: {
    title: "Пальто",
    category: "Новая коллекция",
    description:
      "Выразительное пальто с чистым силуэтом — главный акцент нового сезона.",
    image:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e2?auto=format&fit=crop&w=1000&q=80",
    alt: "Пальто",
    facts: [
      ["Коллекция", "New Season"],
      ["Категория", "Верхняя одежда"],
      ["Сезон", "2026"]
    ]
  },

  8: {
    title: "Трикотажный свитер",
    category: "Новая коллекция",
    description:
      "Мягкий трикотажный слой для спокойных многослойных образов.",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80",
    alt: "Трикотажный свитер",
    facts: [
      ["Коллекция", "New Season"],
      ["Категория", "Трикотаж"],
      ["Сезон", "2026"]
    ]
  },

  9: {
    title: "Юбка миди",
    category: "Новая коллекция",
    description:
      "Юбка миди с универсальной длиной для лёгких повседневных и вечерних сочетаний.",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80",
    alt: "Юбка миди",
    facts: [
      ["Коллекция", "New Season"],
      ["Категория", "Низ"],
      ["Сезон", "2026"]
    ]
  },

  10: {
    title: "Новый образ",
    category: "Новая коллекция",
    description:
      "Готовый editorial-образ, показывающий настроение новой коллекции Parée.",
    image:
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=80",
    alt: "Новый образ",
    facts: [
      ["Коллекция", "New Season"],
      ["Формат", "Look / editorial"],
      ["Сезон", "2026"]
    ]
  }
};


/* =========================
   PRODUCT MODAL
========================= */

const modal = document.getElementById("productModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const modalFacts = document.getElementById("modalFacts");

let lastFocused = null;


function openProduct(id) {
  const product = productData[id];

  if (!product || !modal) {
    return;
  }

  lastFocused = document.activeElement;

  modalImage.src = product.image;
  modalImage.alt = product.alt;

  modalTitle.textContent = product.title;
  modalCategory.textContent = product.category;
  modalDescription.textContent = product.description;

  modalFacts.innerHTML = product.facts
    .map(([name, value]) => {
      return `
        <div class="modal-fact">
          <span>${name}</span>
          <span>${value}</span>
        </div>
      `;
    })
    .join("");

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");

  requestAnimationFrame(() => {
    modal.querySelector(".modal-close")?.focus();
  });
}


function closeProduct() {
  if (!modal) {
    return;
  }

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");

  modalImage.removeAttribute("src");

  if (lastFocused && typeof lastFocused.focus === "function") {
    lastFocused.focus();
  }
}


/* =========================
   PRODUCT CARDS
========================= */

document.querySelectorAll(".product-card").forEach((card) => {

  card.addEventListener("click", () => {
    openProduct(card.dataset.product);
  });


  card.addEventListener("keydown", (event) => {

    if (event.key === "Enter" || event.key === " ") {

      event.preventDefault();

      openProduct(card.dataset.product);
    }

  });

});


/* =========================
   CLOSE MODAL
========================= */

document.querySelectorAll("[data-close-modal]").forEach((element) => {

  element.addEventListener("click", closeProduct);

});


document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {

    if (modal?.classList.contains("is-open")) {
      closeProduct();
    }

    document
      .getElementById("mainNav")
      ?.classList.remove("open");

    document
      .querySelector(".menu-toggle")
      ?.setAttribute("aria-expanded", "false");
  }

});


/* =========================
   COLLECTION FILTERS
========================= */

document.querySelectorAll(".filter").forEach((button) => {

  button.addEventListener("click", () => {

    const filter = button.dataset.filter;

    document.querySelectorAll(".filter").forEach((item) => {
      item.classList.toggle("active", item === button);
    });


    let visibleProducts = 0;


    document
      .querySelectorAll("#catalogGrid .product-card")
      .forEach((card) => {

        const show =
          filter === "all" ||
          card.dataset.category === filter;

        card.classList.toggle("is-hidden", !show);

        if (show) {
          visibleProducts++;
        }

      });


    const emptyState = document.getElementById("emptyState");

    if (emptyState) {
      emptyState.hidden = visibleProducts !== 0;
    }

  });

});


/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.getElementById("mainNav");


if (menuToggle && nav) {

  menuToggle.addEventListener("click", () => {

    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

  });

}


document.querySelectorAll(".nav a").forEach((link) => {

  link.addEventListener("click", () => {

    nav?.classList.remove("open");

    menuToggle?.setAttribute(
      "aria-expanded",
      "false"
    );

  });

});


/* =========================
   GO TO EXACT TOP
========================= */

/*
  Здесь специально НЕ используется обычный переход
  по href="#top".

  Это нужно для того, чтобы sticky-header не создавал
  ощущение маленького скачка страницы.

  Parée всегда отправляет страницу именно в координату 0.
*/

document
  .querySelectorAll(
    '.logo[href="#top"], .footer-logo[href="#top"], .back-top[href="#top"]'
  )
  .forEach((link) => {

    link.addEventListener("click", (event) => {

      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      if (history.replaceState) {
        history.replaceState(
          null,
          "",
          window.location.pathname
        );
      }

    });

  });


/* =========================
   INTERNAL LINKS
========================= */

document
  .querySelectorAll('a[href^="#"]:not([href="#top"])')
  .forEach((link) => {

    link.addEventListener("click", (event) => {

      const selector = link.getAttribute("href");

      if (!selector || selector === "#") {
        return;
      }

      const target = document.querySelector(selector);

      if (!target) {
        return;
      }

      event.preventDefault();

      const headerHeight =
        document.querySelector(".header")?.offsetHeight || 0;

      const targetTop =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;


      window.scrollTo({
        top: targetTop,
        behavior: "smooth"
      });


      if (history.replaceState) {

        history.replaceState(
          null,
          "",
          selector
        );

      }

    });

  });


/* =========================
   CURRENT YEAR
========================= */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
```
