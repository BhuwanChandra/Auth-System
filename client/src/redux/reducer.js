import {
    USER_REQUEST,
    USER_FAILURE,
    SIGNUP_USER_SUCCESS,
    AUTHENTICATE_USER,
    LOGOUT_USER,
} from "./types";
import { notification } from 'antd';

const openNotification = (type, title) => {
    notification[type]({
        message: title
    });
};

const initialState = {
    loading: false,
    user: {},
    error: '',
    authToken: ''
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_FAILURE:{
            openNotification('error', action.payload)
                return {
                    ...state,
                    loading: false,
                    error: action.payload
                }
            }
        case SIGNUP_USER_SUCCESS:{
                openNotification('success','Successfully Signed Up!')
                return {
                    ...state,
                    loading: false
                }
            }
        case AUTHENTICATE_USER:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                authToken: action.payload.token
            }
        case LOGOUT_USER: {
            localStorage.clear();
            openNotification('success', 'Successfully Logged out!')
            return {
                ...initialState
            }
        }
        default: return state
    }
}

export default userReducer;
