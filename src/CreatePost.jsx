// import { useState } from "react";

// export function CreatePost({ onAddPost }) {
//   const [postText, setPostText] = useState("");
//   const [postImage, setPostImage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!postText.trim()) return;

//     setLoading(true);

//     const newPost = {
//       userName: "Guest User",
//       userRole: "Community Member",
//       avatar: "https://via.placeholder.com/40",
//       postText,
//       postImage,
//       postTime: new Date().toISOString(),
//       commentSectionName: "Voices",
//     };

//     try {
//       const response = await fetch(
//         "https://68959016039a1a2b288f7c62.mockapi.io/ilakku",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(newPost),
//         }
//       );

//       const savedPost = await response.json();
//       onAddPost(savedPost);
//     } catch (err) {
//       console.error("Failed to save post:", err);
//     } finally {
//       setLoading(false);
//       setPostText("");
//       setPostImage("");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="create-post border rounded-xl p-4 mb-4 bg-white shadow-md"
//     >
//       <textarea
//         value={postText}
//         onChange={(e) => setPostText(e.target.value)}
//         placeholder="What's on your mind?"
//         className="w-full p-2 border rounded-lg mb-2"
//       />

//       <input
//         type="text"
//         value={postImage}
//         onChange={(e) => setPostImage(e.target.value)}
//         placeholder="Optional: Image URL"
//         className="w-full p-2 border rounded-lg mb-2"
//       />

//       <button
//         type="submit"
//         disabled={loading}
//         className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
//       >
//         {loading ? "Posting..." : "Post"}
//       </button>
//     </form>
//   );
// }

import { useState } from "react";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import ImageIcon from "@mui/icons-material/Image";
import ArticleIcon from "@mui/icons-material/Article";

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
          <VideoCallIcon style={{ color: "green" }} /> Video
        </button>
        <button onClick={() => setImage("https://via.placeholder.com/350x200")}>
          <ImageIcon style={{ color: "blue" }} /> Photo
        </button>
        <button>
          <ArticleIcon style={{ color: "orange" }} /> Write article
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
