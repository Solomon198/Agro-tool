import { Alert } from "react-native";


const initState  = {

    clay:null,
    pH:null,
    k:null,
    mg : null,
    cec:null,
    mehlich:null,
    oc:null,
    n:null,
    s:null,
    zn:null,
    ca:null
  
}


export default function reducer(
    state  = initState,
    action 
  ) {
    switch (action.type) {


      //selecting zone 
      
      case "SET-CLAY":{
        state = {...state,clay:action.payload}
        break;
      }

      case "SET-PH":{
        state = {...state,pH:action.payload}
        break;
      }

      case "SET-K":{
        state = {...state,k:action.payload}
        break;
      }

      case "SET-MG":{
        state = {...state,mg:action.payload}
        break;
      }

      case "SET-CEC":{
        state = {...state,cec:action.payload}
        break;
      }

      case "SET-MEHLICH":{
        state = {...state,mehlich:action.payload}
        break;
      }

      case "SET-OC":{
        state = {...state,oc:action.payload}
        break;
      }

      case "SET-N":{
        state = {...state,n:action.payload}
        break;
      }

      case "SET-S":{
        state = {...state,s:action.payload}
        break;
      }

      case "SET-ZN":{
        state = {...state,zn:action.payload}
        break;
      }

      case "SET-CA":{
        state = {...state,ca:action.payload}
        break;
      }



        case "CLEAR-STORAGE":{
          return state = {
            ...state,
            clay:null,
            pH:null,
            k:null,
            mg : null,
            cec:null,
            mehlich:null,
            oc:null,
            n:null,
            s:null,
            zn:null,
            ca:null
          
        }
          break;
      }

     
      default: {
        return state;
      }
    }

    return state;
  }