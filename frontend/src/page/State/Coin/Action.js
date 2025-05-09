import axios from "axios";
import {
    FETCH_COIN_LIST_REQUEST,
    FETCH_COIN_LIST_SUCCESS,
    FETCH_COIN_LIST_FAILURE,
    FETCH_TOP_50_COINS_REQUEST,
    FETCH_TOP_50_COINS_SUCCESS,
    FETCH_TOP_50_COINS_FAILURE,
    FETCH_MARKET_CHART_REQUEST,
    FETCH_MARKET_CHART_SUCCESS,
    FETCH_MARKET_CHART_FAILURE,
    FETCH_COIN_BY_ID_REQUEST,
    FETCH_COIN_BY_ID_SUCCESS,
    FETCH_COIN_BY_ID_FAILURE,
    FETCH_COIN_DETAILS_REQUEST,
    FETCH_COIN_DETAILS_SUCCESS,
    FETCH_COIN_DETAILS_FAILURE,
    SEARCH_COIN_REQUEST,
    SEARCH_COIN_SUCCESS,
    SEARCH_COIN_FAILURE
} from "@/page/State/Coin/ActionType.js";
import api, {API_BASE_URL} from "@/config/api.js";

export const getCoinList = (page) => async (dispatch) => {
    dispatch({ type: FETCH_COIN_LIST_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/coins?page=${page}`);
        dispatch({ type: FETCH_COIN_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_COIN_LIST_FAILURE, payload: error.message });
    }
};

export const getTop50Coins = () => async (dispatch) => {
    dispatch({ type: FETCH_TOP_50_COINS_REQUEST });
    try {
        const response = await axios.get(`${API_BASE_URL}/coins/top50`);
        dispatch({ type: FETCH_TOP_50_COINS_SUCCESS, payload:response.data});
    } catch (error) {
        dispatch({ type: FETCH_TOP_50_COINS_FAILURE, payload: error.message });
    }
};

export const getMarketChart = (coinId, days, jwt) => async (dispatch) => {
    dispatch({ type: FETCH_MARKET_CHART_REQUEST });
    try {
        const response = await api.get(`/coins/chart/${coinId}?days=${days}`, {
            headers:{
                Authorization: `Bearer ${jwt}`
            }
        });
        const formatted = response.data.prices.map(([timestamp, price]) => ({
            x: timestamp,
            y: price,
        }));

        dispatch({ type: FETCH_MARKET_CHART_SUCCESS, payload: formatted });
    } catch (error) {
        dispatch({ type: FETCH_MARKET_CHART_FAILURE, payload: error.message });
    }
};

export const getCoinById = (coinId) => async (dispatch) => {
    dispatch({ type: FETCH_COIN_BY_ID_REQUEST });
    try {
        const response = await axios.get(`${API_BASE_URL}/coins/${coinId}`);
        dispatch({ type: FETCH_COIN_BY_ID_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_COIN_BY_ID_FAILURE, payload: error.message });
    }
};

export const getCoinDetails = (coinId, jwt) => async (dispatch) => {
    dispatch({ type: FETCH_COIN_DETAILS_REQUEST });
    try {
        const response = await api.get(`/coins/details/${coinId}`, {
            headers:{
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: FETCH_COIN_DETAILS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_COIN_DETAILS_FAILURE, payload: error.message });
    }
};

export const searchCoin = (coin, jwt) => async (dispatch) => {
    dispatch({ type: SEARCH_COIN_REQUEST });
    try {
        const response = await api.get(`/coins/search?coin=${coin}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        });
        dispatch({ type: SEARCH_COIN_SUCCESS, payload: response.data.coins });
    } catch (error) {
        dispatch({ type: SEARCH_COIN_FAILURE, payload: error.message });
    }
};
