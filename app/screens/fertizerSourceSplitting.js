
/**
 *
 * @format
 * @flow
 */

import React from 'react';
import SpinKit from 'react-native-spinkit'
import { 
    Layout,
    Text, 
    Input,
    Button,
    Icon,
    Avatar,
    TopNavigation,
    TopNavigationAction,
    List,
    ListItem,
    Menu,
     Select
} from '@ui-kitten/components';
import {Toast,Header, Body, Right} from 'native-base'
import Modal from 'react-native-modalbox'
import {WebView} from 'react-native-webview'
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import Fab from '../components/fab';

import EvaButtons from '../components/evaButtons';

import { connect } from 'react-redux'

const pageTitle = "Fertilizer Source Splitting";
const pageSub = "Selected Fertilizers";

const renderItemAccessory = (style) => (
    <Button style={style}>FOLLOW</Button>
  ); 

  const renderItemIcon = (style) => (
    <Icon {...style} name='arrowhead-right-outline'/>
  );

  const chevronRigh = (style) => (
    <Icon {...style} name='save-outline'/>
  );

  const trash = (style) => (
    <Icon {...style} name='trash-2-outline'/>
  );

  

  const renderAddIcon = (style) => (
    <Icon {...style}  name='plus-square-outline'/>
  );

  function formattToSelectOption(key,data){
    data.forEach((val)=>{
      val["text"] = val[key];
    })
  
    return data;
  }
  


  const mapStateToProps = (state /*, ownProps*/) => {
    return {
      
        fertilizerSource:state.FertilizerSourceSplitting.fertilizerSource,
        fertilizerType:state.FertilizerSourceSplitting.fertilizerType,
        loadingFertilizersType:state.FertilizerSourceSplitting.loadingFertilizersType,
        loadingFertilizersSource:state.FertilizerSourceSplitting.loadingFertilizersSource,
        loadingFertilizers:state.FertilizerSourceSplitting.loadingFertilizers,
        fertilizers:state.FertilizerSourceSplitting.fertilizers,
        addedFertilizerSources:state.FertilizerSourceSplitting.addedFertilizerSources,
        addedFertilizers:   state.FertilizerApplication.fertilizers,
        analysisData : state.siteIdentification.analysisData,

        selectedZone : state.siteIdentification.selectedZone,
        selectedState:state.siteIdentification.selectedState,
        selectedLga : state.siteIdentification.selectedLga,

        farmersName:state.siteProfiling.farmersName,
        farmersPhoneNumber:state.siteProfiling.farmersPhoneNumber,
        inputAttainableYield:state.siteProfiling.attainableYield,
        siteId :state.siteProfiling.siteId,
        fieldSize :state.siteProfiling.fieldSize


     
    }
  }
  
  //actions
  const mapDispatchToProps = (dispatch)=>({
     getFertilizerSources : ()=> dispatch({type:"DO-FERTILIZER-SOURCE"}),
     getFertilizerType : (payload)=> dispatch({type:"DO-FERTILIZER-TYPE",payload:payload}),
     getFertilizers : (payload)=> dispatch({type:"DO-FERTILIZERR",payload:payload}),
     addFertilizerSource:(payload)=> dispatch({type:"DO-ADD-FERTILIZER-SOURCE",payload:payload}),
     removeFertilizerSource:(payload)=>dispatch({type:"DO-DELETE-FERTILIZER-SOURCE",payload:payload})
  })


  
class FertilizerSourceSplitting extends React.Component{
  constructor(props){
  super(props);
    this.state = {
        finishModal:false,
        selectedFertilizer:{},
        modal:false,
        fertilizer:{},
        selectedFertilizerSource:{},
        selectedFertilizerType:{},
        showDisplayResult:false,
        _YU :"",
        html:""


    }
       
  }



  async createPDF() {
    let options = {
      html: this.state.html,
      fileName: 'Rf-tool'+ new Date().getTime(),
      directory: 'Documents',
    };

    let checkPermission = await PermissionsAndroid.check("android.permission.WRITE_EXTERNAL_STORAGE");
    if(!checkPermission){
      let permission = await PermissionsAndroid.request("android.permission.WRITE_EXTERNAL_STORAGE");
      if(permission !== "granted"){
        return Alert.alert("Permission","Please grant permission to print pdf")
      }
    }

    await RNHTMLtoPDF.convert(options)
    this.props.navigation.navigate("Index")

    // console.log(file.filePath);
    Alert.alert("File Saved !!","Pdf saved to Document folder successfully!!!.");
  }
  


