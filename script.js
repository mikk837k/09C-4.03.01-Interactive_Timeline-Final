"use strict";

window.addEventListener("DOMContentLoaded", loadJSON);

// fetch json data
function loadJSON() {
  fetch("avengerMovies.json")
    .then(jsonData => jsonData.json())
    .then(myJSON => {
      myJSON.forEach(movie => {
        console.log(movie);

        // for each object in the json list create a div in html with a class called "svgplaceholder" and a dataset called svgplaceholder that is populated with the id from the json object

        let newElement = document.createElement("div");
        newElement.classList.add("svgplaceholder");
        newElement.dataset.svgplaceholder = movie.id;

        document.querySelector("#svg_timeline").appendChild(newElement);
      });
    });
}
