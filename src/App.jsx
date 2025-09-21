// import { Route, Routes } from "react-router";
// import "./App.css";
// import { PostList } from "./PostList";
// import { SignUpForm } from "./SignUpForm";
// import { LoginForm } from "./LoginForm";
// import { LandingPage } from "./LandingPage";
// import "./NavBar.css";
// import { NavBar01 } from "./NavBar01";
// import { SavedPosts } from "./SavedPosts";

// export default function App() {
//   const isLogin = localStorage.getItem("isLogin");
//   const ADMI_JWT_TOKEN = localStorage.getItem("token");
//   return (
//     <div className="app">
//       {isLogin ? <NavBar /> : <NavBar01 />}

//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/post" element={<PostList />} />
//         <Route path="/profile" element={<ProfilePage />} />
//         <Route path="/signup" element={<SignUpForm />} />
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/resources" element={<ResourceList />} />
//         <Route
//           path="/admin/dashboard"
//           element={<AdminDashboard token={ADMI_JWT_TOKEN} />}
//         />

//         <Route path="/mentorForm" element={<BeMentorForm />} />
//         <Route path="/saved" element={<SavedPosts />} />
//         <Route path="/resources/:id" element={<ResourceDetails />} />
//       </Routes>
//     </div>
//   );
// }

// import { ResourceList } from "./resource/ResourceList";
// import ProfilePage from "./profile/ProfilePage";
// import { useNavigate } from "react-router-dom";
// import logo from "./assets/logo.png";
// import "./NavBar.css";
// import { ResourceDetails } from "./resource/ResourceDetails";
// import BeMentorForm from "./BeMentorForm";
// import AdminDashboard from "./AdminDashboard";
// import { Token } from "@mui/icons-material";

// function NavBar() {
//   const navigate = useNavigate();

//   return (
//     <div className="nav-bar">
//       <div className="nav-container">
//         {/* Left Logo */}
//         <img
//           src={logo}
//           alt="logo ilakku"
//           className="logo"
//           onClick={() => navigate("/")}
//         />

//         {/* Center Nav Links */}
//         <div className="nav-items">
//           <button onClick={() => navigate("/post")}>Home</button>
//           <button onClick={() => navigate("/resources")}>Resources</button>
//           <button onClick={() => navigate()}>Message</button>
//           <button onClick={() => navigate("/mentorForm")}>Be a mentor</button>
//           <button onClick={() => navigate("/profile")}>Profile</button>
//           {/* <button onClick={() => navigate("/admin/dashboard")}>Admin</button> */}
//           <button onClick={() => navigate("/admin/dashboard")}>Admin</button>
//           <button onClick={() => navigate("/signup")}>Signup</button>
//           <button onClick={() => navigate("/login")}>Login</button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Route, Routes } from "react-router";
import { useState, useEffect } from "react";
import "./App.css";
import { PostList } from "./PostList";
import { SignUpForm } from "./SignUpForm";
import { LoginForm } from "./LoginForm";
import { LandingPage } from "./LandingPage";
import NavBar from "./NavBar";
import { NavBar01 } from "./NavBar01";
import { SavedPosts } from "./SavedPosts";
import { ResourceList } from "./resource/ResourceList";
import ProfilePage from "./profile/ProfilePage";
import { ResourceDetails } from "./resource/ResourceDetails";
import BeMentorForm from "./BeMentorForm";
import AdminDashboard from "./AdminDashboard";

export default function App() {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("isLogin") === "true"
  );

  const ADMIN_JWT_TOKEN = localStorage.getItem("token");
  useEffect(() => {
    const syncLogin = () => {
      setIsLogin(localStorage.getItem("isLogin") === "true");
    };
    window.addEventListener("storage", syncLogin);
    return () => window.removeEventListener("storage", syncLogin);
  }, []);

  return (
    <div className="app">
      {isLogin ? <NavBar /> : <NavBar01 />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/post" element={<PostList />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile/:username" element={<ProfilePage />} />

        <Route path="/resources" element={<ResourceList />} />
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard token={ADMIN_JWT_TOKEN} />}
        />
        <Route path="/mentorForm" element={<BeMentorForm />} />
        <Route path="/saved" element={<SavedPosts />} />
        <Route path="/resources/:id" element={<ResourceDetails />} />
      </Routes>
    </div>
  );
}
