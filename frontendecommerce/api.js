export const BASE_URL="https://ecommerce-3-mq4p.onrender.com/api/v1";

export  const authEndpoints={
     SIGNUP_API: `${BASE_URL}/auth/signup`,
      LOGIN_API: `${BASE_URL}/auth/login`,
}

export const orderEndpoints={
    CREATEORDER_API:`${BASE_URL}/order/createorder`,
    UPDATEORDER_API:`${BASE_URL}/order/updateorderstatus`,
    GETALLORDER_API:`${BASE_URL}/order/getallorder`,
}

export const productEndpoints={
    CREATEPRODUCT_API:`${BASE_URL}/product/createproduct`,
      UPDATEPRODUCT_API:`${BASE_URL}/product/updateproduct`,
        DELETEPRODUCT_API:`${BASE_URL}/product/deleteproduct`,
          SHOWALLPRODUCT_API:`${BASE_URL}/product/showallproduct`,
}