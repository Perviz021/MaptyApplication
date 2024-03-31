"use strict";

import { UI } from "./ui.js";

let map, mapEvent;
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;

      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];

      map = L.map("map").setView(coords, 13);

      L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Handling clicks on map
      map.on("click", function (mapE) {
        mapEvent = mapE;
        UI.form.classList.remove("hidden");
        UI.inputDistance.focus();
      });
    },
    () => {
      alert("Could not get your location");
    }
  );
}

UI.form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Clear input fields
  UI.inputDistance.value =
    UI.inputDuration.value =
    UI.inputCadence.value =
    UI.inputElevation.value =
      "";

  // Display marker
  console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
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
});

UI.inputType.addEventListener("change", function () {
  UI.inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  UI.inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
});
