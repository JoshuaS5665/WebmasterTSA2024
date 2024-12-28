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
    document.forms[0].submit();
    return false;
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
  14: 2
};

function updateTableButtons() {
  const peopleInParty = getPeopleInParty();
  const numberMap = {
    'onePerson': 1, 'twoPersons': 2, 'threePersons': 3, 'fourPersons': 4,
    'fivePersons': 5, 'sixPersons': 6, 'sevenPersons': 7, 'eightPersons': 8,
    'ninePersons': 9, 'tenPersons': 10, 'elevenPersons': 11, 'twelvePersons': 12,
    'thirteenPersons': 13, 'fourteenPersons': 14, 'fifteenPersons': 15
  };
  
  const numPeople = peopleInParty ? numberMap[peopleInParty] || 0 : 0;
  
  Object.keys(TABLE_CAPACITIES).forEach(tableNum => {
    const button = document.querySelector(`button[onclick="bookTable(${tableNum})"]`);
    if (button) {
      if (numPeople > TABLE_CAPACITIES[tableNum]) {
        button.disabled = true;
        button.style.opacity = '0.5';
        button.style.cursor = 'not-allowed';
      } else {
        button.disabled = false;
        button.style.opacity = '1';
        button.style.cursor = 'pointer';
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

function setMinimumDate() {
  const dateInput = document.getElementById("dateInput");
  if (!dateInput.hasListener) {
    dateInput.addEventListener('input', function() {
      // Removed date validation here, it's now handled in validateContactInfo
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
  if (emailInput) emailInput.value = "";
  if (phoneInput) phoneInput.value = "";
  form.classList.remove("visible");
}

function getPeopleInParty() {
  const peopleInParty = localStorage.getItem('peopleInParty');
  console.log(peopleInParty);
  return peopleInParty;
}

function bookTable(tableNumber) {
  window.location.href = "bookTable.html";
}

function initializeTimeSlots() {
  const select = document.getElementById('reservationTime');
  if (!select) return;
  
  const date = localStorage.getItem('selectedDate');
  if (!date) {
    console.error('No date selected');
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
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    const timeStr = `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
    const option = document.createElement('option');
    option.value = timeStr;
    option.textContent = timeStr;
    select.appendChild(option);
  }
}

function validateTimeSelection(event) {
  event.preventDefault();
  const timeSelect = document.getElementById('reservationTime');
  let isValid = true;

  if (!timeSelect.value) {
    showError(timeSelect, 'Please select a reservation time');
    isValid = false;
  } else {
    hideError(timeSelect);
  }

  if (isValid) {
    localStorage.setItem('selectedTime', timeSelect.value);
    window.location.href = "reservation3.html";
  }
  return false;
}