import { applyMiddleware, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { ProductReducer as reducer } from "./reducer";

export const store = legacy_createStore(reducer, applyMiddleware(thunk));