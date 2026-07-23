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

// ==============================
// LATEST PRODUCTS FROM JSON
// ==============================

fetch("data/products.json")
    .then(response => response.json())
    .then(products => {

        const latestProductsContainer = document.getElementById("latest-products");

        products.forEach(product => {

            latestProductsContainer.innerHTML += `

                <div class="product-card">

                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>

                    <div class="product-info">

                        <h3>${product.name}</h3>

                        <p>${product.price}</p>

                        <a href="#" class="product-btn">
                            View Product
                        </a>

                    </div>

                </div>

            `;

        });

    })
    .catch(error => console.log(error));