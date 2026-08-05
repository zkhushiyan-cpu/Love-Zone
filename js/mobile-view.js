// ==============================
// MOBILE VIEW PRODUCTS
// ==============================

if (window.innerWidth <= 768) {


    // ==========================
    // LATEST PRODUCTS (2 ONLY) and click able
    // ==========================

    fetch("data/products.json")
        .then(response => response.json())
        .then(async products => {

    await loadReviews();

            const latestProductsContainer = document.getElementById("latest-products");

            if (!latestProductsContainer) return;

            latestProductsContainer.innerHTML = "";
            

            products.slice(0, 2).forEach(product => {

                latestProductsContainer.innerHTML += `

<a href="product.html?id=${product.id}" class="product-card">

    <div class="product-image">

       <img src="${product.images[0]}" alt="${product.name}">

    </div>

    <div class="product-info">

        <h3>${product.name}</h3>
        <div id="latest-rating-${product.id}"></div>

        <p>${product.price}</p>

    </div>

</a>

`;
console.log(document.getElementById(`latest-rating-${product.id}`));
renderProductRating(product.id, `latest-rating-${product.id}`);
            });

        })
        .catch(error => console.log(error));



    // ==========================
    // FEATURED PRODUCTS (CATEGORY BASED) and click able
    // ==========================

    fetch("data/products.json")
        .then(response => response.json())
        .then(async products => {

    await loadReviews();

            const featuredContainer = document.getElementById("featured-products");

            if (!featuredContainer) return;

            featuredContainer.innerHTML = "";


            // Yahan apni 2 featured categories change karni hain
            const featuredCategories = [
                "female-care",
                "female-care"
            ];


            let featuredProducts = [];


            featuredCategories.forEach(category => {

                const categoryProducts = products.filter(product =>
                    product.category === category
                );

                featuredProducts.push(...categoryProducts.slice(0, 2));

            });

          console.log("Featured Products:", featuredProducts);
            featuredProducts.slice(0, 2).forEach(product => {


               featuredContainer.innerHTML += `
               

<a href="product.html?id=${product.id}" class="product-card">

    <div class="product-image">
       <img src="${product.images[0]}" alt="${product.name}">
    </div>

    <div class="product-info">

        <h3>${product.name}</h3>
        <div id="featured-rating-${product.id}"></div>
        <p>${product.price}</p>

    </div>

</a>

`;
console.log(document.getElementById(`featured-rating-${product.id}`));
renderProductRating(product.id, `featured-rating-${product.id}`);

            });


        })
        .catch(error => console.log(error));


}

// ==============================
// MOBILE CATEGORY LOAD
// ==============================

fetch("data/categories.json")
.then(response => response.json())
.then(categories => {

    const mobileMenu = document.querySelector(".mobile-menu");

    if(!mobileMenu) return;


    mobileMenu.innerHTML = "";


    categories.forEach(category => {

        mobileMenu.innerHTML += `

        <li class="mobile-category-item">

            <div class="mobile-category-title">
                ${category.name}
                <i class="fa-solid fa-angle-down"></i>
            </div>


            <ul class="mobile-sub-category">

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

// ==============================
// MOBILE CATEGORY BUTTON
// ==============================

const mobileCategoryBtn = document.querySelector(".mobile-category-btn");
const mobileMenu = document.querySelector(".mobile-menu");

if(mobileCategoryBtn && mobileMenu){

    mobileCategoryBtn.addEventListener("click",()=>{

        mobileMenu.classList.toggle("active");

    });

}