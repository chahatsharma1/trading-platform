import { thunk } from "redux-thunk";
import authReducer from "./Auth/Reducer";
import { combineReducers, legacy_createStore, applyMiddleware } from "redux";
import coinReducer from "@/page/State/Coin/Reducer.js";
import walletReducer from "@/page/State/Wallet/Reducer.js";

const rootReducer=combineReducers({
    auth:authReducer,
    coin:coinReducer,
    wallet:walletReducer
});

export const store=legacy_createStore(rootReducer, applyMiddleware(thunk))