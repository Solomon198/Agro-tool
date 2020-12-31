import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import AsyncStorage from "@react-native-community/async-storage"


import reducer from "./app/reducers";
// import fetchTweets from "./sagas/tweets";
import { persistStore, persistReducer } from 'redux-persist';
import rootSaga from "./app/sagas/sagas";
const storage = AsyncStorage
const sagaMiddleware = createSagaMiddleware();



  const persistConfig = {
    key: 'root',
    storage,
  }

  
  
  const persistedReducer = persistReducer(persistConfig,reducer)




    let store = createStore(persistedReducer,applyMiddleware(sagaMiddleware))
    let persistor = persistStore(store)
  

    sagaMiddleware.run(rootSaga);

    export default {store,persistor}



// const action = type => store.dispatch({ type });