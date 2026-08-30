/* ============================
   CART DATA
============================ */

let cart = [];


/* ============================
   OPEN HOME
============================ */

function openHome() {

    document
        .getElementById("welcomePage")
        .classList.add("hidden");

    document
        .getElementById("appPage")
        .classList.remove("hidden");

}


/* ============================
   PAGE NAVIGATION
============================ */

function showPage(pageId) {

    const pages = [
        "homePage",
        "detailPage",
        "datesPage",
        "cartPage"
    ];

    pages.forEach(function(id) {

        document
            .getElementById(id)
            .classList.add("hidden");

    });


    document
        .getElementById(pageId)
        .classList.remove("hidden");


    document
        .querySelector(".app-page > main:not(.hidden)")
        ?.scrollTo(0,0);


    updateNavigation(pageId);


    if (pageId === "cartPage") {

        renderCart();

    }

}


/* ============================
   BOTTOM NAVIGATION
============================ */

function updateNavigation(pageId) {

    const buttons =
        document.querySelectorAll("nav button");

    buttons.forEach(function(button) {

        button.classList.remove("active");

    });


    if (pageId === "homePage") {

        buttons[0].classList.add("active");

    }

    else if (pageId === "datesPage") {

        buttons[1].classList.add("active");

    }

}


/* ============================
   ADD PRODUCT
============================ */

function addToCart() {

    addItem(
        "Premium Royal Delight Hamper",
        2299
    );

}


/* ============================
   ADD DATE
============================ */

function addDate(name, price) {

    addItem(name, price);

}


/* ============================
   ADD ITEM
============================ */

function addItem(name, price) {

    const existing =
        cart.find(function(item) {

            return item.name === name;

        });


    if (existing) {

        existing.quantity++;

    }

    else {

        cart.push({

            name: name,

            price: price,

            quantity: 1

        });

    }


    updateCartCount();

    showToast(
        name + " added to cart"
    );

}


/* ============================
   UPDATE CART COUNT
============================ */

function updateCartCount() {

    const count =
        cart.reduce(
            function(total, item) {

                return total + item.quantity;

            },
            0
        );


    document
        .getElementById("cartCount")
        .textContent = count;

}


/* ============================
   RENDER CART
============================ */

function renderCart() {

    const container =
        document.getElementById("cartItems");

    const empty =
        document.getElementById("emptyCart");

    const summary =
        document.getElementById("cartSummary");


    if (cart.length === 0) {

        container.innerHTML = "";

        empty.classList.remove("hidden");

        summary.classList.add("hidden");

        return;

    }


    empty.classList.add("hidden");

    summary.classList.remove("hidden");


    let total = 0;


    container.innerHTML =
        cart.map(function(item, index) {

            total +=
                item.price *
                item.quantity;


            return `

                <div class="cart-item">

                    <div class="cart-item-image">
                        🎁
                    </div>

                    <div class="cart-item-info">

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            ₹${item.price}
                        </p>

                        <div class="quantity">

                            <button
                                onclick="changeQuantity(${index},-1)"
                            >
                                −
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                onclick="changeQuantity(${index},1)"
                            >
                                +
                            </button>

                            <button
                                onclick="removeItem(${index})"
                            >
                                ×
                            </button>

                        </div>

                    </div>

                </div>

            `;

        })
        .join("");


    document
        .getElementById("totalPrice")
        .textContent =
        "₹" + total.toLocaleString("en-IN");

}


/* ============================
   CHANGE QUANTITY
============================ */

function changeQuantity(index, amount) {

    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCartCount();

    renderCart();

}


/* ============================
   REMOVE ITEM
============================ */

function removeItem(index) {

    cart.splice(index, 1);

    updateCartCount();

    renderCart();

}


/* ============================
   SEARCH
============================ */

function searchProducts() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    const products =
        document.querySelectorAll(".product");


    products.forEach(function(product) {

        const name =
            product.dataset.name || "";


        if (name.includes(search)) {

            product.style.display =
                "block";

        }

        else {

            product.style.display =
                "none";

        }

    });

}


/* ============================
   DATE FILTER
============================ */

function filterDates(type, button) {

    document
        .querySelectorAll(".filters button")
        .forEach(function(btn) {

            btn.classList.remove("active");

        });


    button.classList.add("active");


    document
        .querySelectorAll(".date-card")
        .forEach(function(card) {

            const date =
                card.dataset.date;


            if (type === "all") {

                card.style.display =
                    "flex";

            }

            else {

                card.style.display =
                    date === type
                    ? "flex"
                    : "none";

            }

        });

}


/* ============================
   BUY NOW
============================ */

function buyNow() {

    addToCart();

    showPage("cartPage");

}


/* ============================
   CHECKOUT
============================ */

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    alert(
        "Thank you for shopping with Bellanuts! 🎁\n\n" +
        "Your checkout system can be connected to Razorpay or another payment gateway."
    );

}


/* ============================
   MENU
============================ */

function openMenu() {

    alert(
        "Bellanuts Menu\n\n" +
        "Home\n" +
        "Dry Fruits\n" +
        "Dates\n" +
        "Gift Hampers\n" +
        "Combos\n" +
        "Orders\n" +
        "Profile"
    );

}


/* ============================
   TOAST MESSAGE
============================ */

function showToast(message) {

    const toast =
        document.createElement("div");


    toast.className = "toast";

    toast.textContent = message;


    document.body.appendChild(toast);


    setTimeout(function() {

        toast.remove();

    }, 1800);

}


/* ============================
   INITIALIZATION
============================ */

document
    .getElementById("appPage")
    .classList.add("hidden");


updateCartCount();
