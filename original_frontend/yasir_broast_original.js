// ============================================
// YASIR BROAST - JAVASCRIPT
// ============================================

// --- Menu Data ---
const menuData = [
    {
        category: "Starters",
        icon: "fa-drumstick-bite",
        items: [
            { name: "Spicy Honey Wings", price: 790 },
            { name: "Chicken Chili Wings", price: 790 },
            { name: "Chicken Drumsticks", price: 750 },
            { name: "Prawn Tempura", price: 990 },
            { name: "Dynamite Prawns", price: 1090 },
            { name: "Chicken Tempura", price: 850 }
        ]
    },
    {
        category: "Burgers & Sandwiches",
        icon: "fa-hamburger",
        items: [
            { name: "Big Mouth Chicken Burger", price: 650 },
            { name: "House Special Cheese Burger", price: 750 },
            { name: "Chef Special Zinger Burger", price: 700 },
            { name: "Fish Burger", price: 600 },
            { name: "Grilled Chicken Club Sandwich", price: 750 },
            { name: "Chicken Club Sandwich", price: 690 },
            { name: "Grilled Chicken Sandwich", price: 600 }
        ]
    },
    {
        category: "Broast & Roast",
        icon: "fa-drumstick-bite",
        items: [
            { name: "Chicken Broast", price: 620 },
            { name: "Chicken Degi Roast / Steamed Roast", price: 950 },
            { name: "Chicken Breast Piece", price: 600 },
            { name: "Special Spicy Broast", price: 650 },
            { name: "Finger Fish", price: 590 }
        ]
    },
    {
        category: "Sajji",
        icon: "fa-fire",
        items: [
            { name: "Chicken Sajji", price: 1250 },
            { name: "Chicken Balochi Sajji with Rice", price: 1450 },
            { name: "Sajji Rice", price: 850 }
        ]
    },
    {
        category: "Pakistani Specialities",
        icon: "fa-utensils",
        items: [
            { name: "Chicken Karahi", price: 950 },
            { name: "Chicken White Karahi", price: 1050 },
            { name: "Mutton Karahi", price: 1450 },
            { name: "Mutton Kunna", price: 1550 },
            { name: "Chicken Biryani", price: 850 },
            { name: "Mutton Biryani", price: 1250 }
        ]
    },
    {
        category: "Chicken Handi",
        icon: "fa-bowl-food",
        items: [
            { name: "Chicken Handi", price: 950 },
            { name: "Chicken Achari Handi", price: 1050 },
            { name: "Chicken Badami Handi", price: 1150 }
        ]
    },
    {
        category: "BBQ",
        icon: "fa-fire-flame-curved",
        items: [
            { name: "Chicken Kabab", price: 650 },
            { name: "Chicken Cheese Kabab", price: 750 },
            { name: "Chicken Reshmi Kabab", price: 720 },
            { name: "Chicken Hara Bhara Kabab", price: 690 },
            { name: "Chicken Boti", price: 700 },
            { name: "Chicken Herb Boti", price: 750 }
        ]
    },
    {
        category: "Chinese",
        icon: "fa-egg",
        items: [
            { name: "Chicken Chili Dry", price: 850 },
            { name: "Chicken Black Pepper", price: 850 },
            { name: "Chicken Chow Mein", price: 780 },
            { name: "Chicken Manchurian with Rice", price: 850 },
            { name: "Chicken Shashlik with Rice", price: 890 },
            { name: "Crispy Chicken", price: 820 },
            { name: "Mongolian Chicken", price: 850 },
            { name: "Chicken Cashew Nuts", price: 850 },
            { name: "Sesame Chicken", price: 850 },
            { name: "Szechuan Chicken", price: 850 },
            { name: "Chicken with Almond & Vegetable", price: 890 }
        ]
    },
    {
        category: "Rice",
        icon: "fa-bowl-rice",
        items: [
            { name: "Chicken Biryani", price: 850 },
            { name: "Mutton Biryani", price: 1250 },
            { name: "Masala Fried Rice", price: 750 },
            { name: "Steamed Rice", price: 350 },
            { name: "Sajji Rice", price: 850 }
        ]
    },
    {
        category: "Salads & Raita",
        icon: "fa-carrot",
        items: [
            { name: "Yasir Salad", price: 350 },
            { name: "Russian Salad", price: 400 },
            { name: "Raita", price: 250 }
        ]
    },
    {
        category: "Fast Food",
        icon: "fa-burger",
        items: [
            { name: "Zinger Burger", price: 620 },
            { name: "Grilled Chicken Burger", price: 580 },
            { name: "Chicken Crunch Sandwich", price: 550 },
            { name: "Malai Chicken Wrap", price: 540 },
            { name: "Chicken Tikka Wrap", price: 560 },
            { name: "Vegetable Paratha Roll", price: 450 },
            { name: "Fries", price: 350 }
        ]
    },
    {
        category: "Beverages",
        icon: "fa-glass-water",
        items: [
            { name: "Soft Drinks", price: 150 },
            { name: "Fresh Lime", price: 180 },
            { name: "Mineral Water", price: 100 },
            { name: "Juices / Shakes", price: 250 }
        ]
    }
];

