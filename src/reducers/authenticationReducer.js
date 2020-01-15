export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

const initialState = {
  isLoggedIn: false,
  token: null,
  userID: null,
  error: null,
  loading: false
};

export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        loading: true
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userID: action.payload.userID,
        isLoggedIn: true,
        loading: false
      };
    case AUTH_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoggedIn: false,
        loading: false
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        error: null,
        token: null,
        userID: null,
        isLoggedIn: false,
        loading: false
      };
    default:
      return state;
  }
};