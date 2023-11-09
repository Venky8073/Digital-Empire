import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  Link as ChakraLink,
  HStack,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  Button
} from '@chakra-ui/react';
import { NavLink as ReactRouterLink, useNavigate } from 'react-router-dom'
import { SearchIcon } from "@chakra-ui/icons";
import { FaBars, FaCartArrowDown, FaHome, FaProductHunt, FaTimes } from "react-icons/fa";
import { FcAbout, FcContacts } from "react-icons/fc";
import { SlLogin, SlLogout } from "react-icons/sl";
import { useDispatch, useSelector } from 'react-redux';
import { logout, search } from '../Redux/action';
import { Link } from "react-router-dom";

const NAVBAR = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
gap: 2rem;
background-color: #273446;
box-sizing: border-box;

.logo
{
  height: 90px;
  width: 600px;
}

.logout-btn
{
  color: black;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
  padding-bottom: 0.2rem;
  border-radius: 100vw;
  background-color: white;
  transition: background-color 250ms;
  position: relative;
  isolation: isolate;
  overflow: hidden;
}

.logout-btn:hover,.logout-btn:focus-visible
{
  /* background-color: orange; */
}

.logout-btn > span
{
  position: absolute;
  z-index: -1;
  width: 33.333%;
  height: 100%;
  /* background-color: orangered; */
  background-color: transparent;
  opacity: 0.5;
}

.logout-btn > :first-child
{
  left: 0;
  top: 0;
}

.logout-btn > :last-child
{
  right: 0;
  top: 0;
}

.logout-btn::before
{
  content: '';
  position: absolute;
  z-index:-1;
  background: orange;
  width: 20%;
  aspect-ratio: 1;
  border-radius: 50%;
  inset: 0;
  margin: auto;
  opacity: 0;
  transition: transform 1000ms 200ms, opacity 200ms;
}

.logout-btn:active::before
{
  transform: scale(20);
  opacity: 1;
  transition: transform 1000ms, opacity 500ms;
}

.logout-btn:has(:first-child:active)::before
{
  margin-left: 0;
}

.logout-btn:has(:last-child:active)::before
{
  margin-right: 0;
}

.logout-btn:has(:first-child:active)::before,
.logout-btn:has(:last-child:active)::before
{
  transition: transform 500ms, opacity 250ms;
}

.nav-link
{
opacity: 0.7;
text-transform: uppercase;
text-decoration: none;
font-weight: 500;
position: relative;
overflow: hidden;
padding-bottom: 0.3rem;
margin-top: 0.3rem;
}

.nav-link::after
{
  content: '';
  position: absolute;
  left: 0;
  /* bottom: -0.1rem; */
  bottom: 0;
  height: 3px;
  width: 100%;
  background-color: orangered;
  translate: var(--_translate,0);
  scale: var(--_width,0) 1;
  transition: scale 300ms var(--_scale-delay, 0ms), translate 500ms var(--_translate-delay, 0ms);
}

.nav-link:hover
{
  /* scale: 1 1; */
  --_width: 1;
}

@supports selector(:has(h1))
{
  .nav-link:hover + .nav-link
  {
    --_translate: -100%;
    --_scale-delay: 300ms;
    --_translate-delay: 200ms;
  }

  .nav-link:has(+ :hover)
  {
    --_translate: 100%;
    --_scale-delay: 300ms;
    --_translate-delay: 200ms;
  }
}

