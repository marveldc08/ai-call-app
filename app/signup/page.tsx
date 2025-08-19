"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {useState, useCallback} from "react";
import { useLocalStorageObject } from "../../hooks/useLocalStorage";
import Loader from "../../components/Loader";
import {toast} from "react-toastify";


export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userIdentity, setuserIdentity] = useState("");
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState("");       

  const [user, setUser] = useLocalStorageObject("user", null)
  const [token, setToken] = useLocalStorageObject("token", null)

 




const handleSignup = async (userIdentity: string, password: string) => {
//   setLoading(true);
  setError("");
        router.push("/login");

//   try {
//     const response = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ userIdentity, password }),
//     });

   

//     const data = await response.json();

//     if (response.ok) {

//       setToken(data.data.token ?? null);     
//       setUser(data.data.user ?? null);  

      
//       toast.success("Successfully logged in")
//       router.push("/dashboard");
      
//     } else {
//       throw new Error(data.message || "Login failed");
//     }

//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       setError(err.message || "Something went wrong");
//     } else {
//       setError("Something went wrong");
//     }
//   } finally {
//     setLoading(false);
//   }
}; 


  return (
    <div className="login-area login-s2">
      {/* {loading && <Loader />} */}
      <div className="container">
      <div className="login-box ptb--100 " >
      <form className="bg-white p-4 rounded shadow-lg">
        <div className="login-form-head">
          <h4>Sign Up</h4>
          <p>
            Kindly sign up to get your <b>SkytCall Agent account</b> 
          </p>
        </div>

        <div className="login-form-body">

          <div className={`form-gp ${userIdentity ? "active" : ""}`}>
                <input
                
                  type="text"
                  id="userIdentity"
                  value={userIdentity}
                  onChange={(e) => setuserIdentity(e.target.value)}
                  required
                />
                <i className="ti-email" /> 
                <label htmlFor="email">User Name</label>
                <div className="text-danger"></div>
          </div>

          {/* Password Field */}

          <div className={`form-gp ${password ? "active" : ""}`}>
                <input
                
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <i className="ti-lock" />
                <label htmlFor="password">Password</label>
                <div className="text-danger"></div>
            </div>
          <div className={`form-gp ${confirmPassword ? "active" : ""}`}>
                <input
                
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <i className="ti-lock" />
                <label htmlFor="password">Confirm Password</label>
                <div className="text-danger"></div>
            </div>

         

          {/* Submit Button */}
          <div className="submit-btn-area">
            <button
              id="form_submit"
              type="button"
              onClick={() => handleSignup(userIdentity, password)}
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Submit"} <i className="ti-arrow-right" />
            </button>

            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}
          </div>


          {/* Navigation Link */}
          {/* <div className="test-navigation submit-btn-area">
            <Link href="/dashboard">
              Test Navigate <i className="ti-arrow-right"/>
            </Link>
          </div> */}
        </div>

      </form>
    </div>
      </div>
    </div> 

  );
}
