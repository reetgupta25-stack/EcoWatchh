import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function WorkerLayout({ children }) {
  return (
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
  );
}

export default WorkerLayout;