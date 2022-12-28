import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "Login_Start" });
  try {
    const res = await axios.post("http://localhost:3333", userCredential);
    dispatch({ type: "Login_Success", payload: res.data });
     window.localStorage.setItem('token-info', JSON.stringify(res.data));
  } catch (err) {
    dispatch({ type: "Login_Failure", payload: err });
  }
};


export const logOut = async(userCredential, dispatch)=>{
  dispatch({type:"Logout_Success"})
  window.localStorage.removeItem('token-info');
  console.log(window.localStorage.getItem('token-info'))
}