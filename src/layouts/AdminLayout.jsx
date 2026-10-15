import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import RequireRole from "../components/RequireRole";

function AdminLayout({ children }) {
  return (
    <RequireRole role="admin">
      <div className="app-layout">

      {/* Sidebar */}
      <Sidebar role="admin" />

      {/* Main Area */}
      <div className="main-area">

        {/* Navbar */}
        <Navbar />

        {/* Admin Page Content */}
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

export default AdminLayout;