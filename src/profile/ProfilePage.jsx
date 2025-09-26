// import { useState, useEffect } from "react";
// import {
//   Box,
//   Avatar,
//   Typography,
//   Button,
//   Paper,
//   IconButton,
//   Tooltip,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import LocationOnIcon from "@mui/icons-material/LocationOn";

// import "./ProfilePage.css";
// import ProfileUpdateForm from "./ProfileUpdateForm";
// import EducationForm from "../EducationForm";
// import ExperienceForm from "../ExperienceForm";
// import { PostCard } from "../PostCard"; // ✅ Import PostCard

// export default function ProfilePage() {
//   const [user, setUser] = useState(null);
//   const [posts, setPosts] = useState([]); // ✅ state for posts
//   const [showForm, setShowForm] = useState(false);
//   const [showEduForm, setShowEduForm] = useState(false);
//   const [showExpForm, setShowExpForm] = useState(false);
//   const [editEdu, setEditEdu] = useState(null);
//   const [editExp, setEditExp] = useState(null);

//   const username = localStorage.getItem("username");
//   const token = localStorage.getItem("token");

//   // ✅ Fetch user profile
//   const fetchUser = async () => {
//     const res = await fetch(`http://127.0.0.1:5000/api/users/${username}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await res.json();
//     setUser(data.user);

//     // also fetch posts
//     fetchPosts(data.user.id);
//   };

//   // ✅ Fetch user posts
//   const fetchPosts = async (userId) => {
//     try {
//       const res = await fetch(
//         `http://127.0.0.1:5000/api/posts/user/${userId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const data = await res.json();
//       console.log("User Posts API Response:", data);
//       setPosts(data.posts || data);
//     } catch (err) {
//       console.error("Error fetching posts:", err);
//     }
//   };

//   useEffect(() => {
//     if (username && token) fetchUser();
//   }, [username, token]);

//   // ✅ Delete Experience
//   const handleDeleteExp = async (expId) => {
//     if (!window.confirm("Are you sure you want to delete this experience?"))
//       return;

//     try {
//       await fetch(
//         `http://127.0.0.1:5000/api/users/${user.id}/experiences/${expId}`,
//         {
//           method: "DELETE",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       await fetchUser();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ✅ Delete Education
//   const handleDeleteEdu = async (eduId) => {
//     if (!window.confirm("Are you sure you want to delete this education?"))
//       return;

//     try {
//       await fetch(
//         `http://127.0.0.1:5000/api/users/${user.id}/educations/${eduId}`,
//         {
//           method: "DELETE",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       await fetchUser();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ✅ Delete Post
//   const handleDeletePost = async (postId) => {
//     try {
//       await fetch(`http://127.0.0.1:5000/api/posts/${postId}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchPosts(user.id);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ✅ Edit Post
//   const handleEditPost = async (postId, updatedData) => {
//     try {
//       await fetch(`http://127.0.0.1:5000/api/posts/${postId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(updatedData),
//       });
//       fetchPosts(user.id);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!user) return <p>Loading...</p>;

//   return (
//     <div className="profile-page">
//       {/* 🔹 Header Section (MUI Design) */}
//       <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden", mb: 3 }}>
//         {/* Poster */}
//         <Box
//           sx={{
//             height: 200,
//             backgroundImage: `url(${
//               user.poster ||
//               "https://t4.ftcdn.net/jpg/06/55/94/89/360_F_655948989_AhcSgOCOoamYmH9fEMsOY857r0dfMpBI.jpg"
//             })`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             position: "relative",
//           }}
//         >
//           {/* Edit Poster */}
//           <IconButton
//             onClick={() => setShowForm(true)}
//             sx={{
//               position: "absolute",
//               top: 10,
//               right: 10,
//               bgcolor: "white",
//               "&:hover": { bgcolor: "grey.200" },
//             }}
//           >
//             <EditIcon />
//           </IconButton>
//         </Box>

//         {/* Profile Info */}
//         <Box sx={{ p: 3, pt: 0 }}>
//           <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
//             {/* Avatar */}
//             <Avatar
//               src={
//                 user.profilePicture ||
//                 "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
//               }
//               alt={user.name}
//               sx={{
//                 width: 120,
//                 height: 120,
//                 mt: -7,
//                 border: "4px solid white",
//                 boxShadow: 2,
//               }}
//             />

//             {/* Name, Bio, Position, Location */}
//             <Box sx={{ flexGrow: 1 }}>
//               <Typography variant="h5" fontWeight="bold">
//                 {user.name}
//               </Typography>

//               <Typography variant="body1" color="text.primary" sx={{ mt: 0.5 }}>
//                 {user.bio || "No bio yet"}
//               </Typography>

//               <Typography variant="subtitle1" color="text.secondary">
//                 {user.positions || "Add your title"}
//               </Typography>

//               <Box display="flex" alignItems="center" gap={1} mt={1}>
//                 <LocationOnIcon fontSize="small" color="action" />
//                 <Typography variant="body2" color="text.secondary">
//                   {user.city}, {user.country}
//                 </Typography>
//               </Box>
//             </Box>

//             {/* Edit Profile Button */}
//             <Button
//               variant="contained"
//               startIcon={<EditIcon />}
//               onClick={() => setShowForm(true)}
//               sx={{ borderRadius: 20, textTransform: "none" }}
//             >
//               Edit Profile
//             </Button>
//           </Box>

//           {/* Follow Button */}
//           <Box mt={2}>
//             <Button
//               variant="outlined"
//               sx={{ borderRadius: 20, textTransform: "none", px: 3 }}
//             >
//               + Follow
//             </Button>
//           </Box>
//         </Box>
//       </Paper>

//       {/* 🔹 About Section */}
//       <div className="card">
//         <div className="card-header">
//           <h3>About</h3>
//         </div>
//         <p>{user.about || "No about info yet."}</p>
//       </div>

