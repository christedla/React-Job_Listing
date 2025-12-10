import "./Auth.css"; // CSS for consistent styling
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";





const LoginPage = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");

const navigate = useNavigate();

const handleSubmit = async (e) => {
    //console.log("Login form submitted");
    e.preventDefault();
    try{
        await signInWithEmailAndPassword(auth, email, password);
         navigate("/jobs");
    }catch{
        setError("Invalid email or password");

    }

  };


    return(
        
  <div className="auth-container">


      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />  

          <button type="submit">
            Login
          </button>
        </form>
        <p className="switch-text">
          Don't have an account? <a href="/sign-up">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
export default LoginPage;