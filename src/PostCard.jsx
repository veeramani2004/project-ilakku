import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./PostCard.css";
const ITEM_HEIGHT = 48;

export function PostCard({ post, onDelete, onEdit }) {
  const [relativeTime, setRelativeTime] = useState(
    formatDistanceToNow(new Date(post.postTime), { addSuffix: true })
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(post.postText);
  const [editImage, setEditImage] = useState(post.postImage || "");

  useEffect(() => {
    if (isEditing) {
      setEditText(post.postText);
      setEditImage(post.postImage || "");
    }
  }, [isEditing, post]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRelativeTime(
        formatDistanceToNow(new Date(post.postTime), { addSuffix: true })
      );
    }, 60000);
    return () => clearInterval(timer);
  }, [post.postTime]);

  const handleEditSave = () => {
    if (!editText.trim() && !editImage.trim()) return;
    onEdit(post.id, { ...post, postText: editText, postImage: editImage });
    setIsEditing(false);
  };

  return (
    <div className="post-card">
      {/* Header */}
      <div className="post-header">
        <img src={post.avatar} alt="avatar" className="avatar" />
        <div className="user-info">
          <h3 className="user-name">{post.userName}</h3>
          <p className="user-role">{post.userRole}</p>
          <p className="post-time">{relativeTime}</p>
        </div>
        <LongMenu
          postId={post.id}
          onDelete={onDelete}
          onEdit={() => setIsEditing(true)} // 🔥 Open popup
        />
      </div>

      {/* Body */}
      <div className="post-body">
        <p className="post-text">{post.postText}</p>
        {post.postImage && (
          <img src={post.postImage} alt="post" className="post-image" />
        )}
      </div>

      {/* Footer */}
      <div className="post-footer">
        <button className="footer-btn">👍 Like</button>
        <button className="footer-btn">💬 {post.commentSectionName}</button>
      </div>

      {/* 🔥 Edit Popup */}
      <Dialog open={isEditing} onClose={() => setIsEditing(false)} fullWidth>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            fullWidth
            minRows={3}
            label="Edit Text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Image URL"
            value={editImage}
            onChange={(e) => setEditImage(e.target.value)}
            margin="dense"
          />
          {editImage && (
            <img
              src={editImage}
              alt="preview"
              style={{ width: "100%", marginTop: "10px", borderRadius: "8px" }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function LongMenu({ postId, onDelete, onEdit }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      await fetch(
        `https://68959016039a1a2b288f7c62.mockapi.io/ilakku/${postId}`,
        { method: "DELETE" }
      );
      onDelete(postId);
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      handleClose();
    }
  };
  const handleEdit = () => {
    handleClose();
    onEdit();
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: { style: { maxHeight: ITEM_HEIGHT * 4.5, width: "20ch" } },
        }}
      >
        <MenuItem onClick={handleDelete}>🗑️ Delete</MenuItem>
        <MenuItem onClick={handleEdit}>✏️ Edit</MenuItem>
      </Menu>
    </>
  );
}
