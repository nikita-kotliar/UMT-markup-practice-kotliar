const mobileMenu = document.querySelector(".mobile-menu-wrapper");
const openMobileMenuBtn = document.querySelector(".open-mobile-menu-btn");
const closeMobileMenuBtn = document.querySelector(".close-mobile-menu-btn");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu-href-js");

mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    closeMobileMenuBtn.classList.remove("active");
    openMobileMenuBtn.classList.remove("unactive");
    document.body.style.overflow = "visible";
  });
});

closeMobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  closeMobileMenuBtn.classList.remove("active");
  openMobileMenuBtn.classList.remove("unactive");
  document.body.style.overflow = "visible";
});
openMobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.add("active");
  closeMobileMenuBtn.classList.add("active");
  openMobileMenuBtn.classList.add("unactive");
  document.body.style.overflow = "hidden";
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1440) {
    mobileMenu.classList.remove("active");
    closeMobileMenuBtn.classList.remove("active");
    openMobileMenuBtn.classList.remove("unactive");
  }
});
