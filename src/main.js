import "./css/style.css";

import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";


window.history.scrollRestoration = "manual";
window.scrollTo({ top: 0, behavior: "instant" });


const TOAST_COLORS = {
  success: "linear-gradient(135deg, #22c55e, #16a34a)",
  error: "linear-gradient(135deg, #ef4444, #dc2626)",
  warning: "linear-gradient(135deg, #f59e0b, #d97706)",
  info: "linear-gradient(135deg, #6366f1, #4f46e5)",
};

const toast = {
  _show(type, message, duration = 4000) {
    Toastify({
      text: message,
      duration,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: { background: TOAST_COLORS[type] ?? TOAST_COLORS.info },
    }).showToast();
  },
  success(msg, opts) {
    this._show("success", msg, opts?.duration);
  },
  error(msg, opts) {
    this._show("error", msg, opts?.duration);
  },
  warning(msg, opts) {
    this._show("warning", msg, opts?.duration);
  },
  info(msg, opts) {
    this._show("info", msg, opts?.duration);
  },
};


const API_BASE = import.meta.env.VITE_API_URL ?? "";

function pingServer() {
  fetch(`${API_BASE}api/bouquets?_limit=1`).catch(() => {});
}
setInterval(pingServer, 10 * 60 * 1000);


const mobileMenu = document.querySelector(".mobile-menu-wrapper");
const openMobileMenuBtn = document.querySelector(".open-mobile-menu-btn");
const closeMobileMenuBtn = document.querySelector(".close-mobile-menu-btn");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu-href-js");
const headerButton = document.querySelectorAll(".header-button");

function closeMobileMenu() {
  mobileMenu.classList.remove("active");
  closeMobileMenuBtn.classList.remove("active");
  openMobileMenuBtn.classList.remove("unactive");
  document.body.style.overflow = "visible";
}

headerButton.forEach((button) =>
  button.addEventListener("click", closeMobileMenu),
);
mobileMenuLinks.forEach((link) =>
  link.addEventListener("click", closeMobileMenu),
);
closeMobileMenuBtn.addEventListener("click", closeMobileMenu);
openMobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.add("active");
  closeMobileMenuBtn.classList.add("active");
  openMobileMenuBtn.classList.add("unactive");
  document.body.style.overflow = "hidden";
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1440) closeMobileMenu();
});


const list = document.getElementById("main-bouquets-list");
const emptyMsg = document.getElementById("bouquets-empty");
const errorMsg = document.getElementById("bouquets-error");
const loadMoreBtn = document.getElementById("load-more-btn");

const PAGE_SIZE = 15;
let page = 1;
let allBouquets = [];

let currentBouquet = null;
let currentQuantity = 1;

async function fetchBouquets() {
  const url = `${API_BASE}api/bouquets?_page=${page}&_limit=${PAGE_SIZE}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function renderCard(bouquet) {
  return `
    <li class="list-item" data-id="${bouquet.id}">
      <img src="${bouquet.photoURL}" alt="${bouquet.title}" class="flower image" fetchpriority="high" />
      <div class="text">
        <h3 class="flower-title">${bouquet.title}</h3>
        <p class="flower-text">${bouquet.description}</p>
        <p class="price">$${bouquet.price}</p>
      </div>
    </li>`;
}

function renderList() {
  list.innerHTML = allBouquets.map(renderCard).join("");
  emptyMsg.classList.toggle("hidden", allBouquets.length > 0);
  loadMoreBtn.style.display = "none";
  errorMsg.classList.add("hidden");
}

async function loadBouquets() {
  try {
    errorMsg.classList.add("hidden");
    const isFirstLoad = page === 1;
    const bouquets = await fetchBouquets();
    allBouquets = [...allBouquets, ...bouquets];
    renderList();
    page++;

    if (!isFirstLoad) {
      const firstCard = list.querySelector(".list-item");
      if (firstCard) {
        window.scrollBy({
          top: firstCard.getBoundingClientRect().height,
          behavior: "smooth",
        });
      }
    }

    if (bouquets.length < PAGE_SIZE) {
      loadMoreBtn.textContent = "All loaded";
      loadMoreBtn.disabled = true;
    } else {
      loadMoreBtn.style.display = "block";
    }
  } catch (error) {
    console.error("Failed to load bouquets:", error);
    errorMsg.textContent =
      "Server is waking up, please try again in 30 seconds...";
    errorMsg.classList.remove("hidden");
  }
}

loadMoreBtn.addEventListener("click", loadBouquets);


async function fetchBouquetById(id) {
  const url = `${API_BASE}api/bouquets/${id}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

const modal = document.getElementById("modal-backdrop");
const modalContent = document.getElementById("modal-content");
const modalIn = document.getElementById("modal");
const closeModalBtn = document.getElementById("close-modal-btn");

function openModal() {
  modal.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("is-open");
  document.body.style.overflow = "visible";
  modalContent.innerHTML = "";
  modalContent.classList.remove("about", "form");
  modalIn.classList.remove("about", "form");
  currentBouquet = null;
  currentQuantity = 1;
  closeModalBtn._formBackHandler = null;
}


modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    if (closeModalBtn._formBackHandler) {
      closeModalBtn._formBackHandler();
      closeModalBtn._formBackHandler = null;
      return;
    }
    closeModal();
  }
});

