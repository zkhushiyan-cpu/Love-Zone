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
           <p>${product.price}</p>

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
                        <p>${product.price}</p>


                    </div>
                </a>

            

                `;
              
renderProductRating(product.id, `featured-rating-${product.id}`);

            });



        })
        .catch(error => console.log(error));


}