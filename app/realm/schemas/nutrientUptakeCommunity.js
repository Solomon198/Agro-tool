
const NutrientUptakeCommunity = {
  name :"NutrientUptakeCommunity",
  primaryKey:"_id",
  properties:{
    _id: "objectId",
    state : "string",
    zone : "string",
    community : "string",
    n_uptake:"double",
    p_uptake:"double",
    k_uptake:"double",
    s_uptake:"double",
    status:"int",
  }
}


export default NutrientUptakeCommunity