    runAlgorithm(){

       try{

        const {

          cropParameters,
          attainableYield,
          recoveryFraction,
          recoveryEfficiency,
          nutrientUptakeCommunity,
          soilDataForCommunity,

        } = this.props.analysisData;

        let addedFertilizerSources = this.props.addedFertilizerSources;
        let addedFertilizers = this.props.addedFertilizers;

      













       let {
            selectedZone,
            selectedState,
            selectedLga,

            farmersName,
            farmersPhoneNumber,
            inputAttainableYield,
            siteId,
            fieldSize,
          } = this.props;


          // recovery fraction
       
          let rn=parseFloat(recoveryFraction.RN);
          let rp=parseFloat(recoveryFraction.RP);
          let rk=parseFloat(recoveryFraction.RK);
          let rs=parseFloat(recoveryFraction.RS);

          console.log("------RECOVERY FRACTION------------");
          console.log({rn,rp,rk,rs})
                            
         // crop parameters

         let aN=parseFloat(cropParameters.aN);
         let aP=parseFloat(cropParameters.aP);
         let aK=parseFloat(cropParameters.aK);
         let aS=parseFloat(cropParameters.aS);
         let dN=parseFloat(cropParameters.dN);
         let dP=parseFloat(cropParameters.dP);
         let dK=parseFloat(cropParameters.dk);
         let dS=parseFloat(cropParameters.dS);
         let rN=parseFloat(cropParameters.rN);
         let rP=parseFloat(cropParameters.rP);
         let rK=parseFloat(cropParameters.rK);
         let rS=parseFloat(cropParameters.rS);

           console.log("------------------- CROP PARAMETERS ----------------------------");
          console.log({aN,aP,aK,aS,dN,dP,dK,dS,rN,rP,rK,rS})
         
          // maximum yield
          let Ymax=parseFloat(attainableYield.value);

          console.log("------------------- MAXIMUM YIELD ----------------------------");
          console.log({Ymax})
          
          // recovery efficiency
          let REN = parseFloat(recoveryEfficiency.REN);
          let REP = parseFloat(recoveryEfficiency.REP);
          let REK = parseFloat(recoveryEfficiency.REK);
          let RES = parseFloat(recoveryEfficiency.RES);
          
          console.log("------------------- RECOVERY EFFICIENCY ----------------------------");
          console.log({REN,REP,REK,RES})
          
           // nutrient uptake per community
          
          let n_uptake = parseFloat(nutrientUptakeCommunity.n_uptake);
          let p_uptake = parseFloat(nutrientUptakeCommunity.p_uptake);
          let k_uptake = parseFloat(nutrientUptakeCommunity.k_uptake);
          let s_uptake = parseFloat(nutrientUptakeCommunity.s_uptake);

          console.log("------------------- NUTRIENT UPTAKE PER COMMUNITY ----------------------------");
          console.log({n_uptake,p_uptake,k_uptake,s_uptake})
          
          // soil data per community
                      
          let clay    = parseFloat(soilDataForCommunity.clay);
          let pH      = parseFloat(soilDataForCommunity.pH);
          let mg      = parseFloat(soilDataForCommunity.mg);
          let cec     = parseFloat(soilDataForCommunity.cec);						
          let mehlich = parseFloat(soilDataForCommunity.mehlich);
          let oc      = parseFloat(soilDataForCommunity.oc);
          let nitro   = parseFloat(soilDataForCommunity.n);
          let s       = parseFloat(soilDataForCommunity.s);
          let zn      = parseFloat(soilDataForCommunity.zn);
          let ca      = parseFloat(soilDataForCommunity.ca);
          let k       = parseFloat(soilDataForCommunity.k);
           
          console.log("------------------- SOIL DATA FOR COMMUNITY ----------------------------");
          console.log({clay,pH,mg,cec,mehlich,oc,nitro,s,zn,ca,k})


          console.log("_---------------- ADDED FERTILIZERS-------------------------");
          console.log(addedFertilizers);

          console.log("_---------------- ADDED Sources-------------------------");
          console.log(addedFertilizerSources)




          console.log("-------------SITE INDENTIFICATION INFORMATION------------");
          console.log({selectedZone,selectedState,selectedLga,})


          console.log("----------------- FARMERS INFORMATION -------------------------")
          console.log({farmersName,
            farmersPhoneNumber,
            inputAttainableYield,
            siteId})






// BEGIN ALGORITHM  COMPUTATION====================================

function un_p(rN,SP,rP,aP,dP,aN,dN,SN)
{
  let un_p_condition =rN + ((SP - rP) * (aP/dP));

  let un_p_condition_2 = rN+((SP-rP) * (2 * ((dP/aN))-(aP/dN)));
 
  if(SN <  un_p_condition) // first scenario
  {
    un_p=SN;

  }
  else if (SN > un_p_condition_2) // second scenario
  {


  un_p= rN+((SP-rP) * (dP/aN)); 

  }
  else  // third scenario
  {

    un_p=SN - ((0.25 * (SN - rN - ((SP - rP) * (aP/dN)))**2)/((SP - rP) * ((dP/aN) - (aP/dN))));
   
  }
 
  return parseFloat(un_p);
}
 
 function un_k(rN,SK,rK,aK,dK,aN,dN,SN)
{
  let un_k_condition =rN + ((SK - rK) * (aK/dK));
  let un_k_condition_2 = rN +((SK-rK) * (2 * ((dK/aN))-(aK/dN)));

  if(SN < un_k_condition ) // first scenario
  {
    un_k=SN;
  
  }
  else if ( SN > un_k_condition_2 ) // second scenario
  {
  un_k= rN + ((SK-rK) * (dK/aN)); 
  
  }
  else  // third scenario
  {
    
    
    un_k=SN - ((0.25 * (SN - rN - ((SK - rK) * (aK/dN)))**2)/((SK - rK) * ((dK/aN) - (aK/dN))));
    
  
  }
  
  return parseFloat(un_k);
}

function un_s(rN,SS,rS,aS,dS,aN,dN,SN)
{
  let un_s_condition =parseFloat(rN + ((SS - rS) * (aS/dS)));
  let un_s_condition_2 = parseFloat(rN +((SS-rS) * (2 * ((dS/aN))-(aS/dN))));
 
 


  if(SN < un_s_condition ) // first scenario
  {
    un_s=SN;
    
  }
  else if ( SN > un_s_condition_2 ) // second scenario
  {
  un_s= rN + ((SS-rS) * (dS/aN)); 
  
  }
  else // third scenario
  {
    
    
    un_s=SN - ((0.25 * (SN - rN - ((SS - rS) * (aS/dN)))**2)/((SS - rS) * ((dS/aN) - (aS/dN))));
  
    
  }
  
  return parseFloat(un_s);
}



//==============================UPTAKE OF P ===============================================




function up_n(rP,SP,rN,aN,dN,aP,dP,SN)
{



   let up_n_condition =rP + ((SN - rN) * (aN/dN));
 let up_n_condition_2 = rP + ((SN-rN) * (2 * ((dN/aP))-(aN/dP)));


  if(SP < up_n_condition ) // first scenario
  {
    up_n=SP;

  }
  else if ( SP > up_n_condition_2 ) // second scenario
  {
  up_n= rP+((SN-rN) * (dN/aP)); 
  }
  else  // third scenario
  {
    
    up_n=SP - ((0.25 * (SP - rP - ((SN - rN) * (aN/dP)))**2)/((SN - rN) * ((dN/aP) - (aN/dP))));
          
  }
  
  return parseFloat(up_n);
}
function up_k(rP,SP,rK,aK,dK,aP,dP,SK)
{
  let up_k_condition =rP + ((SK - rK) * (aK/dK));
  let up_k_condition_2 = rP +((SK-rK) * (2 * ((dK/aP))-(aK/dP)));
   
  if(SP < up_k_condition ) // first scenario
  {
    up_k=SP;
  }
  else if ( SP > up_k_condition_2 ) // second scenario
  {
  up_k= rP + ((SK-rK) * (dK/aP)); 
  
  }
  else // third scenario 
  {
    
    
    up_k=SP - ((0.25 * (SP - rP -((SK - rK) * (aK/dP)))**2)/((SK - rK) * ((dK/aP) - (aK/dP))));
    
  }
  
  return parseFloat(up_k);
}
function up_s(rP,SP,rS,aS,dS,aP,dP,SS)
{
  let up_s_condition =rP + ((SS - rS) * (aS/dS));
  let up_s_condition_2 = rP +((SS-rS) * (2 * ((dS/aP))-(aS/dP)));

  

  if(SP < up_s_condition ) // first scenario
  {
    up_s=SP;
}
  else if ( SP > up_s_condition_2 ) // second scenario
  {
  up_s= rP + ((SS-rS) * (dS/aP)); 
  }
  else // third scenario 
  {
    
    up_s=SP - ((0.25 * (SP - rP - ((SS - rS) * (aS/dP)))**2)/((SS - rS) * ((dS/aP) - (aS/dP))));
   
    
  }
  
  return parseFloat(up_s);
}





//==============================UPTAKE OF K ===============================================




function uk_n(rK,SK,rN,aK,dK,aN,dN,SN)
{
  let uk_n_condition =rK + ((SN - rN) * (aN/dN));
  let uk_n_condition_2 = rK + ((SN-rN) * (2 * ((dN/aK))-(aN/dK)));
  

  if(SK < uk_n_condition ) // first scenario
  {
    uk_n=SK;
}
  else if ( SK > uk_n_condition_2 ) // second scenario
  {
  uk_n= rK +((SN-rN) * (dN/aK)); 
  }
  else  // third scenario
  {
    
    uk_n=SK - ((0.25 * (SK - rK - ((SN - rN) * (aN/dK)))**2)/((SN - rN) * ((dN/aK) - (aN/dK))));
  }
  
  return parseFloat(uk_n);
}
function uk_p(rK,SK,rP,aK,dK,aP,dP,SP)
{
  let uk_p_condition =rK + ((SP - rP) * (aP/dP));
  let uk_p_condition_2 = rK +((SP-rP) * (2 * ((dP/aK))-(aP/dK)));
 
  if(SK < uk_p_condition ) // first scenario
  {
    uk_p=SK;
      }
  else if ( SK > uk_p_condition_2 ) // second scenario
  {
  uk_p= rK + ((SP-rP) * (dP/aK)); 
  
  }
  else // third scenario 
  {
    
    
    uk_p=SP - ((0.25 * (SP - rP - ((SK - rK) * (aK/dP)))**2)/((SK - rK) * ((dK/aP) - (aK/dP))));
  
  }
  
  return parseFloat(uk_p);
}
function uk_s(rK,SK,rS,aK,dK,aS,dS,SS)
{
 
  let uk_s_condition =rK + ((SS - rS) * (aS/dS));
  let uk_s_condition_2 = rK +((SS-rS) * (2 * ((dS/aK))-(aS/dK)));
 

  if(SK < uk_s_condition ) // first scenario
  {
    uk_s=SK;
  }
  else if ( SK > uk_s_condition_2 ) // second scenario
  {
   
  uk_s= rK + ((SS-rS) * (dS/aK)); 
  
 }
  else // third scenario
  {
    
    uk_s=SK - ((0.25 * (SK - rK - ((SS - rS) * (aS/dK)))**2)/((SS - rS) * ((dS/aK) - (aS/dK))));
  
  }
  
  return parseFloat(uk_s);
}



//==============================UPTAKE OF S ===============================================




function us_n(rS,SS,rN,aS,dN,aN,dS,SN)
{
  let us_n_condition =rS + ((SN - rN) * (aN/dN));
  let us_n_condition_2 = rS + ((SN-rN) * (2 * ((dN/aS))-(aN/dS)));
 
 

  if(SS < us_n_condition ) // first scenario
  {
    us_n=SS;
  
  }
  else if ( SS > us_n_condition_2 ) // second scenario
  {
  
  us_n= rS +((SN-rN) * (dN/aS)); 
  }
  else  // third scenario
  {
  
    us_n=SS - ((0.25 * (SS - rS -((SN - rN) * (aN/dS)))**2)/((SN - rN) * ((dN/aS) - (aN/dS))));//...........eq47
  }
  
  return parseFloat(us_n);
}
function us_p(rS,SP,rP,aP,dP,aS,dS,SS)
{
  let us_p_condition =rS + ((SP - rP) * (aP/dP));
  let us_p_condition_2 = rS +((SP-rP) * (2 * ((dP/aS))-(aP/dS)));
  


  if(SS < us_p_condition ) // first scenario
  {
    us_p=SS;
  }
  else if ( SS > us_p_condition_2 ) // second scenario
  {
  us_p= rS + ((SP-rP) * (dP/aS)); 
  
  }
  else // third scenario
  {
    
    
    us_p=SS - ((0.25 * (SS - rS - ((SP - rP) * (aP/dS)))**2)/((SP - rP) * ((dP/aS) - (aP/dS))));//..........eq48
    
  }
  
  return parseFloat(us_p);
}
function us_k(rS,SK,rK,aK,dK,aS,dS,SS)
{
 
  let us_k_condition =rS + ((SK - rK) * (aK/dK));
  let us_k_condition_2 = rS +((SK-rK) * (2 * ((dK/aS))-(aK/dS)));


  if(SS < us_k_condition ) // first scenario
  {
    us_k=SS;
   }
  else if ( SS > us_k_condition_2 ) // second scenario
  {
  us_k= rS + ((SK-rK) * (dK/aS)); 
   }
  else // third scenario
  {
    
    us_k=SS - ((0.25 * (SS - rS -((SK - rK) * (aK/dS)))**2)/((SK - rK) * ((dK/aS) - (aK/dS))));
  }
  
  return parseFloat(us_k);
}



if(selectedZone=="Northern Guinea Savanna (NGS)")
{

var SN = -76.2 + (6.7 * s)+ (3.3 * oc) -(0.7 * mehlich) + (7.2 * zn)+ (42.9 * nitro) + (0 * rn);	
var SP = -14.7 + (2.6 * pH) + (3.1 * k) + (1.2 * oc) + (0 * rp);
var SK =  -32.4 + (10.4 * cec) + (6.4 * nitro) + (8.5 * pH) - (0.6 * clay)- (14 * mg) - (4.6 * k) + (0 * rk);
var SS = 37.8 - (0.1 * oc)  - (0.738 * nitro) + (0.1 * mehlich) - (4.8 * pH) + (3.3 * mg) - (0.5 * k) + (0 * rs);


}
else
{
  //= AVAILABLE SOIL NUTRIENT without FERTILIZER FOR CALCULATING FERTILIZER RECOMMENDATION=======

var SN = 17.8 + (5.8 * s)- (2.6 * oc) - (1.0 * mehlich) - (6.3 * zn) + (153.25 * nitro);
var SP= -24.8 + (3.7 * pH) + (0.13 * mehlich) + (1.13 * oc) + (0.51 * cec);
var SK= -12.7 + (0.45 * clay) + (1.27 * cec) + (1.14 * oc) + (3.27 * pH) - (8.09 * mg);
var SS = 29.4 - (0.61 * oc) + (1.0 * nitro) + (0.1 * mehlich) - (3.5 * pH);
          
//alert(SN);

}

SN = parseFloat(SN);
SP = parseFloat(SP);
SK = parseFloat(SK);
SS = parseFloat(SS);


// let output="";
// output+="SN ="+ SN.toFixed(2) + ","; 
// output+="SP ="+ SP.toFixed(2) + ","; 
// output+="SK ="+ SK.toFixed(2) + ","; 
// output+="SS ="+ SS.toFixed(2) + "\n"; 
//alert(output);


let un_p_value = parseFloat(un_p(rN,SP,rP,aP,dP,aN,dN,SN));
let un_k_value = parseFloat(un_k(rN,SK,rK,aK,dK,aN,dN,SN));
let un_s_value = parseFloat(un_s(rN,SS,rS,aS,dS,aN,dN,SN)); 
let up_n_value = parseFloat(up_n(rP,SP,rN,aN,dN,aP,dP,SN));	 
let up_k_value = parseFloat(up_k(rP,SP,rK,aK,dK,aP,dP,SK));   
let up_s_value = parseFloat(up_s(rP,SP,rS,aS,dS,aP,dP,SS));
let uk_n_value = parseFloat(uk_n(rK,SK,rN,aK,dK,aN,dN,SN));   
let uk_p_value = parseFloat(uk_p(rK,SK,rP,aK,dK,aP,dP,SP));   
let uk_s_value = parseFloat(uk_s(rK,SK,rS,aK,dK,aS,dS,SS));  
let us_n_value = parseFloat(us_n(rS,SS,rN,aS,dN,aN,dN,SN));   
let us_p_value = parseFloat(us_p(rS,SP,rP,aP,dP,aS,dS,SS));   
let us_k_value = parseFloat(us_k(rS,SK,rK,aK,dK,aS,dS,SS));  

// alert(up_n_value);
//alert(up_k_value);
// alert(up_s_value);

//============================ SELECTED ACTUAL UPTAKE==========================
let UN = Math.max(un_p_value,un_k_value,un_s_value);
let UP = Math.max(up_n_value,up_k_value,up_s_value);
let UK = Math.max(uk_n_value,uk_p_value,uk_s_value);
let US = Math.max(us_n_value,us_p_value,us_k_value);

let output="";
output+="UN ="+ UN.toFixed(2) + ","; 
output+="UP ="+ UP.toFixed(2) + ","; 
output+="UK ="+ UK.toFixed(2) + ","; 
output+="US ="+ US.toFixed(2) + "\n"; 
//alert(output);
// ======================================CALCULATION OF YIELD RANGES===================
let YNa = aN * Math.max(0, UN-rN);
let YNd = dN * Math.max(0, UN-rN);	
let YPa = aP * Math.max(0, UP-rP);
let YPd = dP * Math.max(0, UP-rP);	
let YKa = aK * Math.max(0, UK-rK);
let YKd = dK * Math.max(0, UK-rK);	
let YSa = aS * Math.max(0, US-rS);
let YSd = dS * Math.max(0, US-rS);


//alert(2* ((Math.min(YPd,YKd,YSd,Ymax) -YPa)  * (UN-rN - (YPa/dN))));


// ========================COMBINING YIELD RAGES TO ACHIEVE AN ULTIMATE YIELD RANGE==========

let YNP_Raw =YPa + ((2* ((Math.min(YPd,YKd,YSd,Ymax) -YPa)  * (UN-rN - (YPa/dN))))/((Math.min(YPd,YKd,YSd,Ymax)/aN)-(YPa/dN))) -(((Math.min(YPd,YKd,YSd,Ymax) -YPa) * (UN-rN-(YPa/dN))**2)/(((Math.min(YPd,YKd,YSd,Ymax)/aN)-(YPa/dN))**2));

let YNK_Raw =YKa + ((2* ((Math.min(YPd,YKd,YSd,Ymax) -YKa)  * (UN-rN - (YKa/dN))))/((Math.min(YPd,YKd,YSd,Ymax)/aN)-(YKa/dN))) -(((Math.min(YPd,YKd,YSd,Ymax) -YKa) * (UN-rN-(YKa/dN))**2)/(((Math.min(YPd,YKd,YSd,Ymax)/aN)-(YKa/dN))**2));

let YNS_Raw =YSa + ((2* ((Math.min(YPd,YKd,YSd,Ymax) -YSa)  * (UN-rN - (YSa/dN))))/((Math.min(YPd,YKd,YSd,Ymax)/aN)-(YSa/dN))) -(((Math.min(YPd,YKd,YSd,Ymax) -YSa) * (UN-rN-(YSa/dN))**2)/(((Math.min(YPd,YKd,YSd,Ymax)/aN)-(YSa/dN))**2));

let YPN_Raw =YNa + ((2* ((Math.min(YNd,YKd,YSd,Ymax) -YNa)  * (UP-rP- (YNa/dP))))/((Math.min(YNd,YKd,YSd,Ymax)/aP)-(YNa/dP))) -(((Math.min(YNd,YKd,YSd,Ymax) -YNa) * (UP-rP-(YNa/dP))**2)/(((Math.min(YNd,YKd,YSd,Ymax)/aP)-(YNa/dP))**2));

let YPK_Raw =YKa + ((2* ((Math.min(YNd,YKd,YSd,Ymax) -YKa)  * (UP-rP- (YKa/dP))))/((Math.min(YNd,YKd,YSd,Ymax)/aP)-(YKa/dP))) -(((Math.min(YNd,YKd,YSd,Ymax) -YKa) * (UP-rP-(YKa/dP))**2)/(((Math.min(YNd,YKd,YSd,Ymax)/aP)-(YKa/dP))**2));


let YPS_Raw =YSa + ((2* ((Math.min(YNd,YKd,YSd,Ymax) -YSa)  * (UP-rP- (YSa/dP))))/((Math.min(YNd,YKd,YSd,Ymax)/aP)-(YSa/dP))) -(((Math.min(YNd,YKd,YSd,Ymax) -YSa) * (UP-rP-(YSa/dP))**2)/(((Math.min(YNd,YKd,YSd,Ymax)/aP)-(YSa/dP))**2));

let YKN_Raw =YNa + ((2* ((Math.min(YNd,YPd,YSd,Ymax) -YNa)  * (UK-rK- (YNa/dK))))/((Math.min(YNd,YPd,YSd,Ymax)/aK)-(YNa/dK))) -(((Math.min(YNd,YPd,YSd,Ymax) -YNa) * (UK-rK-(YNa/dK))**2)/(((Math.min(YNd,YPd,YSd,Ymax)/aK)-(YNa/dK))**2));

let YKP_Raw =YPa + ((2* ((Math.min(YNd,YPd,YSd,Ymax) -YPa)  * (UK-rK- (YPa/dK))))/((Math.min(YNd,YPd,YSd,Ymax)/aK)-(YPa/dK))) -(((Math.min(YNd,YPd,YSd,Ymax) -YPa) * (UK-rK-(YPa/dK))**2)/(((Math.min(YNd,YPd,YSd,Ymax)/aK)-(YPa/dK))**2));


let YKS_Raw =YSa + ((2* ((Math.min(YNd,YPd,YSd,Ymax) -YSa)  * (UK-rK- (YSa/dK))))/((Math.min(YNd,YPd,YSd,Ymax)/aK)-(YSa/dK))) -(((Math.min(YNd,YPd,YSd,Ymax) -YSa) * (UK-rK-(YSa/dK))**2)/(((Math.min(YNd,YPd,YSd,Ymax)/aK)-(YSa/dK))**2));

let YSN_Raw =YNa + ((2* ((Math.min(YNd,YPd,YKd,Ymax) -YNa)  * (US-rS- (YNa/dS))))/((Math.min(YNd,YPd,YKd,Ymax)/aS)-(YNa/dS))) -(((Math.min(YNd,YPd,YKd,Ymax) -YNa) * (US-rS-(YNa/dS))**2)/(((Math.min(YNd,YPd,YKd,Ymax)/aS)-(YNa/dS))**2));

let YSP_Raw =YPa + ((2* ((Math.min(YNd,YPd,YKd,Ymax) -YPa)  * (US-rS- (YPa/dS))))/((Math.min(YNd,YPd,YKd,Ymax)/aS)-(YPa/dS))) -(((Math.min(YNd,YPd,YKd,Ymax) -YPa) * (US-rS-(YPa/dS))**2)/(((Math.min(YNd,YPd,YKd,Ymax)/aS)-(YPa/dS))**2));

let YSK_Raw =YKa + ((2* ((Math.min(YNd,YPd,YKd,Ymax) -YKa)  * (US-rS- (YKa/dS))))/((Math.min(YNd,YPd,YKd,Ymax)/aS)-(YPa/dS))) -(((Math.min(YNd,YPd,YKd,Ymax) -YPa) * (US-rS-(YKa/dS))**2)/(((Math.min(YNd,YPd,YKd,Ymax)/aS)-(YPa/dS))**2));

let YNP_RN = Math.max(0, YNP_Raw);
let YNP = Math.min(YNP_RN, Ymax);


let YNK_RN = Math.max(0, YNK_Raw);
let YNK = Math.min(YNK_RN, Ymax);

let YNS_RN = Math.max(0, YNS_Raw);
let YNS = Math.min(YNS_RN, Ymax);

let YPN_RN = Math.max(0, YPN_Raw);
let YPN = Math.min(YPN_RN, Ymax);

let YPK_RN = Math.max(0, YPK_Raw);
let YPK = Math.min(YPK_RN, Ymax);

let YPS_RN = Math.max(0, YPS_Raw);
let YPS = Math.min(YPS_RN, Ymax);

let YKN_RN = Math.max(0, YKN_Raw);
let YKN = Math.min(YKN_RN, Ymax);

let YKP_RN = Math.max(0, YKP_Raw);
let YKP = Math.min(YKP_RN, Ymax);


// let YKS_RN = Math.max(0, YKP_Raw);
// let YKP = Math.min(YKP_RN, Ymax);

let YKS_RN = Math.max(0, YKS_Raw);
let YKS = Math.min(YKS_RN, Ymax);

let YSN_RN = Math.max(0, YSN_Raw);
let YSN = Math.min(YSN_RN, Ymax);

let YSP_RN = Math.max(0, YSP_Raw);
let YSP = Math.min(YSP_RN, Ymax);

let YSK_RN = Math.max(0, YSK_Raw);
let YSK = Math.min(YSK_RN, Ymax);



// Ultimate Yield
let YU=((YNP+YNK+YNS+YPN+YPK+YPS+YKN+YKP+YKS+YSN+YSP+YSK)/12);

console.log("----------------- YIELD ULTImate -------------------------")
console.log({YU})






// STEP 2 INPUTS
//	var target_yield=Ext.getCmp('target_yield').getValue();
//	var fert_condition=Ext.getCmp("fert_condition").getValue();
  

// BEGIN COMPUTATIONS  
let yieldDifference= inputAttainableYield - YU;

// internal efficiencies
var IEN =YU/n_uptake;	
var IEP =YU/p_uptake;	
var IEK =YU/k_uptake;	
var IES =YU/s_uptake;	

// Fertilizer ** Nutrient Recommendation not Fertilizer Recommendations
var fr_N= yieldDifference/IEN; 
var fr_P= (yieldDifference/IEP) * 2.290;// P2O5; 
var fr_K= (yieldDifference/IEK) * 1.205; //K2O
var fr_S= yieldDifference/IES; 

/*
 var fertilizer = [];
    var fertilizer_id = [];
  var f_nvalue = [];	
    var f_pvalue = [];	
    var f_kvalue = [];	
    var f_svalue = [];		  
    var f_rowid = [];
    


  var j=0;
  var t_nvalue=0;
  var t_pvalue=0;
  var t_kvalue=0;
  var t_svalue=0;
    Ext.getCmp('grid_splitter').getStore().each(function(record) {
    
  fertilizer.push(record.get('f_name'));
  fertilizer_id.push(record.get('fertilizer_id'));
  f_nvalue.push(record.get('f_nvalue'));
  f_pvalue.push(record.get('f_pvalue'));
  f_kvalue.push(record.get('f_kvalue'));
  f_svalue.push(record.get('f_svalue'));
  
  t_nvalue=t_nvalue + parseFloat(record.get('f_nvalue'));
  t_pvalue=t_pvalue + parseFloat(record.get('f_pvalue'));
  t_kvalue=t_kvalue + parseFloat(record.get('f_kvalue'));
  t_svalue=t_svalue + parseFloat(record.get('f_svalue'));
  
    f_rowid.push(j);
    j++;
 
  });



 

  // Get Organic Fertilizers	
  var ofertilizer = [];
    var ofertilizer_id = [];
  var oqty = [];
    var uom = []; 
    var nvalue = [];	
    var pvalue = [];	
    var kvalue = [];	
    var svalue = [];		  
  var o_rowid = [];
  
  var i=0;
  
  var o_nvalue=0;
  var o_pvalue=0;
  var o_kvalue=0;
  var o_svalue=0;
    
  
    Ext.getCmp('organic_grid').getStore().each(function(record) {
    ofertilizer.push(record.get('ofertilizer'));
  ofertilizer_id.push(record.get('ofertilizer_id'));
  uom.push(record.get('uom'));
  oqty.push(record.get('oqty'));
  nvalue.push(record.get('nvalue'));
  pvalue.push(record.get('pvalue'));
  kvalue.push(record.get('kvalue'));
  svalue.push(record.get('svalue'));
  
  
  
  o_nvalue=o_nvalue + (parseFloat(record.get('nvalue')) * parseFloat(record.get('oqty')) * parseFloat(record.get('weight')));
  o_pvalue=o_pvalue + (parseFloat(record.get('pvalue')) * parseFloat(record.get('oqty')) *parseFloat(record.get('weight')));
  o_kvalue=o_kvalue + (parseFloat(record.get('kvalue')) * parseFloat(record.get('oqty'))*parseFloat(record.get('weight')));
  o_svalue=o_svalue + (parseFloat(record.get('svalue')) * parseFloat(record.get('oqty'))*parseFloat(record.get('weight')));
  o_rowid.push(i);
  i++;

  });


// subtract the organic fertilizers from the recommendation
  var n_final_recommendation =fr_N - (o_nvalue);// only 100% will be utilized
var p_final_recommendation =fr_P - (o_pvalue);
var k_final_recommendation =fr_K - (o_kvalue);
var s_final_recommendation =fr_S - (o_svalue);

// divide by 3 for nitrogenn
//var QNitrogen = n_final_recommendation/3;
 //alert(t_nvalue);
var QN=(n_final_recommendation * 100 * field_size)/ t_nvalue;
var QP=(p_final_recommendation * 100 * field_size)/ t_pvalue;
var QK=(k_final_recommendation * 100 * field_size)/ t_kvalue;
var QS=(s_final_recommendation * 100 * field_size)/ t_svalue;




*/







let html = `
 <html>
      <style>
            table {
              width : 100%;
            }
      </style>
      <h1>Fertilizer Recommendations</h1>
      <table border="1">

          <tr>
              <th> SN </th>
              <th> Description </th>
              <th> Value </th>
          </tr>
         
          <tr>
            <td>1</td>
            <td>YIELD ULTIMATE </td> 
            <td> ${YU}</td>
          </tr>
          
          <tr> 
             <td>2</td>
             <td> FR_N </td>
             <td> ${fr_N}</td>
          </tr>

      </table>

 </html>
`

       

this.setState({
    html : html,
    showDisplayResult:true,
    _YU : YU,
    _yieldDifference : yieldDifference,
    _fr_N : fr_N,
    _fr_P : fr_P,
    _fr_K : fr_K,
})

       }catch(e){
         Alert.alert(e.message)
       }
/*Ext.getCmp('ultimate_yield').setValue(YU);

Ext.getCmp('field_size').focus(true,10); 	
                

Ext.getCmp('rt_n_uptake').setValue(n_uptake);
Ext.getCmp('rt_p_uptake').setValue(p_uptake);
Ext.getCmp('rt_k_uptake').setValue(k_uptake);
Ext.getCmp('rt_s_uptake').setValue(s_uptake);*/

    
    }

