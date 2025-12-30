

import { apiconnector } from './apiconnector.js';
import { productEndpoints,orderEndpoints  } from './api.js';
const form = document.getElementById("product-form");

form.addEventListener("submit",async(e)=> {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("user"));
//   localStorage.setItem("user", JSON.stringify({
//   token: "eyJhbGciOiJIUzI1NiIsInR...",
//   accountType: "Admin"
// }));
  if (!user || !user.token|| !user.accountType) {
    alert("You must be logged in as Admin to create a product");
    return;
  }

  const product = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    imageUrl: document.getElementById("imageUrl").value,
   
    stock: document.getElementById("stock").value,
  };

  try {
    const response=await apiconnector("POST",productEndpoints.CREATEPRODUCT_API,product,
      {
        Authorization: `Bearer ${user.token}`,
      });
   
    if (response.data.success) {
      alert("Product created successfully");
      form.reset();
    } else {
      alert("Error: " + response.data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Server error while creating product");
  }
});




//show all product
document.getElementById("show-products-btn").addEventListener("click", showAllProducts);

async function showAllProducts() {
  try {
    const res = await apiconnector("GET", productEndpoints.SHOWALLPRODUCT_API);
    console.log("Response:", res.data);
    const products = res.data.data;

    if (!Array.isArray(products)) {
      alert("Invalid product list received");
      return;
    }

    const container = document.getElementById("all-products");
    container.innerHTML = "";

 products.forEach(p => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isUser = user && user.accountType === "User";
const isAdmin = user && user.accountType === "Admin";
  const addToCartBtn = isUser
    ? `<button onclick="addToCart('${p._id}', '${p.name}', ${p.price}, '${p.imageUrl}')">Add to Cart</button>`
    : '';

      const placeOrderBtn = isUser
    ? `<button onclick="placeSingleOrder('${p._id}', '${p.name}', ${p.price}, '${p.imageUrl}')">Place Order</button>`
    : '';

    const editBtn = isAdmin
  ? `<button onclick="editProduct('${p._id}', '${p.name}', '${p.description}', ${p.price}, '${p.imageUrl}', ${p.stock})">Edit</button>`
  : '';

const deleteBtn = isAdmin
  ? `<button onclick="deleteProduct('${p._id}')">Delete</button>`
  : '';
  container.innerHTML += `
    <div style="border:1px solid #ccc; padding:10px; margin:10px;">
   
      <p><strong>Name:</strong> ${p.name}</p>
      <p><strong>Description:</strong> ${p.description}</p>
      <p><strong>Price:</strong> ₹${p.price}</p>
      <p><strong>Stock:</strong> ${p.stock}</p>
      <img src="${p.imageUrl}" alt="${p.name}" style="max-width:150px; height:auto;" />
      ${addToCartBtn}
       ${placeOrderBtn}
       ${editBtn}
       ${deleteBtn}
    </div>`;
});
  } catch (err) {
    console.error(err);
    alert("Error fetching products");
  }
}


// Add to Cart Function
window.addToCart = function(productId, name, price, imageUrl) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const exists = cart.find(item => item.productId === productId);
  if (exists) {
    alert("Product already in cart");
    return;
  }

  cart.push({ productId, name, price, imageUrl });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}



window.placeSingleOrder = async function (productId, name, price, imageUrl) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.accountType !== "User") {
    alert("You must be logged in as a User to place an order.");
    return;
  }

  try {
    const totalamount = price;

    const items = [
      {
        productId,
        quantity: 1
      }
    ];

    const res = await apiconnector("POST", orderEndpoints.CREATEORDER_API, {
      totalamount,
      items,
      userId: user._id
    });

    if (res.data.success) {
      alert("✅ Order placed successfully!");
    } else {
      alert("❌ Failed to place order: " + res.data.message);
    }
  } catch (error) {
    console.error("Order placement error:", error);
    alert("🚫 Error placing order");
  }
};



//update product
// update product
document.getElementById("update-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("user"));
  const token=localStorage.getItem("token");
  if (!user || !token || user.accountType !== "Admin") {
    alert("Only admin can update products.");
    return;
  }
  const data = {
    productId: document.getElementById("update-productId").value.trim(),  // Fix here
    name: document.getElementById("update-name").value.trim(),
    description: document.getElementById("update-description").value.trim(),
    price: Number(document.getElementById("update-price").value),
    imageUrl: document.getElementById("update-imageUrl").value.trim(),
    stock: Number(document.getElementById("update-stock").value),
  };
console.log("Sending data to backend:", data);
  try {
    const res = await apiconnector("PUT", productEndpoints.UPDATEPRODUCT_API, data);
    alert(res.data.message || "Product updated");
    showAllProducts();
  } catch (err) {
    console.error("Error updating product:", err);
    alert("Failed to update product");
  }
});


window.editProduct = function editProduct(id, name, description, price, imageUrl, stock) {
  document.getElementById("update-productId").value = id;
  document.getElementById("update-name").value = name;
  document.getElementById("update-description").value = description;
  document.getElementById("update-price").value = price;
  document.getElementById("update-imageUrl").value = imageUrl;
  document.getElementById("update-stock").value = stock;

  // Scroll to the update form
  document.getElementById("update-form").scrollIntoView({ behavior: "smooth" });
}


//delete field
// Delete Product
document.getElementById("delete-form").addEventListener("submit", async (e) => {
  e.preventDefault();
 const user = JSON.parse(localStorage.getItem("user"));
  const token=localStorage.getItem("token");
  if (!user || !token || user.accountType !== "Admin") {
    alert("Only admin can update products.");
    return;
  }
  const data = {
    productId: document.getElementById("delete-productId").value.trim(),
  };

  console.log("Sending delete data to backend:", data);

  try {
    const res = await apiconnector("DELETE", productEndpoints.DELETEPRODUCT_API, data);
    alert(res.data.message || "Product deleted");
    showAllProducts();
  } catch (err) {
    console.error("Error deleting product:", err.response?.data || err.message);
    alert("Failed to delete product");
  }
});

window.deleteProduct = function deleteProduct(productId) {
  document.getElementById("delete-productId").value = productId;

  // Scroll to delete form
  document.getElementById("delete-form").scrollIntoView({ behavior: "smooth" });
};





document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const adminControls = document.getElementById("admin-controls");
  const showProductsSection = document.getElementById("show-products-section");

  // If no user, redirect to login
  if (!user || !user.token || !user.accountType) {
    alert("You must be logged in.");
    window.location.href = "login.html"; // or your login page
    return;
  }

  // If Admin, show everything
  if (user.accountType === "Admin") {
    adminControls.style.display = "block";
    showProductsSection.style.display = "block";
  }

  // If User, show only products
  else if (user.accountType === "User") {
    adminControls.style.display = "none";
    showProductsSection.style.display = "block";
  }

  // If unknown accountType, hide everything
  else {
    adminControls.style.display = "none";
    showProductsSection.style.display = "none";
    alert("Invalid user role");
  }
});
