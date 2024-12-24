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
    }, 1000);
  }, 4000);
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
  event.preventDefault();
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
    window.location.href = 'contactResponse.html';
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
  document.getElementById("jobInquiryForm").style.display = "block";
}

function closeJobInquiries() {
  document.getElementById("jobInquiryForm").style.display = "none";
}