//       {/* 🔹 Experience Section */}
//       <div className="card">
//         <div className="card-header">
//           <h3>Experience</h3>
//           <Button
//             startIcon={<AddIcon />}
//             variant="contained"
//             size="small"
//             sx={{ borderRadius: 20, textTransform: "none" }}
//             onClick={() => {
//               setEditExp(null);
//               setShowExpForm(true);
//             }}
//           >
//             Add
//           </Button>
//         </div>
//         {user.experiences?.length === 0 ? (
//           <p>No experience added</p>
//         ) : (
//           user.experiences.map((exp) => (
//             <div key={exp.id} className="exp-item">
//               <Box display="flex" justifyContent="space-between">
//                 <Box>
//                   <h4>{exp.title || "Job Title"}</h4>
//                   <p className="company">{exp.company}</p>
//                   <p className="date">
//                     {exp.startDate?.slice(0, 7)} –{" "}
//                     {exp.endDate?.slice(0, 7) || "Present"}
//                   </p>
//                   <p className="desc">{exp.description}</p>
//                 </Box>

//                 {/* Action Buttons */}
//                 <Box>
//                   <Tooltip title="Edit">
//                     <IconButton
//                       onClick={() => {
//                         setEditExp(exp);
//                         setShowExpForm(true);
//                       }}
//                     >
//                       <EditIcon fontSize="small" />
//                     </IconButton>
//                   </Tooltip>

//                   <Tooltip title="Delete">
//                     <IconButton
//                       color="error"
//                       onClick={() => handleDeleteExp(exp.id)}
//                     >
//                       <DeleteIcon fontSize="small" />
//                     </IconButton>
//                   </Tooltip>
//                 </Box>
//               </Box>
//             </div>
//           ))
//         )}
//       </div>

//       {/* 🔹 Education Section */}
//       <div className="card">
//         <div className="card-header">
//           <h3>Education</h3>
//           <Button
//             startIcon={<AddIcon />}
//             variant="contained"
//             size="small"
//             sx={{ borderRadius: 20, textTransform: "none" }}
//             onClick={() => {
//               setEditEdu(null);
//               setShowEduForm(true);
//             }}
//           >
//             Add
//           </Button>
//         </div>
//         {user.educations?.length === 0 ? (
//           <p>No education added</p>
//         ) : (
//           user.educations.map((edu) => (
//             <div key={edu.id} className="edu-item">
//               <Box display="flex" justifyContent="space-between">
//                 <Box>
//                   <h4>{edu.school}</h4>
//                   <p>
//                     {edu.degree} – {edu.fieldOfStudy}
//                   </p>
//                   <p className="date">
//                     {edu.startYear} – {edu.endYear || "Present"}
//                   </p>
//                 </Box>

//                 {/* Action Buttons */}
//                 <Box>
//                   <Tooltip title="Edit">
//                     <IconButton
//                       onClick={() => {
//                         setEditEdu(edu);
//                         setShowEduForm(true);
//                       }}
//                     >
//                       <EditIcon fontSize="small" />
//                     </IconButton>
//                   </Tooltip>

//                   <Tooltip title="Delete">
//                     <IconButton
//                       color="error"
//                       onClick={() => handleDeleteEdu(edu.id)}
//                     >
//                       <DeleteIcon fontSize="small" />
//                     </IconButton>
//                   </Tooltip>
//                 </Box>
//               </Box>
//             </div>
//           ))
//         )}
//       </div>

//       {/* 🔹 Posts Section */}
//       <div className="card">
//         <div className="card-header">
//           <h3>Posts</h3>
//         </div>
//         {posts.length === 0 ? (
//           <p>No posts yet.</p>
//         ) : (
//           posts.map((post) => (
//             <PostCard
//               key={post.id}
//               post={post}
//               onDelete={handleDeletePost}
//               onEdit={handleEditPost}
//             />
//           ))
//         )}
//       </div>

//       {/* 🔹 Modals */}
//       {showForm && (
//         <ProfileUpdateForm
//           user={user}
//           token={token}
//           onClose={() => setShowForm(false)}
//           onUpdate={async () => await fetchUser()}
//         />
//       )}

//       {showEduForm && (
//         <EducationForm
//           userId={user.id}
//           token={token}
//           initialData={editEdu}
//           onClose={() => setShowEduForm(false)}
//           onSaved={async () => await fetchUser()}
//         />
//       )}

