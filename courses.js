"use strict";
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
console.log(category);
window.onload = function () {
  fetchPageData();
  updatePageData();
};

function fetchPageData() {
  fetch("http://localhost:3000/api/instructors")
    .then((response) => response.json())
    .then((instructors) => {
      // Generate instructor slides with the fetched data
      generateInstructorSlides(instructors);
    })
    .catch((error) => console.error("Error fetching instructors:", error));

  fetch("http://localhost:3000/api/courses")
    .then((response) => response.json())
    .then((courses) => {
      // Generate instructor slides with the fetched data
      console.log(courses);
      generateCourseList(courses);
    })
    .catch((error) => console.error("Error fetching instructors:", error));
}

function updatePageData() {
  const heading1 = document.getElementById("main-heading");
  heading1.textContent = category + " Courses";

  const heading2 = document.getElementById("all-courses");
  heading2.textContent = "All " + category + " Courses";
}

function generateCourseList(courses) {
  const courseList = document.querySelector(".course-list");

  courses.forEach((course) => {
    const courseElement = document.createElement("div");
    courseElement.classList.add("course-element");

    const leftDiv = document.createElement("div");
    leftDiv.classList.add("left");
    const courseImage = document.createElement("img");
    courseImage.src = "images/07.png";
    leftDiv.appendChild(courseImage);

    const rightDiv = document.createElement("div");
    rightDiv.classList.add("right");

    const courseInfo = document.createElement("div");
    courseInfo.classList.add("course-info");

    const courseTitle = document.createElement("h3");
    courseTitle.textContent = course.name;
    courseInfo.appendChild(courseTitle);

    const courseDescription = document.createElement("p");
    courseDescription.textContent = course.short_description;
    courseInfo.appendChild(courseDescription);

    const ratingDiv = document.createElement("div");
    ratingDiv.classList.add("rating");
    ratingDiv.textContent = `${course.rating} `;

    const starsDiv = document.createElement("div");
    starsDiv.classList.add("stars");
    for (let i = 0; i < course.rating; i++) {
      const starImage = document.createElement("img");
      starImage.src = "images/star.png";
      starsDiv.appendChild(starImage);
    }
    ratingDiv.appendChild(starsDiv);

    const ratingsCount = document.createElement("span");
    ratingsCount.textContent = ` (${course.no_of_people_rated})`;
    ratingDiv.appendChild(ratingsCount);
    courseInfo.appendChild(ratingDiv);

    const instructorInfo = document.createElement("p");
    instructorInfo.textContent = `By ${course.teacher.first_name} ${course.teacher.last_name} - ${course.teacher.students_taught} students - Worldwide`;
    courseInfo.appendChild(instructorInfo);

    const courseDetails = document.createElement("p");
    courseDetails.textContent = `${course.duration.hours} hours - ${course.num_lectures} Lectures - ${course.difficulty_level}`;
    courseInfo.appendChild(courseDetails);

    rightDiv.appendChild(courseInfo);

    const priceDiv = document.createElement("div");
    priceDiv.classList.add("price");
    priceDiv.textContent = `Rs. ${course.price}`;

    courseElement.appendChild(leftDiv);
    courseElement.appendChild(rightDiv);
    courseElement.appendChild(priceDiv);

    courseList.appendChild(courseElement);
  });
}

function generateInstructorSlides(instructors) {
  const instructorWrapper = document.querySelector(".instructor-wrapper");

  instructors.forEach((instructor) => {
    const instructorSlide = document.createElement("div");
    instructorSlide.classList.add("swiper-slide", "instructor-slide");

    const instructorImage = document.createElement("div");
    instructorImage.classList.add("instructor-image");
    const image = document.createElement("img");
    image.src = "images/instructor-profile.jpg";
    instructorImage.appendChild(image);

    const instructorDetails = document.createElement("div");
    instructorDetails.classList.add("instructor-details");

    const instructorLink = document.createElement("a");
    instructorLink.href = "instructor-dashboard.html";
    instructorLink.textContent = instructor.name;
    instructorDetails.appendChild(instructorLink);

    const instructorRating = document.createElement("div");
    instructorRating.classList.add("instructor-rating");
    instructorRating.innerHTML = `
        <strong>4</strong>
        <img src="images/star.png" />
        Instructor Rating
      `;
    instructorDetails.appendChild(instructorRating);

    const subjectLine = document.createElement("p");
    subjectLine.textContent = "Python, Data Science";
    instructorDetails.appendChild(subjectLine);

    const studentsLine = document.createElement("p");
    studentsLine.innerHTML = `<strong>${instructor.students_taught}</strong> Students`;
    instructorDetails.appendChild(studentsLine);

    const coursesLine = document.createElement("p");
    coursesLine.innerHTML = `<strong>${instructor.num_courses}</strong> courses`;
    instructorDetails.appendChild(coursesLine);

    instructorSlide.appendChild(instructorImage);
    instructorSlide.appendChild(instructorDetails);
    instructorWrapper.appendChild(instructorSlide);
  });
}

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
