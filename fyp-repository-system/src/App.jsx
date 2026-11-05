import { useEffect, useMemo, useState } from "react";
import "./App.css";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";

/* =========================================================
   CONSTANTS
========================================================= */

const DEMO_PASSWORD = "123456";

const EMAILS = {
  funmi: "funmi@student.bazeuniversity.edu.ng",
  amina: "amina@student.bazeuniversity.edu.ng",
  david: "david@student.bazeuniversity.edu.ng",
  supervisor: "supervisor@bazeuniversity.edu.ng",
  admin: "admin@bazeuniversity.edu.ng",
};

const PROJECT_CATEGORIES = [
  "Web Development",
  "Mobile Application",
  "Information Systems",
  "Health Technology",
  "Cybersecurity",
  "Artificial Intelligence",
  "Human-Computer Interaction",
  "Database Systems",
  "Software Engineering",
  "Other",
];

/* =========================================================
   DEMO USERS
========================================================= */

const demoUsers = [
  {
    email: EMAILS.funmi,
    password: DEMO_PASSWORD,
    name: "Funmi Akitoye",
    role: "student",
    department: "Computer Science",
  },
  {
    email: EMAILS.amina,
    password: DEMO_PASSWORD,
    name: "Amina Bello",
    role: "student",
    department: "Computer Science",
  },
  {
    email: EMAILS.david,
    password: DEMO_PASSWORD,
    name: "David Okafor",
    role: "student",
    department: "Computer Science",
  },
  {
    email: EMAILS.supervisor,
    password: DEMO_PASSWORD,
    name: "Mr. Nurudeen Jibrin",
    role: "supervisor",
    department: "Computer Science",
  },
  {
    email: EMAILS.admin,
    password: DEMO_PASSWORD,
    name: "System Administrator",
    role: "admin",
    department: "Computer Science",
  },
];

/* =========================================================
   INITIAL STUDENT DATA
========================================================= */

const initialStudentData = {
  [EMAILS.funmi]: {
    matricNo: "BU/CS/20/001",
    level: "400 Level",
    department: "Computer Science",
    supervisor: "Mr. Nurudeen Jibrin",
    projectTitle: "Final Year Project Repository System",
    category: "Web Development",
    topicStatus: "Approved",
    progress: 75,

    documents: [
      {
        id: "funmi-doc-1",
        name: "Chapter 1 - Introduction.pdf",
        type: "PDF",
        version: "1.0",
        submittedAt: "2026-09-28",
        status: "Approved",
        feedback: "Good work. Continue with Chapter 2.",
        fileUrl: "",
        description: "",
        category: "Web Development",
      },
      {
        id: "funmi-doc-2",
        name: "Chapter 2 - Literature Review.pdf",
        type: "PDF",
        version: "1.0",
        submittedAt: "2026-10-01",
        status: "Pending Review",
        feedback: "",
        fileUrl: "",
        description: "",
        category: "Web Development",
      },
    ],

    notifications: [
      {
        id: 1,
        message:
          "Your Chapter 2 submission is awaiting supervisor review.",
        time: "Today",
        unread: true,
      },
      {
        id: 2,
        message: "Your Chapter 1 submission was approved.",
        time: "2 days ago",
        unread: false,
      },
    ],
  },

  [EMAILS.amina]: {
    matricNo: "BU/CS/20/014",
    level: "400 Level",
    department: "Computer Science",
    supervisor: "Mr Nurudeen Jibrin",
    projectTitle: "Student Attendance Management System",
    category: "Information Systems",
    topicStatus: "Not Submitted",
    progress: 5,

    documents: [],

    notifications: [
      {
        id: "amina-welcome",
        message:
          "Welcome to the Final Year Project Repository System.",
        time: "Today",
        unread: true,
      },
    ],
  },

  [EMAILS.david]: {
    matricNo: "BU/CS/20/027",
    level: "400 Level",
    department: "Computer Science",
    supervisor: "Mr Nurudeen Jibri",
    projectTitle: "Hospital Appointment Management System",
    category: "Health Technology",
    topicStatus: "Pending Review",
    progress: 25,

    documents: [],

    notifications: [
      {
        id: "david-topic",
        message:
          "Your project topic is currently awaiting supervisor review.",
        time: "Today",
        unread: true,
      },
    ],
  },
};

/* =========================================================
   INITIAL REPOSITORY PROJECTS
========================================================= */

const initialRepositoryProjects = [
  {
    id: 1,
    title: "Final Year Project Repository System",
    topic:
      "Design and Implementation of a Final Year Project Repository System",
    category: "Web Development",
    department: "Computer Science",
    author: "Funmi Akitoye",
    authorEmail: EMAILS.funmi,
    year: 2026,
    supervisor: "Mr Nurudeen Jibri",
    status: "Approved",
    description:
      "A web-based platform for managing, submitting, reviewing and retrieving final-year project documents.",
    documentId: "funmi-doc-1",
  },

  {
    id: 2,
    title: "Hospital Appointment Management System",
    topic:
      "Design and Implementation of a Hospital Appointment Management System",
    category: "Health Technology",
    department: "Computer Science",
    author: "David Okafor",
    authorEmail: EMAILS.david,
    year: 2025,
    supervisor: "Mr Nurudeen Jibri",
    status: "Approved",
    description:
      "A system for managing hospital appointments and improving communication between patients and healthcare providers.",
    documentId: null,
  },

  {
    id: 3,
    title: "Student Attendance Management System",
    topic:
      "Development of a Student Attendance Management System",
    category: "Information Systems",
    department: "Computer Science",
    author: "Amina Bello",
    authorEmail: EMAILS.amina,
    year: 2025,
    supervisor: "Mr Nurudeen Jibria",
    status: "Approved",
    description:
      "A digital system for recording, monitoring and managing student attendance.",
    documentId: null,
  },

  {
    id: 4,
    title: "Online Student Help Desk",
    topic:
      "Development of an Online Student IT Help Desk",
    category: "Information Systems",
    department: "Computer Science",
    author: "Sarah Ibrahim",
    year: 2024,
    supervisor: "Mr Nurudeen Jibrin ",
    status: "Approved",
    description:
      "A web-based help desk for students to submit and track technical support requests.",
    documentId: null,
  },

  {
    id: 5,
    title: "E-Library Management System",
    topic:
      "Design and Implementation of an Electronic Library Management System",
    category: "Web Development",
    department: "Computer Science",
    author: "John Samuel",
    year: 2024,
    supervisor: "Dr. Yusuf",
    status: "Approved",
    description:
      "An electronic library system for managing academic resources and student access.",
    documentId: null,
  },
];

/* =========================================================
   HELPERS
========================================================= */

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

/* =========================================================
   APP
========================================================= */


