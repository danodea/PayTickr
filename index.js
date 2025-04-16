const form = document.querySelector("form");
const output = document.querySelector("output");

// each is seconds in that number of workdays multiplied by 10
// since the interval is 1/10 of a second
const centisecondsInPayPeriod = {
  weekly: 1440000,
  biweekly: 2880000,
  semimonthly: 3117600, // 4.33 work weeks per month
  monthly: 6235200,
  annually: 74880000,
};

let counter = 0;
let increment = 0;
let animationFrameId;
let lastUpdateTime = 0;
let lastSubmitTime;
const UPDATE_INTERVAL = 100; // ms

const updateCounter = (currentTime) => {
  if (!lastUpdateTime) lastUpdateTime = currentTime;

  const elapsed = currentTime - lastUpdateTime;

  if (elapsed >= UPDATE_INTERVAL) {
    counter += increment * (elapsed / UPDATE_INTERVAL);
    output.innerHTML = `You have made ${counter.toFixed(
      2
    )} since you submitted this form at ${lastSubmitTime}`;
    lastUpdateTime = currentTime;
  }

  animationFrameId = requestAnimationFrame(updateCounter);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  counter = 0;
  increment = 0;
  lastUpdateTime = 0;

  const formData = new FormData(form);
  lastSubmitTime = new Date();

  increment =
    +formData.get("wage") / centisecondsInPayPeriod[formData.get("frequency")];
  // form.classList.add("hidden");

  animationFrameId = requestAnimationFrame(updateCounter);
});
