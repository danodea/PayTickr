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
let interval;

form.addEventListener("submit", (e) => {
  if (interval) {
    clearInterval(interval);
  }
  counter = 0;
  increment = 0;
  e.preventDefault();
  const formData = new FormData(form);
  increment =
    +formData.get("wage") / centisecondsInPayPeriod[formData.get("frequency")];
  interval = setInterval(counterFunction, 100);
});

const counterFunction = () => {
  counter += increment;
  output.innerHTML = counter.toFixed(2);
};
