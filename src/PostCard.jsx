// import { useEffect, useState } from "react";
// import {
//   Avatar,
//   Card,
//   CardContent,
//   CardMedia,
//   CardActions,
//   Typography,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   IconButton,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
// import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
// import BookmarkIcon from "@mui/icons-material/Bookmark";
// import { formatDistanceToNow, parseISO } from "date-fns";
// import "./PostCard.css";

// // ✅ Convert UTC -> IST (+05:30)
// const toIST = (dateString) => {
//   const utcDate = parseISO(dateString);
//   return new Date(utcDate.getTime() + 5.5 * 60 * 60 * 1000);
// };

// export function PostCard({ post, onDelete, onEdit }) {
//   const createdDate = post?.createdAt ? toIST(post.createdAt) : new Date();

//   // ✅ Relative time
//   const getRelativeTime = (date) => {
//     let time = formatDistanceToNow(date, { addSuffix: true });
//     if (time.includes("less than a minute")) return "Just now";
//     return time;
//   };

//   const [relativeTime, setRelativeTime] = useState(
//     getRelativeTime(createdDate)
//   );
//   const [expanded, setExpanded] = useState(false);

//   // Dropdown menu state (for post)
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   // Edit state (post)
//   const [isEditing, setIsEditing] = useState(false);
//   const [editText, setEditText] = useState(post?.postText || "");
//   const [editImage, setEditImage] = useState(post?.postImage || "");

//   // ✅ Comments state
//   const [comments, setComments] = useState(post.comments || []);
//   const [newComment, setNewComment] = useState("");
//   const [showComments, setShowComments] = useState(false);

//   // ✅ Comment edit state
//   const [editingCommentId, setEditingCommentId] = useState(null);
//   const [editCommentText, setEditCommentText] = useState("");
//   const [commentMenuAnchor, setCommentMenuAnchor] = useState(null);

//   // ✅ Saved posts state
//   const [isSaved, setIsSaved] = useState(false);

//   const handleMenuClick = (e) => setAnchorEl(e.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);

//   const handleDeleteClick = () => {
//     onDelete(post.id);
//     handleMenuClose();
//   };

//   const handleEditOpen = () => {
//     setIsEditing(true);
//     handleMenuClose();
//   };

//   const handleEditSave = () => {
//     if (!editText.trim() && !editImage.trim()) return;
//     onEdit(post.id, {
//       post_text: editText,
//       post_image: editImage,
//     });
//     setIsEditing(false);
//   };

//   // ✅ Fetch comments when opening comment section
//   useEffect(() => {
//     if (showComments) {
//       fetch(`http://localhost:5000/api/comments/post/${post.id}`)
//         .then((res) => res.json())
//         .then((data) => setComments(data))
//         .catch((err) => console.error("❌ Error loading comments:", err));
//     }
//   }, [showComments, post.id]);

//   // ✅ Check if post is saved on mount
//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     if (!userId) return;

//     fetch(`http://localhost:5000/api/saved-posts/user/${userId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         const saved = data.some((s) => s.post_id === post.id);
//         setIsSaved(saved);
//       })
//       .catch((err) => console.error("❌ Error checking saved posts:", err));
//   }, [post.id]);

//   // ✅ Save / Unsave Post
//   const toggleSavePost = async () => {
//     const userId = localStorage.getItem("userId");
//     if (!userId) return;

//     try {
//       if (isSaved) {
//         // Unsave
//         const res = await fetch(
//           `http://localhost:5000/api/saved-posts/${post.id}/${userId}`,
//           { method: "DELETE" }
//         );
//         if (!res.ok) throw new Error("Failed to unsave post");
//         setIsSaved(false);
//       } else {
//         // Save
//         const res = await fetch("http://localhost:5000/api/saved-posts/", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ user_id: userId, post_id: post.id }),
//         });
//         if (!res.ok) throw new Error("Failed to save post");
//         setIsSaved(true);
//       }
//     } catch (err) {
//       console.error("❌ Error toggling saved post:", err);
//     }
//   };

//   // ✅ Add new comment
//   const handleAddComment = async () => {
//     if (!newComment.trim()) return;

//     const userId = localStorage.getItem("userId");

//     try {
//       const res = await fetch("http://localhost:5000/api/comments", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           user_id: userId,
//           post_id: post.id,
//           content: newComment,
//         }),
//       });

//       if (!res.ok) throw new Error("Failed to add comment");
//       const saved = await res.json();

//       setComments([saved, ...comments]);
//       setNewComment("");
//     } catch (err) {
//       console.error("❌ Error adding comment:", err);
//     }
//   };

//   // ✅ Edit existing comment
//   const handleEditComment = async (id) => {
//     if (!editCommentText.trim()) return;

//     try {
//       const res = await fetch(`http://localhost:5000/api/comments/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ content: editCommentText }),
//       });

//       if (!res.ok) throw new Error("Failed to update comment");
//       const updated = await res.json();

//       setComments(comments.map((c) => (c.id === id ? updated : c)));
//       setEditingCommentId(null);
//       setEditCommentText("");
//     } catch (err) {
//       console.error("❌ Error editing comment:", err);
//     }
//   };

//   // ✅ Delete comment
//   const handleDeleteComment = async (id) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/comments/${id}`, {
//         method: "DELETE",
//       });

//       if (!res.ok) throw new Error("Failed to delete comment");
//       setComments(comments.filter((c) => c.id !== id));
//     } catch (err) {
//       console.error("❌ Error deleting comment:", err);
//     }
//   };

//   // ✅ auto-update time
//   useEffect(() => {
//     const timer = setInterval(() => {
//       const updatedDate = post?.createdAt ? toIST(post.createdAt) : new Date();
//       setRelativeTime(getRelativeTime(updatedDate));
//     }, 60000);
//     return () => clearInterval(timer);
//   }, [post?.createdAt]);

//   return (
//     <Card className="post-card">
//       <div className="post-header">
//         {/* Avatar */}
//         <div className="header-avatar">
//           <img
//             src={
//               post?.author?.profilePicture ||
//               "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
//             }
//             alt="avatar"
//           />
//         </div>

//         {/* User info */}
//         <div className="header-info">
//           <h4 className="user-name">{post?.author?.name || "Unknown"}</h4>
//           <p className="user-bio">{post?.author?.bio || "bio not added"}</p>
//           <p className="post-time">{relativeTime}</p>
//         </div>

