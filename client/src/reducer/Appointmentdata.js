const Appointmentdata = (state, action) => {
  switch (action.type) {
    case "LOAD_APPOINTMENT_DATA":
      return {
        ...state,
        Appointmentdata:action.payload,
        allappointment:action.payload
      };
      case "UPDATE_FILTERS_VALUE":
        const { name, value } = action.payload;
        
        return {
          ...state,
          filters: {
            ...state.filters,
            [name]: value,
          }};
          case "FILTER_CURRENTAPPOINTMENT_DATA":
            let {allappointment}=state;
            let filterappointmentdata=[...allappointment];
            
            let today=new Date();
            let currentdate=today.getTime();
         
             filterappointmentdata = filterappointmentdata.filter((curElem)=>new Date(curElem.appointmentdate).getTime()>=currentdate)
             
             return {
              ...state,
              filterappointmentdata:filterappointmentdata
             }
          case "FILTER_PRODUCTS":
            let {Appointmentdata}=state;
            
            let tempFilterAppointmentdata=[...Appointmentdata];
            const {date} = state.filters;
        console.log(date);
        console.log(new Date(date).getTime());
        if (date) {
            tempFilterAppointmentdata = tempFilterAppointmentdata.filter(
            (curElem) => new Date(curElem.appointmentdate).getTime()===new Date(date).getTime()
          );
        }
            return {
              ...state,
              Appointmentdata:tempFilterAppointmentdata
            }
            default:
    }
  }
  export default Appointmentdata;
