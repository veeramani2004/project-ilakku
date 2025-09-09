import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";

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
            <Button color="inherit" onClick={() => navigate("/posts")}>
              Post
            </Button>

            <Button color="inherit" onClick={() => navigate()}>
              About
            </Button>
            <Button color="inherit" onClick={() => navigate()}>
              Login
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export { NavBar };
