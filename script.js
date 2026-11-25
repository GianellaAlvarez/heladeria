document.addEventListener("DOMContentLoaded", () => {
  // 1. Menú móvil
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 2. Barra de progreso superior y sombra en cabecera
  const progressBar = document.getElementById("scroll-progress");
  const header = document.getElementById("site-header");

  window.addEventListener(
    "scroll",
    () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (progressBar && docHeight > 0) {
        progressBar.style.width = `${(scrollTop / docHeight) * 100}%`;
      }
      if (header) {
        header.classList.toggle("scrolled", scrollTop > 16);
      }
    },
    { passive: true }
  );

  // 3. Burbujas suaves del Hero que siguen un poco al ratón
  const blobPink = document.getElementById("blob-pink");
  const blobMint = document.getElementById("blob-mint");

  if (blobPink || blobMint) {
    window.addEventListener("mousemove", (e) => {
      const moveX = (e.clientX / window.innerWidth - 0.5) * 28;
      const moveY = (e.clientY / window.innerHeight - 0.5) * 28;
      if (blobPink) blobPink.style.transform = `translate(${moveX}px, ${moveY}px)`;
      if (blobMint) blobMint.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
    });
  }

  // 4. Tarjeta destacada con inclinación suave
  const tiltCard = document.querySelector(".tilt-card");
  if (tiltCard) {
    tiltCard.addEventListener("mousemove", (e) => {
      const rect = tiltCard.getBoundingClientRect();
      const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
      const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      tiltCard.style.transform = `perspective(750px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });

    tiltCard.addEventListener("mouseleave", () => {
      tiltCard.style.transform = "perspective(750px) rotateX(0deg) rotateY(0deg)";
    });
  }

  // 5. Efecto de color del sabor al pasar el cursor
  const flavorCards = document.querySelectorAll(".flavor-card");
  flavorCards.forEach((card) => {
    const color = card.getAttribute("data-color");
    const border = card.getAttribute("data-border");
    const wave = card.querySelector(".flavor-wave");

    if (color) card.style.setProperty("--flavor-color", color);
    if (border) card.style.setProperty("--flavor-border", border);

    if (wave) {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        wave.style.clipPath = `circle(155% at ${x}% ${y}%)`;
      });

      card.addEventListener("mouseleave", (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        wave.style.clipPath = `circle(0% at ${x}% ${y}%)`;
      });
    }
  });

  // 6. Aparición al hacer scroll
  const reveals = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("is-visible");
          }, idx * 70);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  reveals.forEach((el) => revealObserver.observe(el));

  // 7. Contadores animados en El Obrador
  const counters = document.querySelectorAll(".counter");
  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.getAttribute("data-target"));
        const suffix = el.getAttribute("data-suffix") || "";
        const duration = 1000;
        const start = performance.now();

        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = `${Math.round(eased * target)}${suffix}`;
          if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
        obs.unobserve(el);
      });
    },
    { threshold: 0.35 }
  );
  counters.forEach((c) => counterObserver.observe(c));

  // 8. Filtro de sabores en carta.html
  const filterChips = document.querySelectorAll(".filter-chip");
  const filterItems = document.querySelectorAll(".flavor-filter-item");

  if (filterChips.length && filterItems.length) {
    filterChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        filterChips.forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");

        const selected = chip.getAttribute("data-filter");
        filterItems.forEach((item) => {
          const cat = item.getAttribute("data-category");
          item.style.display = selected === "todos" || selected === cat ? "block" : "none";
        });
      });
    });
  }

  // 9. Validación del formulario en contacto.html
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form && status) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = document.getElementById("nombre").value.trim();
      const email = document.getElementById("email").value.trim();
      const mensaje = document.getElementById("mensaje").value.trim();

      if (!nombre || !email || !mensaje) {
        status.style.color = "#e64862";
        status.textContent = "Completa los campos obligatorios antes de enviar.";
        return;
      }

      status.style.color = "#389858";
      status.textContent = `¡Listo, ${nombre}! Mensaje enviado. Te responderemos enseguida.`;
      form.reset();
    });
  }
});