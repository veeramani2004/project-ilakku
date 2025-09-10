import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./PostCard.css";

const ITEM_HEIGHT = 48;

export function PostCard({ post, onDelete, onEdit }) {
  const [relativeTime, setRelativeTime] = useState(
    formatDistanceToNow(new Date(post.postTime), { addSuffix: true })
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(post.postText);

  useEffect(() => {
    const timer = setInterval(() => {
      setRelativeTime(
        formatDistanceToNow(new Date(post.postTime), { addSuffix: true })
      );
    }, 60000);
    return () => clearInterval(timer);
  }, [post.postTime]);

  const handleEditSave = () => {
    if (!editText.trim()) return;
    onEdit(post.id, { ...post, postText: editText });
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
          onEdit={() => setIsEditing(true)}
        />
      </div>

      {/* Body */}
      <div className="post-body">
        {isEditing ? (
          <div className="edit-box">
            <textarea
              className="edit-textarea"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <div className="edit-actions">
              <button className="save-btn" onClick={handleEditSave}>
                Save
              </button>
              <button
                className="cancel-btn"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="post-text">{post.postText}</p>
            {post.postImage && (
              <img src={post.postImage} alt="post" className="post-image" />
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="post-footer">
        <button className="footer-btn">👍 Like</button>
        <button className="footer-btn">💬 {post.commentSectionName}</button>
      </div>
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
    onEdit(); // ✅ Call parent onEdit
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          },
          list: {
            "aria-labelledby": "long-button",
          },
        }}
      >
        <MenuItem onClick={handleDelete}>🗑️ Delete</MenuItem>
        <MenuItem onClick={handleEdit}>✏️ Edit</MenuItem>
      </Menu>
    </div>
  );
}
