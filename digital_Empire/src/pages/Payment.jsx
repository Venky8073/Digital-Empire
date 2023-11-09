import React, { useState } from 'react'
import styled from 'styled-components'
import { Input,Heading,Button,Textarea,Text } from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,

  TableContainer,Flex
} from '@chakra-ui/react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

import { useToast } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Payment = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const toast = useToast()

  const cart=useSelector((store)=>
    store.cart
  )
  // console.log(cart)

// payment method-----------------------------------------------------------
  const [payment,setPayment]=useState({
    fname:'',
    lname:'',
    phone:'',
    email:'',
    address:'',
    city:'',
    state:'',
    zipCode:'',
    method:''
  })

  const{fname,lname,phone,email,address,city,state,zipCode,method}=payment



  const handlePayment=(e)=>{
    let {value,name}=e.target
    setPayment((prev)=>{
      return{...prev,[name]:value}
    })
  }

  // console.log(payment)

  // cardpay--------------------------------------------------------


  const [pay,setPay]=useState({
    cname:'',
    cnumber:'',
    exdate:'',
    cvv:''
  })

  const {cname,cnumber,exdate,cvv}=pay


  function cardPay(e){
    const {name,value}=e.target
    setPay((prev)=>{
      return{...prev,[name]:value}
    })
  }


  const [flag,setFlag]=useState(false)

  function finalSubmit(){
    if(cname && cnumber && exdate && cvv){
      setFlag(true)
      function redirect(){
        setTimeout(()=>{
          return <Navigate to='/products'/>
        },30)
      }
      redirect()
      
    }
    else{
      function al(){
        toast({
          title: 'Fill all the fields',
          description: "Some fields are empty !",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
      al()
    }
  }

// --------------------------------------------------------------------------



  function handleSubmit(e){
    e.preventDefault()
    if(fname && lname && phone && email && address && city && state && zipCode && method){
      if(method==='card'){
        onOpen()
      }
      else{
        setFlag(true)
      }
    }
    else{
      function al(){
        toast({
          title: 'Fill all the fields',
          description: "Some fields are empty !",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
      al()
      
    }
    
  }

  // --------------------grand Total---------------------
  const handleTotal = () => {
    let total = 0;
    for(let i=0;i<cart.length;i++){
      let amt=cart[i].price;
      let str = "";
      console.log(amt);
      for(let j=0;j<amt.length;j++){
        if(amt[j]!==",")
        {
          str += amt[j];
        }
      }
      console.log(Number(str),str);
      total += Number(str);
  } 
  return total;
    // console.log(parseInt(amt.replace(",","")))
  }
  handleTotal();
// ----------------------------------------------------------------------------

if(flag){
return (<Alert
      status='success'
      variant='subtle'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      height='200px'
    >
      <AlertIcon boxSize='40px' mr={0} />
      <AlertTitle mt={4} mb={1} fontSize='lg'>
        Order Placed Successfully!
      </AlertTitle>
      <AlertDescription maxWidth='sm'>
        Thanks for oredering in our application. Our team will get back to you soon.
      </AlertDescription>
    </Alert>)
    }
  
  return (
    <DIV>
      <div className='form-side'>
        <div className='header'>
          <Heading>Basic Information</Heading>
        </div>
        <div className="payment-form">

          <form >
            <div className='name-surname'>
              <div className='first-name'>
                <label>FirstName</label>
                <Input type="text" name='fname' value={fname} onChange={handlePayment}/>
              </div>
              <div className="last-name">
                <label>Last Name</label>
                <Input type="text" name='lname' value={lname} onChange={handlePayment}/>
              </div>
            </div>

            <div className="phone-adress">
              <div className="phone">
                <label>Phone Number</label>
                <Input type="number" name='phone' value={phone} onChange={handlePayment}/>
              </div>
              <div className="email">
                <label>Email Address</label>
                <Input type="email" name='email' value={email} onChange={handlePayment}/>
              </div>
            </div>
            <div className="full-adress">
              <label>Full Adress</label>
              <Textarea name='address'  value={address} onChange={handlePayment}></Textarea>
            </div>
            <div className="city-state-zipcode">
              <div className='city'>
                <label>City</label>
                <Input type="text" name='city' value={city} onChange={handlePayment}/>
              </div>

              <div className="state">
                <label>State</label>
                <Input type="text" name='state' value={state} onChange={handlePayment}/>
              </div>

              <div className="zipcode">
                <label>Zip-code</label>
                <Input type="number" name='zipCode' value={zipCode} onChange={handlePayment}/>
              </div>
            </div> 

            <h3 className='pay-head'>Payment Method</h3>
            <div className="payment-type">
              
              <div className="card pay">
                <input type="radio" name='method' value='card' checked={method==='card'} onChange={handlePayment}/>
                <label>Card</label>
              </div>
              <div className="upi pay">
                <input type="radio" name='method' value='upi' checked={method==='upi'} onChange={handlePayment}/>
                <label>Upi</label>
              </div>
              <div className="cash pay">
                <input type="radio" name='method' value='cash' checked={method==='cash'} onChange={handlePayment}/>
                <label>Cash on delivery</label>
              </div>
             
            </div>

            <div className="place-order">
              <Button type='submit' onClick={handleSubmit}>Place Order</Button>
            </div>

            <div id='sign-in-button'></div>

          </form>

        </div>
      </div>
      <div className="amount-side">
        <TableContainer>
          <Table variant='simple'>
            {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Quantity</Th>
                <Th isNumeric>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cart.map((el)=><Tr>
                <Td>{el.name}</Td>
                <Td>1</Td>
                <Td isNumeric>{el.price}</Td>
              </Tr>)}
              
            </Tbody>
            <Tfoot>
              <Tr>
                <Td>Grand Total</Td>
                <Td></Td>
                <Td>{handleTotal().toLocaleString("en-In")}</Td>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </div>
      <div className='payment-method'>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Payment Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>

              <Text mt={3}>Card Name</Text>
              <Input type="text" name='cname' value={cname} onChange={cardPay}/>
              <Text mt={3}>Card Number</Text>
              <Input type="text" name='cnumber' value={cnumber} onChange={cardPay}/>
              <Flex className='cvv' gap={2} mt={3}>
                <div>
                <Text>expiry date</Text>
                <Input type="date" name='exdate' value={exdate} onChange={cardPay}/>
                </div>
                <div>
                  <Text>CVV</Text>
                  <Input type='password' name='cvv' value={cvv} onChange={cardPay}/>
                </div>
              </Flex>

            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost' onClick={finalSubmit}>Pay</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        
      </div>
      
      
    </DIV>
  )
}

const DIV=styled.div`
  /* margin: 0px; */
  text-align: left;
  /* background-color: #f4f3e8; */
  display: flex;
  justify-content: space-around;

  .form-side{
    margin: 50px;
    width: 50%;
    border: 2px solid;
  }
  .amount-side{
    margin: 50px;
    width: 30%;
  }

  .header{
    border-bottom: 1px solid;
  }
  .name-surname,.phone-adress,.city-state-zipcode{
    display: flex;
    gap: 20px;
    margin-bottom: 10px;
    margin-top: 10px;
    width: 100%;
  }

  .name-surname Input,.phone-adress Input{
    width: 350px;
  }

  label{
    font-size: large;
  }

  form{
    margin: 15px;
  }

  Button{
    background-color: #7676f0;
  }
  .place-order{
    text-align: end;
  }

  Tfoot{
    font-weight: 700;
  }

  .payment-type{
    display: flex;
    gap: 50px;
  }

  .pay-head{
    font-size: 25px;
    font-weight: 500;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .pay{
    display: flex;
    gap: 15px;
  }
`

export default Payment