"use strict";

// Select the first 8 course elements
const courseElements = document.querySelectorAll(".course-element");
const initialCourseElements = Array.from(courseElements).slice(0, 8);
const target = document.getElementById("all-courses");

// Display the initial course elements
initialCourseElements.forEach((element) => {
  element.style.display = "flex";
});
const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");
const pageNumbersContainer = document.getElementById("pageNumbers");
let currentPage = 1;
const coursesPerPage = 8;

function updatePagination() {
  // Clear previous page numbers
  pageNumbersContainer.innerHTML = "";

  // Calculate the number of pages
  const totalPages = Math.ceil(courseElements.length / coursesPerPage);

  // Create page number buttons
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.classList.add("page-button");
    pageButton.textContent = i;
    pageButton.addEventListener("click", () => {
      target.scrollIntoView({ behavior: "smooth" });
      showPage(i);
    });
    pageNumbersContainer.appendChild(pageButton);
  }

  // Enable/disable prev/next buttons
  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage === totalPages;
}

function showPage(pageNumber) {
  currentPage = pageNumber;
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;

  // Hide all course elements
  courseElements.forEach((element) => {
    element.style.display = "none";
    element.classList.remove("animate__animated", "animate__fadeIn");
  });

  // Display the course elements for the current page
  for (let i = startIndex; i < endIndex && i < courseElements.length; i++) {
    courseElements[i].style.display = "flex";
    courseElements[i].classList.add("animate__animated", "animate__fadeIn");
  }

  updatePagination();
}

prevPageButton.addEventListener("click", () => {
  target.scrollIntoView({ behavior: "smooth" });
  window.scrollTo({
    top: window.scrollY - 500,
    behavior: "smooth",
  });
  showPage(currentPage - 1);
});

nextPageButton.addEventListener("click", () => {
  target.scrollIntoView({ behavior: "smooth" });
  window.scrollTo({
    top: window.scrollY - 500,
    behavior: "smooth",
  });
  showPage(currentPage + 1);
});

// Initial page display
showPage(1);

function featuredSwiper() {
  var swiper = new Swiper(".featured", {
    slidesPerView: 1,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

function instructorsSwiper() {
  var swiper = new Swiper(".instructors", {
    spaceBetween: 30,
    slidesPerView: 4,
    centeredSlides: false,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

document.addEventListener("DOMContentLoaded", function () {
  featuredSwiper();
  instructorsSwiper();
});

// Add fixed header when scrolling
window.addEventListener("scroll", function () {
  let navbar = document.querySelector("body header");
  let headerHeight = document.querySelector("body header").offsetHeight;
  const filler = document.getElementById("filler");

  if (window.scrollY > headerHeight) {
    filler.style.display = "block";
    navbar.classList.add("fixed-header");
    navbar.classList.add("animate__animated", "animate__slideInDown");
    navbar.style.setProperty("animation-duration", "1s");
  } else {
    navbar.classList.remove(
      "fixed-header",
      "animate__animated",
      "animate__slideInDown"
    );
    filler.style.display = "none";
  }
});

// Switch signup-login buttons on header with profile
document
  .querySelector("header .profile .profile-logo")
  .addEventListener("click", () => {
    const ddown = document.querySelector(".profile-dropdown");
    ddown.style.setProperty("animation-duration", "1s");
    if (ddown.style.display === "flex") {
      ddown.classList.remove("animate__animated", "animate__fadeIn");
      ddown.style.display = "none";
    } else {
      ddown.classList.remove("animate__animated", "animate__fadeIn");
      ddown.classList.add("animate__animated", "animate__fadeIn");
      ddown.style.display = "flex";
    }
  });

// Close modals when clicking outside
window.onclick = function (event) {
  if (event.target == document.querySelector(".profile-dropdown")) {
    ddown.classList.remove("animate__animated", "animate__fadeIn");
    ddown.style.display = "none";
  }
};

// Change image as well as bg color when hovering over the categories buttons
document.querySelectorAll(".category-btn").forEach(function (btn) {
  let img = btn.querySelector("img:first-of-type");
  let img2 = btn.querySelector("img:last-of-type");
  let span = btn.querySelector("span");
  const imgName = img.id;
  btn.addEventListener("mouseover", function () {
    // Swap image source on hover
    img.src = `images/${imgName}-white.png`;
    img2.src = `images/arrow-right-white.png`;
    span.style.color = "white";
    btn.style.backgroundColor = "#ff723a";
  });

  btn.addEventListener("mouseout", function () {
    // Revert image source on mouseout
    img.src = `images/${imgName}.png`;
    img2.src = `images/arrow-right.png`;
    span.style.color = "black";
    btn.style.backgroundColor = "white";
  });
});

// Hovering effects for socials icons
document.querySelectorAll(".socials-icon-bg").forEach(function (btn) {
  let img = btn.querySelector("img");
  const imgName = img.id;
  btn.addEventListener("mouseover", function () {
    // Swap image source on hover
    img.src = `images/${imgName}-white.png`;
    btn.style.backgroundColor = "#ff723a";
  });

  btn.addEventListener("mouseout", function () {
    // Revert image source on mouseout
    img.src = `images/${imgName}.png`;
    btn.style.backgroundColor = "white";
  });
});

// Function to check if an element is in the viewport
function isInViewport(element) {
  let rect = element.getBoundingClientRect();
  let viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;
  return rect.top <= viewportHeight;
}

function footerCardFadeUp() {
  let cards = document.querySelectorAll(".footer-cards");
  let view = document.querySelector(".foot-mid .about-us");
  let delay = 0;
  if (isInViewport(view)) {
    cards.forEach(function (card) {
      card.classList.add("animate__animated", "animate__fadeInUp");
      card.style.setProperty("animation-duration", "1s");
      card.style.setProperty("animation-delay", `${delay}s`);
      delay += 0.1;
    });
  }
}

// Function to handle scroll event
function handleScroll() {
  footerCardFadeUp();
}

// Attach scroll event listener
window.addEventListener("scroll", handleScroll);

// Initial check on page load
handleScroll();
