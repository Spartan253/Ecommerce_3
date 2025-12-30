import { apiconnector } from './apiconnector.js';
import { orderEndpoints } from './api.js';




//get allorder

const user = JSON.parse(localStorage.getItem("user"));
async function fetchOrders(){
    try{
 const res=await fetch("http://localhost:4000/api/v1/order/userOrders",{
   headers:{
     "Authorization": `Bearer ${user.token}`,
        "Content-Type": "application/json"
   }
 });
 const data = await res.json();
    if (data.success) {
      dispalyorder(data.orders);
    } else {
      alert("Failed to load orders.");
    }
    }
    catch(error){
  console.error(err);
    alert("Server error while fetching orders.");
  
    }
}

//update order
async function updateorder(orderId){
    const newStatus = document.getElementById(`status-${orderId}`).value;  
 if (!newStatus) return alert("Enter a new status to update.");
 try{
 const res=await fetch("http://localhost:4000/api/v1/order/updateorder",{
          method: "PUT",
        headers: {
        "Authorization": `Bearer ${user.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ orderId, status: newStatus })  
    });
    const data = await res.json();
    alert(data.success ? "Order updated successfully." : "Failed to update order.");
    if (data.success) fetchOrders();
 }
 catch(error){
     console.error(err);
    alert("Server error while updating order.");
 }

}