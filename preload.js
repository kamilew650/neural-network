// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const calculate = require("./index");

window.addEventListener("DOMContentLoaded", () => {
  const value = calculate();

  document.getElementById("content").innerHTML = value;
});
