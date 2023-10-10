// Event Listeners for all the categories
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('categoryAll').addEventListener('click', function () {
        localStorage.removeItem('selectedCategory');
        displayProducts(JSON.parse(localStorage.getItem('products')));
    });
    document.getElementById('categoryMens').addEventListener('click', function () {
        localStorage.setItem('selectedCategory', 'men\'s clothing');
        displayProducts(JSON.parse(localStorage.getItem('products')));
    });
    document.getElementById('categoryWomens').addEventListener('click', function () {
        localStorage.setItem('selectedCategory', 'women\'s clothing');
        displayProducts(JSON.parse(localStorage.getItem('products')));
    });
    document.getElementById('categoryHardware').addEventListener('click', function () {
        localStorage.setItem('selectedCategory', 'electronics');
        displayProducts(JSON.parse(localStorage.getItem('products')));
    });
    document.querySelector('.material-symbols-outlined').addEventListener('click', function () {
        window.location.href = 'cart.html';
    });
    document.getElementById("productCards").addEventListener("click", function (event) {
        var target = event.target;
        if (target.classList.contains("add-to-cart")) {
            var productId = target.getAttribute("data-product-id");
            if (productId) {
                // Get the product details
                var product = getProductById(productId);
                // Add the product to the cart
                addToCart(product);
                // Redirect to the cart page
                window.location.href = 'cart.html';
            }
        }
    });
    document.querySelector('.navbar-brand').addEventListener('click', function () {
        localStorage.removeItem('selectedCategory');
        window.location.href = 'index.html';
    });
});
// Function to get a product by its ID
function getProductById(productId) {
    var products = JSON.parse(localStorage.getItem("products"));
    return products.find(function (product) { return product.id === parseInt(productId); });
}
function getCartItemsFromLocalStorage() {
    var cartJson = localStorage.getItem("cart");
    return cartJson ? JSON.parse(cartJson) : [];
}
function saveCartToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function addToCart(product) {
    var cart = getCartItemsFromLocalStorage();
    var existingCartItem = cart.find(function (cartItem) { return cartItem.id === product.id; });
    if (existingCartItem) {
        existingCartItem.quantity++;
    }
    else {
        cart.push({
            id: product.id,
            title: product.title,
            image: product.image,
            price: product.price,
            quantity: 1,
        });
    }
    saveCartToLocalStorage(cart);
}
function fetchAndDisplayProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var response, products, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('https://fakestoreapi.com/products')];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    products = _a.sent();
                    localStorage.setItem('products', JSON.stringify(products));
                    console.log(products);
                    displayProducts(products);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Displaying the products using the local storage
function displayProducts(products) {
    var productCardsContainer = document.getElementById('productCards');
    var selectedCategory = localStorage.getItem('selectedCategory');
    var filteredProducts = selectedCategory
        ? products.filter(function (product) { return product.category === selectedCategory; })
        : products;
    productCardsContainer.innerHTML = '';
    filteredProducts.forEach(function (product) {
        if (isValidProduct(product)) {
            var card = document.createElement('div');
            card.classList.add('col-md-4', 'mb-4', 'col-lg-3');
            card.innerHTML = "\n            <div class=\"card\" data-product-id=\"".concat(product.id, "\">\n                <div class=\"image-container\">\n                    <img src=\"").concat(product.image, "\" class=\"card-img-top\" alt=\"").concat(product.title, "\">\n                </div>\n                <div class=\"card-body\">\n                    <h5 class=\"card-title\">").concat(product.title, "</h5>\n                    <div class=\"card-details-button d-flex justify-content-center flex-column align-items-center\">\n                        <div class=\"prod-details d-flex justify-content-center flex-column align-items-center\">\n                            <p class=\"card-text\" id=\"ratings\">Rating: ").concat(product.rating.rate, " <span class=\"rating-count\">(").concat(product.rating.count, " reviews)</span></p>\n                            <p class=\"card-text\" id=\"price\">$").concat(product.price, "</p>\n                        </div>\n                        <button id=\"add-cart-button\" class=\"btn btn-primary add-to-cart d-flex justify-content-center align-items-center rounded-circle p-20\" data-product-id=\"").concat(product.id, "\">\n                            <span class=\"material-symbols-rounded\">\n                                add_shopping_cart\n                            </span>\n                        </button>\n                    </div>\n                </div>\n            </div>\n        ");
            productCardsContainer.appendChild(card);
        }
    });
}
// Checking the data type and validity for the object product
function isValidProduct(product) {
    return (typeof product === 'object' &&
        product !== null &&
        typeof product.id === 'number' &&
        typeof product.title === 'string' &&
        typeof product.image === 'string' &&
        typeof product.rating === 'object' &&
        typeof product.rating.rate === 'number' &&
        typeof product.rating.count === 'number' &&
        typeof product.price === 'number' &&
        !isNaN(product.price));
}
// function ratings(product) {
//     let starIcons = '';
//     if (product.rate == 1) {
//         starIcons = '<i class="bi bi-star-fill"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>';
//     }
//     else if (product.rate > 1 && product.rate < 2) {
//         product.rate = '<i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>'
//     }
//     else if (product.rate == 2) {
//         product.rate = '<i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>'
//     }
//     else if (product.rate > 2 && product.rate < 3) {
//         product.rate = '<i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>'
//     }
//     else if (product.rate == 3) {
//         product.rate = '<i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>'
//     }
//     else if (product.rate > 3 && product.rate < 4) {
//         product.rate = '<i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i><i class="bi bi-star"></i>'
//     }
//     else if (product.rate == 4) {
//         product.rate = '<i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star"></i>'
//     }
//     else if (product.rate > 4 && product.rate < 5) {
//         product.rate = '<i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i>'
//     }
//     else if (product.rate == 5) {
//         product.rate = '<i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>'
//     }
//     return starIcons;
// }
fetchAndDisplayProducts();
