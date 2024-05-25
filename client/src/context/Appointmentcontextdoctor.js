import {createContext,useContext,useEffect,useReducer} from 'react';
import reducer from "../reducer/DoctorAppointmentdata";

const AppContext=createContext();

const initialState={
    isLoading: false,
    isError: false,
    Appointmentdatas:[],
    allappointments:[],
    filterappointmentdatas:[],
    filters: {
        date:""
      
      }
};
const Appointmentcontextdoctor=({children})=>{
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(()=>{
    
        dispatch({ type: "FILTER_PRODUCTS"});
    },[state.Appointmentdatas,state.filters])

    
      
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
const useAppointmentContextdoctor=()=>{
    return useContext(AppContext);
  };

  export {Appointmentcontextdoctor,AppContext,useAppointmentContextdoctor};
  