"use strict";

window.addEventListener("DOMContentLoaded", init);

let action = "";
let myJSON;

// fetch json data

function init() {
  loadJSON();
  document
    .querySelector("#svg_timeline")
    .addEventListener("click", clickedOnTimeline);
  document
    .querySelector("#modal_placeholder")
    .addEventListener("click", closeModal);
}

function closeModal(event) {
  console.log("closemodal kørt");
  console.log(event);

  const modal_window = document.querySelector("#modal_window");
  const modal_svg = document.querySelector("#modal_placeholder svg");
  const infobox = document.querySelector("#modal_placeholder #infobox");

  let action = event.target.id;

  console.log(action);
  if (action === "close_screen") {
    console.log("kører min if statement");
    modal_window.style.display = "none";
    modal_svg.style.display = "none";
    infobox.style.display = "initial";
  }
}

function clickedOnTimeline(event) {
  action = event.target.parentElement.classList[0];

  if (action === "animate") {
    event.preventDefault();
    clearElements(event);
  }
}

function clearElements(event) {
  const folder = document.querySelector("#svg_folder");
  const modalSvg = document.querySelector("#modal_placeholder svg");
  const modal_window = document.querySelector("#modal_window");
  const infobox = document.querySelector("#modal_placeholder #infobox");

  infobox.style.display = "none";

  folder.classList.remove("animate_folder");
  folder.style.display = "block";
  modalSvg.style.display = "initial";
  modalSvg.classList.remove("animate_modal");
  modal_window.style.display = "none";

  placeFolder(event);
  scaleJarvis();
}

function scaleJarvis() {
  console.log("scaleJarvis kørt");
  document
    .querySelector("#inner_circle")
    .classList.add("jarvis_scale_inner_circle");
  document.querySelector("#innerpins").classList.add("jarvis_scale_inner_pins");
  document.querySelector("#innerpins").classList.add("jarvis_scale_inner_pins");
  document
    .querySelector("#middlepins")
    .classList.add("jarvis_scale_middle_pins");
  document
    .querySelector("#middle_circle")
    .classList.add("jarvis_scale_middle_circle");
  document
    .querySelector("#outer_circle")
    .classList.add("jarvis_scale_outer_circle");
  document.querySelector("#outerpins").classList.add("jarvis_scale_outer_pins");

  document
    .querySelector("#outerpins")
    .addEventListener("animationend", clearJarvis);
}

function clearJarvis() {
  console.log("clearJarvis kørt");
  document
    .querySelector("#inner_circle")
    .classList.remove("jarvis_scale_inner_circle");
  document
    .querySelector("#innerpins")
    .classList.remove("jarvis_scale_inner_pins");
  document
    .querySelector("#innerpins")
    .classList.remove("jarvis_scale_inner_pins");
  document
    .querySelector("#middlepins")
    .classList.remove("jarvis_scale_middle_pins");
  document
    .querySelector("#middle_circle")
    .classList.remove("jarvis_scale_middle_circle");
  document
    .querySelector("#outer_circle")
    .classList.remove("jarvis_scale_outer_circle");
  document
    .querySelector("#outerpins")
    .classList.remove("jarvis_scale_outer_pins");
}

function placeFolder(event) {
  // Where should the folder originate from (x,y pos)
  let xPosStart = event.target.getBoundingClientRect().x;
  let yPosStart = event.target.getBoundingClientRect().y;

  const folder = document.querySelector("#svg_folder");

  folder.style.transform = `translate(${xPosStart - 18}px,${yPosStart - 90}px)`;

  setTimeout(function() {
    moveFolder(event);
  }, 100);
}

function moveFolder(event) {
  const folder = document.querySelector("#svg_folder");
  folder.style.opacity = 1;
  folder.classList.add("animate_folder");

  folder.addEventListener("animationend", function() {
    openModalScreen(event, folder);
  });
}

function openModalScreen(event, folderElement) {
  const modal = document.querySelector("#modal_placeholder svg");

  folderElement.style.display = "none";

  modal.classList.add("animate_modal");
  modal.addEventListener("animationend", function() {
    setMovieInfo(event);
  });
}

