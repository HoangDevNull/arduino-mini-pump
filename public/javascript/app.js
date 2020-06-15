// Style for html
var waterBox = document.querySelector(".water-box").style;
var waterPercent = document.querySelector(".water-box .water-percent");
var checkbox = document.querySelector(".rocker input");

const updateWaterData = (waterPercent) => {
  console.log(waterPercent);
  let maxHeight = 500;

  let waterHeight = Math.abs((waterPercent / 100) * maxHeight - 500);

  waterBox.setProperty("--top", waterHeight + "px");
  // for IE
  cssVars({
    variables: { "--top": waterHeight + "px" },
  });
};

const URL = "http://localhost:3000/";
var socket = io(URL);
socket.on("connect", () => {
  console.log("connect to" + URL);
});
socket.on("disconnect", () => {
  console.log("disconnect to" + URL);
});

socket.on("data", (data) => {
  let percent = data.value;
  updateWaterData(percent);
  waterPercent.innerText = `${percent} %`;
  checkbox.checked = data.isActive === 0 ? false : true;
});

checkbox.addEventListener("click", (e) => {
  let state = checkbox.checked;
  socket.emit("isActive", state ? 1 : 0);
});
