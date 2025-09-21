// CommentBox.jsx
import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

export function CommentBox({ postId, user }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  // ✅ Fetch comments for this post
  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch(
        `http://localhost:5000/api/comments/post/${postId}`
      );
      const data = await res.json();
      setComments(data);
    };
    fetchComments();
  }, [postId]);

  // ✅ Submit a new comment
  const handleSubmit = async () => {
    if (!content.trim()) return;
    const newComment = {
      user_id: user.id,
      post_id: postId,
      content,
    };

    const res = await fetch("http://localhost:5000/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    });

    if (res.ok) {
      const saved = await res.json();
      setComments([saved, ...comments]);
      setContent("");
    }
  };

  return (
    <div style={{ marginTop: "15px" }}>
      <h4>💬 Comments</h4>

      {user && (
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <TextField
            fullWidth
            placeholder="Write a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Post
          </Button>
        </div>
      )}

      {/* List comments */}
      <List>
        {comments.map((c) => (
          <ListItem key={c.id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar src={c.user?.profilePicture} />
            </ListItemAvatar>
            <ListItemText
              primary={c.user?.name || "Anonymous"}
              secondary={c.content}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
