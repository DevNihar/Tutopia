"use strict";

window.onload = () => {
  fetchCourseData();
};

const fetchCourseData = () => {
  fetch("http://localhost:3000/api/courses")
    .then((response) => response.json())
    .then((courses) => {
      // Use the courses array to render the course cards on your homepage
      renderCoursesOnHomepage(courses);
    })
    .catch((error) => {
      console.error("Error fetching course data:", error);
    });
};

const renderCoursesOnHomepage = (courses) => {
  console.log(courses);
  const coursesCards = document.querySelectorAll(".course-card");

  coursesCards.forEach((card, index) => {
    // card.id = courses[index].course_id;
    // console.log(courses[index]);
    const feedbackTag = card.querySelector(".feedback-tag");
    feedbackTag.innerHTML = `${courses[index].rating}<img src="images/star.png" />(${courses[index].no_of_people_rated})`;

    // Update course type
    const typeTag = card.querySelector(".tags span");
    typeTag.textContent = courses[index].type;

    // Update Price Tag
    const priceTag = card.querySelector(".price-tag");
    priceTag.textContent = `Rs.${courses[index].price}`;

    // Update course name
    const subtitle = card.querySelector(".subtitle a");
    subtitle.textContent = courses[index].name;
    subtitle.setAttribute(
      "href",
      `course-details.html?courseId=${courses[index].course_id}`
    );

    // Update course duration
    const courseDuration = card.querySelector(".course_duration");
    courseDuration.innerHTML = `<img class="icon" src="images/time.svg" alt="course-meta" /> ${courses[index].duration.hours} Hours`;

    // Update course difficulty level
    const courseDifficulty = card.querySelector(".course_difficulty");
    const difficulty = courses[index].difficulty_level;
    if (difficulty === "Easy") {
      courseDifficulty.innerHTML = `<img class="icon" src="images/easy.png" alt="course-meta" /> ${difficulty}`;
    } else if (difficulty === "Intermediate") {
      courseDifficulty.innerHTML = `<img class="icon" src="images/medium.png" alt="course-meta" /> ${difficulty}`;
    } else {
      courseDifficulty.innerHTML = `<img class="icon" src="images/hard.png" alt="course-meta" /> ${difficulty}`;
    }

    // Update course short description
    const subSubTitle = card.querySelector(".sub-sub-title");
    subSubTitle.textContent = courses[index].short_description;

    // Update Author Details
    const teacher = courses[index].teacher;
    const teacherName = card.querySelector(
      ".course_author .authors-details h5"
    );
    const teacherTitle = card.querySelector(
      ".course_author .authors-details span"
    );
    const studentsTaught = card.querySelector(".course_author p span");
    teacherName.textContent = `${teacher.first_name} ${teacher.last_name}`;
    teacherTitle.textContent = teacher.title;
    studentsTaught.textContent = `${teacher.students_taught}+`;
  });
};

// document
//   .getElementById("search-form")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();
//     let searchQuery = document
//       .getElementById("search-input")
//       .value.toLowerCase();
//   });

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

// animation funciton for the number counting effect
function animateValue(obj, start, end, duration, callback) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      if (callback && typeof callback === "function") {
        callback();
      }
    }
  };
  window.requestAnimationFrame(step);
}

// Driver function for number counting
function numCounter(card) {
  const obj = document.querySelector(`${card} .counter`);
  let value = obj.innerHTML;
  value = value.substring(0, value.length - 1);
  if (!obj.classList.contains("animated")) {
    animateValue(obj, 0, value, 1500, function () {
      obj.innerHTML += "+";
    });
    obj.classList.add("animated");
  }
}

// Function to fadeup the cards
function cardFadeUp() {
  let delay = 0;
  let count = 0;
  let box = document.querySelector(".count-0");
  let cards = document.querySelectorAll(".users");
  let cards2 = document.querySelectorAll(".skill-ad-box");
  if (isInViewport(box)) {
    cards.forEach(function (card) {
      card.classList.add("animate__animated", "animate__fadeInUp");
      card.style.setProperty("animation-duration", "1s");
      card.style.setProperty("animation-delay", `${delay}s`);
      delay += 0.1;
      numCounter(`.count-${count++}`);
    });
    cards2.forEach(function (card) {
      card.classList.add("animate__animated", "animate__fadeInUp");
      card.style.setProperty("animation-duration", "1s");
      card.style.setProperty("animation-delay", `${delay}s`);
      delay += 0.1;
    });
  }
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

function buttonFadeUp() {
  let btns = document.querySelectorAll(".btn-anim");
  btns.forEach(function (btn) {
    if (isInViewport(btn)) {
      btn.classList.add("animate__animated", "animate__fadeInUp");
      btn.style.setProperty("animation-duration", "1s");
    }
  });
}

function registerSectionFadeUp() {
  const sections = document.querySelectorAll(".reg-sec");
  let delay = 0;
  sections.forEach(function (section) {
    if (isInViewport(section)) {
      section.classList.add("animate__animated", "animate__fadeInUp");
      section.style.setProperty("animation-duration", "1s");
      section.style.setProperty("animation-delay", `${delay}s`);
      delay += 0.1;
    }
  });
}

// Function to handle scroll event
function handleScroll() {
  cardFadeUp();
  footerCardFadeUp();
  buttonFadeUp();
  registerSectionFadeUp();
}

// Attach scroll event listener
window.addEventListener("scroll", handleScroll);

// Initial check on page load
handleScroll();
