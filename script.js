"use strict";

window.addEventListener("DOMContentLoaded", init);

let action = "";
let myJSON;

// fetch json data

function init() {
  loadJSON();
  document
    .querySelector("#svg_timeline")
    .addEventListener("click", clickedOnPage);
}

function clickedOnPage(event) {
  console.log(event);

  action = event.target.parentElement.classList[0];

  console.log(action);

  if (action === "animate") {
    event.preventDefault();
    animateFolder(event);
    animateModalWindow(event);
    setMovieInfo(event);
  }
}

function animateFolder(event) {}

function loadJSON() {
  fetch("avengerMovies.json")
    .then(jsonData => jsonData.json())
    .then(jsonData => {
      myJSON = jsonData;
      console.log(
        myJSON.sort(function(a, b) {
          return a.chrono_order - b.chrono_order;
        })
      );
      myJSON.sort(function(a, b) {
        return a.chrono_order - b.chrono_order;
      });

      loadSVG();
    });
}

// load svg image

function loadSVG() {
  console.log("load the svg");

  fetch("timeline_mockup.svg")
    .then(response => response.text())
    .then(mySVGTimeline => {
      document
        .querySelector("#svg_timeline")
        .insertAdjacentHTML("afterbegin", mySVGTimeline);

      createTimelinePins();
      createDataPoints();
      getNewSVGElements();
      flickerAnimation();
      //   calculateSize();
    });
  fetch("jarvis_arcReactor.svg")
    .then(response => response.text())
    .then(mySVGData => {
      document
        .querySelector("#svg_jarvis")
        .insertAdjacentHTML("afterbegin", mySVGData);
    });
  fetch("interface_time_date.svg")
    .then(response => response.text())
    .then(mySVGData => {
      document
        .querySelector("#svg_timeAndDate")
        .insertAdjacentHTML("afterbegin", mySVGData);
    });
  fetch("modal.svg")
    .then(response => response.text())
    .then(mySVGData => {
      document
        .querySelector("#modal_placeholder")
        .insertAdjacentHTML("afterbegin", mySVGData);
    });
  fetch("folder_icon.svg")
    .then(response => response.text())
    .then(mySVGData => {
      document
        .querySelector("#svg_folder")
        .insertAdjacentHTML("afterbegin", mySVGData);
    });
}

// create lines on timeline

function createTimelinePins() {
  let pins = document.querySelector("#steps line");

  for (let counter = 2; counter <= 132; counter++) {
    createPins(pins, counter);
  }
}

function createPins(pin, counter) {
  // find the position of the bullet

  // destination for the line to append
  const destination = document.querySelector("#steps");
  //   // find the <g> in #textlines to use as a template
  const myTemplate = document.querySelector("#steps line");
  //   // make a clone
  const clone = myTemplate.cloneNode(true);
  //   // find X posistion of the line you want to add
  const pinX1 = pin.getAttribute("x1");
  const pinX2 = pin.getAttribute("x2");

  let offsetX1 = 25 * counter;
  let offsetX2 = 25 * counter;

  //   // position the clone from the calculated position "diffX"
  clone.setAttribute("x1", offsetX1);
  clone.setAttribute("x2", offsetX2);
  //   // append it to the end of #textlines
  destination.appendChild(clone);
}

function createDataPoints() {
  for (let counter = 1; counter <= 10; counter++) {
    console.log(counter);
    createDataPointHigh(counter);
  }
  for (let counter = 1; counter <= 10; counter++) {
    console.log(counter);
    createDataPointLow(counter);
  }
}

function createDataPointHigh(counter) {
  console.log("createDataPointHigh");
  // destination for the line to append
  const destination = document.querySelector("#movie_dates");
  //   // find the <g> in #textlines to use as a template
  const myTemplate = document.querySelector("#dataPoint_high");

  myTemplate.setAttribute("class", "animate");
  myTemplate.setAttribute("data-id", "5");
  //   console.log(myTemplate);

  let getElementPosition = myTemplate.getBoundingClientRect();

  //   console.log(getElementPosition);
  //   // make a clone
  const clone = myTemplate.cloneNode(true);

  //   console.log(clone);

  const index = counter * 2;

  clone.querySelector("#year-2").textContent = myJSON[index].year;
  clone.querySelector("#year_blur-2").textContent = myJSON[index].year;

  clone.setAttribute("id", `high_${counter}`);
  clone.setAttribute("class", "animate");
  clone.setAttribute("data-id", myJSON[index].id);
  //   // find X posistion of the line you want to add
  let datapointCenter = getElementPosition.width / 2;

  let datapointOffset = getElementPosition.left + datapointCenter;

  console.log(datapointCenter);

  let offsetPositionX = datapointOffset * 4 * counter;
  //   console.log(offsetPositionX);
  //   // position the clone from the calculated position "diffX"
  clone.style.transform = `translateX(${offsetPositionX}px)`;
  //   // append it to the end of #textlines
  destination.appendChild(clone);
}

