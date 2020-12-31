import realm from 'realm';
import Schemas from './schemas/index'
import mongoose from 'mongoose';
import { getRealmObjectCollection } from './utils';

let $realm ;

async function openDataBase(){
      $realm = await Realm.open({schema:[
          Schemas.attainableYield,
          Schemas.community,
          Schemas.cropParameters,
          Schemas.ecologicalZone,
          Schemas.fertilizerNutrientCombination,
          Schemas.fertilizerSource,
          Schemas.fertilizerType,
          Schemas.nutrientUptakeCommunity,
          Schemas.organicFertilizer,
          Schemas.recoveryEfficiency,
          Schemas.recoveryFraction,
          Schemas.soilDataPerCommunity,
          Schemas.states,
          Schemas.units,
          Schemas.uom,
          Schemas.fertilizers
      ]})

    let check =  $realm.objects(Schemas.ecologicalZone.name);
    
    if(check.length == 0){
        initializeDataSets();
    }
      

    
}

openDataBase();

export function initializeDataSets(){

    let attainableYieldsCollection = require("./_default_source/attainableyields.json");
    let community = require("./_default_source/communities.json");
    let cropParameters = require("./_default_source/cropparameters.json");
    let ecologicalZone = require("./_default_source/agroecologicalzones.json");
    let fertilizerNutrientCombination = require("./_default_source/fertilizernutrientcombinations.json");
    let fertilizerSource = require("./_default_source/fertilizersources.json");
    let fertilizerType = require("./_default_source/fertilizertypes.json");
    let nutrientUptakeCommunity = require("./_default_source/nutrientuptakecommunities.json");
    let organicFertilizer = require("./_default_source/organicfertilizers.json");
    let recoveryEfficiency = require("./_default_source/recoveryefficiencies.json");
    let recoveryFraction = require("./_default_source/recoveryfractions.json");
    let soilDataPerCommunity = require("./_default_source/soildatacommunities.json");
    let states = require("./_default_source/states.json");
    let units = require("./_default_source/units.json");
    let uom = require("./_default_source/uoms.json");
    let fertilizers = require('./_default_source/fertilizers.json')

    if(!$realm) openDataBase();

    try{

    $realm.write(()=>{

         //writing uom collection
         uom.forEach((val)=>{
            let objectId = mongoose.Types.ObjectId(val._id.$oid);
            val._id = objectId;
            delete val.__v
            $realm.create(Schemas.uom.name,val);
        })

        fertilizers.forEach((val)=>{
            let objectId = mongoose.Types.ObjectId(val._id.$oid);
            val._id = objectId;
            delete val.__v
            $realm.create(Schemas.fertilizers.name,val);
        })


        //writing units collection
        units.forEach((val)=>{
            let objectId = mongoose.Types.ObjectId(val._id.$oid);
            val._id = objectId;
            delete val.__v
            $realm.create(Schemas.units.name,val);
        })

        //writing states collection
        states.forEach((val)=>{
            let objectId = mongoose.Types.ObjectId(val._id.$oid);
            val._id = objectId;
            delete val.__v
            $realm.create(Schemas.states.name,val);
        })

          //writing soilDataPerCommunity collection
          soilDataPerCommunity.forEach((val)=>{
            let objectId = mongoose.Types.ObjectId(val._id.$oid);
            val._id = objectId;
            delete val.__v
            $realm.create(Schemas.soilDataPerCommunity.name,val);
        })

         //writing recoveryFraction collection
         recoveryFraction.forEach((val)=>{
            let objectId = mongoose.Types.ObjectId(val._id.$oid);
            val._id = objectId;
            delete val.__v
            $realm.create(Schemas.recoveryFraction.name,val);
        })


         //writing recoveryEfficiency collection
         recoveryEfficiency.forEach((val)=>{
            let objectId = mongoose.Types.ObjectId(val._id.$oid);
            val._id = objectId;
            delete val.__v
            $realm.create(Schemas.recoveryEfficiency.name,val);
        })
        

         //writing organicFertilizer collection
         organicFertilizer.forEach((val)=>{
            let objectId = mongoose.Types.ObjectId(val._id.$oid);
            val._id = objectId;
            delete val.__v
            $realm.create(Schemas.organicFertilizer.name,val);
        })
        

        //writing nutrientUptakeCommunity collection
        nutrientUptakeCommunity.forEach((val)=>{
            let objectId = mongoose.Types.ObjectId(val._id.$oid);
            val._id = objectId;
            delete val.__v
            $realm.create(Schemas.nutrientUptakeCommunity.name,val);
        })
        
        //writing fertilizerType collection
        fertilizerType.forEach((val)=>{
            let objectId = mongoose.Types.ObjectId(val._id.$oid);
            val._id = objectId;
            delete val.__v
            $realm.create(Schemas.fertilizerType.name,val);
        })



        //writing fertilizerSource collection
        fertilizerSource.forEach((val)=>{
            let objectId = mongoose.Types.ObjectId(val._id.$oid);
            val._id = objectId;
            delete val.__v
            $realm.create(Schemas.fertilizerSource.name,val);
        })

        //writing fertilizerNutrientCombination collection
        fertilizerNutrientCombination.forEach((val)=>{
            let objectId = mongoose.Types.ObjectId(val._id.$oid);
            val._id = objectId;
            delete val.__v
            $realm.create(Schemas.fertilizerNutrientCombination.name,val);
        })

        //writing attainable collection
        attainableYieldsCollection.forEach((val)=>{
            let objectId = mongoose.Types.ObjectId(val._id.$oid);
            val._id = objectId;
            delete val.__v
            $realm.create(Schemas.attainableYield.name,val);
        })

         //writing community collection
         community.forEach((val)=>{
            let objectId = mongoose.Types.ObjectId(val._id.$oid);
            val._id = objectId;
            delete val.__v
            $realm.create(Schemas.community.name,val);
        })

         //writing cropParameters collection
         cropParameters.forEach((val)=>{
            let objectId = mongoose.Types.ObjectId(val._id.$oid);
            val._id = objectId;
            delete val.__v
            $realm.create(Schemas.cropParameters.name,val);
        })

         //writing ecologicalZone collection
         ecologicalZone.forEach((val)=>{
            let objectId = mongoose.Types.ObjectId(val._id.$oid);
            val._id = objectId;
            delete val.__v
            $realm.create(Schemas.ecologicalZone.name,val);
        })


    

    })

    } catch(e){
        console.log(e)
    }

}

export async function queryCollection(filter,schema){
    try{
     
      if(!$realm) await openDataBase();

      let obj = filter ? $realm.objects(schema).filtered(filter) : $realm.objects(schema);

      console.log(obj,"8**********************************************")
      let newArr = getRealmObjectCollection(obj)
      
      return newArr;
    }catch(e){
        console.log(e)
    }
}