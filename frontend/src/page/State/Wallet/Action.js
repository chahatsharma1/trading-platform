import {GET_USER_WALLET_REQUEST, GET_USER_WALLET_SUCCESS, GET_USER_WALLET_FAILURE, GET_WALLET_TRANSACTIONS_REQUEST, GET_WALLET_TRANSACTIONS_SUCCESS, GET_WALLET_TRANSACTIONS_FAILURE, DEPOSIT_MONEY_REQUEST, DEPOSIT_MONEY_SUCCESS,DEPOSIT_MONEY_FAILURE, TRANSFER_MONEY_REQUEST, TRANSFER_MONEY_SUCCESS, TRANSFER_MONEY_FAILURE} from './actionType';
import api from "@/config/api.js";

export const getUserWallet = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_WALLET_REQUEST });
    try {
        const response = await api.get("/wallet", {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: GET_USER_WALLET_SUCCESS, payload: response.data });
        console.log(response.data);
    } catch (error) {
        console.log("error", error)
        dispatch({ type: GET_USER_WALLET_FAILURE, payload: error.response?.data?.message || error.message });
    }
};

export const getWalletTransactions = ({jwt}) => async (dispatch) => {
    dispatch({ type: GET_WALLET_TRANSACTIONS_REQUEST });
    try {
        const response = await api.get("/wallet/transactions", {
            headers: {
                Authorization: `Bearer ${jwt}` ,
            },
        });
        dispatch({ type: GET_WALLET_TRANSACTIONS_SUCCESS, payload: response.data });
    } catch (error) {
        console.log("error", error)
        dispatch({ type: GET_WALLET_TRANSACTIONS_FAILURE, payload: error.response?.data?.message || error.message });
    }
};

export const depositMoney = ({jwt, orderId, navigate}) => async (dispatch) => {
    dispatch({ type: DEPOSIT_MONEY_REQUEST });
    try {
        const response = await api.put("/wallet/deposit", null, {
            params: {
                order_id: orderId
            },
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: DEPOSIT_MONEY_SUCCESS, payload: response.data });
        navigate("/wallet")
        console.log(response.data);
    } catch (error) {
        console.log("error", error)
        dispatch({ type: DEPOSIT_MONEY_FAILURE, payload: error.response?.data?.message || error.message });
    }
};

export const paymentHandler = (jwt, amount, paymentMethod) => async (dispatch) => {
    dispatch({ type: DEPOSIT_MONEY_REQUEST });
    try {
        const response = await api.post(`/payment/${paymentMethod}/amount/${amount}`, null, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        window.location.href = response.data.paymentUrl;
    } catch (error) {
        dispatch({ type: DEPOSIT_MONEY_FAILURE, payload: error.response?.data?.message || error.message });
    }
};

export const transferMoney = ({jwt, walletId, reqData}) => async (dispatch) =>{
    dispatch({type: TRANSFER_MONEY_REQUEST});
    try {
        const response = await api.put(`/wallet/${walletId}/transfer`, reqData, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({type: TRANSFER_MONEY_SUCCESS, payload: response.data});
    } catch (error){
        dispatch({type: TRANSFER_MONEY_FAILURE, error: error.message});
    }
};