   _BackIcon = (style) => (
    <Icon {...style}  name='arrow-back'/>
  );

   _closeIcon = (style) => (
    <Icon {...style} name='close-outline'/>
  );
  
    _navigateBack(){
         this.props.navigation.goBack();
    }

    _dismissModal(){
        this.setState({
            modal:false
        })
    }

 
    _showModal(item){
        this.setState({
            modal:true,
            selectedEcology:item
        })
    }

    _dismissModalFinish(){
       this.setState({
           finishModal:false
       },()=>{
           this.showToast()
       })
        
    }

    _showFinishModal(){
        this.runAlgorithm();
       
    }

    _add(){
        const {fertilizer,selectedFertilizerType,selectedFertilizerSource} = this.state;


        let fert = {fertilizer,selectedFertilizerType,selectedFertilizerSource};

        this.props.addFertilizerSource(fert)

        this._dismissModal();
        
    }

    _statesModal(){

        return(
           <Modal
            ref={"neComment"}
            backdrop={true}
            backButtonClose
            style={styles.mainContainer}
            isOpen={this.state.modal}
            onClosed={this._dismissModal.bind(this)}
          >
             <StatusBar translucent backgroundColor="transparent"/>
             <Layout style={styles.mainContainer}>
                <TopNavigation
                    
                        leftControl={this._closeModalAction()}
                        title={""}
                />

                  <Text style={styles.modalHead} category="h3">{pageTitle}</Text>

                 
                 <Layout style={[styles.container,{paddingHorizontal:20}]}>
                    <Select
                        refs={refs=>this.f = refs}
                        label="Fertilizer Source"
                        size="large"
                        labelStyle={styles.labelStyle}
                        onSelect={this._selectedSource.bind(this)}
                        data={formattToSelectOption("name",this.props.fertilizerSource)}
                        style={styles.select}

                    />

                    <Select
                        ref={(ref)=>this.fType1= ref}
                        label="Fertilizer Type"
                        size="large"
                        labelStyle={styles.labelStyle}
                        onSelect={this._selectedType.bind(this)}
                        data={formattToSelectOption("name",this.props.fertilizerType)}
                        style={styles.select}
                        multiSelect={false}

                    />

                    <Select
                        ref={(ref)=>this.fType2= ref}
                        label="Fertilizer"
                        size="large"
                        style={styles.select}
                        labelStyle={styles.labelStyle}
                        onSelect={this._selectedFertilizer.bind(this)}
                        data={formattToSelectOption("name",this.props.fertilizers)}
                    />

                    <Button onPress={this._add.bind(this)} icon={renderAddIcon} size="large" style={styles.btnAdd} status="warning">Add Fertilizer</Button>
               </Layout>
           
            </Layout>
          </Modal>
            
        )
    }



    
    _finishingModal(){
     
        return(
           <Modal
            ref={"neComment"}
            backdrop={true}
            style={styles.mainContainer}
            isOpen={this.state.finishModal}
            onClosed={this._dismissModalFinish.bind(this)}
          >
             <StatusBar translucent backgroundColor="transparent"/>
             <Layout style={{flex:1,justifyContent:'center',alignContent:'center'}}>
            

             <SpinKit size={200} type="Bounce" color="orange" style={{alignSelf:'center'}} />

             <Text style={[styles.modalHead,{textAlign:'center'}]} category="h3">Initializing Fertilizer Application.....</Text>


               
           
            </Layout>
          </Modal>
            
        )
    }

    
  

