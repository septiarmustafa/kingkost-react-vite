import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../store/axiosInterceptor';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGenderless, FaStar } from 'react-icons/fa';
import kos1 from '../../assets/img/kosan1.jpg';
import kos2 from '../../assets/img/kosan2.jpg';
import defaultUserImg from '../../assets/img/def.webp';
import { Carousel } from 'react-bootstrap';
import Swal from 'sweetalert2';

function Profile() {
    const [isLoading, setIsLoading] = useState(true);
    const [apiUserData, setApiUserData] = useState(null);
    const [genders, setGenders] = useState([]);
    const [profileCompletion, setProfileCompletion] = useState(0);
    const [imageUploaded, setImageUploaded] = useState(false); // State untuk menandai bahwa gambar telah diunggah

    const user = useSelector(state => state.user);
    const userId = useSelector((state) => state.authentication.userId);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(userId)
                const userDataResponse = await axios.get(`/customer/user/${userId}`);
                const matchedUser = userDataResponse.data.data;
                setApiUserData(matchedUser);
                const completedFields = Object.values(matchedUser).filter(value => value !== null && value !== '').length;
                const totalFields = Object.keys(matchedUser).length;
                const completionPercentage = (completedFields / totalFields) * 100;
                setProfileCompletion(completionPercentage);

                const gendersResponse = await axios.get('/gender/v1');
                setGenders(gendersResponse.data);

                // Delay for 3 seconds to simulate loading
                await new Promise(resolve => setTimeout(resolve, 500));

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userId, imageUploaded]); // Tambahkan imageUploaded ke dependencies agar useEffect dipanggil saat imageUploaded berubah

    const handleEditProfile = () => {
        navigate(`/edit-profile/${userId}`);
    };

    const handleImageClick = () => {
        Swal.fire({
            title: "Upload Image",
            text: "Please upload an image",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Upload",
            cancelButtonText: "Cancel",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.onchange = (event) => handleFileInputChange(event, apiUserData.id);
                input.click();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                console.log("Upload canceled");
            }
        });
    };
    
    const handleFileInputChange = async (event, userId) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);
    
                // Post data ke endpoint yang ditentukan
                await axios.post(`http://localhost:8080/customer/v1/upload/${userId}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
    
                // Menampilkan pesan berhasil
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Upload Image Successful!',
                    showConfirmButton: true,
                    timer: 2000
                });
    
                // Menandai bahwa gambar telah diunggah
                setImageUploaded(prevState => !prevState);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    return (
        <div className="container mt-5">
            {isLoading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card wow fadeInUp" style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '15px' }}>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="card-title">Profil Pengguna</h5>
                                        <button onClick={handleEditProfile} className="btn btn-secondary" style={{ borderRadius: '10px' }}>Edit Profile</button>
                                    </div>
                                    {apiUserData && (
                                        <>
                                            <div className="d-flex align-items-center justify-content-start mb-3">
                                                 {/* <img src={img} alt="Avatar" style={{ width: '70px', height: '70px', borderRadius: '20px' }} /> */}
                                                    <img
                                                        src={apiUserData.url ? apiUserData.url : defaultUserImg}
                                                        className="card-img-top"
                                                        alt="Kos 1"
                                                        style={{ width: '70px', height: '70px', borderRadius: '20px' , objectFit: 'cover', cursor: 'pointer' }}
                                                        onClick={handleImageClick}
                                                    />
                                                <h5 className="card-text text-center ms-3">{apiUserData.fullName}</h5>
                                            </div>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item"><FaEnvelope /> <label htmlFor="" className='ms-2'> {apiUserData.email} </label></li>
                                                <li className="list-group-item">
                                                    <FaGenderless /> <label htmlFor="" className='ms-2'> {genders.find(gender => gender.id === apiUserData.genderTypeId.id)?.name} </label>
                                                </li>
                                                <li className="list-group-item"><FaPhone /> <label htmlFor="" className='ms-2'> {apiUserData.phoneNumber} </label></li>
                                                <li className="list-group-item"><FaMapMarkerAlt /> <label htmlFor="" className='ms-2'> {apiUserData.address} </label></li>
                                            </ul>
                                            <div className="progress mt-3">
                                                <div className="progress-bar" role="progressbar" style={{ backgroundColor: 'gold', width: `${profileCompletion}%` }} aria-valuenow={profileCompletion} aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <p className="mt-2 text-center">Kelengkapan Profil: {profileCompletion.toFixed(2)}%</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className=" card mt-3 wow fadeInUp" style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '15px' }}>
                                <ul className="list-group" style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '15px' }}>
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
                            <div className="card wow fadeInUp"  style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '15px' }}>
                                <div className="card-body">
                                    <h5 className="card-title">Kos Saya</h5>
                                    {user.isFullProfile ? (
                                        <div>
                                            <p>Informasi tentang kos yang disewa</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <p>Kamu belum menyewa kos</p>
                                            <p>Coba cara ngekos modern dengan manfaat berikut ini:</p>
                                            <ul>
                                                <li>Tagihan dan kontrak sewa tercatat rapi</li>
                                                <li>Kingkos menjaga keamanan transaksi</li>
                                                <li>Cashless, dengan beragam metode pembayaran</li>
                                            </ul>
                                            <button className="btn btn-success" style={{ borderRadius: '10px' }}>Cari Kosan</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mt-3 text-center p-3 wow fadeInUp"  style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '15px' }}>
                                <h4 className='py-2'>Rekomendasi kos buat kamu </h4>
                                <Carousel prevIcon={<span />} nextIcon={<span />}>
                                    <Carousel.Item>
                                        <div className="d-flex justify-content-around">
                                            <div className="card" style={{boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '15px', width: '45%', margin: '10px', textAlign: 'justify', fontFamily: 'Arial, sans-serif', border: '1px solid #ced4da' }}>
                                                <img src={kos1} className="card-img-top" alt="Kos 1" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center mb-3">
                                                        <button className="btn btn-border" style={{ border: '1px solid #ced4da', borderRadius: '5px', padding: '5px 10px' }}>
                                                            <p className="card-title ms-1 me-3 mb-0">Kos Andalan</p>
                                                        </button>
                                                        <button className="btn btn-border ms-3" style={{ border: '1px solid #ced4da', borderRadius: '5px', padding: '5px 10px' }}>
                                                            <p className="card-title ms-1 mb-0">Male</p>
                                                        </button>
                                                        <p className="card-text ms-auto mb-0"><FaStar /> 4.8</p>
                                                    </div>
                                                    <p className="card-text">Kost Abah Tipe Eksklusif Pasar Minggu Jakarta Selatan Pasar Minggu</p>
                                                    <p className="card-text">K. Mandi Dalam · WiFi · AC · Kloset Duduk · Kasur · Akses 24 Jam</p>
                                                    <p className="card-text">Rp 2.250.000 / bulan</p>
                                                </div>
                                            </div>
                                            <div className="card" style={{boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '15px', width: '45%', margin: '10px', textAlign: 'justify', fontFamily: 'Arial, sans-serif', border: '1px solid #ced4da' }}>
                                                <img src={kos2} className="card-img-top" alt="Kos 1" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center mb-3">
                                                        <button className="btn btn-border" style={{ border: '1px solid #ced4da', borderRadius: '5px', padding: '5px 10px' }}>
                                                            <p className="card-title ms-1 me-3 mb-0">Kos Andalan</p>
                                                        </button>
                                                        <button className="btn btn-border ms-3" style={{ border: '1px solid #ced4da', borderRadius: '5px', padding: '5px 10px' }}>
                                                            <p className="card-title ms-1 mb-0">Male</p>
                                                        </button>
                                                        <p className="card-text ms-auto mb-0"><FaStar /> 4.8</p>
                                                    </div>
                                                    <p className="card-text">Kost Abah Tipe Eksklusif Pasar Minggu Jakarta Selatan Pasar Minggu</p>
                                                    <p className="card-text">K. Mandi Dalam · WiFi · AC · Kloset Duduk · Kasur · Akses 24 Jam</p>
                                                    <p className="card-text">Rp 2.250.000 / bulan</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Profile;