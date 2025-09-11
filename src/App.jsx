import { Route, Routes } from "react-router";
import "./App.css";
import { Home } from "./Home";
import { NavBar } from "./NavBar";
import { PostList } from "./PostList";
import { SignUpForm } from "./SignUpForm";
import { LoginForm } from "./LoginForm";

export default function App() {
  return (
    <div className="app">
      <NavBar />

      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  );
}
