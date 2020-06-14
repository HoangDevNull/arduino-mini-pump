// Style for html
var style = document.querySelector(".water-box").style;
setTimeout(() => {
  style.setProperty("--top", "200px");
  cssVars({
    variables: { "--top": "200px" },
  });
}, 2000);

const URL = "http://localhost:3000/";
var socket = io(URL);
socket.on("connect", () => {
  console.log("connect to" + URL);
});
socket.on("disconnect", () => {
  console.log("disconnect to" + URL);
});