//         {/* Actions with dropdown */}
//         <div className="header-actions">
//           <button className="follow-btn">+ Follow</button>
//           <IconButton onClick={handleMenuClick}>
//             <MoreVertIcon />
//           </IconButton>
//           <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
//             <MenuItem onClick={handleEditOpen}>✏️ Edit</MenuItem>
//             <MenuItem onClick={handleDeleteClick}>🗑 Delete</MenuItem>
//           </Menu>
//         </div>
//       </div>

//       {/* Body */}
//       <CardContent>
//         <div className={`post-text ${expanded ? "expanded" : ""}`}>
//           {expanded ? (
//             <Typography variant="body1">{post?.postText || ""}</Typography>
//           ) : (
//             <>
//               <Typography variant="body1" component="span">
//                 {post?.postText?.slice(0, 150) || ""}
//               </Typography>
//               {post?.postText?.length > 150 && (
//                 <button
//                   className="read-more-btn"
//                   onClick={() => setExpanded(true)}
//                 >
//                   ...more
//                 </button>
//               )}
//             </>
//           )}
//         </div>
//       </CardContent>

//       {post?.postImage && (
//         <CardMedia
//           component="img"
//           height="400"
//           image={post.postImage}
//           alt="post"
//           className="post-image"
//         />
//       )}

//       {/* Footer */}
//       <CardActions disableSpacing className="post-footer">
//         <Button startIcon={<ThumbUpAltOutlinedIcon />}>Like</Button>
//         <Button
//           startIcon={<ChatBubbleOutlineOutlinedIcon />}
//           onClick={() => setShowComments(!showComments)}
//         >
//           Comment
//         </Button>
//         <IconButton onClick={toggleSavePost}>
//           {isSaved ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
//         </IconButton>
//       </CardActions>

//       {/* ✅ Comments Section */}
//       {showComments && (
//         <div className="comments-section" style={{ padding: "0 16px 16px" }}>
//           {/* Add Comment */}
//           <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
//             <TextField
//               fullWidth
//               size="small"
//               placeholder="Write a comment..."
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//             />
//             <Button onClick={handleAddComment} variant="contained">
//               Post
//             </Button>
//           </div>

//           {/* Comment List */}
//           {comments.map((c) => {
//             const isEditingThis = editingCommentId === c.id;
//             const isMenuOpen =
//               commentMenuAnchor && commentMenuAnchor.commentId === c.id;

//             return (
//               <div
//                 key={c.id}
//                 style={{
//                   display: "flex",
//                   alignItems: "flex-start",
//                   marginBottom: "12px",
//                 }}
//               >
//                 <Avatar
//                   src={
//                     c.author?.profilePicture ||
//                     "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//                   }
//                   sx={{ width: 32, height: 32, mr: 1 }}
//                 />
//                 <div style={{ flex: 1 }}>
//                   <Typography variant="subtitle2">
//                     {c.author?.name || "Anonymous"}
//                   </Typography>

//                   {/* ✅ Edit Mode */}
//                   {isEditingThis ? (
//                     <>
//                       <TextField
//                         fullWidth
//                         size="small"
//                         value={editCommentText}
//                         onChange={(e) => setEditCommentText(e.target.value)}
//                         autoFocus
//                       />
//                       <div style={{ marginTop: "6px" }}>
//                         <Button
//                           size="small"
//                           variant="contained"
//                           onClick={() => handleEditComment(c.id)}
//                           sx={{ mr: 1 }}
//                         >
//                           Save
//                         </Button>
//                         <Button
//                           size="small"
//                           onClick={() => {
//                             setEditingCommentId(null);
//                             setEditCommentText("");
//                           }}
//                         >
//                           Cancel
//                         </Button>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <Typography variant="body2" color="text.secondary">
//                         {c.content}
//                       </Typography>
//                       <Typography variant="caption" color="text.disabled">
//                         {c.createdAt
//                           ? formatDistanceToNow(parseISO(c.createdAt), {
//                               addSuffix: true,
//                             })
//                           : ""}
//                       </Typography>
//                     </>
//                   )}
//                 </div>

//                 {/* ✅ Comment dropdown */}
//                 {!isEditingThis && (
//                   <>
//                     <IconButton
//                       size="small"
//                       onClick={(e) => {
//                         setCommentMenuAnchor({
//                           element: e.currentTarget,
//                           commentId: c.id,
//                         });
//                       }}
//                     >
//                       <MoreVertIcon fontSize="small" />
//                     </IconButton>
//                     <Menu
//                       anchorEl={commentMenuAnchor?.element || null}
//                       open={isMenuOpen}
//                       onClose={() => setCommentMenuAnchor(null)}
//                     >
//                       <MenuItem
//                         onClick={() => {
//                           setEditingCommentId(c.id);
//                           setEditCommentText(c.content);
//                           setCommentMenuAnchor(null);
//                         }}
//                       >
//                         ✏️ Edit
//                       </MenuItem>
//                       <MenuItem
//                         onClick={() => {
//                           handleDeleteComment(c.id);
//                           setCommentMenuAnchor(null);
//                         }}
//                       >
//                         🗑 Delete
//                       </MenuItem>
//                     </Menu>
//                   </>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Edit Dialog (Post) */}
//       <Dialog open={isEditing} onClose={() => setIsEditing(false)} fullWidth>
//         <DialogTitle>Edit Post</DialogTitle>
//         <DialogContent>
//           <TextField
//             multiline
//             fullWidth
//             minRows={3}
//             label="Edit Text"
//             value={editText}
//             onChange={(e) => setEditText(e.target.value)}
//             margin="dense"
//           />
//           <TextField
//             fullWidth
//             label="Image URL"
//             value={editImage}
//             onChange={(e) => setEditImage(e.target.value)}
//             margin="dense"
//           />
//           {editImage && (
//             <img
//               src={editImage}
//               alt="preview"
//               style={{ width: "100%", marginTop: 10, borderRadius: 8 }}
//             />
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setIsEditing(false)}>Cancel</Button>
//           <Button onClick={handleEditSave} variant="contained" color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Card>
//   );
// }

// import { useEffect, useState } from "react";
// import {
//   Avatar,
//   Card,
//   CardContent,
//   CardMedia,
//   CardActions,
//   Typography,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   IconButton,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
// import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
// import BookmarkIcon from "@mui/icons-material/Bookmark";
// import { formatDistanceToNow, parseISO } from "date-fns";
// import "./PostCard.css";

