
/**
 *
 * @format
 * @flow
 */

import React from 'react';

import { Layout, Text, Input, Button, Avatar} from '@ui-kitten/components';
import {Header,Body,Left,Right,Icon,Container,ActionSheet} from 'native-base'
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
  Modal,
  TouchableNativeFeedback
} from 'react-native';
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import EvaButtons from '../components/evaButtons';
const backgroundColor = "#e7ad42"
var BUTTONS = [
        {text:"Maximum Yield",icon:"basket",iconColor:'#3a8b33'},
        {text:"Recovery Fraction",icon:"flask"},
        {text:"Crop Parameter",icon:"rose",iconColor:"#af3673"}, 
        {text:"Agro-Ecological Zone",icon:"navigate",iconColor:"#1b8fd3"}, 
        {text:"Cancel",icon:"close",iconColor:"red"}];
var CANCEL_INDEX = 4;


const mapStateToProps = (state /*, ownProps*/) => {
  return {
    siteIdentification : state.siteIdentification
  }
}

const mapDispatchToProps = (dispatch)=>({
  setOwnData : ()=> dispatch({type:"DO-SET-OPTION-OWN-DATA"}),
  setPrefinedData : ()=> dispatch({type:"DO-SET-OPTION-PREDEFINED-DATA"})
})


class App extends React.Component{
  constructor(props){
  super(props);
  
  }

  state={
    visible:false
  }

  _navigate(){
      this.props.navigation.navigate("AgroEcologicalZone")
  }

  closeModal(){
    this.setState({visible:false})
  }

  openModal(){
    this.setState({visible:true})
  }


  settings(){
      ActionSheet.show(
        {
          options: BUTTONS,
          cancelButtonIndex: CANCEL_INDEX,
          title: "Settings"
        },
        buttonIndex => {
          this.setState({ clicked: BUTTONS[buttonIndex] });
        }
      )
  }

  _settings(){
      return (
        <Modal 
        visible={true}
        onRequestClose={()=>this.closeModal()}
        style={{backgroundColor:'red'}}
        >
            
            <View style={{backgroundColor:"red",flexDirection:"row"}}>
                    <View onPress={()=>this.closeModal()} style={{backgroundColor:"transparent",flex:1}}/>
                    
                    <View tyle={{width:200,backgroundColor:'dodgerblue',marginTop:1,minHeight:100,height:100,borderRadius:2}}>
                        
                    </View>
            </View>
            

        </Modal>
      )
  }

  usePredefineData(){
    this.props.setPrefinedData();
    this.props.navigation.navigate("siteIdentification")
  }

  useOwnData(){
    this.props.setOwnData();
    this.props.navigation.navigate("siteIdentification")
  }

  render(){
    return (
         <Container style={{flex:1}}>
         <ImageBackground style={{flex:1}} source={require("../../assets/img/maize.jpg")}>
               <Header translucent androidStatusBarColor={"transparent"} style={{backgroundColor:"transparent",marginTop:20}}>
               <Left style={{maxWidth:50,alignContent:'center',alignItems:'center'}}>
                   <Icon
                    onPress={()=>this.settings()}
                    style={{width:32,height:32,color:"white"}}
                    type="FontAwesome"
                    name='gear'
                    />
                 </Left>
                 <Body></Body>
                
               </Header>
               <Layout style={{backgroundColor:'transparent',flex:1}}>
                    <Layout style={styles.childContainers}>
                    
                         <Layout style={styles.iconWrapper}>
                            <Icon
                                style={styles.actionsIcon}
                                type="Entypo"
                                name='location'
                            />
                         </Layout>
                         <Button textStyle={styles.labelStyle} size="large" status="warning" style={styles.btnAction}>
                             Use Geofencing
                         </Button>
                     
                    </Layout>
                        <Layout style={styles.childContainers}>
                    
                            <Layout style={styles.iconWrapper}>
                                <Icon
                                    style={styles.actionsIcon} 
                                    type="FontAwesome"
                                    name="gears"
                                />
                            </Layout>
                            <Button onPress={()=>this.usePredefineData()} textStyle={styles.labelStyle} size="large" status="warning" style={styles.btnAction}>
                             Use Pre define data
                         </Button>
                        </Layout>
                        <Layout style={styles.childContainers}>
                          <Layout style={styles.iconWrapper}>
                              <Icon
                                style={styles.actionsIcon}
                                type="MaterialCommunityIcons"
                                name='database-edit'
                            />
                          </Layout>
                          <Button onPress={()=>this.useOwnData()} textStyle={styles.labelStyle} size="large" status="warning" style={styles.btnAction}>
                             Use Own Data
                         </Button>
                        
                    </Layout>
               </Layout>

               
              
          
         </ImageBackground>
         </Container>
    );
  }
};

const styles = StyleSheet.create({
    textStyle:{
       textTransform:"capitalize"
    },
    iconWrapper:{
      width:90,
      height:89,
      borderRadius:100,
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center',
      backgroundColor:backgroundColor,
      borderLeftColor:"#c0820e",
      borderLeftWidth:5,
      borderRightColor:"#c0820e",
      borderRightWidth:5,
      },
    actionsIcon:{
       fontSize:50,
       color:"whitesmoke"
    },
    btnAction:{
          backgroundColor:"#ce901d",
          marginTop:10,
          minWidth:180,
          borderRadius:50
        },
    childContainers:{
          flex:1,
          justifyContent:'center',
          alignContent:'center',
          alignItems:'center',
          marginHorizontal:10,
          borderRadius:10,
          marginTop:2,
          marginBottom:2,
          backgroundColor:'transparent'
    },
    mainContainer:{
      flex:1,
    },
    evaBtnStyle:{
      width:"100%",
    },
    bgImage:{
      width:'100%',
      height:'100%',
      
    },
    overlay:{
      flex:1,
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center',
      backgroundColor:'rgba(255,255,255,0.2)',
      paddingHorizontal:10
    },
    evaBtnTextStyle:{
      letterSpacing:3
    },
    labelStyle:{
      fontWeight:"bold",
      color:"#fff",
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1,},
      textShadowRadius: 10,
      
    }
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)