document.body.classList.add("loading");

const loader = document.getElementById("loader");
const petalsContainer = document.getElementById("petals");

// Начальная заставка
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hide");
    document.body.classList.remove("loading");

    document.querySelectorAll(".hero .reveal").forEach((element) => {
      element.classList.add("visible");
    });
  }, 2100);
});

// Запасной вариант, если загрузка страницы затянулась
setTimeout(() => {
  loader.classList.add("hide");
  document.body.classList.remove("loading");
}, 5000);

// Создаём падающие лепестки
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (!prefersReducedMotion) {
  for (let i = 0; i < 18; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";

    petal.style.setProperty("--left", `${Math.random() * 100}%`);
    petal.style.setProperty("--size", `${7 + Math.random() * 9}px`);
    petal.style.setProperty("--duration", `${8 + Math.random() * 12}s`);
    petal.style.setProperty("--delay", `${-Math.random() * 18}s`);
    petal.style.setProperty("--drift", `${-100 + Math.random() * 200}px`);

    petalsContainer.appendChild(petal);
  }
}

// Плавное появление блоков при прокрутке
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px",
    },
  );

  revealElements.forEach((element) => {
    if (!element.classList.contains("visible")) {
      observer.observe(element);
    }
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

// Мобильное меню
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Небольшой параллакс на главном экране
const hero = document.querySelector(".hero");
let ticking = false;

if (!prefersReducedMotion && window.matchMedia("(min-width: 601px)").matches) {
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        if (scrollY < window.innerHeight) {
          hero.style.backgroundPosition = `center ${55 + scrollY * 0.025}%`;
        }

        ticking = false;
      });
    },
    { passive: true },
  );
}
