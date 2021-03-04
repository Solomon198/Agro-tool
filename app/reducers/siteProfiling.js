import { Alert } from "react-native";


const initState  = {

    farmersName:null,
    farmersPhoneNumber:null,
    attainableYield:null,
    siteId :null,
    fieldSize:null

  
}



export default function reducer(
    state  = initState,
    action 
  ) {
    switch (action.type) {


      //selecting zone 
      
      case "SET-FARMER-NAME":{
        state = {...state,farmersName:action.payload}
        break;
      }

      case "SET-FARMER-PHONE":{
        state = {...state,farmersPhoneNumber:action.payload}
        break;
      }

      case "SET-ATTAINABLE-YIELD":{
        state = {...state,attainableYield:action.payload}
        break;
      }

      case "SET-SITE-ID":{
        state = {...state,siteId:action.payload}
        break;
      }

      case "SET-FIELD-SIZE":{
        state = {...state,fieldSize:action.payload}
        break;
      }


      case "CLEAR-STORAGE":{
        return state = {
          ...state,
          farmersName:null,
          farmersPhoneNumber:null,
          attainableYield:null,
          siteId :null,
          fieldSize:null
      
        
      }
        break;
      }
     

     
      default: {
        return state;
      }
    }

    return state;
  }