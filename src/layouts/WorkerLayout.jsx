import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import RequireRole from "../components/RequireRole";

function WorkerLayout({ children }) {
  return (
    <RequireRole role="worker">
      <div className="app-layout">

      {/* Sidebar */}
      <Sidebar role="worker" />

      {/* Main Area */}
      <div className="main-area">

        {/* Top Navbar */}
        <Navbar />

        {/* Worker Page Content */}
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

export default WorkerLayout;