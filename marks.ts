const blue = require("./assets/icons/mark-blue.png");
const lime = require("./assets/icons/mark-lime.png");
const orange = require("./assets/icons/mark-orange.png");
const yellow = require("./assets/icons/mark-yellow.png");
const red = require("./assets/icons/mark-red.png");
const pink = require("./assets/icons/mark-pink.png");

export const markStandar = [
  { image: blue, name: "markBlue" },
  { image: lime, name: "markLime" },
  { image: orange, name: "markOrange" },
  { image: yellow, name: "markYellow" },
  { image: red, name: "markRed" },
  { image: pink, name: "markPink" },
];

//premium
const p1 = require("./assets/icons/mark-drama.png");
const p2 = require("./assets/icons/mark-drama2.png");
const p3 = require("./assets/icons/mark-drama3.png");
const p4 = require("./assets/icons/mark-adventure.png");
const p5 = require("./assets/icons/mark-adventure2.png");
const p6 = require("./assets/icons/mark-diamond.png");
const p7 = require("./assets/icons/mark-love.png");
const p8 = require("./assets/icons/mark-love2.png");
const p9 = require("./assets/icons/mark-love3.png");
const p10 = require("./assets/icons/mark-scary.png");
const p11 = require("./assets/icons/mark-scary2.png");

export const premiumMarks = [
  { image: p1, name: "premium1" },
  { image: p2, name: "premium2" },
  { image: p3, name: "premium3" },
  { image: p4, name: "premium4" },
  { image: p5, name: "premium5" },
  { image: p6, name: "premium6" },
  { image: p7, name: "premium7" },
  { image: p8, name: "premium8" },
  { image: p9, name: "premium9" },
  { image: p10, name: "premium10" },
  { image: p11, name: "premium11" },
];

export const findMark = (name) => {
  const mark = markStandar.find((mark) => mark.name === name);
  if (mark) return mark;
  else return premiumMarks.find((mark) => mark.name === name);
};
