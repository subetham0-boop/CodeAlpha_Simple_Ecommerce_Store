const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Temporary DB Arrays
let users = [];
let orders = [];
let products = [
    { id: 1, name: "Wireless Headphones", price: 99.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop" },
    { id: 2, name: "Premium Smart Watch", price: 149.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop" },
    { id: 3, name: "Ergonomic Gaming Mouse", price: 49.99, image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&auto=format&fit=crop" },
    { id: 4, name: "Mechanical Keyboard", price: 89.99, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop" },
    { id: 5, name: "Insulated Water Bottle", price: 24.99, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&auto=format&fit=crop" },
    { id: 6, name: "Minimalist Utility Backpack", price: 69.99, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop" }
];

// --- API ENDPOINTS ---

// 1. Fetch products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// 2. User Registration
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    const userExists = users.find(u => u.username === username);
    
    if(userExists) {
        return res.status(400).json({ message: "Username already taken." });
    }
    
    users.push({ username, password });
    res.status(201).json({ message: "Registration complete! You can log in now." });
});

// 3. User Login Validation
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const identityMatch = users.find(u => u.username === username && u.password === password);
    
    if(!identityMatch) {
        return res.status(401).json({ message: "Invalid credentials. Please verify entry." });
    }
    
    res.json({ message: "Logged in successfully!", username });
});

// 4. Order Finalization 
app.post('/api/orders', (req, res) => {
    const { username, items, total } = req.body;
    const newOrder = {
        orderId: Math.floor(100000 + Math.random() * 900000), // Random 6 digit order number
        customer: username,
        items,
        total,
        timestamp: new Date()
    };
    
    orders.push(newOrder);
    console.log("===== NEW ORDER RECORDED =====", newOrder);
    res.status(201).json({ message: "Order processed by server successfully.", orderId: newOrder.orderId });
});

app.listen(5000, () => console.log("Backend environment running smoothly on http://localhost:5000"));