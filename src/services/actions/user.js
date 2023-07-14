import request, {fetchWithRefresh} from "../../utils/api";
import { getCookie, setCookie, deleteCookie } from "../../utils/cookie";

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

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

// export const SET_USER = "SET_USER";
//
// export const setUserTest = (user) => ({
//   type: SET_USER,
//   payload: user,
// });
//
// const getUser = () =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve({
//         user: {},
//       });
//     }, 1000);
//   });
// export const getUserTest = () => {
//   return (dispatch) => {
//     return getUser().then((res) => {
//       dispatch(setUserTest(res.user));
//     });
//   };
// };
//
// export const checkUserAuth = () => {
//   return (dispatch) => {
//     if (document.cookie) {
//       console.log('cookie', document.cookie)
//       dispatch(getUserTest())
//         .catch(() => {
//           deleteCookie("accessToken");
//           localStorage.removeItem("refreshToken");
//           dispatch(setUserTest(null));
//         })
//         .finally(() => dispatch(setAuthChecked(true)));
//     } else {
//       dispatch(setAuthChecked(true));
//     }
//   };
// };

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
    fetchWithRefresh("auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: data.nameValue, email: data.emailValue, password: data.passwordValue})
    })
      .then( res  => {
        if (res) {
          dispatch({
            type: REGISTER_SUCCESS,
            user: res.user,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          })
          console.log('token save done', res.accessToken, res.refreshToken)
          setCookie('accessToken', res.accessToken)
          localStorage.setItem('refreshToken', res.refreshToken)
          dispatch(setAuthChecked(true));
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
      type: LOGIN_REQUEST,
      // isAuthChecked: true,
    });
    fetchWithRefresh("auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: data.emailValue, password: data.passwordValue})
    })
      .then( res => {
        console.log(res.user);
        if (res) {
          dispatch({
            type: LOGIN_SUCCESS,
            user: res.user,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          });
          console.log('login successful', res.accessToken, res.refreshToken)
          setCookie('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
        } else {
          dispatch({
            type: LOGIN_FAILED
          })
        }
        // console.log(res)
      })
      .catch( err => {
        dispatch({
          type: LOGIN_FAILED
        })
        console.log(err);
      })
  }
}

// export const logout = (data) => {
//   return function (dispatch) {
//     dispatch({
//       type: LOGOUT_REQUEST
//     });
//     request("auth/logout", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({token: data.refreshToken})
//     })
//       .then( res => {
//         if (res) {
//           dispatch({
//             type: LOGOUT_SUCCESS
//           })
//         } else {
//           dispatch({
//             type: LOGOUT_FAILED
//           })
//         }
//         console.log(res)
//       })
//       .catch( err => {
//         dispatch({
//           type: LOGOUT_FAILED
//         })
//         console.log(err);
//       })
//   }
// }

export const getUserInfo = (data) => {
  return (dispatch) => {
    dispatch({
      type: GET_USER_REQUEST,
    })
    request("auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + getCookie("accessToken")
      }
    })
      .then( res => {
        if (res) {
          dispatch({
            type: GET_USER_SUCCESS,
            user: res.user
          })
        } else {
          dispatch({
            type: GET_USER_FAILED
          })
        }
        console.log(res)
      })
      .catch( err => {
        dispatch({
          type: GET_USER_FAILED
        })
        console.log(err);
      })
  }
}

export const updateUserInfo = (data) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_USER_REQUEST,
    })
    request("auth/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + getCookie("accessToken")
      },
      body: JSON.stringify({ email: data.email, password: data.password, name: data.name })
    })
      .then( res => {
        if (res) {
          dispatch({
            type: UPDATE_USER_SUCCESS,
            user: res.user
          })
        } else {
          dispatch({
            type: UPDATE_USER_FAILED
          })
        }
        console.log(res)
      })
      .catch( err => {
        dispatch({
          type: UPDATE_USER_FAILED
        })
        console.log(err);
      })
  }
}

