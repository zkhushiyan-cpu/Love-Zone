// =========================
// CATEGORY CLICK DROPDOWN
// =========================

fetch("data/categories.json")
.then(response => response.json())
.then(categories => {

    const desktopMenu = document.querySelector(".category-menu");

    if(!desktopMenu) return;


    categories.forEach(category => {

        desktopMenu.innerHTML += `

        <li>

            <a href="#">
                ${category.name}
                <i class="fa-solid fa-angle-right"></i>
            </a>


            <ul class="sub-category">

                ${category.subcategories.map(sub => `

                <li>
                    <a href="${sub.link}">
                        ${sub.name}
                    </a>
                </li>

                `).join("")}

            </ul>

        </li>

        `;

    });

});


const categoryBtn = document.querySelector(".category-dropdown > a");
const categoryBox = document.querySelector(".category-dropdown");

if(categoryBtn){

    categoryBtn.addEventListener("click", function(e){

        e.preventDefault();

        categoryBox.classList.toggle("active");

    });

}

// ==============================
// DESKTOP VIEW ONLY
// ==============================

if (window.innerWidth > 768) {



    // ==========================
    // LATEST PRODUCTS (4 ONLY)
    // ==========================

    fetch("data/products.json")
        .then(response => response.json())
        .then(async products => {

    await loadReviews();


            const latestProductsContainer = document.getElementById("latest-products");

            if(!latestProductsContainer) return;


            latestProductsContainer.innerHTML = "";


            products.slice(0,4).forEach(product => {


        latestProductsContainer.innerHTML += `

         <a href="product.html?id=${product.id}" class="product-card">

            <div class="product-image">
             <img src="${product.images[0]}" alt="${product.name}">
            </div>

           <div class="product-info">

           <h3>${product.name}</h3>
         <div class="latest-rating" id="latest-rating-${product.id}"></div>
           <p>Rs. ${product.price}</p>

          </div>

       </a>

        `;
renderProductRating(product.id, `latest-rating-${product.id}`);

            });


        })
        .catch(error => console.log(error));




    // ==========================
    // FEATURED PRODUCTS (4 ONLY)
    // ==========================


    fetch("data/products.json")
        .then(response => response.json())
       .then(async products => {

    await loadReviews();


            const featuredContainer = document.getElementById("featured-products");


            if(!featuredContainer) return;


            featuredContainer.innerHTML = "";



            // Yahan apni featured category change karni hai

            const featuredCategories = [
                "female-oil",
                "female-oil"
            ];



            let featuredProducts = [];



            featuredCategories.forEach(category => {


                const categoryProducts = products.filter(product =>
                    product.category === category
                );


                featuredProducts.push(...categoryProducts.slice(0,2));


            });



            [...products].reverse().slice(0,4).forEach(product => {



                featuredContainer.innerHTML += `
                
               

                <a href="product.html?id=${product.id}" class="product-card">


                    <div class="product-image">

                       <img src="${product.images[0]}" alt="${product.name}">

                    </div>



                    <div class="product-info">


                        <h3>${product.name}</h3>
                       <div class="featured-rating" id="featured-rating-${product.id}"></div>
                        <p>Rs. ${product.price}</p>


                    </div>
                </a>

            

                `;
              
renderProductRating(product.id, `featured-rating-${product.id}`);

            });



        })
        .catch(error => console.log(error));


}

// ==============================
// PRODUCT SEARCH + LIVE SUGGESTIONS
// ==============================

const searchInputs = document.querySelectorAll(
    ".search-box input, .mobile-search input"
);

const searchButtons = document.querySelectorAll(
    ".search-box button, .mobile-search button"
);

let allSearchProducts = [];

// ==============================
// LOAD PRODUCTS
// ==============================

