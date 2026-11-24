document.addEventListener("DOMContentLoaded", () => {
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

  // 2. Cabecera dinámica al hacer scroll
  const header = document.getElementById("site-header");
  if (header) {
    window.addEventListener(
      "scroll",
      () => {
        header.classList.toggle("scrolled", window.scrollY > 20);
      },
      { passive: true }
    );
  }

  // 3. Asignar el color de cada helado desde data-flavor-color y efecto de seguimiento del ratón
  const flavorCards = document.querySelectorAll(".flavor-card");
  flavorCards.forEach((card) => {
    const color = card.getAttribute("data-flavor-color");
    const splash = card.querySelector(".flavor-splash");

    if (color) {
      card.style.setProperty("--flavor-bg", color);
    }

    // La onda de color nace exactamente donde entra o se mueve el cursor
    if (splash) {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        splash.style.clipPath = `circle(150% at ${x}% ${y}%)`;
      });

      card.addEventListener("mouseleave", (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        splash.style.clipPath = `circle(0% at ${x}% ${y}%)`;
      });
    }
  });

  // 4. Efecto 3D sutil (Tilt) en la tarjeta destacada de portada
  const tiltCards = document.querySelectorAll(".tilt-card");
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -10;
      const rotateY = ((x / rect.width) - 0.5) * 10;
      card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg)";
    });
  });

  // 5. Aparición escalonada elegante al hacer scroll (IntersectionObserver)
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("is-visible");
          }, index * 75);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // 6. Contadores animados en El Obrador
  const counters = document.querySelectorAll(".counter");
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.getAttribute("data-target"));
        const suffix = el.getAttribute("data-suffix") || "";
        const duration = 1100;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.round(eased * target);
          el.textContent = `${currentVal}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          }
        };

        requestAnimationFrame(updateCounter);
        observer.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  // 7. Filtro animado de sabores en carta.html
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
          const matches = selected === "todos" || selected === category;

          if (matches) {
            item.style.display = "flex";
            requestAnimationFrame(() => {
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
            });
          } else {
            item.style.opacity = "0";
            item.style.transform = "translateY(12px)";
            setTimeout(() => {
              if (!button.classList.contains("active")) return;
              item.style.display = "none";
            }, 220);
          }
        });
      });
    });
  }

  // 8. Validación del formulario en contacto.html
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
});