//       {showExpForm && (
//         <ExperienceForm
//           userId={user.id}
//           token={token}
//           initialData={editExp}
//           onClose={() => setShowExpForm(false)}
//           onSaved={async () => await fetchUser()}
//         />
//       )}
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import {
//   Box,
//   Avatar,
//   Typography,
//   Button,
//   Paper,
//   IconButton,
//   Tooltip,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import LocationOnIcon from "@mui/icons-material/LocationOn";

// import "./ProfilePage.css";
// import ProfileUpdateForm from "./ProfileUpdateForm";
// import EducationForm from "../EducationForm";
// import ExperienceForm from "../ExperienceForm";
// import { PostCard } from "../PostCard"; // ✅ Import PostCard

// export default function ProfilePage() {
//   const [user, setUser] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [followers, setFollowers] = useState(0);
//   const [following, setFollowing] = useState(0);
//   const [isFollowing, setIsFollowing] = useState(false);

//   const [showForm, setShowForm] = useState(false);
//   const [showEduForm, setShowEduForm] = useState(false);
//   const [showExpForm, setShowExpForm] = useState(false);
//   const [editEdu, setEditEdu] = useState(null);
//   const [editExp, setEditExp] = useState(null);

//   const username = localStorage.getItem("username");
//   const token = localStorage.getItem("token");
//   const currentUserId = localStorage.getItem("userId"); // logged-in user

//   // ✅ Fetch user profile
//   const fetchUser = async () => {
//     const res = await fetch(`http://127.0.0.1:5000/api/users/${username}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await res.json();
//     setUser(data.user);

//     // also fetch posts
//     fetchPosts(data.user.id);

//     // fetch followers/following counts
//     fetchFollowers(data.user.id);
//     fetchFollowing(data.user.id);

//     // check follow status
//     if (currentUserId && data.user.id) {
//       checkFollowStatus(currentUserId, data.user.id);
//     }
//   };

//   // ✅ Fetch user posts
//   const fetchPosts = async (userId) => {
//     try {
//       const res = await fetch(
//         `http://127.0.0.1:5000/api/posts/user/${userId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const data = await res.json();
//       setPosts(data.posts || data);
//     } catch (err) {
//       console.error("Error fetching posts:", err);
//     }
//   };

//   // ✅ Fetch followers
//   const fetchFollowers = async (userId) => {
//     const res = await fetch(
//       `http://127.0.0.1:5000/api/follows/followers/${userId}`
//     );
//     const data = await res.json();
//     setFollowers(data.length);
//   };

//   // ✅ Fetch following
//   const fetchFollowing = async (userId) => {
//     const res = await fetch(
//       `http://127.0.0.1:5000/api/follows/following/${userId}`
//     );
//     const data = await res.json();
//     setFollowing(data.length);
//   };

//   // ✅ Check if current user follows this profile
//   const checkFollowStatus = async (followerId, followingId) => {
//     try {
//       const res = await fetch(
//         `http://127.0.0.1:5000/api/follows/${followerId}/${followingId}`
//       );
//       if (res.status === 200) {
//         setIsFollowing(true);
//       } else {
//         setIsFollowing(false);
//       }
//     } catch (err) {
//       console.error("Error checking follow status:", err);
//     }
//   };

//   // ✅ Toggle Follow
//   const toggleFollow = async () => {
//     if (!currentUserId || !user?.id) return;

//     try {
//       if (isFollowing) {
//         // Unfollow
//         await fetch(
//           `http://127.0.0.1:5000/api/follows/${currentUserId}/${user.id}`,
//           { method: "DELETE" }
//         );
//         setIsFollowing(false);
//         setFollowers((prev) => prev - 1);
//       } else {
//         // Follow
//         await fetch(
//           `http://127.0.0.1:5000/api/follows/${currentUserId}/${user.id}`,
//           {
//             method: "POST",
//           }
//         );
//         setIsFollowing(true);
//         setFollowers((prev) => prev + 1);
//       }
//     } catch (err) {
//       console.error("Error toggling follow:", err);
//     }
//   };

//   useEffect(() => {
//     if (username && token) fetchUser();
//   }, [username, token]);

//   // ✅ Delete Experience
//   const handleDeleteExp = async (expId) => {
//     if (!window.confirm("Are you sure you want to delete this experience?"))
//       return;

//     try {
//       await fetch(
//         `http://127.0.0.1:5000/api/users/${user.id}/experiences/${expId}`,
//         {
//           method: "DELETE",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       await fetchUser();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ✅ Delete Education
//   const handleDeleteEdu = async (eduId) => {
//     if (!window.confirm("Are you sure you want to delete this education?"))
//       return;

//     try {
//       await fetch(
//         `http://127.0.0.1:5000/api/users/${user.id}/educations/${eduId}`,
//         {
//           method: "DELETE",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       await fetchUser();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ✅ Delete Post
//   const handleDeletePost = async (postId) => {
//     try {
//       await fetch(`http://127.0.0.1:5000/api/posts/${postId}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchPosts(user.id);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ✅ Edit Post
//   const handleEditPost = async (postId, updatedData) => {
//     try {
//       await fetch(`http://127.0.0.1:5000/api/posts/${postId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(updatedData),
//       });
//       fetchPosts(user.id);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!user) return <p>Loading...</p>;

//   return (
//     <div className="profile-page">
//       {/* 🔹 Header Section (MUI Design) */}
//       <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden", mb: 3 }}>
//         {/* Poster */}
//         <Box
//           sx={{
//             height: 200,
//             backgroundImage: `url(${
//               user.poster ||
//               "https://t4.ftcdn.net/jpg/06/55/94/89/360_F_655948989_AhcSgOCOoamYmH9fEMsOY857r0dfMpBI.jpg"
//             })`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             position: "relative",
//           }}
//         >
//           {/* Edit Poster */}
//           <IconButton
//             onClick={() => setShowForm(true)}
//             sx={{
//               position: "absolute",
//               top: 10,
//               right: 10,
//               bgcolor: "white",
//               "&:hover": { bgcolor: "grey.200" },
//             }}
//           >
//             <EditIcon />
//           </IconButton>
//         </Box>

//         {/* Profile Info */}
//         <Box sx={{ p: 3, pt: 0 }}>
//           <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
//             {/* Avatar */}
//             <Avatar
//               src={
//                 user.profilePicture ||
//                 "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
//               }
//               alt={user.name}
//               sx={{
//                 width: 120,
//                 height: 120,
//                 mt: -7,
//                 border: "4px solid white",
//                 boxShadow: 2,
//               }}
//             />

//             {/* Name, Bio, Position, Location */}
//             <Box sx={{ flexGrow: 1 }}>
//               <Typography variant="h5" fontWeight="bold">
//                 {user.name}
//               </Typography>

//               <Typography variant="body1" color="text.primary" sx={{ mt: 0.5 }}>
//                 {user.bio || "No bio yet"}
//               </Typography>

//               <Typography variant="subtitle1" color="text.secondary">
//                 {user.positions || "Add your title"}
//               </Typography>

//               <Box display="flex" alignItems="center" gap={1} mt={1}>
//                 <LocationOnIcon fontSize="small" color="action" />
//                 <Typography variant="body2" color="text.secondary">
//                   {user.city}, {user.country}
//                 </Typography>
//               </Box>

//               {/* Followers / Following Stats */}
//               <Box display="flex" gap={3} mt={2}>
//                 <Typography variant="body2" fontWeight="bold">
//                   {followers} Followers
//                 </Typography>
//                 <Typography variant="body2" fontWeight="bold">
//                   {following} Following
//                 </Typography>
//               </Box>
//             </Box>

//             {/* Edit Profile Button */}

//             <Button
//               variant="contained"
//               startIcon={<EditIcon />}
//               onClick={() => setShowForm(true)}
//               sx={{ borderRadius: 20, textTransform: "none" }}
//             >
//               Edit Profile
//             </Button>
//           </Box>

//           {/* Follow Button */}
//           {currentUserId && currentUserId !== String(user.id) && (
//             <Box mt={2}>
//               <Button
//                 variant={isFollowing ? "contained" : "outlined"}
//                 onClick={toggleFollow}
//                 sx={{
//                   borderRadius: 20,
//                   textTransform: "none",
//                   px: 3,
//                   bgcolor: isFollowing ? "primary.main" : "transparent",
//                   color: isFollowing ? "white" : "primary.main",
//                 }}
//               >
//                 {isFollowing ? "✔ Following" : "+ Follow"}
//               </Button>
//             </Box>
//           )}
//         </Box>
//       </Paper>

//       {/* 🔹 About Section */}
//       <div className="card">
//         <div className="card-header">
//           <h3>About</h3>
//         </div>
//         <p>{user.about || "No about info yet."}</p>
//       </div>

//       {/* 🔹 Experience Section */}
//       <div className="card">
//         <div className="card-header">
//           <h3>Experience</h3>
//           <Button
//             startIcon={<AddIcon />}
//             variant="contained"
//             size="small"
//             sx={{ borderRadius: 20, textTransform: "none" }}
//             onClick={() => {
//               setEditExp(null);
//               setShowExpForm(true);
//             }}
//           >
//             Add
//           </Button>
//         </div>
//         {user.experiences?.length === 0 ? (
//           <p>No experience added</p>
//         ) : (
//           user.experiences.map((exp) => (
//             <div key={exp.id} className="exp-item">
//               <Box display="flex" justifyContent="space-between">
//                 <Box>
//                   <h4>{exp.title || "Job Title"}</h4>
//                   <p className="company">{exp.company}</p>
//                   <p className="date">
//                     {exp.startDate?.slice(0, 7)} –{" "}
//                     {exp.endDate?.slice(0, 7) || "Present"}
//                   </p>
//                   <p className="desc">{exp.description}</p>
//                 </Box>

//                 {/* Action Buttons */}
//                 <Box>
//                   <Tooltip title="Edit">
//                     <IconButton
//                       onClick={() => {
//                         setEditExp(exp);
//                         setShowExpForm(true);
//                       }}
//                     >
//                       <EditIcon fontSize="small" />
//                     </IconButton>
//                   </Tooltip>

//                   <Tooltip title="Delete">
//                     <IconButton
//                       color="error"
//                       onClick={() => handleDeleteExp(exp.id)}
//                     >
//                       <DeleteIcon fontSize="small" />
//                     </IconButton>
//                   </Tooltip>
//                 </Box>
//               </Box>
//             </div>
//           ))
//         )}
//       </div>

//       {/* 🔹 Education Section */}
//       <div className="card">
//         <div className="card-header">
//           <h3>Education</h3>
//           <Button
//             startIcon={<AddIcon />}
//             variant="contained"
//             size="small"
//             sx={{ borderRadius: 20, textTransform: "none" }}
//             onClick={() => {
//               setEditEdu(null);
//               setShowEduForm(true);
//             }}
//           >
//             Add
//           </Button>
//         </div>
//         {user.educations?.length === 0 ? (
//           <p>No education added</p>
//         ) : (
//           user.educations.map((edu) => (
//             <div key={edu.id} className="edu-item">
//               <Box display="flex" justifyContent="space-between">
//                 <Box>
//                   <h4>{edu.school}</h4>
//                   <p>
//                     {edu.degree} – {edu.fieldOfStudy}
//                   </p>
//                   <p className="date">
//                     {edu.startYear} – {edu.endYear || "Present"}
//                   </p>
//                 </Box>

//                 {/* Action Buttons */}
//                 <Box>
//                   <Tooltip title="Edit">
//                     <IconButton
//                       onClick={() => {
//                         setEditEdu(edu);
//                         setShowEduForm(true);
//                       }}
//                     >
//                       <EditIcon fontSize="small" />
//                     </IconButton>
//                   </Tooltip>

//                   <Tooltip title="Delete">
//                     <IconButton
//                       color="error"
//                       onClick={() => handleDeleteEdu(edu.id)}
//                     >
//                       <DeleteIcon fontSize="small" />
//                     </IconButton>
//                   </Tooltip>
//                 </Box>
//               </Box>
//             </div>
//           ))
//         )}
//       </div>

//       {/* 🔹 Posts Section */}
//       <div className="card">
//         <div className="card-header">
//           <h3>Posts</h3>
//         </div>
//         {posts.length === 0 ? (
//           <p>No posts yet.</p>
//         ) : (
//           posts.map((post) => (
//             <PostCard
//               key={post.id}
//               post={post}
//               onDelete={handleDeletePost}
//               onEdit={handleEditPost}
//             />
//           ))
//         )}
//       </div>

//       {/* 🔹 Modals */}
//       {showForm && (
//         <ProfileUpdateForm
//           user={user}
//           token={token}
//           onClose={() => setShowForm(false)}
//           onUpdate={async () => await fetchUser()}
//         />
//       )}

//       {showEduForm && (
//         <EducationForm
//           userId={user.id}
//           token={token}
//           initialData={editEdu}
//           onClose={() => setShowEduForm(false)}
//           onSaved={async () => await fetchUser()}
//         />
//       )}

//       {showExpForm && (
//         <ExperienceForm
//           userId={user.id}
//           token={token}
//           initialData={editExp}
//           onClose={() => setShowExpForm(false)}
//           onSaved={async () => await fetchUser()}
//         />
//       )}
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom"; // ✅ import useParams
// import {
//   Box,
//   Avatar,
//   Typography,
//   Button,
//   Paper,
//   IconButton,
//   Tooltip,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import LocationOnIcon from "@mui/icons-material/LocationOn";

// import "./ProfilePage.css";
// import ProfileUpdateForm from "./ProfileUpdateForm";
// import EducationForm from "../EducationForm";
// import ExperienceForm from "../ExperienceForm";
// import { PostCard } from "../PostCard"; // ✅ Import PostCard

// export default function ProfilePage() {
//   const { username: paramUsername } = useParams(); // ✅ get username from URL
//   const [user, setUser] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [followers, setFollowers] = useState(0);
//   const [following, setFollowing] = useState(0);
//   const [isFollowing, setIsFollowing] = useState(false);

//   const [showForm, setShowForm] = useState(false);
//   const [showEduForm, setShowEduForm] = useState(false);
//   const [showExpForm, setShowExpForm] = useState(false);
//   const [editEdu, setEditEdu] = useState(null);
//   const [editExp, setEditExp] = useState(null);

//   const [hoveredExpId, setHoveredExpId] = useState(null); // ✅ track hovered experience
//   const [hoveredEduId, setHoveredEduId] = useState(null); // ✅ track hovered education

//   const localUsername = localStorage.getItem("username");
//   const token = localStorage.getItem("token");
//   const currentUserId = localStorage.getItem("userId"); // logged-in user

//   // ✅ Use paramUsername if provided, else fallback to localUsername
//   const targetUsername = paramUsername || localUsername;

//   // ✅ Fetch user profile
//   const fetchUser = async () => {
//     const res = await fetch(
//       `http://127.0.0.1:5000/api/users/${targetUsername}`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     const data = await res.json();
//     setUser(data.user);

//     // also fetch posts
//     fetchPosts(data.user.id);

//     // fetch followers/following counts
//     fetchFollowers(data.user.id);
//     fetchFollowing(data.user.id);

//     // check follow status
//     if (currentUserId && data.user.id) {
//       checkFollowStatus(currentUserId, data.user.id);
//     }
//   };

//   // ✅ Fetch user posts
//   const fetchPosts = async (userId) => {
//     try {
//       const res = await fetch(
//         `http://127.0.0.1:5000/api/posts/user/${userId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const data = await res.json();
//       setPosts(data.posts || data);
//     } catch (err) {
//       console.error("Error fetching posts:", err);
//     }
//   };

//   // ✅ Fetch followers
//   const fetchFollowers = async (userId) => {
//     const res = await fetch(
//       `http://127.0.0.1:5000/api/follows/followers/${userId}`
//     );
//     const data = await res.json();
//     setFollowers(data.length);
//   };

//   // ✅ Fetch following
//   const fetchFollowing = async (userId) => {
//     const res = await fetch(
//       `http://127.0.0.1:5000/api/follows/following/${userId}`
//     );
//     const data = await res.json();
//     setFollowing(data.length);
//   };

//   // ✅ Check if current user follows this profile
//   const checkFollowStatus = async (followerId, followingId) => {
//     try {
//       const res = await fetch(
//         `http://127.0.0.1:5000/api/follows/status/${followerId}/${followingId}`
//       );
//       const data = await res.json();
//       setIsFollowing(data.is_following);
//     } catch (err) {
//       console.error("Error checking follow status:", err);
//     }
//   };

//   // ✅ Toggle Follow
//   const toggleFollow = async () => {
//     if (!currentUserId || !user?.id) return;

//     try {
//       if (isFollowing) {
//         // Unfollow
//         await fetch(
//           `http://127.0.0.1:5000/api/follows/${currentUserId}/${user.id}`,
//           { method: "DELETE" }
//         );
//         setIsFollowing(false);
//         setFollowers((prev) => prev - 1);
//       } else {
//         // Follow (POST with body)
//         await fetch(`http://127.0.0.1:5000/api/follows/`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             follower_id: currentUserId,
//             following_id: user.id,
//           }),
//         });
//         setIsFollowing(true);
//         setFollowers((prev) => prev + 1);
//       }
//     } catch (err) {
//       console.error("Error toggling follow:", err);
//     }
//   };

//   useEffect(() => {
//     if (targetUsername && token) fetchUser();
//   }, [targetUsername, token]);

//   // ✅ Delete Experience
//   const handleDeleteExp = async (expId) => {
//     if (!window.confirm("Are you sure you want to delete this experience?"))
//       return;

//     try {
//       await fetch(`http://127.0.0.1:5000/api/users/experiences/${expId}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       await fetchUser();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ✅ Delete Education
//   const handleDeleteEdu = async (eduId) => {
//     if (!window.confirm("Are you sure you want to delete this education?"))
//       return;

//     try {
//       await fetch(`http://127.0.0.1:5000/api/users/educations/${eduId}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       await fetchUser();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ✅ Delete Post
//   const handleDeletePost = async (postId) => {
//     try {
//       await fetch(`http://127.0.0.1:5000/api/posts/${postId}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchPosts(user.id);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ✅ Edit Post
//   const handleEditPost = async (postId, updatedData) => {
//     try {
//       await fetch(`http://127.0.0.1:5000/api/posts/${postId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(updatedData),
//       });
//       fetchPosts(user.id);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!user) return <p>Loading...</p>;

//   return (
//     <div className="profile-page">
//       {/* 🔹 Header Section */}
//       <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden", mb: 3 }}>
//         <Box
//           sx={{
//             height: 200,
//             backgroundImage: `url(${
//               user.poster ||
//               "https://t4.ftcdn.net/jpg/06/55/94/89/360_F_655948989_AhcSgOCOoamYmH9fEMsOY857r0dfMpBI.jpg"
//             })`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             position: "relative",
//           }}
//         >
//           {currentUserId === String(user.id) && (
//             <IconButton
//               onClick={() => setShowForm(true)}
//               sx={{
//                 position: "absolute",
//                 top: 10,
//                 right: 10,
//                 bgcolor: "white",
//                 "&:hover": { bgcolor: "grey.200" },
//               }}
//             >
//               <EditIcon />
//             </IconButton>
//           )}
//         </Box>

//         {/* Profile Info */}
//         <Box sx={{ p: 3, pt: 0 }}>
//           <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
//             <Avatar
//               src={
//                 user.profilePicture ||
//                 "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
//               }
//               alt={user.name}
//               sx={{
//                 width: 120,
//                 height: 120,
//                 mt: -7,
//                 border: "4px solid white",
//                 boxShadow: 2,
//               }}
//             />

//             <Box sx={{ flexGrow: 1 }}>
//               <Typography variant="h5" fontWeight="bold">
//                 {user.name}
//               </Typography>
//               <Typography variant="body1" color="text.primary" sx={{ mt: 0.5 }}>
//                 {user.bio || "No bio yet"}
//               </Typography>
//               <Typography variant="subtitle1" color="text.secondary">
//                 {user.positions || "Add your title"}
//               </Typography>
//               <Box display="flex" alignItems="center" gap={1} mt={1}>
//                 <LocationOnIcon fontSize="small" color="action" />
//                 <Typography variant="body2" color="text.secondary">
//                   {user.city}, {user.country}
//                 </Typography>
//               </Box>
//               <Box display="flex" gap={3} mt={2}>
//                 <Typography variant="body2" fontWeight="bold">
//                   {followers} Followers
//                 </Typography>
//                 <Typography variant="body2" fontWeight="bold">
//                   {following} Following
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>

//           {/* Follow Button */}
//           {currentUserId && currentUserId !== String(user.id) && (
//             <Box mt={2}>
//               <Button
//                 variant={isFollowing ? "contained" : "outlined"}
//                 onClick={toggleFollow}
//                 sx={{
//                   borderRadius: 20,
//                   textTransform: "none",
//                   px: 3,
//                   bgcolor: isFollowing ? "primary.main" : "transparent",
//                   color: isFollowing ? "white" : "primary.main",
//                 }}
//               >
//                 {isFollowing ? "✔ Following" : "+ Follow"}
//               </Button>
//             </Box>
//           )}
//         </Box>
//       </Paper>

//       {/* 🔹 About Section */}
//       <div className="card">
//         <div className="card-header">
//           <h3>About</h3>
//         </div>
//         <p>{user.about || "No about info yet."}</p>
//       </div>

//       {/* 🔹 Experience Section */}
//       <div className="card">
//         <div className="card-header">
//           <h3>Experience</h3>
//           {currentUserId === String(user.id) && (
//             <Button
//               startIcon={<AddIcon />}
//               variant="contained"
//               size="small"
//               sx={{ borderRadius: 20, textTransform: "none" }}
//               onClick={() => {
//                 setEditExp(null);
//                 setShowExpForm(true);
//               }}
//             >
//               Add
//             </Button>
//           )}
//         </div>
//         {user.experiences?.length === 0 ? (
//           <p>No experience added</p>
//         ) : (
//           user.experiences.map((exp) => (
//             <div
//               key={exp.id}
//               className="exp-item"
//               onMouseEnter={() => setHoveredExpId(exp.id)}
//               onMouseLeave={() => setHoveredExpId(null)}
//             >
//               <Box display="flex" justifyContent="space-between">
//                 <Box>
//                   <h4>{exp.title || "Job Title"}</h4>
//                   <p className="company">{exp.company}</p>
//                   <p className="date">
//                     {exp.startDate?.slice(0, 7)} –{" "}
//                     {exp.endDate?.slice(0, 7) || "Present"}
//                   </p>
//                   <p className="desc">{exp.description}</p>
//                 </Box>

//                 {currentUserId === String(user.id) &&
//                   hoveredExpId === exp.id && ( // ✅ only show on hover
//                     <Box>
//                       <Tooltip title="Edit">
//                         <IconButton
//                           onClick={() => {
//                             setEditExp(exp);
//                             setShowExpForm(true);
//                           }}
//                         >
//                           <EditIcon fontSize="small" />
//                         </IconButton>
//                       </Tooltip>

//                       <Tooltip title="Delete">
//                         <IconButton
//                           color="error"
//                           onClick={() => handleDeleteExp(exp.id)}
//                         >
//                           <DeleteIcon fontSize="small" />
//                         </IconButton>
//                       </Tooltip>
//                     </Box>
//                   )}
//               </Box>
//             </div>
//           ))
//         )}
//       </div>

//       {/* 🔹 Education Section */}
//       <div className="card">
//         <div className="card-header">
//           <h3>Education</h3>
//           {currentUserId === String(user.id) && (
//             <Button
//               startIcon={<AddIcon />}
//               variant="contained"
//               size="small"
//               sx={{ borderRadius: 20, textTransform: "none" }}
//               onClick={() => {
//                 setEditEdu(null);
//                 setShowEduForm(true);
//               }}
//             >
//               Add
//             </Button>
//           )}
//         </div>
//         {user.educations?.length === 0 ? (
//           <p>No education added</p>
//         ) : (
//           user.educations.map((edu) => (
//             <div
//               key={edu.id}
//               className="edu-item"
//               onMouseEnter={() => setHoveredEduId(edu.id)}
//               onMouseLeave={() => setHoveredEduId(null)}
//             >
//               <Box display="flex" justifyContent="space-between">
//                 <Box>
//                   <h4>{edu.school}</h4>
//                   <p>
//                     {edu.degree} – {edu.fieldOfStudy}
//                   </p>
//                   <p className="date">
//                     {edu.startYear} – {edu.endYear || "Present"}
//                   </p>
//                 </Box>

//                 {currentUserId === String(user.id) &&
//                   hoveredEduId === edu.id && ( // ✅ only show on hover
//                     <Box>
//                       <Tooltip title="Edit">
//                         <IconButton
//                           onClick={() => {
//                             setEditEdu(edu);
//                             setShowEduForm(true);
//                           }}
//                         >
//                           <EditIcon fontSize="small" />
//                         </IconButton>
//                       </Tooltip>

//                       <Tooltip title="Delete">
//                         <IconButton
//                           color="error"
//                           onClick={() => handleDeleteEdu(edu.id)}
//                         >
//                           <DeleteIcon fontSize="small" />
//                         </IconButton>
//                       </Tooltip>
//                     </Box>
//                   )}
//               </Box>
//             </div>
//           ))
//         )}
//       </div>

//       {/* 🔹 Posts Section */}
//       <div className="card">
//         <div className="card-header">
//           <h3>Posts</h3>
//         </div>
//         {posts.length === 0 ? (
//           <p>No posts yet.</p>
//         ) : (
//           <Box
//             sx={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//               gap: 2,
//             }}
//           >
//             {posts.map((post) => (
//               <PostCard
//                 key={post.id}
//                 post={post}
//                 onDelete={
//                   currentUserId === String(user.id) ? handleDeletePost : null
//                 }
//                 onEdit={
//                   currentUserId === String(user.id) ? handleEditPost : null
//                 }
//               />
//             ))}
//           </Box>
//         )}
//       </div>

//       {/* 🔹 Modals */}
//       {showForm && (
//         <ProfileUpdateForm
//           user={user}
//           token={token}
//           onClose={() => setShowForm(false)}
//           onUpdate={async () => await fetchUser()}
//         />
//       )}

//       {showEduForm && (
//         <EducationForm
//           userId={user.id}
//           token={token}
//           initialData={editEdu}
//           onClose={() => setShowEduForm(false)}
//           onSaved={async () => await fetchUser()}
//         />
//       )}

//       {showExpForm && (
//         <ExperienceForm
//           userId={user.id}
//           token={token}
//           initialData={editExp}
//           onClose={() => setShowExpForm(false)}
//           onSaved={async () => await fetchUser()}
//         />
//       )}
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // ✅ import useParams
import {
  Box,
  Avatar,
  Typography,
  Button,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerifiedIcon from "@mui/icons-material/Verified"; // ✅ added verified icon

import "./ProfilePage.css";
import ProfileUpdateForm from "./ProfileUpdateForm";
import EducationForm from "../EducationForm";
import ExperienceForm from "../ExperienceForm";
import { PostCard } from "../PostCard"; // ✅ Import PostCard

export default function ProfilePage() {
  const { username: paramUsername } = useParams(); // ✅ get username from URL
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState(25);
  const [following, setFollowing] = useState(15);
  const [isFollowing, setIsFollowing] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [showEduForm, setShowEduForm] = useState(false);
  const [showExpForm, setShowExpForm] = useState(false);
  const [editEdu, setEditEdu] = useState(null);
  const [editExp, setEditExp] = useState(null);

  const [hoveredExpId, setHoveredExpId] = useState(null); // ✅ track hovered experience
  const [hoveredEduId, setHoveredEduId] = useState(null); // ✅ track hovered education

  const localUsername = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId"); // logged-in user

  // ✅ Use paramUsername if provided, else fallback to localUsername
  const targetUsername = paramUsername || localUsername;

  // ✅ Fetch user profile
  const fetchUser = async () => {
    const res = await fetch(
      `http://127.0.0.1:5000/api/users/${targetUsername}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    setUser(data.user);

    // also fetch posts
    fetchPosts(data.user.id);

    // fetch followers/following counts
    fetchFollowers(data.user.id);
    fetchFollowing(data.user.id);

    // check follow status
    if (currentUserId && data.user.id) {
      checkFollowStatus(currentUserId, data.user.id);
    }
  };

  // ✅ Fetch user posts
  const fetchPosts = async (userId) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/posts/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setPosts(data.posts || data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  // ✅ Fetch followers
  const fetchFollowers = async (userId) => {
    const res = await fetch(
      `http://127.0.0.1:5000/api/follows/followers/${userId}`
    );
    const data = await res.json();
    setFollowers(data.length);
  };

  // ✅ Fetch following
  const fetchFollowing = async (userId) => {
    const res = await fetch(
      `http://127.0.0.1:5000/api/follows/following/${userId}`
    );
    const data = await res.json();
    setFollowing(data.length);
  };

  // ✅ Check if current user follows this profile
  const checkFollowStatus = async (followerId, followingId) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/follows/status/${followerId}/${followingId}`
      );
      const data = await res.json();
      setIsFollowing(data.is_following);
    } catch (err) {
      console.error("Error checking follow status:", err);
    }
  };

  // ✅ Toggle Follow
  const toggleFollow = async () => {
    if (!currentUserId || !user?.id) return;

    try {
      if (isFollowing) {
        // Unfollow
        await fetch(
          `http://127.0.0.1:5000/api/follows/${currentUserId}/${user.id}`,
          { method: "DELETE" }
        );
        setIsFollowing(false);
        setFollowers((prev) => prev - 1);
      } else {
        // Follow (POST with body)
        await fetch(`http://127.0.0.1:5000/api/follows/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            follower_id: currentUserId,
            following_id: user.id,
          }),
        });
        setIsFollowing(true);
        setFollowers((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Error toggling follow:", err);
    }
  };

  useEffect(() => {
    if (targetUsername && token) fetchUser();
  }, [targetUsername, token]);

  // ✅ Delete Experience
  const handleDeleteExp = async (expId) => {
    if (!window.confirm("Are you sure you want to delete this experience?"))
      return;

    try {
      await fetch(`http://127.0.0.1:5000/api/users/experiences/${expId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchUser();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Delete Education
  const handleDeleteEdu = async (eduId) => {
    if (!window.confirm("Are you sure you want to delete this education?"))
      return;

    try {
      await fetch(`http://127.0.0.1:5000/api/users/educations/${eduId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchUser();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Delete Post
  const handleDeletePost = async (postId) => {
    try {
      await fetch(`http://127.0.0.1:5000/api/posts/${postId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts(user.id);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Edit Post
  const handleEditPost = async (postId, updatedData) => {
    try {
      await fetch(`http://127.0.0.1:5000/api/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
      fetchPosts(user.id);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      {/* 🔹 Header Section */}
      <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden", mb: 3 }}>
        <Box
          sx={{
            height: 200,
            backgroundImage: `url(${
              user.poster ||
              "https://t4.ftcdn.net/jpg/06/55/94/89/360_F_655948989_AhcSgOCOoamYmH9fEMsOY857r0dfMpBI.jpg"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          {currentUserId === String(user.id) && (
            <IconButton
              onClick={() => setShowForm(true)}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                bgcolor: "white",
                "&:hover": { bgcolor: "grey.200" },
              }}
            >
              <EditIcon />
            </IconButton>
          )}
        </Box>

        {/* Profile Info */}
        <Box sx={{ p: 3, pt: 0 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between", // ✅ avatar/info left, button right
            }}
          >
            {/* Left: Avatar + Info */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Avatar
                src={
                  user.profilePicture ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt={user.name}
                sx={{
                  width: 120,
                  height: 120,
                  mt: -7,
                  border: "4px solid white",
                  boxShadow: 2,
                }}
              />

              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  {user.name}
                  {user.role === "MENTOR" && (
                    <VerifiedIcon sx={{ fontSize: 22, color: "green" }} />
                  )}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ mt: 0.5 }}
                >
                  {user.bio || "No bio yet"}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {user.positions || "Add your title"}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <LocationOnIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {user.city}, {user.country}
                  </Typography>
                </Box>
                <Box display="flex" gap={3} mt={2}>
                  <Typography variant="body2" fontWeight="bold">
                    {followers} Followers
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {following} Following
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Right: Follow Button */}
            {currentUserId && currentUserId !== String(user.id) && (
              <Button
                variant={isFollowing ? "contained" : "outlined"}
                onClick={toggleFollow}
                sx={{
                  borderRadius: 20,
                  textTransform: "none",
                  px: 3,
                  bgcolor: isFollowing ? "primary.main" : "transparent",
                  color: isFollowing ? "white" : "primary.main",
                  height: 40,
                  mt: 1,
                }}
              >
                {isFollowing ? "✔ Following" : "+ Follow"}
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      {/* 🔹 About Section */}
      <div className="card">
        <div className="card-header">
          <h3>About</h3>
        </div>
        <p>{user.about || "No about info yet."}</p>
      </div>

      {/* 🔹 Experience Section */}
      {/* ... (unchanged code below) ... */}

      <div className="card">
        <div className="card-header">
          <h3>Experience</h3>
          {currentUserId === String(user.id) && (
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              size="small"
              sx={{ borderRadius: 20, textTransform: "none" }}
              onClick={() => {
                setEditExp(null);
                setShowExpForm(true);
              }}
            >
              Add
            </Button>
          )}
        </div>
        {user.experiences?.length === 0 ? (
          <p>No experience added</p>
        ) : (
          user.experiences.map((exp) => (
            <div
              key={exp.id}
              className="exp-item"
              onMouseEnter={() => setHoveredExpId(exp.id)}
              onMouseLeave={() => setHoveredExpId(null)}
            >
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <h4>{exp.title || "Job Title"}</h4>
                  <p className="company">{exp.company}</p>
                  <p className="date">
                    {exp.startDate?.slice(0, 7)} –{" "}
                    {exp.endDate?.slice(0, 7) || "Present"}
                  </p>
                  <p className="desc">{exp.description}</p>
                </Box>

                {currentUserId === String(user.id) &&
                  hoveredExpId === exp.id && (
                    <Box>
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={() => {
                            setEditExp(exp);
                            setShowExpForm(true);
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteExp(exp.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
              </Box>
            </div>
          ))
        )}
      </div>

      {/* 🔹 Education Section */}
      <div className="card">
        <div className="card-header">
          <h3>Education</h3>
          {currentUserId === String(user.id) && (
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              size="small"
              sx={{ borderRadius: 20, textTransform: "none" }}
              onClick={() => {
                setEditEdu(null);
                setShowEduForm(true);
              }}
            >
              Add
            </Button>
          )}
        </div>
        {user.educations?.length === 0 ? (
          <p>No education added</p>
        ) : (
          user.educations.map((edu) => (
            <div
              key={edu.id}
              className="edu-item"
              onMouseEnter={() => setHoveredEduId(edu.id)}
              onMouseLeave={() => setHoveredEduId(null)}
            >
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <h4>{edu.school}</h4>
                  <p>
                    {edu.degree} – {edu.fieldOfStudy}
                  </p>
                  <p className="date">
                    {edu.startYear} – {edu.endYear || "Present"}
                  </p>
                </Box>

                {currentUserId === String(user.id) &&
                  hoveredEduId === edu.id && (
                    <Box>
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={() => {
                            setEditEdu(edu);
                            setShowEduForm(true);
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteEdu(edu.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
              </Box>
            </div>
          ))
        )}
      </div>

      {/* 🔹 Posts Section */}
      <div className="card">
        <div className="card-header">
          <h3>Posts</h3>
        </div>
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 2,
            }}
          >
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onDelete={
                  currentUserId === String(user.id) ? handleDeletePost : null
                }
                onEdit={
                  currentUserId === String(user.id) ? handleEditPost : null
                }
              />
            ))}
          </Box>
        )}
      </div>

      {/* 🔹 Modals */}
      {showForm && (
        <ProfileUpdateForm
          user={user}
          token={token}
          onClose={() => setShowForm(false)}
          onUpdate={async () => await fetchUser()}
        />
      )}

      {showEduForm && (
        <EducationForm
          userId={user.id}
          token={token}
          initialData={editEdu}
          onClose={() => setShowEduForm(false)}
          onSaved={async () => await fetchUser()}
        />
      )}

      {showExpForm && (
        <ExperienceForm
          userId={user.id}
          token={token}
          initialData={editExp}
          onClose={() => setShowExpForm(false)}
          onSaved={async () => await fetchUser()}
        />
      )}
    </div>
  );
}
