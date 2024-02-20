import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../store/axiosInterceptor';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGenderless, FaUpload, FaUser, FaWhatsapp, FaMoneyBill, FaVoicemail, FaFileMedicalAlt, FaAddressBook, FaMoneyBillAlt, FaCashRegister } from 'react-icons/fa';
import kos1 from '../../assets/img/kosan1.jpg';
import kos2 from '../../assets/img/kosan2.jpg';
import defaultUserImg from '../../assets/img/def.webp';
import { Carousel, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import oop from '../../assets/img/oops.jpg';

function Profile() {
    const [isLoading, setIsLoading] = useState(true);
    const [apiUserData, setApiUserData] = useState(null);
    const [genders, setGenders] = useState([]);
    const [profileCompletion, setProfileCompletion] = useState(0);
    const [imageUploaded, setImageUploaded] = useState(false); // State untuk menandai bahwa gambar telah diunggah
    const [recommendedKos, setRecommendedKos] = useState([]);
    const [isUploading, setIsUploading] = useState(false); // State untuk menandai bahwa sedang dalam proses upload
    const [bookings, setBookings] = useState([]);
    const [transactionDate, setTransactionDate] = useState(new Date());

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

                // Fetch booking data
                const response = await axios.get(`/transactions?customerId=${matchedUser.id}`);
                setBookings(response.data.data);

                // Delay for 3 seconds to simulate loading
                await new Promise(resolve => setTimeout(resolve, 500));

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userId, imageUploaded]);

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


    const handleEditProfile = () => {
        navigate(`/edit-profile/${userId}`);
    };

    const handleImageClick = () => {
        // Handling image upload
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
                                            <Link to="/myBooking" className="btn btn-outline-dark w-100">My Booking Kos</Link>
                                        </li> 
                                        <li className="list-group-item">
                                            <Link to="/addTestimonial" className="btn btn-outline-dark w-100">Give A Testimonial</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-8">
                            <div className="card mt-3 p-3 wow fadeInUp" style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '15px' }}>
                                <div className="card-body">
                                    {/* User's booked kos */}
                                    {bookings.length > 0 ? (
                                        bookings.map((booking) => (
                                            <div key={booking.id}>
                                                <h4>My Booking Kos</h4>
                                                <hr />
                                            
                                                <div className="mb-3 d-flex">
                                               
                                                    <div>
                                                        <img src={booking.kost.images[0].url} alt="Kost Image" style={{width: '25rem', height: '20rem', borderRadius: '20px'}} />
                                                        <div className='mt-2'>
                                                            <Link to={`https://wa.me/${booking.kost.seller.phoneNumber}`} target="_blank" className="btn btn-success mt-3 mb-2" style={{ borderRadius: '15px' }}>
                                                                <FaWhatsapp style={{ marginRight: "5px" }} /> Chat Seller
                                                            </Link>
                                                        </div>
                                                        <p className='mt-2'>
                                                            <i className={`fa fa-wifi ${booking.kost.isWifi ? 'text-success' : 'text-danger'}`}></i> WiFi: {booking.kost.isWifi ? 'Yes' : 'No'} |
                                                            <i className={`ps-1 fa fa-thermometer-three-quarters ${booking.kost.isAc ? 'text-success' : 'text-danger'}`}></i> AC: {booking.kost.isAc ? 'Yes' : 'No'} |
                                                            <i className={`ps-1 fa fa-car ${booking.kost.isParking ? 'text-success' : 'text-danger'}`}></i> Park: {booking.kost.isParking ? 'Yes' : 'No'}
                                                        </p>
                                                        <label className='fw-bold' style={{color: 'black'}}>{booking.kost.name}</label>
                                                        <label className='mx-4 mb-3' style={{color: 'black'}} htmlFor="">|| <FaMoneyBill className='mb-1 ms-3 me-2'/>  {formatRupiah(booking.kost.kostPrice.price)}</label>
                                                        <p className=''><FaUser className='mb-1 me-2'/>Seller Name : {booking.kost.seller.fullName}</p>
                                                    </div>
                                                    <div className='ps-5 pt-2'>
                                                        <h5>Description Kost :</h5>
                                                        <p className='p'>{booking.kost.description}</p>

                                                        <h5>Data Customer :</h5>
                                                        <p className='mt-3 mb-2 pe-2'><FaUser /> {booking.customer.fullName}</p>
                                                        <p className='mt-3 mb-2 pe-2'><FaEnvelope /> {booking.customer.email}</p>
                                                        <p className='mt-3 mb-2 pe-2'><FaPhone /> {booking.customer.phoneNumber}</p>
                                                        <p className='mt-3 mb-4 pe-2'><FaAddressBook /> {booking.customer.address}</p>

                                                        <p>Payment Type : <FaMoneyBillAlt className='my-2 ms-5 me-1' /> {booking.paymentType.name}</p>
                                                       
                                                        <p className='me-2'>Transaction Date :
                                                            <DatePicker className='ms-4' selected={transactionDate} onChange={date => setTransactionDate(date)} dateFormat="dd/MM/yyyy" />
                                                        </p>
                                                        
                                                        <p>Status Booking : 
                                                            <span className={`ms-5 badge text-white ${
                                                                booking.aprStatus === 0 ? 'bg-info' :
                                                                booking.aprStatus === 1 ? 'bg-danger' :
                                                                booking.aprStatus === 2 ? 'bg-danger' :
                                                                booking.aprStatus === 3 ? 'bg-success' : 'bg-danger'}`}
                                                                style={{ padding: '10px', fontSize: '12px', borderRadius: '10px' }}>
                                                                {booking.aprStatus === 0 ? 'Pending' :
                                                                booking.aprStatus === 1 ? 'Cancel' :
                                                                booking.aprStatus === 2 ? 'Reject' :
                                                                booking.aprStatus === 3 ? 'Approve' : ''}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        // If no bookings found
                                        <div className="card-body wow fadeInUp" style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '15px' }}>
                                            <div className='d-flex'>
                                                <img src={oop} alt="Image Kos Not Found" style={{height: '10rem'}} />
                                                <h5 className='mb-3 mt-5'> Oooppps !!! Kamu belum menyewa kos</h5>
                                            </div>
                                           
                                            <p className='ms-3 mt-4 fw-bold'>Coba cara ngekos modern dengan manfaat berikut ini :</p>
                                            <ul>
                                                <li className='my-2'><FaFileMedicalAlt className='mb-1' /> <span className='ms-1'> Tagihan dan kontrak sewa tercatat rapi </span></li>
                                                <li className='my-2'><FaUser className='mb-1'/> <span className='ms-1'> Kingkos menjaga keamanan transaksi </span></li>
                                                <li className='my-2'><FaCashRegister className='mb-1'/> <span className='ms-1'>  Pembayaran dengan secara Cash </span></li>
                                            </ul>
                                            <Button className='m-3' variant="secondary" onClick={handleCariKosanClick} style={{ borderRadius: '15px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>Cari Kosan</Button>
                                        </div>
                                    )}
                                </div>
                            </div>

                             {/* Recommended Kos Carousel */}
                            <div className="card mt-3 p-3 wow fadeInUp" style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '15px' }}>
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
            {isUploading && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white opacity-75">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
