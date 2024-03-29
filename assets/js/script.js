"use strict";

import { UI } from "./ui.js";

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;

      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];

      const map = L.map("map").setView(coords, 13);

      L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords)
        .addTo(map)
        .bindPopup("A pretty CSS popup.<br> Easily customizable.")
        .openPopup();
    },
    () => {
      alert("Could not get your location");
    }
  );
}
