import axios from "axios"
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, PRODUCT_DATA_FAILURE, PRODUCT_DATA_LOADING, PRODUCT_DATA_SUCCESS, SEARCH, SEARCH_FAILURE } from "./actionTypes"
export const fetchdata = (currentPage, params) => (dispatch) => {
  dispatch({ type: PRODUCT_DATA_LOADING });
  axios.get(`https://digital-empire.onrender.com/products?_limit=10&_page=${currentPage}`, params)
    .then(res => {
      console.log(res.headers["x-total-count"])
      dispatch({ type: PRODUCT_DATA_SUCCESS, payload: res })
    })
    .catch(dispatch({ type: PRODUCT_DATA_FAILURE }));
}

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
}

export const login = (users, username, password) => (dispatch) => {
  console.log(users, username, password, "inside login action function");
  let flag = false;
  users.forEach(element => {
    let newUser = element.email;
    let newPwd = element.password;
    if (newUser === username && newPwd === password) {
      flag = true;
      console.log(element.name, "from action function");
      dispatch({ type: LOGIN_SUCCESS, payload: element });
    }
  });
  if (flag === false) {
    dispatch({ type: LOGIN_FAILURE });
  }
}

export const register = (details) => {
  let obj = axios.post("https://digital-empire.onrender.com/users", details).then((res) => res.data);
  if (obj) {
    return true;
  }
  else {
    return false;
  }
}

export const search = (searchKey) => (dispatch) => {
  axios.get(`https://digital-empire.onrender.com/products?q=${searchKey}`)
    .then((res) => {
      console.log("search data in action file", res.data);
      dispatch({ type: SEARCH, payload: res.data });
    })
    .catch((err) => { dispatch({ type: SEARCH_FAILURE, payload: err }) })
}