function loadJSON() {
  fetch("avengerMovies.json")
    .then(jsonData => jsonData.json())
    .then(jsonData => {
      myJSON = jsonData;
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

      document
        .querySelector("#outerpins")
        .classList.add("jarvis_rotate_outer_pins");
      document
        .querySelector("#outer_circle")
        .classList.add("jarvis_rotate_outer_circle");
      document
        .querySelector("#inner_circle")
        .classList.add("jarvis_rotate_inner_circle");
      document
        .querySelector("#middlepins")
        .classList.add("jarvis_rotate_middle_pins");
    });
  fetch("interface_time_date.svg")
    .then(response => response.text())
    .then(mySVGData => {
      document
        .querySelector("#svg_timeAndDate")
        .insertAdjacentHTML("afterbegin", mySVGData);
      setTime();
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
  infoText();
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
  // const pinX1 = pin.getAttribute("x1");
  // const pinX2 = pin.getAttribute("x2");

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
    createDataPointHigh(counter);
  }
  for (let counter = 1; counter <= 10; counter++) {
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

  let getElementPosition = myTemplate.getBoundingClientRect();

  //   // make a clone
  const clone = myTemplate.cloneNode(true);

  const index = counter * 2 + 1;

  clone.querySelector("#year").textContent = myJSON[index].year;
  clone.querySelector("#year_blur").textContent = myJSON[index].year;

  clone.setAttribute("id", `low_${counter}`);
  clone.setAttribute("class", "animate");
  clone.setAttribute("data-id", myJSON[index].id);

  //   // find X posistion of the line you want to add

  let datapointCenter = getElementPosition.width / 2;

  let datapointOffset = getElementPosition.left + datapointCenter + 75;

  let offsetPositionX = datapointOffset * counter;

  //   // position the clone from the calculated position "diffX"
  clone.style.transform = `translateX(${offsetPositionX}px)`;

  destination.appendChild(clone);
}

function getNewSVGElements() {
  console.log("getNewSVGElements kørt");
  const timelinePin = document.querySelectorAll(".animate");

  timelinePin.forEach(pin => {
    pin.addEventListener("mouseenter", animatePin);
  });

  timelinePin.forEach(pin => {
    pin.addEventListener("mouseleave", removeAnimation);
  });
}

function animatePin(e) {
  console.log("animatePin kørt");

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

function setMovieInfo(event) {
  console.log("setMovieInfo kørt");

  myJSON.forEach(movie => {
    if (parseInt(event.target.parentElement.dataset.id) === movie.id) {
      const svgElement = document.querySelector("#movie_placeholder");

      const getBoundRect = svgElement.getBoundingClientRect();
      // udfyld data om filmen i modal vinduet
      const modal = document.querySelector("#modal_window");

      modal.style.display = "flex";
      modal.style.opacity = 1;

      let splitString = movie.release_date.split("-");

      let rearrangeDateString = `${splitString[2]}-${splitString[1]}-${
        splitString[0]
      }`;

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

function setTime() {
  let today = new Date();

  let date = `${("0" + today.getDate()).slice(-2)}-${(
    "0" +
    (today.getMonth() + 1)
  ).slice(-2)}-${today.getFullYear()}`;
  let time = `${("0" + today.getHours()).slice(-2)}:${(
    "0" + today.getMinutes()
  ).slice(-2)}:${("0" + today.getSeconds()).slice(-2)}`;

  const timeBlock = document.querySelector("#svg_timeAndDate #text_date");
  const dateBlock = document.querySelector("#svg_timeAndDate #text_date-2");

  timeBlock.textContent = time;
  dateBlock.textContent = date;

  setTimeout(setTime, 1000);
}

function infoText() {
  const textPlaceholder = document.querySelector(
    "#modal_placeholder #infobox h1"
  );
  stepOne();
  function stepOne() {
    textPlaceholder.textContent = "Initializing...";
    textPlaceholder.classList.add("blink");

    textPlaceholder.addEventListener("animationend", function() {
      stepTwo();
    });
  }

  function stepTwo() {
    textPlaceholder.classList.remove("blink");
    textPlaceholder.textContent = "";
    textPlaceholder.textContent = "Avenger Initiative Loaded";

    setTimeout(stepThree, 3000);
  }

  function stepThree() {
    const guideText = document.querySelector("#modal_placeholder #infobox p");
    textPlaceholder.textContent = "";
    textPlaceholder.textContent = "Chronologically Timeline Ready";
    guideText.textContent =
      "choose a historical significant point in the timeline below";
  }
}
