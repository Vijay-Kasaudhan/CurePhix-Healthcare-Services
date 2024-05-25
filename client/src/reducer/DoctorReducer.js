const DoctorReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "SET_API_DATA":
     
      return {
        ...state,
        isLoading: false,
        Doctors: action.payload,
      
      };

    case "API_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
      case "SET_SINGLE_PRODUCT":
        return{...state,isLoading:false,singleDoctor:action.payload}

    default:
      return state;
  }
};

export default DoctorReducer;
