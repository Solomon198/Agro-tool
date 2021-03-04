
/**
 *
 * @format
 * @flow
 */

import React from 'react';
import { connect } from 'react-redux'
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
import Modal from 'react-native-modalbox'

import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';

import EvaButtons from '../components/evaButtons';

const pageTitle = "Agro Ecological Zones";

const renderItemAccessory = (style) => (
    <Button style={style}>FOLLOW</Button>
  );

  const renderItemIcon = (style) => (
    <Icon {...style} name='arrowhead-right-outline'/>
  );

  
const mapStateToProps = (state /*, ownProps*/) => {
  return {
    farmersName:state.siteProfiling.farmersName,
    farmersPhoneNumber:state.siteProfiling.farmersPhoneNumber,
    attainableYield:state.siteProfiling.attainableYield,
    siteId :state.siteProfiling.siteId,
    fieldSize :state.siteProfiling.fieldSize
  }
}


//actions
const mapDispatchToProps = (dispatch)=>({
   setFarmersName:(payload)=>dispatch({type:"DO-SET-FARMER-NAME",payload:payload}),
   setFarmersPhone:(payload)=>dispatch({type:"DO-SET-FARMER-PHONE",payload:payload}),
   setAttainableYield:(payload)=>dispatch({type:"DO-SET-ATTAINABLE-YIELD",payload:payload}),
   setSiteId:(payload)=>dispatch({type:"DO-SET-SITE-ID",payload:payload}),
   setfieldSize:(payload)=>dispatch({type:"DO-SET-FIELD-SIZE",payload:payload}),

})




class FarmersInfo extends React.Component{
  constructor(props){
  super(props);
   
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

  
  
    _BackAction = () => (
        <TopNavigationAction onPress={this._navigateBack.bind(this)} icon={this._BackIcon.bind(this)}/>
    );




  _navigate(routeName,payload){
      this.props.navigation.navigate(routeName,payload);
  }

  render(){
    return (
         <Layout appearance="ghost" style={styles.mainContainer}>
              <StatusBar translucent={true} backgroundColor="transparent"/>
              <TopNavigation
                    leftControl={this._BackAction()}
                    title={"Site Profiling"}
                    style={styles.topNav}
                    titleStyle={styles.titleStyle}
                />
                
               <Layout appearance="ghost">

               <Layout  style={styles.expectedYield}>
                    
                    <Input
                        status="warning"
                        label="Site ID"
                        style={styles.input}
                        onChangeText={(text)=>this.props.setSiteId(text)}
                        size="small"
                        placeholder='Enter Site Id'
                        value={this.props.siteId}
                    />
                    
                 </Layout>
                
                  
                   <Layout style={styles.expectedYield}>
                    
                    <Input
                        status="warning"
                        label="Farmers Name"
                        onChangeText={(text)=>this.props.setFarmersName(text)}
                        style={styles.input}
                        size="small"
                        placeholder='Enter Name'
                        value={this.props.farmersName}
                    />
                    
                </Layout>
                <Layout style={styles.expectedYield}>
                    
                    <Input
                        status="warning"
                        label="Phone Number"
                        onChangeText={(text)=>this.props.setFarmersPhone(text)}
                        style={styles.input}
                        size="small"
                        keyboardType="numeric"
                        placeholder='Enter Phone number'
                        value={this.props.farmersPhoneNumber}
                    />
                    
                </Layout>
                
                 <Layout  style={styles.expectedYield}>
                    
                    <Input
                        status="warning"
                        label="Target Yield"
                        style={styles.input}
                        onChangeText={(text)=>this.props.setAttainableYield(text)}
                        size="small"
                        keyboardType="numeric"
                        placeholder='Enter target yield for this site'
                        value={this.props.attainableYield}
                    />
                    
                 </Layout>

                 
                 <Layout  style={styles.expectedYield}>
                    
                    <Input
                        status="warning"
                        label="Field Size"
                        style={styles.input}
                        onChangeText={(text)=>this.props.setfieldSize(text)}
                        size="small"
                        keyboardType="numeric"
                        placeholder='Enter field size'
                        value={this.props.fieldSize}
                    />
                    
                 </Layout>
                 

                 <Layout style={styles.apply}>
                         
                         <Text style={styles.applyText} category="h6">Do you want to apply for fertilzer this year ?</Text>
                          <Layout  style={styles.btnGroup}>
                             <Button onPress={this._navigate.bind(this,"FertilizerApplication",{})} status="warning" style={styles.buttonGroup} size='medium'>Yes</Button>
                             <Button  onPress={this._navigate.bind(this,"FertilizerSourceSplitting",{})} status="warning" style={styles.buttonGroup} size='medium'>No</Button>
                          </Layout>
                      </Layout>        
                       
                    
               </Layout>
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
)(FarmersInfo)
