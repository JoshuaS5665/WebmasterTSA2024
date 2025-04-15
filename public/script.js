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
  // Don't trigger for slideshow navigation arrows
  if (e.target.classList.contains('slideshow-nav') || 
      e.target.closest('.slideshow-nav')) {
    return;
  }

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
  const slideshowImages = [
    `${beginning}images/homeImage1.jpg`,
    `${beginning}images/homeImage2.jpg`,
    `${beginning}images/homeImage3.jpg`
  ];

  let currentImageIndex = 0;
  let slideshowInterval;

  // Reset any slideshow container styles that might be causing issues
  const slideshowContainer = document.querySelector(".slideshow-container");
  if (slideshowContainer) {
    slideshowContainer.style.borderBottom = "none";
  }

  // Create indicator lines dynamically
  const dotsContainer = document.getElementById("slideshow-dots");
  if (dotsContainer) {
    // Clear any existing content in dots container
    dotsContainer.innerHTML = '';
    
    // Adjust the container style for line indicators
    dotsContainer.style.display = 'flex';
    dotsContainer.style.gap = '15px';
    dotsContainer.style.border = 'none';
    dotsContainer.style.outline = 'none';
    dotsContainer.style.boxShadow = 'none';
    
    // Create new line indicators
    for (let i = 0; i < slideshowImages.length; i++) {
      const dot = document.createElement('span');
      dot.className = i === 0 ? 'slideshow-dot active' : 'slideshow-dot';
      dot.setAttribute('data-index', i);
      dot.style.border = 'none';
      dot.style.boxShadow = 'none';
      dot.style.outline = 'none';
      dot.style.overflow = 'hidden';
      dotsContainer.appendChild(dot);
    }
  }

  // Initialize slideshow navigation buttons
  const prevButton = document.getElementById("slideshow-prev");
  const nextButton = document.getElementById("slideshow-next");
  const dots = document.querySelectorAll(".slideshow-dot");

  // Remove all inline styles and let CSS handle the styling
  dots.forEach(dot => {
    // Remove any inline styles that might be causing the black line
    dot.removeAttribute('style');
  });

  // Function to change image with slide transition
  function changeImage(newIndex) {
    // Calculate correct direction for wrapping around
    let direction;
    if (newIndex > currentImageIndex) {
      direction = 1; // Moving forward
    } else if (newIndex < currentImageIndex) {
      // Check if we're going from first to last (wrapping backward)
      if (currentImageIndex === 0 && newIndex === slideshowImages.length - 1) {
        direction = 1; // Special case: Make it slide forward
      } else if (currentImageIndex === slideshowImages.length - 1 && newIndex === 0) {
        direction = 1; // Special case: Make it slide forward when going from last to first
      } else {
        direction = -1; // Moving backward
      }
    } else {
      direction = 0; // No change needed
    }
    
    // Create a container for two images to handle the transition
    const container = homeImage.parentElement;
    if (!container.querySelector('.next-slide-image')) {
      // Create a new image element for the next slide
      const nextImage = document.createElement('img');
      nextImage.className = 'next-slide-image';
      nextImage.style.position = 'absolute';
      nextImage.style.top = '0';
      nextImage.style.left = '0';
      nextImage.style.width = '100%';
      nextImage.style.height = '100%';
      nextImage.style.objectFit = 'cover';
      nextImage.style.transform = `translateX(${direction * 100}%)`;
      nextImage.style.zIndex = '1';
      nextImage.style.border = 'none';
      container.appendChild(nextImage);
    }
    
    // Get the next image element
    const nextImage = container.querySelector('.next-slide-image');
    
    // Preload the next image
    nextImage.src = slideshowImages[newIndex];
    nextImage.style.transform = `translateX(${direction * 100}%)`;
    
    // Update dot navigation
    dots.forEach((dot, index) => {
      if (index === newIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
    
    // Wait a moment to ensure the next image is loaded
    setTimeout(() => {
      // Slide current image out
      homeImage.style.transition = "transform 0.5s ease-in-out";
      homeImage.style.transform = `translateX(${-direction * 100}%)`;
      
      // Slide next image in
      nextImage.style.transition = "transform 0.5s ease-in-out";
      nextImage.style.transform = "translateX(0)";
      
      // After animation completes, make the next image the current one
      setTimeout(() => {
        homeImage.src = slideshowImages[newIndex];
        homeImage.style.transition = "none";
        homeImage.style.transform = "translateX(0)";
        
        nextImage.style.transition = "none";
        nextImage.style.transform = `translateX(${direction * 100}%)`;
        
        currentImageIndex = newIndex;
      }, 500);
    }, 50);
  }

  // Set up automatic slideshow
  function startSlideshow() {
    slideshowInterval = setInterval(() => {
      let newIndex = (currentImageIndex + 1) % slideshowImages.length;
      changeImage(newIndex);
    }, 5000);
  }

  // Add click handlers for navigation buttons
  if (prevButton) {
    prevButton.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation(); // Stop event from bubbling up
      // Clear the interval and restart it
      clearInterval(slideshowInterval);

      let newIndex = currentImageIndex - 1;
      if (newIndex < 0) newIndex = slideshowImages.length - 1;

      changeImage(newIndex);
      startSlideshow();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation(); // Stop event from bubbling up
      // Clear the interval and restart it
      clearInterval(slideshowInterval);

      let newIndex = (currentImageIndex + 1) % slideshowImages.length;

      changeImage(newIndex);
      startSlideshow();
    });
  }

  // Add click handlers for dots
  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Clear the interval and restart it
      clearInterval(slideshowInterval);

      const index = parseInt(dot.getAttribute("data-index"));
      if (index !== currentImageIndex) {
        changeImage(index);
      }

      startSlideshow();
    });
  });

  // Start the slideshow
  startSlideshow();
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
    div.style.animation = "fadeIn 0.3s ease-in";

    // Add professional validation messages
    if (message.includes("required") || message.includes("enter")) {
      div.textContent = "This field is required.";
    } else if (message.includes("valid email")) {
      div.textContent = "Please enter a valid email address.";
    } else if (message.includes("phone")) {
      div.textContent = "Please enter a valid phone number.";
    } else if (message.includes("credit card") || message.includes("card number")) {
      div.textContent = "Please provide a valid credit card number.";
    } else if (message.includes("time")) {
      div.textContent = "Please select a reservation time.";
    } else if (message.includes("date")) {
      div.textContent = "Please select a reservation date.";
    } else if (message.includes("agree") || message.includes("terms")) {
      div.textContent = "You must agree to the terms to continue.";
    }

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
  if (!dateInput) return;

  // Clear any existing options except the default one
  while (dateInput.options.length > 1) {
    dateInput.remove(1);
  }

  // Generate dates for the next 30 days
  const today = new Date();

  for (let i = 0; i < 30; i++) {
    // Create a new date object for each day to avoid reference issues
    const date = new Date(today);
    date.setDate(today.getDate() + 14 + i);

    // Skip Mondays since restaurant is closed
    if (date.getDay() === 1) continue;

    const formattedDate = date.toISOString().split('T')[0];
    const displayDate = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short', 
      day: 'numeric'
    });

    const option = document.createElement('option');
    option.value = formattedDate;
    option.textContent = displayDate;
    dateInput.appendChild(option);
  }

  if (!dateInput.hasListener) {
    dateInput.addEventListener("change", function () {
      localStorage.setItem("selectedDate", this.value);
    });
    dateInput.hasListener = true;
  }

  // Fix: Log to console for debugging
  console.log("Date dropdown populated with", dateInput.options.length - 1, "dates");
}

