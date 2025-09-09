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
        <h3>VV TEXTILES</h3>
        <p className="role">sarees manufacturer</p>
        <p className="location">Salem, Tamil Nadu</p>
      </div>

      {/* Connections */}
      <div className="connections">
        <p>Connections</p>
        <span>6</span>
        <small>Connect with alumni</small>
      </div>

      {/* Premium */}
      <div className="premium">
        <p>Access exclusive tools & insights</p>
        <strong>Try Premium for ₹0</strong>
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
