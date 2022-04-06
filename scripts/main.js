// python
const pyshell_module = require("python-shell");
const pyshell = new pyshell_module.PythonShell("./hand_gestures/main.py", {
  mode: "text",
});

pyshell.on("message", (message) => {
  document.getElementById("prediction").innerText = message;
  console.log(message);
});

function sendScreenshotURI(uri) {
  pyshell.send(uri);
}

pyshell.on("error", (error) => {
  console.log(error, "<-------- error");
});
pyshell.on("stderr", (error) => {
  console.log(error, "<-------- error");
});
pyshell.on("pythonError", (error) => {
  console.log(error, "<-------- error");
});

const videoElement = document.getElementById("video");
const screenshotElement = document.getElementById("screenshot");

navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then((stream) => {
    videoElement.srcObject = stream;
  })
  .catch((e) => {
    console.log(e);
  });

// take screenshot every 3 seconds
setInterval(() => {
  const ctx = screenshotElement.getContext("2d");

  ctx.drawImage(
    videoElement,
    0,
    0,
    screenshotElement.width,
    screenshotElement.height
  );

  sendScreenshotURI(screenshotElement.toDataURL("image/jpeg", 1.0));
}, [1000]);
