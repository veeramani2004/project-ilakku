import { useEffect, useState } from "react";
import { PostCard } from "./PostCard"; // ✅ reuse your PostCard
import { Typography } from "@mui/material";

export function SavedPosts() {
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    const fetchSavedPosts = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:5000/api/saved-posts/user/${userId}`
        );
        if (!res.ok) throw new Error("Failed to fetch saved posts");
        const data = await res.json();

        // Each saved item contains post_id → fetch actual post details if needed
        const posts = await Promise.all(
          data.map(async (s) => {
            const postRes = await fetch(
              `http://127.0.0.1:5000/api/posts/${s.post_id}`
            );
            return postRes.ok ? postRes.json() : null;
          })
        );

        setSavedPosts(data.map((s) => s.post).filter((p) => p !== null));
      } catch (err) {
        console.error("❌ Error loading saved posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedPosts();
  }, [userId]);

  if (loading) return <Typography>Loading saved posts...</Typography>;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Saved Posts
      </Typography>
      {savedPosts.length === 0 ? (
        <Typography>No saved posts yet.</Typography>
      ) : (
        savedPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onDelete={() => {}}
            onEdit={() => {}}
          />
        ))
      )}
    </div>
  );
}
