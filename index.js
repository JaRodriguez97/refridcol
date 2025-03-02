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
let memberScroll = 0;
const duration = 1000; // Duración del scroll en milisegundos
const maxScroll = window.innerHeight * 0.6; // Altura máxima a la que quieres llegar
let velocity = maxScroll / duration;

function scroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      let scroll = window.scrollY;
      let scrollDiv10 = scroll / 10;
      let scrollnav = scroll / 430;

      if (scroll < topHeight) {
        Object.assign(header.style, {
          top: `${110 - scroll / 3}vh`,
          width: "70px",
          padding: "10px",
          zIndex: "8",
        });

        Object.assign(nav.style, {
          width: `${100 - scrollDiv10}%`,
          left: `${(scroll / 10) * scrollnav}%`,
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
        left: `${scrollDiv10}%`,
      });

      let scale = 100 + scroll / 5;
      zoom.style.backgroundSize = `${scale}% ${scale * 1.2}%`;

      ticking = false;
    });

    ticking = true;
  }
}
let count = 0;
function autoScroll() {
  count++;
  if (
    window.scrollY >= Math.round(memberScroll) &&
    memberScroll >= 10 &&
    count % 3 === 0
  )
    return setTimeout(() => autoScroll(), 30);

  let progress = 100;

  const currentScroll = velocity * progress + window.scrollY;

  window.scrollTo(0, currentScroll);

  memberScroll = currentScroll;

  if (maxScroll > currentScroll) setTimeout(() => autoScroll(), 30);
}

toggle.onclick = function () {
  menuRS.classList.toggle("active");
};

document.addEventListener("scroll", () => scroll());

document.addEventListener("DOMContentLoaded", () =>
  setTimeout(() => autoScroll(), 1500)
);
