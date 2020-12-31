import { Alert } from "react-native";


const initState  = {

  useOwnData: false,
  usePredefineData : false,
  zones : [],
  states : [],
  communities : [],
  selectedZone : {},
  selectedState:{},
  selectedLga : {},
  analysisData : {},

  loadingZones :"unitiated",
  loadingStates: "unitiated",
  loadingLga : "unitiated",
  loadingAnalysisData:"unitiated"
  
}

export default function reducer(
    state  = initState,
    action 
  ) {
    switch (action.type) {


      //selecting zone
      
      case "SET-SOIL-DATA":{
        let soilData = state.analysisData;
        soilData["soilDataForCommunity"] = action.payload;
        state = {...state,analysisData:soilData}
        break;
      }
      
      case "SET-ZONE":{
        state = {...state,selectedZone:action.payload}
        break;
      }

      case "SET-STATE":{
        state = {...state,selectedState:action.payload}
        break;
      }

      case "SET-LGA":{
        state = {...state,selectedLga:action.payload}
        break;
      }

      //loading zones reducers

      case "LOADING-ZONES-STARTED":{
        state = {...state,loadingZones:"started"}
        break;
      }

      case "LOADING-ZONES-SUCCESS":{
        state = {...state,loadingZones:"success",zones:action.payload}
        break;
      }

      case "LOADING-ZONES-FAILED":{
        state = {...state,loadingZones:"failed"}
        break;
      }

        //loading states reducers

        case "LOADING-STATES-STARTED":{
          state = {...state,loadingStates:"started"}
          break;
        }
  
        case "LOADING-STATES-SUCCESS":{
          state = {...state,loadingStates:"success",states:action.payload,communities:[],loadingAnalysisData:"unitiated"}
          break;
        }
  
        case "LOADING-STATES-FAILED":{
          state = {...state,loadingStates:"failed"}
          break;
        }

         //loading communities reducers

         case "LOADING-LGA-STARTED":{
          state = {...state,loadingLga:"started"}
          break;
        }
  
        case "LOADING-LGA-SUCCESS":{
          state = {...state,loadingLga:"success",communities:action.payload,loadingAnalysisData:"unitiated"}
          break;
        }
  
        case "LOADING-LGA-FAILED":{
          state = {...state,loadingLga:"failed"}
          break;
        }

         //loading analysisData reducers

         case "LOADING-ANALYSIS-DATA-STARTED":{
          state = {...state,loadingAnalysisData:"started"}
          break;
        }
  
        case "LOADING-ANALYSIS-DATA-SUCCESS":{
          state = {...state,loadingAnalysisData:"success",analysisData:action.payload}
          break;
        }
  
        case "LOADING-ANALYSIS-DATA-FAILED":{
          state = {...state,loadingAnalysisData:"failed"}
          break;
        }


      case "SET-OPTION-OWN-DATA" : {
        state = {...state,useOwnData:true,usePredefineData:false}
        break;
      }

      case "SET-OPTION-PREDEFINED-DATA" : {
        state = {...state,useOwnData:false,usePredefineData:true}
        break;
      }

  


     
      default: {
        return state;
      }
    }

    return state;
  }