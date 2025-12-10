
import "./Auth.css"; // CSS for consistent styling
import { useState } from "react";
import signup from "../firebase/firebase"; 

const SignupPage = () => {
   
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("jobSeeker");
  const [error, setError] = useState("");




    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
    
        try {
          await signup(email, password, role);
          alert("Account created successfully!");
        } catch (err) {
          setError(err.message);
        } 
      };

    return (
<div className="auth-container">
      <div className="auth-card">
        <h2>Create an Account</h2>
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
            placeholder="Enter a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="jobSeeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>

          <button type="submit">
           
          </button>
        </form>
        <p className="switch-text">
          Already have an account? <a href="/log-in">Login</a>
        </p>
      </div>
    </div>
  );

}

export default SignupPage;