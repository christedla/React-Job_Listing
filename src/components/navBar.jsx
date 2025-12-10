import { NavLink } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
const NavBar = () => {
  const { user, role,  signOut  } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <div className="container nav-content">
        <NavLink to="/" className="logo">
          <img src="src/assets/react.svg" alt="React Logo" />
          <span>React Jobs</span>
        </NavLink>

        <div className="nav-links">
          <NavLink to="/" className={({isActive}) => "nav-link" + (isActive ? " navLinkActive" : "")}>Home</NavLink>
          <NavLink to="/jobs" className={({isActive}) => "nav-link" + (isActive ? " navLinkActive" : "")}>Jobs</NavLink>

          {/* show Add Job + My Jobs only for employers (now inside .nav-links so they get same styling) */}
          {
            role === "employer" && (
              <>
                <NavLink to="/add-job" className={({isActive}) => "nav-link" + (isActive ? " navLinkActive" : "")}>Add Job</NavLink>
                <NavLink to="/my-jobs" className={({isActive}) => "nav-link" + (isActive ? " navLinkActive" : "")}>My Jobs</NavLink>
              </>
            )
          }
        </div>

        {!user ? (
          <div className="nav-auth">
            <NavLink to="/sign-up" className="nav-btn">Sign Up</NavLink>
            <NavLink to="/log-in" className="nav-btn nav-btn-login">Login</NavLink>
          </div>
        ) : (
           <button className="nav-btn" onClick={() => signOut()}>Logout</button>
        )}

      </div>
    </nav>
  );
};

export default NavBar;