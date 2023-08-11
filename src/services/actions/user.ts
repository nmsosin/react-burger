import request, {fetchWithRefresh} from "../../utils/api";
import { getCookie, setCookie, deleteCookie } from "../../utils/cookie";
import {AppDispatch} from "../../utils/types";

export const REGISTER_REQUEST: "REGISTER_REQUEST" = "REGISTER_REQUEST";
export const REGISTER_SUCCESS: "REGISTER_SUCCESS" = "REGISTER_SUCCESS";
export const REGISTER_FAILED: "REGISTER_FAILED" = "REGISTER_FAILED";

export const FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST" = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS" = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED: "FORGOT_PASSWORD_FAILED" = "FORGOT_PASSWORD_FAILED";

export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED: "RESET_PASSWORD_FAILED" = "RESET_PASSWORD_FAILED";

export const LOGIN_REQUEST: "LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGIN_FAILED: "LOGIN_FAILED" = "LOGIN_FAILED";

export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED: "LOGOUT_FAILED" = "LOGOUT_FAILED";

export const GET_USER_REQUEST: "GET_USER_REQUEST" = "GET_USER_REQUEST";
export const GET_USER_SUCCESS: "GET_USER_SUCCESS" = "GET_USER_SUCCESS";
export const GET_USER_FAILED: "GET_USER_FAILED" = "GET_USER_FAILED";

export const UPDATE_USER_REQUEST: "UPDATE_USER_REQUEST" = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS" = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED: "UPDATE_USER_FAILED" = "UPDATE_USER_FAILED";

export const SET_AUTH_CHECKED: "SET_AUTH_CHECKED" = "SET_AUTH_CHECKED";

// action interfaces

export interface IUserData {
  user: {
    name: string;
    email: string;
  }

  name?: string;
  email?: string;
  password?: string;
  token?: string;
  accessToken: string;
  refreshToken: string;
}

interface IRegisterUserRequest {
  readonly type: typeof REGISTER_REQUEST
}

interface IRegisterUserSuccess {
  readonly type: typeof REGISTER_SUCCESS;
  payload?: IUserData
  user: {
    email: string;
    name: string;
  };
  accessToken?: string;
  refreshToken?: string;
}

interface IRegisterUserFailed {
  readonly type: typeof REGISTER_FAILED;
}

interface ILoginUserRequest {
  readonly type: typeof LOGIN_REQUEST;
}

interface ILoginUserSuccess {
  readonly type: typeof LOGIN_SUCCESS;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}

interface ILoginUserFailed {
  readonly type: typeof LOGIN_FAILED;
}

interface ILogoutUserRequest {
  readonly type: typeof LOGOUT_REQUEST;
}

interface ILogoutUserSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
  user: {};
  isAuthChecked: boolean;
}

interface ILogoutUserFailed {
  readonly type: typeof LOGOUT_FAILED;
}

interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
  resetPasswordDone: boolean;
}

interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

interface IForgotPasswordFailed {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

interface IResetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST
}

interface IGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  payload: IUserData;
}

interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED
}

interface IUpdateUserRequest {
  readonly type: typeof UPDATE_USER_REQUEST
}

interface IUpdateUserSuccess {
  readonly type: typeof UPDATE_USER_SUCCESS
  payload: IUserData;
}

interface IUpdateUserFailed {
  readonly type: typeof UPDATE_USER_FAILED
}

interface ISetAuthChecked {
  readonly type: typeof SET_AUTH_CHECKED;
  payload: boolean;
}

// Union type

export type TUserActions =
  | IRegisterUserRequest
  | IRegisterUserSuccess
  | IRegisterUserFailed
  | ILoginUserRequest
  | ILoginUserSuccess
  | ILoginUserFailed
  | ILogoutUserRequest
  | ILogoutUserSuccess
  | ILogoutUserFailed
  | IForgotPasswordRequest
  | IForgotPasswordSuccess
  | IForgotPasswordFailed
  | IResetPasswordRequest
  | IResetPasswordSuccess
  | IResetPasswordFailed
  | IGetUserRequest
  | IGetUserSuccess
  | IGetUserFailed
  | IUpdateUserRequest
  | IUpdateUserSuccess
  | IUpdateUserFailed
  | ISetAuthChecked

// action creators

export const setAuthChecked = (value: boolean): ISetAuthChecked => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

const forgotPasswordRequest = (): IForgotPasswordRequest => {
  return {
    type: FORGOT_PASSWORD_REQUEST,
    resetPasswordDone: false
  }
}
const forgotPasswordSuccess = (): IForgotPasswordSuccess => {
  return {
    type: FORGOT_PASSWORD_SUCCESS
  }
}
const forgotPasswordFailed = (): IForgotPasswordFailed => {
  return {
    type: FORGOT_PASSWORD_FAILED
  }
}
export const forgotPassword = (data: IUserData) => {
  return function (dispatch: AppDispatch) {
    dispatch(forgotPasswordRequest());
    request("password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: data.email})
    })
      .then( res  => {
        if (res) {
          dispatch(forgotPasswordSuccess())
        } else {
          dispatch(forgotPasswordFailed())
        }
      })
      .catch( err => {
        dispatch(forgotPasswordFailed())
        console.log('Ошибка запроса на восстановление пароля:', err);
      })
  }
}