    _closeModalAction = () => (
        <TopNavigationAction onPress={this._dismissModal.bind(this)} icon={this._closeIcon.bind(this)}/>
    );

    _closeResultModalAction = () => (
        <TopNavigationAction onPress={()=>this.setState({showDisplayResult:false},()=>{
            this.props.navigation.navigate("Index")
        })} icon={this._closeIcon.bind(this)}/>
    );

    _BackAction = () => (
        <TopNavigationAction onPress={this._navigateBack.bind(this)} icon={this._BackIcon.bind(this)}/>
    );

    _renderFertilizer = ({ item, index }) => (
            <ListItem
                title={`${item.fertilizer.name}`}
                description={`${""}`}
                icon={renderItemIcon}
                style={styles.listItem}
                children={this._renderChildren(item,index)}
                titleStyle={styles.titleList}
                //   accessory={renderItemAccessory}
             />
    );


    _renderChildren(item,index){
           return(
            <Layout style={styles.list}>
                 <Layout style={styles.middle}>
                    <Layout style={styles.contItem}>
                        <Text  style={styles.label}>Fertilizer Source</Text>
                        <Text style={styles.mainText}>{item.selectedFertilizerSource.name}</Text>
                    </Layout>
                   
                    <Layout  style={styles.contItem}>
                        <Text style={styles.label}>Fertilizer Type</Text>
                        <Text style={styles.mainText} >{item.selectedFertilizerType.name}</Text>
                    </Layout>

                    <Layout style={styles.contItem} category="h5">
                       <Text style={styles.label}>Fertilizer</Text>
                        <Text style={styles.mainTextHead}>{item.fertilizer.name}</Text>
                    </Layout>
                 </Layout>
                 <Layout style={styles.right}>
                       <Button onPress={this._removeItem.bind(this,index)}  appearance="ghost"  icon={trash} size="large" status="warning">Remove</Button>
                 </Layout>
                 
            </Layout>
           )
    }

