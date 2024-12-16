let products = [];

// Add product to the system
function addProduct() {
    const productId = document.getElementById("productId").value;
    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;

    if (!productId || !productName || !productPrice) {
        displayMessage("Please fill in all fields!", "red");
        return;
    }

    // Check if product already exists
    if (products.some(product => product.productId === productId)) {
        displayMessage("Product with this ID already exists.", "red");
        return;
    }

    const newProduct = { productId, productName, productPrice };
    products.push(newProduct);
    displayMessage(`Product "${productName}" added successfully.`, "green");
    renderProducts();
    clearForm();
}

// Update product information
function updateProduct() {
    const productId = document.getElementById("productId").value;
    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;

    if (!productId || !productName || !productPrice) {
        displayMessage("Please fill in all fields!", "red");
        return;
    }

    const product = products.find(product => product.productId === productId);
    if (!product) {
        displayMessage("Product not found!", "red");
        return;
    }

    product.productName = productName;
    product.productPrice = productPrice;

    displayMessage(`Product "${productName}" updated successfully.`, "green");
    renderProducts();
    clearForm();
}

// Delete a product
function deleteProduct(productId) {
    products = products.filter(product => product.productId !== productId);
    displayMessage(`Product with ID ${productId} deleted.`, "green");
    renderProducts();
}

// Edit product data (populate form with product data)
function editProduct(productId) {
    const product = products.find(product => product.productId === productId);
    if (product) {
        document.getElementById("productId").value = product.productId;
        document.getElementById("productName").value = product.productName;
        document.getElementById("productPrice").value = product.productPrice;
    }
}

// Display message
function displayMessage(message, color) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
    messageElement.style.color = color;
}

// Render products to table
function renderProducts() {
    const tbody = document.getElementById("productTable").getElementsByTagName('tbody')[0];
    tbody.innerHTML = "";

    products.forEach(product => {
        const row = document.createElement("tr");

        const cellId = document.createElement("td");
        cellId.textContent = product.productId;
        row.appendChild(cellId);

        const cellName = document.createElement("td");
        cellName.textContent = product.productName;
        row.appendChild(cellName);

        const cellPrice = document.createElement("td");
        cellPrice.textContent = `$${product.productPrice}`;
        row.appendChild(cellPrice);

        const cellActions = document.createElement("td");
        cellActions.innerHTML = `
            <button onclick="editProduct('${product.productId}')">Edit</button>
            <button onclick="deleteProduct('${product.productId}')">Delete</button>
        `;
        row.appendChild(cellActions);

        tbody.appendChild(row);
    });
}

// Clear form after action
function clearForm() {
    document.getElementById("productId").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
}
