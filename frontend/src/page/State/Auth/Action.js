import axios from "axios";
import {
    ADMIN_LOGIN_FAILURE,
    ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS, FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    SEND_VERIFICATION_OTP_FAILURE,
    SEND_VERIFICATION_OTP_REQUEST,
    SEND_VERIFICATION_OTP_SUCCESS,
    VERIFY_OTP_FAILURE,
    VERIFY_OTP_REQUEST,
    VERIFY_OTP_SUCCESS
} from "./ActionType";
import { API_BASE_URL } from "@/config/api.js";

export const register = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        const user = response.data;
        dispatch({ type: REGISTER_SUCCESS, payload: user.jwt });
        localStorage.setItem("jwt", user.jwt);
        return Promise.resolve()
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error.message });
        return Promise.reject();
    }
};

export const adminLogin = (adminData) => async (dispatch) => {
    dispatch({ type: ADMIN_LOGIN_REQUEST });

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signin/admin`, adminData);
        const admin = response.data;
        dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: admin.jwt });
        localStorage.setItem("jwt", admin.jwt);
        await dispatch(getUser(admin.jwt));
        adminData.navigate("/admin/dashboard");
        return { error: false };
    } catch (error) {
        dispatch({ type: ADMIN_LOGIN_FAILURE, payload: error.response?.data?.message || error.message });
        return { error: true, message: error.response?.data?.message || "Admin login failed" };
    }
};

export const login = (userData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
        const user = response.data;

        if (user.twoFactorAuthEnable) {
            dispatch({ type: VERIFY_OTP_REQUEST });
            return { session: user.session, twoFactorAuthEnable: true, error: false };
        } else {
            dispatch({ type: LOGIN_SUCCESS, payload: user.jwt });
            localStorage.setItem("jwt", user.jwt);
            await dispatch(getUser(user.jwt));
            userData.navigate("/home");
            return { error: false };
        }
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
        return { error: true, message: error.response?.data?.message || "User login failed" };
    }
};


export const verifyLoginOtp = (otp, sessionId, navigate) => async (dispatch) => {
    dispatch({ type: VERIFY_OTP_REQUEST });

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/two-factor/otp/${otp}?id=${sessionId}`);
        dispatch({ type: VERIFY_OTP_SUCCESS, payload: response.data.jwt });
        localStorage.setItem("jwt", response.data.jwt);
        await dispatch(getUser(response.data.jwt))
        navigate("/home");
    } catch (error) {
        dispatch({
            type: VERIFY_OTP_FAILURE,
            payload: error.response?.data?.message || error.message
        });
        throw error;
    }
};

export const getUser = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });

    try {
        const response = await axios.get(`${API_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        const user = response.data;
        dispatch({ type: GET_USER_SUCCESS, payload: user });
    } catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: error.message });
    }
};

export const getAllUsers = (jwt) => async (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });
    try {
        const response = await axios.get(`${API_BASE_URL}/users/all`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
        console.log(response.data);
    } catch (error) {
        console.log(error)
        dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
    }
};

export const updateUser = (userData, jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });

    try {
        const response = await axios.put(`${API_BASE_URL}/users/update`, userData, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });

        dispatch({ type: GET_USER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: error.message });
    }
};

export const sendForgotPasswordOTP = (email) => async (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    try {
        const response = await axios.post(`${API_BASE_URL}/users/forgot-password/send-otp`, {
            sendTo: email,
            verificationType: "EMAIL"
        });

        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: response.data.session });
        return response.data.session;
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAILURE,
            payload: error.response?.data?.message || error.message
        });
        throw error;
    }
};

export const verifyForgotPasswordOTP = (sessionId, otp, newPassword) => async (dispatch) => {
    dispatch({ type: VERIFY_OTP_REQUEST });

    try {
        const response = await axios.patch(
            `${API_BASE_URL}/users/forgot-password/verify/${otp}?id=${sessionId}`,
            { otp, newPassword }
        );

        dispatch({ type: VERIFY_OTP_SUCCESS, payload: response.data.message });
    } catch (error) {
        dispatch({
            type: VERIFY_OTP_FAILURE,
            payload: error.response?.data?.message || error.message
        });
        throw error;
    }
};

export const sendVerificationOtp = (jwt, verificationType) => async (dispatch) => {
    dispatch({ type: SEND_VERIFICATION_OTP_REQUEST });

    try {
        const response = await axios.post(
            `${API_BASE_URL}/users/verification/${verificationType}/send-otp`,
            {},
            { headers: { Authorization: `Bearer ${jwt}` } }
        );

        dispatch({
            type: SEND_VERIFICATION_OTP_SUCCESS,
            payload: response.data
        });
        return response.data;
    } catch (error) {
        dispatch({
            type: SEND_VERIFICATION_OTP_FAILURE,
            payload: error.response?.data?.message || "Error sending OTP"
        });
        throw new Error(error.response?.data?.message || "Error sending OTP");
    }
};

export const verifyOtp = (jwt, otp) => async (dispatch) => {
    dispatch({ type: VERIFY_OTP_REQUEST });

    try {
        const response = await axios.patch(
            `${API_BASE_URL}/users/enable-two-factor/verify/${otp}`,
            {},
            { headers: { Authorization: `Bearer ${jwt}` } }
        );

        dispatch({
            type: VERIFY_OTP_SUCCESS,
            payload: response.data
        });
        return response.data;
    } catch (error) {
        dispatch({
            type: VERIFY_OTP_FAILURE,
            payload: error.response?.data?.message || "Error verifying OTP"
        });
        throw new Error(error.response?.data?.message || "Error verifying OTP");
    }
};

export const disableTwoFactorAuth = (jwt) => async (dispatch) => {
    dispatch({ type: "DISABLE_2FA_REQUEST" });

    try {
        const response = await axios.post(
            `${API_BASE_URL}/users/disable-two-factor`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );

        dispatch({
            type: "DISABLE_2FA_SUCCESS",
            payload: response.data,
        });

        return response.data;
    } catch (error) {
        dispatch({
            type: "DISABLE_2FA_FAILURE",
            payload: error.response?.data?.message || "Error disabling 2FA",
        });
        throw new Error(error.response?.data?.message || "Error disabling 2FA");
    }
};


export const logout = () => (dispatch) => {
    localStorage.clear();
    dispatch({ type: LOGOUT });
};
