// Get modal elements
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');

// Get button elements
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');

// Get close button elements
const closeLoginBtn = loginModal.querySelector('.close');
const closeSignupBtn = signupModal.querySelector('.close');

// Open login modal
loginBtn.onclick = function() {
  loginModal.style.display = 'block';
}

// Open signup modal
signupBtn.onclick = function() {
  signupModal.style.display = 'block';
}

// Close modals
closeLoginBtn.onclick = function() {
  loginModal.style.display = 'none';
}

closeSignupBtn.onclick = function() {
  signupModal.style.display = 'none';
}

// Close modals when clicking outside
window.onclick = function(event) {
  if (event.target == loginModal) {
    loginModal.style.display = 'none';
  } else if (event.target == signupModal) {
    signupModal.style.display = 'none';
  }
}

// Handle form submissions
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

loginForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  // Add your login logic here
  console.log('Login form submitted');
  loginModal.style.display = 'none';
});

signupForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  // Add your sign-up logic here
  console.log('Sign-up form submitted');
  signupModal.style.display = 'none';
});