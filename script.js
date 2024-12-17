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

/*function createFAQResponses(response, responseID, containerID) {
  let FAQResponse;
  const container = document.getElementById(containerID);
  FAQResponse = document.createElement("h3");
  FAQResponse.innerHTML = response;
  FAQResponse.className = "faqresponse";
  FAQResponse.id = responseID;
  if (container) {
    container.appendChild(FAQResponse);
  } else {
    console.error("Cannot find it");
  }
}

function deleteFAQResponses(container, child) {
  container.removeChild(child);
}

function toggleFAQResponses(response, responseID, containerID) {
  let child = document.getElementById(responseID);
  let container = document.getElementById(containerID);
  if (child) {
    deleteFAQResponses(container, child);
  } else {
    createFAQResponses(response, responseID, containerID);
  }
  
}*/
