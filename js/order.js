// ==============================
// ORDER PAGE LOAD
// ==============================

// URL se product id lena

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");


// Products Load

fetch("data/products.json")

.then(response => response.json())

.then(products => {

    const product = products.find(item => item.id == productId);

    if(!product){

        console.log("Product Not Found");
        return;

    }
    // ==============================
// SHOW PRODUCT DETAILS
// ==============================

document.getElementById("order-image").src = product.images[0];
document.getElementById("order-name").textContent = product.name;
document.getElementById("order-price").textContent = product.price;

// ==============================
// WHATSAPP ORDER
// ==============================

document.getElementById("whatsapp-order").addEventListener("click", () => {

    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const address = document.getElementById("customer-address").value.trim();

    if (!name || !phone || !address) {
        alert("Please fill all required fields.");
        return;
    }

    const message = `🛒 *New Order*

📦 Product:
${product.name}

💰 Price:
${product.price}

👤 Customer:
${name}

📞 Phone:
${phone}

📍 Address:
${address}`;

    window.open(
        `https://wa.me/923286848461?text=${encodeURIComponent(message)}`,
        "_blank"
    );

});

});