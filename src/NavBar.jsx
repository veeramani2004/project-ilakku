// import { useNavigate } from "react-router-dom";
// import logo from "./assets/logo.png";
// import "./NavBar.css";

// export default function NavBar() {
//   const navigate = useNavigate();

//   return (
//     <div className="nav-bar">
//       <div className="nav-container">
//         {/* Logo */}
//         <img
//           src={logo}
//           alt="logo ilakku"
//           className="logo"
//           onClick={() => navigate("/")}
//         />

//         {/* Links */}
//         <div className="nav-items">
//           <button onClick={() => navigate("/post")}>Home</button>
//           <button onClick={() => navigate("/resources")}>Resources</button>
//           <button onClick={() => navigate("/mentorForm")}>Be a mentor</button>
//           <button onClick={() => navigate("/profile")}>Profile</button>
//           <button onClick={() => navigate("/admin/dashboard")}>Admin</button>
//           {/* <button onClick={() => navigate("/signup")}>Signup</button>
//           <button onClick={() => navigate("/login")}>Login</button> */}
//         </div>
//       </div>
//     </div>
//   );
// }
// import { useNavigate, useLocation } from "react-router-dom"; // ✅ added useLocation
// import logo from "./assets/logo.png";
// import "./NavBar.css";

// export default function NavBar() {
//   const navigate = useNavigate();
//   const location = useLocation(); // ✅ get current path
//   const role = localStorage.getItem("role"); // ✅ get role from localStorage

//   // ✅ Helper: check if a path is active
//   const isActive = (path) => location.pathname === path;

//   return (
//     <div className="nav-bar">
//       <div className="nav-container">
//         {/* Logo */}
//         <img
//           src={logo}
//           alt="logo ilakku"
//           className="logo"
//           onClick={() => navigate("/")}
//         />

//         {/* Links */}
//         <div className="nav-items">
//           <button
//             className={isActive("/post") ? "active" : ""}
//             onClick={() => navigate("/post")}
//           >
//             Home
//           </button>

//           <button
//             className={isActive("/resources") ? "active" : ""}
//             onClick={() => navigate("/resources")}
//           >
//             Resources
//           </button>

//           <button
//             className={isActive("/mentorForm") ? "active" : ""}
//             onClick={() => navigate("/mentorForm")}
//           >
//             Be a mentor
//           </button>

//           <button
//             className={isActive("/profile") ? "active" : ""}
//             onClick={() => navigate("/profile")}
//           >
//             Profile
//           </button>

//           {/* ✅ Show Admin only if role is admin */}
//           {role === "ADMIN" && (
//             <button
//               className={isActive("/admin/dashboard") ? "active" : ""}
//               onClick={() => navigate("/admin/dashboard")}
//             >
//               Admin
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useNavigate, useLocation } from "react-router-dom";
import logo from "./assets/logo.png";
import "./NavBar.css";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");
  const isLogin = localStorage.getItem("isLogin");

  // ✅ Helper: check if a path is active
  const isActive = (path) => location.pathname === path;

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("isLogin");

    navigate("/login");
  };

  return (
    <div className="nav-bar">
      <div className="nav-container">
        {/* Logo */}
        <img
          src={logo}
          alt="logo ilakku"
          className="logo"
          onClick={() => navigate("/")}
        />

        {/* Links */}
        <div className="nav-items">
          <button
            className={isActive("/post") ? "active" : ""}
            onClick={() => navigate("/post")}
          >
            Home
          </button>

          <button
            className={isActive("/resources") ? "active" : ""}
            onClick={() => navigate("/resources")}
          >
            Resources
          </button>

          <button
            className={isActive("/mentorForm") ? "active" : ""}
            onClick={() => navigate("/mentorForm")}
          >
            Be a mentor
          </button>

          <button
            className={isActive("/profile") ? "active" : ""}
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>

          {/* ✅ Show Admin only if role is admin */}
          {role === "ADMIN" && (
            <button
              className={isActive("/admin/dashboard") ? "active" : ""}
              onClick={() => navigate("/admin/dashboard")}
            >
              Admin
            </button>
          )}

          {/* ✅ Show Logout if logged in, else show Login */}
          {isLogin ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button
              className={isActive("/login") ? "active" : ""}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
