import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import "./NavBar01.css";

function NavBar01() {
  const navigate = useNavigate();

  return (
    <div className="nav-bar">
      <div className="nav-container">
        {/* Left Logo */}
        <img
          src={logo}
          alt="logo ilakku"
          className="logo"
          onClick={() => navigate("/")}
        />

        {/* Center Nav Links */}
        <div className="nav-items">
          <button onClick={() => navigate("/signup")}>Signup</button>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      </div>
    </div>
  );
}

export { NavBar01 };
