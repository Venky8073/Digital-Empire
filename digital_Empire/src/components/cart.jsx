import styled from "styled-components"
import { Link } from "react-router-dom"
import { Star } from "./star"
import { useEffect, useState } from "react"
const  CartCard = ({ id, image, name, price,quantity, removeProduct, buyProducts, handleDecClick,handleIncClick }) => {
    
    let pr=(price.replace(/,/g, '')*quantity)
    pr= pr.toLocaleString("en-In");
  return (
    <DIV>
      <div className="img">
       
          <img src={image} alt="" />
  
      </div>
      <div className="detail">
        <p className="name">{name}</p>
        <br></br>
        <button onClick={() => handleDecClick(id)} disabled={quantity<=1?true:false}>-</button>
            <span>  {quantity}  </span>
            <button onClick={() => handleIncClick(id)} disabled={quantity>=5?true:false}>+</button>
        <br></br>
        <h3>₹ {pr}</h3>
        <br />
        
        <button onClick={()=>buyProducts(id)}>Buy</button>
        <br />
        <button onClick={()=>removeProduct(id)}>Remove</button>
      </div>
    </DIV >

  
    
  )
}

const DIV = styled.div`
    display:flex;
    width:100%;
    height:400px;
    margin-bottom:1.5rem;
    gap: 2rem;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    .img{
      width:30%;
      margin-top: auto;
      margin-bottom: auto;
      padding:10px;
      img{
        max-width: 100%;
        max-height: 300px; /* Added maximum height */
        object-fit: cover;
        border-radius: 10px;
        margin: auto;
        /* box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); */
      }
      &:hover {
      transform: scale(1.1); /* Increase size on hover */
     }
    }
    .detail{
     width:60%;
     padding-left:30px;
     margin-top: auto;
     margin-bottom: auto;
      .name{
        font-size:30px
      }
      h3{
        font-size:30px
      }
    }
    @media (max-width: 768px) {
    flex-direction: column;
    height:auto;
    .img,
    .detail {
      width: 100%;
      height:auto;
    }

    .img img {
      
      max-width: 100%;
       max-height: 300px;
    }
  }

  @media (max-width: 576px) {
    .detail {
      padding-left: 0;
    }
  }
`;


export default CartCard;