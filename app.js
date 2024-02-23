const countDown = () => {
  const countDate = new Date("March 30, 2024 00:00:00").getTime();
  const now = new Date().getTime();
  const gap = countDate - now;
  //How the fuck does time work?
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Calculate the shit
  const textDay = Math.floor(gap / day);
  const textHour = Math.floor((gap % day) / hour);
  const textMinute = Math.floor((gap % hour) / minute);
  const textSecond = Math.floor((gap % minute) / second);

  let textTitleDay = document.querySelector(".countdown-text-day");
  let textTitleHour = document.querySelector(".countdown-text-hour");
  let textTitleMinute = document.querySelector(".countdown-text-minute");
  let textTitleSecond = document.querySelector(".countdown-text-second");

  let secondArr = textSecond;
  let minuteArr = textMinute;
  let hourArr = textHour;
  let dayArr = textDay;

  function convertPlural(item) {
    let arr = item.toString().split("");
    let itemToNumber = Number(arr[arr.length - 1]);
    return itemToNumber;
  }

  if ([1, 21, 31, 41, 51].includes(textSecond)) {
    textTitleSecond.innerHTML = "секунда";
  } else if (
    convertPlural(secondArr) == 2 ||
    convertPlural(secondArr) == 3 ||
    convertPlural(secondArr) == 4
  ) {
    textTitleSecond.innerHTML = "секунди";
  } else {
    textTitleSecond.innerHTML = "секунд";
  }

  if ([1, 21, 31, 41, 51].includes(textMinute)) {
    textTitleMinute.innerHTML = "хвилина";
  } else if (
    convertPlural(minuteArr) == 2 ||
    convertPlural(minuteArr) == 3 ||
    convertPlural(minuteArr) == 4
  ) {
    textTitleMinute.innerHTML = "хвилини";
  } else {
    textTitleMinute.innerHTML = "хвилин";
  }

  if ([1, 21].includes(textHour)) {
    // лише 24 години в одному дні, тому масив такий короткий
    textTitleHour.innerHTML = "година";
  } else if (
    convertPlural(hourArr) == 2 ||
    convertPlural(hourArr) == 3 ||
    convertPlural(hourArr) == 4
  ) {
    textTitleHour.innerHTML = "години";
  } else {
    textTitleHour.innerHTML = "годин";
  }

  if ([111, 211, 311].includes(textDay)) {
    // лише 24 години в одному дні, тому масив такий короткий
    textTitleDay.innerHTML = "днів";
    //
  } else if (convertPlural(dayArr) == 1) {
    textTitleDay.innerHTML = "день";
  } else if (
    convertPlural(dayArr) == 2 ||
    convertPlural(dayArr) == 3 ||
    convertPlural(dayArr) == 4
  ) {
    textTitleDay.innerHTML = "дні";
  } else {
    textTitleDay.innerHTML = "днів";
  }

  document.querySelector(".countdown-day").innerHTML = textDay;
  document.querySelector(".countdown-hour").innerHTML = textHour;
  document.querySelector(".countdown-minute").innerHTML = textMinute;
  document.querySelector(".countdown-second").innerHTML = textSecond;
};

setInterval(countDown, 1000);
