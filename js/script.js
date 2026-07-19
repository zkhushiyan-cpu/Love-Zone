// =========================
// CATEGORY CLICK DROPDOWN
// =========================

const categoryBtn = document.querySelector(".category-dropdown > a");
const categoryBox = document.querySelector(".category-dropdown");


if(categoryBtn){

    categoryBtn.addEventListener("click", function(e){

        e.preventDefault();

        categoryBox.classList.toggle("active");

    });

}