// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import GroupIcon from "@mui/icons-material/Group";
// import BookmarkIcon from "@mui/icons-material/Bookmark";
// import "./ProfileCard.css";

// export function ProfileCard() {
//   const [updatedUser, setUpdatedUser] = useState(null);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const username = localStorage.getItem("username");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch(
//           `http://127.0.0.1:5000/api/users/${username}`,
//           {
//             method: "GET",
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         if (!response.ok) throw new Error("Failed to fetch user");
//         const data = await response.json();
//         setUpdatedUser(data.user);
//       } catch (error) {
//         setMessage("❌ " + error.message);
//       }
//     };

//     if (username && token) fetchUser();
//   }, [username, token]);

//   if (!updatedUser) return <p>Loading profile...</p>;

//   const goToProfilePage = () => {
//     navigate(`/profile`);
//   };

//   return (
//     <div className="profile-card">
//       {/* Cover */}
//       <div
//         className="cover"
//         style={{
//           backgroundImage: `url(${
//             updatedUser.poster ||
//             "https://static.vecteezy.com/system/resources/thumbnails/025/220/386/small/blue-gradient-blur-abstract-background-vector.jpg"
//           })`,
//         }}
//       ></div>

//       {/* Info */}
//       <div className="profile-info">
//         <img
//           src={
//             updatedUser.profilePicture ||
//             "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//           }
//           alt={updatedUser.name}
//           className="profile-avatar"
//           onClick={goToProfilePage}
//         />
//         <h3 className="profile-name" onClick={goToProfilePage}>
//           {updatedUser.name}
//         </h3>
//         <p className="role">{updatedUser.positions || ""}</p>
//         <p className="bio">{updatedUser.bio || "No bio added yet."}</p>
//         <p className="location">
//           {`${updatedUser.city || ""}, ${updatedUser.country || ""}`}
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="profile-stats">
//         <div className="stat-item">
//           <GroupIcon fontSize="small" sx={{ color: "#1976d2" }} />
//           <span>{updatedUser.followers || 0} Followers</span>
//         </div>
//         <div className="stat-item">
//           <BookmarkIcon fontSize="small" sx={{ color: "#1976d2" }} />
//           <span>Saved items</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import GroupIcon from "@mui/icons-material/Group";
// import BookmarkIcon from "@mui/icons-material/Bookmark";
// import "./ProfileCard.css";

// export function ProfileCard() {
//   const [updatedUser, setUpdatedUser] = useState(null);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const username = localStorage.getItem("username");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch(
//           `http://127.0.0.1:5000/api/users/${username}`,
//           {
//             method: "GET",
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         if (!response.ok) throw new Error("Failed to fetch user");
//         const data = await response.json();
//         setUpdatedUser(data.user);
//       } catch (error) {
//         setMessage("❌ " + error.message);
//       }
//     };

//     if (username && token) fetchUser();
//   }, [username, token]);

//   if (!updatedUser) return <p>Loading profile...</p>;

//   const goToProfilePage = () => navigate(`/profile`);
//   const goToSavedPosts = () => navigate(`/saved`);

//   return (
//     <div className="profile-card">
//       {/* Cover */}
//       <div
//         className="cover"
//         style={{
//           backgroundImage: `url(${
//             updatedUser.poster ||
//             "https://t4.ftcdn.net/jpg/06/55/94/89/360_F_655948989_AhcSgOCOoamYmH9fEMsOY857r0dfMpBI.jpg"
//           })`,
//         }}
//       ></div>

//       {/* Info */}
//       <div className="profile-info">
//         <img
//           src={
//             updatedUser.profilePicture ||
//             "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
//           }
//           alt={updatedUser.name}
//           className="profile-avatar"
//           onClick={goToProfilePage}
//         />
//         <h3 className="profile-name" onClick={goToProfilePage}>
//           {updatedUser.name}
//         </h3>
//         <p className="role">{updatedUser.positions || ""}</p>
//         <p className="bio">{updatedUser.bio || "No bio added yet."}</p>
//         <p className="location">
//           {`${updatedUser.city || ""}, ${updatedUser.country || ""}`}
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="profile-stats">
//         <div className="stat-item">
//           <GroupIcon fontSize="small" sx={{ color: "#1976d2" }} />
//           <span>{updatedUser.followers || 0} Followers</span>
//         </div>
//         <div
//           className="stat-item"
//           onClick={goToSavedPosts}
//           style={{ cursor: "pointer" }}
//         >
//           <BookmarkIcon fontSize="small" sx={{ color: "#1976d2" }} />
//           <span>Saved items</span>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import VerifiedIcon from "@mui/icons-material/Verified"; // ✅ add verified icon
import "./ProfileCard.css";

