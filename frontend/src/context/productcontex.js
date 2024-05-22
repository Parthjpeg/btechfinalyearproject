import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/productReducer";


const AppContext = createContext();

const API = "https://api.pujakaitem.com/api/products";

const initialState = {
  isloading : false,
  isError : false,
  products: [],
  featureProducts: [],
}

const AppProvider = ({ children }) => {

  const[state, dispatch] = useReducer(reducer, initialState);

  // const getproducts = async(url) => {
  //   const res = await axios.get(url);
  //   const products = await res.data;
  //   dispatch({type: "MY_API_DATA", payload:})
  // };

  // useEffect(() => {
  //   getproducts(API);

  // },[]);



  return (
    <AppContext.Provider value={{ ...state }}>
      {children}
    </AppContext.Provider>
  );
};

// custom hooks
const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };