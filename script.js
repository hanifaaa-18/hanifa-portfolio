/* =========================================================
   HANIFA MINHAAZ — PORTFOLIO SCRIPT
   Small, dependency-free helpers
   ========================================================= */


document.documentElement.classList.add("js");


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

const toggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("nav-links");


if (toggle && navLinks) {

  toggle.addEventListener("click", () => {

    const open =
      toggle.getAttribute("aria-expanded") === "true";

    toggle.setAttribute(
      "aria-expanded",
      String(!open)
    );

    toggle.setAttribute(
      "aria-label",
      open ? "Open menu" : "Close menu"
    );

    navLinks.classList.toggle(
      "open",
      !open
    );

  });


  /* Close mobile menu after selecting a link */

  navLinks
    .querySelectorAll("a")
    .forEach((link) => {

      link.addEventListener("click", () => {

        toggle.setAttribute(
          "aria-expanded",
          "false"
        );

        toggle.setAttribute(
          "aria-label",
          "Open menu"
        );

        navLinks.classList.remove("open");

      });

    });

}


/* =========================================================
   HIGHLIGHT NAVIGATION LINK
   ========================================================= */

const sections =
  document.querySelectorAll(
    "main section[id]"
  );


const linkFor = (id) => {

  if (!navLinks) {
    return null;
  }

  return navLinks.querySelector(
    `a[href="#${id}"]`
  );

};


if ("IntersectionObserver" in window) {

  const sectionObserver =
    new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          const link =
            linkFor(entry.target.id);

          if (!link) {
            return;
          }

          if (entry.isIntersecting) {

            navLinks
              .querySelectorAll("a")
              .forEach((a) =>
                a.classList.remove("active")
              );

            link.classList.add("active");

          }

        });

      },

      {
        rootMargin:
          "-45% 0px -50% 0px"
      }

    );


  sections.forEach((section) => {

    sectionObserver.observe(section);

  });

}


/* =========================================================
   REVEAL SECTIONS ON SCROLL
   ========================================================= */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


if ("IntersectionObserver" in window) {

  const revealObserver =
    new IntersectionObserver(

      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },

      {
        threshold: 0.12
      }

    );


  revealElements.forEach((element) => {

    revealObserver.observe(element);

  });

} else {

  /* Fallback for older browsers */

  revealElements.forEach((element) => {

    element.classList.add("visible");

  });

}


/* =========================================================
   FOOTER YEAR
   ========================================================= */

const yearElement =
  document.getElementById("year");


if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}