closeModalBtn.addEventListener("click", () => {
  if (closeModalBtn._formBackHandler) {
    closeModalBtn._formBackHandler();
    closeModalBtn._formBackHandler = null;
    return;
  }
  closeModal();
});


function renderBouquetModal(bouquetData) {
  modalContent.classList.remove("form");
  modalIn.classList.remove("form");
  modalContent.classList.add("about");
  modalIn.classList.add("about");

  modalContent.innerHTML = `
    <img src="${bouquetData.photoURL}" alt="${bouquetData.title}" class="flower-image" fetchpriority="high" />
    <div class="text">
      <h3 class="flower-title">${bouquetData.title}</h3>
      <p class="price">$${bouquetData.price}</p>
      <p class="flower-text">${bouquetData.description}</p>
      <div class="purchase-section">
        <button class="button animated-button buy-now-btn" aria-label="Add to cart" type="button">Buy now</button>
        <input type="number" class="quantity-input" value="1" min="1" max="9999" />
      </div>
    </div>
  `;

  const buyBtn = modalContent.querySelector(".buy-now-btn");
  const quantityInput = modalContent.querySelector(".quantity-input");

  buyBtn.addEventListener("click", () => {
    currentQuantity = parseInt(quantityInput.value, 10) || 1;
    renderFormModal(bouquetData);
  });
}


function renderUnavailableModal(slideData) {
  modalContent.classList.remove("form");
  modalIn.classList.remove("form");
  modalContent.classList.add("about");
  modalIn.classList.add("about");

  modalContent.innerHTML = `
    <img src="${slideData.photoURL}" alt="${slideData.title}" class="flower-image" fetchpriority="high" />
    <div class="text">
      <h3 class="flower-title">${slideData.title}</h3>
      <p class="price">$${slideData.price}</p>
      <p class="flower-text">${slideData.description}</p>
      <div class="purchase-section" style="justify-content:center;">
        <p style="font-weight:600;color:#ef4444;font-size:15px;">⚠️ Currently unavailable</p>
      </div>
    </div>
  `;
}


function validatePhone(value) {
  return /^[+]?[0-9\s()\-]{7,18}$/.test(value.trim());
}

