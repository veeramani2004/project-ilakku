import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

export function PostCard({ post }) {
  const [relativeTime, setRelativeTime] = useState(
    formatDistanceToNow(new Date(post.postTime), { addSuffix: true })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setRelativeTime(
        formatDistanceToNow(new Date(post.postTime), { addSuffix: true })
      );
    }, 60000);
    return () => clearInterval(timer);
  }, [post.postTime]);

  return (
    <div className="post-card">
      <div className="post-header">
        <img src={post.avatar} alt="avatar" className="avatar" />
        <div className="user-info">
          <h3 className="user-name">{post.userName}</h3>
          <p className="user-role">{post.userRole}</p>
          <p className="post-time">{relativeTime}</p>
        </div>
        <LongMenu />
      </div>

      <div className="post-body">
        <p className="post-text">{post.postText}</p>
        <img src={post.postImage} alt="post visual" className="post-image" />
      </div>

      <div className="post-footer">
        <button className="footer-btn">👍 Like</button>
        <button className="footer-btn">💬 {post.commentSectionName}</button>
      </div>
    </div>
  );
}

import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const options = ["Delete", "Edite"];

const ITEM_HEIGHT = 48;

function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={handleClose}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
