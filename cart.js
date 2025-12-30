document.addEventListener("DOMContentLoaded", function () {
  displayCartItems();
});

function displayCartItems() {
  const container = document.getElementById("cart-items");
  const totalContainer = document.getElementById("cart-total");
  if (!container) return;

  container.innerHTML = "";
  totalContainer.innerHTML = "";

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty</p>";
    return;
  }

  let total = 0;

  cart.forEach(item => {
    total += item.price;

    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.name}" width="100" />
      <h4>${item.name}</h4>
      <p>Price: ₹${item.price}</p>
      <button onclick="removeFromCart('${item.productId}')">Remove from Cart</button>
      <hr/>
    `;
    container.appendChild(div);
  });

  totalContainer.innerHTML = `<h3>Total: ₹${total}</h3>`;
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.productId !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Removed from cart");
  displayCartItems(); // refresh UI
}


window.removeFromCart = removeFromCart;