// Call the function when the DOM is fully loaded to ensure it runs properly
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById("dateInput")) {
    setMinimumDate();
  }
});

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

/*function addToCart(itemName, price) {
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
}*/

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

function validatePrivateReservation() {
  event.preventDefault();
  const partySize = document.getElementById("partySize");
  const dateInput = document.getElementById("dateInput");
  const occasionType = document.getElementById("occasionType");
  const specialRequests = document.getElementById("specialRequests");
  let isValid = true;

  if (!partySize.value) {
    showError(partySize, "Please select the number of guests.");
    isValid = false;
  } else {
    hideError(partySize);
  }

  if (!dateInput.value) {
    showError(dateInput, "Please select a reservation date.");
    isValid = false;
  } else {
    hideError(dateInput);
  }

  if (isValid) {
    localStorage.setItem("privatePartySize", partySize.value);
    localStorage.setItem("privateSelectedDate", dateInput.value);
    localStorage.setItem("privateOccasion", occasionType.value);
    localStorage.setItem("privateSpecialRequests", specialRequests.value);
    window.location.href = "/reservations/times";
  }
  return false;
}

function initializePrivateTimeSlots() {
  const select = document.getElementById("privateReservationTime");
  const reservationDateDisplay = document.getElementById("reservationDate");
  const partyDetailsDisplay = document.getElementById("partyDetails");
  const occasionDisplay = document.getElementById("occasionDisplay");

  if (!select) return;

  const date = localStorage.getItem("privateSelectedDate");
  const partySize = localStorage.getItem("privatePartySize");
  const occasion = localStorage.getItem("privateOccasion");

  // Display reservation details
  if (reservationDateDisplay) {
    // Fix the date offset issue by creating date object correctly
    const dateObj = new Date(date);
    // Add timezone offset to fix date display
    dateObj.setMinutes(dateObj.getMinutes() + dateObj.getTimezoneOffset());

    const formattedDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
    reservationDateDisplay.textContent = `Date: ${formattedDate}`;
  }

  if (partyDetailsDisplay) {
    partyDetailsDisplay.textContent = `Party Size: ${partySize}`;
  }

  if (occasionDisplay && occasion) {
    occasionDisplay.textContent = `Occasion: ${occasion}`;
  }

  if (!date) {
    console.error("No date selected");
    return;
  }

  select.innerHTML = '<option value="">Select time</option>';

  const selectedDay = new Date(date).getDay();

  // Closed on Mondays (day 1)
  //if (selectedDay === 1) {
    //select.innerHTML = '<option value="">Closed on Mondays</option>';
    //return;
  //}

  // Check existing reservations for this date
  checkExistingReservations(date).then(reservedTimes => {
    // Available times based on restaurant hours in half-hour increments
    // Tuesday-Thursday: 3PM-10PM (last reservation at 8PM)
    // Friday-Sunday: 3PM-11PM (last reservation at 9PM)
    let startHour = 15; // 3 PM
    let endHour; 

    if (selectedDay >= 5 || selectedDay === 0) {
      // Friday-Sunday: 3PM-11PM
      endHour = 21; // 9 PM is last reservation (ends at 11 PM)
    } else {
      // Tuesday-Thursday: 3PM-10PM
      endHour = 20; // 8 PM is last reservation (ends at 10 PM)
    }

    // Generate time slots in half-hour increments
    for (let hour = startHour; hour <= endHour; hour += 0.5) {
      const intHour = Math.floor(hour);
      const minutes = hour % 1 === 0 ? "00" : "30";
      const period = intHour >= 12 ? "PM" : "AM";
      const displayHour = intHour > 12 ? intHour - 12 : intHour;
      const timeStr = `${displayHour}:${minutes} ${period}`;

      // Check if this time slot is already reserved
      const isReserved = reservedTimes.some(reservedTime => {
        // Convert time strings to comparable values
        const reservedHour = convertTimeStringToHours(reservedTime);
        const currentHour = hour;

        // A reservation blocks 2 hours in both directions
        // Check if current time would overlap with existing reservation
        // Either: current time is within 2 hours after reserved time
        // Or: current time is within 2 hours before reserved time (meaning the current reservation would overlap)
        return (currentHour >= reservedHour && currentHour < reservedHour + 2) || 
               (currentHour + 2 > reservedHour && currentHour < reservedHour);
      });

      if (!isReserved) {
        const option = document.createElement("option");
        option.value = timeStr;
        option.textContent = timeStr;
        select.appendChild(option);
      }
    }

    if (select.options.length <= 1) {
      // Only the default "Select time" option exists
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "No available times for this date";
      option.disabled = true;
      select.appendChild(option);

      // Show no availability message
      const noAvailabilityMessage = document.getElementById("noAvailabilityMessage");
      if (noAvailabilityMessage) {
        noAvailabilityMessage.style.display = "block";
      }
    } else {
      // Hide no availability message if there are available times
      const noAvailabilityMessage = document.getElementById("noAvailabilityMessage");
      if (noAvailabilityMessage) {
        noAvailabilityMessage.style.display = "none";
      }
    }
  });
}

