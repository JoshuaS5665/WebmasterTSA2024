function loadHead(url) {
  const header = document.getElementById("header");
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      header.innerHTML = data;
      console.log(url + "Function is Running");
      markCurrentPage();
    });
}

function smoothPageTransition(e) {
  if (e.target.tagName === "A" && !e.target.hasAttribute("download")) {
    e.preventDefault();
    const content = document.querySelectorAll(
      "body > *:not(#header):not(#footer)",
    );

    content.forEach((el) => {
      el.classList.add("main-content");
      el.classList.add("fade-out");
    });

    setTimeout(() => {
      window.location.href = e.target.href;
    }, 800);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelectorAll(
    "body > *:not(#header):not(#footer)",
  );
  content.forEach((el) => {
    el.classList.add("main-content");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        el.style.opacity = "1";
      }),
    );
  });
});

document.addEventListener("click", smoothPageTransition);

function markCurrentPage() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".navbar a");

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");
    // Check if current path starts with the link path (for nested routes)
    if (
      (linkPath !== "/" && currentPath.startsWith(linkPath)) ||
      (linkPath === "/" && currentPath === "/")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function changeImages(beginning) {
  const homeImage = document.getElementById("homeImage");
  console.log(homeImage.src);

  let x = 0;

  setInterval(() => {
    homeImage.classList.add("fade-out");
    setTimeout(() => {
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
      setTimeout(() => {
        homeImage.classList.remove("fade-out");
      }, 50);
    }, 500);
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

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateContactInfo() {
  const firstNameInput = document.getElementById("firstNameInput");
  const lastNameInput = document.getElementById("lastNameInput");
  const emailInput = document.getElementById("emailInput");
  const phoneInput = document.getElementById("phoneInput");
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
  } else if (!validateEmail(emailInput.value.trim())) {
    showError(emailInput, "Please enter a valid email address");
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
    window.location.href = "/contact/contactResponse";
  }
  return isValid;
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

const TABLE_CAPACITIES = {
  1: 4,
  2: 2,
  3: 2,
  4: 2,
  5: 4,
  6: 4,
  7: 6,
  8: 4,
  9: 2,
  10: 2,
  11: 4,
  12: 4,
  13: 2,
  14: 2,
};

function updateTableButtons() {
  const peopleInParty = localStorage.getItem("peopleInParty");
  const numberMap = {
    onePerson: 1,
    twoPersons: 2,
    threePersons: 3,
    fourPersons: 4,
    fivePersons: 5,
    sixPersons: 6,
  };

  const numPeople = peopleInParty ? Number(peopleInParty) : 0;
  console.log(numPeople);
  Object.keys(TABLE_CAPACITIES).forEach((tableNum) => {
    /*const button = document.querySelector(`button[onclick="bookTable(${tableNum})"]`);*/
    console.log(tableNum);
    const button = document.getElementById(tableNum);
    if (button) {
      if (numPeople > TABLE_CAPACITIES[tableNum]) {
        button.disabled = true;
        button.style.opacity = "0.5";
        button.style.cursor = "not-allowed";
      } else {
        button.disabled = false;
        button.style.opacity = "1";
        button.style.cursor = "pointer";
      }
    }
  });
}

function hideError(input) {
  const errorDiv = input.nextElementSibling;
  if (errorDiv && errorDiv.classList.contains("error-message")) {
    errorDiv.remove();
  }
}

function validateJobInquiry() {
  event.preventDefault();
  const emailInput = document.getElementById("jobEmailInput");
  const phoneInput = document.getElementById("jobPhoneInput");
  const formContainer = document.querySelector(".form-container");
  let isValid = true;

  if (!emailInput.value.trim()) {
    showError(emailInput, "Please enter your email");
    isValid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    showError(emailInput, "Please enter a valid email address");
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

function validateReservation(event) {
  event.preventDefault();
  const numberPeople = document.getElementById("numberPeople");
  const dateInput = document.getElementById("dateInput");
  let isValid = true;

  if (!numberPeople.value) {
    showError(numberPeople, "Please select number of people");
    isValid = false;
  } else {
    hideError(numberPeople);
  }

  if (!dateInput.value) {
    showError(dateInput, "Please select a date");
    isValid = false;
  } else {
    hideError(dateInput);
  }

  if (isValid) {
    localStorage.setItem("peopleInParty", numberPeople.value);
    localStorage.setItem("selectedDate", dateInput.value);
    window.location.href = "/reservation/second";
  }
  return false;
}

function setMinimumDate() {
  const dateInput = document.getElementById("dateInput");
  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);
  if (!dateInput.hasListener) {
    dateInput.addEventListener("input", function () {
      localStorage.setItem("selectedDate", this.value);
    });
    dateInput.hasListener = true;
  }
}

function openJobInquiries() {
  const form = document.getElementById("jobInquiryForm");
  form.classList.add("visible");
}

function closeJobInquiries() {
  const form = document.getElementById("jobInquiryForm");
  const emailInput = document.getElementById("jobEmailInput");
  const phoneInput = document.getElementById("jobPhoneInput");
  const errorMessages = document.querySelectorAll(".error-message");

  if (emailInput) emailInput.value = "";
  if (phoneInput) phoneInput.value = "";
  errorMessages.forEach((msg) => msg.remove());
  form.classList.remove("visible");
  form.querySelector(".form-container").innerHTML =
    form.querySelector(".form-container").innerHTML;
}

function getPeopleInParty() {
  const peopleInParty = localStorage.getItem("peopleInParty");
  console.log(peopleInParty);
  return peopleInParty;
}

function bookTable(tableNumber) {
  window.location.href = "/reservation/final";
}

function initializeTimeSlots() {
  const select = document.getElementById("reservationTime");
  if (!select) return;

  const date = localStorage.getItem("selectedDate");
  if (!date) {
    console.error("No date selected");
    return;
  }

  select.innerHTML = '<option value="">Select time</option>';

  const selectedDay = new Date(date).getDay();
  const startTime = 15; // 3 PM
  let endTime;
  let kitchenCloseTime;

  // Closed on Mondays (day 1)
  if (selectedDay === 1) {
    select.innerHTML = '<option value="">Closed on Mondays</option>';
    return;
  }

  // Set times based on day of week
  // Friday-Sunday (5,6,0): 3PM-11PM, kitchen closes at 10:30PM
  // Tuesday-Thursday (2,3,4): 3PM-10PM, kitchen closes at 9:30PM
  if (selectedDay >= 5 || selectedDay === 0) {
    endTime = 23; // 11 PM
    kitchenCloseTime = 22.5; // 10:30 PM
  } else {
    endTime = 22; // 10 PM
    kitchenCloseTime = 21.5; // 9:30 PM
  }

  // Generate time slots in 30-minute increments
  for (let time = startTime; time < endTime; time += 0.5) {
    // Skip times after kitchen closes
    if (time >= kitchenCloseTime) continue;

    const hour = Math.floor(time);
    const minute = (time % 1) * 60;
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour;
    const timeStr = `${displayHour}:${minute.toString().padStart(2, "0")} ${period}`;
    const option = document.createElement("option");
    option.value = timeStr;
    option.textContent = timeStr;
    select.appendChild(option);
  }
}

function validateTimeSelection(event) {
  if (event) {
    event.preventDefault();
  }
  const timeSelect = document.getElementById("reservationTime");
  let isValid = true;

  if (!timeSelect.value) {
    showError(timeSelect, "Please select a reservation time");
    isValid = false;
  } else {
    hideError(timeSelect);
    localStorage.setItem("selectedTime", timeSelect.value);
    window.location.href = "reservationConfirmation.html";
  }
  return false;
}