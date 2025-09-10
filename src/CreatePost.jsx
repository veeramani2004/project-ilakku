import { useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import "./CreatePost.css";

export function CreatePost({ onAddPost }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async () => {
    if (!text.trim() && !image.trim()) return;

    const newPost = {
      userName: "Guest User",
      userRole: "Community Member",
      avatar: "https://pbs.twimg.com/media/Eklq-xfVgAA3ql8.jpg",
      postText: text,
      postImage: image,
      postTime: new Date().toISOString(),
      commentSectionName: "Voices",
    };

    try {
      const response = await fetch(
        "https://68959016039a1a2b288f7c62.mockapi.io/ilakku/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPost),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save post");
      }

      const savedPost = await response.json();

      onAddPost(savedPost);
    } catch (err) {
      console.error("Failed to save post:", err);
    } finally {
      setText("");
      setImage("");
    }
  };

  return (
    <div className="create-post">
      {/* Input Row */}
      <div className="create-post-header">
        <img
          src="https://pbs.twimg.com/media/Eklq-xfVgAA3ql8.jpg"
          alt="avatar"
          className="avatar"
        />
        <input
          type="text"
          placeholder="Start a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      {/* Action Buttons */}
      <div className="create-post-actions">
        <button onClick={() => setImage("https://via.placeholder.com/350x200")}>
          <ImageIcon style={{ color: "blue" }} /> Photo
        </button>
      </div>

      {/* Post Button */}
      <div className="create-post-footer">
        <button onClick={handleSubmit} className="post-btn">
          Post
        </button>
      </div>
    </div>
  );
}
