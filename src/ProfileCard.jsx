import "./ProfileCard.css";

export function ProfileCard() {
  return (
    <div className="profile-card">
      {/* Cover Image */}
      <div className="cover"></div>

      {/* Profile Info */}
      <div className="profile-info">
        <img
          src="https://pbs.twimg.com/media/Eklq-xfVgAA3ql8.jpg"
          alt="profile"
          className="profile-avatar"
        />
        <h3>JOEDHIKA</h3>
        <p className="role">Python developer</p>
        <p className="location">Salem, Tamil Nadu</p>
      </div>

      {/* Connections */}
      <div className="connections">
        <p>Followers</p>
        <span>6</span>
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
