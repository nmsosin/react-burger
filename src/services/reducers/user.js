import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,

} from "../actions/user";

const userInitialState = {
  user: {
    email: "",
    name: "",
    isAuthChecked: false,
  },
  password: "",

  registerRequest: false,
  registerSuccess: false,
  registerFailed: false,

  loginRequest: false,
  loginSuccess: false,
  loginFailed: false,

  logoutRequest: false,
  logoutSuccess: false,
  logoutFailed: false,

  forgotPasswordRequest: false,
  forgotPasswordSuccess: false,
  forgotPasswordFailed: false,

  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,
  resetPasswordDone: false,
}

export const userReducer = ( state = userInitialState, action ) => {
  switch (action.type) {
    //registration
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
      };
    };
    case REGISTER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        registerSuccess: true,
        user: action.payload
      };
    };
    case REGISTER_FAILED: {
      return {
        ...state,
        registerRequest: false,
        registerSuccess: false,
        registerFailed: true
      };
    };

    //log in
    case LOGIN_REQUEST: {
      return {
        ...state,
        //user:
      };
    };

    //log out
      case LOGOUT_REQUEST: {
        return {
          ...state,
          //user:
        };
      };

    //forgot password
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
        resetPasswordDone: false
      };
    };
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordSuccess: true,
        forgotPasswordFailed: false,
        resetPasswordDone: true
      };
    };
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordSuccess: false,
        forgotPasswordFailed: true,
        resetPasswordDone: false
      };
    };

    //reset password
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true
      };
    };
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordSuccess: true,
        resetPasswordFailed: false
      };
    };
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordSuccess: false,
        resetPasswordFailed: true
      };
    };
    default: {
      return userInitialState;
    }


  }
}