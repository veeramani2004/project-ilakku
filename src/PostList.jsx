import { PostCard } from "./PostCard";
import { useState, useEffect } from "react";
import { CreatePost } from "./CreatePost";
import { ProfileCard } from "./ProfileCard";
import "./PostList.css";

export function PostList() {
  const [postlist, setPostlist] = useState([]);
  async function getPosts() {
    const url = new URL("https://68959016039a1a2b288f7c62.mockapi.io/ilakku");
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    setPostlist(data);
    console.log(data);
  }
  useEffect(() => {
    getPosts();
  }, []);

  const handleDelete = (id) => {
    setPostlist((prev) => prev.filter((post) => post.id !== id));
  };
  const handleEdit = async (id, updatedPost) => {
    try {
      const response = await fetch(
        `https://68959016039a1a2b288f7c62.mockapi.io/ilakku/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedPost),
        }
      );

      if (!response.ok) throw new Error("Failed to update post");

      const savedPost = await response.json();

      // Update local state instantly
      setPostlist((prev) => prev.map((p) => (p.id === id ? savedPost : p)));
    } catch (err) {
      console.error("Error editing post:", err);
    }
  };
  const [user, setUser] = useState(null);
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/users/user/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    }
    if (username) fetchUser();
  }, [username]);

  if (!user) return <p>Loading...</p>;
  return (
    <div className="post-list-main-container">
      <ProfileCard user={user} />

      <div className="post-list-container">
        <CreatePost
          user={user}
          onAddPost={(newPost) => setPostlist([newPost, ...postlist])}
        />
        {postlist.length > 0 ? (
          postlist.map((post) => (
            <PostCard post={post} onDelete={handleDelete} onEdit={handleEdit} />
          ))
        ) : (
          <p>Loading posts...</p>
        )}
      </div>
    </div>
  );
}
