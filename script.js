// ==========================================
// CANTEENGO - CART + CHECKOUT
// ==========================================

let cart = [];


// ==========================================
// ADD ITEM
// ==========================================

function addToCart(name, price) {

    const existingItem = cart.find(function(item) {
        return item.name === name;
    });

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


// ==========================================
// UPDATE CART BUTTON
// ==========================================

function updateCart() {

    let totalItems = 0;

    cart.forEach(function(item) {
        totalItems += item.quantity;
    });

    const cartButton = document.querySelector(".cart");

    if (cartButton) {
        cartButton.innerHTML = "🛒 Cart (" + totalItems + ")";
    }
}


// ==========================================
// OPEN CART
// ==========================================

function openCart() {

    hideMainSections();

    document.querySelector("#cart-section").style.display = "block";

    displayCart();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==========================================
// HIDE MAIN SECTIONS
// ==========================================

function hideMainSections() {

    document.querySelector(".hero").style.display = "none";
    document.querySelector("#features").style.display = "none";
    document.querySelector("#menu").style.display = "none";
    document.querySelector("#how").style.display = "none";
    document.querySelector(".cta").style.display = "none";

    document.querySelector("#cart-section").style.display = "none";
    document.querySelector("#checkout-section").style.display = "none";
}


// ==========================================
// SHOW MENU
// ==========================================

function showMenu() {

    document.querySelector(".hero").style.display = "flex";
    document.querySelector("#features").style.display = "block";
    document.querySelector("#menu").style.display = "block";
    document.querySelector("#how").style.display = "block";
    document.querySelector(".cta").style.display = "block";

    document.querySelector("#cart-section").style.display = "none";
    document.querySelector("#checkout-section").style.display = "none";

    document.querySelector("#menu").scrollIntoView({
        behavior: "smooth"
    });
}


// ==========================================
// DISPLAY CART
// ==========================================

function displayCart() {

    const cartItems = document.querySelector("#cart-items");
    const cartTotal = document.querySelector("#cart-total");

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <div style="font-size:60px;">
                    🛒
                </div>

                <h3 style="margin:15px 0 8px;">
                    Your cart is empty
                </h3>

                <p>
                    Add something delicious from the menu!
                </p>

            </div>
        `;

        cartTotal.innerText = "₹0";

        return;
    }


    let html = "";
    let total = 0;


    cart.forEach(function(item, index) {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;


        html += `
            <div class="cart-item">

                <div>

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ₹${item.price} × ${item.quantity}
                    </p>

                    <div class="cart-price">
                        ₹${itemTotal}
                    </div>

                </div>


                <div class="quantity-buttons">

                    <button onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <strong>
                        ${item.quantity}
                    </strong>

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>

                    <button
                        class="remove-btn"
                        onclick="removeItem(${index})">
                        🗑️
                    </button>

                </div>

            </div>
        `;
    });


    cartItems.innerHTML = html;

    cartTotal.innerText = "₹" + total;
}


// ==========================================
// INCREASE QUANTITY
// ==========================================

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();
    displayCart();
}


// ==========================================
// DECREASE QUANTITY
// ==========================================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);
    }

    updateCart();
    displayCart();
}


// ==========================================
// REMOVE ITEM
// ==========================================

function removeItem(index) {

    const name = cart[index].name;

    cart.splice(index, 1);

    updateCart();
    displayCart();

    showMessage(name + " removed from cart");
}


// ==========================================
// CHECKOUT
// ==========================================

function checkout() {

    if (cart.length === 0) {

        showMessage("Your cart is empty!");

        return;
    }


    hideMainSections();

    document.querySelector("#checkout-section").style.display = "block";

    updateCheckoutTotal();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==========================================
// UPDATE CHECKOUT TOTAL
// ==========================================

function updateCheckoutTotal() {

    let total = 0;

    cart.forEach(function(item) {

        total += item.price * item.quantity;

    });


    const checkoutTotal =
        document.querySelector("#checkout-total");

    if (checkoutTotal) {

        checkoutTotal.innerText =
            "₹" + total;
    }
}


// ==========================================
// BACK TO CART
// ==========================================

function backToCart() {

    document.querySelector("#checkout-section").style.display = "none";

    document.querySelector("#cart-section").style.display = "block";

    displayCart();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==========================================
// PAYMENT BUTTON
// ==========================================

function proceedToPayment() {

    const name =
        document.querySelector("#customer-name").value.trim();

    const phone =
        document.querySelector("#customer-phone").value.trim();

    const pickup =
        document.querySelector("#pickup-time").value;


    if (name === "") {

        showMessage("Please enter your name!");

        document.querySelector("#customer-name").focus();

        return;
    }


    if (phone === "") {

        showMessage("Please enter your mobile number!");

        document.querySelector("#customer-phone").focus();

        return;
    }


    if (phone.length < 10) {

        showMessage("Please enter a valid mobile number!");

        return;
    }


    if (pickup === "") {

        showMessage("Please choose a pickup time!");

        return;
    }


    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    if (!payment) {

        showMessage("Please choose a payment method!");

        return;
    }


    showMessage(
        "Details saved! Payment page coming next."
    );

}


// ==========================================
// ADD BUTTON CONNECTION
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const buttons =
            document.querySelectorAll(".add-btn");


        buttons.forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const card =
                        button.closest(".food-card");


                    const name =
                        card.querySelector("h3").innerText;


                    const priceText =
                        card.querySelector(".price").innerText;


                    const price =
                        parseInt(
                            priceText.replace("₹", "")
                        );


                    addToCart(name, price);

                }
            );

        });


        updateCart();

    }
);


// ==========================================
// SMALL MESSAGE
// ==========================================

function showMessage(message) {

    const oldMessage =
        document.querySelector(".canteen-message");

    if (oldMessage) {
        oldMessage.remove();
    }


    const messageBox =
        document.createElement("div");

    messageBox.className =
        "canteen-message";

    messageBox.innerText =
        "✓ " + message;


    messageBox.style.position = "fixed";

    messageBox.style.bottom = "25px";

    messageBox.style.left = "50%";

    messageBox.style.transform =
        "translateX(-50%)";

    messageBox.style.background =
        "#4f6834";

    messageBox.style.color =
        "white";

    messageBox.style.padding =
        "13px 20px";

    messageBox.style.borderRadius =
        "12px";

    messageBox.style.fontWeight =
        "bold";

    messageBox.style.zIndex =
        "9999";

    messageBox.style.boxShadow =
        "0 5px 20px rgba(0,0,0,0.2)";


    document.body.appendChild(messageBox);


    setTimeout(function() {

        if (messageBox) {
            messageBox.remove();
        }

    }, 1800);
}