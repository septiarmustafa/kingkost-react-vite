import React from 'react';
import { Link } from 'react-router-dom';

function Profile() {
    const isFullProfile = true; // Ganti dengan kondisi sesuai data profil

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Nama Pengguna</h5>
                            <img src="avatar.jpg" className="card-img-top" alt="Avatar" />
                            <p className="card-text">Informasi tambahan tentang pengguna</p>
                            <p className={`card-text ${isFullProfile ? 'text-success' : 'text-danger'}`}>
                                {isFullProfile ? 'Profil Lengkap' : 'Profil Belum Lengkap'}
                            </p>
                        </div>
                    </div>
                    <div className="mt-3">
                        <ul className="list-group">
                            <li className="list-group-item">Kos Saya</li>
                            <li className="list-group-item">Riwayat Pengajuan Sewa</li>
                            <li className="list-group-item">Riwayat Kos</li>
                            <li className="list-group-item">Riwayat Transaksi</li>
                            <li className="list-group-item">Poin Saya Baru 0</li>
                            <li className="list-group-item">Voucher Saya</li>
                            <li className="list-group-item">Verifikasi Akun</li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Kos Saya</h5>
                            {isFullProfile ? (
                                <div>
                                    {/* Tampilkan informasi tentang penyewaan kos */}
                                    <p>Informasi tentang kos yang disewa</p>
                                </div>
                            ) : (
                                <div>
                                    <p>Kamu belum menyewa kos</p>
                                    <p>Coba cara ngekos modern dengan manfaat berikut ini:</p>
                                    <ul>
                                        <li>Tagihan dan kontrak sewa tercatat rapi</li>
                                        <li>Mamikos menjaga keamanan transaksi</li>
                                        <li>Cashless, dengan beragam metode pembayaran</li>
                                    </ul>
                                    <button className="btn btn-primary">Mulai Nyari Kosan</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-3 text-center">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <Link to="/cari-kos" className="btn btn-primary btn-lg" style={{ width: '200px', borderRadius: '15px' }}>
                                    Mulai Cari Kos
                                </Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="/sewa-kos" className="btn btn-primary btn-lg" style={{ width: '200px', borderRadius: '15px' }}>
                                    Sewa Kos
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
