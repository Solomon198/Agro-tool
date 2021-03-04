import { put, takeEvery, all, call, takeLatest, take } from "redux-saga/effects";
import axios from "axios"
import { Alert } from "react-native";
// const urlPrefix = "http://localhost:8000";
const urlPrefix = "https://rf-tool.herokuapp.com";
import Schemas from '../realm/schemas'
import { queryCollection } from "../realm/queries";












const watchSetOwnData = function* watchSetOwnData(){
  yield takeEvery("DO-SET-OPTION-OWN-DATA",function*(action){
    yield put({type:"SET-OPTION-OWN-DATA"})
  })
}

const watchSetPredefineData = function* watchSetPredefineData(){
  yield takeEvery("DO-SET-OPTION-PREDEFINED-DATA",function*(action){
    yield put({type:"SET-OPTION-PREDEFINED-DATA"})
  })
}

const watchSetZone = function* watchSetZone(){
       yield takeEvery("DO-SET-ZONE",function*(action){
         yield put({type:"SET-ZONE",payload:action.payload})
       })
}

const watchSetState = function* watchSetState(){
  yield takeEvery("DO-SET-STATE",function*(action){
    yield put({type:"SET-STATE",payload:action.payload})
  })
}

const watchSetLga = function* watchSetLga(){
  yield takeEvery("DO-SET-LGA",function*(action){
    yield put({type:"SET-LGA",payload:action.payload})
  })
}


const watchClearStorage = function* watchClearStorage(){
   yield takeEvery("DO-CLEAR-STORAGE",function*(action){
     yield put({type:"CLEAR-STORAGE"})
   })
}


const watchGetZone = function* watchGetZone(){
  yield takeEvery("DO-GET-ZONE",function*(action){
      try{
        yield put({type:"LOADING-ZONES-STARTED"});
        
        let zones = yield call(queryCollection.bind(this,null,Schemas.ecologicalZone.name))
        yield put({type:"LOADING-ZONES-SUCCESS",payload:zones});
        

      }catch(e){
        yield put({type:"LOADING-ZONES-FAILED"})
      }
  })
}

const watchGetStates = function* watchGetStates(){
 yield takeEvery("DO-GET-STATES",function*(action){
     try{
       yield put({type:"LOADING-STATES-STARTED"});
         let query = `zone == "${action.payload.zone}"`
         let states = yield call(queryCollection.bind(this,query,Schemas.states.name))

         yield put({type:"LOADING-STATES-SUCCESS",payload:states});
      

     }catch(e){
       yield put({type:"LOADING-STATES-FAILED"})
     }
 })
}



const watchGetLga = function* watchGetLga(){
 yield takeEvery("DO-GET-LGA",function*(action){
     try{
       yield put({type:"LOADING-LGA-STARTED"});
       let query = `zone == "${action.payload.zone}" && state == "${action.payload.state}"`
       let lga = yield call(queryCollection.bind(this,query,Schemas.community.name))

       yield put({type:"LOADING-LGA-SUCCESS",payload:lga});


     }catch(e){
       yield put({type:"LOADING-LGA-FAILED"})
     }
 })
}



const watchGetAnalysisData = function* watchGetAnalysisData(){
 yield takeEvery("DO-GET-ANALYSIS-DATAS",function*(action){

  try{
       yield put({type:"LOADING-ANALYSIS-DATA-STARTED"});

           //get crop parameters 
           let query = `zone == "${action.payload.zone}"`
           let query1 = `zone == "${action.payload.zone}" && state == "${action.payload.state}" && community == "${action.payload.community}"`
           const cropParameters = yield call(queryCollection.bind(this,query,Schemas.cropParameters.name));

       //get attainable yield
       const attainableYield = yield call(queryCollection.bind(this,query,Schemas.attainableYield.name));

       //get recovery fraction 
       const recoveryFraction = yield call(queryCollection.bind(this,query,Schemas.recoveryFraction.name));

       //get recovery efficiency 
       const recoveryEfficiency = yield call(queryCollection.bind(this,query,Schemas.recoveryEfficiency.name));

       // nutrient uptake for selected community
       const nutrientUptakeForCommunity = yield call(queryCollection.bind(this,query1,Schemas.nutrientUptakeCommunity.name));

       //soil data for community 
       const soilDataForCommunity = yield call(queryCollection.bind(this,query1,Schemas.soilDataPerCommunity.name));

       const responseObject = {
           cropParameters:cropParameters[0] ,
           attainableYield : attainableYield[0],
           recoveryFraction : recoveryFraction[0],
           recoveryEfficiency  : recoveryEfficiency[0],
           nutrientUptakeCommunity : nutrientUptakeForCommunity[0],
           soilDataForCommunity : soilDataForCommunity[0],
      }
       
         yield put({type:"LOADING-ANALYSIS-DATA-SUCCESS",payload:responseObject});
      

     }catch(e){
       console.error(e)
       yield put({type:"LOADING-ANALYSIS-DATA-FAILED"})
     }
 })
}




