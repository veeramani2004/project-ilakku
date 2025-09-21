import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export function CreateResource({ user, onAddResource }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState(""); // ✅ new state
  const [links, setLinks] = useState("");

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !content.trim()) return;

    const newRes = {
      user_id: user.id,
      title,
      description,
      content, // ✅ send to backend
      related_links: links ? links.split(",").map((l) => l.trim()) : [],
    };

    try {
      const res = await fetch("http://localhost:5000/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRes),
      });
      if (!res.ok) throw new Error("Failed to create resource");
      const saved = await res.json();
      onAddResource(saved);

      // Reset form
      setOpen(false);
      setTitle("");
      setDescription("");
      setContent("");
      setLinks("");
    } catch (err) {
      console.error("❌ Error creating resource:", err);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ textTransform: "uppercase", fontWeight: 600, px: 3, py: 1 }}
        onClick={() => setOpen(true)}
      >
        ➕ Share your thoughts
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Create Blog</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Short Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            minRows={3}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            minRows={6}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Related Links (comma separated)"
            value={links}
            onChange={(e) => setLinks(e.target.value)}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
