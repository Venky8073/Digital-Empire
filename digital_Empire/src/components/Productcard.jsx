import styled from "styled-components"
import { Link } from "react-router-dom"
import { Star } from "./star"
import { useEffect, useState } from "react"
const Productcard = ({ id, image, name, rating, price }) => {
  // const [showOffer, setShowOffer] = useState(true);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setShowOffer(prev => !prev);
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);
  price = price.toLocaleString("en-In");
  return (
    <><DIV>
      <div className="img">
        <Link to={`/product/${id}`}>
          <img src={image} alt="" />
        </Link>
      </div>
      <div className="detail">
        <p className="name">{name}</p>
        <br></br>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Star
            rating={rating}
          />
        </div>
        <br></br>
        <h3>₹ {price}</h3>
        <br />
        {/* {showOffer ? ( */}
        <div style={{ color: "red" }}>
          <h2><b>Special Offer!</b></h2>
          <p><b><i>Get 20% off on all products this weekend!</i></b></p>
        </div>
        {/* ) : ""} */}
      </div>
    </DIV >
    </>
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

export default Productcard;