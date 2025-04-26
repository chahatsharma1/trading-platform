import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    LOGOUT,
    LOGIN_TWO_STEP_REQUEST,
    LOGIN_TWO_STEP_SUCCESS,
    LOGIN_TWO_STEP_FAILURE,
    VERIFY_OTP_REQUEST,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_FAILURE,
    ENABLE_TWO_STEP_AUTHENTICATION_REQUEST,
    ENABLE_TWO_STEP_AUTHENTICATION_SUCCESS,
    ENABLE_TWO_STEP_AUTHENTICATION_FAILURE,
    SEND_VERIFICATION_OTP_REQUEST,
    SEND_VERIFICATION_OTP_SUCCESS,
    SEND_VERIFICATION_OTP_FAILURE,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    DISABLE_2FA_REQUEST,
    DISABLE_2FA_SUCCESS,
    DISABLE_2FA_FAILURE,
    FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE
} from "./ActionType";

const initialState = {
    user: null,
    users: [],
    loading: false,
    error: null,
    jwt: null,
    twoFactorAuthEnabled: false,
    twoFactorSession: null,
    otpVerified: false,
    passwordChanged: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case LOGIN_TWO_STEP_REQUEST:
        case VERIFY_OTP_REQUEST:
        case ENABLE_TWO_STEP_AUTHENTICATION_REQUEST:
        case SEND_VERIFICATION_OTP_REQUEST:
        case FORGOT_PASSWORD_REQUEST:
        case DISABLE_2FA_REQUEST:
        case FETCH_USERS_REQUEST:
            return { ...state, loading: true, error: null };

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return { ...state, loading: false, jwt: action.payload, error: null };

        case LOGIN_TWO_STEP_SUCCESS:
            return {
                ...state,
                loading: false,
                twoFactorAuthEnabled: true,
                twoFactorSession: action.payload.session,
                error: null
            };

        case VERIFY_OTP_SUCCESS:
            return {
                ...state,
                loading: false,
                jwt: action.payload.jwt,
                otpVerified: true,
                error: null
            };

        case ENABLE_TWO_STEP_AUTHENTICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                twoFactorAuthEnabled: true,
                error: null
            };

        case DISABLE_2FA_SUCCESS:
            return {
                ...state,
                loading: false,
                twoFactorAuthEnabled: false,
                error: null
            };

        case SEND_VERIFICATION_OTP_SUCCESS:
            return { ...state, loading: false, error: null };

        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                passwordChanged: true,
                error: null
            };

        case GET_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false, error: null };

        case FETCH_USERS_SUCCESS:
            return { ...state, loading: false, users: action.payload };

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case LOGIN_TWO_STEP_FAILURE:
        case VERIFY_OTP_FAILURE:
        case ENABLE_TWO_STEP_AUTHENTICATION_FAILURE:
        case SEND_VERIFICATION_OTP_FAILURE:
        case FORGOT_PASSWORD_FAILURE:
        case DISABLE_2FA_FAILURE:
        case FETCH_USERS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case 'LOGOUT':
            return {
                ...state,
                jwt: null,
                user: null,
                loading: false,
                error: null
            };

        default:
            return state;
    }
};

export default authReducer;