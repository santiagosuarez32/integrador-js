/* register form */
const registerForm = document.getElementById("register-form");
const nameInput = document.getElementById("input-name");
const lastNameInput = document.getElementById("input-lastname");
const emailInput = document.getElementById("input-email");
const phoneInput = document.getElementById("input-phone");
const msgInput = document.getElementById("input-msg");

const MIN_CHARACTERS = 3;
const MAX_CHARACTERS = 25;

const isEmpty = (input) => {
  console.log(!input.value.trim().length);
  return !input.value.trim().length;
};

checkTextInput = (input) => {
  let valid = false;

  if (isEmpty(input)) {
    console.log("esta vacio");
    return;
  }

  if (!isBetween(input, MIN_CHARACTERS, MAX_CHARACTERS)) {
    console.log("el campo tiene que tener entre 3 y 25 caracteres");
    return;
  }

  valid = true;
  return valid;
};

const isBetween = (input, min, max) => {
  return input.value.length >= min && input.value.length <= max;
};

const showError = (input, message) => {
  console.log(input, message);
};

const showSuccess = () => {};

const init = () => {
  nameInput.addEventListener("input", () => checkTextInput(nameInput));
};

init();
