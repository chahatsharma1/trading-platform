import {GET_USER_WATCHLIST_REQUEST, GET_USER_WATCHLIST_SUCCESS, GET_USER_WATCHLIST_FAILURE, ADD_COIN_TO_WATCHLIST_REQUEST, ADD_COIN_TO_WATCHLIST_SUCCESS, ADD_COIN_TO_WATCHLIST_FAILURE} from './ActionType';
import api from "@/config/api.js";

export const getUserWatchlist = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_WATCHLIST_REQUEST });
    try {
        const response = await api.get('/watchlist/user', {
            headers: {
                Authorization: `Bearer ${jwt}`,}
        });
        dispatch({type: GET_USER_WATCHLIST_SUCCESS, payload: response.data});
    } catch (error) {
        dispatch({
            type: GET_USER_WATCHLIST_FAILURE,
            payload: error.message
        });
    }
};

export const addCoinToWatchlist = (coinId, jwt) => async (dispatch) => {
    dispatch({ type: ADD_COIN_TO_WATCHLIST_REQUEST });
    try {
        const response = await api.patch(`/watchlist/coin/${coinId}`, null, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        });
        dispatch({type: ADD_COIN_TO_WATCHLIST_SUCCESS, payload: response.data});
    } catch (error) {
        dispatch({
            type: ADD_COIN_TO_WATCHLIST_FAILURE,
            payload: error.message
        });
    }
};
