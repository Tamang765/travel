import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// slices
import brandSlice from "./slices/brandSlice";
import categorySlice from "./slices/categorySlice";
import colorSlice from "./slices/colorSlice";
import emergencyContactSlice from "./slices/emergencyContactSlice";
import faqSlice from "./slices/faqSlice";
import productSlice from "./slices/productSlice";
import referSlice from "./slices/referSlice";
import roleSlice from "./slices/roleSlice";
import sizeSlice from "./slices/sizeSlice";
import teamSlice from "./slices/teamSlice";
import userTypeSlice from "./slices/userTypeSlice";

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
};

export const rolePersistConfig = {
  key: "role",
  storage,
  keyPrefix: "redux-",
};

export const emergencyContactPersistConfig = {
  key: "emergencyContact",
  storage,
  keyPrefix: "redux-",
};

export const faqPersistConfig = {
  key: "faq",
  storage,
  keyPrefix: "redux-",
};

export const userTypePersistConfig = {
  key: "userType",
  storage,
  keyPrefix: "redux-",
};

export const categoryPersistConfig = {
  key: "category",
  storage,
  keyPrefix: "redux-",
};

export const colorPersistConfig = {
  key: "color",
  storage,
  keyPrefix: "redux-",
};

export const brandPersistConfig = {
  key: "brand",
  storage,
  keyPrefix: "redux-",
};

export const sizePersistConfig = {
  key: "size",
  storage,
  keyPrefix: "redux-",
};

export const productPersistConfig = {
  key: "product",
  storage,
  keyPrefix: "redux-",
};

export const settingsPersistConfig = {
  key: "settings",
  storage,
  keyPrefix: "redux-",
};

const rootReducer = combineReducers({
  team: persistReducer(teamPersistConfig, teamSlice),
  role: persistReducer(rolePersistConfig, roleSlice),
  userType: persistReducer(userTypePersistConfig, userTypeSlice),
  faq: persistReducer(faqPersistConfig, faqSlice),
  category: persistReducer(categoryPersistConfig, categorySlice),
  size: persistReducer(sizePersistConfig, sizeSlice),
  color: persistReducer(colorPersistConfig, colorSlice),
  brand: persistReducer(brandPersistConfig, brandSlice),
  product: persistReducer(productPersistConfig, productSlice),
  setting: persistReducer(settingsPersistConfig, referSlice),
  emergencyContact: persistReducer(
    emergencyContactPersistConfig,
    emergencyContactSlice
  ),
});

export default rootReducer;
