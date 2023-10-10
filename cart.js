document.addEventListener("DOMContentLoaded", function () {
    displayCartItems();
    calculateTotalPrice();
});
document.getElementById("productCards").addEventListener("click", function (event) {
    var target = event.target;
    if (target.classList.contains("add-to-cart")) {
        var productId = target.getAttribute("data-product-id");
        if (productId) {
            var products = JSON.parse(localStorage.getItem("products"));
            var product = getProductById(productId);
            if (product) {
                addToCart(product);
                currentPrice = product.price; // Initialize currentPrice
            }
        }
    }
});
var currentPrice = 0; // Initialize the currentPrice
function displayCartItems() {
    var cartItemsContainer = document.getElementById('cart-items');
    var cart = getCartFromLocalStorage();
    cartItemsContainer.innerHTML = '';
    if (cart && cart.length > 0) {
        cart.forEach(function (cartItem) {
            var cartItemElement = createCartItemElement(cartItem);
            cartItemsContainer.appendChild(cartItemElement);
        });
    }
    else {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    }
}
function createCartItemElement(cartItem) {
    var cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');
    cartItemElement.innerHTML = "\n        <div class=\"cart-list d-flex align-items-center justify-content-between\">\n            <div class=\"cart-item-image d-flex align-items-center\">\n                <img class=\"card-img-top\" src=\"".concat(cartItem.image, "\" alt=\"").concat(cartItem.title, "\">\n                <p class=\"card-title\" id=\"cart-title\">").concat(cartItem.title, "</p>\n            </div>\n            \n            <div class=\"cart-item-details d-flex\" style=\"color: white;\">\n                <div class=\"denomination d-flex flex-column justify-content-center\">\n                    <p id=\"price\" class=\"cart-list-price\">$").concat(cartItem.price, "</p>\n                    <div class=\"quantity-controls\">\n                        <button onclick=decreaseQuantity(").concat(cartItem.id, ") id=\"decrease\" class=\"btn btn-primary decrease-quantity\" data-product-id=\"").concat(cartItem.id, "\">-</button>\n                        <span id=\"quantity\">").concat(cartItem.quantity, "</span>\n                        <button onclick=increaseQuantity(").concat(cartItem.id, ") id=\"increase\" class=\"btn btn-primary increase-quantity\" data-product-id=\"").concat(cartItem.id, "\">+</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ");
    return cartItemElement;
}
function calculateTotalPrice() {
    var cart = getCartFromLocalStorage();
    var totalPriceContainer = document.getElementById('total-price');
    if (cart && cart.length > 0) {
        var totalPrice = cart.reduce(function (total, cartItem) {
            return total + (cartItem.price * cartItem.quantity);
        }, 0);
        totalPriceContainer.innerHTML = "Total Price: $".concat(totalPrice);
    }
    else {
        totalPriceContainer.innerHTML = '';
    }
}
function getCartFromLocalStorage() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}
function saveCartToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}
document.getElementById('cart-items').addEventListener('click', function (event) {
    var target = event.target;
    if (target.classList.contains('decrease-quantity')) {
        var productId = target.getAttribute('data-product-id');
        if (productId) {
            decreaseQuantity(productId);
        }
    }
    else if (target.classList.contains('increase-quantity')) {
        var productId = target.getAttribute('data-product-id');
        if (productId) {
            increaseQuantity(productId);
        }
    }
});
function decreaseQuantity(productId) {
    var cart = getCartFromLocalStorage();
    var updatedCart = cart.map(function (cartItem) {
        if (cartItem.id === productId) {
            if (cartItem.quantity > 1) {
                cartItem.quantity--;
                cartItem.price = cartItem.price * cartItem.quantity;
            }
            else {
                // If quantity is 1 or less, remove the item from the cart
                return null; // Set the item to null to filter it out
            }
        }
        return cartItem;
    });
    updatedCart = updatedCart.filter(function (item) { return item !== null; }); // Remove null items
    saveCartToLocalStorage(updatedCart);
    displayCartItems();
    calculateTotalPrice();
}
function increaseQuantity(productId) {
    var cart = getCartFromLocalStorage();
    var updatedCart = cart.map(function (cartItem) {
        if (cartItem.id === productId) {
            cartItem.quantity++;
            cartItem.price = cartItem.price * cartItem.quantity;
        }
        return cartItem;
    });
    saveCartToLocalStorage(updatedCart);
    displayCartItems();
    calculateTotalPrice();
}