// --- Render Menu on Index Page ---
function renderMenu() {
    const menuGrid = document.getElementById('menu-grid');
    if (!menuGrid) return;

    menuGrid.innerHTML = '';

    menuData.forEach((cat, catIndex) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'menu-category';
        categoryDiv.style.animationDelay = (catIndex * 0.15) + 's';

        let itemsHTML = '';
        cat.items.forEach(item => {
            itemsHTML += `
                <div class="menu-item">
                    <span>${item.name}</span>
                    <span class="price">PKR ${item.price}</span>
                </div>
            `;
        });

        categoryDiv.innerHTML = `
            <h3><i class="fas ${cat.icon}"></i> ${cat.category}</h3>
            ${itemsHTML}
        `;
        menuGrid.appendChild(categoryDiv);
    });
}

// --- Order Page Logic ---
let cart = [];

function renderOrderMenu() {
    const orderMenuContainer = document.getElementById('order-menu-container');
    if (!orderMenuContainer) return;

    orderMenuContainer.innerHTML = '';

    menuData.forEach((cat, catIndex) => {
        const catDiv = document.createElement('div');
        catDiv.className = 'order-category';
        catDiv.style.animationDelay = (catIndex * 0.1) + 's';

        let itemsHTML = '';
        cat.items.forEach((item, itemIndex) => {
            itemsHTML += `
                <div class="order-item">
                    <div class="item-info">
                        <span class="name">${item.name}</span>
                        <span class="price">PKR ${item.price}</span>
                    </div>
                    <button class="add-btn" onclick="addToCart(${catIndex}, ${itemIndex})">
                        <i class="fas fa-plus"></i> Add
                    </button>
                </div>
            `;
        });

        catDiv.innerHTML = `<h3><i class="fas ${cat.icon}"></i> ${cat.category}</h3>${itemsHTML}`;
        orderMenuContainer.appendChild(catDiv);
    });
}

function addToCart(catIndex, itemIndex) {
    const item = menuData[catIndex].items[itemIndex];

    const existingItem = cart.find(cartItem => cartItem.name === item.name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: item.name,
            price: item.price,
            quantity: 1
        });
    }

    updateCartUI();

    // Visual feedback
    showToast(`Added ${item.name} to cart!`);
}

function removeFromCart(index) {
    const removed = cart[index];
    cart.splice(index, 1);
    updateCartUI();
    if (removed) showToast(`Removed ${removed.name} from cart`);
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<li style="color: #777; text-align: center; padding: 20px 0;">Your cart is empty.</li>';
    } else {
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const li = document.createElement('li');
            li.className = 'cart-item';
            li.innerHTML = `
                <div>
                    <strong>${item.name}</strong> <br>
                    <small style="color: var(--text-muted);">${item.quantity} × PKR ${item.price}</small>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span class="item-total">PKR ${itemTotal}</span>
                    <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #e74c3c; cursor: pointer; font-size: 1rem;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(li);
        });
    }

    totalPriceElement.textContent = `PKR ${total}`;
}

function placeOrder() {
    const address = document.getElementById('address').value;

    if (cart.length === 0) {
        showToast("Please add some items to your cart first!", "error");
        return;
    }

    if (!address.trim()) {
        showToast("Please enter your delivery address!", "error");
        return;
    }

    const total = document.getElementById('total-price').textContent;
    showToast(`Order Placed! Total: ${total}`, "success");

    setTimeout(() => {
        alert(`✅ Order Placed Successfully!\n\nTotal: ${total}\nDelivery Address: ${address}\n\nThank you for choosing Yasir Broast!`);
    }, 300);

    cart = [];
    document.getElementById('address').value = '';
    updateCartUI();
}

// --- Toast Notification ---
function showToast(message, type = "success") {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${type === "error" ? '#e74c3c' : 'linear-gradient(145deg, #f1c40f, #e67e22)'};
        color: ${type === "error" ? '#fff' : '#000'};
        padding: 14px 24px;
        border-radius: 40px;
        font-weight: 600;
        z-index: 9999;
        box-shadow: 0 0 30px rgba(241,196,15,0.7);
        animation: slideInRight 0.4s ease-out;
        font-family: 'Poppins', sans-serif;
        font-size: 0.9rem;
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.transition = 'all 0.4s';
        toast.style.transform = 'translateX(150%)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 400);
    }, 2500);
}

// Add toast animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(150%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

// --- Dynamic Sizzle Particles ---
function createSizzles() {
    for (let i = 0; i < 15; i++) {
        const s = document.createElement('div');
        s.className = 'sizzle';
        s.style.left = Math.random() * 100 + '%';
        s.style.top = Math.random() * 100 + '%';
        s.style.animationDelay = (Math.random() * 4) + 's';
        s.style.animationDuration = (3 + Math.random() * 3) + 's';
        const size = (2 + Math.random() * 4) + 'px';
        s.style.width = size;
        s.style.height = size;
        document.body.appendChild(s);
    }
}

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    renderOrderMenu();
    updateCartUI();
    createSizzles();
});