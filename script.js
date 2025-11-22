// Smooth scrolling for nav links
const navLinks = document.querySelectorAll(".nav-link");
const navMenu = document.getElementById("nav-menu");
const navToggle = document.querySelector(".nav-toggle");
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const sections = document.querySelectorAll("section[id]");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Mobile nav toggle
if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Close mobile menu when clicking outside
document.addEventListener("click", (event) => {
  if (navMenu && navToggle && !navMenu.contains(event.target) && !navToggle.contains(event.target)) {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// Reveal on scroll
const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealItems.forEach((item) => observer.observe(item));

// Active nav link on scroll
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (!link) return;

      if (entry.isIntersecting) {
        navLinks.forEach((navLink) => navLink.classList.remove("active"));
        link.classList.add("active");
      }
    });
  },
  {
    threshold: 0.35,
  }
);

sections.forEach((section) => sectionObserver.observe(section));

// Contact form handler
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent = "Thanks! Your details are in. I’ll reply within 24 hours with next steps.";
    form.reset();
    setTimeout(() => {
      formStatus.textContent = "";
    }, 4000);
  });
}
