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
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  SET_AUTH_CHECKED,

} from "../actions/user";

type TUserInitialState = {
  user: {
    email: string;
    name: string;
  },

  isAuthChecked: boolean;
  password: string;

  registerRequest: boolean;
  registerSuccess: boolean;
  registerFailed: boolean;

  loginRequest: boolean;
  loginSuccess: boolean;
  loginFailed: boolean;

  logoutRequest: boolean;
  logoutSuccess: boolean;
  logoutFailed: boolean;

  getUserRequest: boolean;
  getUserSuccess: boolean;
  getUserFailed: boolean;

  updateUserRequest: boolean;
  updateUserSuccess: boolean;
  updateUserFailed: boolean;

  forgotPasswordRequest: boolean;
  forgotPasswordSuccess: boolean;
  forgotPasswordFailed: boolean;

  resetPasswordRequest: boolean;
  resetPasswordSuccess: boolean;
  resetPasswordFailed: boolean;
}

export const userInitialState: TUserInitialState = {
  user: {
    email: "",
    name: "",
  },

  isAuthChecked: false,
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

  getUserRequest: false,
  getUserSuccess: false,
  getUserFailed: false,

  updateUserRequest: false,
  updateUserSuccess: false,
  updateUserFailed: false,

  forgotPasswordRequest: false,
  forgotPasswordSuccess: false,
  forgotPasswordFailed: false,

  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,
}

export const userReducer = ( state = userInitialState, action ): TUserInitialState => {
  switch (action.type) {
    //authorization check
    case SET_AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: action.payload
      }
    }

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
        loginRequest: true,
        isAuthChecked: true
      };
    };
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginSuccess: true,
        loginFailed: false,
        user: action.user,
        isAuthChecked: true
      };
    };
    case LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginSuccess: false,
        loginFailed: true,
      };
    };

    //log out
      case LOGOUT_REQUEST: {
        return {
          ...state,
          logoutRequest: true
        };
      };
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: true,
        logoutSuccess: true,
        logoutFailed: false,
        user: {},
      };
    };
    case LOGOUT_FAILED: {
        return {
          ...state,
          logoutRequest: false,
          logoutSuccess: false,
          logoutFailed: true
        };
      };

    // get user data
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
      };
    };
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserRequest: false,
        getUserSuccess: true,
        getUserFailed: false,
        user: action.user,
        isAuthChecked: true
      };
    };
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserRequest: false,
        getUserSuccess: false,
        getUserFailed: true,
      };
    };


    // update user data
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
      };
    };
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserSuccess: true,
        updateUserFailed: false,
        user: action.user
      };
    };
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserSuccess: false,
        updateUserFailed: true,
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
        forgotPasswordFailed: false
      };
    };
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordSuccess: false,
        forgotPasswordFailed: true
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
      return state;
    }
  }
}