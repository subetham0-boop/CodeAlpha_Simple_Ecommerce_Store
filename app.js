const BACKEND_URL = "http://localhost:5000/api";
let cart = [];

// 1. Ask the backend for products and display them on the screen
async function loadProducts() {
    try {
        const response = await fetch(`${BACKEND_URL}/products`);
        const products = await response.json();
        
        const container = document.getElementById('products');
        container.innerHTML = products.map(prod => `
            <div class="card">
                <img src="${prod.image}" alt="${prod.name}">
                <h3>${prod.name}</h3>
                <p>$${prod.price}</p>
                <button onclick="addToCart('${prod.name}', ${prod.price})">Add to Cart</button>
            </div>
        `).join('');
    } catch (error) {
        console.error("Could not fetch products from backend", error);
    }
}

// 2. Add an item to the local cart array and update the screen
function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
}

function updateCartUI() {
    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        checkoutBtn.style.display = "none";
        return;
    }

    cartContainer.innerHTML = cart.map(item => `<p>${item.name} - $${item.price}</p>`).join('');
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalContainer.innerText = `Total: $${total.toFixed(2)}`;
    checkoutBtn.style.display = "block";
}

// 3. Send the completed cart data to the backend server
async function sendOrderToBackend() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const response = await fetch(`${BACKEND_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart, total: total })
    });

    const data = await response.json();
    alert(`${data.message} Your Order ID is: ${data.orderId}`);
    
    // Clear cart after successful checkout
    cart = [];
    updateCartUI();
}

// Automatically load products when the webpage opens
window.onload = loadProducts;