function createDataPointLow(counter) {
  console.log("createDataPointLow");
  // destination for the line to append
  const destination = document.querySelector("#movie_dates");
  //   // find the <g> in #textlines to use as a template
  const myTemplate = document.querySelector("#dataPoint_low");

  myTemplate.setAttribute("class", "animate");
  myTemplate.setAttribute("data-id", "21");
  console.log(myTemplate);

  let getElementPosition = myTemplate.getBoundingClientRect();

  console.log(getElementPosition);
  //   // make a clone
  const clone = myTemplate.cloneNode(true);

  //   console.log(clone);

  const index = counter * 2 + 1;

  clone.querySelector("#year").textContent = myJSON[index].year;
  clone.querySelector("#year_blur").textContent = myJSON[index].year;

  clone.setAttribute("id", `low_${counter}`);
  clone.setAttribute("class", "animate");
  clone.setAttribute("data-id", myJSON[index].id);

  //   // find X posistion of the line you want to add

  let datapointCenter = getElementPosition.width / 2;

  let datapointOffset = getElementPosition.left + datapointCenter + 75;

  console.log(datapointCenter);

  let offsetPositionX = datapointOffset * counter;

  //   // position the clone from the calculated position "diffX"
  clone.style.transform = `translateX(${offsetPositionX}px)`;

  destination.appendChild(clone);
}

function getNewSVGElements() {
  console.log("getNewSVGElements kørt");
  const timelinePin = document.querySelectorAll(".animate");
  console.log(timelinePin);

  timelinePin.forEach(pin => {
    console.log(pin);
    pin.addEventListener("mouseenter", animatePin);
  });

  timelinePin.forEach(pin => {
    pin.addEventListener("mouseleave", removeAnimation);
  });
}

function animatePin(e) {
  console.log("animatePin kørt");

  console.log(e);

  const outerCircle = e.target.children[2];
  const innerCircle = e.target.children[4];
  const thinCircle = e.target.children[3];

  outerCircle.classList.add("rotate_outer_circle");
  innerCircle.classList.add("rotate_inner_circle");
  thinCircle.classList.add("rotate_thin_circle");
}

function removeAnimation(e) {
  console.log("removeAnimation kørt");
  const outerCircle = e.target.children[2];
  const innerCircle = e.target.children[4];
  const thinCircle = e.target.children[3];

  outerCircle.classList.remove("rotate_outer_circle");
  innerCircle.classList.remove("rotate_inner_circle");
  thinCircle.classList.remove("rotate_thin_circle");
}

function flickerAnimation() {
  let randomNum = Math.random();

  document
    .querySelector("feGaussianBlur")
    .setAttribute("stdDeviation", `${Math.floor(randomNum * 3 + 4)}`);
  setTimeout(flickerAnimation, randomNum * 800);
}

function animateModalWindow(event) {
  const svgElement = document.querySelector("#modal_screen");

  console.log(event.target.getBoundingClientRect());
}

function setMovieInfo(event) {
  console.log("jeg kommer herned");

  myJSON.forEach(movie => {
    // console.log(movie.id);
    if (parseInt(event.target.parentElement.dataset.id) === movie.id) {
      const svgElement = document.querySelector("#movie_placeholder");

      console.log(svgElement);

      const getBoundRect = svgElement.getBoundingClientRect();

      console.log(getBoundRect);

      // udfyld data om filmen i modal vinduet
      const modal = document.querySelector("#modal_window");

      let splitString = movie.release_date.split("-");

      let rearrangeDateString = `${splitString[2]}-${splitString[1]}-${
        splitString[0]
      }`;

      console.log(splitString);

      modal.style.left = getBoundRect.x + "px";
      modal.style.top = getBoundRect.y + "px";
      modal.style.width = getBoundRect.width + "px";
      modal.style.height = getBoundRect.height + "px";

      modal.querySelector("[data-field=title]").innerHTML = movie.title;
      modal.querySelector("[data-field=plot]").innerHTML = movie.plot;

      modal.querySelector("[data-field=year]").innerHTML =
        "Release date: " + rearrangeDateString;
      modal.querySelector("[data-field=director]").innerHTML =
        "Director: " + movie.director;
      modal.querySelector("[data-field=image]").src =
        "img/" + movie.image + ".png";
    }
  });
}
