import {GET_ASSET_REQUEST, GET_ASSET_SUCCESS, GET_ASSET_FAILURE, GET_USER_ASSETS_REQUEST, GET_USER_ASSETS_SUCCESS, GET_USER_ASSETS_FAILURE, GET_ASSET_DETAILS_REQUEST, GET_ASSET_DETAILS_SUCCESS, GET_ASSET_DETAILS_FAILURE} from './actionType';
import api from "@/config/api.js";

export const getAssetById = ({assetId, jwt}) => async (dispatch) => {
    dispatch({ type: GET_ASSET_REQUEST });
    try {
        const response = await api.get(`/asset/${assetId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`},
        });
        dispatch({ type: GET_ASSET_SUCCESS, payload: response.data });
        console.log(response.data)
    } catch (error) {
        dispatch({ type: GET_ASSET_FAILURE, payload: error.message });
    }
};

export const getAssetDetails = ({coinId, jwt}) => async (dispatch) => {
    dispatch({ type: GET_ASSET_DETAILS_REQUEST });
    try {
        const response = await api.get(`/asset/coin/${coinId}/user`, {
            headers: {
                Authorization: `Bearer ${jwt}`},
        });
        dispatch({ type: GET_ASSET_DETAILS_SUCCESS, payload: response.data });
        console.log(response.data);
    } catch (error) {
        dispatch({ type: GET_ASSET_DETAILS_FAILURE, payload: error.message });
    }
};

export const getUserAssets = ({jwt}) => async (dispatch) => {
    dispatch({ type: GET_USER_ASSETS_REQUEST });
    try {
        const response = await api.get(`/asset/all` , {
            headers: {
                Authorization: `Bearer ${jwt}`},
        });
        dispatch({ type: GET_USER_ASSETS_SUCCESS, payload: response.data });
        console.log(response.data)
    } catch (error) {
        dispatch({ type: GET_USER_ASSETS_FAILURE, payload: error.message });
    }
};