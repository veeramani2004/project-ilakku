import { useState, useEffect } from "react";
import { PostCard } from "./PostCard";
import { CreatePost } from "./CreatePost";
import { ProfileCard } from "./profile/ProfileCard";
import "./PostList.css";

export function PostList() {
  const [postlist, setPostlist] = useState([]);
  const [user, setUser] = useState(null);

  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  // ✅ Fetch posts
  async function getPosts() {
    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "GET",
      });
      if (!response.ok) throw new Error("Failed to fetch posts");

      const data = await response.json();
      setPostlist(data);
    } catch (err) {
      console.error("❌ Error fetching posts:", err);
    }
  }

  // ✅ Fetch user profile
  async function fetchUser() {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch user");

      const data = await res.json();
      setUser(data.user); // ✅ backend returns { user: {...} }
    } catch (err) {
      console.error("❌ Error fetching user:", err);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (username && token) fetchUser();
  }, [username, token]);

  // ✅ Handle delete
  const handleDelete = (id) => {
    setPostlist((prev) => prev.filter((p) => p.id !== id)); // removes from UI
    fetch(`http://127.0.0.1:5000/api/posts/${id}`, { method: "DELETE" });
  };

  // ✅ Handle edit
  const handleEdit = async (id, updatedPost) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost), // ✅ now has correct keys
      });

      if (!response.ok) throw new Error("Failed to update post");

      const savedPost = await response.json();
      setPostlist((prev) => prev.map((p) => (p.id === id ? savedPost : p)));
    } catch (err) {
      console.error("❌ Error editing post:", err);
    }

    console.log("📤 Sending update:", updatedPost);
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="post-list-main">
      {/* Left side profile */}
      <aside className="post-list-sidebar">
        <ProfileCard user={user} />
      </aside>

      {/* Right side posts */}
      <main className="post-list-content">
        <CreatePost
          user={user}
          onAddPost={(newPost) => setPostlist([newPost, ...postlist])}
        />

        {postlist.length > 0 ? (
          postlist.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <p>No posts yet...</p>
        )}
      </main>
    </div>
  );
}
