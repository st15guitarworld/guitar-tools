let timerId = null;
let interval = 100;

self.addEventListener("message", e => {
  switch (e.data.type) {
    case "start":
      console.log("starting");
      timerId = setInterval(() => {
        postMessage("tick");
      }, interval);
      break;
    case "interval":
      console.log("setting interval");
      interval = e.data.interval;
      console.log("interval = " + interval);

      if (timerId) {
        clearInterval(timerId);
        timerId = setInterval(() => {
          postMessage("tick");
        }, interval);
      }
      break;
    case "stop":
      console.log("stopping");
      clearInterval(timerId);
      timerId = null;
      break;
    default:
      console.log("Recieved Message: " + e);
      break;
  }
});
