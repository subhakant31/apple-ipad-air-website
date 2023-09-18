
/*
  function : heroVideoAnimationHandler
  description : gsap animation generator for each text element in the hero section for opacity 0 to 1 to 0
  parameters: classname(string)
  returns: null
  */
export function heroVideoAnimationHandler() {
    gsap.to(".hero-section__video-container__video", {
      scale: 0.1,
      scrollTrigger: {
        trigger: ".hero-section__video-container__video",
        start: `bottom 80%`,
        end: "1000px 30%",
        scrub: 0.5,
        id: "scrub",
      },
    });
  
    gsap.to(".hero-section__video-container", {
      opacity: 0,
      scrollTrigger: {
        trigger: ".hero-section__video-container__video",
        start: `bottom 80%`,
        end: "1000px 30%",
        scrub: 0.5,
        id: "scrub",
      },
    });
  }

  /*
  function : heroSectionGsapCreator
  description : gsap animation generator for each text element in the hero section for opacity 0 to 1 to 0
  parameters: classname(string)
  returns: null
  */
export function productCaptionAnimationHandler(element) {
    gsap.set(`.${element}`, {
      opacity: 0,
    });
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: `.${element}`,
        start: "top 80%",
        end: "+=150 20%",
        scrub: true,
        toggleActions: "play reverse play reverse",
      },
    });
    tl.to(`.${element}`, { opacity: 1, duration: 0.5 }).to(
      `.${element}`,
      { opacity: 0, duration: 0.5 },
      0.5
    );
  }

   /*
  function : gsapGeneratorIpad
  description : gsap animation generator for each ipad image element
  parameters: classname(string) , element number (number) , animation for section
  returns: null
  */
export function gsapGeneratorIpad(element, i, animateFor) {

  //logic for ipad screen animation
  if (animateFor == "ipad-screen") {
    gsap.set(`.${element}`, {
      rotate: 350 - i * 10,
      scale: 1.3 + i * 0.06,
      x: -700 + i * 300,
      y: i * 100,
    });
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: `.${element}`,
        start: `top bottom`,
        end: `200px top`,
        scrub: 1,
      },
    });

    tl.to(`.${element}`, {
      rotate: 370 + i * 10,
      x: -780 + i * 100,
      y: -700 + i * 150,
      scale: 0.6 + i * 0.06,
    });

    //logic for ipad colors animation
  } else if (animateFor == "ipad-color") {
    gsap.set(`.${element}`, {
      rotate: -70 + i * 25,
      scale: 2,
      x: i * 20,
      y: i * 20,
    });
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: `.${element}`,
        start: `top bottom`,
        end: `500px top`,
        scrub: 1,
      },
    });

    tl.to(`.${element}`, {
      rotate: -100 + i * 15,
      x: -1600 + i * 150,
      y: -200 + i * 30,
    
    });
  }
}