// // ✅ Convert UTC -> IST (+05:30)
// const toIST = (dateString) => {
//   const utcDate = parseISO(dateString);
//   return new Date(utcDate.getTime() + 5.5 * 60 * 60 * 1000);
// };

// export function PostCard({ post, onDelete, onEdit }) {
//   const createdDate = post?.createdAt ? toIST(post.createdAt) : new Date();

//   // ✅ Relative time
//   const getRelativeTime = (date) => {
//     let time = formatDistanceToNow(date, { addSuffix: true });
//     if (time.includes("less than a minute")) return "Just now";
//     return time;
//   };

//   const [relativeTime, setRelativeTime] = useState(
//     getRelativeTime(createdDate)
//   );
//   const [expanded, setExpanded] = useState(false);

//   // Dropdown menu state (for post)
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   // Edit state (post)
//   const [isEditing, setIsEditing] = useState(false);
//   const [editText, setEditText] = useState(post?.postText || "");
//   const [editImage, setEditImage] = useState(post?.postImage || "");

//   // ✅ Comments state
//   const [comments, setComments] = useState(post.comments || []);
//   const [newComment, setNewComment] = useState("");
//   const [showComments, setShowComments] = useState(false);

//   // ✅ Comment edit state
//   const [editingCommentId, setEditingCommentId] = useState(null);
//   const [editCommentText, setEditCommentText] = useState("");
//   const [commentMenuAnchor, setCommentMenuAnchor] = useState(null);

//   // ✅ Saved posts state
//   const [isSaved, setIsSaved] = useState(false);

//   // ✅ Follow state
//   const [isFollowing, setIsFollowing] = useState(false);

//   const handleMenuClick = (e) => setAnchorEl(e.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);

//   const handleDeleteClick = () => {
//     onDelete(post.id);
//     handleMenuClose();
//   };

//   const handleEditOpen = () => {
//     setIsEditing(true);
//     handleMenuClose();
//   };

//   const handleEditSave = () => {
//     if (!editText.trim() && !editImage.trim()) return;
//     onEdit(post.id, {
//       post_text: editText,
//       post_image: editImage,
//     });
//     setIsEditing(false);
//   };

//   // ✅ Fetch comments when opening comment section
//   useEffect(() => {
//     if (showComments) {
//       fetch(`http://localhost:5000/api/comments/post/${post.id}`)
//         .then((res) => res.json())
//         .then((data) => setComments(data))
//         .catch((err) => console.error("❌ Error loading comments:", err));
//     }
//   }, [showComments, post.id]);

//   // ✅ Check if post is saved on mount
//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     if (!userId) return;

//     fetch(`http://localhost:5000/api/saved-posts/user/${userId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         const saved = data.some((s) => s.post_id === post.id);
//         setIsSaved(saved);
//       })
//       .catch((err) => console.error("❌ Error checking saved posts:", err));
//   }, [post.id]);

//   // ✅ Save / Unsave Post
//   const toggleSavePost = async () => {
//     const userId = localStorage.getItem("userId");
//     if (!userId) return;

//     try {
//       if (isSaved) {
//         // Unsave
//         const res = await fetch(
//           `http://localhost:5000/api/saved-posts/${post.id}/${userId}`,
//           { method: "DELETE" }
//         );
//         if (!res.ok) throw new Error("Failed to unsave post");
//         setIsSaved(false);
//       } else {
//         // Save
//         const res = await fetch("http://localhost:5000/api/saved-posts/", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ user_id: userId, post_id: post.id }),
//         });
//         if (!res.ok) throw new Error("Failed to save post");
//         setIsSaved(true);
//       }
//     } catch (err) {
//       console.error("❌ Error toggling saved post:", err);
//     }
//   };

//   // ✅ Follow / Unfollow
//   const toggleFollow = async () => {
//     const userId = localStorage.getItem("userId"); // current logged-in user
//     const authorId = post?.author?.id;
//     if (!userId || !authorId) return;

//     try {
//       if (isFollowing) {
//         // Unfollow
//         const res = await fetch(
//           `http://localhost:5000/api/follows/${userId}/${authorId}`,
//           { method: "DELETE" }
//         );
//         if (!res.ok) throw new Error("Failed to unfollow");
//         setIsFollowing(false);
//       } else {
//         // Follow
//         const res = await fetch("http://localhost:5000/api/follows/", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ follower_id: userId, following_id: authorId }),
//         });
//         if (!res.ok) throw new Error("Failed to follow");
//         setIsFollowing(true);
//       }
//     } catch (err) {
//       console.error("❌ Error toggling follow:", err);
//     }
//   };

//   // ✅ Check follow status when post loads
//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     const authorId = post?.author?.id;
//     if (!userId || !authorId) return;

//     fetch(`http://localhost:5000/api/follows/status/${userId}/${authorId}`)
//       .then((res) => res.json())
//       .then((data) => setIsFollowing(data.is_following))
//       .catch((err) => console.error("❌ Error checking follow:", err));
//   }, [post?.author?.id]);

//   // ✅ Add new comment
//   const handleAddComment = async () => {
//     if (!newComment.trim()) return;

//     const userId = localStorage.getItem("userId");

//     try {
//       const res = await fetch("http://localhost:5000/api/comments", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           user_id: userId,
//           post_id: post.id,
//           content: newComment,
//         }),
//       });

//       if (!res.ok) throw new Error("Failed to add comment");
//       const saved = await res.json();

//       setComments([saved, ...comments]);
//       setNewComment("");
//     } catch (err) {
//       console.error("❌ Error adding comment:", err);
//     }
//   };

//   // ✅ Edit existing comment
//   const handleEditComment = async (id) => {
//     if (!editCommentText.trim()) return;

//     try {
//       const res = await fetch(`http://localhost:5000/api/comments/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ content: editCommentText }),
//       });

//       if (!res.ok) throw new Error("Failed to update comment");
//       const updated = await res.json();

//       setComments(comments.map((c) => (c.id === id ? updated : c)));
//       setEditingCommentId(null);
//       setEditCommentText("");
//     } catch (err) {
//       console.error("❌ Error editing comment:", err);
//     }
//   };

//   // ✅ Delete comment
//   const handleDeleteComment = async (id) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/comments/${id}`, {
//         method: "DELETE",
//       });

//       if (!res.ok) throw new Error("Failed to delete comment");
//       setComments(comments.filter((c) => c.id !== id));
//     } catch (err) {
//       console.error("❌ Error deleting comment:", err);
//     }
//   };

