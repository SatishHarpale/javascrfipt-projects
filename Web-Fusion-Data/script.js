// 1 /*****************************    Navbar JS     ****************************/
// To automatically adjust slider below the navbar for different screen sizes
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const slider = document.querySelector(".slider-container");

  if (navbar && slider) {
    let navbarHeight = navbar.offsetHeight;
    slider.style.marginTop = navbarHeight + "px";
  }
});

//

// 2 /*****************************    Mega menu     ****************************/
//Mega menu hover effect and functionality
let hoverTimeout;

document.querySelectorAll(".mega-menu-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    const targetId = this.getAttribute("data-target");
    const parentContainer = this.closest(".custom-mega-menu-container");

    clearTimeout(hoverTimeout);

    // To Remove previous active classes and add a slight delay
    parentContainer.querySelectorAll(".mega-menu-info").forEach((info) => {
      info.classList.add("d-none");
    });

    const targetContent = parentContainer.querySelector(`#${targetId}`);
    if (targetContent) {
      targetContent.classList.remove("d-none");
    }
  });
});

//To Prevent Overlapping Mega Menus
document.querySelectorAll(".dropdown").forEach((menu) => {
  const dropdownMenu = menu.querySelector(".dropdown-menu");

  menu.addEventListener("mouseenter", () => {
    clearTimeout(hoverTimeout);
    closeAllMenus();
    dropdownMenu.classList.add("show");
  });

  menu.addEventListener("mouseleave", () => {
    hoverTimeout = setTimeout(() => {
      dropdownMenu.classList.remove("show");
    }, 200);
  });

  // Ensure only one mega menu is open at a time
  menu.querySelector(".nav-link").addEventListener("click", function (e) {
    closeAllMenus();
    dropdownMenu.classList.add("show");
    e.stopPropagation();
  });

  // Close on click outside
  document.addEventListener("click", () => {
    closeAllMenus();
  });
});

function closeAllMenus() {
  document.querySelectorAll(".dropdown-menu").forEach((el) => {
    el.classList.remove("show");
  });
}

//update the issue of by default first mega menu will display
document.querySelectorAll(".dropdown").forEach((menu) => {
  menu.addEventListener("mouseenter", function () {
    const firstMegaMenuItem = this.querySelector(".mega-menu-item");
    const targetId = firstMegaMenuItem?.getAttribute("data-target");
    const parentContainer = this.querySelector(".custom-mega-menu-container");

    if (firstMegaMenuItem && targetId && parentContainer) {
      // Clear any previous states
      parentContainer.querySelectorAll(".mega-menu-info").forEach((info) => {
        info.classList.add("d-none");
      });

      // Display the right-side content for the first menu item
      const targetContent = parentContainer.querySelector(`#${targetId}`);
      if (targetContent) {
        targetContent.classList.remove("d-none");
      }
    }
  });
});

//

// 3 /*****************************    Image Slider     ****************************/
let slides = document.querySelectorAll(".slide");
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
}

document.querySelector(".next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
});

document.querySelector(".prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
});

setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}, 5000);

//

// 4 /*****************************    Section two- services-card    ****************************/
//Our services - cards effects
document.querySelectorAll(".services-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px)";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});

//

// 5 /*****************************    Section three-  reliable-data   ****************************/
// Intersection Observer to detect when the section is visible
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounting(".count-number");
        observer.disconnect();
      }
    });
  },
  { threshold: 0.5 }
);

observer.observe(document.querySelector(".reliable-data-section-three"));

// Function to animate number counting using hardcoded values
function startCounting(selector) {
  const numbers = document.querySelectorAll(selector);

  numbers.forEach((number) => {
    const target = parseInt(number.getAttribute("data-target"));
    const duration = 2000;
    const frameRate = 60;
    const totalFrames = Math.round((duration / 1000) * frameRate);
    let count = 0;
    const increment = Math.ceil(target / totalFrames);

    const updateCount = () => {
      count += increment;

      if (count >= target) {
        number.textContent = target;
      } else {
        number.textContent = count;
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  });
}

//

// 6 /*****************************    Section four-  Award slider   ****************************/
//reserve

// 7 /*****************************    Section five- Unlocking Business Potential card animation   ****************************/
// Intersection Observer for Card Animation
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 1s forwards";
        cardObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".animate-card").forEach((card) => {
  cardObserver.observe(card);
});

//

// 8 /*****************************    Section Eight- Testimonial   ****************************/
const track = document.querySelector(".testimonial-track");

track.addEventListener("mouseenter", () => {
  track.style.animationPlayState = "paused";
});

track.addEventListener("mouseleave", () => {
  track.style.animationPlayState = "running";
});

//
// Scroll Animation for Steps
function revealSteps() {
  const steps = document.querySelectorAll(".step");
  const windowHeight = window.innerHeight;

  steps.forEach((step) => {
    const stepTop = step.getBoundingClientRect().top;
    if (stepTop < windowHeight * 0.85) {
      step.classList.add("visible");
    }
  });
}

// Hover Effect for Step Numbers
document.querySelectorAll(".step-number").forEach((number) => {
  number.addEventListener("mouseenter", () => {
    number.style.backgroundColor = "#ff5733";
  });

  number.addEventListener("mouseleave", () => {
    number.style.backgroundColor = "#007bff";
  });
});

window.addEventListener("scroll", revealSteps);
revealSteps();

//

document.addEventListener("DOMContentLoaded", function () {
  const faqButtons = document.querySelectorAll(".faq-question");
  const showMoreBtn = document.querySelector(".show-more-btn");
  const hiddenFaqs = document.querySelector(".hidden-faqs");
  const allFaqItems = document.querySelectorAll(".faq-item");

  // Hide all FAQ questions initially except the first 5
  allFaqItems.forEach((item, index) => {
    if (index >= 5) {
      item.style.display = "none";
    }
  });

  // FAQ Accordion - Collapse Others
  faqButtons.forEach((button) => {
    button.addEventListener("click", function () {
      document.querySelectorAll(".faq-item").forEach((item) => {
        if (item !== this.parentElement) {
          item.classList.remove("active");
          item.querySelector(".faq-answer").style.display = "none";
        }
      });

      const answer = this.nextElementSibling;
      const isVisible = answer.style.display === "block";

      if (isVisible) {
        answer.style.display = "none";
        this.parentElement.classList.remove("active");
      } else {
        answer.style.display = "block";
        this.parentElement.classList.add("active");
      }
    });
  });

  // Show More/Show Less Button Functionality
  showMoreBtn.addEventListener("click", function () {
    const hiddenQuestions = Array.from(allFaqItems).slice(5);

    if (showMoreBtn.textContent === "Show More") {
      hiddenQuestions.forEach((item) => (item.style.display = "block"));
      showMoreBtn.textContent = "Show Less";
    } else {
      hiddenQuestions.forEach((item) => (item.style.display = "none"));
      showMoreBtn.textContent = "Show More";
    }
  });
});
