
/**
 *
 * @format
 * @flow
 */

import React from 'react';

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
    Select,
    Spinner
    

} from '@ui-kitten/components';
import Modal from 'react-native-modalbox'

import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { connect } from 'react-redux'
import { Alert } from 'react-native';

const mapStateToProps = (state /*, ownProps*/) => {
  return {

    loadingZones : state.siteIdentification.loadingZones,
    loadingStates:  state.siteIdentification.loadingStates,
    loadingLga :  state.siteIdentification.loadingLga,
    loadingAnalysisData: state.siteIdentification.loadingAnalysisData,

    zones : state.siteIdentification.zones,
    states : state.siteIdentification.states,
    communities : state.siteIdentification.communities,
    selectedZone : state.siteIdentification.selectedZone,
    selectedState:state.siteIdentification.selectedState,
    selectedLga : state.siteIdentification.selectedLga,
    analysisData : state.siteIdentification.analysisData,
    useOwnData: state.siteIdentification.useOwnData,
    usePredefineData : state.siteIdentification.usePredefineData,
  }
}


//actions
const mapDispatchToProps = (dispatch)=>({

  getZones : ()=> dispatch({type:"DO-GET-ZONE"}),
  getStates : (payload)=> dispatch({type:"DO-GET-STATES",payload:payload}),
  getCommunities : (payload)=> dispatch({type:"DO-GET-LGA",payload:payload}),
  getAnalysisData : (payload)=> dispatch({type:"DO-GET-ANALYSIS-DATAS",payload:payload}),


  setZone : (payload)=> dispatch({type:"DO-SET-ZONE",payload:payload}),
  setStates: (payload)=> dispatch({type:"DO-SET-STATE",payload:payload}),
  setCommunity:(payload)=> dispatch({type:"DO-SET-LGA",payload:payload}),

})


function formattToSelectOption(key,data=[]){

      data.forEach((val)=>{
        val["text"] = val[key];
      })

      return data;
}

const RenderStatus = ({status,action,label})=>{
    if(status == "started"){
       return (
        <View style={{flexDirection:"row",marginHorizontal:20}}>
          <Text style={{marginRight:5,color:"gray"}}>loading {label}...</Text>
          <Spinner status="warning" size="tiny"/>
      </View>
      )
       
    }

    if(status == "failed"){
      return (
        <View style={{marginLeft:20}}>
            <Text status="danger" style={{fontSize:12}}>
               failed to get {label}
            </Text>
            <Button style={{minWidth:180,width:180}} onPress={()=>action()} size="tiny" status="danger">
                      Reload {label}
              </Button>
        </View>
        
      )
    }

    return <></>
}




class SiteIdentification extends React.Component{
  constructor(props){
  super(props);
   
  }

   _BackIcon = (style) => (
    <Icon {...style}  name='arrow-back'/>
  );

 
  
    _navigateBack(){
         this.props.navigation.goBack();
    }

   

    
  
    _router(){
          if(this.props.usePredefineData){
            this.props.navigation.navigate("FarmersInfo")
          }else{
            this.props.navigation.navigate("SoilComponent")
          }
    }

   
    _BackAction = () => (
        <TopNavigationAction onPress={this._navigateBack.bind(this)} icon={this._BackIcon.bind(this)}/>
    );

  


  componentDidMount(){
    this.props.getZones();
    console.log(this.props.zones)
  }


  _navigate(routeName,payload){
      this.props.navigation.navigate(routeName,payload);
      this._dismissModal();
  }


  setZone(item){
    this.props.setZone(item);
    this.props.getStates({zone:item._id});
  }

  _getStates(){
    let zone = this.props.selectedZone;
    this.props.getStates({zone:zone._id});
  }

  _setStates(item){
    this.props.setStates(item);
    let zone = this.props.selectedZone;
    let state = item;
    this.props.getCommunities({zone:zone._id,state:state._id});
  }

  _getAnalysisData(){
    let zone = this.props.selectedZone;
    let state = this.props.selectedState;
    let lga =  this.props.selectedLga;
    this.props.getAnalysisData({zone:zone._id,state:state._id,community:lga._id})
  }
 
