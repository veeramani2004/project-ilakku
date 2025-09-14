import { Route, Routes } from "react-router";
import "./App.css";
import { PostList } from "./PostList";
import { SignUpForm } from "./SignUpForm";
import { LoginForm } from "./LoginForm";
import { LandingPage } from "./LandingPage";
import "./NavBar.css";
import { NavBar01 } from "./NavBar01";

export default function App() {
  const isLogin = true;
  return (
    <div className="app">
      {isLogin ? <NavBar /> : <NavBar01 />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/post" element={<PostList />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import "./NavBar.css";

function NavBar() {
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
          <button onClick={() => navigate("/post")}>Home</button>
          <button onClick={() => navigate("/signup")}>Signup</button>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      </div>
    </div>
  );
}
