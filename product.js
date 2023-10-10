"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
document.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var productId = urlParams.get('id');
    if (productId) {
        fetch("https://fakestoreapi.com/products/".concat(productId))
            .then(function (res) { return res.json(); })
            .then(function (data) {
            displayProductDetails(data);
        })
            .catch(function (error) {
            console.error("Error fetching product:", error);
        });
    }
    else {
        // Handle the case where no product ID is provided
        alert("Invalid product ID.");
    }
});
function displayProductDetails(product) {
    var productDetailContainer = document.getElementById('product-detail');
    if (productDetailContainer) {
        productDetailContainer.innerHTML = "\n        <div class=\"prod-page-card\">\n            <div class=\"prod-page-img\">\n                <img src=\"".concat(product.image, "\" alt=\"").concat(product.title, "\" class=\"img-fluid\">\n            </div>\n            <div class=\"prod-page-details\">\n                <h2 style=\"margin: 5px 0px 20px 0px\">").concat(product.title, "</h2>\n                <p>").concat(product.description, "</p>\n                <p style=\"margin: 5px 0px 20px 0px\"><strong>Price: \u20B9").concat(product.price, "</strong></p>\n                <p><strong>Category: ").concat(product.category, "</strong></p>\n                <button class=\"btn-cart\" onclick=\"addToCart('").concat(product.title, "', ").concat(product.price, ", '").concat(product.image, "')\">Add to Cart</button>\n            </div>\n            </div>\n        ");
    }
}
function addToCart(productName, productPrice, productImage) {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var productIndex = cart.findIndex(function (item) { return item.name === productName; });
    if (productIndex !== -1) {
        cart[productIndex].quantity += 1;
    }
    else {
        cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("".concat(productName, " added to cart."));
}