// Helper function to convert time string (like "3:00 PM") to hours (like 15)
function convertTimeStringToHours(timeStr) {
  const [timePart, period] = timeStr.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);

  if (period === "PM" && hours < 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  return hours + minutes/60;
}

// Function to check existing reservations from local storage
function checkExistingReservations(date) {
  return new Promise(resolve => {
    // Get reservations from localStorage
    const reservations = JSON.parse(localStorage.getItem("privateRoomReservations")) || {};
    const dateReservations = reservations[date] || [];
    resolve(dateReservations);
  });
}

function validatePrivateTimeSelection(event) {
  if (event) {
    event.preventDefault();
  }
  const timeSelect = document.getElementById("privateReservationTime");
  const durationHidden = document.getElementById("durationHours");
  let isValid = true;

  if (!timeSelect.value) {
    showError(timeSelect, "Please select a reservation time");
    isValid = false;
  } else {
    hideError(timeSelect);
  }

  if (isValid) {
    localStorage.setItem("privateSelectedTime", timeSelect.value);
    localStorage.setItem("privateDuration", durationHidden.value);
    window.location.href = "/reservations/confirmation";
  }
  return false;
}

function loadPrivateReservationDetails() {
  const summaryDiv = document.getElementById("reservationSummary");
  if (!summaryDiv) return;

  // Add a subtle animation to the summary
  summaryDiv.style.opacity = "0";
  summaryDiv.style.transform = "translateY(10px)";

  const date = localStorage.getItem("privateSelectedDate");
  const time = localStorage.getItem("privateSelectedTime");
  const partySize = localStorage.getItem("privatePartySize");
  const occasion = localStorage.getItem("privateOccasion");
  const requests = localStorage.getItem("privateSpecialRequests");

  if (!date || !time || !partySize) {
    summaryDiv.innerHTML = "<p>Reservation details not found. Please start over.</p>";
    return;
  }

  // Animate the summary with a small delay
  setTimeout(() => {
    summaryDiv.style.transition = "all 0.5s ease";
    summaryDiv.style.opacity = "1";
    summaryDiv.style.transform = "translateY(0)";
  }, 200);

  // Fix the date offset issue
  const dateObj = new Date(date);
  // Add timezone offset to fix date display
  dateObj.setMinutes(dateObj.getMinutes() + dateObj.getTimezoneOffset());

  const formattedDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });

  // Calculate end time (2 hours after start time)
  let endTime = "";
  if (time) {
    const timeParts = time.match(/(\d+):(\d+) ([AP]M)/);
    if (timeParts) {
      let hour = parseInt(timeParts[1]);
      const minute = parseInt(timeParts[2]);
      const period = timeParts[3];

      hour = (hour % 12) + (period === "PM" ? 12 : 0);
      hour = (hour + 2) % 24;
      const newPeriod = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;

      endTime = `${displayHour}:${minute.toString().padStart(2, "0")} ${newPeriod}`;
    }
  }

  let html = `
    <p><strong>Date:</strong> ${formattedDate}</p>
    <p><strong>Time:</strong> ${time} - ${endTime}</p>
    <p><strong>Duration:</strong> 2 hours</p>
    <p><strong>Party Size:</strong> ${partySize}</p>
  `;

  if (occasion) {
    html += `<p><strong>Occasion:</strong> ${occasion}</p>`;
  }

  if (requests) {
    html += `<p><strong>Special Requests:</strong> ${requests}</p>`;
  }

  summaryDiv.innerHTML = html;
}

