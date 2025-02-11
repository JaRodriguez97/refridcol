let $$ = (e) => document.getElementById(e);
let topHeight = window.innerHeight / 2;
let header = $$("header");
let nav = $$("nav");
let layer1 = $$("layer1");
let layer2 = $$("layer2");
let zoom = document.querySelector(".zoom");
let h1 = document.querySelector("h1");
let toggle = document.querySelector(".toggle");
let menuRS = document.querySelector(".menuRS");

let ticking = false;

toggle.onclick = function () {
  menuRS.classList.toggle("active");
};

document.addEventListener("scroll", function () {
  if (!ticking) {
    requestAnimationFrame(() => {
      let scroll = window.pageYOffset;
      let scrollDiv10 = scroll / 10;
      let scrollDiv50 = scroll / 50;
      let scrollDivTop = scroll / topHeight;
      let scaleHeader = Math.max(1, 2 - scrollDivTop);

      if (scroll < topHeight) {
        Object.assign(header.style, {
          top: `${110 - scroll / 3}vh`,
          width: "70px",
          padding: "10px",
          zIndex: "8",
          transform: `scale(${scaleHeader})`,
        });

        Object.assign(nav.style, {
          width: `${100 - scrollDiv10}%`,
          left: `${scrollDiv10}%`,
        });

        h1.style.top = `${110 - scrollDiv10}vh`;
      } else {
        Object.assign(header.style, {
          zIndex: "12",
          padding: "10px 100px",
          top: "10px",
          width: "80vw",
        });

        nav.style.width = "50vw";
      }

      Object.assign(layer1.style, {
        width: `${100 + scrollDiv10}%`,
        bottom: `${-scrollDiv10}%`,
        left: `${-scrollDiv10 + 40}%`,
      });

      Object.assign(layer2.style, {
        width: `${100 + scrollDiv10}%`,
        bottom: `${-scrollDiv10}%`,
        left: `${scrollDiv50}%`,
      });

      let scale = 100 + scroll / 5;
      zoom.style.backgroundSize = `${scale}% ${scale * 1.2}%`;

      ticking = false;
    });

    ticking = true;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  let startTime = Date.now();
  const duration = 3000;
  const maxScroll = window.innerHeight * 0.7;
  const interval = 20;

  function easeInOut(t) {
    return (1 - Math.cos(Math.PI * t)) / 2; // Suavizado suave
  }

  function autoScroll() {
    const elapsedTime = Date.now() - startTime;
    let progress = Math.min(elapsedTime / duration, 1); // Normalizamos entre 0 y 1

    // progress = easeInOut(progress); // Aplicamos easing

    window.scrollTo(0, maxScroll * progress); // Desplazamos suavemente

    if (progress < 1) {
      setTimeout(() => autoScroll(), interval); // Llamamos de nuevo después de 16ms
    }
  }

  setTimeout(() => autoScroll(), 1000);
});
