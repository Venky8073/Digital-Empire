import React, { useEffect, useState } from 'react'
import CartCard from '../components/cart';
import { useDispatch, useSelector } from 'react-redux'
// import CartCard from '../components/CartCard';
import { PRODUCT_REMOVE_FROM_CART ,cart_quantity_dec,cart_quantity_inc} from '../Redux/actionTypes';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const Cart = () => {
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  // cart=cart.map(item=>{
  //   return {...item,quantity:1}
  // })
  
console.log(cart)


  const removeProduct = (id) => {
    dispatch({type:PRODUCT_REMOVE_FROM_CART, payload : id })
  }

  const buyProducts = () => {
    navigate("/payment")
  }

  const handleIncClick = (id) => {
    dispatch ({ type:cart_quantity_inc,payload:id})


    
  };
  
  const handleDecClick = (id) => {
    dispatch ({ type:cart_quantity_dec,payload:id})
  };

  let sum=0;
  for(let i=0; i<cart.length;i++) {
    const price = parseFloat(cart[i].price.replace(/,/g, ''));
    sum+= price * Number(cart[i].quantity)
    console.log(sum)
  }
  useEffect(()=> {
  },[dispatch])
  

  return (
    <WRAPPER>
      <h2 style={{fontSize:"30px"}}>Total items : {cart.length}</h2>
      <div>
        {cart.map(item=>(
          <CartCard
            key={item.id}
            {...item}
            pr={item.price*item.quantity}
            buyProducts={buyProducts}
            handleDecClick={handleDecClick}
            handleIncClick={handleIncClick}
            removeProduct={removeProduct}
          />
        ))}
      </div>
      <h2 style={{fontSize:"30px"}}>Total Amount :{sum}</h2>
    </WRAPPER>
   
 
    
               

   
  )
}



export default Cart

const WRAPPER = styled.div`

  /* background-color:red; */
  border:1px solid teal
 

`