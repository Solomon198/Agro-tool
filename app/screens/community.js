
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
    ButtonGroup
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


const pageTitle = "Communities";

const renderItemAccessory = (style) => (
    <Button style={style}>FOLLOW</Button>
  );

  const renderItemIcon = (style) => (
    <Icon {...style} name='arrowhead-right-outline'/>
  );


class Commnuity extends React.Component{
  constructor(props){
  super(props);
    this.state = {
        selectedEcology:{},
        

    }
  }

   _BackIcon = (style) => (
    <Icon {...style}  name='arrow-back'/>
  );

 
    _navigateBack(){
         this.props.navigation.goBack();
    }

   

   

    _BackAction = () => (
        <TopNavigationAction onPress={this._navigateBack.bind(this)} icon={this._BackIcon.bind(this)}/>
    );

    _renderItem = ({ item, index }) => (
        <ListItem
          title={`${item.community}`}
          description={`${item.state}`}
          icon={renderItemIcon}
          onPress={this._navigateBack.bind(this)}
          style={styles.listItem}
          titleStyle={styles.titleList}
        //   accessory={renderItemAccessory}
        />
    );

   

  _navigate(routeName,payload){
      this.props.navigation.navigate(routeName,payload);
  }


  



  render(){

    const {eco_id,state_id} = this.props.navigation.state.params;
    let dataValue = eco_id+state_id;
    return (
         <Layout style={styles.mainContainer}>
              <StatusBar translucent={true} backgroundColor="transparent"/>
              <TopNavigation
                    leftControl={this._BackAction()}
                    title={""}
                    style={styles.topNav}
                    titleStyle={styles.titleStyle}
                />
            
               <Text style={styles.modalHead} category="h3">{pageTitle}</Text>

               <Layout style={styles.subContainer}>

                 {
                     this.state.data[dataValue].length > 0?
                     <Layout style={styles.mainContainer}>

                            <List
                             data={this.state.data[dataValue]}
                             renderItem={this._renderItem.bind(this)}
                           /> 
                    
                       
                    </Layout>:
                   <Layout style={styles.mainContainer}>
                        <Text category="h1" style={styles.emptyCommunity}>No Communities</Text>
                   </Layout>
                
                 }
                    
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
  }
  ,
  emptyCommunity:{
      textAlign:'center',
      fontSize:24,
      fontFamily:"sans-serif-thin",
      marginTop:20
  },
 
})


export default Commnuity;
