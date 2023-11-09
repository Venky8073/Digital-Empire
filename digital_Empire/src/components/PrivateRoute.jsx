import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";

const PrivateRoute = ({ children }) => {
  const isAuth = useSelector((store) => store.isAuth);
  const location = useLocation();
  const toast = useToast();
  if (isAuth === false) {
    toast({
      title: "Please Login first",
      status: "warning",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  }
  return isAuth ? children : <Navigate state={location.pathname} to={"/login"} />
}

export default PrivateRoute