.nav-link:hover,
.nav-link:focus-visible
{
  opacity: 1;
}
`;

const Navbar = () => {
  const isAuth = useSelector((store) => store.isAuth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }

  const initialState = {
    isHome: true,
    isProducts: false,
    isCart: false,
    isAbout: false,
    isContact: false,
    isLogin: false,
    isProfile: false
  }

  const [activeLink, setActiveLink] = useState(initialState);

  const [searchKey, setSearchKey] = useState("");

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 950);

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 950);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => {
      clearTimeout(debounceTimer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey]);

  const handleSearch = () => {
    console.log("handle search invoked");
    if (searchKey.length > 0) {
      dispatch(search(searchKey));
      navigate("/search");
    }
    else {
      navigate("/");
    }
  }

  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const navigate = useNavigate();

  return (
    <NAVBAR>
      <div onClick={() => {
        setActiveLink((prev) => {
          return {
            ...prev,
            isHome: true,
            isProducts: false,
            isCart: false,
            isAbout: false,
            isContact: false,
            isLogin: false,
            isProfile: false
          };
        });
      }}><Link to={"/"}><img className='logo' src="digital-empire-logo.png" alt="" /></Link></div>
      <InputGroup>
        <Input
          type='text'
          placeholder='Search'
          textAlign="center"
          bgColor={'white'}
          value={searchKey}
          onChange={(e) => {
            if (e.target.value === "") {
              setSearchKey(e.target.value);
              navigate("/");
            }
            else {
              setSearchKey(e.target.value);
            }
          }}
        >
        </Input>
        <InputRightElement onClick={handleSearch}>
          <IconButton
            colorScheme='blue'
            aria-label='Search database'
            icon={<SearchIcon />}
            mr={1}
          />
        </InputRightElement>
      </InputGroup>
      {
        isSmallScreen ?
          (<Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  isActive={isOpen}
                  as={IconButton}
                  aria-label='Options'
                  icon={isOpen ? <FaTimes /> : <FaBars />}
                />
                <MenuList>
                  <MenuItem
                    icon={<FaHome />}
                    onClick={() => { navigate("/") }}
                  >
                    <ChakraLink
                      as={ReactRouterLink}
                      to='/' fontSize="lg"
                      className='nav-link'
                      style={{ color: "green", opacity: "1" }}
                      _hover={{ textDecoration: 'none' }}>
                      Home
                    </ChakraLink>
                  </MenuItem>
                  <MenuItem
                    icon={<FaProductHunt />}
                    onClick={() => { navigate("/products") }}
                  >
                    <ChakraLink
                      as={ReactRouterLink}
                      to='/products'
                      fontSize="lg"
                      className='nav-link'
                      style={{ color: "green", opacity: "1" }}
                      _hover={{ textDecoration: 'none' }}>
                      Products
                    </ChakraLink>
                  </MenuItem>
                  <MenuItem
                    icon={<FaCartArrowDown />}
                    onClick={() => { navigate("/cart") }}
                  >
                    <ChakraLink
                      as={ReactRouterLink}
                      to='/cart'
                      fontSize="lg"
                      className='nav-link'
                      style={{ color: "green", opacity: "1" }}
                      _hover={{ textDecoration: 'none' }}>
                      Cart
                    </ChakraLink>
                  </MenuItem>
                  <MenuItem
                    icon={<FcAbout />}
                    onClick={() => { navigate("/about") }}
                  >
                    <ChakraLink
                      as={ReactRouterLink}
                      to='/about'
                      fontSize="lg"
                      className='nav-link'
                      style={{ color: "green", opacity: "1" }}
                      _hover={{ textDecoration: 'none' }}>
                      About
                    </ChakraLink>
                  </MenuItem>
                  <MenuItem
                    icon={<FcContacts />}
                    onClick={() => { navigate("/contact") }}
                  >
                    <ChakraLink
                      as={ReactRouterLink}
                      to='/contact'
                      fontSize="lg"
                      className='nav-link'
                      style={{ color: "green", opacity: "1" }}
                      _hover={{ textDecoration: 'none' }}>
                      Contact
                    </ChakraLink>
                  </MenuItem>
                  {
                    isAuth
                      ?
                      <MenuItem>
                        <Button
                          leftIcon={<SlLogout />}
                          onClick={handleLogout}
                          bgColor="red.300"
                          _hover={{ bg: "red.300", color: "initial" }}
                        >
                          Logout
                        </Button>
                      </MenuItem>
                      :
                      <MenuItem
                        onClick={() => { navigate("/login") }}
                      >
                        <Button
                          leftIcon={<SlLogin />}
                          bgColor="green.300"
                          _hover={{ bg: "green.300", color: "initial" }}
                        >
                          Login
                        </Button>
                      </MenuItem>
                  }
                </MenuList>
              </>
            )}
          </Menu>)
          :
          (<HStack spacing={5} color="white" id='Links'>
            <ChakraLink
              as={ReactRouterLink}
              to='/' fontSize="lg"
              className='nav-link'
              style={activeLink.isHome ? { color: "orangered", opacity: "1" } : { color: "white" }}
              onClick={() => {
                setActiveLink((prev) => {
                  return {
                    ...prev,
                    isHome: true,
                    isProducts: false,
                    isCart: false,
                    isAbout: false,
                    isContact: false,
                    isLogin: false,
                    isProfile: false
                  };
                })
              }}
              _hover={{ textDecoration: 'none' }}>
              Home
            </ChakraLink>
            <ChakraLink
              as={ReactRouterLink}
              to='/products'
              fontSize="lg"
              className='nav-link'
              style={activeLink.isProducts ? { color: "orangered", opacity: "1" } : { color: "white" }}
              onClick={() => {
                setActiveLink((prev) => {
                  return {
                    ...prev,
                    isHome: false,
                    isProducts: true,
                    isCart: false,
                    isAbout: false,
                    isContact: false,
                    isLogin: false,
                    isProfile: false
                  };
                })
              }}
              _hover={{ textDecoration: 'none' }}>
              Products
            </ChakraLink>
            <ChakraLink
              as={ReactRouterLink}
              to='/cart'
              fontSize="lg"
              className='nav-link'
              style={activeLink.isCart ? { color: "orangered", opacity: "1" } : { color: "white" }}
              onClick={() => {
                setActiveLink((prev) => {
                  return {
                    ...prev,
                    isHome: false,
                    isProducts: false,
                    isCart: true,
                    isAbout: false,
                    isContact: false,
                    isLogin: false,
                    isProfile: false
                  };
                })
              }}
              _hover={{ textDecoration: 'none' }}>
              Cart
            </ChakraLink>
            <ChakraLink
              as={ReactRouterLink}
              to='/about'
              fontSize="lg"
              className='nav-link'
              style={activeLink.isAbout ? { color: "orangered", opacity: "1" } : { color: "white" }}
              onClick={() => {
                setActiveLink((prev) => {
                  return {
                    ...prev,
                    isHome: false,
                    isProducts: false,
                    isCart: false,
                    isAbout: true,
                    isContact: false,
                    isLogin: false,
                    isProfile: false
                  };
                })
              }}
              _hover={{ textDecoration: 'none' }}>
              About
            </ChakraLink>
            <ChakraLink
              as={ReactRouterLink}
              to='/contact'
              fontSize="lg"
              className='nav-link'
              style={activeLink.isContact ? { color: "orangered", opacity: "1" } : { color: "white" }}
              onClick={() => {
                setActiveLink((prev) => {
                  return {
                    ...prev,
                    isHome: false,
                    isProducts: false,
                    isCart: false,
                    isAbout: false,
                    isContact: true,
                    isLogin: false,
                    isProfile: false
                  };
                })
              }}
              _hover={{ textDecoration: 'none' }}>
              Contact
            </ChakraLink>
            {
              isAuth ?
                // <input type="button" value="Logout" className='logout-btn' />
                <div style={{ display: "flex", gap: "1rem" }}>
                  <ChakraLink
                    as={ReactRouterLink}
                    to='/profile'
                    fontSize="lg"
                    className='nav-link'
                    style={activeLink.isLogin ? { color: "orangered", opacity: "1" } : { color: "white" }}
                    onClick={() => {
                      setActiveLink((prev) => {
                        return {
                          ...prev,
                          isHome: false,
                          isProducts: false,
                          isCart: false,
                          isAbout: false,
                          isContact: false,
                          isLogin: false,
                          isProfile: true
                        };
                      })
                    }}
                    _hover={{ textDecoration: 'none' }}>
                    Profile
                  </ChakraLink>
                  <button className='logout-btn' onClick={handleLogout}>
                    <span></span>
                    Logout
                    <span></span>
                  </button>
                </div>
                :
                <ChakraLink
                  as={ReactRouterLink}
                  to='/login'
                  fontSize="lg"
                  className='nav-link'
                  style={activeLink.isLogin ? { color: "orangered", opacity: "1" } : { color: "white" }}
                  onClick={() => {
                    setActiveLink((prev) => {
                      return {
                        ...prev,
                        isHome: false,
                        isProducts: false,
                        isCart: false,
                        isAbout: false,
                        isContact: false,
                        isLogin: true,
                        isProfile: false
                      };
                    })
                  }}
                  _hover={{ textDecoration: 'none' }}>
                  Login
                </ChakraLink>
            }
          </HStack>)
      }
    </NAVBAR >
  )
}

export default Navbar