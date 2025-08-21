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
  const [userIdentity, setuserIdentity] = useState("");
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState("");       

  const [user, setUser] = useLocalStorageObject("user", null)
  const [token, setToken] = useLocalStorageObject("token", null)

 




const handleLogin = async (userIdentity: string, password: string) => {

    setError("");
    setLoading(true);
    router.push("/dashboard");
    

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
          <h4>Sign In</h4>
          <p>
            Kindly sign in with your <b>SkytCall Agent account</b> to
            access the dashboard.
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

          {/* Remember Me and Reset Password */}
          <div className="row mb-4 rmber-area">
            <div className="col-6">
              <div className="custom-control custom-checkbox mr-sm-2">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customControlAutosizing"
                />
                <label
                  className="custom-control-label"
                  htmlFor="customControlAutosizing"
                >
                  Remember Me
                </label>
              </div>
            </div>
            <div className="col-6 text-right">
              <Link href="/reset-password">Reset your Password?</Link>
            </div>
          </div>

          {/* Submit Button */}
          <div className="submit-btn-area">
            <button
              id="form_submit"
              type="button"
              onClick={() => handleLogin(userIdentity, password)}
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Submit"} <i className="ti-arrow-right" />
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
