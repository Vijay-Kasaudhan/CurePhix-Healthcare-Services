import { createContext, useContext, useReducer, useEffect } from "react";
import { useDoctorContext } from "./Doctorcontext";
import reducer from "../reducer/filterreducer";

const FilterContext = createContext();

const initialState = {
  filter_doctors: [],
  all_doctors: [],
  filters: {
    doctorname: "",
    city:"All City",
    specialization: "",
    gender:"All Gender",
    experience:"",
    fees:""
  },
};

const FilterContextProvider = ({ children }) => {
  const {Doctors } = useDoctorContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  

  const updateFilterValue = (event) => {
    let name = event.target.name;
    let value = event.target.value;
   
    return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
  };
   const filter=state.filters;
  useEffect(()=>{
    dispatch({type: "LOAD_FILTER_PRODUCTS",payload:Doctors})
  },[Doctors])
  useEffect(() => { 
    dispatch({ type: "FILTER_PRODUCTS" });
  
  },[Doctors,filter]);

  
 
  

  return (
    <FilterContext.Provider
      value={{
        ...state,
        updateFilterValue,
      }}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilterContext = () => {
  return useContext(FilterContext);
};
export{FilterContextProvider,useFilterContext};