    _removeItem(index){
        this.props.removeFertilizerSource(index)
    }


    _selectedType(item){
      
        this.setState({
            selectedFertilizerType:item,
        },()=>{
            this.props.getFertilizers({type_id:item._id})
        })
  }


  _selectedFertilizer(item){

    
    this.setState({
        fertilizer:item
    },()=>{

    })
}
   

  _selectedSource(item){
       
        this.setState({
            selectedFertilizerSource:item
        },()=>{
            this.props.getFertilizerType({source:item._id})
        })
  }

  componentWillUnmount(){


  }

  componentDidMount(){
        this.props.getFertilizerSources();
  }

  _ListEmptyComponent(){
      return(
          <Layout style={styles.emptyList}>
              <Text style={[{fontFamily:'sans-serif-light',letterSpacing:3},{textAlign:'center'}]} category="h6">No fertilizer selected</Text>
              <Button onPress={this._showModal.bind(this)} status="warning" style={{alignSelf:'center',marginTop:10}} icon={renderAddIcon}>Add Fertilizer</Button>
          </Layout>
      )
  }


  showToast(){
      Toast.show({
          text:"Finished successfully!",
          style:{backgroundColor:"orange",marginBottom:10,marginHorizontal:10,borderRadius:5},
          textStyle:{color:"white"},position:"bottom",duration:2000})
  }





