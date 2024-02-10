import React from 'react';
import SideBar from '../../../components/Admin/SideBar/SideBar';
import NavbarAdmin from '../../../components/Admin/Navbar/NavbarAdmin';
import './Style.css';
import Dashboard from '../../../components/Admin/Dashboard/Dashboard';

function PageDashboard() {
  return (
    <div className="dashboard-container">
      <div className="row">
        {/* Bagian Kiri (Sidebar) */}
        <div className="col-md-2">
          <SideBar />
        </div>
        {/* Bagian Kanan (Navbar dan Main Content) */}
        <div className="col-md-10">
          <div className="row">
            {/* Navbar */}
            <div className="col-md-12 me-5">
              <NavbarAdmin />
            </div>
          </div>
          <div className="row">
            {/* Main Content */}
            <div className="col-md-12">
              {/* Isi dari main content, misalnya <Home /> */}
              <Dashboard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageDashboard;
