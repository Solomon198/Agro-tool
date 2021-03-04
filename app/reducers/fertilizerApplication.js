import { Alert } from "react-native";


const initState  = {

   uom:[],
   organicFertilizers:[],
   loadingFertilizerOptions:"unitiated",
   fertilizers:[]
  
}


export default function reducer(
    state  = initState,
    action 
  ) {
    switch (action.type) {


      //selecting zone 
      
      case "LOADING-FERTILIZER-OPTION-STARTED":{
        state = {...state,loadingFertilizerOptions:"started"}
        break;
      }

      case "LOADING-FERTILIZER-OPTION-FAILED":{
        state = {...state,loadingFertilizerOptions:"failed"}
        break;
      }

      case "LOADING-FERTILIZER-OPTION-SUCCESS":{
        const {uom,organicFertilizers} = action.payload;
        state = {...state,uom:uom,organicFertilizers:organicFertilizers,loadingFertilizerOptions:"success"}
        break;
      }

      case "ADD-FERTILIZER":{
          let fertilizers = state.fertilizers;
          fertilizers.push(action.payload);
          state = {...state,fertilizers:fertilizers}
          break;
      }

      case "DELETE-FERTILIZER":{
        let fertilizers = Object.assign([],state.fertilizers);
        fertilizers.splice(action.payload,1);
        state = {...state,fertilizers:fertilizers,loadingFertilizerOptions:"unitiated"}
        break;
      }

      case "CLEAR-STORAGE":{
        return state = {
          ...state,
          uom:[],
          organicFertilizers:[],
          loadingFertilizerOptions:"unitiated",
          fertilizers:[]}
        break;
      }


      
     
      default: {
        return state;
      }
    }

    return state;
  }