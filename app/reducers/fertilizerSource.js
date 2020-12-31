import { Alert } from "react-native";


const initState  = {

   fertilizerSource:[],
   fertilizerType:[],
   loadingFertilizersType:"unitiated",
   loadingFertilizersSource:"unitiated",
   loadingFertilizers:"unitiated",
   fertilizers:[],
   addedFertilizerSources:[]
  
}

export default function reducer(
    state  = initState,
    action 
  ) {
    switch (action.type) {


      //selecting zone 
      
      case "LOADING-FERTILIZER-SOURCE-STARTED":{
        state = {...state,loadingFertilizersSource:"started"}
        break;
      }

      case "LOADING-FERTILIZER-SOURCE-FAILED":{
        state = {...state,loadingFertilizersSource:"failed"}
        break;
      }

      case "LOADING-FERTILIZER-SOURCE-SUCCESS":{
        state = {...state,fertilizerSource:action.payload,loadingFertilizersSource:"success"}
        break;
      }

      case "LOADING-FERTILIZER-TYPE-STARTED":{
        state = {...state,loadingFertilizersType:"started"}
        break;
      }

      case "LOADING-FERTILIZER-TYPE-FAILED":{
        state = {...state,loadingFertilizersType:"failed"}
        break;
      }

      case "LOADING-FERTILIZER-TYPE-SUCCESS":{
        state = {...state,fertilizerType:action.payload,loadingFertilizersType:"success"}
        break;
      }

      case "LOADING-FERTILIZERR-STARTED":{
        state = {...state,loadingFertilizers:"started"}
        break;
      }

      case "LOADING-FERTILIZERR-FAILED":{
        state = {...state,loadingFertilizers:"failed"}
        break;
      }

      case "LOADING-FERTILIZERR-SUCCESS":{
        state = {...state,fertilizers:action.payload,loadingFertilizers:"success"}
        break;
      }

      case "ADD-FERTILIZER-SOURCE":{
          let fertilizers = state.addedFertilizerSources;
          fertilizers.push(action.payload);
          state = {...state,addedFertilizerSources:fertilizers}
          break;
      }

      case "DELETE-FERTILIZER-SOURCE":{
        let fertilizers = Object.assign([],state.addedFertilizerSources);
        fertilizers.splice(action.payload,1);
        state = {...state,addedFertilizerSources:fertilizers}
        break;
      }


      default: {
        return state;
      }


    }

    return state;
  }