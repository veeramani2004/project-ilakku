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

import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import "./NavBar.css";

export default function NavBar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // ✅ get role from localStorage

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
          <button onClick={() => navigate("/post")}>Home</button>
          <button onClick={() => navigate("/resources")}>Resources</button>
          <button onClick={() => navigate("/mentorForm")}>Be a mentor</button>
          <button onClick={() => navigate("/profile")}>Profile</button>

          {/* ✅ Show Admin only if role is admin */}
          {role === "ADMIN" && (
            <button onClick={() => navigate("/admin/dashboard")}>Admin</button>
          )}

          {/* <button onClick={() => navigate("/signup")}>Signup</button>
          <button onClick={() => navigate("/login")}>Login</button> */}
        </div>
      </div>
    </div>
  );
}
