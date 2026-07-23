/* ===================================
   MOBILE VIEW - PART 1
=================================== */

document.addEventListener("DOMContentLoaded", function () {

    if (window.innerWidth > 768) return;

    // Header
    const headerContainer = document.querySelector(".header .container");
    const logo = document.querySelector(".logo");
    const search = document.querySelector(".search-box");
    const icons = document.querySelector(".header-icons");

    if (headerContainer && logo && search && icons) {

        // پہلی لائن
        headerContainer.innerHTML = "";

        const topRow = document.createElement("div");
        topRow.className = "mobile-top-row";

        topRow.appendChild(logo);
        topRow.appendChild(icons);

        // دوسری لائن
        const secondRow = document.createElement("div");
        secondRow.className = "mobile-second-row";

        secondRow.appendChild(search);

        headerContainer.appendChild(topRow);
        headerContainer.appendChild(secondRow);

    }

});