const watchSetClay = function* watchSetClay(){
  yield takeEvery("DO-SET-CLAY",function*(action){
    yield put({type:"SET-CLAY",payload:action.payload})
  })
}

const watchSetPH = function* watchSetPH(){
  yield takeEvery("DO-SET-PH",function*(action){
    yield put({type:"SET-PH",payload:action.payload})
  })
}

const watchSetK = function* watchSetK(){
  yield takeEvery("DO-SET-K",function*(action){
    yield put({type:"SET-K",payload:action.payload})
  })
}

const watchMG = function* watchMG(){
  yield takeEvery("DO-SET-MG",function*(action){
    yield put({type:"SET-MG",payload:action.payload})
  })
}


const watchSetCEC = function* watchSetCEC(){
  yield takeEvery("DO-SET-CEC",function*(action){
    yield put({type:"SET-CEC",payload:action.payload})
  })
}


const watchSetMehlich = function* watchSetMehlich(){
  yield takeEvery("DO-SET-MEHLICH",function*(action){
    yield put({type:"SET-MEHLICH",payload:action.payload})
  })
}

const watchSetOc = function* watchSetOc(){
  yield takeEvery("DO-SET-OC",function*(action){
    yield put({type:"SET-OC",payload:action.payload})
  })
}



const watchSetN = function* watchSetN(){
  yield takeEvery("DO-SET-N",function*(action){
    yield put({type:"SET-N",payload:action.payload})
  })
}

const watchSetS = function* watchSetS(){
  yield takeEvery("DO-SET-S",function*(action){
    yield put({type:"SET-S",payload:action.payload})
  })
}

const watchZN = function* watchZN(){
  yield takeEvery("DO-SET-ZN",function*(action){
    yield put({type:"SET-ZN",payload:action.payload})
  })
}

const watchCA = function* watchCA(){
  yield takeEvery("DO-SET-CA",function*(action){
    yield put({type:"SET-CA",payload:action.payload})
  })
}





const watchSetSoilData = function* watchSetSoilData(){
  yield takeEvery("DO-SET-SOIL-DATA",function*(action){
    yield put({type:"SET-SOIL-DATA",payload:action.payload})
  })
}


const watchSetFarmersName = function* watchSetFarmersName(){
  yield takeEvery("DO-SET-FARMER-NAME",function*(action){
    yield put({type:"SET-FARMER-NAME",payload:action.payload})
  })
}


const watchSetFarmersPhone = function* watchSetFarmersPhone(){
  yield takeEvery("DO-SET-FARMER-PHONE",function*(action){
    yield put({type:"SET-FARMER-PHONE",payload:action.payload})
  })
}

const watchSetAttainableYield = function* watchSetAttainableYield(){
  yield takeEvery("DO-SET-ATTAINABLE-YIELD",function*(action){
    yield put({type:"SET-ATTAINABLE-YIELD",payload:action.payload})
  })
}


const watchSetSiteID = function* watchSetSiteID(){
  yield takeEvery("DO-SET-SITE-ID",function*(action){
    yield put({type:"SET-SITE-ID",payload:action.payload})
  })
}
 



const watchGetFertilizerOptions = function* watchGetFertilizerOptions(){
 yield takeEvery("DO-GET-FERTILIZER-OPTION",function*(action){

  try{
       yield put({type:"LOADING-FERTILIZER-OPTION-STARTED"});
       const organicFertilizers =  yield call(queryCollection.bind(this,null,Schemas.organicFertilizer.name));
       const uom =  yield call(queryCollection.bind(this,null,Schemas.uom.name));
       const response = {organicFertilizers,uom}
      
         yield put({type:"LOADING-FERTILIZER-OPTION-SUCCESS",payload:response});
      

     }catch(e){
       yield put({type:"LOADING-FERTILIZER-OPTION-FAILED"})
     }
 })
}

