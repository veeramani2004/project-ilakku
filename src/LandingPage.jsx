import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import { NavBar01 } from "./NavBar01";

export function LandingPage() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="landing-page-container">
        <div className="login-page">
          <h1 className="welcome-text">Learn and Grow with Us</h1>

          {/* Email Login */}
          <button className="email-btn" onClick={() => navigate("/login")}>
            Login
          </button>

          {/* Policies */}
          <p className="policy-text">
            By clicking Continue to join or sign in, you agree to our{" "}
            <a href="#">User Agreement</a>, <a href="#">Privacy Policy</a>, and{" "}
            <a href="#">Cookie Policy</a>.
          </p>

          {/* Join Now */}
          <p className="join-text">
            New here? <a href="/signup">Join now</a>
          </p>
        </div>
        <img src="src/assets/landing page.png" alt="social comunity image" />
      </div>
    </div>
  );
}
