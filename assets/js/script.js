"use strict";

import { UI } from "./ui.js";

class App {
  // Private fields
  #map;
  #mapEvent;

  constructor() {
    this._getPosition();

    UI.form.addEventListener("submit", this._newWorkout.bind(this));

    UI.inputType.addEventListener("change", this._toggleElevationField);
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () => {
        alert("Could not get your location");
      });
    }
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;

    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    this.#map = L.map("map").setView(coords, 13);

    L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on("click", this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    UI.form.classList.remove("hidden");
    UI.inputDistance.focus();
  }

  _toggleElevationField() {
    UI.inputElevation
      .closest(".form__row")
      .classList.toggle("form__row--hidden");
    UI.inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }

  _newWorkout(e) {
    e.preventDefault();

    // Clear input fields
    UI.inputDistance.value =
      UI.inputDuration.value =
      UI.inputCadence.value =
      UI.inputElevation.value =
        "";

    // Display marker
    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: "running-popup",
        })
      )
      .setPopupContent("Workout")
      .openPopup();
  }
}

const app = new App();
