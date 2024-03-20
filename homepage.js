"use strict";

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
  if (isInViewport(box)) {
    cards.forEach(function (card) {
      card.classList.add("animate__animated", "animate__fadeInUp");
      card.style.setProperty("animation-duration", "1s");
      card.style.setProperty("animation-delay", `${delay}s`);
      delay += 0.1;
      numCounter(`.count-${count++}`);
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

// Function to handle scroll event
function handleScroll() {
  cardFadeUp();
  footerCardFadeUp();
  buttonFadeUp();
}

// Attach scroll event listener
window.addEventListener("scroll", handleScroll);

// Initial check on page load
handleScroll();
