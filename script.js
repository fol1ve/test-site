const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");

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

const filters = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".product-card");

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));
    filter.classList.add("active");
    filter.setAttribute("aria-pressed", "true");
    filters.forEach(item => {
      if (item !== filter) item.setAttribute("aria-pressed", "false");
    });

    const category = filter.dataset.filter;
    products.forEach(product => {
      const show = category === "all" || product.dataset.category === category;
      product.classList.toggle("hidden", !show);
    });
  });
});

const productData = {
  1: { title: "Платье миди", category: "Платья", description: "Лаконичная модель для спокойных повседневных образов и особых случаев.", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=85", alt: "Платье миди" },
  2: { title: "Рубашка", category: "Верх", description: "Мягкая рубашка, которую легко сочетать с брюками, джинсами и юбками.", image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=85", alt: "Рубашка" },
  3: { title: "Брюки", category: "Низ", description: "Универсальная модель на каждый день — для работы, прогулок и встреч.", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=85", alt: "Брюки" },
  4: { title: "Жакет", category: "Верх", description: "Аккуратный жакет, который собирает образ и подходит для разных сочетаний.", image: "https://images.unsplash.com/photo-1567973336934-8e337446fa9f?auto=format&fit=crop&fm=jpg&q=85&w=1200", alt: "Жакет" },
  5: { title: "Платье", category: "Платья", description: "Выразительная модель для особого дня и случаев, когда хочется нарядиться.", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1000&q=85", alt: "Платье с длинным рукавом" },
  6: { title: "Сумка", category: "Аксессуары", description: "Лаконичный аксессуар, который завершает образ и подходит на каждый день.", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85", alt: "Сумка" }
};

const modal = document.getElementById("productModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");

function openProduct(productId) {
  const product = productData[productId];
  if (!product) return;
  modalImage.src = product.image;
  modalImage.alt = product.alt;
  modalTitle.textContent = product.title;
  modalCategory.textContent = product.category;
  modalDescription.textContent = product.description;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
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
    if (element.tagName === "A") {
      closeProduct();
      return;
    }
    if (event.target === element || element.classList.contains("modal-close")) closeProduct();
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("open")) closeProduct();
});

document.getElementById("year").textContent = new Date().getFullYear();
