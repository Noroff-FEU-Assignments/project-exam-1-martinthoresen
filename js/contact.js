/* HAMBURGER MENU */
const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

/* FORM VALIDATION */

const form = document.querySelector("#contact-form");
const messageContainer = document.querySelector(".message-container");
const fullName = document.querySelector("#fullname");
const fullNameError = document.querySelector("#fullname-error");

const email = document.querySelector("#email");
const emailError = document.querySelector("#email-error");

const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subject-error");

const message = document.querySelector("#message");
const messageError = document.querySelector("#message-error");

function validateForm() {
  event.preventDefault();

  if (checkLength(fullName.value, 5) === true) {
    fullNameError.style.display = "none";
  } else {
    fullNameError.style.display = "block";
  }

  if (validateEmail(email.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (checkLength(subject.value, 10) === true) {
    subjectError.style.display = "none";
  } else {
    subjectError.style.display = "block";
  }

  if (checkLength(message.value, 25) === true) {
    messageError.style.display = "none";
  } else {
    messageError.style.display = "block";
  }
  messageContainer.innerHTML = "";
  if (checkLength(fullName.value, 5 && subject.value, 10 && message.value, 25) && validateEmail(email.value) === true) {
    messageContainer.innerHTML = createMessage("success", "Thank you for reaching out. We will get back to you as soon as possible!");
  }
}

form.addEventListener("submit", validateForm);

function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}
