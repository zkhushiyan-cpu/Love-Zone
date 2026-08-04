// ==========================
// LOAD CART
// ==========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ==========================
// DISPLAY CART PRODUCTS
// ==========================

function displayCart() {

    const cartContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("cart-total");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach((product, index) => {

        total += product.price * product.quantity;

        cartContainer.innerHTML += `

<div class="cart-item">

    <img src="${product.images[0]}" alt="${product.name}">

    <div class="cart-info">

        <h3>${product.name}</h3>

        <p>Rs. ${product.price}</p>

    </div>

</div>

`;

    });

    totalContainer.innerText = "Rs. " + total;

}

displayCart();