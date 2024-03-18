gsap.registerPlugin(ScrollTrigger);

gsap.defaults({
  ease: "expo.out",
});

initTimer("000:00:00:00"); // other ways --> "0:15" "03:5" "5:2"

var reloadBtn = document.querySelector(".reload");
var timerEl = document.querySelector(".timer");

function initTimer(t) {
  var self = this,
    timerEl = document.querySelector(".timer"),
    daysGroupEl = timerEl.querySelector(".days-group"),
    hoursGroupEl = timerEl.querySelector(".hours-group"),
    minutesGroupEl = timerEl.querySelector(".minutes-group"),
    secondsGroupEl = timerEl.querySelector(".seconds-group"),
    daysGroup = {
      firstNum: daysGroupEl.querySelector(".first"),
      secondNum: daysGroupEl.querySelector(".second"),
      thirdNum: daysGroupEl.querySelector(".third"),
    },
    hoursGroup = {
      firstNum: hoursGroupEl.querySelector(".first"),
      secondNum: hoursGroupEl.querySelector(".second"),
    },
    minutesGroup = {
      firstNum: minutesGroupEl.querySelector(".first"),
      secondNum: minutesGroupEl.querySelector(".second"),
    },
    secondsGroup = {
      firstNum: secondsGroupEl.querySelector(".first"),
      secondNum: secondsGroupEl.querySelector(".second"),
    };

  var time = {
    day: t.split(":")[0],
    hour: t.split(":")[1],
    min: t.split(":")[2],
    sec: t.split(":")[3],
  };

  var timeNumbers;

  function updateTimer() {
    const countDate = new Date("March 30, 2024 16:00:00").getTime();
    // const countDate = new Date("March 30, 2024 16:00:00").getTime();
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

    // console.log(textDay)
    if (textDay < 100 && textDay > 9) {
      time.day = "0" + textDay;
    } else if (textDay < 10) {
      time.day = "00" + textDay;
    } else {
      time.day = textDay;
    }

    if (textHour < 10) {
      time.hour = "0" + textHour;
    } else {
      time.hour = textHour;
    }
    if (textMinute < 10) {
      time.min = "0" + textMinute;
    } else {
      time.min = textMinute;
    }

    if (textSecond < 10) {
      time.sec = "0" + textSecond;
    } else {
      time.sec = textSecond;
    }

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
      (convertPlural(secondArr) == 2 && textSecond != 12) ||
      (convertPlural(secondArr) == 3 && textSecond != 13) ||
      (convertPlural(secondArr) == 4 && textSecond != 14)
    ) {
      textTitleSecond.innerHTML = "секунди";
    } else {
      textTitleSecond.innerHTML = "секунд";
    }

    if ([1, 21, 31, 41, 51].includes(textMinute)) {
      textTitleMinute.innerHTML = "хвилина";
    } else if (
      (convertPlural(minuteArr) == 2 && minuteArr != 12) ||
      (convertPlural(minuteArr) == 3 && minuteArr != 13) ||
      (convertPlural(minuteArr) == 4 && minuteArr != 14)
    ) {
      textTitleMinute.innerHTML = "хвилини";
    } else {
      textTitleMinute.innerHTML = "хвилин";
    }

    if ([1, 21].includes(textHour)) {
      // лише 24 години в одному дні, тому масив такий короткий
      textTitleHour.innerHTML = "година";
    } else if (
      (convertPlural(hourArr) == 2 && hourArr != 12) ||
      (convertPlural(hourArr) == 3 && hourArr != 13) ||
      (convertPlural(hourArr) == 4 && hourArr != 14)
    ) {
      textTitleHour.innerHTML = "години";
    } else {
      textTitleHour.innerHTML = "годин";
    }


    console.log('textDay: ' + textDay);
    if ([11, 111, 211, 311].includes(textDay)) {
      // лише 24 години в одному дні, тому масив такий короткий
      textTitleDay.innerHTML = "днів";
      console.log('умова 1');
      //
    } else if (convertPlural(dayArr) == 1) {
      textTitleDay.innerHTML = "день";
      console.log('умова 2 ' + convertPlural(dayArr));
    } else if (
      (convertPlural(dayArr) == 2 && dayArr != 12) ||
      (convertPlural(dayArr) == 3 && dayArr != 13) ||
      (convertPlural(dayArr) == 4 && dayArr != 14)
    ) {
      textTitleDay.innerHTML = "дні";
      console.log('умова 3');
    } else {
      textTitleDay.innerHTML = "днів";
      console.log('умова 4');
    }
    // time.day = ;
    // time.hour = tempsplit[0];

    // time.min = tempsplit[1];
    // time.sec = tempsplit[2];

    timestr = time.day + time.hour + time.min + time.sec;
    // console.log(timeNumbers)
    timeNumbers = timestr.split("");
    updateTimerDisplay(timeNumbers);

    if (timestr === "000000000") countdownFinished();

    if (timestr != "000000000") setTimeout(updateTimer, 1000);
  }

  function updateTimerDisplay(arr) {
    if (arr[0] == 0) {
      daysGroup.firstNum.classList.add("hidden");
    }
    if (arr[1] == 0) {
      daysGroup.secondNum.classList.add("hidden");
    }

    animateNum(daysGroup.firstNum, arr[0]);
    animateNum(daysGroup.secondNum, arr[1]);
    animateNum(daysGroup.thirdNum, arr[2]);
    animateNum(hoursGroup.firstNum, arr[3]);
    animateNum(hoursGroup.secondNum, arr[4]);

    animateNum(minutesGroup.firstNum, arr[5]);
    animateNum(minutesGroup.secondNum, arr[6]);
    animateNum(secondsGroup.firstNum, arr[7]);
    animateNum(secondsGroup.secondNum, arr[8]);
  }

  function animateNum(group, arrayValue) {
    gsap.killTweensOf(group.querySelector(".number-grp-wrp"));
    // console.log(group.querySelector('.num-' + arrayValue).offsetTop);
    gsap.to(group.querySelector(".number-grp-wrp"), 1, {
      y: -group.querySelector(".num-" + arrayValue).offsetTop,
    });
  }

  setTimeout(updateTimer, 1000);
}

