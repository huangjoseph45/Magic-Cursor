let x, y;
let startTime = 0,
  currTime = 0;

const config = {
  animations: {
    fall: ["fall-1", "fall-2", "fall-3", "fall-4", "fall-5"],
    explode: ["explode-1", "explode-2", "explode-3", "explode-4", "explode-5"],
  },
  colors: ["249 146 253", "252 254 255"],
};

const mouseMove = document.addEventListener("mousemove", (e) => {
  x = e.clientX;
  y = e.clientY;
  const startTime = Date.now();
  timeOut();
});

const mouseClick = document.addEventListener("click", (e) => {
  x = e.clientX;
  y = e.clientY;
  for (let i = 0; i < 4; i++) {
    const multiplier = parseInt(6 + Math.random() * 2);
    createTracer(x, y, multiplier);
  }
});

let count = 0;

function createTracer(x, y, multiplier) {
  let star = document.createElement("span");
  document.body.appendChild(star);
  star.innerHTML = "&#10022";
  star.className = "star";
  star.style.top = `${y}px`;
  star.style.left = `${x}px`;
  star.style.fontSize = "1rem";
  animateStar(star, multiplier);

  star.style.animationFillMode = "forwards";
  star.style.animationDuration = "2s";
  star.style.color = `rgb(${config.colors[count++ % config.colors.length]})`;
  console.log(star.style.color);
  startTime = Date.now();
}

const timeOut = () => {
  currTime = Date.now();
  if (currTime - startTime > Math.random() * 5000) {
    for (let i = 0; i < Math.random() * 2 + 1; i++) createTracer(x, y, 1);
  }
};

const animateStar = (object, multiplier) => {
  let randNeg = 1;
  let randFall = Math.random() * 100 + 150;
  let randDecimal = (Math.random() * 8 + 2) / 10.0;
  if (Math.random() > 0.5) {
    randNeg = -1;
  }
  const randDeg1 = deg(Math.random() * 90);
  const randDeg2 = deg(Math.random() * 90);
  const randDeg3 = deg(Math.random() * 90);
  const randInt1 = px(Math.random() * -10 * multiplier);
  const rander = Math.random() * -10 * multiplier;
  const randInt2 = px(rander);
  console.log(rander);
  const fall = [
    {
      transform: `scale(0.25) translate(0px, 0px) rotateX(${randDeg1})rotateY(${randDeg2})rotateZ(${randDeg3})`,
      opacity: 1,
      offset: 0,
    },
    {
      opacity: 1,
      transform: `scale(1) translate(${
        10 * randNeg
      }px, ${-10}px) rotateX(${randDeg3})rotateY(${randDeg1})rotateZ(${randDeg2})`,
      offset: 0.1,
    },
    {
      opacity: 0,
      transform: `scale(${randDecimal}) translate(${randInt1}, ${randFall}px) rotateX(${
        rander * 3.349
      }deg)rotateY(${rander * 3.34 * 0.384}deg)rotateZ(${rander * 2.923}deg)`,
      easing: "ease-in-out",
      offset: 1,
    },
  ];

  object.animate(fall, {
    duration: 1500,
    fill: "forwards",
    iterations: 1,
  });
};

const px = (num) => `${num}px`;
const deg = (num) => `${num}deg`;
