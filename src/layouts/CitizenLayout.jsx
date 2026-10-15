import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import RequireRole from "../components/RequireRole";

function CitizenLayout({ children }) {
  return (
    <RequireRole role="citizen">
      <div className="app-layout">

      {/* Sidebar */}
      <Sidebar role="citizen" />

      {/* Main Area */}
      <div className="main-area">

        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
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

export default CitizenLayout;