const filterReducer = (state, action) =>{
    switch (action.type) {
      case "LOAD_FILTER_PRODUCTS":
        return {
          ...state,
          filter_doctors: [...action.payload],
          all_doctors: [...action.payload],
        };
     
      case "UPDATE_FILTERS_VALUE":
        const { name, value } = action.payload;
  
        return {
          ...state,
          filters: {
            ...state.filters,
            [name]: value,
          },
        };
  
      case "FILTER_PRODUCTS":
        let { all_doctors } = state;
        let tempFilterDoctor = [...all_doctors];
  
        const { doctorname,city,specialization,gender,experience,fees} = state.filters;
  
        if (specialization) {
          
          tempFilterDoctor = tempFilterDoctor.filter(
            (curElem) => curElem.Specialization===specialization
          );
        }
        if (doctorname) {
          tempFilterDoctor = tempFilterDoctor.filter((curElem) => {
            return curElem.name.toLowerCase().includes(doctorname);
          });
        }
        if(city!=="All City"){
            tempFilterDoctor=tempFilterDoctor.filter((curElem)=>{
                return curElem.city=== city
            })
        }
        if(gender!=="All Gender"){
          tempFilterDoctor=tempFilterDoctor.filter((curElem)=>{
            return curElem.Gender===gender
        })}
        if(experience){
          tempFilterDoctor=tempFilterDoctor.filter((curElem)=>{
            return curElem.Experience===experience
        })}
        if(fees){
          tempFilterDoctor = tempFilterDoctor.filter((curElem)=>{
               return curElem.fees<=fees
          })
        }
       return {
            ...state,
            filter_doctors: tempFilterDoctor,
          };
        default:
        return state;
    }
  };
   export default filterReducer;