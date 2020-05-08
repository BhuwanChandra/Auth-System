import {
  USER_REQUEST,
  USER_FAILURE,
  AUTHENTICATE_USER,
  SIGNUP_USER_SUCCESS,
  LOGOUT_USER
} from "./types";
import axios from "axios";

export const userRequest = () => {
  return {
    type: USER_REQUEST
  };
};

export const userFailure = err => {
  return {
    type: USER_FAILURE,
    payload: err
  };
};

export const signupUserSuccess = () => {
  return {
    type: SIGNUP_USER_SUCCESS
  };
};

export const authenticateUser = userDetails => {
  return {
    type: AUTHENTICATE_USER,
    payload: userDetails
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER
  };
};

export const signupUser = userData => {
  return dispatch => {
    dispatch(userRequest());
    return axios
      .post(`/signup`, userData, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        console.log(res.data);
        if (!res.error) dispatch(signupUserSuccess());
        else dispatch(userFailure(res.data.error));
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(userFailure(errorMsg));
      });
  };
};

export const loginUser = userData => {
  return dispatch => {
    dispatch(userRequest());
    return axios
      .post(`/login`, userData, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        if (!response.data.error) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", JSON.stringify(response.data.token));
          dispatch(authenticateUser(response.data));
        } else dispatch(userFailure(response.data.error));
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(userFailure(errorMsg));
      });
  };
};