function renderFormModal(bouquetData) {
  modalContent.classList.remove("about");
  modalIn.classList.remove("about");
  modalContent.classList.add("form");
  modalIn.classList.add("form");

  modalContent.innerHTML = `
    <h2 class="modal-title">Order</h2>
    <form class="modal-form" id="modal-form" novalidate>
      <div class="form-group">
        <label class="modal-form-label" for="name">Name*</label>
        <input class="modal-form-input" id="name" type="text" name="name" placeholder="Ann" required />
        <span class="field-error hidden" id="name-error"></span>
      </div>
      <div class="form-group">
        <label class="modal-form-label" for="phone">Phone*</label>
        <input class="modal-form-input" id="phone" type="tel" name="phone" placeholder="+1 (555) 123-4567" required />
        <span class="field-error hidden" id="phone-error"></span>
      </div>
      <div class="form-group">
        <label class="modal-form-label" for="address">Address*</label>
        <input class="modal-form-input" id="address" type="text" name="address" placeholder="456 Floral Ave, Sydney NSW 2000 AU" required />
        <span class="field-error hidden" id="address-error"></span>
      </div>
      <div class="form-group">
        <label class="modal-form-label" for="comment">Message</label>
        <textarea class="modal-form-input" id="comment" name="comment" placeholder="Type your message..."></textarea>
      </div>
      <button class="button animated-button submit-btn" type="submit">Go to Checkout</button>
    </form>
  `;

  const form = modalContent.querySelector("#modal-form");

  function showError(fieldId, message) {
    const input = form.querySelector(`#${fieldId}`);
    const error = form.querySelector(`#${fieldId}-error`);
    if (!input || !error) return;
    input.classList.add("input-error");
    error.textContent = message;
    error.classList.remove("hidden");
  }

  function clearError(fieldId) {
    const input = form.querySelector(`#${fieldId}`);
    const error = form.querySelector(`#${fieldId}-error`);
    if (!input || !error) return;
    input.classList.remove("input-error");
    error.textContent = "";
    error.classList.add("hidden");
  }

  form.querySelectorAll(".modal-form-input").forEach((input) => {
    input.addEventListener("focus", () => {
      input
        .closest(".form-group")
        ?.querySelector(".modal-form-label")
        ?.classList.add("label-focused");
    });
    input.addEventListener("blur", () => {
      input
        .closest(".form-group")
        ?.querySelector(".modal-form-label")
        ?.classList.remove("label-focused");
    });
  });

  ["name", "phone", "address"].forEach((id) => {
    form
      .querySelector(`#${id}`)
      ?.addEventListener("input", () => clearError(id));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name").trim();
    const phone = formData.get("phone").trim();
    const address = formData.get("address").trim();

    let hasError = false;

    if (!name) {
      showError("name", "Please enter your name");
      hasError = true;
    }
    if (!phone) {
      showError("phone", "Please enter your phone number");
      hasError = true;
    } else if (!validatePhone(phone)) {
      showError("phone", "Enter a valid phone number");
      hasError = true;
    }
    if (!address) {
      showError("address", "Please enter your address");
      hasError = true;
    }

    if (hasError) {
      toast.error("Please fix the highlighted fields before submitting.");
      return;
    }

    const orderData = {
      bouquet: {
        id: bouquetData.id,
        title: bouquetData.title,
        price: bouquetData.price,
      },
      quantity: currentQuantity,
      total: `$${(bouquetData.price * currentQuantity).toFixed(2)}`,
      customer: {
        name,
        phone,
        address,
        comment: formData.get("comment") || "",
      },
    };

    console.log("Order submitted:", orderData);
    closeModal();
    toast.success(
      `Order for "${bouquetData.title}" placed! We'll contact you soon.`,
      { duration: 6000 },
    );
  });

  closeModalBtn._formBackHandler = () => renderBouquetModal(bouquetData);
}


list.addEventListener("click", async (event) => {
  const targetCard = event.target.closest(".list-item");
  if (!targetCard) return;

  const bouquetId = targetCard.dataset.id;
  closeModalBtn._formBackHandler = null;

  try {
    const bouquetData = await fetchBouquetById(bouquetId);
    currentBouquet = bouquetData;
    currentQuantity = 1;
    renderBouquetModal(bouquetData);
    openModal();
  } catch (error) {
    console.error("Failed to fetch bouquet data:", error);
    toast.error("Could not load bouquet details. Please try again.");
  }
});


const FALLBACK_SLIDES = [
  {
    photoURL: "https://ftp.goit.study/img/flowers/68498236a1003120869.png",
    title: "Spring Elegance",
    description:
      "A delicate blend of peonies, tulips, and roses — perfect for springtime gifting and bright smiles.",
    price: 35,
    isFallback: true,
  },
  {
    photoURL: "https://ftp.goit.study/img/flowers/68498236a1003120870.png",
    title: "Berry Chic",
    description:
      "A stylish composition of roses, seasonal greenery, and vibrant berries — a bold and elegant floral statement.",
    price: 40,
    isFallback: true,
  },
  {
    photoURL: "https://ftp.goit.study/img/flowers/68498236a1003120871.png",
    title: "Lavender Dream",
    description:
      "A rich bouquet with lavender, lisianthus, and roses — ideal for those who love deep hues and gentle fragrance.",
    price: 55,
    isFallback: true,
  },
  {
    photoURL: "https://ftp.goit.study/img/flowers/68498236a1003120872.png",
    title: "Lavendin Hell",
    description:
      "A dramatic arrangement of dark purple roses, calla lilies, and lush greenery — designed for bold personalities and unforgettable moments.",
    price: 75,
    isFallback: true,
  },

];

