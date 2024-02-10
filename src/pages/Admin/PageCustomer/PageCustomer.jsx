import React from 'react';
import SideBar from '../../../components/Admin/SideBar/SideBar';
import NavbarAdmin from '../../../components/Admin/Navbar/NavbarAdmin';
import Customer from '../../../components/Admin/Customer/Customer';

function PageCustomer() {
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
              <Customer/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageCustomer;