const watchAddFertilizer = function* watchAddFertilizer(){
  yield takeEvery("DO-ADD-FERTILIZER",function*(action){
    yield put({type:"ADD-FERTILIZER",payload:action.payload})
  })
}

const watchDeleteFertilizer = function* watchDeleteFertilizer(){
  yield takeEvery("DO-DELETE-FERTILIZER",function*(action){
    yield put({type:"DELETE-FERTILIZER",payload:action.payload})
  })
}
 
const watchGetFertilizerSource = function* watchGetFertilizerSource(){
  yield takeEvery("DO-FERTILIZER-SOURCE",function*(action){
      try{
        yield put({type:"LOADING-FERTILIZER-SOURCE-STARTED"});

          let states = yield call(queryCollection.bind(this,null,Schemas.fertilizerSource.name))
 
          yield put({type:"LOADING-FERTILIZER-SOURCE-SUCCESS",payload:states});
       
 
      }catch(e){
        yield put({type:"LOADING-FERTILIZER-SOURCE-FAILED"})
      } 
  })
 }

 const watchGetFertilizerType = function* watchGetFertilizerType(){
  yield takeEvery("DO-FERTILIZER-TYPE",function*(action){
      try{
        yield put({type:"LOADING-FERTILIZER-TYPE-STARTED"});
          let query = `sourceId == "${action.payload.source}"`
          let states = yield call(queryCollection.bind(this,query,Schemas.fertilizerType.name))
 
          yield put({type:"LOADING-FERTILIZER-TYPE-SUCCESS",payload:states});
       
 
      }catch(e){
        yield put({type:"LOADING-FERTILIZER-TYPE-FAILED"})
      }
  })
 }

 const watchGetFertilizers = function* watchGetFertilizers(){
  yield takeEvery("DO-FERTILIZERR",function*(action){
      try{
        yield put({type:"LOADING-FERTILIZERR-STARTED"});

          let query = `type_id == "${action.payload.type_id}"`
          let states = yield call(queryCollection.bind(this,query,Schemas.fertilizers.name))
 
          yield put({type:"LOADING-FERTILIZERR-SUCCESS",payload:states});
       
 
      }catch(e){
        yield put({type:"LOADING-FERTILIZERR-FAILED"})
      }
  })
 }

 const watchAddFertilizerSource = function* watchAddFertilizerSource(){
  yield takeEvery("DO-ADD-FERTILIZER-SOURCE",function*(action){
    yield put({type:"ADD-FERTILIZER-SOURCE",payload:action.payload})
  })
}

const watchDeleteFertilizerSource = function* watchDeleteFertilizerSource(){
  yield takeEvery("DO-DELETE-FERTILIZER-SOURCE",function*(action){
    yield put({type:"DELETE-FERTILIZER-SOURCE",payload:action.payload})
  })
}

const watchDoSetFieldSize = function* watchDoSetFieldSize(){
    yield takeEvery("DO-SET-FIELD-SIZE",function*(action){
      yield put({type:"SET-FIELD-SIZE",payload:action.payload})
    })
}






const rootSaga = function* rootSaga() {

  yield all([

    watchDoSetFieldSize(),

    watchSetOwnData(),
    watchSetPredefineData(),

    watchSetZone(),
    watchSetLga(),
    watchSetState(),

    watchGetZone(),
    watchGetStates(),
    watchGetLga(),
    watchGetAnalysisData(),

    watchSetClay(),
    watchSetPH(),
    watchCA(),
    watchSetMehlich(),
    watchSetS(),
    watchZN(),
    watchSetN(),
    watchSetOc(),
    watchSetCEC(),
    watchMG(),
    watchSetK(),
    watchSetSoilData(),

    watchSetFarmersName(),
    watchSetFarmersPhone(),
    watchSetAttainableYield(),
    watchSetSiteID(),

    watchGetFertilizerOptions(),
    watchAddFertilizer(),
    watchDeleteFertilizer(),


    watchGetFertilizerSource(),
    watchGetFertilizerType(),
    watchGetFertilizers(),

    watchAddFertilizerSource(),
    watchDeleteFertilizerSource(),

    watchClearStorage(),
  ]);




};

export default rootSaga;


