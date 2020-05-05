import {
    USER_REQUEST,
    USER_FAILURE,
    SIGNUP_USER_SUCCESS,
    AUTHENTICATE_USER,
    LOGOUT_USER,
} from "./types";


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
        case USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case SIGNUP_USER_SUCCESS:
            return {
                ...state,
                loading: false
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
            return {
                ...initialState
            }
        }
        default: return state
    }
}

export default userReducer;
