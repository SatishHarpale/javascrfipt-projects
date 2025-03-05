"use strict";

// Implementing smooth scrolling

const brnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

brnScrollTo.addEventListener("click", function (e) {
  //scrolling using modern ways
  section1.scrollIntoView({ behavior: "smooth" });
});

//

// Building a Tabbed Component Traversing
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

//solution- event delegation
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  // console.log(clicked);

  //Guard clause- modern way
  if (!clicked) return;

  //Remove the active classes for both - tab & content area
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  //Active tab
  clicked.classList.add("operations__tab--active");

  //Activate content area
  // console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//

//  Header navigation Menu fade animation
const nav = document.querySelector(".nav");
const handleHover = function (e) {
  //console.log(this, e.currentTarget);
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      //if (el !== link) el.style.opacity = opacity;
      //for bind method
      if (el !== link) el.style.opacity = this;
    });
    //logo.style.opacity = opacity;
    //for bind method
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.1));

nav.addEventListener("mouseout", handleHover.bind(1));

//

// Header navigation shows when you come-up on section2 using the Intersection Observer API
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
//console.log(navHeight);

const stickyNav = function (entires) {
  const [entry] = entires;
  //console.log(entry);x

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  //rootMargin: '-90px', //set the top margin -90px outside of our target element above the section1, means before the starting it inside of the header element.
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//

// Revealing Elements on Scroll
//Reveal sections
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  // console.log(entries);
  // const [entry] = entries; //it gives an error while Re-loading the page in between the two section
  // // console.log(entry);

  //Fixing a Small Scrolling Bug
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//Lazy Loading Images
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  //if the images are not intersecting
  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    //for removing blur of the img
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  thresholdL: 0,
});

imgTargets.forEach((img) => imgObserver.observe(img));
