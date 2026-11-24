// 1. Menú responsive en móvil
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// 2. Filtro de sabores en carta.html
const filterButtons = document.querySelectorAll(".filter-btn");
const flavorItems = document.querySelectorAll(".flavor-item");

if (filterButtons.length > 0 && flavorItems.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const selected = button.getAttribute("data-filter");

      flavorItems.forEach((item) => {
        const category = item.getAttribute("data-category");
        if (selected === "todos" || selected === category) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

// 3. Validación y envío simulado del formulario en contacto.html
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !email || !mensaje) {
      formStatus.style.color = "#c85a32";
      formStatus.textContent = "Por favor, completa todos los campos obligatorios.";
      return;
    }

    formStatus.style.color = "#4f7758";
    formStatus.textContent = `¡Gracias, ${nombre}! Hemos recibido tu consulta y te responderemos muy pronto.`;
    contactForm.reset();
  });
}