  setCommunity(item){
    this.props.setCommunity(item);

    let zone = this.props.selectedZone;
    let state = this.props.selectedState;
    let lga =  item;
    this.props.getAnalysisData({zone:zone._id,state:state._id,community:lga._id})



    //get analysisData
  }

  _getCommunities(){
    let zone = this.props.selectedZone;
    let state = this.props.selectedState;
    this.props.getCommunities({zone:zone._id,state:state._id});

  }

  


  render(){
    return (
         <Layout appearance="ghost" style={styles.mainContainer}>
              <StatusBar translucent={true} backgroundColor="transparent"/>
              <TopNavigation
                    leftControl={this._BackAction()}
                    title={"Site Identification"}
                    style={styles.topNav}
                    titleStyle={styles.titleStyle}
                />
                
               <Layout appearance="ghost" >
                  
                   
                   <Select
                        refs={refs=>this.f = refs}
                        label="Select Zone"
                        size="large"
                        labelStyle={styles.labelStyle}
                        onSelect={(item)=>this.setZone(item)}
                        style={styles.select}
                        data={formattToSelectOption("name",this.props.zones)}
                    />

                    <RenderStatus action={()=>this.props.getZones()} label="zones" status={this.props.loadingZones}/>
                   

                    <Select
                        refs={refs=>this.f = refs}
                        label="Select State"
                        size="large"
                        labelStyle={styles.labelStyle}
                        onSelect={(item)=>this._setStates(item)}
                        data={formattToSelectOption("name",this.props.states)}
                        style={styles.select}
                    />

                    <RenderStatus action={()=>this._getStates()} label="states" status={this.props.loadingStates}/>
                   

                    <Select
                        refs={refs=>this.f = refs}
                        label="Local government"
                        size="large"
                        labelStyle={styles.labelStyle}
                        onSelect={(item)=>this.setCommunity(item)}
                        data={formattToSelectOption("name",this.props.communities)}
                        style={styles.select}
                    />

                  <RenderStatus action={()=>this._getCommunities()} label="communities" status={this.props.loadingLga}/>
                   

                   
          
                 

                      
               </Layout>


              <View style={{marginTop:10}}/>
               {
                 this.props.loadingAnalysisData == "started"?
                 <View style={{alignContent:"center",alignItems:'center'}}>
                     <Spinner size="large" status="warning"/>
                     <Text>Getting Site Information</Text>
                 </View>
                 :
                 this.props.loadingAnalysisData == "failed"?
                  <View style={{marginHorizontal:20}}>
                     <Text status="danger">
                       Failed to get site information please try again.
                     </Text>
                     <Button  status="danger" onPress={()=>this._getAnalysisData()}>
                        Get Site information
                       </Button>
                  </View>
                 :
                 this.props.loadingAnalysisData == "success"?
                 <TouchableOpacity style={{marginTop:25}} onPress={()=>this._router()}>
                 <Text  style={{fontSize:20,color:"#ce901d",alignSelf:'center'}}>
                     Next
                 </Text>
</TouchableOpacity>  :null
               }
              
         </Layout>
    );
  }
};

const styles = StyleSheet.create({
   mainContainer:{
    flex:1,
    
   },
   evaBtnStyle:{
        marginBottom:10
   },
   subContainer:{
       flex:1,
       justifyContent:'center',
        alignContent:'center',
        padding:5,
   },
   topNav:{
       marginTop:20
   },
   titleStyle:{
       fontWeight:'bold',
   },
   listItem:{
       marginBottom:4,
       paddingVertical:20
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
  labelStyle:{
    marginTop:15,
    fontSize:16
 },
 select:{
   marginVertical:10,
   marginHorizontal:20
 },
  apply:{
    paddingTop:20,
    height:100,
    justifyContent:"center",
    alignContent:"center",
    alignItems:'baseline'
  

},
applyText:{
    paddingHorizontal:20,
    paddingTop:5,
},
btnGroup:{
    flexDirection:'row',
    paddingBottom:10
},
buttonGroup: {
  margin: 8,
  flex:1
},
expectedYield:{
marginTop:10,
marginHorizontal:20

}
})



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteIdentification)