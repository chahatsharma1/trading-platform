import {GET_USER_WALLET_REQUEST, GET_USER_WALLET_SUCCESS, GET_USER_WALLET_FAILURE, GET_WALLET_TRANSACTIONS_REQUEST, GET_WALLET_TRANSACTIONS_SUCCESS, GET_WALLET_TRANSACTIONS_FAILURE, DEPOSIT_MONEY_REQUEST, DEPOSIT_MONEY_SUCCESS, DEPOSIT_MONEY_FAILURE, TRANSFER_MONEY_REQUEST, TRANSFER_MONEY_SUCCESS, TRANSFER_MONEY_FAILURE} from './actionType';

const initialState = {
    loading: false,
    userWallet: {},
    transactions: [],
    error: null,
};

const walletReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_WALLET_REQUEST:
        case DEPOSIT_MONEY_REQUEST:
        case TRANSFER_MONEY_REQUEST:
        case GET_WALLET_TRANSACTIONS_REQUEST:
            return { ...state, loading: true, error: null };

        case GET_WALLET_TRANSACTIONS_SUCCESS:
            return { ...state, loading: false, transactions: action.payload, error: null};

        case GET_USER_WALLET_SUCCESS:
        case TRANSFER_MONEY_SUCCESS:
            return { ...state, loading: false, userWallet: action.payload, error: null};

        case DEPOSIT_MONEY_SUCCESS:
            return {
                ...state,
                loading: false,
                userWallet: action.payload,
                error: null
            };

        case DEPOSIT_MONEY_FAILURE:
        case GET_USER_WALLET_FAILURE:
        case TRANSFER_MONEY_FAILURE:
        case GET_WALLET_TRANSACTIONS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default walletReducer;
