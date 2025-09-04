"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {useState, useCallback} from "react";
import { useLocalStorageObject } from "../../hooks/useLocalStorage";
import Loader from "../../components/Loader";
import {toast} from "react-toastify";


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userIdentity, setuserIdentity] = useState("");
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState("");       

  const [user, setUser] = useLocalStorageObject("user", null)
  const [token, setToken] = useLocalStorageObject("token", null)

 




const handleReset = async (email: string) => {

    setError("");
    setLoading(true);
    router.push("/login");
  try {
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });


    const data = await response.json();

    if (response.ok) {
      setUser(data.data ?? null);  

      toast.success("Successfully logged in")
      router.push("/dashboard");
      
    } else {
      throw new Error(data.message || "Login failed");
    }

  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message || "Something went wrong");
    } else {
      setError("Something went wrong");
    }
  } finally {
    setLoading(false);
  }
}; 


  return (
    <div className="login-area login-s2">
      {/* {loading && <Loader />} */}
      <div className="container">
      <div className="login-box ptb--100 " >
      <form className="bg-white p-4 rounded shadow-lg">
        <div className="login-form-head">
          <h4>Reset Password</h4>
          <p>
            Provide your email to reset your <b>SkytCall Agent account</b> password.
          </p>
        </div>

        <div className="login-form-body">

          <div className={`form-gp ${email ? "active" : ""}`}>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <i className="ti-email" /> 
                <label htmlFor="email">email</label>
                <div className="text-danger"></div>
          </div>

          {/* Submit Button */}
          <div className="submit-btn-area">
            <button
              id="form_submit"
              type="button"
              onClick={() => handleReset(email)}
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
