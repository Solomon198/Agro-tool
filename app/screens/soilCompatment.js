import React from 'react';
import {ListItem,Header,List,Body,Left,Title,Icon} from 'native-base';
import {View,Text,StyleSheet,TouchableOpacity, ScrollView} from 'react-native'
import { Button, Avatar,Input} from '@ui-kitten/components';
import { connect } from 'react-redux'

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        
        clay:state.SoilData.clay,
        pH:state.SoilData.pH,
        k:state.SoilData.k,
        mg : state.SoilData.mg,
        cec:state.SoilData.cec,
        mehlich: state.SoilData.mehlich,
        oc: state.SoilData.oc,
        n: state.SoilData.n,
        s: state.SoilData.s,
        zn: state.SoilData.zn,
        ca: state.SoilData.ca
   
    }
  }
  
  
  //actions
  const mapDispatchToProps = (dispatch)=>({
  
    setClay : (payload)=>dispatch({type:"DO-SET-CLAY",payload:payload}),
    setPh : (payload)=>dispatch({type:"DO-SET-PH",payload:payload}),
    setK : (payload)=>dispatch({type:"DO-SET-K",payload:payload}),
    setMg : (payload)=>dispatch({type:"DO-SET-MG",payload:payload}),
    setCec : (payload)=>dispatch({type:"DO-SET-CEC",payload:payload}),
    setMehlich : (payload)=>dispatch({type:"DO-SET-MEHLICH",payload:payload}),
    setOc : (payload)=>dispatch({type:"DO-SET-OC",payload:payload}),
    setN : (payload)=>dispatch({type:"DO-SET-N",payload:payload}),
    setS : (payload)=>dispatch({type:"DO-SET-S",payload:payload}),
    setZn : (payload)=>dispatch({type:"DO-SET-ZN",payload:payload}),
    setCa : (payload)=>dispatch({type:"DO-SET-CA",payload:payload}),
    setSoilComponent:(payload)=>dispatch({type:"DO-SET-SOIL-DATA",payload:payload})

   
  })

 class SoilComponents extends React.Component{



    next(){
      let soilData = {
        clay:this.props.clay,
        pH:this.props.pH,
        k:this.props.k,
        mg : this.props.mg,
        cec:this.props.cec,
        mehlich: this.props.mehlich,
        oc: this.props.oc,
        n: this.props.n,
        s: this.props.s,
        zn: this.props.zn,
        ca: this.props.ca
   
      }  
      this.props.setSoilComponent(soilData)
      this.props.navigation.navigate("FarmersInfo")
    }

    render(){
         return(
             <View style={{flex:1,backgroundColor:"whitesmoke"}}>
                 <Header style={{backgroundColor:"whitesmoke",marginTop:20}} androidStatusBarColor="#ce901d">
                     <Left style={{maxWidth:50}}>
                         <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{maxWidth:50,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                             <Icon name="arrow-back"/>
                         </TouchableOpacity>
                     </Left>
                     <Body>
                           <Title style={{color:"#000"}}>
                               Setting Own Data
                           </Title>
                     </Body>
                 </Header>
                 <ScrollView style={{marginHorizontal:10}} showsVerticalScrollIndicator={false}> 
                          
                 <Input
                    status="warning"
                    label="Clay(%)"
                    style={{marginHorizontal:10,marginTop:5}}
                    size="small"
                    onChangeText={(text)=>this.props.setClay(text)}
                    keyboardType="numeric"
                    placeholder={`Enter "Clay(%)"`}
                    value={this.props.clay}
                />

                 <Input
                    status="warning"
                    label="pH(H2O)"
                    style={{marginHorizontal:10,marginTop:5}}
                    size="small"
                    onChangeText={(text)=>this.props.setPh(text)}
                    keyboardType="numeric"
                    placeholder={`Enter "pH(H2O)"`}
                    value={this.props.pH}
                />


                   <Input
                    status="warning"
                    label="K(Cmolc/Kg)"
                    style={{marginHorizontal:10,marginTop:5}}
                    size="small"
                    onChangeText={(text)=>this.props.setK(text)}
                    keyboardType="numeric"
                    placeholder={`Enter "K(Cmolc/Kg)"`}
                    value={this.props.k}
                />

                  <Input
                    status="warning"
                    label="Magnesium"
                    style={{marginHorizontal:10,marginTop:5}}
                    size="small"
                    keyboardType="numeric"
                    onChangeText={(text)=>this.props.setMg(text)}
                    placeholder={`Enter "Magnesium"`}
                    value={this.props.mg}
                />

                  <Input
                    status="warning"
                    label="CEC"
                    style={{marginHorizontal:10,marginTop:5}}
                    size="small"
                    keyboardType="numeric"
                    onChangeText={(text)=>this.props.setCec(text)}
                    placeholder={`Enter "CEC"`}
                    value={this.props.cec}
                />

                   <Input
                    status="warning"
                    label="Mehlich P(mg/kg)"
                    style={{marginHorizontal:10,marginTop:5}}
                    size="small"
                    onChangeText={(text)=>this.props.setMehlich(text)}
                    keyboardType="numeric"
                    placeholder={`Enter "Mehlich P(mg/kg)"`}
                    value={this.props.mehlich}
                />

                 <Input
                    status="warning"
                    label="OC(g/kg)"
                    style={{marginHorizontal:10,marginTop:5}}
                    size="small"
                    onChangeText={(text)=>this.props.setOc(text)}
                    keyboardType="numeric"
                    placeholder={`Enter "OC(g/kg)"`}
                    value={this.props.oc}
                />

                   <Input
                    status="warning"
                    label="Nitrogen(g/Kg)"
                    style={{marginHorizontal:10,marginTop:5}}
                    size="small"
                    keyboardType="numeric"
                    onChangeText={(text)=>this.props.setN(text)}
                    placeholder={`Enter "Nitrogen(g/Kg)"`}
                    value={this.props.n}
                />

                  <Input
                    status="warning"
                    label="S(mg/kg)"
                    style={{marginHorizontal:10,marginTop:5}}
                    size="small"
                    keyboardType="numeric"
                    onChangeText={(text)=>this.props.setS(text)}
                    keyboardType="numeric"
                    placeholder={`Enter "S(mg/kg)"`}
                    value={this.props.s}
                />

                 <Input
                    status="warning"
                    label="Zinc(mg/kg)"
                    style={{marginHorizontal:10,marginTop:5}}
                    size="small"
                    keyboardType="numeric"
                    onChangeText={(text)=>this.props.setZn(text)}
                    placeholder={`Enter "Zinc(mg/kg)"`}
                    value={this.props.zn}
                />

                 <Input
                    status="warning"
                    label="Ca(Cmolc/kg)"
                    style={{marginHorizontal:10,marginTop:5}}
                    size="small"
                    keyboardType="numeric"
                    onChangeText={(text)=>this.props.setCa(text)}
                    placeholder={`Enter "Ca(Cmolc/kg)"`}
                    value={this.props.ca}
                />



                
                 
                 
                 
                     <View style={{flexDirection:"row",marginBottom:10,marginTop:10,flex:1}}>
                           
                            <View style={{flex:1}}>
                                <TouchableOpacity style={{backgroundColor:"#ce901d",marginHorizontal:10,paddingVertical:8,borderRadius:5}} onPress={()=>this.next()}>
                                    <Text  style={{fontSize:20,color:"#fff",alignSelf:'center'}}>
                                        Next
                                    </Text>
                                </TouchableOpacity>
                            </View>
                     </View>
              </ScrollView>
             </View>
         )
    }
}


const styles = StyleSheet.create({
    textStyle:{
       textTransform:"capitalize"
    },
  
    btnAction:{
          backgroundColor:"#ce901d",
          marginVertical:1,
          borderRadius:10,
          paddingVertical:20
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
  )(SoilComponents)