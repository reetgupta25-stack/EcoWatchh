import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import RequireRole from "../components/RequireRole";

function SupervisorLayout({ children }) {
  return (
    <RequireRole role="supervisor">
      <div className="app-layout">

      {/* Sidebar */}
      <Sidebar role="supervisor" />

      {/* Main Area */}
      <div className="main-area">

        {/* Top Navbar */}
        <Navbar />

        {/* Supervisor Page Content */}
        <main className="page-content">
          {children}
        </main>

        {/* Footer */}
        <Footer />

      </div>

      </div>
    </RequireRole>
  );
}

export default SupervisorLayout;