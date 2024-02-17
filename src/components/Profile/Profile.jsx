import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../store/axiosInterceptor';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGenderless, FaStar } from 'react-icons/fa';
import kos1 from '../../assets/img/kosan1.jpg';
import kos2 from '../../assets/img/kosan2.jpg';
import defaultUserImg from '../../assets/img/def.webp';
import { Carousel, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

function Profile() {
    const [isLoading, setIsLoading] = useState(true);
    const [apiUserData, setApiUserData] = useState(null);
    const [genders, setGenders] = useState([]);
    const [profileCompletion, setProfileCompletion] = useState(0);
    const [imageUploaded, setImageUploaded] = useState(false); // State untuk menandai bahwa gambar telah diunggah
    const [recommendedKos, setRecommendedKos] = useState([]);

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

    useEffect(() => {
        const fetchDataKost = async () => {
            try {
                const kostResponse = await axios.get('http://localhost:8080/kost');
                setRecommendedKos(kostResponse.data.data);
            } catch (error) {
                console.error('Error fetching recommended kos data:', error);
            }
        };

        fetchDataKost();
    }, []); 

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
    
    const formatRupiah = (value) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
      };

      const handleCariKosanClick = () => {
        navigate('/kosan');
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

                                 {/* Action Buttons */}
                                <div className="card mb-3" style={{borderColor: 'white'}}>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <Link to="/myBooking" className="btn btn-outline-secondary w-100">My Booking Kos</Link>
                                        </li> 
                                        <li className="list-group-item">
                                            <Link to="/addTestimonial" className="btn btn-outline-secondary w-100">Give A Testimonial</Link>
                                        </li>
                                    </ul>
                                </div>
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
                                            <Button className='m-3' variant="secondary" onClick={handleCariKosanClick} style={{borderRadius: '15px'}}>Cari Kosan</Button>
                                        </div>
                                    )}
                                </div>
                            </div>

                             {/* Recommended Kos Carousel */}
                            <div className="card mt-3 p-3" style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '15px' }}>
                                <div className="card-body">
                                    <h5 className="card-title mb-4">Rekomendasi kos buat kamu</h5>
                                    <Carousel
                                        prevIcon={<span className="carousel-control-prev-icon" />}
                                        nextIcon={<span className="carousel-control-next-icon" />}
                                        slidesToShow={1} // Mengatur jumlah item yang ditampilkan dalam satu slide
                                        slidesToScroll={1}
                                    >
                                        {recommendedKos.map((kos, index) => (
                                            <Carousel.Item key={kos.id}>
                                                <div className="d-flex justify-content-around">
                                                    {recommendedKos.slice(index, index + 3).map((kosItem) => ( // Mengambil 3 item dalam satu slide
                                                        <div className="card m-3" style={{ width: '28rem', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '15px' }} key={kosItem.id}>
                                                            <img src={kosItem.images.length > 0 ? kosItem.images[0].url : DefaultImage} className="card-img-top" alt={kosItem.images.length > 0 ? kosItem.images[0].fileName : 'Placeholder'} />
                                                            <div className="card-body">
                                                                <div className="d-flex border-bottom">
                                                                    <small className="flex-fill text-center border-end py-2 px-1">
                                                                        <i className="fa fa-map-marker-alt text-primary me-2"></i>
                                                                        {kosItem.city.name}
                                                                    </small>
                                                                    <small className="flex-fill text-center border-end py-2 px-1">
                                                                        <i className="fa fa-calendar-alt text-primary me-2"></i>
                                                                        Available Rooms: {kosItem.availableRoom}
                                                                    </small>
                                                                    <small className="flex-fill text-center py-2 px-1">
                                                                        <i className="fa fa-solid fa-venus-mars text-primary me-2"></i>
                                                                        Gender Kosan: {kosItem.genderType.name}
                                                                    </small>
                                                                </div>
                                                                <h5 className="card-title pt-3">{kosItem.name}</h5>
                                                                <p className="card-text">{kosItem.description}</p>
                                                                <div>
                                                                    <p className='mb-4'>
                                                                        <i className={`fa fa-wifi ${kosItem.isWifi ? 'text-success' : 'text-danger'}`}></i> WiFi: {kosItem.isWifi ? 'Yes' : 'No'} |
                                                                        <i className={`ps-1 fa fa-thermometer-three-quarters ${kosItem.isAc ? 'text-success' : 'text-danger'}`}></i> AC: {kosItem.isAc ? 'Yes' : 'No'} |
                                                                        <i className={`ps-1 fa fa-car ${kosItem.isParking ? 'text-success' : 'text-danger'}`}></i> Park: {kosItem.isParking ? 'Yes' : 'No'}
                                                                    </p>
                                                                </div>
                                                                <p className='mb-2 text-dark'>Address: {kosItem.subdistrict.name}, {kosItem.city.name}, {kosItem.province.name}</p>
                                                                <p className="card-text">{formatRupiah(kosItem.kostPrice.price)}/month</p>
                                                                <p className="card-text"> <i className="fa fa-user text-primary me-2"></i>{kosItem.seller.fullName}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>

                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Profile;