import "./ProfileCard.css";
export function ProfileCard({ user }) {
  return (
    <div className="profile-card">
      {/* Cover Image */}
      <div className="cover"></div>

      {/* Profile Info */}
      <div className="profile-info">
        <img
          src={user.profilePicture || "/images/default-avatar.png"}
          alt={user.name}
          className="profile-avatar"
        />
        <h3>{user.name}</h3>
        <p className="role">comunity member</p>
        <p className="location">chennai</p>
      </div>

      {/* Connections */}
      <div className="connections">
        <p>Followers</p>
        <span>{user.followers || 0}</span>
      </div>

      {/* Links */}
      <div className="links">
        <p>📑 Saved items</p>
        <p>👥 Groups</p>
        <p>📰 Newsletters</p>
        <p>📅 Events</p>
      </div>
    </div>
  );
}
