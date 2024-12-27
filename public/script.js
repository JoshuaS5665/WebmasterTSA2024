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
        homeImage.src = `${beginning}images/homeImage1.jpg`;
        x++;
      } else if (x == 1) {
        homeImage.src = `${beginning}images/homeImage2.jpg`;
        x++;
      } else {
        homeImage.src = `${beginning}images/homeImage3.jpg`;
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
  const contactForm = document.querySelector(".contact-form");
  let isValid = true;

  if (!firstNameInput.value.trim()) {
    showError(firstNameInput, "Please enter your first name");
    isValid = false;
  } else {
    hideError(firstNameInput);
  }

  if (!lastNameInput.value.trim()) {
    showError(lastNameInput, "Please enter your last name");
    isValid = false;
  } else {
    hideError(lastNameInput);
  }

  if (!emailInput.value.trim()) {
    showError(emailInput, "Please enter your email");
    isValid = false;
  } else {
    hideError(emailInput);
  }

  if (!phoneInput.value.trim()) {
    showError(phoneInput, "Please enter your phone number");
    isValid = false;
  } else {
    hideError(phoneInput);
  }

  if (isValid) {
    // Replace form with thank you message
    const thankYouContent = `
      <div style="text-align: center; padding: 40px; position: relative;">
        <h2 style="font-family: 'Bodoni Moda', serif; color: #32372b; margin-bottom: 20px;">Thank You!</h2>
        <p style="font-family: 'Bodoni Moda', serif; font-size: 18px; color: #32372b;">Your message has been received. We will contact you soon.</p>
        <a href="/" style="display: inline-block; margin-top: 20px; font-family: 'Bodoni Moda', serif;">Return to Home</a>
      </div>
    `;
    contactForm.innerHTML = thankYouContent;
  }
}



function showError(input, message) {
  const errorDiv = input.nextElementSibling;
  if (!errorDiv || !errorDiv.classList.contains("error-message")) {
    const div = document.createElement("div");
    div.className = "error-message";
    div.textContent = message;
    input.parentNode.insertBefore(div, input.nextSibling);
  }
}

function hideError(input) {
  const errorDiv = input.nextElementSibling;
  if (errorDiv && errorDiv.classList.contains("error-message")) {
    errorDiv.remove();
  }
}

function validateJobInquiry() {
  event.preventDefault();
  const emailInput = document.getElementById("emailInput");
  const phoneInput = document.getElementById("phoneInput");
  const formContainer = document.querySelector(".form-container");
  let isValid = true;

  if (!emailInput.value.trim()) {
    showError(emailInput, "Please enter your email");
    isValid = false;
  } else {
    hideError(emailInput);
  }

  if (!phoneInput.value.trim()) {
    showError(phoneInput, "Please enter your phone number");
    isValid = false;
  } else {
    hideError(phoneInput);
  }

  if (isValid) {
    formContainer.innerHTML = `
      <div style="text-align: center; padding: 40px; position: relative;">
        <span class="close-btn" onclick="closeJobInquiries()">&times;</span>
        <h2 style="font-family: 'Bodoni Moda', serif; color: #32372b; margin-bottom: 20px;">Thank You!</h2>
        <p style="font-family: 'Bodoni Moda', serif; font-size: 18px; color: #32372b;">Thank you for your interest! We will contact you soon.</p>
      </div>
    `;
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
  form.classList.remove("visible");
  const formContainer = form.querySelector(".form-container");
  formContainer.innerHTML = `
    <span class="close-btn" onclick="closeJobInquiries()">&times;</span>
    <h1 style="font-family: Bodoni Moda, serif; text-align: center">We're always hiring!</h1>
    <h2 style="font-family: Bodoni Moda, serif; text-align: center">Contact us for job opportunities!</h2>
    <label style="font-family: Bodoni Moda, serif" for="email-address">Email Address:<div class="asterisk">*</div></label>
    <input class="form-control" type="email" id="emailInput" placeholder="johndoe@example.com"/>
    <br/>
    <label style="font-family: Bodoni Moda, serif" for="phone-number">Phone Number:<div class="asterisk">*</div></label>
    <input class="form-control" type="tel" id="phoneInput" placeholder="(123)-456-7890"/>
    <br/>
    <p class="asterisk">* denotes required.</p><br/>
    <button type="submit" id="submit" onclick="validateJobInquiry()">Submit</button>
    <button type="button" class="btn cancel" onclick="closeJobInquiries()">Cancel</button>
  `;
}