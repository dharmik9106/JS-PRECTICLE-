/* Product array */
let products = [];

/* Add Product */
function addProduct() {
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").value;
  const category = document.getElementById("category").value;

  if (title === "" || price === "") {
    alert("Title and Price are required");
    return;
  }

  const product = {
    id: Date.now(),
    title,
    price: Number(price),
    image,
    category
  };

  products.push(product);
  saveToLocalStorage();
  displayProducts();
  clearInputs();
}

/* Display Products */
function displayProducts() {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach(p => {
    list.innerHTML += `
      <div class="product-card">
        <img src="${p.image || 'https://via.placeholder.com/300'}" />
        <h3>${p.title}</h3>
        <p class="price">₹ ${p.price}</p>
        <p class="category">${p.category || 'General'}</p>

        <div class="actions">
          <button class="btn" onclick="editProduct(${p.id})">Edit</button>
          <button class="btn" onclick="deleteProduct(${p.id})">Delete</button>
        </div>
      </div>
    `;
  });
}

/* Save to Local Storage */
function saveToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

/* Load from Local Storage */
function loadFromLocalStorage() {
  const data = localStorage.getItem("products");
  if (data) {
    products = JSON.parse(data);
    displayProducts();
  }
}

/* Edit Product */
function editProduct(id) {
  const product = products.find(p => p.id === id);

  document.getElementById("title").value = product.title;
  document.getElementById("price").value = product.price;
  document.getElementById("image").value = product.image;
  document.getElementById("category").value = product.category;

  deleteProduct(id);
}

/* Delete Product */
function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  saveToLocalStorage();
  displayProducts();
}

/* Sort Low to High */
function sortLowToHigh() {
  products.sort((a, b) => a.price - b.price);
  displayProducts();
}

/* Sort High to Low */
function sortHighToLow() {
  products.sort((a, b) => b.price - a.price);
  displayProducts();
}

/* Search Product */
function searchProduct(text) {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(text.toLowerCase())
  );

  filtered.forEach(p => {
    list.innerHTML += `
      <div class="product-card">
        <img src="${p.image || 'https://via.placeholder.com/300'}" />
        <h3>${p.title}</h3>
        <p class="price">₹ ${p.price}</p>
        <p class="category">${p.category || 'General'}</p>
      </div>
    `;
  });
}

/* Clear Inputs */
function clearInputs() {
  document.getElementById("title").value = "";
  document.getElementById("price").value = "";
  document.getElementById("image").value = "";
  document.getElementById("category").value = "";
}

/* On Page Load */
window.onload = loadFromLocalStorage;
