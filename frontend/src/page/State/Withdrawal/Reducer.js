import {
    WITHDRAWAL_REQUEST,
    WITHDRAWAL_SUCCESS,
    WITHDRAWAL_FAILURE,

    WITHDRAWAL_PROCEED_REQUEST,
    WITHDRAWAL_PROCEED_SUCCESS,
    WITHDRAWAL_PROCEED_FAILURE,

    GET_WITHDRAWAL_HISTORY_REQUEST,
    GET_WITHDRAWAL_HISTORY_SUCCESS,
    GET_WITHDRAWAL_HISTORY_FAILURE,

    ADD_PAYMENT_DETAILS_REQUEST,
    ADD_PAYMENT_DETAILS_SUCCESS,
    ADD_PAYMENT_DETAILS_FAILURE,

    GET_PAYMENT_DETAILS_REQUEST,
    GET_PAYMENT_DETAILS_SUCCESS,
    GET_PAYMENT_DETAILS_FAILURE
} from './actionType';

const initialState = {
    isLoading: false,
    withdrawalData: null,
    withdrawalProceedData: null,
    withdrawalHistory: [],
    paymentDetails: null,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // Withdrawal
        case WITHDRAWAL_REQUEST:
        case WITHDRAWAL_PROCEED_REQUEST:
        case GET_WITHDRAWAL_HISTORY_REQUEST:
        case ADD_PAYMENT_DETAILS_REQUEST:
        case GET_PAYMENT_DETAILS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };

        // Success Cases
        case WITHDRAWAL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                withdrawalData: action.payload,
                error: null
            };

        case WITHDRAWAL_PROCEED_SUCCESS:
            return {
                ...state,
                isLoading: false,
                withdrawalProceedData: action.payload,
                error: null
            };

        case GET_WITHDRAWAL_HISTORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                withdrawalHistory: action.payload,
                error: null
            };

        case ADD_PAYMENT_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null
            };

        case GET_PAYMENT_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                paymentDetails: action.payload,
                error: null
            };

        // Failure Cases
        case WITHDRAWAL_FAILURE:
        case WITHDRAWAL_PROCEED_FAILURE:
        case GET_WITHDRAWAL_HISTORY_FAILURE:
        case ADD_PAYMENT_DETAILS_FAILURE:
        case GET_PAYMENT_DETAILS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };

        default:
            return state;
    }
};

export default reducer;
