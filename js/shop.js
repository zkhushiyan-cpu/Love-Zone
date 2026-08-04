// ==========================
// SHOP PAGE
// ==========================

let allProducts = [];

fetch("data/products.json")
.then(response => response.json())
.then(products => {

    allProducts = products;

    displayProducts(allProducts);

    document.getElementById("product-count").textContent =
        allProducts.length + " Products Found";

})
.catch(error => console.log(error));



// ==========================
// DISPLAY PRODUCTS
// ==========================

function displayProducts(products){

    const container = document.getElementById("shop-products");

    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += `

<a href="product.html?id=${product.id}" class="product-card">

    <div class="product-image">

        <img src="${product.images[0]}" alt="${product.name}">

    </div>

    <div class="product-info">

        <h3>${product.name}</h3>

        <p>${product.price}</p>

    </div>

</a>

`;

    });

}



// ==========================
// SORT PRODUCTS
// ==========================

document.getElementById("sort-products").addEventListener("change", function(){

    let sorted = [...allProducts];

    if(this.value === "low-high"){

        sorted.sort((a,b)=>
            Number(a.price.replace(/[^\d]/g,'')) -
            Number(b.price.replace(/[^\d]/g,''))
        );

    }

    else if(this.value === "high-low"){

        sorted.sort((a,b)=>
            Number(b.price.replace(/[^\d]/g,'')) -
            Number(a.price.replace(/[^\d]/g,''))
        );

    }

    displayProducts(sorted);

});