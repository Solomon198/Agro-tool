
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
    SelectItem

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


class AgroEcologicalZone extends React.Component{
  constructor(props){
  super(props);
    this.state = {
        selectedEcology:{},
        
        modal:false,
    }
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
                   <Text style={styles.modalHead} category="h3">State</Text>
                   <Text style={styles.modalSubHead}>list of state in {this.state.selectedEcology.ecology} ecological zone.</Text>
                   <List
                     style={styles.mainContainer}
                    data={this.state.aState}
                    renderItem={this._renderState.bind(this)}
                    /> 
             
             
           
            </Layout>
          </Modal>
            
        )
    }

    
  

    _closeModalAction = () => (
        <TopNavigationAction onPress={this._dismissModal.bind(this)} icon={this._closeIcon.bind(this)}/>
    );
    _BackAction = () => (
        <TopNavigationAction onPress={this._navigateBack.bind(this)} icon={this._BackIcon.bind(this)}/>
    );

    _renderEcology = ({ item, index }) => (
        <ListItem
          title={`${item.ecology}`}
          description={`${item.description}`}
          icon={renderItemIcon}
          onPress={this._showModal.bind(this,item)}
          style={styles.listItem}
          titleStyle={styles.titleList}
        //   accessory={renderItemAccessory}
        />
    );

    _renderState = ({ item, index }) => (
        <ListItem
          title={`${item.state}`}
          icon={renderItemIcon}
          onPress={this._navigate.bind(this,"Community",{...item,...this.state.selectedEcology})}
          style={styles.listItem}
          titleStyle={styles.titleList}
        //   accessory={renderItemAccessory}
        />
    );


  _navigate(routeName,payload){
      this.props.navigation.navigate(routeName,payload);
      this._dismissModal();
  }

  render(){
    return (
         <Layout  style={styles.mainContainer}>
              <StatusBar translucent={true} backgroundColor="transparent"/>
              <TopNavigation
                    leftControl={this._BackAction()}
                    title={""}
                    style={styles.topNav}
                    titleStyle={styles.titleStyle}
                />
                
               <Layout  style={styles.subContainer}>
                  
                   <Text style={styles.modalHead} category="h3">{pageTitle}</Text>

                   <Select
                        refs={refs=>this.f = refs}
                        label="Select Zone"
                        size="large"
                        labelStyle={styles.labelStyle}
                        onSelect={(item)=>this._showModal(item)}
                        data={this.state.data}
                        style={styles.select}
                        
                    />
                   <Layout style={styles.expectedYield}>
                    
                    <Input
                        status="warning"
                        label="Ultimate Yield"
                        style={styles.input}
                        size="small"
                        keyboardType="numeric"
                        placeholder='Enter value'
                    />
                    
                </Layout>
                <Layout style={styles.expectedYield}>
                    
                    <Input
                        status="warning"
                        label="Field Size"
                        style={styles.input}
                        size="small"
                        keyboardType="numeric"
                        placeholder='Enter value'
                    />
                    
                </Layout>
                <Layout  style={styles.expectedYield}>
                    
                    <Input
                        status="warning"
                        label="Expected Yield"
                        style={styles.input}
                        size="small"
                        keyboardType="numeric"
                        placeholder='Enter value'
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
               {this._statesModal()}
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


export default AgroEcologicalZone;
