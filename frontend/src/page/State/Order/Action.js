import {PAY_ORDER_REQUEST, PAY_ORDER_SUCCESS, PAY_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILURE, GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_SUCCESS, GET_ALL_ORDERS_FAILURE,} from './ActionType';
import api from "@/config/api.js";

export const payOrder = ({orderData, jwt, amount}) => async (dispatch) => {
    dispatch({ type: PAY_ORDER_REQUEST });
    try {
        const response = await api.post("/order/pay", orderData, {
            headers: {
                Authorization: `Bearer ${jwt}`},
            }
        );
        dispatch({ type: PAY_ORDER_SUCCESS, payload: response.data, amount});
    } catch (error) {
        dispatch({
            type: PAY_ORDER_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const getOrderById = (orderId, jwt) => async (dispatch) => {
    dispatch({ type: GET_ORDER_REQUEST });
    try {
        const response = await api.get(`/order/${orderId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: GET_ORDER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({
            type: GET_ORDER_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const getAllOrdersForUser = ({jwt, orderType, assetsSymbol}) => async (dispatch) => {
    dispatch({ type: GET_ALL_ORDERS_REQUEST });
    try {
        const response = await api.get("/order", {
            headers: {
                Authorization: `Bearer ${jwt}`},
            params: {
                order_type: orderType,
                asset_Symbol: assetsSymbol
            }
        });
        dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({
            type: GET_ALL_ORDERS_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};