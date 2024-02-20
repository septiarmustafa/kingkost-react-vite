import React, {useState, useEffect} from 'react';
import axios from '../../../store/axiosInterceptor'
import {Fade} from 'react-reveal';
import {FaChartLine} from 'react-icons/fa';
import {useSelector} from "react-redux";

function Dashboard() {

    const userId = useSelector((state) => state.authentication.userId);
    const role = useSelector((state) => state.authentication.role)


    const [sellerId, setSellerId] = useState('')

    const [kosanData, setKosanData] = useState([]);

    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalSellers, setTotalSellers] = useState(0);
    const [totalKosans, setTotalKosans] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [totalBooking, setTotalBooking] = useState(0);

    useEffect(() => {
        axios.get('/customer/v1')
            .then(response => {
                const customers = response.data;
                const total = customers.length;
                setTotalCustomers(total);
            })
            .catch(error => {
                console.error('Error fetching customer data:', error);
            });
    }, []);

    useEffect(() => {
        axios.get('/seller/v1')
            .then(response => {
                const sellers = response.data;
                const total = sellers.length;
                setTotalSellers(total);
            })
            .catch(error => {
                console.error('Error fetching seller data:', error);
            });
    }, []);

    useEffect(() => {
        if (role === 'ROLE_ADMIN') {
            axios.get('/kost')
                .then(response => {
                    const kosans = response.data.data;
                    const total = kosans.length;
                    setTotalKosans(total);
                    setKosanData(kosans);
                })
                .catch(error => {
                    console.error('Error fetching kosan data:', error);
                });
        } else if (role === 'ROLE_SELLER') {
            const fetchSellerId = async () => {
                try {
                    const response = await axios.get(`seller/user/${userId}`);
                    const responseSellerId = response.data.data.id;
                    setSellerId(responseSellerId);

                    const kosansResponse = await axios.get(`/kost?sellerId=${responseSellerId}`);
                    const kosans = kosansResponse.data.data;
                    const total = kosans.length;
                    setTotalKosans(total);
                    setKosanData(kosans);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchSellerId();
        }
    }, [userId, role]);

    useEffect(() => {
        axios.get('/review/v1')
            .then(response => {
                const reviews = response.data;
                const total = reviews.length;
                setTotalReviews(total);
            })
            .catch(error => {
                console.error('Error fetching kosan data:', error);
            });
    }, []);

    useEffect(() => {
        if (role === 'ROLE_ADMIN') {
            axios.get('/transactions')
                .then(response => {
                    const booking = response.data.data;
                    const total = booking.length;
                    setTotalBooking(total);
                })
                .catch(error => {
                    console.error('Error fetching Booking data:', error);
                });
        } else if (role === 'ROLE_SELLER') {
            const fetchTransactionSellerId = async () => {
                try {
                    const response = await axios.get(`seller/user/${userId}`);
                    const responseSellerId = response.data.data.id;
                    setSellerId(responseSellerId);
                    console.log("HAHAH", sellerId)

                    const bookingResponse = await axios.get(`/transactions?sellerId=${sellerId}`);
                    const booking = bookingResponse.data.data;
                    const total = booking.length;
                    setTotalBooking(total);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchTransactionSellerId();
        }
    }, [sellerId]);

    return (
        <main className="main users chart-page" id="skip-target">
            <div className="container">
                <div className="marquee-container my-3 mb-5" style={{
                    borderRadius: '10px',
                    backgroundColor: '#e88b10',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 1)',
                    textAlign: 'center'
                }}>
                    <p className="main-title pt-3"
                       style={{color: '#000000', textShadow: '2px 2px 4px rgba(0,0,0,0.2)'}}>
                        Welcome to Dashboard <span style={{color: '#ffff'}}> Kingkos </span> App
                    </p>
                </div>


                <Fade top>
                    <h1 className="main-title mb-4 mt-3" style={{color: '#241609', fontFamily: 'revert-layer'}}>
                        <FaChartLine style={{marginRight: '10px', color: '#ba5e07'}}/>
                        Dashboard<span style={{color: '#ba5e07', fontWeight: 'bold'}}> Kingkos </span> App
                    </h1>
                </Fade>
                <hr className="mb-5"/>
                <div className="row g-3">
                    <div className="col-md-6 col-xl-3">
                        <div className="card text-white px-2" style={{
                            backgroundColor: '#000000',
                            borderRadius: '20px',
                            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
                        }}>
                            <div className="card-body">
                                <i className="bi bi-people" style={{fontSize: '2.5rem'}}></i>
                                <p className="card-text text-secondary fw-bold">Total : {totalCustomers}</p>
                                <p className="card-text text-white fw-bold">Customer</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-3">
                        <div className="card text-white px-2" style={{
                            backgroundColor: '#000000',
                            borderRadius: '20px',
                            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
                        }}>
                            <div className="card-body">
                                <i className="bi bi-person" style={{fontSize: '2.5rem'}}></i>
                                <p className="card-text text-secondary fw-bold" style={{fontSize: '15px'}}>Total
                                    : {totalSellers}</p>
                                <p className="card-text text-white fw-bold">Seller</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-xl-3">
                        <div className="card text-white px-2" style={{
                            backgroundColor: '#000000',
                            borderRadius: '20px',
                            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
                        }}>
                            <div className="card-body">
                                <i className="bi bi-house" style={{fontSize: '2.5rem'}}></i>
                                <p className="card-text text-secondary fw-bold" style={{fontSize: '15px'}}>Total
                                    : {totalKosans}</p>
                                <p className="card-text text-white fw-bold">Kosan</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-xl-3">
                        <div className="card text-white px-2" style={{
                            backgroundColor: '#000000',
                            borderRadius: '20px',
                            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
                        }}>
                            <div className="card-body">
                                <i className="bi bi-star" style={{fontSize: '2.5rem'}}></i>
                                <p className="card-text text-secondary fw-bold" style={{fontSize: '15px'}}>Total
                                    : {totalBooking}</p>
                                <p className="card-text text-white fw-bold">Booking</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row g-3 mt-2">
                    <div className="col-md-6 col-xl-3">
                        <div className="card text-white px-2" style={{
                            backgroundColor: '#000000',
                            borderRadius: '20px',
                            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
                        }}>
                            <div className="card-body">
                                <i className="bi bi-star" style={{fontSize: '2.5rem'}}></i>
                                <p className="card-text text-secondary fw-bold" style={{fontSize: '15px'}}>Total
                                    : {totalReviews}</p>
                                <p className="card-text text-white fw-bold">Testimonial</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-3">
                        <div className="card text-white px-2" style={{
                            backgroundColor: '#000000',
                            borderRadius: '20px',
                            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
                        }}>
                            <div className="card-body">
                                <i className="bi bi-star" style={{fontSize: '2.5rem'}}></i>
                                <p className="card-text text-secondary fw-bold" style={{fontSize: '15px'}}>Total
                                    : {totalReviews}</p>
                                <p className="card-text text-white fw-bold">Pending Transaction</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-3">
                        <div className="card text-white px-2" style={{
                            backgroundColor: '#000000',
                            borderRadius: '20px',
                            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
                        }}>
                            <div className="card-body">
                                <i className="bi bi-star" style={{fontSize: '2.5rem'}}></i>
                                <p className="card-text text-secondary fw-bold" style={{fontSize: '15px'}}>Total
                                    : {totalReviews}</p>
                                <p className="card-text text-white fw-bold">Reject Transaction</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-3">
                        <div className="card text-white px-2" style={{
                            backgroundColor: '#000000',
                            borderRadius: '20px',
                            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
                        }}>
                            <div className="card-body">
                                <i className="bi bi-star" style={{fontSize: '2.5rem'}}></i>
                                <p className="card-text text-secondary fw-bold" style={{fontSize: '15px'}}>Total
                                    : {totalReviews}</p>
                                <p className="card-text text-white fw-bold">Succes Transaction</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-lg-12">
                        <div className="table-responsive">
                            <h4 className="table-title"><i className="fas fa-home me-2"></i>Data Kosan</h4>
                            <hr className="mb-4"/>
                            <table className="table table-striped table-hover">
                                <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Available Room</th>
                                    <th>WiFi</th>
                                    <th>AC</th>
                                    <th>Parking</th>
                                    <th>Gender Type</th>
                                    <th>Seller</th>
                                    <th>Province</th>
                                    <th>City</th>
                                    <th>Subdistrict</th>
                                    <th>Images</th>
                                </tr>
                                </thead>
                                <tbody>
                                {kosanData.map((kosan, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{kosan.name}</td>
                                        <td>{kosan.description}</td>
                                        <td>{kosan.kostPrice.price}</td>
                                        <td>{kosan.availableRoom}</td>
                                        <td>{kosan.isWifi ? 'Yes' : 'No'}</td>
                                        <td>{kosan.isAc ? 'Yes' : 'No'}</td>
                                        <td>{kosan.isParking ? 'Yes' : 'No'}</td>
                                        <td>{kosan.genderType.name}</td>
                                        <td>{kosan.seller.fullName}</td>
                                        <td>{kosan.province.name}</td>
                                        <td>{kosan.city.name}</td>
                                        <td>{kosan.subdistrict.name}</td>
                                        <td>
                                            <img
                                                className="img-fluid"
                                                src={kosan.images.length > 0 ? kosan.images[0].url : defaultImage}
                                                alt={kosan.images.length > 0 ? kosan.images[0].fileName : 'Placeholder'}
                                                style={{height: '40px', width: '40px', borderRadius: '20px'}}
                                            />
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Dashboard;
