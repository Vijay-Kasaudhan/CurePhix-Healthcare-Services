import {createContext,useContext,useEffect,useReducer} from 'react';
import axios from "axios";
import reducer from "../reducer/DoctorReducer";


const AppContext=createContext();
const API = "http://localhost:8800/api/doctorlist/get/";
  const initialState = {
  isLoading: false,
  isError: false,
  Doctors: [],
  singleDoctor:{}
};
const Doctorcontext = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

  const getDoctors= async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url);
      const doctors = await res.data;
      
      
      dispatch({ type: "SET_API_DATA", payload:doctors});
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };
  
  const getSingleDoctor = async (url) => {
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const res = await axios.get(url);
      const singleDoctor = await res.data;
      
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleDoctor });
    } catch (error) {
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };

  useEffect(() => {
    getDoctors(API);
  },[]);

  return (
    <>
     <AppContext.Provider value={{...state,getSingleDoctor}}>{children}</AppContext.Provider>
    </>
      
    
  )
}
const useDoctorContext=()=>{
  return useContext(AppContext);
};
export {Doctorcontext,AppContext,useDoctorContext};