//   // ✅ auto-update time
//   useEffect(() => {
//     const timer = setInterval(() => {
//       const updatedDate = post?.createdAt ? toIST(post.createdAt) : new Date();
//       setRelativeTime(getRelativeTime(updatedDate));
//     }, 60000);
//     return () => clearInterval(timer);
//   }, [post?.createdAt]);

//   return (
//     <Card className="post-card">
//       <div className="post-header">
//         {/* Avatar */}
//         <div className="header-avatar">
//           <img
//             src={
//               post?.author?.profilePicture ||
//               "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
//             }
//             alt="avatar"
//           />
//         </div>

//         {/* User info */}
//         <div className="header-info">
//           <h4 className="user-name">{post?.author?.name || "Unknown"}</h4>
//           <p className="user-bio">{post?.author?.bio || "bio not added"}</p>
//           <p className="post-time">{relativeTime}</p>
//         </div>

//         {/* Actions with dropdown */}
//         <div className="header-actions">
//           <button className="follow-btn" onClick={toggleFollow}>
//             {isFollowing ? "✔ Following" : "+ Follow"}
//           </button>
//           <IconButton onClick={handleMenuClick}>
//             <MoreVertIcon />
//           </IconButton>
//           <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
//             <MenuItem onClick={handleEditOpen}>✏️ Edit</MenuItem>
//             <MenuItem onClick={handleDeleteClick}>🗑 Delete</MenuItem>
//           </Menu>
//         </div>
//       </div>

//       {/* Body */}
//       <CardContent>
//         <div className={`post-text ${expanded ? "expanded" : ""}`}>
//           {expanded ? (
//             <Typography variant="body1">{post?.postText || ""}</Typography>
//           ) : (
//             <>
//               <Typography variant="body1" component="span">
//                 {post?.postText?.slice(0, 150) || ""}
//               </Typography>
//               {post?.postText?.length > 150 && (
//                 <button
//                   className="read-more-btn"
//                   onClick={() => setExpanded(true)}
//                 >
//                   ...more
//                 </button>
//               )}
//             </>
//           )}
//         </div>
//       </CardContent>

//       {post?.postImage && (
//         <CardMedia
//           component="img"
//           height="400"
//           image={post.postImage}
//           alt="post"
//           className="post-image"
//         />
//       )}

//       {/* Footer */}
//       <CardActions disableSpacing className="post-footer">
//         <Button startIcon={<ThumbUpAltOutlinedIcon />}>Like</Button>
//         <Button
//           startIcon={<ChatBubbleOutlineOutlinedIcon />}
//           onClick={() => setShowComments(!showComments)}
//         >
//           Comment
//         </Button>
//         <IconButton onClick={toggleSavePost}>
//           {isSaved ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
//         </IconButton>
//       </CardActions>

//       {/* ✅ Comments Section */}
//       {showComments && (
//         <div className="comments-section" style={{ padding: "0 16px 16px" }}>
//           {/* Add Comment */}
//           <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
//             <TextField
//               fullWidth
//               size="small"
//               placeholder="Write a comment..."
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//             />
//             <Button onClick={handleAddComment} variant="contained">
//               Post
//             </Button>
//           </div>

//           {/* Comment List */}
//           {comments.map((c) => {
//             const isEditingThis = editingCommentId === c.id;
//             const isMenuOpen =
//               commentMenuAnchor && commentMenuAnchor.commentId === c.id;

//             return (
//               <div
//                 key={c.id}
//                 style={{
//                   display: "flex",
//                   alignItems: "flex-start",
//                   marginBottom: "12px",
//                 }}
//               >
//                 <Avatar
//                   src={
//                     c.author?.profilePicture ||
//                     "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//                   }
//                   sx={{ width: 32, height: 32, mr: 1 }}
//                 />
//                 <div style={{ flex: 1 }}>
//                   <Typography variant="subtitle2">
//                     {c.author?.name || "Anonymous"}
//                   </Typography>

//                   {/* ✅ Edit Mode */}
//                   {isEditingThis ? (
//                     <>
//                       <TextField
//                         fullWidth
//                         size="small"
//                         value={editCommentText}
//                         onChange={(e) => setEditCommentText(e.target.value)}
//                         autoFocus
//                       />
//                       <div style={{ marginTop: "6px" }}>
//                         <Button
//                           size="small"
//                           variant="contained"
//                           onClick={() => handleEditComment(c.id)}
//                           sx={{ mr: 1 }}
//                         >
//                           Save
//                         </Button>
//                         <Button
//                           size="small"
//                           onClick={() => {
//                             setEditingCommentId(null);
//                             setEditCommentText("");
//                           }}
//                         >
//                           Cancel
//                         </Button>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <Typography variant="body2" color="text.secondary">
//                         {c.content}
//                       </Typography>
//                       <Typography variant="caption" color="text.disabled">
//                         {c.createdAt
//                           ? formatDistanceToNow(parseISO(c.createdAt), {
//                               addSuffix: true,
//                             })
//                           : ""}
//                       </Typography>
//                     </>
//                   )}
//                 </div>

//                 {/* ✅ Comment dropdown */}
//                 {!isEditingThis && (
//                   <>
//                     <IconButton
//                       size="small"
//                       onClick={(e) => {
//                         setCommentMenuAnchor({
//                           element: e.currentTarget,
//                           commentId: c.id,
//                         });
//                       }}
//                     >
//                       <MoreVertIcon fontSize="small" />
//                     </IconButton>
//                     <Menu
//                       anchorEl={commentMenuAnchor?.element || null}
//                       open={isMenuOpen}
//                       onClose={() => setCommentMenuAnchor(null)}
//                     >
//                       <MenuItem
//                         onClick={() => {
//                           setEditingCommentId(c.id);
//                           setEditCommentText(c.content);
//                           setCommentMenuAnchor(null);
//                         }}
//                       >
//                         ✏️ Edit
//                       </MenuItem>
//                       <MenuItem
//                         onClick={() => {
//                           handleDeleteComment(c.id);
//                           setCommentMenuAnchor(null);
//                         }}
//                       >
//                         🗑 Delete
//                       </MenuItem>
//                     </Menu>
//                   </>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Edit Dialog (Post) */}
//       <Dialog open={isEditing} onClose={() => setIsEditing(false)} fullWidth>
//         <DialogTitle>Edit Post</DialogTitle>
//         <DialogContent>
//           <TextField
//             multiline
//             fullWidth
//             minRows={3}
//             label="Edit Text"
//             value={editText}
//             onChange={(e) => setEditText(e.target.value)}
//             margin="dense"
//           />
//           <TextField
//             fullWidth
//             label="Image URL"
//             value={editImage}
//             onChange={(e) => setEditImage(e.target.value)}
//             margin="dense"
//           />
//           {editImage && (
//             <img
//               src={editImage}
//               alt="preview"
//               style={{ width: "100%", marginTop: 10, borderRadius: 8 }}
//             />
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setIsEditing(false)}>Cancel</Button>
//           <Button onClick={handleEditSave} variant="contained" color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Card>
//   );
// }

