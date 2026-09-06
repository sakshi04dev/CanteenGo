// CanteenGo Cart
let cart = [];

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
    showMessage(name + " added to cart!");
}

function updateCart() {
    let totalItems = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
    });

    const cartButton = document.querySelector(".cart");

    if (cartButton) {
        cartButton.innerHTML = "🛒 Cart (" + totalItems + ")";
    }
}

function showMessage(message) {
    const messageBox = document.createElement("div");

    messageBox.innerText = "✓ " + message;

    messageBox.style.position = "fixed";
    messageBox.style.bottom = "25px";
    messageBox.style.left = "50%";
    messageBox.style.transform = "translateX(-50%)";
    messageBox.style.background = "#4f6834";
    messageBox.style.color = "white";
    messageBox.style.padding = "12px 20px";
    messageBox.style.borderRadius = "10px";
    messageBox.style.fontWeight = "bold";
    messageBox.style.zIndex = "9999";
    messageBox.style.boxShadow = "0 5px 20px rgba(0,0,0,0.2)";

    document.body.appendChild(messageBox);

    setTimeout(function () {
        messageBox.remove();
    }, 1800);
}