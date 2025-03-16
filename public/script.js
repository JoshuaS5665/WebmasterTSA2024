function loadHead(url) {
  const header = document.getElementById("header");
  fetch(url, { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load header");
      return response.text();
    })
    .then((data) => {
      header.innerHTML = data;
      console.log("Header loaded successfully");
      markCurrentPage();
    })
    .catch((err) => console.error("Error loading header:", err));
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
    //validateInquiry();
    formContainer.innerHTML = `<div style="text-align: center; padding: 40px; position: relative;">
        <span class="close-btn" onclick="closeJobInquiries()">&times;</span>
        <h2 style="font-family: 'Bodoni Moda', serif; color: #32372b; margin-bottom: 20px;">Thank You!</h2>
        <p style="font-family: 'Bodoni Moda', serif; font-size: 18px; color: #32372b;">Thank you for your interest! We will contact you soon.</p>
      </div>`;
  }
}

function validateReservation() {
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
    window.location.href = "reservation2.html";
    return false;
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
  localStorage.setItem("selectedTable", tableNumber);
  window.location.href = "/reservation/bookTable.html";
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

function addToCart(itemName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({name: itemName, price: price});
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show on-screen notification
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.backgroundColor = '#32372b';
    notification.style.color = 'white';
    notification.style.padding = '15px 30px';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '1000';
    notification.style.fontFamily = 'Bodoni Moda, serif';
    notification.textContent = 'Added ' + itemName + ' to cart!';
    
    document.body.appendChild(notification);
    
    // Remove notification after 2 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 2000);

    // Update cart display
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartDisplay = document.getElementById('current-cart');
    if (!cartDisplay) return;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        cartDisplay.innerHTML = '<p style="text-align: center;">No items in cart</p>';
        return;
    }
    
    let html = '<ul style="list-style: none; padding: 0;">';
    cart.forEach((item, index) => {
        html += `
            <li style="display: flex; justify-content: space-between; align-items: center; margin: 10px 0; padding: 8px; border-bottom: 1px solid #eee;">
                <span>${item.name} - $${item.price}</span>
                <button onclick="removeFromCart(${index})" 
                    style="background: #32372b; 
                    color: white; 
                    border: none; 
                    padding: 5px 10px; 
                    border-radius: 4px; 
                    cursor: pointer; 
                    font-family: 'Bodoni Moda', serif;">Remove</button>
            </li>`;
    });
    html += '</ul>';
    cartDisplay.innerHTML = html;
}

// Add this line to update cart on page load
document.addEventListener('DOMContentLoaded', updateCartDisplay);

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
    window.location.href = "/reservation/confirmation";
  }
  return false;
}

function bookTable(tableNumber) {
  localStorage.setItem("selectedTable", tableNumber);
  window.location.href = "/reservation/bookTable.html";
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartDiv = document.getElementById('cart-items');
    let subtotal = 0;

    if (!cartDiv) return;
    cartDiv.innerHTML = '';

    cartItems.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartDiv.appendChild(itemDiv);
        subtotal += item.price;
    });

    updateTotals(subtotal);
}

function updateTotals(subtotal) {
    const subtotalElem = document.getElementById('subtotal');
    const taxElem = document.getElementById('tax');
    const tipElem = document.getElementById('tipAmount');
    const finalTotalElem = document.getElementById('finalTotal');
    
    if (!subtotalElem) return;
    
    const tax = subtotal * 0.07;
    const currentTip = parseFloat(tipElem.textContent) || 0;
    const final = subtotal + tax + currentTip;
    
    subtotalElem.textContent = subtotal.toFixed(2);
    taxElem.textContent = tax.toFixed(2);
    finalTotalElem.textContent = final.toFixed(2);
    
    localStorage.setItem('finalTotal', final.toFixed(2));
}

function selectTip(percentage) {
    const buttons = document.querySelectorAll('.tip-btn');
    const customTipDiv = document.querySelector('.custom-tip');
    const subtotal = parseFloat(document.getElementById('subtotal').textContent);
    
    buttons.forEach(btn => btn.classList.remove('selected'));
    
    if (percentage === 'custom') {
        customTipDiv.style.display = 'block';
        buttons[6].classList.add('selected');
        const customInput = document.getElementById('customTipInput');
        if (customInput.value) {
            updateCustomTip();
        }
    } else {
        customTipDiv.style.display = 'none';
        // Find button index based on order in HTML
        const percentageMap = {0: 0, 5: 1, 10: 2, 20: 3, 25: 4, 30: 5};
        buttons[percentageMap[percentage]].classList.add('selected');
        const tipAmount = (subtotal * (percentage/100));
        document.getElementById('tipAmount').textContent = tipAmount.toFixed(2);
        updateTotals(subtotal);
    }
}

function removeCartItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const removedItem = cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    const subtotal = parseFloat(document.getElementById('subtotal').textContent);
    const newSubtotal = subtotal - removedItem[0].price;
    
    updateCartDisplay();
    updateTotals(newSubtotal);
    loadCart();
}

function updateCustomTip() {
    const customTip = parseFloat(document.getElementById('customTipInput').value) || 0;
    document.getElementById('tipAmount').textContent = customTip.toFixed(2);
    const subtotal = parseFloat(document.getElementById('subtotal').textContent);
    updateTotals(subtotal);
}

// Credit card input formatting
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phoneInput');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = `(${value}`;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0,3)}) ${value.slice(3)}`;
                } else {
                    value = `(${value.slice(0,3)}) ${value.slice(3,6)}-${value.slice(6,10)}`;
                }
            }
            e.target.value = value;
        });
    }
    
    const creditCardInput = document.getElementById('creditCardInput');
    if (creditCardInput) {
        creditCardInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            let formattedValue = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            e.target.value = formattedValue;
        });
    }

    // Expiration date formatting
    const expDateInput = document.getElementById('expdateInput');
    if (expDateInput) {
        expDateInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0,2) + '/' + value.slice(2);
            }
            e.target.value = value;
        });
    }
});


function validatePayment(event) {
  event.preventDefault();
  const firstNameInput = document.getElementById("firstNameInput");
  const lastNameInput = document.getElementById("lastNameInput");
  const creditCardInput = document.getElementById("creditCardInput");
  const expdateInput = document.getElementById("expdateInput");
  const securityCodeInput = document.getElementById("securityCodeInput");
  let isValid = true;

  // Remove existing error messages
  const existingErrors = document.querySelectorAll('.error-message');
  existingErrors.forEach(error => error.remove());

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

  if (!phoneInput.value.trim()) {
    showError(phoneInput, "Please enter your phone number");
    isValid = false;
  } else {
    hideError(phoneInput);
  }

  if (!creditCardInput.value.trim()) {
    showError(creditCardInput, "Please enter your card number");
    isValid = false;
  } else {
    hideError(creditCardInput);
  }

  if (!expdateInput.value.trim()) {
    showError(expdateInput, "Please enter expiration date");
    isValid = false;
  } else {
    hideError(expdateInput);
  }

  if (!securityCodeInput.value.trim()) {
    showError(securityCodeInput, "Please enter security code");
    isValid = false;
  } else {
    hideError(securityCodeInput);
  }

  if (isValid) {
    localStorage.removeItem('cart');
    window.location.href = 'orderconfirmation.html';
  }
  return false;
}

function addToQuantity(dishName, event){
  event.preventDefault(); 
  let id = dishName + "-input"; 
  let input = document.getElementById(id); 
  let value = parseInt(input.value); 
  value++;
  input.value = value; 
}
 /* console.log("Function is running"); 
  let value = parseInt(document.getElementById("input").value); 
  value++; 
  document.getElementById("input").value = value; */

function subtractToQuantity(dishName, event){
  event.preventDefault(); 
  let id = dishName + "-input"; 
  let input = document.getElementById(id); 
  let value = parseInt(input.value); 
  if(value > 0){
      value --;
  }
  input.value = value; 
}



/*document.getElementById("submitInquiry").addEventListener("click", ()=>{
});*/

//console.log(document.getElementById("submitInquiry"));

function validateInquiry() {
  console.log("Inquiry function is running...");
  event.preventDefault();
  const data = {
    email: document.getElementById("jobEmailInput").value,
    phone: document.getElementById("jobPhoneInput").value,
  };
  console.log(data);
  fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Network response was not okay. Please try again later.",
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success: " + data);
    })
    .catch((err) => {
      console.log("ERROR: " + err);
    });
}

function openthreebarmenu() {
  const menu = document.getElementById("threebarmenu");
  menu.classList.add("visible");
  document.body.classList.add("menu-open");
}

function closethreebarmenu() {
  const menu = document.getElementById("threebarmenu");
  menu.classList.remove("visible");
  document.body.classList.remove("menu-open");
}

window.addEventListener("resize", () => {
  const menu = document.getElementById("threebarmenu");
  const isMenuOpen = document.body.classList.contains("menu-open");

  if (!isMenuOpen) return;

  if (window.innerWidth <= 850) {
    menu.style.transform = "translateY(0)";
    menu.style.width = "100%";
  } else {
    menu.style.transform = "translateX(0)";
    menu.style.width = "50%";
  }
});