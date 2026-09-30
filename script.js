const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");

menuButton.addEventListener("click", () => {
  const opened = mainNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", opened);
  document.body.classList.toggle("menu-open", opened);
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const filters = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".product-card");

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));
    filter.classList.add("active");

    const category = filter.dataset.filter;

    products.forEach(product => {
      const show = category === "all" || product.dataset.category === category;
      product.classList.toggle("hidden", !show);
    });
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
