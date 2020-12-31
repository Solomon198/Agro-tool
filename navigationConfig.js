import 'react-native-gesture-handler';

import React, { Component } from "react";
import { StyleSheet,AsyncStorage,View} from "react-native";
import {createSwitchNavigator,createAppContainer } from "react-navigation";
import {createStackNavigator} from "react-navigation-stack"
import { Root } from "native-base";
import SplashScreen from 'react-native-splash-screen'
import { fromLeft } from 'react-navigation-transitions';

//screens
import RootPage from './app/screens/index';
import AgroEcologicalZone from './app/screens/agro_ecological_zone'
import Community from './app/screens/community';
import FertilizerApplication from './app/screens/fertilizerApplication';
import FertilizerSourceSplitting from './app/screens/fertizerSourceSplitting'
import SoilComponent from './app/screens/soilCompatment';
import FarmersInfo from './app/screens/farmersInfo';
import siteIdentification from './app/screens/siteIdentification'

const RootNav = createStackNavigator({
    Index:RootPage,
    AgroEcologicalZone:AgroEcologicalZone,
    Community:Community,
    FertilizerApplication:FertilizerApplication,
    FertilizerSourceSplitting:FertilizerSourceSplitting,
    SoilComponent:SoilComponent,
    FarmersInfo:FarmersInfo,
    siteIdentification:siteIdentification
},{
  headerMode:'none', 
  mode:'card',
  transitionConfig: () => fromLeft(100),

})




const SwitchNav = createSwitchNavigator({
    Main:RootNav,
},{
  initialRouteName:'Main'
})

const persistenceKey = "persdkijkkkyduikjlkst"

const persistNavigationState = async (navState) => {
  try {
    await AsyncStorage.setItem(persistenceKey, JSON.stringify(navState))
  } catch(err) {
    // handle the error according to your needs
  }
}
const loadNavigationState = async () => {
  const jsonString = await AsyncStorage.getItem(persistenceKey)
  return JSON.parse(jsonString)
}

const AppContainer = createAppContainer(SwitchNav);

export default class App extends Component {
  constructor() {
    super();  
    this.state = {
      isLoading: true
    };
  }

   componentDidMount(){
     
     SplashScreen.hide();

   }

  render() {
   
      return (
          
               <Root>
                  <AppContainer 
                      persistNavigationState={persistNavigationState}
                      loadNavigationState={loadNavigationState}
                    />
               </Root>
              
      );
  }
}