// import { useEffect, useState } from "react";
// import {
//   Avatar,
//   Card,
//   CardContent,
//   CardMedia,
//   CardActions,
//   Typography,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   IconButton,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
// import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
// import BookmarkIcon from "@mui/icons-material/Bookmark";
// import { formatDistanceToNow, parseISO } from "date-fns";
// import "./PostCard.css";

// // ✅ Convert UTC -> IST (+05:30)
// const toIST = (dateString) => {
//   const utcDate = parseISO(dateString);
//   return new Date(utcDate.getTime() + 5.5 * 60 * 60 * 1000);
// };

// export function PostCard({ post, onDelete, onEdit }) {
//   const createdDate = post?.createdAt ? toIST(post.createdAt) : new Date();

//   // ✅ Relative time
//   const getRelativeTime = (date) => {
//     let time = formatDistanceToNow(date, { addSuffix: true });
//     if (time.includes("less than a minute")) return "Just now";
//     return time;
//   };

//   const [relativeTime, setRelativeTime] = useState(
//     getRelativeTime(createdDate)
//   );
//   const [expanded, setExpanded] = useState(false);

//   // Dropdown menu state (for post)
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   // Edit state (post)
//   const [isEditing, setIsEditing] = useState(false);
//   const [editText, setEditText] = useState(post?.postText || "");
//   const [editImage, setEditImage] = useState(post?.postImage || "");

//   // ✅ Comments state
//   const [comments, setComments] = useState(post.comments || []);
//   const [newComment, setNewComment] = useState("");
//   const [showComments, setShowComments] = useState(false);

//   // ✅ Comment edit state
//   const [editingCommentId, setEditingCommentId] = useState(null);
//   const [editCommentText, setEditCommentText] = useState("");
//   const [commentMenuAnchor, setCommentMenuAnchor] = useState(null);

//   // ✅ Saved posts state
//   const [isSaved, setIsSaved] = useState(false);

//   // ✅ Follow state
//   const [isFollowing, setIsFollowing] = useState(false);

//   const handleMenuClick = (e) => setAnchorEl(e.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);

//   const handleDeleteClick = () => {
//     onDelete(post.id);
//     handleMenuClose();
//   };

//   const handleEditOpen = () => {
//     setIsEditing(true);
//     handleMenuClose();
//   };

//   const handleEditSave = () => {
//     if (!editText.trim() && !editImage.trim()) return;
//     onEdit(post.id, {
//       post_text: editText,
//       post_image: editImage,
//     });
//     setIsEditing(false);
//   };

//   // ✅ Fetch comments when opening comment section
//   useEffect(() => {
//     if (showComments) {
//       fetch(`http://localhost:5000/api/comments/post/${post.id}`)
//         .then((res) => res.json())
//         .then((data) => setComments(data))
//         .catch((err) => console.error("❌ Error loading comments:", err));
//     }
//   }, [showComments, post.id]);

//   // ✅ Check if post is saved on mount
//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     if (!userId) return;

//     fetch(`http://localhost:5000/api/saved-posts/user/${userId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         const saved = data.some((s) => s.post_id === post.id);
//         setIsSaved(saved);
//       })
//       .catch((err) => console.error("❌ Error checking saved posts:", err));
//   }, [post.id]);

//   // ✅ Save / Unsave Post
//   const toggleSavePost = async () => {
//     const userId = localStorage.getItem("userId");
//     if (!userId) return;

//     try {
//       if (isSaved) {
//         // Unsave
//         const res = await fetch(
//           `http://localhost:5000/api/saved-posts/${post.id}/${userId}`,
//           { method: "DELETE" }
//         );
//         if (!res.ok) throw new Error("Failed to unsave post");
//         setIsSaved(false);
//       } else {
//         // Save
//         const res = await fetch("http://localhost:5000/api/saved-posts/", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ user_id: userId, post_id: post.id }),
//         });
//         if (!res.ok) throw new Error("Failed to save post");
//         setIsSaved(true);
//       }
//     } catch (err) {
//       console.error("❌ Error toggling saved post:", err);
//     }
//   };

//   // ✅ Follow / Unfollow (fixed for backend JSON)
//   const toggleFollow = async () => {
//     const userId = localStorage.getItem("userId");
//     const authorId = post?.author?.id;
//     if (!userId || !authorId) return;

//     if (String(userId) === String(authorId)) {
//       alert("❌ You cannot follow yourself!");
//       return;
//     }

//     try {
//       if (isFollowing) {
//         // Unfollow
//         const res = await fetch(
//           `http://localhost:5000/api/follows/${userId}/${authorId}`,
//           { method: "DELETE" }
//         );
//         if (!res.ok) throw new Error("Failed to unfollow");
//         setIsFollowing(false);
//       } else {
//         // Follow (JSON body)
//         const res = await fetch("http://localhost:5000/api/follows/", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ follower_id: userId, following_id: authorId }),
//         });
//         if (!res.ok) throw new Error("Failed to follow");
//         setIsFollowing(true);
//       }
//     } catch (err) {
//       console.error("❌ Error toggling follow:", err);
//     }
//   };

//   // ✅ Check follow status
//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     const authorId = post?.author?.id;
//     if (!userId || !authorId) return;

//     if (String(userId) === String(authorId)) {
//       setIsFollowing(false);
//       return;
//     }

//     fetch(`http://localhost:5000/api/follows/status/${userId}/${authorId}`)
//       .then((res) => res.json())
//       .then((data) => setIsFollowing(data.is_following))
//       .catch((err) => console.error("❌ Error checking follow:", err));
//   }, [post?.author?.id]);

//   // ✅ Add new comment
//   const handleAddComment = async () => {
//     if (!newComment.trim()) return;

//     const userId = localStorage.getItem("userId");

//     try {
//       const res = await fetch("http://localhost:5000/api/comments", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           user_id: userId,
//           post_id: post.id,
//           content: newComment,
//         }),
//       });

//       if (!res.ok) throw new Error("Failed to add comment");
//       const saved = await res.json();

//       setComments([saved, ...comments]);
//       setNewComment("");
//     } catch (err) {
//       console.error("❌ Error adding comment:", err);
//     }
//   };

//   // ✅ Edit existing comment
//   const handleEditComment = async (id) => {
//     if (!editCommentText.trim()) return;

//     try {
//       const res = await fetch(`http://localhost:5000/api/comments/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ content: editCommentText }),
//       });

//       if (!res.ok) throw new Error("Failed to update comment");
//       const updated = await res.json();

//       setComments(comments.map((c) => (c.id === id ? updated : c)));
//       setEditingCommentId(null);
//       setEditCommentText("");
//     } catch (err) {
//       console.error("❌ Error editing comment:", err);
//     }
//   };

//   // ✅ Delete comment
//   const handleDeleteComment = async (id) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/comments/${id}`, {
//         method: "DELETE",
//       });

//       if (!res.ok) throw new Error("Failed to delete comment");
//       setComments(comments.filter((c) => c.id !== id));
//     } catch (err) {
//       console.error("❌ Error deleting comment:", err);
//     }
//   };

//   // ✅ auto-update time
//   useEffect(() => {
//     const timer = setInterval(() => {
//       const updatedDate = post?.createdAt ? toIST(post.createdAt) : new Date();
//       setRelativeTime(getRelativeTime(updatedDate));
//     }, 60000);
//     return () => clearInterval(timer);
//   }, [post?.createdAt]);

//   return (
//     <Card className="post-card">
//       <div className="post-header">
//         {/* Avatar */}
//         <div className="header-avatar">
//           <img
//             src={
//               post?.author?.profilePicture ||
//               "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
//             }
//             alt="avatar"
//           />
//         </div>

//         {/* User info */}
//         <div className="header-info">
//           <h4 className="user-name">{post?.author?.name || "Unknown"}</h4>
//           <p className="user-bio">{post?.author?.bio || "bio not added"}</p>
//           <p className="post-time">{relativeTime}</p>
//         </div>

//         {/* Actions */}
//         <div className="header-actions">
//           <button className="follow-btn" onClick={toggleFollow}>
//             {isFollowing ? "✔ Following" : "+ Follow"}
//           </button>
//           <IconButton onClick={handleMenuClick}>
//             <MoreVertIcon />
//           </IconButton>
//           <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
//             <MenuItem onClick={handleEditOpen}>✏️ Edit</MenuItem>
//             <MenuItem onClick={handleDeleteClick}>🗑 Delete</MenuItem>
//           </Menu>
//         </div>
//       </div>

//       {/* Body */}
//       <CardContent>
//         <div className={`post-text ${expanded ? "expanded" : ""}`}>
//           {expanded ? (
//             <Typography variant="body1">{post?.postText || ""}</Typography>
//           ) : (
//             <>
//               <Typography variant="body1" component="span">
//                 {post?.postText?.slice(0, 150) || ""}
//               </Typography>
//               {post?.postText?.length > 150 && (
//                 <button
//                   className="read-more-btn"
//                   onClick={() => setExpanded(true)}
//                 >
//                   ...more
//                 </button>
//               )}
//             </>
//           )}
//         </div>
//       </CardContent>

//       {post?.postImage && (
//         <CardMedia
//           component="img"
//           height="400"
//           image={post.postImage}
//           alt="post"
//           className="post-image"
//         />
//       )}

//       {/* Footer */}
//       <CardActions disableSpacing className="post-footer">
//         <Button startIcon={<ThumbUpAltOutlinedIcon />}>Like</Button>
//         <Button
//           startIcon={<ChatBubbleOutlineOutlinedIcon />}
//           onClick={() => setShowComments(!showComments)}
//         >
//           Comment
//         </Button>
//         <IconButton onClick={toggleSavePost}>
//           {isSaved ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
//         </IconButton>
//       </CardActions>

//       {/* ✅ Comments Section */}
//       {showComments && (
//         <div className="comments-section" style={{ padding: "0 16px 16px" }}>
//           {/* Add Comment */}
//           <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
//             <TextField
//               fullWidth
//               size="small"
//               placeholder="Write a comment..."
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//             />
//             <Button onClick={handleAddComment} variant="contained">
//               Post
//             </Button>
//           </div>

//           {/* Comment List */}
//           {comments.map((c) => {
//             const isEditingThis = editingCommentId === c.id;
//             const isMenuOpen =
//               commentMenuAnchor && commentMenuAnchor.commentId === c.id;

//             return (
//               <div
//                 key={c.id}
//                 style={{
//                   display: "flex",
//                   alignItems: "flex-start",
//                   marginBottom: "12px",
//                 }}
//               >
//                 <Avatar
//                   src={
//                     c.author?.profilePicture ||
//                     "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//                   }
//                   sx={{ width: 32, height: 32, mr: 1 }}
//                 />
//                 <div style={{ flex: 1 }}>
//                   <Typography variant="subtitle2">
//                     {c.author?.name || "Anonymous"}
//                   </Typography>

//                   {/* ✅ Edit Mode */}
//                   {isEditingThis ? (
//                     <>
//                       <TextField
//                         fullWidth
//                         size="small"
//                         value={editCommentText}
//                         onChange={(e) => setEditCommentText(e.target.value)}
//                         autoFocus
//                       />
//                       <div style={{ marginTop: "6px" }}>
//                         <Button
//                           size="small"
//                           variant="contained"
//                           onClick={() => handleEditComment(c.id)}
//                           sx={{ mr: 1 }}
//                         >
//                           Save
//                         </Button>
//                         <Button
//                           size="small"
//                           onClick={() => {
//                             setEditingCommentId(null);
//                             setEditCommentText("");
//                           }}
//                         >
//                           Cancel
//                         </Button>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <Typography variant="body2" color="text.secondary">
//                         {c.content}
//                       </Typography>
//                       <Typography variant="caption" color="text.disabled">
//                         {c.createdAt
//                           ? formatDistanceToNow(parseISO(c.createdAt), {
//                               addSuffix: true,
//                             })
//                           : ""}
//                       </Typography>
//                     </>
//                   )}
//                 </div>

