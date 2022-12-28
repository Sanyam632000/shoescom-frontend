export const LoginStart = (user) => ({
  type: "Login_Start"
});

export const LoginSuccess = (user_detail) => ({
  type: "Login_Success",
  payload: user_detail
});

export const LoginFailure = (error) => ({
  type: "Login_Failure",
  payload: error
});


export const Logout=(user)=>({
  type: "Logout_Success"
})