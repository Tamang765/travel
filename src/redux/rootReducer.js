import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// slices
import emergencyContactSlice from "./slices/emergencyContactSlice";
import faqSlice from "./slices/faqSlice";
import roleSlice from "./slices/roleSlice";
import teamSlice from "./slices/teamSlice";
import userTypeSlice from "./slices/userTypeSlice";
import vehicleSlice from "./slices/vehicleSlice";

// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

export const teamPersistConfig = {
  key: "team",
  storage,
  keyPrefix: "redux-",
  whitelist: ["sortBy", "checkout"],
};

export const rolePersistConfig = {
  key: "role",
  storage,
  keyPrefix: "redux-",
  whitelist: ["sortBy", "checkout"],
};

export const vehiclePersistConfig = {
  key: "vehicle",
  storage,
  keyPrefix: "redux-",
  whitelist: ["sortBy", "checkout"],
};

export const emergencyContactPersistConfig = {
  key: "emergencyContact",
  storage,
  keyPrefix: "redux-",
  whitelist: ["sortBy", "checkout"],
};

export const faqPersistConfig = {
  key: "faq",
  storage,
  keyPrefix: "redux-",
  whitelist: ["sortBy", "checkout"],
};

export const userTypePersistConfig = {
  key: "userType",
  storage,
  keyPrefix: "redux-",
  whitelist: ["sortBy", "checkout"],
};

const rootReducer = combineReducers({
  team: persistReducer(teamPersistConfig, teamSlice),
  role: persistReducer(rolePersistConfig, roleSlice),
  userType: persistReducer(userTypePersistConfig, userTypeSlice),
  vehicle: persistReducer(vehiclePersistConfig, vehicleSlice),
  faq: persistReducer(faqPersistConfig, faqSlice),
  emergencyContact: persistReducer(
    emergencyContactPersistConfig,
    emergencyContactSlice
  ),
});

export default rootReducer;
