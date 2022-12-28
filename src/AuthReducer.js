const AuthReducer = (state, action) => {
  switch (action.type) {
    case "Login_Start":
      return {
        user_detail: null,
        isFetching: true,
        error: false,
      };

    case "Login_Success":
      return {
        user_detail: action.payload,
        isFetching: false,
        error: false,
      };

    case "Login_Failure":
      return {
        user_detail: null,
        isFetching: false,
        error: action.payload,
      };

      case "Logout_Success":
      return {
        user_detail: null,
        isFetching: false,
        error: false,
      };

    default:
      return state;
  }
};

export default AuthReducer;
