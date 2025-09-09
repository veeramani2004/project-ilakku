import { Route, Routes } from "react-router";
import "./App.css";
import { Home } from "./Home";
import { NavBar } from "./NavBar";
import { PostList } from "./PostList";

export default function App() {
  return (
    <div className="app">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/posts" element={<PostList />} />
      </Routes>
    </div>
  );
}
