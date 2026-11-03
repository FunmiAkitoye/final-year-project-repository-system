function AdminLayout({
  currentUser,
  page,
  setPage,
  logout,
  children,
}) {
  return (
    <div className="app-shell">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="sidebar">

        {/* BRAND */}

        <div className="sidebar-brand">

          <img
            src="/baze.jpeg"
            alt="Baze University"
            className="sidebar-logo"
          />

          <div>
            <strong>
              FYP Repository
            </strong>

            <span>
              Administrator
            </span>
          </div>

        </div>

        {/* NAVIGATION */}

        <nav className="sidebar-nav">

          <button
            type="button"
            className={`sidebar-link ${
              page === "admin"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setPage("admin")
            }
          >
            <span>⌂</span>
            Dashboard
          </button>

          <div className="admin-nav-label">
            USER MANAGEMENT
          </div>

          <button
            type="button"
            className={`sidebar-link ${
              page === "admin-users" || page === "admin-students" || page === "admin-supervisors"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setPage("admin-users")
            }
          >
            <span>♙</span>
            Students & Supervisors
          </button>

          <div className="admin-nav-label">
            PROJECT MANAGEMENT
          </div>

          <button
            type="button"
            className={`sidebar-link ${
              page === "admin-projects"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setPage("admin-projects")
            }
          >
            <span>▣</span>
            All Projects
          </button>

          <button
            type="button"
            className={`sidebar-link ${
              page === "admin-historical"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setPage("admin-historical")
            }
          >
            <span>＋</span>
            Add Historical Project
          </button>

          <div className="admin-nav-label">
            REPOSITORY
          </div>

          <button
            type="button"
            className={`sidebar-link ${
              page === "admin-repository"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setPage("admin-repository")
            }
          >
            <span>▤</span>
            Repository
          </button>

          <button
            type="button"
            className={`sidebar-link ${
              page === "admin-submissions"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setPage("admin-submissions")
            }
          >
            <span>▣</span>
            Submissions
          </button>

          <button
            type="button"
            className={`sidebar-link ${
              page === "admin-notifications"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setPage("admin-notifications")
            }
          >
            <span>♢</span>
            Notifications
          </button>

        </nav>

        {/* ===================================================
            USER / LOGOUT
        =================================================== */}

        <div className="sidebar-bottom">

          <div className="sidebar-user">

            <div className="sidebar-avatar">
              {currentUser?.name
                ?.charAt(0)
                ?.toUpperCase() || "A"}
            </div>

            <div>
              <strong>
                {currentUser?.name ||
                  "Administrator"}
              </strong>

              <span>
                Administrator
              </span>
            </div>

          </div>

          <button
            className="logout-button"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </aside>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="main-content">
        {children}
      </main>

    </div>
  );
}

export default AdminLayout;
