import { Link } from 'react-router-dom';
import img1 from '../../assets/img/login-tenant.svg'
import img2 from '../../assets/img/login-owner.svg'
import img3 from '../../assets/img/login-admin.svg'

function SelectLogin() {
    return (
        <section className="nav d-flex justify-content-center align-items-center" style={{ background: 'linear-gradient(to bottom, #a36903, #873f00)', minHeight: '100vh' }}>
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="card wow fadeInUp" style={{ marginBottom: '1rem', borderRadius: '15px', backgroundColor: '#f2f2f2', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', transition: '0.3s' }}>
                            <div className="card-body text-center"> {/* Menambahkan kelas text-center */}
                                <h5 className="card-title">Customer (Pencari Kos)</h5>
                                <img src={img1} alt="" style={{ width: '100%', height: '20em' }} /> {/* Menambahkan ukuran gambar */}
                                <p className="card-text">Login as a customer to find and rent rooms.</p>
                                <Link to="/login/customer" className="btn btn-secondary" style={{ borderRadius: '10px' }}>Login as Customer</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="card wow fadeInUp" style={{ marginBottom: '1rem', borderRadius: '15px', backgroundColor: '#f2f2f2', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', transition: '0.3s' }}>
                            <div className="card-body text-center"> {/* Menambahkan kelas text-center */}
                                <h5 className="card-title">Seller (Pemilik Kos)</h5>
                                <img src={img2} alt="" style={{ width: '100%', height: '20em' }} /> {/* Menambahkan ukuran gambar */}
                                <p className="card-text">Login as a seller to list and manage rooms.</p>
                                <Link to="/login/seller" className="btn btn-secondary" style={{ borderRadius: '10px' }}>Login as Seller</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="card wow fadeInUp" style={{ marginBottom: '1rem', borderRadius: '15px', backgroundColor: '#f2f2f2', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', transition: '0.3s' }}>
                            <div className="card-body text-center"> {/* Menambahkan kelas text-center */}
                                <h5 className="card-title">Admin (Admin Kingkos)</h5>
                                <img src={img3} alt="" style={{ width: '100%', height: '20em' }} /> {/* Menambahkan ukuran gambar */}
                                <p className="card-text">Login as a admin to manage data kingkos</p>
                                <Link to="/login/admin" className="btn btn-secondary" style={{ borderRadius: '10px' }}>Login as Admin</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SelectLogin;
