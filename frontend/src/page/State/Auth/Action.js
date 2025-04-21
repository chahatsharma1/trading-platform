import axios from "axios"
import {GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS} from "./ActionType";
import {API_BASE_URL} from "@/config/api.js";

export const register=(userData)=> async(dispatch)=>{

    dispatch({type:REGISTER_REQUEST})

    try{
        const response=await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        const user=response.data;
        dispatch({type:REGISTER_SUCCESS, payload:user.jwt})
        localStorage.setItem("jwt", user.jwt)

    } catch(error){
        dispatch({type:REGISTER_FAILURE, payload:error.message})
    }
}

export const login=(userData)=> async(dispatch)=>{

    dispatch({type:LOGIN_REQUEST})

    try{
        const response=await axios.post(`${API_BASE_URL}/auth/signin`, userData);
        const user=response.data;
        dispatch({type:LOGIN_SUCCESS, payload:user.jwt})
        localStorage.setItem("jwt", user.jwt)
        userData.navigate("/home")

    } catch(error){
        dispatch({type:LOGIN_FAILURE, payload:error.message})
    }
}

export const getUser=(jwt)=> async(dispatch)=>{

    dispatch({type:GET_USER_REQUEST})
    try{
        const response=await axios.get(`${API_BASE_URL}/users/profile`, {
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        });
        const user=response.data;
        dispatch({type:GET_USER_SUCCESS, payload:user})

    } catch(error){
        dispatch({type:GET_USER_FAILURE, payload:error.message})
    }
}

export const updateUser = (userData, jwt) => async (dispatch) => {

    dispatch({ type: GET_USER_REQUEST});
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

export const logout = () => (dispatch) => {
    localStorage.clear();
    dispatch({type: LOGOUT})
};