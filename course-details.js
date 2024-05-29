("use strict");

window.onload = function () {
  fetchCourseData();
  var swiper = new Swiper(".carousel", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
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
    breakpoints: {
      // Settings for screens smaller than 768px
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      // Settings for screens 768px and larger
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      // Settings for screens 1200px and larger
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
};

const fetchCourseData = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get("courseId");
  console.log("Course ID:", courseId);
  fetch(`http://localhost:3000/api/courses/${courseId}`)
    .then((response) => response.json())
    .then((course) => {
      renderCourseDetails(course);
    })
    .catch((error) => {
      console.error("Error fecthing course data", error);
    });

  fetch("http://localhost:3000/api/courses")
    .then((response) => response.json())
    .then((courses) => {
      // Use the courses array to render the course cards on your homepage
      renderCoursesOnpage(courses);
    })
    .catch((error) => {
      console.error("Error fetching course data:", error);
    });
};

const renderCourseDetails = (course) => {
  console.log(course);
  document.querySelectorAll(".course-name").forEach((element) => {
    element.textContent = course.name;
  });
  document.querySelectorAll(".teacher-name").forEach((element) => {
    element.textContent =
      course.teacher.first_name + " " + course.teacher.last_name;
  });
  document.querySelector(".course-price").textContent = "Rs." + course.price;
  document.querySelector(".course-info").textContent = course.long_description;
  document.querySelector(".teacher-info").textContent =
    course.teacher.background;
  document.querySelector(".teacher-title").textContent = course.teacher.title;
  document.querySelector(
    ".num_lessions_duration"
  ).textContent = `${course.num_of_lectures} Lessons (${course.duration.hours}h)`;
  document.querySelector(".more-from").textContent =
    "More From " + course.teacher.first_name + " " + course.teacher.last_name;

  const videoListContainer = document.querySelector(".video-list");

  const lectureData = course.lectures;

  // Loop through the lecture data and create the vid-list-element divs
  lectureData.forEach((lecture) => {
    // Create the outer div element
    const vidListElement = document.createElement("div");
    vidListElement.classList.add("vid-list-element");

    // Create the inner div element
    const vleLeft = document.createElement("div");
    vleLeft.classList.add("vle-left");

    // Create the image element
    const img = document.createElement("img");
    img.src = "images/video-player.png";

    // Create the anchor element
    const anchor = document.createElement("a");
    anchor.classList.add("course-lecture-name");
    anchor.textContent = lecture.name;

    // Create the duration paragraph element
    const durationParagraph = document.createElement("p");
    durationParagraph.classList.add("course-lecture-duration");
    durationParagraph.textContent = lecture.duration.hours + " mins";

    // Append the child elements to their respective parent elements
    vleLeft.appendChild(img);
    vleLeft.appendChild(anchor);
    vidListElement.appendChild(vleLeft);
    vidListElement.appendChild(durationParagraph);

    // Append the vid-list-element div to the video-list container
    videoListContainer.appendChild(vidListElement);
  });
};

const renderCoursesOnpage = (courses) => {
  console.log(courses);
  const coursesCards = document.querySelectorAll(".card");

  coursesCards.forEach((card, index) => {
    const feedbackTag = card.querySelector(".feedback-tag");
    feedbackTag.innerHTML = `${courses[index].rating}<img src="images/star.png" />(${courses[index].no_of_people_rated})`;

    // Update course type
    const typeTag = card.querySelector(".tag-section span");
    typeTag.textContent = courses[index].type;

    // Update course name
    const subtitle = card.querySelector(".title-section a");
    subtitle.textContent = courses[index].name;

    // Update course duration
    const courseDuration = card.querySelector(".period");
    courseDuration.innerHTML = `<img src="images/time.svg" /> ${courses[index].duration.hours} Hours`;

    // Update course difficulty level
    const courseDifficulty = card.querySelector(".difficulty");
    const difficulty = courses[index].difficulty_level;
    if (difficulty === "Easy") {
      courseDifficulty.innerHTML = `<img src="images/easy.png" /> ${difficulty}`;
    } else if (difficulty === "Intermediate") {
      courseDifficulty.innerHTML = `<img src="images/medium.png" /> ${difficulty}`;
    } else {
      courseDifficulty.innerHTML = `<img src="images/hard.png" /> ${difficulty}`;
    }

    // Update course short description
    const subSubTitle = card.querySelector(".short-description");
    subSubTitle.textContent = courses[index].short_description;
  });
};

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
