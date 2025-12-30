// console.log("Fetching products...");

// if (document.getElementById("product-list")) {
//   fetch("http://localhost:4000/api/v1/product/showallproduct")
//     .then(res => res.json())
//     .then(data => {
//       const container = document.getElementById("product-list");

//       data.products.forEach(p => {
//         const card = document.createElement("div");
//         card.className = "card";
//         card.innerHTML = `
//           <img src="assets/${p.imageUrl}" alt="${p.name}" />
//           <h3>${p.name}</h3>
//           <p>₹${p.price}</p>
//           <button onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
//         `;
//         container.appendChild(card);
//       });
//     })
//     .catch(err => console.error("Error loading products:", err));
// }

// function addToCart(product) {
//   const cart = JSON.parse(localStorage.getItem("cart")) || [];
//   const exists = cart.find(item => item.id === product.id);
//   if (!exists) {
//     cart.push(product);
//     localStorage.setItem("cart", JSON.stringify(cart));
//     alert("Added to cart");
//   } else {
//     alert("Product already in cart");
//   }
// }



document.addEventListener("DOMContentLoaded", () => {
  console.log("Fetching products...");

  const container = document.getElementById("product-list");
  if (!container) return;

  fetch("http://localhost:4000/api/v1/product/showallproduct")
    .then(res => res.json())
    .then(data => {
      if (!data.products || !Array.isArray(data.products)) {
        console.error("Invalid product list");
        return;
      }

      data.products.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.border = "1px solid #ccc";
        card.style.padding = "10px";
        card.style.margin = "10px";
        card.style.maxWidth = "200px";

        card.innerHTML = `
          <img src="${p.imageUrl}" alt="${p.name}" style="width:100%; height:auto;" />
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <p><strong>₹${p.price}</strong></p>
          <p>Stock: ${p.stock}</p>
          <button onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => console.error("Error loading products:", err));
});

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const exists = cart.find(item => item._id === product._id);
  if (!exists) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart`);
  } else {
    alert(`${product.name} is already in the cart`);
  }
}