async function fetchFavorites() {
  try {
    const res = await fetch(`${API_BASE}api/bouquets?favorite=true&_limit=10`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function buildSlides(favorites) {
  if (favorites.length >= 4)
    return favorites.map((f) => ({ ...f, isFallback: false }));
  const needed = 4 - favorites.length;
  return [
    ...favorites.map((f) => ({ ...f, isFallback: false })),
    ...FALLBACK_SLIDES.slice(0, needed),
  ];
}

async function initGallery() {
  const favorites = await fetchFavorites();
  const slides = buildSlides(favorites);

  const wrapper = document.querySelector(".gallery-swiper .swiper-wrapper");
  wrapper.innerHTML = slides
    .map(
      (slide, idx) => `
      <li class="swiper-slide gallery-item" data-slide-index="${idx}">
        <img src="${slide.photoURL}" alt="${slide.title}" class="image" />
        <div class="text">
          <h3 class="flower-title">${slide.title}</h3>
          <p class="flower-text">${slide.description}</p>
          <p class="price">$${slide.price}</p>
        </div>
      </li>`,
    )
    .join("");

  wrapper.addEventListener("click", (e) => {
    const item = e.target.closest(".gallery-item");
    if (!item) return;

    const idx = parseInt(item.dataset.slideIndex, 10);
    const slide = slides[idx];
    if (!slide) return;

    closeModalBtn._formBackHandler = null;

    if (slide.isFallback) {
      renderUnavailableModal(slide);
      openModal();
      toast.warning(
        `"${slide.title}" is currently not available in our store.`,
        { duration: 5000 },
      );
    } else {
      fetchBouquetById(slide.id)
        .then((bouquetData) => {
          currentBouquet = bouquetData;
          currentQuantity = 1;
          renderBouquetModal(bouquetData);
          openModal();
        })
        .catch((err) => {
          console.error("Failed to fetch gallery bouquet:", err);
          toast.error("Could not load bouquet details. Please try again.");
        });
    }
  });

  new Swiper(".gallery-swiper", {
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: { el: ".gallery-dots", clickable: true },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: { slidesPerView: 1, spaceBetween: 0 },
      768: { slidesPerView: 2, spaceBetween: 24 },
      1440: { slidesPerView: 3, spaceBetween: 32 },
    },
  });
}


const FALLBACK_REVIEWS = [
  {
    text: '"Flora made my anniversary unforgettable with their beautiful arrangement!"',
    author: "Emma T.",
  },
  {
    text: "Absolutely stunning bouquet! It looked even better than the photo and arrived right on time.",
    author: "Daniel R.",
  },
  {
    text: "The service was exceptional, and the flowers were fresh for over two weeks!",
    author: "Olivia M.",
  },
  {
    text: "I ordered a last-minute birthday bouquet and was amazed — it was delivered within hours and looked gorgeous.",
    author: "Sophie K.",
  },
  {
    text: "Every time I order from Flora, I know I'm getting something truly special. My go-to flower shop!",
    author: "James L.",
  },
  {
    text: "The team helped me choose the perfect arrangement for my mom's birthday. She was in tears — the good kind!",
    author: "Lena B.",
  },
];

async function initReviews() {
  const reviews = FALLBACK_REVIEWS;

  const wrapper = document.querySelector(".reviews-swiper .swiper-wrapper");
  wrapper.innerHTML = reviews
    .map(
      (review) => `
      <li class="swiper-slide reviews-item">
        <p class="text">${review.text}</p>
        <p class="author">${review.author}</p>
      </li>`,
    )
    .join("");

  new Swiper(".reviews-swiper", {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: ".reviews-swiper .swiper-button-next",
      prevEl: ".reviews-swiper .swiper-button-prev",
    },
    breakpoints: {
      0: { slidesPerView: 1, spaceBetween: 0 },
      768: { slidesPerView: 2, spaceBetween: 24 },
      1440: { slidesPerView: 3, spaceBetween: 32 },
    },
  });
}


loadBouquets();
initGallery();
initReviews();
