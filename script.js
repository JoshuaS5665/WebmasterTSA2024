function loadHead(url) {
  const header = document.getElementById("header");
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      header.innerHTML = data;
      console.log(url + "Function is Running");
    });
}

function changeImages(beginning) {
  const homeImage = document.getElementById("homeImage");
  console.log(homeImage.src);

  let x = 0;

  setInterval(() => {
    homeImage.classList.toggle("fade-out");
    setTimeout(() => {
      homeImage.classList.add("fade-out");
      if (x == 0) {
        homeImage.src = `${beginning}public/images/homeImage1.jpg`;
        x++;
      } else if (x == 1) {
        homeImage.src = `${beginning}public/images/homeImage2.jpg`;
        x++;
      } else {
        homeImage.src = `${beginning}public/images/homeImage3.jpg`;
        x = 0;
      }
      homeImage.classList.remove("fade-out");
    }, 2000);
  }, 6000);
}

document.addEventListener("DOMContentLoaded", function () {
  var acc = document.getElementsByClassName("faqButton");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
});



function loadFooter(url) {
  const footer = document.getElementById("footer");
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      footer.innerHTML = data;
      console.log("Footer Function is Running");
    });
}

function validateContactInfo() {
  const firstNameInput = document.getElementById("firstNameInput");
  const lastNameInput = document.getElementById("lastNameInput");
  const emailInput = document.getElementById("emailInput");
  const phoneInput = document.getElementById("phoneInput");
  let isValid = true;

  if (!firstNameInput.value.trim()) {
    showError(firstNameInput, 'Please enter your first name');
    isValid = false;
  } else {
    hideError(firstNameInput);
  }

  if (!lastNameInput.value.trim()) {
    showError(lastNameInput, 'Please enter your last name');
    isValid = false;
  } else {
    hideError(lastNameInput);
  }

  if (!emailInput.value.trim()) {
    showError(emailInput, 'Please enter your email');
    isValid = false;
  } else {
    hideError(emailInput);
  }

  if (!phoneInput.value.trim()) {
    showError(phoneInput, 'Please enter your phone number');
    isValid = false;
  } else {
    hideError(phoneInput);
  }

  if (isValid) {
    const form = document.querySelector('.contact-form form');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const submitBtn = document.getElementById('submit');
    const cancelBtn = document.getElementById('cancelBtn');
    
    form.style.opacity = '0.5';
    form.style.pointerEvents = 'none';
    thankYouMessage.style.display = 'block';
    submitBtn.style.display = 'none';
    cancelBtn.textContent = 'Exit';
  }
}

function showError(input, message) {
  const errorDiv = input.nextElementSibling;
  if (!errorDiv || !errorDiv.classList.contains('error-message')) {
    const div = document.createElement('div');
    div.className = 'error-message';
    div.textContent = message;
    input.parentNode.insertBefore(div, input.nextSibling);
  }
}

function hideError(input) {
  const errorDiv = input.nextElementSibling;
  if (errorDiv && errorDiv.classList.contains('error-message')) {
    errorDiv.remove();
  }
}

function validateJobInquiry() {
  event.preventDefault();
  const emailInput = document.getElementById("emailInput");
  const phoneInput = document.getElementById("phoneInput");
  let isValid = true;

  if (!emailInput.value.trim()) {
    showError(emailInput, 'Please enter your email');
    isValid = false;
  } else {
    hideError(emailInput);
  }

  if (!phoneInput.value.trim()) {
    showError(phoneInput, 'Please enter your phone number');
    isValid = false;
  } else {
    hideError(phoneInput);
  }

  if (isValid) {
    emailInput.value = '';
    phoneInput.value = '';
    closeJobInquiries();
    window.location.href = 'index.html';
  }
}


function setMinimumDate() {
  const date = new Date();
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const minimumDate = `${year}-${month}-${day}`;
  console.log(minimumDate);
  const dateInput = document.getElementById("dateInput");
  dateInput.setAttribute("min", minimumDate);
}

function openJobInquiries() {
  const form = document.getElementById("jobInquiryForm");
  form.classList.add("visible");
}

function closeJobInquiries() {
  const form = document.getElementById("jobInquiryForm");
  const emailInput = document.getElementById("emailInput");
  const phoneInput = document.getElementById("phoneInput");
  emailInput.value = '';
  phoneInput.value = '';
  form.classList.remove("visible");
}