function countdownFinished() {
  setTimeout(function () {
    gsap.set(reloadBtn, { scale: 0.8, display: "block" });
    gsap.to(timerEl, 1, { opacity: 0.2 });
    gsap.to(reloadBtn, 0.5, { scale: 1, opacity: 1 });
  }, 1000);
}

// ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------

const body = document.body;
const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);
//const container = select('.site-main');

// initPageTransitions();

// Animation - First Page Load
function initLoaderHome() {
  var tl = gsap.timeline();

  tl.set(".loading-screen", {
    top: "0",
  });

  //   if ($(window).width() > 540) {
  //     tl.set("main .once-in", {
  //       y: "50vh",
  //     });
  //   } else {
  //     tl.set("main .once-in", {
  //       y: "10vh",
  //     });
  //   }

  tl.set(".loading-words", {
    opacity: 0,
    y: -50,
  });
  tl.set(".timer", {
    opacity: 0,
    y: 300,
  });

  tl.set(".loading-words .home-active, .loading-words .home-active-last", {
    display: "block",
    opacity: 0,
  });

  tl.set(".loading-words .home-active-first", {
    opacity: 1,
  });

  tl.to(".loading-words", {
    duration: 0.3,
    opacity: 1,
    y: -50,
    ease: "Power4.easeOut",
    delay: 0.4,
  });

  // тут редагуємо delay, stagger, duration
  tl.to(
    ".loading-words .home-active",
    {
      duration: 0.3,
      opacity: 1,
      stagger: 0.5,
      ease: "none",
      onStart: homeActive,
    },
    "=-.4"
  );
  // тут редагуємо delay, stagger, duration
  function homeActive() {
    gsap.to(".loading-words .home-active", {
      duration: 0.3,
      opacity: 0,
      stagger: 0.5,
      ease: "none",
      delay: 0.4,
    });
  }

  tl.to(".loading-words .home-active-last", {
    duration: 0.4,
    opacity: 1,
    delay: 0.5,
  });

  tl.to(".loading-screen", {
    duration: 0.8,
    top: "-100%",
    ease: "Power4.easeInOut",
    delay: 0.2,
  });

  tl.to(
    ".loading-words",
    {
      duration: 0.3,
      opacity: 0,
      ease: "linear",
    },
    "=-.8"
  );

  tl.set(".loading-screen", {
    top: "calc(-100%)",
  });

  tl.to(
    ".timer",
    {
      opacity: 1,
      duration: 1,
      y: 0,
      ease: "Power4.easeInOut",
      delay: 0.1,
    },
    "=-.9"
  );
}

initLoaderHome();
