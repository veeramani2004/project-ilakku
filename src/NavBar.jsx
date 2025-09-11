import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();
  return (
    <div className="nav-bar">
      <AppBar>
        <Toolbar className="toolbar">
          <img src={logo} alt="logo ilakku" />
          <div className="nav-items">
            <Button color="inherit" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate("/signup")}>
              Signup
            </Button>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export { NavBar };
