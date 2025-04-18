import { thunk } from "redux-thunk";
import authReducer from "./Auth/Reducer";
import { combineReducers, legacy_createStore, applyMiddleware } from "redux";
import coinReducer from "@/page/State/Coin/Reducer.js";
import walletReducer from "@/page/State/Wallet/Reducer.js";
import withdrawalReducer from "@/page/State/Withdrawal/Reducer.js";
import orderReducer from "@/page/State/Order/Reducer.js";
import assetReducer from "@/page/State/Asset/Reducer.js";

const rootReducer=combineReducers({
    auth:authReducer,
    coin:coinReducer,
    wallet:walletReducer,
    withdrawal:withdrawalReducer,
    order:orderReducer,
    asset:assetReducer
});

export const store=legacy_createStore(rootReducer, applyMiddleware(thunk))