function finalizePrivateReservation(event) {
  event.preventDefault();

  // Get form data
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const termsAgreement = document.getElementById("termsAgreement").checked;

  // Basic validation
  let isValid = true;

  if (!firstName.trim()) {
    showError(document.getElementById("firstName"), "Please enter your first name.");
    isValid = false;
  } else {
    hideError(document.getElementById("firstName"));
  }

  if (!lastName.trim()) {
    showError(document.getElementById("lastName"), "Please enter your last name.");
    isValid =false;
  } else {
    hideError(document.getElementById("lastName"));
  }

  if (!email.trim()) {
    showError(document.getElementById("email"), "Please enter your email address.");
    isValid = false;
  } else if (!validateEmail(email.trim())) {
    showError(document.getElementById("email"), "Please enter a valid email address.");
    isValid = false;
  } else {
    hideError(document.getElementById("email"));
  }

  if (!phone.trim()) {
    showError(document.getElementById("phone"), "Please enter your phone number.");
    isValid = false;
  } else {
    hideError(document.getElementById("phone"));
  }

  if (!termsAgreement) {
    showError(document.getElementById("termsAgreement").parentNode, "You must agree to the terms to continue.");
    isValid = false;
  } else {
    hideError(document.getElementById("termsAgreement").parentNode);
  }

  if (isValid) {
    // Save contact information
    localStorage.setItem("privateReservationName", `${firstName} ${lastName}`);
    localStorage.setItem("privateReservationEmail", email);
    localStorage.setItem("privateReservationPhone", phone);

    // Get reservation details for confirmation display
    const date = localStorage.getItem("privateSelectedDate");
    const time = localStorage.getItem("privateSelectedTime");
    const partySize = localStorage.getItem("privatePartySize");

    // Store the reservation
    storeReservation(date, time);

    // Fix the date offset issue
    const dateObj = new Date(date);
    // Add timezone offset to fix date display
    dateObj.setMinutes(dateObj.getMinutes() + dateObj.getTimezoneOffset());

    const formattedDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });

    // Generate confirmation number
    const confirmationNumber = `PVR-${Math.floor(100000 + Math.random() * 900000)}`;

    // Create and show confirmation message
    const formContainer = document.querySelector(".reservationForm3");
    formContainer.innerHTML = `
      <div style="text-align: center; padding: 40px;">
        <h2 style="color: #32372b; margin-bottom: 20px;">Private Dining Reservation Confirmed!</h2>

        <div style="background-color: rgba(50, 55, 43, 0.1); padding: 20px; border-radius: 8px; margin: 20px 0; text-align: left; font-family: 'Bodoni Moda', serif;">
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Party Size:</strong> ${partySize}</p>
          <p><strong>Reference #:</strong> ${confirmationNumber}</p>
        </div>

        <p style="font-family: 'Bodoni Moda', serif; font-size: 18px; margin: 20px 0;">
          A confirmation has been sent to <strong>${email}</strong>.
        </p>

        <p style="font-family: 'Bodoni Moda', serif; font-size: 16px; margin: 20px 0; color: #32372b;">
          For any questions about your reservation, please contact us.
        </p>

        <button onclick="window.location.href='/'" style="padding: 12px 30px; margin-top: 20px;">Return to Home</button>
      </div>
    `;

    // Store reservation data in a more structured way
    const reservationData = {
      name: `${firstName} ${lastName}`,
      email: email,
      phone: phone,
      date: date,
      time: time,
      partySize: partySize,
      occasion: localStorage.getItem("privateOccasion") || "Not specified",
      specialRequests: localStorage.getItem("privateSpecialRequests") || "",
      confirmationNumber: confirmationNumber,
      timestamp: new Date().toISOString()
    };

    // Store reservation history
    let reservationHistory = JSON.parse(localStorage.getItem("reservationHistory")) || [];
    reservationHistory.push(reservationData);
    localStorage.setItem("reservationHistory", JSON.stringify(reservationHistory));

    // Clean up localStorage for form data
    setTimeout(() => {
      localStorage.removeItem("privateSelectedDate");
      localStorage.removeItem("privateSelectedTime");
      localStorage.removeItem("privatePartySize");
      localStorage.removeItem("privateOccasion");
      localStorage.removeItem("privateSpecialRequests");
      localStorage.removeItem("privateDuration");
    }, 3000);
  }

  return false;
}

