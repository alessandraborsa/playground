import { schema } from "./schema";
import "../scss/index.scss";
import { valid } from "joi";


async function fetchDataWithDelay(url, tabNumber) {
  try {
    const loader = document.querySelector('.tab-loader')
    if(loader) {
        loader.style.display = 'flex'
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    const response = await fetch(url);
    const result = await response.json();
    const arrayResult = result.item.content.join(" ");
    const tab1 = document
      .querySelector("#tabContent" + tabNumber)
      .querySelector("p");
    if (tab1) {
      tab1.innerHTML = arrayResult;
    }
    if(loader) {
        loader.style.display = 'none'
    }
  } catch (error) {
    console.log("error");
  }
}

fetchDataWithDelay("/assets/data/tab1.json", 1);
fetchDataWithDelay("/assets/data/tab2.json", 2);
fetchDataWithDelay("/assets/data/tab3.json", 3);

//change tab
const tabButtons = document.querySelectorAll(".tab-button");
if (tabButtons) {
  tabButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var tabNumber = button.getAttribute("data-tab");
      changeTab(tabNumber);

      tabButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });
      button.classList.add("active");
    });
  });
}

function changeTab(tabNumber) {
  document.querySelectorAll(".tab-content").forEach(function (tabContent) {
    tabContent.classList.remove("active");
  });
  document.getElementById("tabContent" + tabNumber).classList.add("active");
}

//cookie button
const cookieBanner = document.querySelector(".cookie-banner");
if (cookieBanner) {
  const cookieButton = document.querySelector(".cookie-banner-button");
  cookieButton.addEventListener("click", (e) => {
    cookieBanner.classList.add("hidden");
  });
}

//scroll header
const header = document.querySelector(".header");
window.addEventListener("scroll", function () {
  if (header) {
    const rect = header.getBoundingClientRect();
    if (rect.top <= 0 && window.scrollY < 20) {
      header.classList.remove("visible");
    } else {
      header.classList.add("visible");
    }
  }
});

//anchor scroll
document.addEventListener("DOMContentLoaded", function () {
  if (header) {
    header.querySelectorAll(".header-link").forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const top =
            window.innerWidth < 769
              ? targetElement.offsetTop + 100
              : targetElement.offsetTop;
          window.scrollTo({
            top: top,
            behavior: "smooth",
          });
        }
      });
    });
  }
});

//slider
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const paginationContainer = document.querySelector(".pagination");

  let currentIndex = 0;

  function updateSlider() {
    const translateValue = -currentIndex * 100 + "%";
    slider.style.transform = "translateX(" + translateValue + ")";
    updatePagination();
  }

  function nextSlide() {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateSlider();
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = slides.length - 1;
    }
    updateSlider();
  }

  function updatePagination() {
    paginationContainer.innerHTML = "";
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement("span");
      dot.className = i === currentIndex ? "active" : "";
      dot.addEventListener("click", function () {
        currentIndex = i;
        updateSlider();
      });
      paginationContainer.appendChild(dot);
    }
  }

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  updatePagination();
});

//form submit
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('#form-module')
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault()
            const firstName = form.querySelector('input[name="first_name"]').value
            const lastName = form.querySelector('input[name="last_name"]').value
            const email = form.querySelector('input[name="email"]').value
            const message = form.querySelector('textarea[name="message"]').value
            const validation = schema.validate({
                first_name: firstName,
                last_name: lastName,
                email,
                message
            })
            console.log(validation)
        })
    }
});