const resetPasswordRequest = (): IResetPasswordRequest => {
  return {
    type: RESET_PASSWORD_REQUEST
  }
}
const resetPasswordSuccess = (): IResetPasswordSuccess => {
  return {
    type: RESET_PASSWORD_SUCCESS
  }
}
const resetPasswordFailed = (): IResetPasswordFailed => {
  return {
    type: RESET_PASSWORD_FAILED
  }
}
export const resetPassword = (data: IUserData) => {
  return function (dispatch: AppDispatch) {
    dispatch(resetPasswordRequest());
    request("password-reset/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password: data.password, token: data.token})
    })
      .then( res  => {
        if (res) {
          dispatch(resetPasswordSuccess())
        } else {
          dispatch(resetPasswordFailed())
        }
        console.log('res', res)
      })
      .catch( err => {
        dispatch(resetPasswordFailed())
        console.log('Ошибка восстановления пароля:', err);
      })
  }
}

const registerRequest = (): IRegisterUserRequest => {
  return {
    type: REGISTER_REQUEST
  }
}
const registerSuccess = (res: IUserData): IRegisterUserSuccess => {
  return {
    type: REGISTER_SUCCESS,
    user: res.user,
    accessToken: res.accessToken,
    refreshToken: res.refreshToken,
  }
}
const registerFailed = (): IRegisterUserFailed => {
  return {
    type: REGISTER_FAILED
  }
}
export const register = (data: IUserData) => {
  return function (dispatch: AppDispatch) {
    dispatch(registerRequest());
    fetchWithRefresh("auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: data.name, email: data.email, password: data.password})
    })
      .then( res  => {
        if (res) {
          dispatch(registerSuccess(res))
          setCookie('accessToken', res.accessToken)
          localStorage.setItem('refreshToken', res.refreshToken)
          dispatch(setAuthChecked(true));
        } else {
          dispatch(registerFailed())
        }
        console.log(res)
      })
      .catch( err => {
        dispatch(registerFailed())
        console.log('Ошибка регистрации:', err);
      })
  }
}

const loginRequest = (): ILoginUserRequest => {
  return {
    type: LOGIN_REQUEST,
  }
}
const loginSuccess = (data: IUserData): ILoginUserSuccess => {
  return {
    type: LOGIN_SUCCESS,
    user: data.user,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  }
}
const loginFailed = (): ILoginUserFailed => {
  return {
    type: LOGIN_FAILED
  }
}
export const login = (data: IUserData) => {
  return function (dispatch: AppDispatch) {
    dispatch(loginRequest());
    fetchWithRefresh("auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: data.email, password: data.password})
    })
      .then( res => {
        if (res) {
          dispatch(loginSuccess(res));
          setCookie('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
        } else {
          dispatch(loginFailed());
        }
        // console.log(res)
      })
      .catch( err => {
        dispatch(loginFailed());
        console.log('Ошибка авторизации:', err);
      })
  }
};

const logoutRequest = (): ILogoutUserRequest => {
  return {
    type: LOGOUT_REQUEST
  }
};
const logoutSuccess = (): ILogoutUserSuccess => {
  return {
    type: LOGOUT_SUCCESS,
    user: {},
    isAuthChecked: false,
  }
};
const logoutFailed = (): ILogoutUserFailed => {
  return {
    type: LOGOUT_FAILED
  }
};
export const logout = (callback: () => void) => {
  return function (dispatch: AppDispatch) {
    dispatch(logoutRequest());
    request("auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({token: localStorage.getItem('refreshToken')})
    })
      .then( res => {
        if (res) {
          dispatch(logoutSuccess())
          deleteCookie('accessToken');
          localStorage.removeItem('refreshToken')
          callback();
        } else {
          dispatch(logoutFailed())
        }
        // console.log(res)
      })
      .catch( err => {
        dispatch(logoutFailed())
        console.log('Ошибка выхода из профиля:', err);
      })
  }
}

const getUserRequest = (): IGetUserRequest => {
  return {
    type: GET_USER_REQUEST,
  }
};
const getUserSuccess = (user: IUserData): IGetUserSuccess => {
  return {
    type: GET_USER_SUCCESS,
    payload: user
  }
};
const getUserFailed = (): IGetUserFailed => {
  return {
    type: GET_USER_FAILED
  }
};
export const getUserInfo = () => {
  return (dispatch: AppDispatch) => {
    dispatch(getUserRequest())
    request("auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + getCookie("accessToken")
      }
    })
      .then( res => {
        if (res) {
          dispatch(getUserSuccess(res.user))
        } else {
          dispatch(getUserFailed())
        }
      })
      .catch( err => {
        if (err.message === 'jwt expired') {
          refreshUserToken();
          // console.log(err)
        } else {
          dispatch(getUserFailed())
          console.log('Ошибка получения данных пользователя:', err);
        }

      })
  }
}

const updateUserRequest = (): IUpdateUserRequest => {
  return {
    type: UPDATE_USER_REQUEST,
  }
};
const updateUserSuccess = (user: IUserData): IUpdateUserSuccess => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: user
  }
};
const updateUserFailed = (): IUpdateUserFailed => {
  return {
    type: UPDATE_USER_FAILED
  }
};
export const updateUserInfo = (data: IUserData) => {
  return (dispatch: AppDispatch) => {
    dispatch(updateUserRequest())
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
          dispatch(updateUserSuccess(res.user))
        } else {
          dispatch(updateUserFailed())
        }
        console.log(res)
      })
      .catch( err => {
        dispatch(updateUserFailed())
        console.log('Ошибка обновления данных пользователя:', err);
      })
  }
}

export const refreshUserToken = () => {
  request('auth/token', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
  })
    .then((res) => {
      if (res) {
        setCookie('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
      }
    })
    .catch( err => {
      console.log('Ошибка обновления токена:', err);
    })
}
