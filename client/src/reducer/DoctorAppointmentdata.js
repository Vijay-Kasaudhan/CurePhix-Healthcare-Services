const DoctorAppointmentdata = (state, action) => {
    switch (action.type) {
      case "LOAD_APPOINTMENT_DATA":
        return {
          ...state,
          Appointmentdatas:action.payload,
          allappointments:action.payload
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
              let {allappointments}=state;
              let filterappointmentdatas=[...allappointments];
            
              let today=new Date();
              let currentdate=today.getTime();
            
               filterappointmentdatas = filterappointmentdatas.filter((curElem)=>new Date(curElem.appointmentdate)>=currentdate)
               
               return {
                ...state,
                filterappointmentdatas:filterappointmentdatas
               }
            case "FILTER_PRODUCTS":
              let {Appointmentdatas}=state;
              
              let tempFilterAppointmentdatas=[...Appointmentdatas];
              const {date} = state.filters;
              
            
          if (date) {
              tempFilterAppointmentdatas = tempFilterAppointmentdatas.filter(
              (curElem) => new Date(curElem.appointmentdate)===new Date(date)
            );
          }
              return {
                ...state,
                Appointmentdatas:tempFilterAppointmentdatas
              }
      }
    }
    export default DoctorAppointmentdata;
  