import { useContext, useRef, useState } from "react";
import "./index.css";
//import { login } from "./AuthContet";
import { Link } from "react-router-dom";
//import { setTextRange } from "typescript";
import axios from "axios";
import {AuthContext} from "./AuthContet"
import { loginCall } from "./apiCall.js";

const Login = () => {
  //const { handleLogin } = useContext(AuthContext);
  const email: any = useRef();
  const password: any = useRef();
  const {user_detail,isFetching,error,dispatch} = useContext(AuthContext);

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleChange = (e: any) => {
    setEmail(e.target.value)
  };

  const handleChange_1 = (e: any) => {
    setPassword(e.target.value)
  };

  /*const handleLogin=async(Email:any,Password:any)=>{
    try{
      const u = await login(Email, Password);
      console.log(u)
    }
    catch(err){
      console.log(err)
    }
  }*/

  /*const handleLogin = async () => {
    try {
      const loginInfo = {
        email: email.current.value,
        password: password.current.value,
      };
      console.log(loginInfo);
      const user = await axios.post(`http://localhost:3333`, loginInfo);
      console.log(user.data);
    } catch (err) {
      console.log(err);
    }
  };*/


  const handleClick =(e:any) =>{
    e.preventDefault();  
    try{
      loginCall({email:email.current.value ,password:password.current.value},dispatch)
    }
    catch(err){}
    
  }

  //console.log(user_detail)

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to="/">
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600"></p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6" >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    ref={email}
                    onChange={handleChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={handleChange_1}
                    ref={password}
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  onClick={handleClick}
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>

              <Link to="/register">
                <button
                  type="submit"
                  className="w-full mt-5 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Account
                </button>
                </Link>
              </div>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
