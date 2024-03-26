// Get modal elements
const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");
const modalBlur = document.getElementById("modal-blur");

// Get button elements
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

// Get close button elements
const closeLoginBtn = loginModal.querySelector(".close");
const closeSignupBtn = signupModal.querySelector(".close");

function animatePopUp(name) {
  name.classList.add("animate__animated", "animate__zoomIn");
  name.style.setProperty("animation-duration", "1s");
  modalBlur.style.display = "block";
  modalBlur.style.animation = "blur 1s forwards";
}

function resetAnimations() {
  modalBlur.style.display = "none";
  modalBlur.style.animation = "none";
}

// Open login modal
loginBtn.onclick = function () {
  loginModal.style.display = "block";
  animatePopUp(loginModal);
};

// Open signup modal
signupBtn.onclick = function () {
  signupModal.style.display = "block";
  animatePopUp(signupModal);
};

// Close modals
closeLoginBtn.onclick = function () {
  loginModal.style.display = "none";
  resetAnimations();
};

closeSignupBtn.onclick = function () {
  signupModal.style.display = "none";
  resetAnimations();
};

// Close modals when clicking outside
window.onclick = function (event) {
  if (event.target == loginModal) {
    loginModal.style.display = "none";
    resetAnimations();
  } else if (event.target == signupModal) {
    signupModal.style.display = "none";
    resetAnimations();
  }
};

// Handle form submissions
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission
  // Add your login logic here
  console.log("Login form submitted");
  loginModal.style.display = "none";
});

signupForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission
  // Add your sign-up logic here
  console.log("Sign-up form submitted");
  signupModal.style.display = "none";
});
