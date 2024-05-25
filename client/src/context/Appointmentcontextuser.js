import {createContext,useContext,useEffect,useReducer} from 'react';
import reducer from "../reducer/Appointmentdata";

const AppContext=createContext();

const initialState={
    isLoading: false,
    isError: false,
    Appointmentdata:[],
    allappointment:[],
    filterappointmentdata:[],
    filters: {
        date:""
      
      }
};
const Appointmentcontextuser=({children})=>{
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(()=>{
    
        dispatch({ type: "FILTER_PRODUCTS"});
    },[state.Appointmentdata,state.filters],[])

    
      
      const updateFilterValue = (event) => {
        let name = event.target.name;
        let value = event.target.value;
     
//        const dateParts = dateString.split('-');

// // Reformat the date parts into DD-MM-YY format
//       let value = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
       
        return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
      };
    return (
        <>
         <AppContext.Provider value={{...state,updateFilterValue,dispatch}}>{children}</AppContext.Provider>
        </>
    )
}
const useAppointmentContextuser=()=>{
    return useContext(AppContext);
  };

  export {Appointmentcontextuser,AppContext,useAppointmentContextuser};
  