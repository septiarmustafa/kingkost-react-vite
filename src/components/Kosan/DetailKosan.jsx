import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import {Carousel} from 'react-bootstrap';
import defaultUserImg from '../../assets/img/default-user.png';

function DetailKosan() {
    const {id} = useParams();
    const [kosanData, setKosanData] = useState(null);
    const [totalCost, setTotalCost] = useState(0);

    const handleCalculateCost = () => {
        const startDate = document.getElementById('startDate').value;
        const months = parseInt(document.getElementById('months').value);

        // Lakukan perhitungan biaya di sini
        // Misalnya, jika harga per bulan adalah 1.300.000, maka total biaya adalah harga per bulan dikalikan dengan jumlah bulan
        const pricePerMonth = kosanData.kostPrice.price;
        const total = pricePerMonth * months;

        setTotalCost(total.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})); // Format total biaya menjadi format mata uang Indonesia
    };

    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);

    const handleStartDateChange = (event) => {
        const selectedDate = event.target.value;
        const currentDate = new Date().toISOString().split('T')[0];

        if (selectedDate < currentDate) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Anda tidak dapat memilih tanggal sebelum hari ini.',
            });
            setStartDate(currentDate);
        } else {
            setStartDate(selectedDate);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/kost/${id}`);
                setKosanData(response.data.data);
            } catch (error) {
                console.error('Error fetching kosan data:', error);
            }
        };

        fetchData();
    }, [id]);

    if (!kosanData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="row my-3">
                <div className="card shadow col-md-6 px-3" style={{borderRadius: '15px'}}>
                    <div className="card-body">
                        {kosanData.images.length > 1 ? (
                            <Carousel>
                                {kosanData.images.map((image, index) => (
                                    <Carousel.Item key={index}>
                                        <img
                                            className="d-block w-100 h-50"
                                            src={image.url}
                                            alt={image.alt}
                                            style={{borderRadius: '15px'}}
                                        />
                                        <Carousel.Caption>
                                            <h3>{image.caption}</h3>
                                            <p>{image.description}</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        ) : (
                            <img
                                className="d-block w-100 h-50"
                                src={kosanData.images[0].url}
                                alt={kosanData.images[0].alt}
                                style={{borderRadius: '15px'}}
                            />
                        )}
                        <div className="col-md-12">
                            <div className="detail-header">
                                <div className="detail-header-info">
                                    <h3 className="detail-title">{kosanData.name}</h3>
                                    <p className='mb-1'> {kosanData.description} </p>
                                    <p className="detail-address">{kosanData.province.name} || {kosanData.city.name}
                                        <br/>{kosanData.subdistrict.name}</p>
                                    <div className="detail-features row">
                                        <div className="col-md-4">
                                            <div className="detail-feature">
                                                <i className="fas fa-bed text-primary"></i>
                                                <span className='ms-2'>{kosanData.availableRoom} Room</span>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="detail-feature">
                                                <i className="fas fa-user-friends text-primary"></i>
                                                <span className='ms-2'>{kosanData.genderType.name}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="detail-price my-3">
                                        <i className="fas fa-solid fa-tag text-danger"></i>
                                        <span className='ms-2'> {kosanData.kostPrice.price.toLocaleString('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR'
                                        })}/month</span>
                                    </div>
                                </div>
                            </div>
                            <div className="detail-amenities">
                                <h5>Fasilitas</h5>
                                <ul className="list-unstyled">
                                    <li>
                                        <i className={`fas fa-wifi me-2 ${kosanData.isWifi ? 'text-primary' : 'text-danger'}`}></i>
                                        {kosanData.isWifi ? 'WiFi' : 'No WiFi'}
                                    </li>
                                    <li className='ms-1'>
                                        <i className={`fas fa-snowflake me-2 ${kosanData.isAc ? 'text-primary' : 'text-danger'}`}></i>
                                        {kosanData.isAc ? 'AC' : 'No AC'}
                                    </li>
                                    <li className='ms-1'>
                                        <i className={`fas fa-parking me-2 ${kosanData.isParking ? 'text-primary' : 'text-danger'}`}></i>
                                        {kosanData.isParking ? 'Parking' : 'No Parking'}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card ms-5 mb-3" style={{borderRadius: '15px'}}>
                                <div className="card-body shadow">
                                    <h5 className="card-title">Simulasi Penghitungan Biaya</h5>
                                    <div className="mb-3">
                                        <label htmlFor="startDate" className="form-label">Tanggal Mulai Kos</label>
                                        <input type="date" className="form-control" id="startDate"
                                               min={new Date().toISOString().split('T')[0]}
                                               value={startDate}
                                               onChange={handleStartDateChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="months" className="form-label">Bulan Kos</label>
                                        <input type="number" className="form-control" id="months" min="0"/>
                                    </div>
                                    <button className="btn btn-primary" onClick={handleCalculateCost}
                                            style={{
                                                borderRadius: '10px',
                                                textDecoration: 'none',
                                                color: 'white'
                                            }}>Hitung Biaya
                                    </button>
                                    <div className="mt-3">
                                        <h5>Total Biaya: <span id="totalCost">{totalCost}</span></h5>
                                    </div>
                                    <Link to={`https://wa.me/${kosanData.seller.phoneNumber}`} target='_blank'
                                          className="btn
                                btn-success mt-3 me-3"
                                          style={{borderRadius: '10px', textDecoration: 'none', color: 'white'}}>
                                        <i className="fas fa-comment"></i> Chat Pemilik Kos
                                    </Link>
                                    <Link to="/booking" className="btn btn-danger mt-3"
                                          style={{borderRadius: '10px', textDecoration: 'none', color: 'white'}}>
                                        Book Now
                                    </Link>
                                </div>
                            </div>

                            <div className="detail-contact pb-5 ms-5">
                                <div className="card mb-5 shadow" style={{borderRadius: '15px'}}>
                                    <div className="card-body">
                                        <h5 className="card-title mb-4">Hubungi Penyewa/Seller Kosan</h5>
                                        <hr />
                                        <div className="contact-info d-flex align-items-center">
                                            <div className="contact-detail flex-grow-1">
                                                <span className='fw-bold mt-5'>{kosanData.seller.fullName}</span>
                                                <p className='mt-3'>
                                                    <i className="bi bi-geo-alt-fill"></i> {kosanData.seller.address} 
                                                </p>
                                                 <p> 
                                                    <i className="bi bi-envelope-fill"></i> {kosanData.seller.email}
                                                </p>
                                            </div>
                                            <div>
                                                <img src={kosanData.seller.url ? kosanData.seller.url : defaultUserImg} alt="Image Seller"
                                                style={{height: '80px', width: '80px'}}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
}

export default DetailKosan;