export function ProfileCard() {
  const [updatedUser, setUpdatedUser] = useState(null);
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  const [savedCount, setSavedCount] = useState(0);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  // ✅ Fetch user profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/users/${username}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch user");
        const data = await response.json();
        setUpdatedUser(data.user);

        // also fetch stats
        fetchFollowers(data.user.id);
        fetchFollowing(data.user.id);
        fetchSaved(data.user.id);
      } catch (error) {
        setMessage("❌ " + error.message);
      }
    };

    if (username && token) fetchUser();
  }, [username, token]);

  // ✅ Fetch followers count
  const fetchFollowers = async (id) => {
    const res = await fetch(
      `http://127.0.0.1:5000/api/follows/followers/${id}`
    );
    if (res.ok) {
      const data = await res.json();
      setFollowers(data.length);
    }
  };

  // ✅ Fetch following count
  const fetchFollowing = async (id) => {
    const res = await fetch(
      `http://127.0.0.1:5000/api/follows/following/${id}`
    );
    if (res.ok) {
      const data = await res.json();
      setFollowing(data.length);
    }
  };

  // ✅ Fetch saved posts count
  const fetchSaved = async (id) => {
    const res = await fetch(`http://127.0.0.1:5000/api/saved-posts/user/${id}`);
    if (res.ok) {
      const data = await res.json();
      setSavedCount(data.length);
    }
  };

  if (!updatedUser) return <p>Loading profile...</p>;

  const goToProfilePage = () => navigate(`/profile`);
  const goToSavedPosts = () => navigate(`/saved`);
  const goToFollowers = () => navigate(`/followers/${updatedUser.id}`);
  const goToFollowing = () => navigate(`/following/${updatedUser.id}`);

  return (
    <div className="profile-card">
      {/* Cover */}
      <div
        className="cover"
        style={{
          backgroundImage: `url(${
            updatedUser.poster ||
            "https://t4.ftcdn.net/jpg/06/55/94/89/360_F_655948989_AhcSgOCOoamYmH9fEMsOY857r0dfMpBI.jpg"
          })`,
        }}
      ></div>

      {/* Info */}
      <div className="profile-info">
        <img
          src={
            updatedUser.profilePicture ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt={updatedUser.name}
          className="profile-avatar"
          onClick={goToProfilePage}
        />

        <h3 className="profile-name" onClick={goToProfilePage}>
          {updatedUser.name}
          {updatedUser.role === "MENTOR" && (
            <VerifiedIcon
              sx={{ fontSize: 20, color: "#1df24bc4", marginLeft: "5px" }}
            />
          )}
        </h3>

        <p className="role">{updatedUser.positions || ""}</p>
        <p className="bio">{updatedUser.bio || "No bio added yet."}</p>
        <p className="location">
          {`${updatedUser.city || ""}, ${updatedUser.country || ""}`}
        </p>
      </div>

      {/* Stats */}
      <div className="profile-stats">
        <div
          className="stat-item"
          onClick={goToFollowers}
          style={{ cursor: "pointer" }}
        >
          <GroupIcon fontSize="small" sx={{ color: "#1976d2" }} />
          <span>{followers} Followers</span>
        </div>

        <div
          className="stat-item"
          onClick={goToFollowing}
          style={{ cursor: "pointer" }}
        >
          <GroupIcon fontSize="small" sx={{ color: "#1976d2" }} />
          <span>{following} Following</span>
        </div>

        <div
          className="stat-item"
          onClick={goToSavedPosts}
          style={{ cursor: "pointer" }}
        >
          <BookmarkIcon fontSize="small" sx={{ color: "#1976d2" }} />
          <span>{savedCount} Saved</span>
        </div>
      </div>
    </div>
  );
}
