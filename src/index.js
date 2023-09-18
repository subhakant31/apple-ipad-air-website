import "./scss/index.scss";
import "./gsapAnimationHandler";
import "./";
import { gsap } from "gsap";
import {
  heroVideoAnimationHandler,
  productCaptionAnimationHandler,
  gsapGeneratorIpad,
} from "./gsapAnimationHandler";
const body = document.querySelector("body");
const topHeader = document.querySelector(".header__top-container");
const header = document.querySelector("header");
const bottomHeader = document.querySelector(
  ".header__bottom-container-wrapper"
);
const headerRibbon = document.querySelector(".header__ad-ribbon");
const heroVideoContainer = document.querySelector(
  ".hero-section__video-container"
);
const heroVideoAutoplay = document.querySelector(
  ".hero-section__video-container__video"
);
const homeIpadImage = document.querySelectorAll(
  ".hero-section__video-container__hero-ipad-image"
);
const ipadMoveScreen = document.querySelectorAll(".ipad-screen");
const ipadColors = document.querySelectorAll(".ipad-color");

const heroSection = document.querySelector(".hero-section");
const featureBgVideo = document.querySelector(".feature-section__bg-video");
const featureVideoPlayOnIntersect = document.querySelector(
  ".feature-section__text-wrapper__caption"
);
const featureTextWrapper = document.querySelectorAll(
  ".feature-section__text-wrapper__text"
);
const pauseBtn = document.querySelector(".fa-circle-pause");
const playBtn = document.querySelector(".fa-circle-play");

//A constant value of hero page's video width
const heroVideoWidth = heroVideoAutoplay.offsetWidth;

let isVideoPaused = false;

//An array that contains all the elements that are to be switched between dark and light mode
let colorSwitch = [
  document.querySelector(".navigation__list"),
  document.querySelector(".product-title"),
];

/*
  function : resetFunction
  description : resets the values that are to be changed later
  returns: null
  parameters: null
*/
function resetFunction() {
  heroVideoAutoplay.pause();
  featureBgVideo.pause();
}

/*
  function : animateOnScroll
  description : triggered when scroll event occurs on window object
  parameters: null
  returns: null
  */
function animateOnScroll() {
  //For sticking the bottom header once the scroll value reaches the top header's offsetHeight value
  if (scrollY >= topHeader.offsetHeight) {
    bottomHeader.classList.add("sticky-header");
    headerRibbon.style.marginTop = bottomHeader.offsetHeight; //margin top is added so the element won't jump because of unavailability of upper element
  } else {
    bottomHeader.classList.remove("sticky-header");
    headerRibbon.style.marginTop = 0;
  }

  let captionPosition = ScrollTrigger.positionInViewport(
    ".feature-section__text-wrapper",
    "center"
  ).toFixed(2); //returns position of element in the viewport upto 2 decimals

  //changing video playback according to the element's position in viewport
  if (captionPosition <= 1) {
    featureBgVideo.play();
    featureBgVideo.style.opacity = 1;
    featureBgVideo.style.display = "block";
    pauseBtn.style.display = "block";
    colorSwitch.forEach((element) => {
      // element.classList.remove("black-background");
    });
  }

  if (captionPosition < -0.5 || captionPosition > 1.5) {
    featureBgVideo.style.opacity = 0;
    featureBgVideo.style.display = "none";
    body.style.background = "#fff";
    pauseBtn.style.display = "none";
    featureBgVideo.pause();

    colorSwitch.forEach((element) => {
      // element.classList.add("black-background");
    });
  }
}

/*
  function : playHeroVideo
  description : a timeout function that plays the homepage video after a certain interval (i.e 1000ms)
  returns: null
  parameters: null
  */
function playHeroVideo() {
  heroVideoAutoplay.play();
  homeIpadImage[0].classList.remove("visible");
  homeIpadImage[1].classList.add("visible"); // changing the default ipad image to reflected image
}

function heroVideoPauseHandler() {
  if (!isVideoPaused) {
    pauseBtn.style.display = "none";
    playBtn.style.display = "block";
    featureBgVideo.pause();
  } else {
    pauseBtn.style.display = "block";
    playBtn.style.display = "none";
    featureBgVideo.play();
  }
}

/*
  function : init
  description : initializes once the DOM is ready
  returns: null
  parameters: null
*/
function init() {
  resetFunction();

  gsap.registerPlugin(ScrollTrigger); //for registering ScrollTrigger plugin for GSAP

  heroVideoAnimationHandler();

  window.addEventListener("scroll", animateOnScroll);

  pauseBtn.addEventListener("click", heroVideoPauseHandler);

  //adding Gsap to each element of textWrapper in hero section
  for (var i = 0; i < featureTextWrapper.length; i++) {
    productCaptionAnimationHandler(featureTextWrapper[i].classList[1]);
  }

  //gsap for each element in Ipad display section
  for (var i = 0; i < ipadMoveScreen.length; i++) {
    gsapGeneratorIpad(ipadMoveScreen[i].classList[2], i + 1, "ipad-screen");
  }

  //gsap for each element in Ipad colors section
  for (var i = 0; i < ipadColors.length; i++) {
    gsapGeneratorIpad(ipadColors[i].classList[2], i + 1, "ipad-color");
  }

  setTimeout(playHeroVideo, 1000);
}

window.addEventListener("DOMContentLoaded", init);
