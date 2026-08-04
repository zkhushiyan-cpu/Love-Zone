// ==============================
// SINGLE PRODUCT LOAD
// ==============================


// URL se product id lena

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");



// Product Load

fetch("data/products.json")

.then(response => response.json())

.then(async products => {

    await loadReviews();



    const product = products.find(item => item.id == productId);
    if(!product){

        console.log("Product Not Found");
        return;
    }

    // ==============================
// PRODUCT RATING  Product page par ye nazar aayega
// ==============================

renderProductRating(product.id, "product-rating");


    // Product Details

    //img
const mainImage = document.getElementById("product-image");
const thumbnails = document.getElementById("product-thumbnails");

const images = product.images || [product.image];

galleryImages = images;

mainImage.src = images[0];

if (images.length > 1) {

    images.forEach(img => {

        thumbnails.innerHTML += `
            <img src="${img}" class="thumb">
        `;

    });

    document.querySelectorAll(".thumb").forEach(thumb => {

        thumb.addEventListener("click", function () {

            mainImage.src = this.src;

        });

    });

} else {

    thumbnails.style.display = "none";

}
                  // mloom ni

    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").textContent = product.price;
    document.getElementById("product-short-description").textContent =
    product.shortDescription || "Product details coming soon";
                // Buy Now Button
    document.getElementById("buy-now-btn").href = `order.html?id=${product.id}`;
// ==============================
// PRODUCT WHATSAPP BUTTON
// ==============================

document.getElementById("whatsapp-btn").addEventListener("click", () => {

    const message = `Hello!

I want to order this product.

📦 Product:
${product.name}

💰 Price:
${product.price}

Please send me the payment details.`;

    window.open(
        `https://wa.me/923286848461?text=${encodeURIComponent(message)}`,
        "_blank"
    );

});
                 // Long Description

    document.getElementById("product-long-description").innerHTML =
product.longDescription || "<p>Full description coming soon</p>";
                     // product.tags
const tagsContainer = document.getElementById("product-tags");

if (product.tags) {

    tagsContainer.innerHTML = product.tags.map(tag =>
        `<span class="tag">${tag}</span>`
    ).join("");

}



    // ==============================
    // RELATED PRODUCTS
    // ==============================


    const relatedContainer = document.getElementById("related-products");


    const relatedProducts = products.filter(item =>
        item.category === product.category &&
        item.id != product.id
    );



    relatedProducts.forEach(item => {




        relatedContainer.innerHTML += `


        <div class="product-card">


            <img src="${item.images ? item.images[0] : item.image}" alt="${item.name}">


            <h3>${item.name}</h3>
     <div id="related-rating-${item.id}"></div>
            <p>${item.price}</p>


            <a href="product.html?id=${item.id}">
                View Product
            </a>


        </div>


        `;

renderProductRating(item.id, `related-rating-${item.id}`);

    });

/// ==============================
// SHOW PRODUCT REVIEWS
// ==============================

const productReviews = getProductReviews(product.id);
const reviewsList = document.getElementById("reviews-list");



console.log("Product:", product.id);
console.log("All Reviews:", allReviews);
console.log("Product Reviews:", productReviews);


if (reviewsList) {

    reviewsList.innerHTML = "";

    if (productReviews.length === 0) {

        reviewsList.innerHTML = "<p>No reviews yet.</p>";

    } else {

        productReviews.forEach(review => {

            reviewsList.innerHTML += `
                <div class="review-item">

                    <div class="product-stars">
                        ${renderStars(review.rating)}
                    </div>

                    <h4>${review.name}</h4>

                    <p>${review.comment}</p>

                </div>
            `;

        });

    }

}

})


.catch(error => console.log(error));


// ==============================
// PRODUCT TABS  single product page par reviews list botton
// ==============================

const tabButtons = document.querySelectorAll(".tab-btn");

const descriptionSection = document.getElementById("description-section");

const reviewsSection = document.getElementById("product-reviews");

tabButtons.forEach(button => {

    button.addEventListener("click", function () {

        tabButtons.forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

        if (this.dataset.tab === "description") {

            descriptionSection.style.display = "block";
            reviewsSection.style.display = "none";

        } else {

            descriptionSection.style.display = "none";
            reviewsSection.style.display = "block";

        }

    });

});

