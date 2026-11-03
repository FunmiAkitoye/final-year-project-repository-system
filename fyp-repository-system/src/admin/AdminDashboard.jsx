function AdminDashboard({
  studentData = {},
  repositoryProjects = [],
  users = [],
  onNavigate = () => {},
}) {
  const students = users.filter(
    (user) => user.role === "student"
  );

  const supervisors = users.filter(
    (user) => user.role === "supervisor"
  );

  const totalStudents = students.length;

  const totalSupervisors = supervisors.length;

  const totalStudentProjects =
    Object.values(studentData).filter(
      (student) =>
        student?.projectTitle &&
        student.projectTitle.trim() !== ""
    ).length;

  const totalProjects =
    totalStudentProjects + repositoryProjects.length;

  const repositoryCount =
    repositoryProjects.length;

  const totalDocuments =
    Object.values(studentData).reduce(
      (total, student) =>
        total +
        (student?.documents?.length || 0),
      0
    );

  return (
    <div className="dashboard-page">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="page-header">
        <div>
          <p className="page-eyebrow">
            ADMINISTRATOR
          </p>

          <h1>Dashboard</h1>

          <p>
            Manage users, projects,
            submissions and the project
            repository.
          </p>
        </div>
      </div>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-icon">
            👨‍🎓
          </div>

          <div>
            <span>Total Students</span>

            <strong>
              {totalStudents}
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon">
            👨‍🏫
          </div>

          <div>
            <span>Total Supervisors</span>

            <strong>
              {totalSupervisors}
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon">
            📚
          </div>

          <div>
            <span>Total Projects</span>

            <strong>
              {totalProjects}
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon">
            🗂️
          </div>

          <div>
            <span>Repository Projects</span>

            <strong>
              {repositoryCount}
            </strong>
          </div>
        </div>
      </div>

      {/* =====================================================
          ADDITIONAL STATISTICS
      ===================================================== */}

      <div className="dashboard-grid">
        <section className="dashboard-card">
          <div className="dashboard-card-header">
            <div>
              <h2>Documents</h2>

              <p>
                Total documents submitted
                by students.
              </p>
            </div>
          </div>

          <div className="admin-large-number">
            {totalDocuments}
          </div>
        </section>

        <section className="dashboard-card">
          <div className="dashboard-card-header">
            <div>
              <h2>Approved Projects</h2>

              <p>
                Projects currently available
                in the repository.
              </p>
            </div>
          </div>

          <div className="admin-large-number">
            {repositoryCount}
          </div>
        </section>
      </div>

      {/* =====================================================
          MAIN DASHBOARD CONTENT
      ===================================================== */}

      <div className="dashboard-grid">

        {/* Recent Activity */}

        <section className="dashboard-card">
          <div className="dashboard-card-header">
            <div>
              <h2>Recent Activity</h2>

              <p>
                Recent activity across the
                system.
              </p>
            </div>
          </div>

          <div className="activity-list">

            <div className="activity-item">
              <div className="activity-icon">
                📄
              </div>

              <div>
                <strong>
                  Project submissions
                </strong>

                <span>
                  Recent student project
                  activity
                </span>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon">
                👤
              </div>

              <div>
                <strong>
                  User management
                </strong>

                <span>
                  Student and supervisor
                  accounts
                </span>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon">
                🗃️
              </div>

              <div>
                <strong>
                  Repository
                </strong>

                <span>
                  Approved projects available
                  in the repository
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* Quick Actions */}

        <section className="dashboard-card">
          <div className="dashboard-card-header">
            <div>
              <h2>Quick Actions</h2>

              <p>
                Common administrator tasks.
              </p>
            </div>
          </div>

          <div className="quick-actions">

            <button type="button" onClick={() => onNavigate("admin-users")}>
              <span>👥</span>
              Manage Users
            </button>

            <button type="button" onClick={() => onNavigate("admin-projects")}>
              <span>📁</span>
              View Projects
            </button>

            <button type="button" onClick={() => onNavigate("admin-historical")}>
              <span>➕</span>
              Add Historical Project
            </button>

            <button type="button" onClick={() => onNavigate("admin-repository")}>
              <span>🗂️</span>
              View Repository
            </button>

          </div>
        </section>

      </div>

      {/* =====================================================
          ADMINISTRATOR OVERVIEW
      ===================================================== */}

      <section className="dashboard-card admin-overview-card">

        <div className="dashboard-card-header">
          <div>
            <h2>
              Administrator Overview
            </h2>

            <p>
              The administrator manages
              the academic project system
              and repository.
            </p>
          </div>
        </div>

        <div className="admin-responsibilities">

          <div>
            <strong>
              User Management
            </strong>

            <span>
              Manage student and supervisor
              accounts, including account
              status and information.
            </span>
          </div>

          <div>
            <strong>
              Project Management
            </strong>

            <span>
              Monitor project records and
              manage historical project
              submissions.
            </span>
          </div>

          <div>
            <strong>
              Repository Management
            </strong>

            <span>
              Maintain approved projects
              and make authorized project
              records searchable.
            </span>
          </div>

        </div>

      </section>
    </div>
  );
}

export default AdminDashboard;
