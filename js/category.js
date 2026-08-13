// URL se category lo
const params = new URLSearchParams(window.location.search);
const currentCategory = params.get("cat");

// Elements
const title = document.getElementById("category-title");
const container = document.getElementById("category-products");

// Products Load
fetch("data/products.json")
    .then(response => response.json())
    .then(async products => {

    await loadReviews();

        // Sirf current category ke products
        const filtered = products.filter(product => product.category === currentCategory);

        console.log("Current Category:", currentCategory);
        console.log("All Products:", products);
        console.log("Filtered:", filtered);
        
        // Category Title
        title.textContent = currentCategory
            ? currentCategory.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())
            : "Products";

            // Breadcrumb
document.getElementById("breadcrumb-category").textContent = title.textContent;

// Product Count
document.getElementById("category-count").textContent =
`${filtered.length} Products Found`;

// No Products Found
if(filtered.length === 0){

    container.innerHTML = "<h2>No Products Found</h2>";

    return;

}
      container.innerHTML = "";
        // Products Show
        filtered.forEach(product => {

    container.innerHTML += `
    

    <a href="product.html?id=${product.id}" class="product-card">

        <div class="product-image">

         <img src="${product.images[0]}" alt="${product.name}">

        </div>

        <div class="product-info">

            <h3>${product.name}</h3>
                <div class="product-rating" id="rating-${product.id}"></div>
            <p>Rs. ${product.price}</p>

        </div>

    </a>

    `;
renderProductRating(product.id, `rating-${product.id}`);
});

    })
    .catch(error => console.log(error));