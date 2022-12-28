import { createContext, useReducer, type Dispatch } from "react";
import AuthReducer from "./AuthReducer.js";

const INITIAL_STATE = {
  user_detail: null,
  isFetching: false,
  error: false,
  dispatch: (() => undefined) as Dispatch<any>,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }: any) => {
  console.log();
  const [state, dispatch] = useReducer(AuthReducer, {
    ...INITIAL_STATE,
    user_detail: window.localStorage.getItem("token-info")
      ? JSON.parse(window.localStorage.getItem("token-info") || "")
      : null,
  });

  return (
    <>
      <AuthContext.Provider
        value={{
          user_detail: state.user_detail,
          isFetching: state.isFetching,
          error: state.error,
          dispatch,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

/*export const login =async(email:any,password:any)=>{
  try{
    const loginInfo = {
      email: email.current.value,
      password: password.current.value,
    };
    console.log(loginInfo);
    
    const user = await axios.post(`http://localhost:3333`, {email,password});
    console.log(user.data)
  }
  catch(err){
    console.log(err)
  }
}


export const AuthContext = createContext<any>({});*/

/*export const AuthContextProvider = ({ children }: any) => {
  //   const [state, dispatch] = useReducer(AuthReducer, Initial_State);

  const [user, setUser] = useState<any>(
    window.localStorage.getItem("user" || "") || null
  );

  useEffect(() => {
    if (user) {
      window.localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("user");
  };

  const handleLogin = () => {
    // backend call
 
    
    setUser({
      user
    });
    window.location.href = "/";
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          setUser,
          handleLogout,
          handleLogin,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};*/
