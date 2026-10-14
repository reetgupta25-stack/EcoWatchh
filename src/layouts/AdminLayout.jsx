import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function AdminLayout({ children }) {
  return (
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
  );
}

export default AdminLayout;