// Function to store a reservation time slot
function storeReservation(date, time) {
  // Get existing reservations
  let reservations = JSON.parse(localStorage.getItem("privateRoomReservations")) || {};

  // If this date doesn't exist in reservations, create an array for it
  if (!reservations[date]) {
    reservations[date] = [];
  }

  // Add the reservation time
  reservations[date].push(time);

  // Save back to localStorage
  localStorage.setItem("privateRoomReservations", JSON.stringify(reservations));

  // Console log for debugging
  console.log("Reservation stored:", { date, time });
  console.log("All reservations:", reservations);
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
    //const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartDiv = document.getElementById('cart-items');
    const menuItems = document.getElementById("menuItems"); 

    let menuItemsArray = menuItems.value.split(",");
    const quantities = document.getElementById("quantities");
    const quantitiesArray = quantities.value.split(","); 
    //let subtotal = 0;

    //if (!cartDiv) return;
    //cartDiv.innerHTML = '';

    for(let i = 0; i<menuItemsArray.length; i++){
      let myQuantity = parseInt(quantitiesArray[i]); 
      console.log(`My menu item is ${menuItemsArray[i]}
         and my quantity is ${parseInt(quantitiesArray[i])}`); 
      if(myQuantity != 0){
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div class="cart-item-details" id="details[${i}]">
                <h3>${menuItemsArray[i]}</h3>
                <p id="quantityOutput[${i}]">${myQuantity} Items</p>
                <button class="remove-btn" onclick="changeItem(${i}, '+')">Add</button>
                <button id="remove-btn[${i}]" class="remove-btn" onclick="changeItem(${i}, '-')">Remove</button>
            </div>
        `;
        cartDiv.appendChild(itemDiv);
      }

    }

    /*cartItems.forEach((item, index) => {
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

    updateTotals(subtotal);*/
}


function updateTotals(subtotal) {
   //const subtotalElem = document.getElementById('subtotal');
    //const taxElem = document.getElementById('tax');

    //const mySubtotal = document.getElementById("myTotal").value; 
    if(isNaN(subtotal) || subtotal === undefined){
      console.log("Subtotal is not defined"); 
    }
    const tipElem = document.getElementById('tipAmount');
    const finalTotalElem = document.getElementById('finalTotal');
    
   // if (!subtotalElem) return;
    
    const tax = (subtotal * 0.07).toFixed(2);
    const currentTip = parseFloat(tipElem.textContent) || 0;
    const final = parseFloat(subtotal) + parseFloat(tax) + parseFloat(currentTip);
    console.log("My subtotal is " + subtotal); 
    console.log("My tax is " + tax);
    console.log(final); 
    
    //subtotalElem.textContent = subtotal.toFixed(2);
    //taxElem.textContent = tax.toFixed(2);
    finalTotalElem.textContent = final.toFixed(2);
    
    //localStorage.setItem('finalTotal', final.toFixed(2));
}

function selectTip(percentage) {
  const buttons = document.querySelectorAll('.tip-btn');
  const customTipDiv = document.querySelector('.custom-tip');
  const mySubtotal = document.getElementById("myTotal").value; 
  //const subtotal = parseFloat(document.getElementById('subtotal').textContent);
  
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
      const tipAmount = (mySubtotal * (percentage/100));
      document.getElementById('tipAmount').textContent = tipAmount.toFixed(2);
      updateTotals(mySubtotal);
  }
}


function changeItem(index, indicator) {
  //const cartDiv = document.getElementById('cart-items');
  //const removedItem = document.getElementById(`details[${index}]`);
  let quantityOutput = document.getElementById(`quantityOutput[${index}]`); 

  const costs = document.getElementById("costs"); 
  let costsArray = costs.value.split(","); 
  const mySubtotal = document.getElementById("myTotal").value;

  const quantities = document.getElementById("quantities"); 
  const quantitiesArray = quantities.value.split(","); 
  let myNewQuantity;
  let newSubtotal = parseFloat(mySubtotal); 
  if(indicator === "+"){
    document.getElementById(`remove-btn[${index}]`).disabled = false;
    myNewQuantity = parseInt(quantityOutput.innerText) + 1; 
    newSubtotal = parseFloat(mySubtotal) + parseInt(costsArray[index]);
  } else{
    document.getElementById(`remove-btn[${index}]`).disabled = false;
    if(parseInt(quantityOutput.innerText) > 0){
      document.getElementById(`remove-btn[${index}]`).disabled = false;
    myNewQuantity = parseInt(quantityOutput.innerText) - 1; 
    console.log("My new quantity is " + myNewQuantity); 
    newSubtotal = parseFloat(mySubtotal) - parseInt(costsArray[index]);
    } else{
        myNewQuantity = 0; 
        document.getElementById(`remove-btn[${index}]`).disabled = true;
    }
  }

  quantitiesArray[index] = toString(myNewQuantity); 
  if(myNewQuantity == 1){
    quantityOutput.innerText = `${myNewQuantity} Item`; 
  } else if(myNewQuantity !== undefined){
    quantityOutput.innerText = `${myNewQuantity} Items`; 
  } else{
    //myNewQuantity = 0; 
    quantityOutput.innerText = `${myNewQuantity} Items`; 
  }
  console.log(quantityOutput);

  console.log("My cost is " + costsArray[index]); 
  document.getElementById("myTotal").value = newSubtotal; 

  const subtotalContainer = document.getElementById("subtotalContainer");
  subtotalContainer.textContent = `Subtotal: \$${newSubtotal.toFixed(2)}`; 
  const taxContainer = document.getElementById("taxContainer");
  taxContainer.textContent = `Tax (7%): \$${(newSubtotal * 0.07).toFixed(2)}`;

  updateTotals(newSubtotal); 
  

  //NEED TO LOOK AT THESE FUNCTIONS!

  //updateCartDisplay();
  //updateTotals(newSubtotal);
  //loadCart();
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
  const subtotal = document.getElementById("myTotal").value;
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
    showError(firstNameInput, "Please enter your first name.");
    isValid = false;
  } else {
    hideError(firstNameInput);
  }

  if (!lastNameInput.value.trim()) {
    showError(lastNameInput, "Please enter your last name.");
    isValid = false;
  } else {
    hideError(lastNameInput);

  }

  if (!phoneInput.value.trim()) {
    showError(phoneInput, "Please enter your phone number.");
    isValid = false;
  } else {
    hideError(phoneInput);
  }

  if (!creditCardInput.value.trim()) {
    showError(creditCardInput, "Please enter your credit card number.");
    isValid = false;
  } else {
    hideError(creditCardInput);
  }

  if (!expdateInput.value.trim()) {
    showError(expdateInput, "Please enter your card expiration date.");
    isValid = false;
  } else {
    hideError(expdateInput);
  }

  if (!securityCodeInput.value.trim()) {
    showError(securityCodeInput, "Please enter your security code.");
    isValid = false;
  } else {
    hideError(securityCodeInput);
  }

  if (isValid) {
    /*localStorage.removeItem('cart');*/
    window.location.href = '/order/confirmation';
  }
  //return false;
}

const totalSelected = {
  counter: 0,
};

function addToQuantity(dishName, event){
  event.preventDefault(); 
  let id = dishName + "-input"; 
  let input = document.getElementById(id); 
  let value = parseInt(input.value); 
  value++;
  input.value = value;
  totalSelected.counter++; 
  
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
      totalSelected.counter--; 
  }
  input.value = value; 
}

function handleQuantityInputs(name, section){
  const checkbox = document.getElementById(name); 
  const container = document.getElementById(section); 
  console.log(container); 
  let input; 
  const index = parseInt(name.substring(name.length - 2, name.length -1)); 
  let inputId = `quantity[${index}]`;
      if(checkbox.checked){
          //console.log("My checkbox is checked"); 
          input = document.createElement("div");
          //input.type="number"; 
          //input.min = 0; 
          let addButton = document.createElement("button");
          addButton.innerHTML = "Add Item"; 
          addButton.classList.add("menu-control-btn"); 
          addButton.classList.add("menu-control-btn:hover"); 
          addButton.style.marginRight = "15px"; 
          //addButton.onclick = `addToQuantity(${checkbox.value}, ${event})`; 
          addButton.addEventListener("click", (event) =>{
            addToQuantity(checkbox.value, event); 
          });
          input.appendChild(addButton); 
          //input.appendChild(addButton); 

          let quantInput = document.createElement("input");
          quantInput.type = "number";
          quantInput.min = 0; 
          quantInput.value = "0"; 
          quantInput.id=`${checkbox.value}-input`;
          quantInput.name = `quantity[${index}]`; 
          quantInput.classList.add("quantity-menu"); 
          input.appendChild(quantInput); 

          let subtractButton = document.createElement("button");
          subtractButton.innerHTML = "Remove Item"; 
          subtractButton.classList.add("menu-control-btn");
          subtractButton.classList.add("menu-control-btn:hover"); 
          subtractButton.style.marginLeft = "15px"; 
          subtractButton.addEventListener("click", (event) =>{
            subtractToQuantity(checkbox.value, event); 
          })
          //subtractButton.onclick = 
            //subtractToQuantity(checkbox.value, event); 
          input.appendChild(subtractButton); 
          
          //const index = parseInt(name.substring(name.length - 2, name.length -1)); 
          input.name = inputId;  
          input.id = inputId;
          console.log(`My container is`); 
          console.log();
          console.log(input); 
          
          container.appendChild(input); 
      } else{
          let input = document.getElementById(inputId); 
          if(input){
              input.remove(); 
          }
      }
  
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
  window.location.href = `/`; 
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

// Function to clear all private room reservations
function clearAllReservations() {
  if (confirm("u sure?")) {
    localStorage.removeItem("privateRoomReservations");
    localStorage.removeItem("reservationHistory");
    alert("All reservations have been cleared!");
    console.log("All reservations cleared from localStorage");
  }
}

function toggleShirtColor(imageId, originalSrc, coloredSrc) {
  console.log("functionisrunning");
    const image = document.getElementById(imageId);
  if (!image) return;
  // Store the current src to determine which version is showing
  const currentSrc = image.src;
  
  // Toggle between original and colored versions
  if (currentSrc.includes(originalSrc)) {
    image.src = coloredSrc;
  } else {
    image.src = originalSrc;
  }
}

function validateOnlineOrder(){
  let totalCounter = 0; 
  for(let i = 1; i < 12; i++){
    const item = document.getElementById(`menu[${i}]`);
    //console.log(i + "My item is" + item.value); 
    if(item && item.checked){
      totalCounter ++; 
    }
  }
  console.log("my total counter is " + totalCounter); 
  if(totalCounter == 0){
    showError(document.getElementById("menu-submit"), "You must select a food item to proceed!");
    //window.location.href = "/order"; 
    return false; 
  }

  return true; 

}


function handleMerchSizing(itemsList, quantitiesList) {
  console.log("Handle func is RUNNING");
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const overallContainer = document.getElementById("merch-container");
  let otherCounter = 0;

  for (let i = 0; i < parseInt(itemsList.length); i++) {
    if (i < 4) {
      for (let j = 0; j < parseInt(quantitiesList[i]); j++) {
        const sizingSection = document.createElement("div");
        sizingSection.id = `${itemsList[i]}-sizing-${j + 1}`;
        sizingSection.classList.add("size-section");

        const header = document.createElement("h3");
        header.innerText = `Select a Size for your ${itemsList[i]} (#${j + 1})`;

        const form = document.createElement("form");
        form.classList.add("size-options");

        sizes.forEach((size, k) => {
          const inputId = `sizing-${i}-${j}-${k}`;
          const input = document.createElement("input");
          input.type = "radio";
          input.name = `Sizing-${i}-${j}`;
          input.id = inputId;
          input.value = size;
          input.required = true;

          const label = document.createElement("label");
          label.htmlFor = inputId;
          label.innerText = size;

          form.appendChild(input);
          form.appendChild(label);
        });

        sizingSection.appendChild(header);
        sizingSection.appendChild(form);
        overallContainer.appendChild(sizingSection);
      }
    } else {
      if (i === 4) {
        const header = document.createElement("h3");
        header.innerText = "Your Other Items:";
        overallContainer.appendChild(header);
      }

      if (parseInt(quantitiesList[i]) !== 0) {
        const otherItemHeader = document.createElement("h3");
        otherItemHeader.innerText = `${itemsList[i]}`;

        const innerParagraph = document.createElement("p");
        innerParagraph.innerText = `Your Quantity: ${parseInt(quantitiesList[i])}`;

        overallContainer.appendChild(otherItemHeader);
        overallContainer.appendChild(innerParagraph);
        otherCounter++;
      }

      if (i === parseInt(itemsList.length) - 1 && otherCounter === 0) {
        const noItemHeader = document.createElement("h3");
        noItemHeader.innerText = `You have no items that require you to select a size!`;
        overallContainer.appendChild(noItemHeader);
      }
    }
  }
}


function displayMerchTotal(element){
  const myElement = document.getElementById(element); 
  const total = document.createElement("p");
  if(element === "tax"){
    total.innerText = `Your ${element} (at 7%) is \$${myElement.value}.`; 
  } else{
    total.innerText = `Your ${element} is \$${myElement.value}.`; 
  }
  
  const overallContainer = document.getElementById("merch-container");
  overallContainer.appendChild(total); 
}
