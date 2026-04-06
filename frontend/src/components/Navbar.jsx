function Navbar({ user, onAddClick, onLogout }) {
    return (
        <div className="navbar">
            <div className="navbar-left">
                <h2>Job Tracker Lite</h2>
            </div>

            <div className="navbar-right">
                <span className="welcome-text">
                    {user ? `Welcome, ☺️ ${user.fullName}` : "Welcome"}
                </span>
                <button className="secondary-btn" onClick={onAddClick}>
                    Add application
                </button>
                <button className="logout-btn" onClick={onLogout}>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Navbar;