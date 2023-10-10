document.addEventListener("DOMContentLoaded", () => {
    displayCartItems();
    calculateTotalPrice();
});

document.getElementById("productCards")!.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("add-to-cart")) {
        const productId = target.getAttribute("data-product-id");
        if (productId) {
            const products = JSON.parse(localStorage.getItem("products")!);
            const product = getProductById(productId);
            if (product) {
                addToCart(product); // Call the addToCart function here
            }
        }
    }
});



function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = getCartFromLocalStorage();

    cartItemsContainer.innerHTML = '';

    if (cart && cart.length > 0) {
        cart.forEach((cartItem) => {
            const cartItemElement = createCartItemElement(cartItem);
            cartItemsContainer.appendChild(cartItemElement);
        });
    } else {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    }
}

function createCartItemElement(cartItem) {
    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');

    cartItemElement.innerHTML = `
        <div class="cart-list d-flex align-items-center justify-content-between">
            <div class="cart-item-image d-flex align-items-center">
                <img class="card-img-top" src="${cartItem.image}" alt="${cartItem.title}">
                <p class="card-title" id="cart-title">${cartItem.title}</p>
            </div>
            
            <div class="cart-item-details d-flex" style="color: white;">
                <div class="denomination d-flex flex-column justify-content-center">
                    <p id="price" class="cart-list-price">$${cartItem.price}</p>
                    <div class="quantity-controls">
                        <button id="decrease" class="btn btn-primary decrease-quantity" data-product-id="${cartItem.id}">-</button>
                        <span id="quantity">${cartItem.quantity}</span>
                        <button id="increase" class="btn btn-primary increase-quantity" data-product-id="${cartItem.id}">+</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    return cartItemElement;
}


function calculateTotalPrice() {
    const cart = getCartFromLocalStorage();
    const totalPriceContainer = document.getElementById('total-price');

    if (cart && cart.length > 0) {
        const totalPrice = cart.reduce((total, cartItem) => {
            return total + (cartItem.price * cartItem.quantity);
        }, 0);
        totalPriceContainer.innerHTML = `Total Price: $${totalPrice}`;
    } else {
        totalPriceContainer.innerHTML = '';
    }
}

function getCartFromLocalStorage() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

function saveCartToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

document.getElementById('cart-items').addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains('decrease-quantity')) {
        const productId = target.getAttribute('data-product-id');
        if (productId) {
            decreaseQuantity(productId);
        }
    } else if (target.classList.contains('increase-quantity')) {
        const productId = target.getAttribute('data-product-id');
        if (productId) {
            increaseQuantity(productId);
        }
    }
});

function decreaseQuantity(productId) {
    const cart = getCartFromLocalStorage();
    const updatedCart = cart.map((cartItem) => {
        if (cartItem.id === productId) {
            if (cartItem.quantity > 1) {
                cartItem.quantity--;
            } else {
                // If quantity is 1 or less, remove the item from the cart
                updatedCart = updatedCart.filter((item) => item.id !== productId);
            }
        }
        return cartItem;
    });

    saveCartToLocalStorage(updatedCart);
    displayCartItems();
    calculateTotalPrice();
}

function increaseQuantity(productId) {
    const cart = getCartFromLocalStorage();
    const updatedCart = cart.map((cartItem) => {
        if (cartItem.id === productId) {
            cartItem.quantity++;
        }
        return cartItem;
    });

    saveCartToLocalStorage(updatedCart);
    displayCartItems();
    calculateTotalPrice();
}

