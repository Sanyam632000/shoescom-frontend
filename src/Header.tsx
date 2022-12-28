
import "./index.css";
import { useContext } from "react";
import { AuthContext } from "./AuthContet";

import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  //const { user, handleLogout } = useContext(AuthContext);
  const {user_detail} = useContext<any>(AuthContext)
  const isUserLoggedIn = window.localStorage.getItem('token-info')
  const handleLogout=(e:any)=>{
    e.preventDefault();  
    try{
      window.localStorage.removeItem('token-info') 
      window. location.reload() 
    }
    catch(err){}
  }

  const id = user_detail?._id

  //console.log(name)

  return (
          <>

    {isUserLoggedIn?
      <header className="bg-indigo-600">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <a href="#">
              <span className="sr-only">Workflow</span>
              <img
                className="h-10 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                alt=""
              />
            </a>
          </div>


          <div className="ml-10 space-x-4">
              <Link to={`/cart/${id}`}>
                <p className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">
                  Cart
                </p>
              </Link>
              <button
                onClick={handleLogout}
                className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
              >
                Log Out
              </button>
            </div>

          {/*{!user ? (
            <div className="ml-10 space-x-4">
              <Link to="/login">
                <p className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">
                  Sign in
                </p>
              </Link>
              <a
                href="#"
                className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
              >
                Sign up
              </a>
            </div>
          ) : (
            <div className="ml-10 space-x-4" onClick={handleLogout}>
              <p className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">
                Logout
              </p>
            </div>
          )}*/}
        </div>
      </nav>
    </header>


      :

      <header className="bg-indigo-600">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <a href="#">
              <span className="sr-only">Workflow</span>
              <img
                className="h-10 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                alt=""
              />
            </a>
          </div>


          <div className="ml-10 space-x-4">
              <Link to="/login">
                <p className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">
                  Sign in
                </p>
              </Link>
              
              <Link to="/register"
                //onClick={handleLogout}
                className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
              >
                Sign up
              </Link>
              
            </div>

          {/*{!user ? (
            <div className="ml-10 space-x-4">
              <Link to="/login">
                <p className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">
                  Sign in
                </p>
              </Link>
              <a
                href="#"
                className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
              >
                Sign up
              </a>
            </div>
          ) : (
            <div className="ml-10 space-x-4" onClick={handleLogout}>
              <p className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">
                Logout
              </p>
            </div>
          )}*/}
        </div>
      </nav>
    </header>
    }



</>
  );
}
