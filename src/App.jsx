
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Layouts
import CitizenLayout from "./layouts/CitizenLayout";
import AdminLayout from "./layouts/AdminLayout";
import SupervisorLayout from "./layouts/SupervisorLayout";
import WorkerLayout from "./layouts/WorkerLayout";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Citizen Pages
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import ReportIssue from "./pages/citizen/ReportIssue";
import MyIssues from "./pages/citizen/MyIssues";
import IssueDetails from "./pages/citizen/IssueDetails";

// Common Pages
import IssueMap from "./pages/IssueMap";
import Settings from "./pages/Settings";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageIssues from "./pages/admin/ManageIssues";
import ManageUsers from "./pages/admin/ManageUsers";
import Analytics from "./pages/admin/Analytics";
import ManageTasks from "./pages/admin/ManageTasks";

// Supervisor Pages
import SupervisorDashboard from "./pages/supervisor/SupervisorDashboard";
import AssignedIssues from "./pages/supervisor/AssignedIssues";
import ManageWorkers from "./pages/supervisor/ManageWorkers";

// Worker Pages
import WorkerDashboard from "./pages/worker/WorkerDashboard";
import MyTasks from "./pages/worker/MyTasks";
import TaskDetails from "./pages/worker/TaskDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* CITIZEN ROUTES */}
        <Route
          path="/citizen"
          element={<Navigate to="/citizen/dashboard" replace />}
        />

        <Route
          path="/citizen/dashboard"
          element={
            <CitizenLayout>
              <CitizenDashboard />
            </CitizenLayout>
          }
        />

        <Route
          path="/citizen/report-issue"
          element={
            <CitizenLayout>
              <ReportIssue />
            </CitizenLayout>
          }
        />

        <Route
          path="/citizen/my-issues"
          element={
            <CitizenLayout>
              <MyIssues />
            </CitizenLayout>
          }
        />

        <Route
          path="/citizen/map"
          element={
            <CitizenLayout>
              <IssueMap />
            </CitizenLayout>
          }
        />

        <Route
          path="/citizen/settings"
          element={
            <CitizenLayout>
              <Settings role="citizen" />
            </CitizenLayout>
          }
        />

        <Route
          path="/citizen/issues/:issueId"
          element={
            <CitizenLayout>
              <IssueDetails />
            </CitizenLayout>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={<Navigate to="/admin/dashboard" replace />}
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/issues"
          element={
            <AdminLayout>
              <ManageIssues />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/map"
          element={
            <AdminLayout>
              <IssueMap />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/tasks"
          element={
            <AdminLayout>
              <ManageTasks />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminLayout>
              <ManageUsers />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/workers"
          element={
            <AdminLayout>
              <ManageWorkers />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/analytics"
          element={
            <AdminLayout>
              <Analytics />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <AdminLayout>
              <Settings role="admin" />
            </AdminLayout>
          }
        />

        {/* SUPERVISOR ROUTES */}
        <Route
          path="/supervisor"
          element={
            <Navigate to="/supervisor/dashboard" replace />
          }
        />

        <Route
          path="/supervisor/dashboard"
          element={
            <SupervisorLayout>
              <SupervisorDashboard />
            </SupervisorLayout>
          }
        />

        <Route
          path="/supervisor/issues"
          element={
            <SupervisorLayout>
              <AssignedIssues />
            </SupervisorLayout>
          }
        />

        <Route
          path="/supervisor/workers"
          element={
            <SupervisorLayout>
              <ManageWorkers />
            </SupervisorLayout>
          }
        />

        <Route
          path="/supervisor/map"
          element={
            <SupervisorLayout>
              <IssueMap />
            </SupervisorLayout>
          }
        />

        <Route
          path="/supervisor/settings"
          element={
            <SupervisorLayout>
              <Settings role="supervisor" />
            </SupervisorLayout>
          }
        />

        {/* WORKER ROUTES */}
        <Route
          path="/worker"
          element={
            <Navigate to="/worker/dashboard" replace />
          }
        />

        <Route
          path="/worker/dashboard"
          element={
            <WorkerLayout>
              <WorkerDashboard />
            </WorkerLayout>
          }
        />

        <Route
          path="/worker/tasks"
          element={
            <WorkerLayout>
              <MyTasks />
            </WorkerLayout>
          }
        />

        <Route
          path="/worker/tasks/:taskId"
          element={
            <WorkerLayout>
              <TaskDetails />
            </WorkerLayout>
          }
        />

        <Route
          path="/worker/map"
          element={
            <WorkerLayout>
              <IssueMap />
            </WorkerLayout>
          }
        />

        <Route
          path="/worker/settings"
          element={
            <WorkerLayout>
              <Settings role="worker" />
            </WorkerLayout>
          }
        />

        {/* UNKNOWN ROUTES */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
