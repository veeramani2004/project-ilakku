import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Avatar,
  Box,
  Typography,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import AddIcon from "@mui/icons-material/Add";
import "./CreatePost.css";

export function CreatePost({ user, onAddPost }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const token = localStorage.getItem("token");

  const handleOpen = () => setOpen(true);

  const resetForm = () => {
    setText("");
    setImage("");
  };

  // Robust: clear form whenever dialog becomes closed (covers Cancel, backdrop click, Esc)
  useEffect(() => {
    if (!open) resetForm();
  }, [open]);

  const handleClose = () => {
    // close then reset (useEffect also covers this)
    setOpen(false);
    // optional immediate reset if you want
    // resetForm();
  };

  const handleSubmit = async () => {
    if (!text.trim() && !image.trim()) return;

    const payload = {
      user_id: user?.id,
      post_text: text,
      post_image: image || null,
    };

    try {
      const res = await fetch("http://127.0.0.1:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Failed to save post");
      }

      const savedPost = await res.json();
      if (onAddPost) onAddPost(savedPost);
      handleClose();
    } catch (err) {
      console.error("❌ Failed to save post:", err);
      // you can show UI error message here if you want
    }
  };

  // small helper to insert a sample image quickly
  const insertSampleImage = () =>
    setImage(
      "https://picsum.photos/800/450?random=" + Math.floor(Math.random() * 1000)
    );

  return (
    <>
      {/* placeholder card (click to open) */}
      <div
        className="create-post-card"
        onClick={handleOpen}
        role="button"
        tabIndex={0}
      >
        <Avatar
          src={user?.profilePicture || user?.profile_picture || ""}
          alt={user?.name || "User"}
          className="create-post-avatar"
        />
        <div className="create-post-placeholder">
          <Typography variant="body1" color="textSecondary">
            Share your thoughts
          </Typography>
        </div>
        <IconButton
          size="small"
          className="create-post-addicon"
          aria-label="create"
        >
          <AddIcon />
        </IconButton>
      </div>

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Create post</DialogTitle>

        <DialogContent dividers>
          <Box display="flex" gap={2} alignItems="flex-start" mb={1}>
            <Avatar
              src={user?.profilePicture || user?.profile_picture || ""}
              alt={user?.name || "User"}
            />
            <Box flex={1}>
              <TextField
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What's on your mind?"
                multiline
                minRows={3}
                fullWidth
                variant="outlined"
              />
              <TextField
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image URL (optional)"
                fullWidth
                margin="normal"
                variant="outlined"
              />
              {image && (
                <Box mt={1}>
                  <img
                    src={image}
                    alt="preview"
                    className="create-post-image-preview"
                  />
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <IconButton onClick={insertSampleImage} title="Insert sample image">
            <ImageIcon />
          </IconButton>

          <Box sx={{ flex: 1 }} />

          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={!text.trim() && !image.trim()}
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
