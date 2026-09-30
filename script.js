const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");
const modal = document.getElementById("productModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const modalFacts = document.getElementById("modalFacts");
const products = document.querySelectorAll(".product-card");
const filters = document.querySelectorAll(".filter");

menuButton.addEventListener("click", () => {
  const opened = mainNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(opened));
  menuButton.setAttribute("aria-label", opened ? "Закрыть меню" : "Открыть меню");
  document.body.classList.toggle("menu-open", opened);
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Открыть меню");
  });
});

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(item => {
      const active = item === filter;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    const category = filter.dataset.filter;
    products.forEach(product => {
      const show = category === "all" || product.dataset.category === category;
      product.classList.toggle("hidden", !show);
    });
  });
});

const productData = {
  1: {
    title: "Платье миди",
    category: "Платья",
    description: "Лаконичный вариант для тех случаев, когда хочется собрать образ одной вещью. В карточке показано визуальное направление модели; актуальную модель и посадку можно посмотреть в магазине.",
    image: "https://images.unsplash.com/photo-1667218578593-1d8d433e4b33?auto=format&fit=crop&w=1400&q=85",
    alt: "Платье миди",
    facts: [["Категория", "Платья"], ["Стиль", "Повседневный / нарядный"], ["Наличие", "Уточнить в магазине"]]
  },
  2: {
    title: "Рубашка",
    category: "Верх",
    description: "Базовая вещь, которую удобно рассматривать как основу образа. На сайте — пример визуальной подачи, а не точная карточка складского остатка.",
    image: "https://images.unsplash.com/photo-1573651235591-221193be5229?auto=format&fit=crop&w=1400&q=85",
    alt: "Белая рубашка",
    facts: [["Категория", "Верх"], ["Стиль", "База / everyday"], ["Наличие", "Уточнить в магазине"]]
  },
  3: {
    title: "Брюки",
    category: "Низ",
    description: "Универсальная часть гардероба, которую можно сочетать с рубашкой, жакетом или более расслабленным верхом.",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1400&q=85",
    alt: "Женские брюки",
    facts: [["Категория", "Низ"], ["Стиль", "Повседневный"], ["Наличие", "Уточнить в магазине"]]
  },
  4: {
    title: "Жакет",
    category: "Верх",
    description: "Акцентная верхняя вещь для более собранного образа. Нажмите на карточку, чтобы посмотреть фотографию крупнее и перейти к контактам магазина.",
    image: "https://images.unsplash.com/photo-1771072426342-8fa359598a6e?auto=format&fit=crop&w=1400&q=85",
    alt: "Жакет и женский образ",
    facts: [["Категория", "Верх"], ["Стиль", "Собранный / editorial"], ["Наличие", "Уточнить в магазине"]]
  },
  5: {
    title: "Вечернее платье",
    category: "Платья",
    description: "Более выразительный вариант для события или вечера. Фотография помогает передать настроение, а точные модели и размеры лучше уточнять в магазине.",
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1400&q=85",
    alt: "Платье для особого случая",
    facts: [["Категория", "Платья"], ["Стиль", "Вечерний"], ["Наличие", "Уточнить в магазине"]]
  },
  6: {
    title: "Сумка",
    category: "Аксессуары",
    description: "Аксессуар, который помогает завершить образ. В карточке используется пример fashion-фотографии, а актуальный ассортимент можно узнать в магазине.",
    image: "https://images.unsplash.com/photo-1560891958-68bb1fe7fb78?auto=format&fit=crop&w=1400&q=85",
    alt: "Женская сумка",
    facts: [["Категория", "Аксессуары"], ["Назначение", "Завершение образа"], ["Наличие", "Уточнить в магазине"]]
  }
};

function openProduct(productId) {
  const product = productData[productId];
  if (!product) return;

  modalImage.src = product.image;
  modalImage.alt = product.alt;
  modalTitle.textContent = product.title;
  modalCategory.textContent = product.category;
  modalDescription.textContent = product.description;
  modalFacts.innerHTML = product.facts.map(([label, value]) => `<div class="modal-fact"><span>${label}</span><strong>${value}</strong></div>`).join("");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-close").focus();
}

function closeProduct() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

products.forEach(card => {
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

modal.querySelectorAll("[data-close-modal]").forEach(element => {
  element.addEventListener("click", event => {
    if (element.tagName === "A") closeProduct();
    else if (event.target === element || element.classList.contains("modal-close")) closeProduct();
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    if (modal.classList.contains("open")) closeProduct();
    if (mainNav.classList.contains("open")) {
      mainNav.classList.remove("open");
      document.body.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Открыть меню");
    }
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
