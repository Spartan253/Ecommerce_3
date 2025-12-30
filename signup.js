import { apiconnector } from './apiconnector.js';
import { authEndpoints } from './api.js';
const form=document.getElementById("signup-form");
form.addEventListener("submit",async function(e){
   e.preventDefault();

   // 1. Get signup form values
const firstname = document.getElementById("firstname").value;
const lastname = document.getElementById("lastname").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const confirmpassword= document.getElementById("confirmpassword").value;
const  accountType=document.getElementById("accountType").value;


const formData = {
    firstname,
    lastname,
    email,
    password,
    confirmpassword,
     accountType,
  };
 try {
   const res = await apiconnector("POST", authEndpoints.SIGNUP_API, formData);

    if (res.data.success) {
      alert("Signup successful");
      localStorage.setItem("token", JSON.stringify(res.data.token));
      window.location.href = "login.html";
    } else {
      alert(res.data.message);
    }
  } catch (error) {
    console.error("Signup failed:", error);
    alert("Signup failed. Try again.");
  }
})