fetch("data/products.json")
    .then(response => response.json())
    .then(products => {

        allSearchProducts = products;

        searchInputs.forEach(input => {

            // Suggestions box
            const suggestionsBox = document.createElement("div");

            suggestionsBox.className = "search-suggestions";

            input.parentElement.appendChild(suggestionsBox);

            // ==============================
            // LIVE SEARCH
            // ==============================

            input.addEventListener("input", function () {

                const searchText =
                    this.value.trim().toLowerCase();

                suggestionsBox.innerHTML = "";

                if (!searchText) {

                    suggestionsBox.style.display = "none";
                    return;

                }

                // ==============================
                // MATCH PRODUCTS
                // ==============================

                const matches = allSearchProducts.filter(product => {

                    const name =
                        product.name.toLowerCase();

                    // Word ya name ka koi bhi hissa match
                    return name.includes(searchText);

                }).slice(0, 6);


                // ==============================
                // SHOW SUGGESTIONS
                // ==============================

                if (matches.length === 0) {

                    suggestionsBox.innerHTML = `
                        <div class="no-search-result">
                            No Products Found
                        </div>
                    `;

                    suggestionsBox.style.display = "block";

                    return;

                }


                matches.forEach(product => {

                    const suggestion =
                        document.createElement("a");

                    suggestion.href =
                        `product.html?id=${product.id}`;

                    suggestion.className =
                        "search-suggestion";


                    const image =
                        product.images && product.images.length
                            ? product.images[0]
                            : product.image;


                    suggestion.innerHTML = `

                        <img
                            src="${image}"
                            alt="${product.name}"
                        >

                        <span>
                            ${product.name}
                        </span>

                    `;


                    suggestionsBox.appendChild(
                        suggestion
                    );

                });


                suggestionsBox.style.display =
                    "block";

            });


            // ==============================
            // ENTER KEY SEARCH
            // ==============================

            input.addEventListener("keydown", function(e) {

                if (e.key !== "Enter") return;

                const searchText =
                    this.value.trim().toLowerCase();

                if (!searchText) return;


                const product =
                    allSearchProducts.find(product =>
                        product.name
                            .toLowerCase()
                            .includes(searchText)
                    );


                if (product) {

                    window.location.href =
                        `product.html?id=${product.id}`;

                }

            });


            // ==============================
            // CLOSE SUGGESTIONS
            // ==============================

            document.addEventListener("click", function(e) {

                if (!input.parentElement.contains(e.target)) {

                    suggestionsBox.style.display =
                        "none";

                }

            });

        });


        // ==============================
        // SEARCH BUTTON
        // ==============================

        searchButtons.forEach(button => {

            button.addEventListener("click", function() {

                const input =
                    this.parentElement.querySelector("input");

                if (!input) return;


                const searchText =
                    input.value.trim().toLowerCase();

                if (!searchText) return;


                const product =
                    allSearchProducts.find(product =>
                        product.name
                            .toLowerCase()
                            .includes(searchText)
                    );


                if (product) {

                    window.location.href =
                        `product.html?id=${product.id}`;

                }

            });

        });

    })
    .catch(error => {

        console.error(
            "Search Products Load Error:",
            error
        );

    });

// ==============================
// FLOATING WHATSAPP
// ==============================

const floatingWhatsApp =
    document.querySelector(".floating-whatsapp");

if (floatingWhatsApp) {

    floatingWhatsApp.addEventListener("click", function(e) {

        // Original link stop
        e.preventDefault();

        // Current Page URL
        const currentURL = window.location.href;

        // ==============================
        // PRODUCT PAGE
        // ==============================

        const productId =
            new URLSearchParams(window.location.search).get("id");

        if (productId) {

            fetch("data/products.json")
                .then(response => response.json())
                .then(products => {

                    const product =
                        products.find(item => item.id == productId);

                    if (product) {

                        const message =
                            `Hello, I am interested in:\n\n` +
                            `📦 Product: ${product.name}\n` +
                            `🔗 Product Link: ${currentURL}`;

                        window.open(
                            `https://wa.me/923286848461?text=${encodeURIComponent(message)}`,
                            "_blank"
                        );

                    }

                })
                .catch(error => {

                    console.error(
                        "Floating WhatsApp Error:",
                        error
                    );

                });

            return;
        }

        // ==============================
        // OTHER PAGES
        // ==============================

        const message =
            `Hello, I am interested in your products.\n\n` +
            `🔗 Page Link: ${currentURL}`;

        window.open(
            `https://wa.me/923286848461?text=${encodeURIComponent(message)}`,
            "_blank"
        );

    });

}

 // ==============================
// FLOATING WHATSAPP END
// ==============================