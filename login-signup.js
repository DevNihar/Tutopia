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

function openModal(modal) {
  modal.style.display = "block";
  animatePopUp(modal);
}

function closeModal(modal) {
  modal.style.display = "none";
  if (modal === loginModal) {
    document.getElementById("invalid-login").style.display = "none";
  }
  resetAnimations();
}

function isValidPassword(password) {
  // Regular expressions for password criteria
  const lengthRegex = /.{8,}/;
  const uppercaseRegex = /[A-Z]/;
  const numberRegex = /\d/;
  const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  // Check if the password meets all criteria
  const hasValidLength = lengthRegex.test(password);
  const hasUppercase = uppercaseRegex.test(password);
  const hasNumber = numberRegex.test(password);
  const hasSpecialChar = specialCharRegex.test(password);

  return hasValidLength && hasUppercase && hasNumber && hasSpecialChar;
}

// Open login modal
loginBtn.onclick = function () {
  openModal(loginModal);
};

// Open signup modal
signupBtn.onclick = function () {
  let section = document.getElementById("register-now");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

// Close modals
closeLoginBtn.onclick = function () {
  closeModal(loginModal);
};

closeSignupBtn.onclick = function () {
  closeModal(signupModal);
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

const registerNow = document.querySelectorAll(".theme_btn");
registerNow.forEach(function (link) {
  link.addEventListener("click", function () {
    openModal(signupModal);
  });
});

// Handle form submissions
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

// Handle form submissions
loginForm.addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent form submission

  const email = loginForm.querySelector("#email").value;
  const password = loginForm.querySelector("#password").value;

  // Send login request to server
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.status === 200) {
    // If response status is OK (2xx), assume successful registration
    console.log("Login Sucessfull!!!");
    closeModal(loginModal);
    document.querySelector(".login-signup").style.display = "none";
    document.querySelector(".profile").style.display = "flex";
  } else if (response.status === 401) {
    console.log("Login Unsucessfull!!");
    document.getElementById("invalid-login").style.display = "block";
  }
});

signupForm.addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent form submission
  // const pattern = signupForm.querySelector("#signupForm #pass-pattern");
  const firstName = signupForm.querySelector("#first_name").value;
  console.log(firstName);
  const lastName = signupForm.querySelector("#last_name").value;
  console.log(lastName);
  const accountType = signupForm.querySelector("#account-type-selector").value;
  console.log(accountType);
  const email = signupForm.querySelector("#email").value;
  console.log(email);
  const password = signupForm.querySelector("#password").value;
  console.log(password);

  if (isValidPassword(password)) {
    // Send sign-up request to server
    const response = await fetch("http://localhost:3000/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        accountType,
        email,
        password,
      }),
    });
    // console.log(response);

    if (response.ok) {
      // If response status is OK (2xx), assume successful registration
      console.log("User registered successfully");
      // pattern.style.display = "none";
      // closeModal(signupModal);
      // openModal(loginModal);
    } else {
      // If response status is not OK, handle error
      console.error("Failed to register user:", await response.text());
      // pattern.style.display = "none";
    }
  }
});