  _displayResult(){

        return(
           <Modal
            ref={"neComment"}
            backdrop={true}
            backButtonClose
            style={styles.mainContainer}
            isOpen={this.state.showDisplayResult}
            onClosed={()=>this.setState({showDisplayResult:false},()=>{
            })}
          >
             <StatusBar translucent backgroundColor="transparent"/>
             <Layout style={styles.mainContainer}>
               
                 
                  <Button 
                       onPress={()=>this.createPDF()} 
                       style={[styles.btnAdd,{width:150,alignSelf:'flex-end',marginRight:10}]} status="warning">Save As PDF</Button>

                
               <WebView textZoom={300} source={{html:this.state.html}}/>

               
            </Layout>
          </Modal>
            
        )
    }


  render(){

    
    return (
         <Layout appearance="ghost" style={styles.mainContainer}>
              <StatusBar translucent={true} backgroundColor="transparent"/>
              <TopNavigation
                    leftControl={this._BackAction()}
                
                    title={""}
                    style={styles.topNav}
                    titleStyle={styles.titleStyle}
                />
                <Text style={styles.modalHead} category="h3">{pageTitle}</Text>
               <Layout appearance="ghost" style={styles.subContainer}>
                  
        
               
                            
                 {
                     this.props.addedFertilizerSources.length < 1?
                     this._ListEmptyComponent():
                     <Layout style={styles.mainContainer}>
                        <List
                        appearance="ghost"
                        style={{marginTop:10}}
                        data={this.props.addedFertilizerSources}
                        renderItem={this._renderFertilizer.bind(this)}
                        /> 
                        <Button onPress={()=>this._showFinishModal()} style={styles.btnRight} icon={chevronRigh} status="warning">Finish</Button>
                     </Layout>
                 }


                    
               </Layout>
               {this._statesModal()}
               {this._finishingModal()}
               {this._displayResult()}
               {
                   this.props.addedFertilizerSources.length > 0 && !this.state.modal && !this.state.finishModal?
                    !this.state.showDisplayResult ?<Fab onPress={this._showModal.bind(this)}/>:null
                   :
                   null
               }
         </Layout>
    );
  }
};

