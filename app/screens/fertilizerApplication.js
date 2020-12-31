
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

import Fab from '../components/fab';

import EvaButtons from '../components/evaButtons';
import { Alert } from 'react-native';

const pageTitle = "Fertilizer Application";
const pageSub = "Selected Fertilizers";

function formattToSelectOption(key,data){
  data.forEach((val)=>{
    val["text"] = val[key];
  })

  return data;
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    
    uom:state.FertilizerApplication.uom,
    organicFertilizers:state.FertilizerApplication.organicFertilizers,
    loadingFertilizerOptions:state.FertilizerApplication.loadingFertilizerOptions,
    fertilizers:state.FertilizerApplication.fertilizers
  }
}


//actions
const mapDispatchToProps = (dispatch)=>({
    getFertilizerOptions:()=> dispatch({type:"DO-GET-FERTILIZER-OPTION"}),
    addFertilizer:(payload)=> dispatch({type:"DO-ADD-FERTILIZER",payload:payload}),
    removeFertilizer:(payload)=>dispatch({type:"DO-DELETE-FERTILIZER",payload:payload})
})

const renderItemAccessory = (style) => (
    <Button style={style}>FOLLOW</Button>
  );

  const renderItemIcon = (style) => (
    <Icon {...style} name='arrowhead-right-outline'/>
  );


  const chevronRigh = (style) => (
    <Icon {...style} name='arrowhead-right-outline'/>
  );
  

  const trash = (style) => (
    <Icon {...style} name='trash-2-outline'/>
  );

  

  const renderAddIcon = (style) => (
    <Icon {...style}  name='plus-square-outline'/>
  );

class FertilizerApplication extends React.Component{
  constructor(props){
  super(props);
    this.state = {


      selectedFertilizer:{},
      uom:{},
      quantity:null,
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

    validateObj(obj){
        if(Object.keys(obj).length > 0){
            return false
        }

        return true;
    }

    _showModal(item){
        this.setState({
            modal:true,
            selectedEcology:item
        })
    }

    _add(){
       let fertilizer = {
         fertilizer :this.state.selectedFertilizer,
         quantity:this.state.quantity,
         uom : this.state.uom
       }

       this.props.addFertilizer(fertilizer);
       this.setState({modal:false})
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
                        label="Fertilizer"
                        size="large"
                        labelStyle={styles.labelStyle}
                        onSelect={this._selectedSource.bind(this)}
                        data={formattToSelectOption("fertilizer",this.props.organicFertilizers)}
                        style={styles.select}

                    />


                    <Input 
                       label="Quantity"
                       size="small"
                       placeholder="Enter quantity"
                       labelStyle={styles.labelStyle}
                       onChangeText={(text)=>this.setState({quantity:text})}
                       style={styles.select}
                       keyboardType="numeric"
                    />
                    

                    <Select
                        ref={(ref)=>this.fType2= ref}
                        label="Unit"
                        size="large"
                        style={styles.select}
                        labelStyle={styles.labelStyle}
                        onSelect={(option)=>this.setState({uom:option})}
                        data={formattToSelectOption("name",this.props.uom)}
                    />

                    <Button onPress={this._add.bind(this)} icon={renderAddIcon} size="large" style={styles.btnAdd} status="warning">Add Fertilizer</Button>
               </Layout>
           
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

    _renderFertilizer = ({ item, index }) => (
            <ListItem
                title={`${item.fertilizer.fertilizer}`}
                description={``}
                icon={renderItemIcon}
                // onPress={this._showModal.bind(this,item)}
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
                    <Layout style={styles.contItem} category="h5">
                       <Text style={styles.label}>Fertilizer</Text>
                        <Text style={styles.mainTextHead}>{item.fertilizer.fertilizer}</Text>
                    </Layout>
                    <Layout  style={[styles.contItem]}>
                        <Text style={[styles.labelm,{textAlign:"center"}]}>Quantity</Text>
                        <Text style={[styles.mainText,{textAlign:'center'}]} >{item.quantity}</Text>
                    </Layout>
                    <Layout style={styles.contItem}>
                        <Text  style={styles.label}>Units</Text>
                        <Text style={styles.mainText}>{item.uom.name}</Text>
                    </Layout>
                 </Layout>
                 <Layout style={styles.right}>
                       <Button onPress={this._removeItem.bind(this,index)}  appearance="ghost"  icon={trash} size="large" status="warning">Remove</Button>
                 </Layout>
                 
            </Layout>
           )
    }

    _removeItem(index){
          this.props.removeFertilizer(index);
    }


    _selectedType(item){
        let fertilizer = this.state.selectedFertilizer;
        fertilizer.source = fertilizer.source
        fertilizer.type = {text:item};
        fertilizer.fertilizer = "";
        this.setState({
            selectedFertilizer:fertilizer,
        })
  }


  _selectedFertilizer(item){

    let fertilizer = this.state.selectedFertilizer;
    fertilizer.type = fertilizer.type
    fertilizer.source= fertilizer.source
    fertilizer.fertilizer = item;
    this.setState({
        selectedFertilizer:fertilizer
    })
}

_navigate(routeName,payload){
  this.props.navigation.navigate(routeName,payload);
  this._dismissModal();
}
   

  _selectedSource(item){
      
        this.setState({
            selectedFertilizer:item
        })
  }

  componentWillUnmount(){


  }

  componentDidMount(){
     this.props.getFertilizerOptions()
  }

  _ListEmptyComponent(){

      if(this.props.loadingFertilizerOptions == "started" ){
        return  <Layout style={styles.emptyList}>
            <Spinner status="warning"/>
            <Text style={{fontSize:18,marginTop:10}}>
              Getting 
              Available Fertilizers .... 
            </Text>
           </Layout>
      }

      if(this.props.loadingFertilizerOptions == "failed" && this.props.fertilizers.length == 0){
        return  <Layout style={styles.emptyList}>
                            <Text status="danger">
                              Failed to get fertilizers
                            </Text>
                            <Button onPress={()=>this.props.getFertilizerOptions()} status="danger" style={{alignSelf:'center',marginTop:10}} >Get Available Fertilizers</Button>
           </Layout>
      }

      return(
          <Layout style={styles.emptyList}>
              <Text style={[{fontFamily:'sans-serif-light',letterSpacing:3},{textAlign:'center'}]} category="h6">No fertilizer selected</Text>
              <Button onPress={this._showModal.bind(this)} status="warning" style={{alignSelf:'center',marginTop:10}} icon={renderAddIcon}>Add Fertilizer</Button>
          </Layout>
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
                     this.props.fertilizers.length < 1?
                     this._ListEmptyComponent():
                     <Layout style={styles.mainContainer}>
                        <List
                        appearance="ghost"
                        style={{marginTop:10}}
                        data={this.props.fertilizers}
                        extraData={this.props}
                        renderItem={this._renderFertilizer.bind(this)}
                        /> 
                        <Button onPress={this._navigate.bind(this,"FertilizerSourceSplitting",{})} style={styles.btnRight} icon={chevronRigh} status="warning">NEXT</Button>
                     </Layout>
                    
                     
                 }


                          
                    
               </Layout>
               {this._statesModal()}
               {
                   this.props.fertilizers.length > 0 && !this.state.modal?
                   <Fab onPress={this._showModal.bind(this)}/>:
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
  labelm:{
    fontSize:10,
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
  }
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FertilizerApplication)
