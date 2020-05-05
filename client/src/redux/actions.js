import {
    USER_REQUEST,
    USER_FAILURE,
    AUTHENTICATE_USER,
    SIGNUP_USER_SUCCESS,
    LOGOUT_USER
} from './types';

export const userRequest = () => {
    return {
        type: USER_REQUEST
    }
}

export const userFailure = (err) => {
    return {
        type: USER_FAILURE,
        payload: err
    }
}

export const signupUserSuccess = () => {
    return {
        type: SIGNUP_USER_SUCCESS
    }
}

export const authenticateUser = (userDetails) => {
    return {
        type: AUTHENTICATE_USER,
        payload: userDetails
    }
}

export const logoutUser = () => {
    return {
        type: LOGOUT_USER
    }
}

export const signupUser = (userData) => {
    return (dispatch) => {
        dispatch(userRequest())
        return fetch(`/signup`,{
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(res => {
            if(!res.error)
            dispatch(signupUserSuccess());
            else
            dispatch(userFailure());
        })
        .catch(error => {
            const errorMsg = error.message;
            dispatch(userFailure(errorMsg));
        })
    }
}

export const loginUser = (userData) => {
    return (dispatch) => {
        dispatch(userRequest());
        return fetch(`/login`,{
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(response => {
            if(!response.error){
                localStorage.setItem('user', JSON.stringify(response.user));
                localStorage.setItem('token', JSON.stringify(response.token));
                dispatch(authenticateUser(response));
            }
            else
                dispatch(userFailure(response.error));
        })
        .catch(error => {
            const errorMsg = error.message;
            dispatch(userFailure(errorMsg));
        })
    }
}

