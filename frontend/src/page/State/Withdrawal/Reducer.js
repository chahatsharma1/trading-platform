import {WITHDRAWAL_REQUEST, WITHDRAWAL_SUCCESS, WITHDRAWAL_FAILURE, WITHDRAWAL_PROCEED_REQUEST, WITHDRAWAL_PROCEED_SUCCESS, WITHDRAWAL_PROCEED_FAILURE, GET_WITHDRAWAL_HISTORY_REQUEST, GET_WITHDRAWAL_HISTORY_SUCCESS, GET_WITHDRAWAL_HISTORY_FAILURE, ADD_PAYMENT_DETAILS_SUCCESS, GET_PAYMENT_DETAILS_SUCCESS, GET_WITHDRAWAL_REQUEST_REQUEST, GET_WITHDRAWAL_REQUEST_SUCCESS, GET_WITHDRAWAL_REQUEST_FAILURE} from './actionType';

const initialState = {
    loading: false,
    withdrawal: null,
    withdrawalProceedData: null,
    history: [],
    requests: [],
    paymentDetails: null,
    error: null
};

const withdrawalReducer = (state = initialState, action) => {
    switch (action.type) {
        case WITHDRAWAL_REQUEST:
        case WITHDRAWAL_PROCEED_REQUEST:
        case GET_WITHDRAWAL_HISTORY_REQUEST:
        case GET_WITHDRAWAL_REQUEST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case WITHDRAWAL_SUCCESS:
            return {
                ...state,
                loading: false,
                withdrawal: action.payload,
                error: null
            };

        case ADD_PAYMENT_DETAILS_SUCCESS:
        case GET_PAYMENT_DETAILS_SUCCESS:
            return {
                ...state,
                paymentDetails: action.payload,
                loading: false,
                error: null
            }

        case WITHDRAWAL_PROCEED_SUCCESS:
            return {
                ...state,
                loading: false,
                requests: state.requests.map((item) =>
                item.id === action.payload.id ? action.payload : item),
                error: null
            };

        case GET_WITHDRAWAL_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                history: action.payload,
                error: null
            };

        case GET_WITHDRAWAL_REQUEST_SUCCESS:
            return {
                ...state,
                requests: action.payload,
                loading: false,
                error: null
            }

        case WITHDRAWAL_FAILURE:
        case WITHDRAWAL_PROCEED_FAILURE:
        case GET_WITHDRAWAL_HISTORY_FAILURE:
        case GET_WITHDRAWAL_REQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        default:
            return state;
    }
};

export default withdrawalReducer;