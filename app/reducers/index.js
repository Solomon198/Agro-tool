import { combineReducers } from "redux";

import SoilData from './soilData'
import siteIdentification from './siteIdentification'
import siteProfiling from './siteProfiling';
import FertilizerApplication from './fertilizerApplication'
import FertilizerSourceSplitting from './fertilizerSource';

export default combineReducers({
  siteIdentification,
  SoilData,
  siteProfiling,
  FertilizerApplication,
  FertilizerSourceSplitting
});
