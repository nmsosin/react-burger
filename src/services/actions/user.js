import request from "../../utils/api";
import {GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS} from "./ingredientsList";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";


export const forgotPassword = (data) => {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST
    });

    const forgotPasswordOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: data.email})
    };

    request("password-reset", forgotPasswordOptions)
      .then( res  => {
        if (res) {
          dispatch({
            type: FORGOT_PASSWORD_SUCCESS
          })
        } else {
          dispatch({
            type: FORGOT_PASSWORD_FAILED
          })
        }
        console.log(res)
      })
      .catch( err => {
        dispatch({
          type: FORGOT_PASSWORD_FAILED
        })
        console.log(err);
      })
  }
}

export const resetPassword = (data) => {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });

    const resetPasswordOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password: data.password, token: data.token})
    };

    request("password-reset/reset", resetPasswordOptions)
      .then( res  => {
        if (res) {
          dispatch({
            type: FORGOT_PASSWORD_SUCCESS
          })
        } else {
          dispatch({
            type: FORGOT_PASSWORD_FAILED
          })
        }
        console.log(res)
      })
      .catch( err => {
        dispatch({
          type: FORGOT_PASSWORD_FAILED
        })
        console.log(err);
      })
  }
}

export const register = (data) => {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST
    });
    request("auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: data.nameValue, email: data.emailValue, password: data.passwordValue})
    })
      .then( res  => {
        if (res) {
          dispatch({
            type: REGISTER_SUCCESS
          })
        } else {
          dispatch({
            type: REGISTER_FAILED
          })
        }
        console.log(res)
      })
      .catch( err => {
        dispatch({
          type: REGISTER_FAILED
        })
        console.log(err);
      })
  }
}

export const login = (data) => {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST
    });
    request("auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: data.emailValue, password: data.passwordValue})
    })
      .then( res => {
        if (res) {
          dispatch({
            type: LOGIN_SUCCESS
          })
        } else {
          dispatch({
            type: LOGIN_FAILED
          })
        }
        console.log(res)
      })
      .catch( err => {
        dispatch({
          type: LOGIN_FAILED
        })
        console.log(err);
      })
  }
}