import { apiconnector } from './apiconnector.js';
import { authEndpoints } from './api.js';

const form=document.getElementById("login-form");
form.addEventListener("submit",async(e)=>{
  e.preventDefault();

         const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const accountType = document.getElementById("accountType").value;
    
      const formData = {
    email,
    password,
    accountType, 
  };
    try{
   const response=await apiconnector("POST",authEndpoints.LOGIN_API,formData);
   if(response.data.success){
     alert("Login successful!");
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("token", response.data.token);
        
    window.location.href = "product.html";
           
  // } else {
  //   window.location.href = "cart.html";
  // }
   }
    else {
            alert(response.data.message);
        }
    }

    catch(error){
 console.error("Login failed:", error);
        alert("Login failed");
    }
})