//                 {/* ✅ Comment dropdown */}
//                 {!isEditingThis && (
//                   <>
//                     <IconButton
//                       size="small"
//                       onClick={(e) => {
//                         setCommentMenuAnchor({
//                           element: e.currentTarget,
//                           commentId: c.id,
//                         });
//                       }}
//                     >
//                       <MoreVertIcon fontSize="small" />
//                     </IconButton>
//                     <Menu
//                       anchorEl={commentMenuAnchor?.element || null}
//                       open={isMenuOpen}
//                       onClose={() => setCommentMenuAnchor(null)}
//                     >
//                       <MenuItem
//                         onClick={() => {
//                           setEditingCommentId(c.id);
//                           setEditCommentText(c.content);
//                           setCommentMenuAnchor(null);
//                         }}
//                       >
//                         ✏️ Edit
//                       </MenuItem>
//                       <MenuItem
//                         onClick={() => {
//                           handleDeleteComment(c.id);
//                           setCommentMenuAnchor(null);
//                         }}
//                       >
//                         🗑 Delete
//                       </MenuItem>
//                     </Menu>
//                   </>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Edit Dialog (Post) */}
//       <Dialog open={isEditing} onClose={() => setIsEditing(false)} fullWidth>
//         <DialogTitle>Edit Post</DialogTitle>
//         <DialogContent>
//           <TextField
//             multiline
//             fullWidth
//             minRows={3}
//             label="Edit Text"
//             value={editText}
//             onChange={(e) => setEditText(e.target.value)}
//             margin="dense"
//           />
//           <TextField
//             fullWidth
//             label="Image URL"
//             value={editImage}
//             onChange={(e) => setEditImage(e.target.value)}
//             margin="dense"
//           />
//           {editImage && (
//             <img
//               src={editImage}
//               alt="preview"
//               style={{ width: "100%", marginTop: 10, borderRadius: 8 }}
//             />
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setIsEditing(false)}>Cancel</Button>
//           <Button onClick={handleEditSave} variant="contained" color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Card>
//   );
// }

import { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble"; // ✅ changed icon
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom"; // ✅ for navigation
import "./PostCard.css";

// ✅ Convert UTC -> IST (+05:30)
const toIST = (dateString) => {
  const utcDate = parseISO(dateString);
  return new Date(utcDate.getTime() + 5.5 * 60 * 60 * 1000);
};

export function PostCard({ post, onDelete, onEdit }) {
  const createdDate = post?.createdAt ? toIST(post.createdAt) : new Date();
  const navigate = useNavigate();

  // ✅ Relative time
  const getRelativeTime = (date) => {
    let time = formatDistanceToNow(date, { addSuffix: true });
    if (time.includes("less than a minute")) return "Just now";
    return time;
  };

  const [relativeTime, setRelativeTime] = useState(
    getRelativeTime(createdDate)
  );
  const [expanded, setExpanded] = useState(false);

  // Dropdown menu state (for post)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Edit state (post)
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(post?.postText || "");
  const [editImage, setEditImage] = useState(post?.postImage || "");

  // ✅ Comments state
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  // ✅ Comment edit state
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [commentMenuAnchor, setCommentMenuAnchor] = useState(null);

  // ✅ Saved posts state
  const [isSaved, setIsSaved] = useState(false);

  // ✅ Follow state
  const [isFollowing, setIsFollowing] = useState(false);

  const userId = localStorage.getItem("userId");

  const handleMenuClick = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleDeleteClick = () => {
    onDelete(post.id);
    handleMenuClose();
  };

  const handleEditOpen = () => {
    setIsEditing(true);
    handleMenuClose();
  };

  const handleEditSave = () => {
    if (!editText.trim() && !editImage.trim()) return;
    onEdit(post.id, {
      post_text: editText,
      post_image: editImage,
    });
    setIsEditing(false);
  };

  // ✅ Fetch comments when opening comment section
  useEffect(() => {
    if (showComments) {
      fetch(`http://localhost:5000/api/comments/post/${post.id}`)
        .then((res) => res.json())
        .then((data) => setComments(data))
        .catch((err) => console.error("❌ Error loading comments:", err));
    }
  }, [showComments, post.id]);

  // ✅ Check if post is saved on mount
  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:5000/api/saved-posts/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const saved = data.some((s) => s.post_id === post.id);
        setIsSaved(saved);
      })
      .catch((err) => console.error("❌ Error checking saved posts:", err));
  }, [post.id]);

  // ✅ Save / Unsave Post
  const toggleSavePost = async () => {
    if (!userId) return;

    try {
      if (isSaved) {
        // Unsave
        const res = await fetch(
          `http://localhost:5000/api/saved-posts/${post.id}/${userId}`,
          { method: "DELETE" }
        );
        if (!res.ok) throw new Error("Failed to unsave post");
        setIsSaved(false);
      } else {
        // Save
        const res = await fetch("http://localhost:5000/api/saved-posts/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId, post_id: post.id }),
        });
        if (!res.ok) throw new Error("Failed to save post");
        setIsSaved(true);
      }
    } catch (err) {
      console.error("❌ Error toggling saved post:", err);
    }
  };

  // ✅ Follow / Unfollow (fixed for backend JSON)
  const toggleFollow = async () => {
    const authorId = post?.author?.id;
    if (!userId || !authorId) return;

    if (String(userId) === String(authorId)) {
      alert("❌ You cannot follow yourself!");
      return;
    }

    try {
      if (isFollowing) {
        // Unfollow
        const res = await fetch(
          `http://localhost:5000/api/follows/${userId}/${authorId}`,
          { method: "DELETE" }
        );
        if (!res.ok) throw new Error("Failed to unfollow");
        setIsFollowing(false);
      } else {
        // Follow (JSON body)
        const res = await fetch("http://localhost:5000/api/follows/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ follower_id: userId, following_id: authorId }),
        });
        if (!res.ok) throw new Error("Failed to follow");
        setIsFollowing(true);
      }
    } catch (err) {
      console.error("❌ Error toggling follow:", err);
    }
  };

  // ✅ Check follow status
  useEffect(() => {
    const authorId = post?.author?.id;
    if (!userId || !authorId) return;

    if (String(userId) === String(authorId)) {
      setIsFollowing(false);
      return;
    }

    fetch(`http://localhost:5000/api/follows/status/${userId}/${authorId}`)
      .then((res) => res.json())
      .then((data) => setIsFollowing(data.is_following))
      .catch((err) => console.error("❌ Error checking follow:", err));
  }, [post?.author?.id]);

  // ✅ Add new comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          post_id: post.id,
          content: newComment,
        }),
      });

      if (!res.ok) throw new Error("Failed to add comment");
      const saved = await res.json();

      setComments([saved, ...comments]);
      setNewComment("");
    } catch (err) {
      console.error("❌ Error adding comment:", err);
    }
  };

  // ✅ Edit existing comment
  const handleEditComment = async (id) => {
    if (!editCommentText.trim()) return;

    try {
      const res = await fetch(`http://localhost:5000/api/comments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editCommentText }),
      });

      if (!res.ok) throw new Error("Failed to update comment");
      const updated = await res.json();

      setComments(comments.map((c) => (c.id === id ? updated : c)));
      setEditingCommentId(null);
      setEditCommentText("");
    } catch (err) {
      console.error("❌ Error editing comment:", err);
    }
  };

  // ✅ Delete comment
  const handleDeleteComment = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/comments/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete comment");
      setComments(comments.filter((c) => c.id !== id));
    } catch (err) {
      console.error("❌ Error deleting comment:", err);
    }
  };

  // ✅ auto-update time
  useEffect(() => {
    const timer = setInterval(() => {
      const updatedDate = post?.createdAt ? toIST(post.createdAt) : new Date();
      setRelativeTime(getRelativeTime(updatedDate));
    }, 60000);
    return () => clearInterval(timer);
  }, [post?.createdAt]);

  return (
    <Card className="post-card">
      <div className="post-header">
        {/* Avatar */}
        <div
          className="header-avatar"
          onClick={() => navigate(`/profile/${post?.author?.username}`)} // ✅ navigate
          style={{ cursor: "pointer" }}
        >
          <img
            src={
              post?.author?.profilePicture ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt="avatar"
          />
        </div>

        {/* User info */}
        <div
          className="header-info"
          onClick={() => navigate(`/profile/${post?.author?.username}`)} // ✅ navigate
          style={{ cursor: "pointer" }}
        >
          <h4 className="user-name">{post?.author?.name || "Unknown"}</h4>
          <p className="user-bio">{post?.author?.bio || "bio not added"}</p>
          <p className="post-time">{relativeTime}</p>
        </div>

        {/* Actions */}
        <div className="header-actions">
          <button className="follow-btn" onClick={toggleFollow}>
            {isFollowing ? "✔ Following" : "+ Follow"}
          </button>

          {/* ✅ Show dropdown only if post owner */}
          {String(userId) === String(post?.author?.id) && (
            <>
              <IconButton onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                <MenuItem onClick={handleEditOpen}>✏️ Edit</MenuItem>
                <MenuItem onClick={handleDeleteClick}>🗑 Delete</MenuItem>
              </Menu>
            </>
          )}
        </div>
      </div>

      {/* Body */}
      <CardContent>
        <div className={`post-text ${expanded ? "expanded" : ""}`}>
          {expanded ? (
            <Typography variant="body1">{post?.postText || ""}</Typography>
          ) : (
            <>
              <Typography variant="body1" component="span">
                {post?.postText?.slice(0, 150) || ""}
              </Typography>
              {post?.postText?.length > 150 && (
                <button
                  className="read-more-btn"
                  onClick={() => setExpanded(true)}
                >
                  ...more
                </button>
              )}
            </>
          )}
        </div>
      </CardContent>

      {post?.postImage && (
        <CardMedia
          component="img"
          height="400"
          image={post.postImage}
          alt="post"
          className="post-image"
        />
      )}

      {/* Footer */}
      <CardActions disableSpacing className="post-footer">
        <Button startIcon={<ThumbUpAltOutlinedIcon />}>Like</Button>
        <Button
          startIcon={<ChatBubbleIcon />} // ✅ changed icon
          onClick={() => setShowComments(!showComments)}
        >
          {`(${comments.length})`} {/* ✅ count */}
        </Button>
        <IconButton onClick={toggleSavePost}>
          {isSaved ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
        </IconButton>
      </CardActions>

      {/* ✅ Comments Section */}
      {showComments && (
        <div className="comments-section" style={{ padding: "0 16px 16px" }}>
          {/* Add Comment */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button onClick={handleAddComment} variant="contained">
              Post
            </Button>
          </div>

          {/* Comment List */}
          {comments.map((c) => {
            const isEditingThis = editingCommentId === c.id;
            const isMenuOpen =
              commentMenuAnchor && commentMenuAnchor.commentId === c.id;

            return (
              <div
                key={c.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginBottom: "12px",
                }}
              >
                <Avatar
                  src={
                    c.author?.profilePicture ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  sx={{ width: 32, height: 32, mr: 1 }}
                />
                <div style={{ flex: 1 }}>
                  <Typography variant="subtitle2">
                    {c.author?.name || "Anonymous"}
                  </Typography>

                  {/* ✅ Edit Mode */}
                  {isEditingThis ? (
                    <>
                      <TextField
                        fullWidth
                        size="small"
                        value={editCommentText}
                        onChange={(e) => setEditCommentText(e.target.value)}
                        autoFocus
                      />
                      <div style={{ marginTop: "6px" }}>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => handleEditComment(c.id)}
                          sx={{ mr: 1 }}
                        >
                          Save
                        </Button>
                        <Button
                          size="small"
                          onClick={() => {
                            setEditingCommentId(null);
                            setEditCommentText("");
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Typography variant="body2" color="text.secondary">
                        {c.content}
                      </Typography>
                      <Typography variant="caption" color="text.disabled">
                        {c.createdAt
                          ? formatDistanceToNow(parseISO(c.createdAt), {
                              addSuffix: true,
                            })
                          : ""}
                      </Typography>
                    </>
                  )}
                </div>

                {/* ✅ Comment dropdown */}
                {!isEditingThis && (
                  <>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        setCommentMenuAnchor({
                          element: e.currentTarget,
                          commentId: c.id,
                        });
                      }}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                    <Menu
                      anchorEl={commentMenuAnchor?.element || null}
                      open={isMenuOpen}
                      onClose={() => setCommentMenuAnchor(null)}
                    >
                      <MenuItem
                        onClick={() => {
                          setEditingCommentId(c.id);
                          setEditCommentText(c.content);
                          setCommentMenuAnchor(null);
                        }}
                      >
                        ✏️ Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleDeleteComment(c.id);
                          setCommentMenuAnchor(null);
                        }}
                      >
                        🗑 Delete
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Dialog (Post) */}
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
              style={{ width: "100%", marginTop: 10, borderRadius: 8 }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