function App() {
  const [page, setPage] = useState("login");
  const [role, setRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const [studentData, setStudentData] =
    useState(initialStudentData);

  const [repositoryProjects, setRepositoryProjects] =
    useState(initialRepositoryProjects);

  const [toast, setToast] = useState("");
  const [popup, setPopup] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const showPopup = (type, title, message) => {
    setPopup({ type, title, message });
  };

  const closePopup = () => {
    setPopup(null);
  };

  const logout = () => {
    setCurrentUser(null);
    setRole(null);
    setPage("login");
    setSelectedReview(null);
    setPopup(null);
  };

  const currentStudent =
    currentUser?.role === "student"
      ? studentData[normalizeEmail(currentUser.email)] || null
      : null;

  const updateStudentData = (email, updates) => {
    const normalizedEmail = normalizeEmail(email);

    setStudentData((prev) => {
      const existingStudent = prev[normalizedEmail];

      if (!existingStudent) return prev;

      return {
        ...prev,
        [normalizedEmail]: {
          ...existingStudent,
          ...updates,
        },
      };
    });
  };

  const submitTopic = (topicData) => {
    if (currentUser?.role !== "student") {
      showPopup(
        "error",
        "Submission Failed",
        "You must be logged in as a student to submit a project topic."
      );
      return;
    }

    const email = normalizeEmail(currentUser.email);
    const student = studentData[email];

    if (!student) {
      showPopup(
        "error",
        "Submission Failed",
        "Your student record could not be found."
      );
      return;
    }

    updateStudentData(email, {
      projectTitle: topicData.title,
      category: topicData.category,
      abstract: topicData.abstract,
      objectives: topicData.objectives,
      topicStatus: "Pending Review",
      progress: Math.max(student.progress || 0, 20),
      notifications: [
        ...(student.notifications || []),
        {
          id: Date.now(),
          message:
            "Your project topic has been submitted successfully and is awaiting supervisor review.",
          time: "Just now",
          unread: true,
        },
      ],
    });

    showPopup(
      "success",
      "Topic Submitted Successfully",
      "Your project topic has been submitted to your assigned supervisor for review."
    );

    setPage("dashboard");
  };

  const submitDocument = (documentData) => {
    if (currentUser?.role !== "student") {
      showPopup(
        "error",
        "Submission Failed",
        "You must be logged in as a student to submit a document."
      );
      return;
    }

    const email = normalizeEmail(currentUser.email);
    const student = studentData[email];

    if (!student) {
      showPopup(
        "error",
        "Submission Failed",
        "Your student record could not be found."
      );
      return;
    }

    if (!documentData.version?.trim()) {
      showPopup(
        "error",
        "Version Required",
        "Please enter a version number for this document."
      );
      return;
    }

    const newDocument = {
      id: `${email}-${Date.now()}`,
      name: documentData.name,
      type: documentData.type,
      version: documentData.version.trim(),
      submittedAt: new Date().toISOString().split("T")[0],
      status: "Pending Review",
      feedback: "",
      fileUrl: documentData.fileUrl || "",
      description: documentData.description || "",
      category: documentData.category || student.category,
      categoryOther: documentData.categoryOther || "",
    };

    setStudentData((prev) => {
      const record = prev[email];

      if (!record) return prev;

      return {
        ...prev,
        [email]: {
          ...record,
          documents: [
            ...(record.documents || []),
            newDocument,
          ],
          progress: Math.max(record.progress || 0, 40),
          notifications: [
            ...(record.notifications || []),
            {
              id: Date.now() + 1,
              message: `${newDocument.name} has been submitted successfully and is awaiting supervisor review.`,
              time: "Just now",
              unread: true,
            },
          ],
        },
      };
    });

    showPopup(
      "success",
      "Document Submitted Successfully",
      `${newDocument.name} version ${newDocument.version} has been submitted for supervisor review.`
    );

    setPage("submissions");
  };

  const handleSupervisorReview = (
    studentEmail,
    documentId,
    feedback,
    status,
    decision
  ) => {
    const email = normalizeEmail(studentEmail);
    const student = studentData[email];

    if (!student) {
      showToast("Student record could not be found.");
      return;
    }

    const document = (student.documents || []).find(
      (item) => item.id === documentId
    );

    if (!document) {
      showToast("Document could not be found.");
      return;
    }

    const finalStatus =
      decision === "Approved"
        ? "Approved"
        : status || "Reviewed";

    const studentName =
      demoUsers.find(
        (user) => normalizeEmail(user.email) === email
      )?.name || "Student";

    setStudentData((prev) => {
      const record = prev[email];

      if (!record) return prev;

      const updatedDocuments = (
        record.documents || []
      ).map((item) =>
        item.id === documentId
          ? {
              ...item,
              status: finalStatus,
              feedback: feedback || "",
            }
          : item
      );

      const updatedProgress =
        finalStatus === "Approved"
          ? 100
          : Math.max(record.progress || 0, 60);

      const notificationMessage =
        finalStatus === "Approved"
          ? `${document.name} has been approved by your supervisor.`
          : finalStatus === "Request Corrections"
          ? `Corrections have been requested for ${document.name}.`
          : `Your supervisor has provided feedback on ${document.name}.`;

      return {
        ...prev,
        [email]: {
          ...record,
          documents: updatedDocuments,
          progress: updatedProgress,
          notifications: [
            ...(record.notifications || []),
            {
              id: Date.now(),
              message: notificationMessage,
              time: "Just now",
              unread: true,
            },
          ],
        },
      };
    });

    if (decision === "Approved") {
      setRepositoryProjects((prev) => {
        const existingIndex = prev.findIndex(
          (project) =>
            normalizeEmail(project.authorEmail) === email &&
            project.title === student.projectTitle
        );

        if (existingIndex !== -1) {
          return prev.map((project, index) =>
            index === existingIndex
              ? {
                  ...project,
                  documentId,
                  status: "Approved",
                }
              : project
          );
        }

        return [
          {
            id: Date.now(),
            title: student.projectTitle,
            topic: student.projectTitle,
            category: student.category,
            department: student.department,
            author: studentName,
            authorEmail: email,
            year: new Date().getFullYear(),
            supervisor: student.supervisor,
            status: "Approved",
            description:
              "Approved final-year project available in the repository.",
            documentId,
          },
          ...prev,
        ];
      });

      showPopup(
        "success",
        "Document Approved",
        `${document.name} has been approved successfully. The project repository has been updated.`
      );
    } else {
      showToast("Feedback saved successfully.");
    }

    setSelectedReview(null);
    setPage("supervisor");
  };

  const navigate = (targetPage) => {
    setPage(targetPage);
  };

  // LOGIN
  if (page === "login") {
    return (
      <>
        <Login
          onLogin={(user) => {
            const loggedInUser = {
              ...user,
              email: normalizeEmail(user.email),
            };

            setCurrentUser(loggedInUser);
            setRole(loggedInUser.role);

            if (loggedInUser.role === "supervisor") {
              setPage("supervisor");
            } else if (loggedInUser.role === "admin") {
              setPage("admin");
            } else if (loggedInUser.role === "student") {
              setPage("dashboard");
            }
          }}
          showToast={showToast}
        />

        {toast && <Toast message={toast} />}
      </>
    );
  }

  // SUPERVISOR
  if (
    role === "supervisor" &&
    currentUser?.role === "supervisor"
  ) {
    return (
      <>
        <SupervisorLayout
          currentUser={currentUser}
          page={page}
          setPage={setPage}
          logout={logout}
        >
          {page === "supervisor" && (
            <SupervisorDashboard
              studentData={studentData}
              users={demoUsers}
              onReview={(studentEmail, documentId) => {
                setSelectedReview({
                  studentEmail,
                  documentId,
                });
                setPage("review");
              }}
            />
          )}

          {page === "review" && selectedReview && (
            <SupervisorReview
              selectedReview={selectedReview}
              studentData={studentData}
              users={demoUsers}
              onBack={() => {
                setSelectedReview(null);
                setPage("supervisor");
              }}
              onSubmitReview={handleSupervisorReview}
            />
          )}

          {page === "students" && (
            <SupervisorStudents
              studentData={studentData}
              users={demoUsers}
            />
          )}

          {page === "repository" && (
            <Repository
              repositoryProjects={repositoryProjects}
              studentData={studentData}
            />
          )}

          {page === "review" && !selectedReview && (
            <div className="dashboard-card empty-state">
              No document selected for review.
            </div>
          )}
        </SupervisorLayout>

        {toast && <Toast message={toast} />}

        {popup && (
          <Popup popup={popup} onClose={closePopup} />
        )}
      </>
    );
  }

  // ADMIN
  if (
    role === "admin" &&
    currentUser?.role === "admin"
  ) {
    return (
      <>
        <AdminLayout
          currentUser={currentUser}
          page={page}
          setPage={setPage}
          logout={logout}
        >
          {page === "admin" && (
            <AdminDashboard
              studentData={studentData}
              repositoryProjects={repositoryProjects}
              users={demoUsers}
              onNavigate={setPage}
            />
          )}

          {page === "admin-users" && (
            <>
              <AdminStudents studentData={studentData} users={demoUsers} />
              <AdminSupervisors studentData={studentData} users={demoUsers} />
            </>
          )}

          {page === "admin-students" && (
            <AdminStudents
              studentData={studentData}
              users={demoUsers}
            />
          )}

          {page === "admin-supervisors" && (
            <AdminSupervisors
              studentData={studentData}
              users={demoUsers}
            />
          )}

          {page === "admin-projects" && (
            <AdminProjects
              studentData={studentData}
              users={demoUsers}
              repositoryProjects={repositoryProjects}
            />
          )}

          {page === "admin-historical" && (
            <AdminHistoricalProjects
              repositoryProjects={repositoryProjects}
              setRepositoryProjects={setRepositoryProjects}
            />
          )}

          {page === "admin-repository" && (
            <AdminRepository
              repositoryProjects={repositoryProjects}
              studentData={studentData}
            />
          )}

          {page === "admin-submissions" && (
            <AdminSubmissions
              studentData={studentData}
              users={demoUsers}
            />
          )}

          {page === "admin-notifications" && (
            <AdminNotifications
              studentData={studentData}
              users={demoUsers}
            />
          )}
        </AdminLayout>

        {toast && <Toast message={toast} />}

        {popup && (
          <Popup popup={popup} onClose={closePopup} />
        )}
      </>
    );
  }

  // STUDENT
  if (
    role === "student" &&
    currentUser?.role === "student"
  ) {
    return (
      <>
        <StudentLayout
          currentUser={currentUser}
          currentStudent={currentStudent}
          page={page}
          setPage={setPage}
          logout={logout}
        >
          {page === "dashboard" && (
            <StudentDashboard
              currentUser={currentUser}
              currentStudent={currentStudent}
              navigate={navigate}
            />
          )}

          {page === "my-project" && (
            <StudentProject currentStudent={currentStudent} />
          )}

          {page === "topic" && (
            <SubmitTopic
              currentStudent={currentStudent}
              onSubmit={submitTopic}
              showPopup={showPopup}
            />
          )}

          {page === "submissions" && (
            <Submissions
              currentStudent={currentStudent}
              onSubmit={submitDocument}
              showPopup={showPopup}
            />
          )}

          {page === "feedback" && (
            <StudentFeedback
              currentStudent={currentStudent}
            />
          )}

          {page === "repository" && (
            <Repository
              repositoryProjects={repositoryProjects}
              studentData={studentData}
            />
          )}

          {page === "notifications" && (
            <Notifications
              currentStudent={currentStudent}
              updateStudentData={updateStudentData}
              currentUser={currentUser}
            />
          )}
        </StudentLayout>

        {toast && <Toast message={toast} />}

        {popup && (
          <Popup popup={popup} onClose={closePopup} />
        )}
      </>
    );
  }

  return null;
}

/* ================
   ADMIN STUDENTS
========================================================= */

function AdminStudents({
  studentData,
  users,
}
) {
  const students = users.filter(
    (user) => user.role === "student"
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <p className="eyebrow">
            User Management
          </p>

          <h1>Students</h1>

          <p>
            View and manage students registered
            on the Final Year Project Repository.
          </p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <span className="card-label">
            Total Students
          </span>

          <h2>{students.length}</h2>

          <p>
            Registered student accounts
          </p>
        </div>

        <div className="dashboard-card">
          <span className="card-label">
            Active Projects
          </span>

          <h2>
            {
              students.filter((student) => {
                const record =
                  studentData[
                    normalizeEmail(student.email)
                  ];

                return (
                  record?.projectTitle &&
                  record?.topicStatus !==
                    "Not Submitted"
                );
              }).length
            }
          </h2>

          <p>
            Students with project topics
          </p>
        </div>

        <div className="dashboard-card">
          <span className="card-label">
            Pending Topics
          </span>

          <h2>
            {
              students.filter((student) => {
                const record =
                  studentData[
                    normalizeEmail(student.email)
                  ];

                return (
                  record?.topicStatus ===
                  "Pending Review"
                );
              }).length
            }
          </h2>

          <p>
            Topics awaiting supervisor review
          </p>
        </div>
      </div>

      <div className="dashboard-card full-width-card">
        <div className="card-heading">
          <div>
            <span className="card-label">
              Student Records
            </span>

            <h2>All Students</h2>
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Matric No.</th>
                <th>Email</th>
                <th>Project</th>
                <th>Supervisor</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => {
                const record =
                  studentData[
                    normalizeEmail(student.email)
                  ];

                return (
                  <tr key={student.email}>
                    <td>
                      <strong>
                        {student.name}
                      </strong>
                    </td>

                    <td>
                      {record?.matricNo || "—"}
                    </td>

                    <td>
                      {student.email}
                    </td>

                    <td>
                      {record?.projectTitle ||
                        "No project submitted"}
                    </td>

                    <td>
                      {record?.supervisor ||
                        "Not assigned"}
                    </td>

                    <td>
                      <span
                        className={`status-badge ${
                          record?.topicStatus ===
                          "Approved"
                            ? "approved"
                            : ""
                        }`}
                      >
                        {record?.topicStatus ||
                          "Not Submitted"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ADMIN SUPERVISORS
========================================================= */

function AdminSupervisors({
  studentData,
  users,
}) {
  const supervisors = users.filter(
    (user) => user.role === "supervisor"
  );

  const students = users.filter(
    (user) => user.role === "student"
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <p className="eyebrow">
            User Management
          </p>

          <h1>Supervisors</h1>

          <p>
            View supervisors and the students
            assigned to them.
          </p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <span className="card-label">
            Total Supervisors
          </span>

          <h2>{supervisors.length}</h2>

          <p>
            Registered supervisor accounts
          </p>
        </div>

        <div className="dashboard-card">
          <span className="card-label">
            Assigned Students
          </span>

          <h2>{students.length}</h2>

          <p>
            Students currently assigned
          </p>
        </div>
      </div>

      <div className="dashboard-card full-width-card">
        <div className="card-heading">
          <div>
            <span className="card-label">
              Supervisor Records
            </span>

            <h2>All Supervisors</h2>
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Supervisor</th>
                <th>Email</th>
                <th>Department</th>
                <th>Assigned Students</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {supervisors.map((supervisor) => {
                const assignedStudents =
                  students.filter((student) => {
                    const record =
                      studentData[
                        normalizeEmail(student.email)
                      ];

                    return (
                      record?.supervisor ===
                      supervisor.name
                    );
                  });

                return (
                  <tr key={supervisor.email}>
                    <td>
                      <strong>
                        {supervisor.name}
                      </strong>
                    </td>

                    <td>
                      {supervisor.email}
                    </td>

                    <td>
                      {supervisor.department}
                    </td>

                    <td>
                      {assignedStudents.length}
                    </td>

                    <td>
                      <span className="status-badge approved">
                        Active
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ADMIN REPOSITORY
========================================================= */

function AdminRepository({
  repositoryProjects,
  studentData,
}) {
  const [search, setSearch] =
    useState("");

  const filteredProjects =
    repositoryProjects.filter((project) => {
      const searchText =
        search.trim().toLowerCase();

      if (!searchText) {
        return true;
      }

      const searchableText = `
        ${project.title}
        ${project.topic}
        ${project.category}
        ${project.department}
        ${project.author}
        ${project.supervisor}
        ${project.year}
      `.toLowerCase();

      return searchableText.includes(
        searchText
      );
    });

  return (
    <div>
      <div className="page-header">
        <div>
          <p className="eyebrow">
            Repository Management
          </p>

          <h1>Repository</h1>

          <p>
            View all approved final-year
            projects available in the
            repository.
          </p>
        </div>
      </div>

      <div className="repository-controls">
        <div className="search-box">
          <span>⌕</span>

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search projects..."
          />
        </div>
      </div>

      <div className="repository-result-count">
        {filteredProjects.length} project
        {filteredProjects.length !== 1
          ? "s"
          : ""}{" "}
        in repository
      </div>

      <div className="repository-grid">
        {filteredProjects.length === 0 ? (
          <div className="dashboard-card empty-state">
            No projects found in the
            repository.
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div
              className="repository-card repository-project-card"
              key={project.id}
            >
              <div className="repository-card-top">
                <span className="category-tag">
                  {project.category}
                </span>

                <span className="year-tag">
                  {project.year}
                </span>
              </div>

              <h2>{project.title}</h2>

              <p className="repository-topic">
                {project.topic}
              </p>

              <div className="repository-meta">
                <div>
                  <span>Author</span>

                  <strong>
                    {project.author}
                  </strong>
                </div>

                <div>
                  <span>Supervisor</span>

                  <strong>
                    {project.supervisor}
                  </strong>
                </div>
              </div>

              <div className="repository-meta">
                <div>
                  <span>Department</span>

                  <strong>
                    {project.department}
                  </strong>
                </div>

                <div>
                  <span>Status</span>

                  <strong>
                    <span className="status-badge approved">
                      {project.status}
                    </span>
                  </strong>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
/* =========================================================
   ADMIN SUBMISSIONS
========================================================= */

function AdminSubmissions({
  studentData,
  users,
}) {
  const submissions = users
    .filter((user) => user.role === "student")
    .flatMap((student) => {
      const record =
        studentData[
          normalizeEmail(student.email)
        ];

      return (record?.documents || []).map(
        (document) => ({
          ...document,
          studentName: student.name,
          studentEmail: student.email,
          matricNo: record?.matricNo,
          projectTitle:
            record?.projectTitle,
          supervisor:
            record?.supervisor,
        })
      );
    });

  const pendingCount =
    submissions.filter(
      (submission) =>
        submission.status ===
        "Pending Review"
    ).length;

  const approvedCount =
    submissions.filter(
      (submission) =>
        submission.status === "Approved"
    ).length;

  return (
    <div>
      <div className="page-header">
        <div>
          <p className="eyebrow">
            Repository Management
          </p>

          <h1>Submissions</h1>

          <p>
            Monitor all project documents
            submitted by students.
          </p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <span className="card-label">
            Total Submissions
          </span>

          <h2>{submissions.length}</h2>

          <p>
            Documents submitted by students
          </p>
        </div>

        <div className="dashboard-card">
          <span className="card-label">
            Pending Review
          </span>

          <h2>{pendingCount}</h2>

          <p>
            Awaiting supervisor review
          </p>
        </div>

        <div className="dashboard-card">
          <span className="card-label">
            Approved
          </span>

          <h2>{approvedCount}</h2>

          <p>
            Approved submissions
          </p>
        </div>
      </div>

      <div className="dashboard-card full-width-card">
        <div className="card-heading">
          <div>
            <span className="card-label">
              Submission Records
            </span>

            <h2>All Student Submissions</h2>
          </div>
        </div>

        {submissions.length === 0 ? (
          <div className="empty-state">
            No student submissions have
            been made yet.
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Project</th>
                  <th>Document</th>
                  <th>Version</th>
                  <th>Date</th>
                  <th>Supervisor</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {submissions
                  .slice()
                  .reverse()
                  .map((submission) => (
                    <tr
                      key={`${submission.studentEmail}-${submission.id}`}
                    >
                      <td>
                        <strong>
                          {submission.studentName}
                        </strong>
                        <br />
                        <small>
                          {submission.matricNo}
                        </small>
                      </td>

                      <td>
                        {submission.projectTitle ||
                          "No project title"}
                      </td>

                      <td>
                        {submission.name}
                      </td>

                      <td>
                        {submission.version}
                      </td>

                      <td>
                        {submission.submittedAt}
                      </td>

                      <td>
                        {submission.supervisor ||
                          "Not assigned"}
                      </td>

                      <td>
                        <span
                          className={`status-badge ${
                            submission.status ===
                            "Approved"
                              ? "approved"
                              : ""
                          }`}
                        >
                          {submission.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
/* =========================================================
   ADMIN HISTORICAL PROJECTS
========================================================= */

function AdminHistoricalProjects({
  repositoryProjects,
  setRepositoryProjects,
}) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] =
    useState("Web Development");
  const [year, setYear] = useState("");
  const [department, setDepartment] =
    useState("Computer Science");
  const [supervisor, setSupervisor] =
    useState("");
  const [description, setDescription] =
    useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !title.trim() ||
      !author.trim() ||
      !year.trim()
    ) {
      return;
    }

    const project = {
      id: Date.now(),
      title: title.trim(),
      topic: title.trim(),
      category,
      department,
      author: author.trim(),
      year: Number(year),
      supervisor:
        supervisor.trim() || "Not specified",
      status: "Approved",
      description:
        description.trim() ||
        "Historical final-year project.",
      documentId: null,
      historical: true,
    };

    setRepositoryProjects((prev) => [
      project,
      ...prev,
    ]);

    setTitle("");
    setAuthor("");
    setYear("");
    setSupervisor("");
    setDescription("");
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <p className="eyebrow">
            Repository Management
          </p>

          <h1>
            Add Historical Project
          </h1>

          <p>
            Add previously completed projects
            to the repository.
          </p>
        </div>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <label>Project Title</label>

          <input
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            placeholder="Enter project title"
            required
          />

          <label>Author</label>

          <input
            value={author}
            onChange={(event) =>
              setAuthor(event.target.value)
            }
            placeholder="Enter student name"
            required
          />

          <label>Category</label>

          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
          >
            {PROJECT_CATEGORIES.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}
          </select>

          <label>Year</label>

          <input
            type="number"
            value={year}
            onChange={(event) =>
              setYear(event.target.value)
            }
            placeholder="e.g. 2023"
            required
          />

          <label>Department</label>

          <input
            value={department}
            onChange={(event) =>
              setDepartment(event.target.value)
            }
          />

          <label>Supervisor</label>

          <input
            value={supervisor}
            onChange={(event) =>
              setSupervisor(event.target.value)
            }
            placeholder="Supervisor name"
          />

          <label>Description</label>

          <textarea
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            placeholder="Brief project description"
            rows="5"
          />

          <div className="form-actions">
            <button
              type="submit"
              className="primary-button"
            >
              Add to Repository
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AdminProjects({
  studentData,
  users,
  repositoryProjects,
}) {
  const students = users.filter(
    (user) => user.role === "student"
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <p className="eyebrow">Project Management</p>
          <h1>Projects</h1>
          <p>View student projects and repository records.</p>
        </div>
      </div>

      <div className="dashboard-card full-width-card">
        <h2>Student Projects</h2>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Project Title</th>
                <th>Category</th>
                <th>Topic Status</th>
              </tr>
            </thead>

            <tbody>
              {students.map((user) => {
                const record =
                  studentData[normalizeEmail(user.email)];

                return (
                  <tr key={user.email}>
                    <td>{user.name}</td>
                    <td>
                      {record?.projectTitle || "No project submitted"}
                    </td>
                    <td>{record?.category || "—"}</td>
                    <td>{record?.topicStatus || "Not Submitted"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p>
          Projects currently in repository:{" "}
          {repositoryProjects.length}
        </p>
      </div>
    </div>
  );
}


function AdminNotifications({ studentData, users }) {
  const notifications = users
    .filter((user) => user.role === "student")
    .flatMap((user) => {
      const record =
        studentData[normalizeEmail(user.email)];

      return (record?.notifications || []).map(
        (notification, index) => ({
          ...notification,
          studentName: user.name,
          studentEmail: user.email,
          uniqueKey: `${user.email}-${notification.id}-${index}`,
        })
      );
    })
    .reverse();

  return (
    <div>
      <div className="page-header">
        <div>
          <p className="eyebrow">System Activity</p>
          <h1>Notifications</h1>
          <p>View notifications associated with student accounts.</p>
        </div>
      </div>

      <div className="dashboard-card full-width-card">
        <h2>Student Notifications ({notifications.length})</h2>

        {notifications.length === 0 ? (
          <div className="empty-state">
            There are no notifications to display.
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Notification</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {notifications.map((notification) => (
                  <tr key={notification.uniqueKey}>
                    <td>{notification.studentName}</td>
                    <td>{notification.message}</td>
                    <td>{notification.time || "—"}</td>
                    <td>
                      {notification.unread ? "Unread" : "Read"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   LOGIN
========================================================= */

function Login({ onLogin, showToast }) {
  const [email, setEmail] = useState("");

  const [loginPassword, setLoginPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalizedEmail =
      normalizeEmail(email);

    const user = demoUsers.find(
      (demoUser) =>
        normalizeEmail(
          demoUser.email
        ) === normalizedEmail &&
        demoUser.password ===
          loginPassword
    );

    if (!user) {
      showToast(
        "Invalid email or password."
      );
      return;
    }

    onLogin(user);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo-area">
          <img
            src={`${import.meta.env.BASE_URL}baze-logo.png`}
            alt="Baze Logo"
            className="login-logo"
          />
        </div>

        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Sign in to access the Final Year
          Project Repository System
        </p>

        <form onSubmit={handleSubmit}>
          <label>Email Address</label>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(
                event.target.value
              )
            }
            placeholder="Enter your email"
            required
          />

          <label>Password</label>

          <div className="password-wrapper">
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={loginPassword}
              onChange={(event) =>
                setLoginPassword(
                  event.target.value
                )
              }
              placeholder="Enter your password"
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword(
                  (prev) => !prev
                )
              }
            >
              {showPassword
                ? "Hide"
                : "Show"}
            </button>
          </div>

          <div className="forgot-password">
            <button
              type="button"
              onClick={() =>
                showToast(
                  "Password reset is for demo purposes."
                )
              }
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>
        </form>

        <div className="demo-accounts">
          <p>Demo accounts</p>

          <div>
            <strong>Students:</strong>
            <br />
            funmi@student.bazeuniversity.edu.ng
            <br />
            amina@student.bazeuniversity.edu.ng
            <br />
            david@student.bazeuniversity.edu.ng
            <br />
            Password: 123456
          </div>

          <div>
            <strong>Supervisor:</strong>
            <br />
            supervisor@bazeuniversity.edu.ng
            <br />
            Password: 123456
          </div>

          <div>
            <strong>Admin:</strong>
            <br />
            admin@bazeuniversity.edu.ng
            <br />
            Password: 123456
          </div>
        </div>

        <p className="login-footer">
          © 2026 Baze University · Final
          Year Project Repository System
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   STUDENT LAYOUT
========================================================= */

function StudentLayout({
  currentUser,
  currentStudent,
  page,
  setPage,
  logout,
  children,
}) {
  const navigation = [
    { id: "my-project", label: "My Project", icon: "▣" },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "⌂",
    },
    {
      id: "topic",
      label: "Submit Topic",
      icon: "＋",
    },
    {
      id: "submissions",
      label: "Submissions",
      icon: "▣",
    },
    {
      id: "feedback",
      label: "Feedback",
      icon: "◌",
    },
    {
      id: "repository",
      label: "Repository",
      icon: "▤",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: "♢",
    },
  ];

  const unreadCount =
    currentStudent?.notifications?.filter(
      (notification) =>
        notification.unread
    ).length || 0;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
                    <img
            src={`${import.meta.env.BASE_URL}baze.jpeg`}
            alt="Baze University"
          />

          <div>
            <strong>
              FYP Repository
            </strong>

            <span>
              Student Portal
            </span>
          </div>
        </div>

        <nav>
          {navigation.map((item) => (
            <button
              key={item.id}
              className={`sidebar-link ${
                page === item.id
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setPage(item.id)
              }
            >
              <span>{item.icon}</span>

              {item.label}

              {item.id ===
                "notifications" &&
                unreadCount > 0 && (
                  <span className="nav-notification-count">
                    {unreadCount}
                  </span>
                )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-user">
            <div className="avatar">
              {currentUser?.name?.charAt(
                0
              ) || "U"}
            </div>

            <div>
              <strong>
                {currentUser?.name}
              </strong>

              <span>
                {currentStudent?.level ||
                  "Student"}
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

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

/* =========================================================
   STUDENT PROJECT STATUS
========================================================= */

function StudentProject({ currentStudent }) {
  const documents = currentStudent?.documents || [];
  const approved = documents.filter((document) => document.status === "Approved").length;
  const pending = documents.filter((document) => document.status === "Pending Review").length;

  return (
    <div>
      <div className="page-header">
        <div>
          <p className="eyebrow">Project Overview</p>
          <h1>My Project</h1>
          <p>Track your project topic, progress, and submitted documents.</p>
        </div>
      </div>
      <div className="dashboard-grid">
        <section className="dashboard-card status-card">
          <span className="card-label">Project Status</span>
          <h2>{currentStudent?.topicStatus || "Not Submitted"}</h2>
          <div className="progress-label"><span>Overall progress</span><strong>{currentStudent?.progress || 0}%</strong></div>
          <div className="progress-bar"><div style={{ width: `${currentStudent?.progress || 0}%` }} /></div>
          <div className="project-summary"><span>Project title</span><strong>{currentStudent?.projectTitle || "No project topic submitted"}</strong></div>
          <p>Category: {currentStudent?.category || "Not selected"}</p>
          <p>Supervisor: {currentStudent?.supervisor || "Not assigned"}</p>
        </section>
        <section className="dashboard-card">
          <span className="card-label">Document Submissions</span>
          <h2>{documents.length}</h2>
          <p>{pending} awaiting review · {approved} approved</p>
          <div className="table-wrapper">
            <table><thead><tr><th>Document</th><th>Submitted</th><th>Status</th></tr></thead>
              <tbody>{documents.length ? documents.map((document) => <tr key={document.id}><td>{document.name}</td><td>{document.submittedAt}</td><td>{document.status}</td></tr>) : <tr><td colSpan="3">No documents submitted yet.</td></tr>}</tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

/* =========================================================
   STUDENT DASHBOARD
========================================================= */

function StudentDashboard({
  currentUser,
  currentStudent,
  navigate,
}) {
  const documents =
    currentStudent?.documents || [];

  const latestFeedback = [...documents]
    .filter(
      (document) => document.feedback
    )
    .reverse()[0];

  return (
    <div>
      <div className="page-header">
        <div>
          <p className="eyebrow">
            Student Dashboard
          </p>

          <h1>
            Welcome back,{" "}
            {
              currentUser?.name?.split(
                " "
              )[0]
            }{" "}
            !
          </h1>

          <p>
            Manage your final-year
            project, submissions and
            supervisor feedback.
          </p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card status-card">
          <div className="card-heading">
            <div>
              <span className="card-label">
                Project Status
              </span>

              <h2>
                {currentStudent?.topicStatus}
              </h2>
            </div>

            <span className="status-badge">
              {currentStudent?.topicStatus}
            </span>
          </div>

          <div className="progress-area">
            <div className="progress-label">
              <span>
                Project Progress
              </span>

              <strong>
                {currentStudent?.progress ||
                  0}
                %
              </strong>
            </div>

            <div className="progress-bar">
              <div
                style={{
                  width: `${
                    currentStudent?.progress ||
                    0
                  }%`,
                }}
              />
            </div>
          </div>

          <div className="project-summary">
            <span>Project</span>

            <strong>
              {currentStudent?.projectTitle ||
                "No project topic submitted"}
            </strong>
          </div>
        </div>

        <div className="dashboard-card">
          <span className="card-label">
            Supervisor
          </span>

          <h2>
            {currentStudent?.supervisor ||
              "Not assigned"}
          </h2>

          <p>
            Department of Computer
            Science
          </p>

          <div className="supervisor-status">
            <span className="online-dot" />
            Assigned Supervisor
          </div>
        </div>
      </div>

      <div className="dashboard-grid lower-grid">
        <div className="dashboard-card">
          <div className="card-heading">
            <div>
              <span className="card-label">
                Recent Feedback
              </span>

              <h2>
                Supervisor Feedback
              </h2>
            </div>
          </div>

          {latestFeedback ? (
            <div className="feedback-preview">
              <strong>
                {latestFeedback.name}
              </strong>

              <p>
                {latestFeedback.feedback}
              </p>

              <span>
                {latestFeedback.status}
              </span>
            </div>
          ) : (
            <div className="empty-state">
              No supervisor feedback yet.
            </div>
          )}
        </div>

        <div className="dashboard-card">
          <span className="card-label">
            Quick Actions
          </span>

          <div className="quick-actions">
            <button
              onClick={() =>
                navigate("topic")
              }
            >
              Submit Topic
            </button>

            <button
              onClick={() =>
                navigate("submissions")
              }
            >
              Submit Document
            </button>

            <button
              onClick={() =>
                navigate("repository")
              }
            >
              Browse Repository
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-card full-width-card">
        <div className="card-heading">
          <div>
            <span className="card-label">
              Recent Submissions
            </span>

            <h2>Your Documents</h2>
          </div>

          <button
            className="text-button"
            onClick={() =>
              navigate("submissions")
            }
          >
            View All
          </button>
        </div>

        {documents.length === 0 ? (
          <div className="empty-state">
            You have not submitted any
            documents yet.
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Version</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {documents
                  .slice(-5)
                  .reverse()
                  .map((document) => (
                    <tr
                      key={document.id}
                    >
                      <td>
                        {document.name}
                      </td>

                      <td>
                        {document.version}
                      </td>

                      <td>
                        {document.submittedAt}
                      </td>

                      <td>
                        <span
                          className={`status-badge ${
                            document.status ===
                            "Approved"
                              ? "approved"
                              : ""
                          }`}
                        >
                          {document.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   SUBMIT TOPIC
========================================================= */

function SubmitTopic({
  currentStudent,
  onSubmit,
  showPopup,
}) {
  const [title, setTitle] =
    useState(
      currentStudent?.topicStatus !==
        "Not Submitted"
        ? currentStudent?.projectTitle ||
            ""
        : ""
    );

  const [category, setCategory] =
    useState(
      currentStudent?.category || ""
    );

  const [otherCategory, setOtherCategory] =
    useState("");

  const [abstract, setAbstract] =
    useState(
      currentStudent?.abstract || ""
    );

  const [objectives, setObjectives] =
    useState(
      currentStudent?.objectives || ""
    );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      showPopup(
        "error",
        "Project Title Required",
        "Please enter your proposed project title."
      );
      return;
    }

    if (!category) {
      showPopup(
        "error",
        "Category Required",
        "Please select a project category."
      );
      return;
    }

    if (
      category === "Other" &&
      !otherCategory.trim()
    ) {
      showPopup(
        "error",
        "Category Required",
        "Please enter your project category."
      );
      return;
    }

    const finalCategory =
      category === "Other"
        ? otherCategory.trim()
        : category;

    onSubmit({
      title: title.trim(),
      category: finalCategory,
      abstract: abstract.trim(),
      objectives: objectives.trim(),
    });
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <p className="eyebrow">
            Project Management
          </p>

          <h1>
            Submit Project Topic
          </h1>

          <p>
            Submit your proposed
            final-year project topic for
            supervisor review.
          </p>
        </div>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <label>Project Title</label>

          <input
            value={title}
            onChange={(event) =>
              setTitle(
                event.target.value
              )
            }
            placeholder="Enter your proposed project title"
            required
          />

          <label>Category</label>

          <select
            value={category}
            onChange={(event) =>
              setCategory(
                event.target.value
              )
            }
            required
          >
            <option value="">
              Select category
            </option>

            {PROJECT_CATEGORIES.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}
          </select>

          {category === "Other" && (
            <input
              value={otherCategory}
              onChange={(event) =>
                setOtherCategory(
                  event.target.value
                )
              }
              placeholder="Enter your project category"
              required
            />
          )}

          <label>Abstract</label>

          <textarea
            value={abstract}
            onChange={(event) =>
              setAbstract(
                event.target.value
              )
            }
            placeholder="Briefly describe your proposed project..."
            rows="5"
          />

          <label>Objectives</label>

          <textarea
            value={objectives}
            onChange={(event) =>
              setObjectives(
                event.target.value
              )
            }
            placeholder="Enter the main objectives of the project..."
            rows="5"
          />

          <div className="form-note">
            Your topic will be submitted
            to your assigned supervisor
            for review.
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setTitle("");
                setCategory("");
                setOtherCategory("");
                setAbstract("");
                setObjectives("");
              }}
            >
              Clear Form
            </button>

            <button
              type="submit"
              className="primary-button"
            >
              Submit Topic
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* =========================================================
   SUBMISSIONS
========================================================= */

function Submissions({
  currentStudent,
  onSubmit,
  showPopup,
}) {
  const [file, setFile] =
    useState(null);

  const [version, setVersion] =
    useState("");

  const [category, setCategory] =
    useState(
      currentStudent?.category || ""
    );

  const [otherCategory, setOtherCategory] =
    useState("");

  const [description, setDescription] =
    useState("");

  const documents =
    currentStudent?.documents || [];

  const handleFileChange = (event) => {
    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (
      selectedFile.size >
      10 * 1024 * 1024
    ) {
      showPopup(
        "error",
        "File Too Large",
        "Please choose a document smaller than 10MB."
      );

      event.target.value = "";
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!file) {
      showPopup(
        "error",
        "Document Required",
        "Please choose a document to submit."
      );
      return;
    }

    if (!version.trim()) {
      showPopup(
        "error",
        "Version Required",
        "Please enter the version number of this document, for example 1.0 or 2.0."
      );
      return;
    }

    if (!category) {
      showPopup(
        "error",
        "Category Required",
        "Please select the category of this project document."
      );
      return;
    }

    if (
      category === "Other" &&
      !otherCategory.trim()
    ) {
      showPopup(
        "error",
        "Category Required",
        "Please enter the custom project category."
      );
      return;
    }

    const extension =
      file.name
        .split(".")
        .pop()
        ?.toUpperCase() || "FILE";

    const fileUrl =
      URL.createObjectURL(file);

    const finalCategory =
      category === "Other"
        ? otherCategory.trim()
        : category;

    onSubmit({
      name: file.name,
      type: extension,
      version,
      category: finalCategory,
      categoryOther:
        category === "Other"
          ? otherCategory.trim()
          : "",
      description,
      fileUrl,
    });

    setFile(null);
    setVersion("");
    setCategory(
      currentStudent?.category || ""
    );
    setOtherCategory("");
    setDescription("");

    /*
      Reset the file input after submission.
    */
    event.target.reset();
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <p className="eyebrow">
            Project Documents
          </p>

          <h1>
            Document Submissions
          </h1>

          <p>
            Submit project documents for
            routine supervisor review and
            feedback.
          </p>
        </div>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="upload-box">
            <div className="upload-icon">
              ↑
            </div>

            <h3>
              Upload Project Document
            </h3>

            <p>
              PDF, DOC or DOCX · Maximum
              10MB
            </p>

            <label className="upload-button">
              Choose File

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={
                  handleFileChange
                }
                hidden
              />
            </label>

            {file && (
              <div className="selected-file">
                <strong>
                  {file.name}
                </strong>

                <span>
                  {(
                    file.size /
                    1024 /
                    1024
                  ).toFixed(2)}{" "}
                  MB
                </span>
              </div>
            )}
          </div>

          <label>
            Version Number
          </label>

          <input
            value={version}
            onChange={(event) =>
              setVersion(
                event.target.value
              )
            }
            placeholder="e.g. 1.0, 1.1, 2.0"
            required
          />

          <p className="field-help">
            Enter the version number for
            this specific submission.
          </p>

          <label>Category</label>

          <select
            value={category}
            onChange={(event) =>
              setCategory(
                event.target.value
              )
            }
            required
          >
            <option value="">
              Select category
            </option>

            {PROJECT_CATEGORIES.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}
          </select>

          {category === "Other" && (
            <input
              value={otherCategory}
              onChange={(event) =>
                setOtherCategory(
                  event.target.value
                )
              }
              placeholder="Type your project category"
              required
            />
          )}

          <label>
            Description
          </label>

          <textarea
            value={description}
            onChange={(event) =>
              setDescription(
                event.target.value
              )
            }
            placeholder="Brief description of this submission..."
            rows="4"
          />

          <div className="form-actions">
            <button
              type="submit"
              className="primary-button"
              disabled={!file}
            >
              Submit Document
            </button>
          </div>
        </form>
      </div>

      <div className="dashboard-card full-width-card">
        <div className="card-heading">
          <div>
            <span className="card-label">
              Submission History
            </span>

            <h2>
              Previous Submissions
            </h2>
          </div>
        </div>

        {documents.length === 0 ? (
          <div className="empty-state">
            No documents submitted yet.
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Version</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Feedback</th>
                </tr>
              </thead>

              <tbody>
                {[...documents]
                  .reverse()
                  .map((document) => (
                    <tr
                      key={document.id}
                    >
                      <td>
                        {document.name}
                      </td>

                      <td>
                        {document.version}
                      </td>

                      <td>
                        {document.category ||
                          currentStudent?.category ||
                          "—"}
                      </td>

                      <td>
                        {document.submittedAt}
                      </td>

                      <td>
                        <span
                          className={`status-badge ${
                            document.status ===
                            "Approved"
                              ? "approved"
                              : ""
                          }`}
                        >
                          {document.status}
                        </span>
                      </td>

                      <td>
                        {document.feedback ||
                          "Awaiting review"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   STUDENT FEEDBACK
========================================================= */

function StudentFeedback({
  currentStudent,
}) {
  const documents =
    currentStudent?.documents || [];

  const feedbackDocuments =
    documents.filter(
      (document) => document.feedback
    );

  return (
    <div>
      <div className="page-header">
        <div>
          <p className="eyebrow">
            Supervisor Communication
          </p>

          <h1>
            Feedback & Corrections
          </h1>

          <p>
            View feedback provided by
            your supervisor.
          </p>
        </div>
      </div>

      {feedbackDocuments.length ===
      0 ? (
        <div className="dashboard-card empty-state">
          No supervisor feedback
          available yet.
        </div>
      ) : (
        <div className="feedback-list">
          {feedbackDocuments.map(
            (document) => (
              <div
                className="dashboard-card"
                key={document.id}
              >
                <span className="card-label">
                  {document.name}
                </span>

                <h2>
                  {document.status}
                </h2>

                <p>
                  {document.feedback}
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   REPOSITORY
========================================================= */

function Repository({
  repositoryProjects,
  studentData,
}) {
  const [search, setSearch] =
    useState("");

  const [yearFilter, setYearFilter] =
    useState("All");

  const [
    departmentFilter,
    setDepartmentFilter,
  ] = useState("All");

  const [
    categoryFilter,
    setCategoryFilter,
  ] = useState("All");

  const [selectedProject, setSelectedProject] =
    useState(null);

  const availableYears =
    useMemo(() => {
      const years = Array.from(
        new Set(
          repositoryProjects.map(
            (project) =>
              String(project.year)
          )
        )
      ).sort(
        (a, b) =>
          Number(b) - Number(a)
      );

      return ["All", ...years];
    }, [repositoryProjects]);

  const availableDepartments =
    useMemo(() => {
      const departments =
        Array.from(
          new Set(
            repositoryProjects.map(
              (project) =>
                project.department
            )
          )
        ).sort();

      return ["All", ...departments];
    }, [repositoryProjects]);

  const availableCategories =
    useMemo(() => {
      const categories = Array.from(
        new Set(
          repositoryProjects.map(
            (project) =>
              project.category
          )
        )
      ).sort();

      return ["All", ...categories];
    }, [repositoryProjects]);

  const filteredProjects =
    useMemo(() => {
      const searchText =
        search.trim().toLowerCase();

      return repositoryProjects.filter(
        (project) => {
          const searchableText = `
            ${project.title}
            ${project.topic}
            ${project.category}
            ${project.department}
            ${project.author}
            ${project.supervisor}
            ${project.description}
            ${project.year}
          `.toLowerCase();

          const matchesSearch =
            !searchText ||
            searchableText.includes(
              searchText
            );

          const matchesYear =
            yearFilter === "All" ||
            String(project.year) ===
              String(yearFilter);

          const matchesDepartment =
            departmentFilter === "All" ||
            project.department ===
              departmentFilter;

          const matchesCategory =
            categoryFilter === "All" ||
            project.category ===
              categoryFilter;

          return (
            matchesSearch &&
            matchesYear &&
            matchesDepartment &&
            matchesCategory
          );
        }
      );
    }, [
      repositoryProjects,
      search,
      yearFilter,
      departmentFilter,
      categoryFilter,
    ]);

  const getProjectDocument = (
    project
  ) => {
    if (
      !project.authorEmail ||
      !project.documentId
    ) {
      return null;
    }

    const student =
      studentData[
        normalizeEmail(
          project.authorEmail
        )
      ];

    return (
      student?.documents?.find(
        (document) =>
          document.id ===
          project.documentId
      ) || null
    );
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <p className="eyebrow">
            Project Repository
          </p>

          <h1>
            Previous Projects
          </h1>

          <p>
            Search approved final-year
            projects by title, year,
            department, topic, author or
            category.
          </p>
        </div>
      </div>

      <div className="repository-controls">
        <div className="search-box">
          <span>⌕</span>

          <input
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search title, year, department..."
          />
        </div>

        <select
          value={yearFilter}
          onChange={(event) =>
            setYearFilter(
              event.target.value
            )
          }
        >
          {availableYears.map(
            (year) => (
              <option
                key={year}
                value={year}
              >
                {year === "All"
                  ? "All Years"
                  : year}
              </option>
            )
          )}
        </select>

        <select
          value={departmentFilter}
          onChange={(event) =>
            setDepartmentFilter(
              event.target.value
            )
          }
        >
          {availableDepartments.map(
            (department) => (
              <option
                key={department}
                value={department}
              >
                {department === "All"
                  ? "All Departments"
                  : department}
              </option>
            )
          )}
        </select>

        <select
          value={categoryFilter}
          onChange={(event) =>
            setCategoryFilter(
              event.target.value
            )
          }
        >
          {availableCategories.map(
            (category) => (
              <option
                key={category}
                value={category}
              >
                {category === "All"
                  ? "All Categories"
                  : category}
              </option>
            )
          )}
        </select>
      </div>

      <div className="repository-result-count">
        {filteredProjects.length}{" "}
        project
        {filteredProjects.length !== 1
          ? "s"
          : ""}{" "}
        found
      </div>

      <div className="repository-grid">
        {filteredProjects.length ===
        0 ? (
          <div className="dashboard-card empty-state">
            No projects match your
            search.
          </div>
        ) : (
          filteredProjects.map(
            (project) => {
              const document =
                getProjectDocument(
                  project
                );

              return (
                <div
                  className="repository-card repository-project-card"
                  key={project.id}
                >
                  <div className="repository-card-top">
                    <span className="category-tag">
                      {project.category}
                    </span>

                    <span className="year-tag">
                      {project.year}
                    </span>
                  </div>

                  <h2>
                    {project.title}
                  </h2>

                  <p className="repository-topic">
                    {project.topic}
                  </p>

                  <p>
                    {project.description}
                  </p>

                  <div className="repository-meta">
                    <div>
                      <span>
                        Author
                      </span>

                      <strong>
                        {project.author}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Department
                      </span>

                      <strong>
                        {project.department}
                      </strong>
                    </div>
                  </div>

                  <button
                    className="secondary-button"
                    onClick={() =>
                      setSelectedProject(
                        project
                      )
                    }
                  >
                    View Project
                  </button>

                  {document?.fileUrl && (
                    <span className="document-available">
                      ✓ Document available
                    </span>
                  )}
                </div>
              );
            }
          )
        )}
      </div>

      {selectedProject && (
        <RepositoryPreviewModal
          project={selectedProject}
          document={getProjectDocument(
            selectedProject
          )}
          onClose={() =>
            setSelectedProject(null)
          }
        />
      )}
    </div>
  );
}

/* =========================================================
   REPOSITORY PREVIEW MODAL
========================================================= */

function RepositoryPreviewModal({
  project,
  document,
  onClose,
}) {
  const isPdf =
    document?.fileUrl &&
    document.type?.toLowerCase() ===
      "pdf";

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="repository-preview-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="modal-header">
          <div>
            <span className="card-label">
              Repository Project
            </span>

            <h2>{project.title}</h2>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="repository-preview-content">
          <div className="project-preview-details">
            <div className="preview-detail">
              <span>Project Title</span>
              <strong>
                {project.title}
              </strong>
            </div>

            <div className="preview-detail">
              <span>Topic</span>
              <strong>
                {project.topic}
              </strong>
            </div>

            <div className="preview-detail">
              <span>Author</span>
              <strong>
                {project.author}
              </strong>
            </div>

            <div className="preview-detail">
              <span>Department</span>
              <strong>
                {project.department}
              </strong>
            </div>

            <div className="preview-detail">
              <span>Year</span>
              <strong>
                {project.year}
              </strong>
            </div>

            <div className="preview-detail">
              <span>Category</span>
              <strong>
                {project.category}
              </strong>
            </div>

            <div className="preview-detail">
              <span>Supervisor</span>
              <strong>
                {project.supervisor}
              </strong>
            </div>

            <div className="preview-description">
              <span>Description</span>

              <p>
                {project.description}
              </p>
            </div>
          </div>

          <div className="repository-document-preview">
            <div className="preview-section-heading">
              <div>
                <span className="card-label">
                  Project Document
                </span>

                <h3>
                  {document?.name ||
                    "Document unavailable"}
                </h3>
              </div>

              {document && (
                <span className="status-badge approved">
                  Approved
                </span>
              )}
            </div>

            {isPdf ? (
              <iframe
                src={document.fileUrl}
                title={document.name}
                className="repository-pdf-preview"
              />
            ) : document?.fileUrl ? (
              <div className="file-preview-fallback">
                <div className="file-icon">
                  ▣
                </div>

                <h3>
                  {document.name}
                </h3>

                <p>
                  This document format
                  cannot be previewed
                  directly in the browser.
                </p>

                <a
                  href={document.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="primary-button"
                >
                  Open Document
                </a>
              </div>
            ) : (
              <div className="file-preview-fallback">
                <div className="file-icon">
                  PDF
                </div>

                <h3>
                  Document Preview
                </h3>

                <p>
                  The project information
                  is available, but a
                  previewable document has
                  not been uploaded for this
                  demo project.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   NOTIFICATIONS
========================================================= */

function Notifications({
  currentStudent,
  updateStudentData,
  currentUser,
}) {
  const notifications =
    currentStudent?.notifications ||
    [];

  const unreadCount =
    notifications.filter(
      (notification) =>
        notification.unread
    ).length;

  const markAllAsRead = () => {
    const updatedNotifications =
      notifications.map(
        (notification) => ({
          ...notification,
          unread: false,
        })
      );

    updateStudentData(
      currentUser.email,
      {
        notifications:
          updatedNotifications,
      }
    );
  };

  const markAsRead = (id) => {
    const updatedNotifications =
      notifications.map(
        (notification) =>
          notification.id === id
            ? {
                ...notification,
                unread: false,
              }
            : notification
      );

    updateStudentData(
      currentUser.email,
      {
        notifications:
          updatedNotifications,
      }
    );
  };

  return (
    <div>
      <div className="page-header notification-page-header">
        <div>
          <p className="eyebrow">
            Updates
          </p>

          <h1>
            Notifications
          </h1>

          <p>
            Stay updated on your project
            activities, submissions and
            supervisor feedback.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            className="secondary-button"
            onClick={markAllAsRead}
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="notification-summary">
        <div>
          <span className="notification-summary-icon">
            ♢
          </span>

          <div>
            <strong>
              {notifications.length}
            </strong>

            <span>
              Total notifications
            </span>
          </div>
        </div>

        <div>
          <span className="notification-summary-icon unread-summary">
            ●
          </span>

          <div>
            <strong>
              {unreadCount}
            </strong>

            <span>
              Unread
            </span>
          </div>
        </div>
      </div>

      {notifications.length ===
      0 ? (
        <div className="dashboard-card notification-empty">
          <div className="notification-empty-icon">
            ✓
          </div>

          <h2>
            You're all caught up
          </h2>

          <p>
            New project updates and
            supervisor feedback will
            appear here.
          </p>
        </div>
      ) : (
        <div className="notification-list">
          {notifications.map(
            (notification) => (
              <button
                type="button"
                className={`notification-card ${
                  notification.unread
                    ? "unread"
                    : ""
                }`}
                key={
                  notification.id
                }
                onClick={() =>
                  markAsRead(
                    notification.id
                  )
                }
              >
                <div
                  className={`notification-icon ${
                    notification.unread
                      ? "notification-icon-unread"
                      : ""
                  }`}
                >
                  {notification.unread
                    ? "!"
                    : "✓"}
                </div>

                <div className="notification-content">
                  <div className="notification-top-row">
                    <strong>
                      {notification.unread
                        ? "New Update"
                        : "Notification"}
                    </strong>

                    <span>
                      {notification.time}
                    </span>
                  </div>

                  <p>
                    {
                      notification.message
                    }
                  </p>

                  {notification.unread && (
                    <span className="unread-label">
                      Unread · Click to mark
                      as read
                    </span>
                  )}
                </div>
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   SUPERVISOR LAYOUT
========================================================= */

function SupervisorLayout({
  currentUser,
  page,
  setPage,
  logout,
  children,
}) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
            <img
      src={`${import.meta.env.BASE_URL}baze.jpeg`}
      alt="Baze University"
    />

          <div>
            <strong>
              FYP Repository
            </strong>

            <span>
              Supervisor Portal
            </span>
          </div>
        </div>

        <nav>
          <button
            className={`sidebar-link ${
              page === "supervisor"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setPage("supervisor")
            }
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className={`sidebar-link ${
              page === "students"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setPage("students")
            }
          >
            <span>♙</span>
            My Students
          </button>

          <button
            className={`sidebar-link ${
              page === "review"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setPage("review")
            }
          >
            <span>▣</span>
            Review Documents
          </button>

          <button
            className={`sidebar-link ${page === "repository" ? "active" : ""}`}
            onClick={() => setPage("repository")}
          >
            <span>▤</span>
            Repository
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-user">
            <div className="avatar">
              {currentUser?.name?.charAt(
                0
              ) || "S"}
            </div>

            <div>
              <strong>
                {currentUser?.name}
              </strong>

              <span>
                Supervisor
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

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

/* =========================================================
   SUPERVISOR DASHBOARD
========================================================= */

function SupervisorDashboard({
  studentData,
  users,
  onReview,
}) {
  const studentUsers =
    users.filter(
      (user) => user.role === "student"
    );

  const submittedDocuments =
    studentUsers.flatMap(
      (student) => {
        const studentRecord =
          studentData[
            normalizeEmail(
              student.email
            )
          ];

        return (
          studentRecord?.documents || []
        ).map((document) => ({
          ...document,

          studentEmail:
            student.email,

          studentName:
            student.name,

          projectTitle:
            studentRecord.projectTitle,

          department:
            studentRecord.department,
        }));
      }
    );

  const pendingDocuments =
    submittedDocuments.filter(
      (document) =>
        document.status ===
        "Pending Review"
    );

  return (
    <div>
      <div className="page-header">
        <div>
          <p className="eyebrow">
            Supervisor Dashboard
          </p>

          <h1>
            Project Review
          </h1>

          <p>
            Review student submissions,
            provide feedback and approve
            project documents.
          </p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <span className="card-label">
            Assigned Students
          </span>

          <h2>
            {studentUsers.length}
          </h2>

          <p>
            Students assigned to you
          </p>
        </div>

        <div className="dashboard-card">
          <span className="card-label">
            Pending Reviews
          </span>

          <h2>
            {pendingDocuments.length}
          </h2>

          <p>
            Documents waiting for review
          </p>
        </div>

        <div className="dashboard-card">
          <span className="card-label">
            Total Submissions
          </span>

          <h2>
            {submittedDocuments.length}
          </h2>

          <p>
            Documents submitted by
            students
          </p>
        </div>
      </div>

      <div className="dashboard-card full-width-card">
        <div className="card-heading">
          <div>
            <span className="card-label">
              Document Submissions
            </span>

            <h2>
              Student Documents
            </h2>
          </div>
        </div>

        {submittedDocuments.length ===
        0 ? (
          <div className="empty-state">
            No student documents have
            been submitted.
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Project</th>
                  <th>Document</th>
                  <th>Version</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {submittedDocuments.map(
                  (document) => (
                    <tr
                      key={`${document.studentEmail}-${document.id}`}
                    >
                      <td>
                        {
                          document.studentName
                        }
                      </td>

                      <td>
                        {
                          document.projectTitle
                        }
                      </td>

                      <td>
                        {document.name}
                      </td>

                      <td>
                        {document.version}
                      </td>

                      <td>
                        <span
                          className={`status-badge ${
                            document.status ===
                            "Approved"
                              ? "approved"
                              : ""
                          }`}
                        >
                          {document.status}
                        </span>
                      </td>

                      <td>
                        <button
                          className="primary-button small-button"
                          onClick={() =>
                            onReview(
                              document.studentEmail,
                              document.id
                            )
                          }
                        >
                          Open & Review
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   SUPERVISOR REVIEW
========================================================= */

function SupervisorReview({
  selectedReview,
  studentData,
  users,
  onBack,
  onSubmitReview,
}) {
  const [feedback, setFeedback] =
    useState("");

  const [feedbackType, setFeedbackType] =
    useState("General Feedback");

  const [reviewStatus, setReviewStatus] =
    useState("Reviewed");

  const student =
    studentData[
      normalizeEmail(
        selectedReview.studentEmail
      )
    ];

  const user = users.find(
    (item) =>
      normalizeEmail(item.email) ===
      normalizeEmail(
        selectedReview.studentEmail
      )
  );

  const document =
    student?.documents?.find(
      (item) =>
        item.id ===
        selectedReview.documentId
    );

  useEffect(() => {
    setFeedback(
      document?.feedback || ""
    );

    setReviewStatus(
      document?.status ===
        "Pending Review"
        ? "Reviewed"
        : document?.status ||
            "Reviewed"
    );
  }, [
    document?.id,
    document?.feedback,
    document?.status,
  ]);

  if (!student || !document) {
    return (
      <div>
        <button
          className="secondary-button"
          onClick={onBack}
        >
          ← Back to Dashboard
        </button>

        <div className="dashboard-card empty-state">
          The selected document could
          not be found.
        </div>
      </div>
    );
  }

  const handleFeedback = (event) => {
    event.preventDefault();

    onSubmitReview(
      selectedReview.studentEmail,
      selectedReview.documentId,
      feedback,
      reviewStatus,
      reviewStatus === "Approved"
        ? "Approved"
        : "Feedback"
    );
  };

  const approveDocument = () => {
    onSubmitReview(
      selectedReview.studentEmail,
      selectedReview.documentId,
      feedback ||
        "Document approved.",
      "Approved",
      "Approved"
    );
  };

  const fileIsPreviewable =
    document.fileUrl &&
    document.type?.toLowerCase() ===
      "pdf";

  return (
    <div>
      <div className="page-header">
        <div>
          <button
            className="back-button"
            onClick={onBack}
          >
            ← Back to Reviews
          </button>

          <p className="eyebrow">
            Document Review
          </p>

          <h1>
            Review Student Submission
          </h1>

          <p>
            Open the student's submitted
            document, review it and
            provide feedback or approval.
          </p>
        </div>
      </div>

      <div className="review-student-info dashboard-card">
        <div>
          <span className="card-label">
            Student
          </span>

          <h2>{user?.name}</h2>

          <p>
            {student.matricNo}
          </p>
        </div>

        <div>
          <span className="card-label">
            Project
          </span>

          <h2>
            {student.projectTitle}
          </h2>

          <p>
            {student.department}
          </p>
        </div>

        <div>
          <span className="card-label">
            Submission
          </span>

          <h2>
            {document.name}
          </h2>

          <p>
            Version {document.version} ·{" "}
            {document.submittedAt}
          </p>
        </div>
      </div>

      <div className="review-layout">
        <div className="dashboard-card document-preview">
          <div className="card-heading">
            <div>
              <span className="card-label">
                Document Preview
              </span>

              <h2>
                {document.name}
              </h2>
            </div>

            <span
              className={`status-badge ${
                document.status ===
                "Approved"
                  ? "approved"
                  : ""
              }`}
            >
              {document.status}
            </span>
          </div>

          {fileIsPreviewable ? (
            <>
              <iframe
                src={document.fileUrl}
                title={document.name}
                className="pdf-preview"
              />

              <div className="document-open-row">
                <a
                  href={document.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="secondary-button"
                >
                  Open in New Tab
                </a>
              </div>
            </>
          ) : document.fileUrl ? (
            <div className="file-preview-fallback">
              <div className="file-icon">
                ▣
              </div>

              <h3>
                {document.name}
              </h3>

              <p>
                This file format cannot be
                previewed directly in the
                browser.
              </p>

              <a
                href={document.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="primary-button"
              >
                Open Document
              </a>
            </div>
          ) : (
            <div className="file-preview-fallback">
              <div className="file-icon">
                PDF
              </div>

              <h3>
                {document.name}
              </h3>

              <p>
                No actual file is attached
                to this demo submission.
                Upload a real PDF to see
                the document preview.
              </p>
            </div>
          )}
        </div>

        <div className="review-side">
          <div className="dashboard-card">
            <span className="card-label">
              Feedback & Corrections
            </span>

            <h2>
              Supervisor Feedback
            </h2>

            <form
              onSubmit={handleFeedback}
            >
              <label>
                Feedback Type
              </label>

              <select
                value={feedbackType}
                onChange={(event) =>
                  setFeedbackType(
                    event.target.value
                  )
                }
              >
                <option>
                  General Feedback
                </option>

                <option>
                  Correction Required
                </option>

                <option>
                  Technical Feedback
                </option>

                <option>
                  Formatting
                </option>
              </select>

              <label>
                Comments
              </label>

              <textarea
                value={feedback}
                onChange={(event) =>
                  setFeedback(
                    event.target.value
                  )
                }
                placeholder="Enter feedback or corrections for the student..."
                rows="8"
              />

              <label>
                Review Status
              </label>

              <select
                value={reviewStatus}
                onChange={(event) =>
                  setReviewStatus(
                    event.target.value
                  )
                }
              >
                <option>
                  Reviewed
                </option>

                <option>
                  Request Corrections
                </option>

                <option>
                  Approved
                </option>
              </select>

              <button
                type="submit"
                className="primary-button full-button"
              >
                Save & Send Feedback
              </button>
            </form>
          </div>

          <div className="dashboard-card decision-card">
            <span className="card-label">
              Project Decision
            </span>

            <h2>
              Final Review
            </h2>

            <p>
              Approving this document
              will mark the submission
              as approved and make the
              project available in the
              repository.
            </p>

            <div className="decision-buttons">
              <button
                className="secondary-button"
                onClick={() =>
                  onSubmitReview(
                    selectedReview.studentEmail,
                    selectedReview.documentId,
                    feedback ||
                      "Please make the required corrections.",
                    "Request Corrections",
                    "Feedback"
                  )
                }
              >
                Request Corrections
              </button>

              <button
                className="primary-button"
                onClick={
                  approveDocument
                }
              >
                Approve Document
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SUPERVISOR STUDENTS
========================================================= */

function SupervisorStudents({
  studentData,
  users,
}) {
  const students =
    users.filter(
      (user) => user.role === "student"
    );

  return (
    <div>
      <div className="page-header">
        <div>
          <p className="eyebrow">
            Supervision
          </p>

          <h1>
            My Students
          </h1>

          <p>
            View students assigned to you.
          </p>
        </div>
      </div>

      <div className="repository-grid">
        {students.map((student) => {
          const record =
            studentData[
              normalizeEmail(
                student.email
              )
            ];

          return (
            <div
              className="repository-card"
              key={student.email}
            >
              <div className="avatar large-avatar">
                {student.name.charAt(
                  0
                )}
              </div>

              <h2>
                {student.name}
              </h2>

              <p>
                {record?.matricNo}
              </p>

              <div className="student-info-row">
                <span>
                  Project
                </span>

                <strong>
                  {record?.projectTitle}
                </strong>
              </div>

              <div className="student-info-row">
                <span>
                  Status
                </span>

                <strong>
                  {record?.topicStatus}
                </strong>
              </div>

              <div className="student-info-row">
                <span>
                  Documents
                </span>

                <strong>
                  {record?.documents
                    ?.length || 0}
                </strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   TOAST
========================================================= */

function Toast({ message }) {
  return (
    <div
      className="toast"
      role="status"
    >
      {message}
    </div>
  );
}

/* =========================================================
   POPUP
========================================================= */

function Popup({ popup, onClose }) {
  if (!popup) {
    return null;
  }

  const isSuccess =
    popup.type === "success";

  return (
    <div
      className="popup-overlay"
      onClick={onClose}
    >
      <div
        className="success-popup"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div
          className={`popup-icon ${
            isSuccess
              ? "popup-success"
              : "popup-error"
          }`}
        >
          {isSuccess ? "✓" : "!"}
        </div>

        <h2>{popup.title}</h2>

        <p>{popup.message}</p>

        <button
          className="primary-button popup-button"
          onClick={onClose}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   EXPORT
========================================================= */

export default App;
