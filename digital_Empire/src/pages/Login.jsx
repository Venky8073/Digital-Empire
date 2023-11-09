import React from "react";
import {
  Center,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useLocation, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faX,
  faInfoCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/action";
import axios from "axios";
import "../style_modules/login.css";

const USER_REGEX = /^[A-Za-z][A-Za-z0-9]{4,}@[A-Za-z0-9]+\.[A-Za-z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,15}$/;

export const Login = () => {
  const isAuth = useSelector((store) => store.isAuth);
  const dispatch = useDispatch();
  const toast = useToast();

  const location = useLocation();

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [show, setShow] = useState(false);
  const handleShowPasswordClick = () => setShow(!show);

  const [errMsg, setErrMsg] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const result = USER_REGEX.test(username);
    // console.log(result);
    // console.log(username);
    setValidName(result);
  }, [username]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    // console.log(result);
    // console.log(password);
    setValidPwd(result);
  }, [password]);

  useEffect(() => {
    userRef.current.focus();
    console.log("fetching users data");
    let usersRes = axios.get("https://digital-empire.onrender.com/users")
      .then((res) => {
        return res.data;
      });
    usersRes.then((res) => {
      console.log(res, "inside login component");
      setUsers(res);
    });
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  useEffect(() => {
    if (isAuth) {
      console.log("authenticated");
      toast({
        title: "Login Successful",
        description: "Credentials are correct",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      if (location.state) {
        navigate(location.state);
      }
      else {
        navigate("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  function handleLogin() {
    console.log("handle login invoked");
    dispatch(login(users, username, password));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const v1 = USER_REGEX.test(username);
      const v2 = PWD_REGEX.test(password);
      if (!v1 || !v2) {
        setErrMsg("Invalid Entry");
        return;
      } else {
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Username taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section style={{ marginTop: "2rem", fontSize: "1.3rem" }} className="login-form-section Nunito">
      <p
        ref={errRef}
        className={errMsg ? "errMsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <Center>
        <Heading size="2xl" as="b" style={{ color: "purple" }}>
          Login
        </Heading>
      </Center>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel
            color="black"
            marginTop="2rem"
            className="Nunito"
            style={{ fontSize: "1.5rem", fontWeight: "bold" }}
          >
            Email :
            <span className={validName ? "valid" : "hide"}>
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: "green" }}
              ></FontAwesomeIcon>
            </span>
            <span className={validName || !username ? "hide" : "invalid"}>
              <FontAwesomeIcon
                icon={faX}
                style={{ color: "red" }}
              ></FontAwesomeIcon>
            </span>
          </FormLabel>
          <Input
            type="text"
            id="username"
            placeholder="Enter Email"
            autoComplete="off"
            ref={userRef}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            id="uidnote"
            className={
              userFocus && username && !validName ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            must begin with a letter.
            <br />
            email id must be greater than 5 characters.
            <br />
            must have "@"" symbol.
            <br />
            must have "." symbol.
          </p>
          <FormLabel
            marginTop={6}
            className="Nunito"
            style={{ fontSize: "1.5rem", fontWeight: "bold" }}
          >
            Password :
            <span className={validPwd ? "valid" : "hide"}>
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: "green" }}
              ></FontAwesomeIcon>
            </span>
            <span className={validPwd || !password ? "hide" : "invalid"}>
              <FontAwesomeIcon
                icon={faX}
                style={{ color: "red" }}
              ></FontAwesomeIcon>
            </span>
          </FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              size={"lg"}
              placeholder="Enter Password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <InputRightElement w="23%" marginBottom={2}>
              <Button
                h="2.2rem"
                variant="outline"
                size="md"
                bgColor={show ? "tomato" : "green.300"}
                _hover={show ? { backgroundColor: "tomato" } : { backgroundColor: "lightgreen" }}
                onClick={handleShowPasswordClick}
                leftIcon={<FontAwesomeIcon icon={show ? faEyeSlash : faEye} />}
                style={{ marginBottom: "1rem", marginTop: "1.4rem" }}
              >
                {show ? "Hide" : "show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <p
            id="pwdnote"
            className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 15 characters.
            <br />
            must include at least one uppercase and lowercase letter and a
            number and a special character.
            <br />
            Allowed special characters:{" "}
            <span aria-label="exclamation mark">!</span>
            <span aria-label="at symbol">@</span>
            <span aria-label="hashtag">#</span>
            <span aria-label="dollar sign">$</span>
            <span aria-label="percent">%</span>
          </p>
          <Button
            type="submit"
            w="100%"
            variant="solid"
            className="Login-btn"
            onClick={handleLogin}
            marginTop={6}
            isDisabled={!validName || !validPwd ? true : false}
          >
            Login
          </Button>
        </FormControl>
        <p style={{ marginTop: "2rem" }}>
          Not a User?
          <br />
          <span className="line">
            <ChakraLink
              as={ReactRouterLink}
              to="/signIn"
              style={{ color: "blue" }}
            >
              Register
            </ChakraLink>
          </span>
        </p>
      </form>
    </section>
  );
};