const styles = StyleSheet.create({
   mainContainer:{
    flex:1,
    zIndex:400
    
   },
   labelStyle:{
      marginTop:15,
      fontSize:16
   },
   evaBtnStyle:{
        marginBottom:10
   },
   subContainer:{
       flex:1,
        paddingHorizontal:20,
   },
   topNav:{
       marginTop:20
   },
   titleStyle:{
       fontWeight:'bold',
   },
   listItem:{
       marginBottom:4,
       paddingVertical:20,
       borderTopColor:'#f4f4f4',borderTopWidth:1,
       borderBottomColor:'#f4f4f4',borderBottomWidth:1,


   },
   titleList:{
       fontSize:17
   },
   modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 256,
    padding: 16,
  },
  backdrop: {

},
  modalHead:{
      marginLeft:20,
      fontFamily:'sans-serif-light'
  },
  modalSubHead:{
      marginHorizontal:20
  },
  select:{
      marginTop:20,
  },
  btnAdd:{
      marginTop:30
  }
  ,
  emptyList:{
      flex:1,
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center'
  },
  label:{
      fontSize:10,
      marginRight:20,
      marginBottom:3
  },
  contItem:{

  },
  mainText:{
      marginBottom:-5
  },
  mainTextHead:{
      fontWeight:"bold",
      marginBottom:-5,
  },
  list:{
     flex:1
  },
  middle:{
      flex:1,
      flexDirection:'row'
  },
  right:{
      alignSelf:'flex-end'
  },
  contItem:{
      flex:1
  },
  btnRight:{
    alignSelf:"flex-end",
    marginBottom:20
  },
})



export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(FertilizerSourceSplitting)
  
