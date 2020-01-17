// I have written the main authentication-related dispatch actions here. This dispatch actions are called from the
// actions folder, after you get a response from the backend server and call dispatch({ ... })

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: true,
  user: null,
  errors: {},
};


export default function auth(state = initialState, action) {

  switch (action.type) {

    case 'USER_LOADING':
      return {...state, isLoading: true};

    case 'USER_LOADED':
      return {...state, isAuthenticated: true, isLoading: false, user: action.payload};

    case 'LOGIN_SUCCESSFUL':
    case 'REGISTRATION_SUCCESSFUL':
      localStorage.setItem("token", action.payload.token);
      return {...state, ...action.payload, isAuthenticated: true, isLoading: false, errors: null};

    case 'AUTHENTICATION_ERROR':
    case 'LOGIN_FAILED':
    case 'REGISTRATION_FAILED':
    case 'LOGOUT_SUCCESSFUL':
      localStorage.clear();
      return {
        ...state, errors: action.payload, token: null, user: null,
        isAuthenticated: false, isLoading: false
      };

    default:
      return state;

  }
}