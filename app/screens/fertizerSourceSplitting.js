
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
import {Toast} from 'native-base'
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

        analysisData : state.siteIdentification.analysisData,


     
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
        selectedFertilizerType:{}



    }
       
  }


    runAlgorithm(){

        const {

            cropParameters,
            attainableYield,
            recoveryFraction,
            recoveryEfficiency,
            nutrientUptakeCommunity,
            soilDataForCommunity,

          } = this.props.analysisData;

            // recovery fraction
         
            let rn=parseFloat(recoveryFraction.RN);
            let rp=parseFloat(recoveryFraction.RP);
            let rk=parseFloat(recoveryFraction.RK);
            let rs=parseFloat(recoveryFraction.RS);

            console.log("-------------------RECOVERY FRACTION-----------------------------");
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
        // this.setState({
        //     finishModal:true
        // },()=>{
        //     this.timer = setTimeout(()=>{
        //            this.props.navigation.navigate("Index");
        //            clearTimeout(this.timer)
        //            this._dismissModalFinish();
        //     },5000)
        // })
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
                        <Button onPress={this._showFinishModal.bind(this)} style={styles.btnRight} icon={chevronRigh} status="warning">Finish</Button>
                     </Layout>
                 }


                    
               </Layout>
               {this._statesModal()}
               {this._finishingModal()}
               {
                   this.props.addedFertilizerSources.length > 0 && !this.state.modal && !this.state.finishModal?
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
  
