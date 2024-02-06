import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import kosan1 from '../../assets/img/kosan1.jpg';
import kosan2 from '../../assets/img/kosan2.jpg';
import kosan3 from '../../assets/img/kosan3.jpg';

import img from '../../assets/img/team-1.jpg';
import { Link } from 'react-router-dom';

function DetailKosan() {
    const { id } = useParams();
    const [kosanData, setKosanData] = useState(null);

    const [totalCost, setTotalCost] = useState(0);

    const handleCalculateCost = () => {
        const startDate = document.getElementById('startDate').value;
        const months = parseInt(document.getElementById('months').value);

        // Lakukan perhitungan biaya di sini
        // Misalnya, jika harga per bulan adalah 1.300.000, maka total biaya adalah harga per bulan dikalikan dengan jumlah bulan
        const pricePerMonth = parseFloat(kosanData.price.replace('Rp. ', '').replace('.', '').replace(',', ''));
        const total = pricePerMonth * months;

        setTotalCost(total.toLocaleString('id-ID')); // Format total biaya menjadi format mata uang Indonesia
    };

    useEffect(() => {
        // Simulasi pengambilan data berdasarkan ID dari URL
        const fetchData = async () => {
            try {
                // Simulasi delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Data kosan
                const data = {
                    1: {
                        img: kosan1,
                        name: 'Kosan Mawar',
                        description: 'Kosan nyaman dengan fasilitas lengkap',
                        province: 'DKI Jakarta',
                        city: 'Jakarta',
                        district: 'South Jakarta',
                        address: 'Jalan Lokasi 1, Kota A',
                        location: 'Jakarta - Kebayoran Baru',
                        availability: 'Available Now',
                        roomType: 'Single Room',
                        price: '1000000',
                        rating: 5,
                        available_room: 5,
                        seller: 'John Doe',
                        is_wifi: true,
                        is_ac: true,
                        is_parking: false,
                        gender: 'Mixed',
                    },
                    2: {
                        img: kosan2,
                        name: 'Kosan Indah',
                        description: 'Kosan strategis dengan tempat parkir',
                        province: 'DKI Jakarta',
                        city: 'Jakarta',
                        district: 'Central Jakarta',
                        address: 'Jalan Lokasi 2, Kota B',
                        location: 'Jakarta - Tanah Abang',
                        availability: 'Available Now',
                        roomType: 'Single Room',
                        price: '1300000',
                        rating: 4,
                        available_room: 3,
                        seller: 'Jane Doe',
                        is_wifi: true,
                        is_ac: true,
                        is_parking: true,
                        gender: 'Female',
                    },
                    3: {
                        img: kosan3,
                        name: 'Kosan Bahagia',
                        description: 'Kosan nyaman dekat pusat kota',
                        province: 'Jawa Barat',
                        city: 'Bandung',
                        district: 'Bandung Selatan',
                        address: 'Jalan Lokasi 3, Kota C',
                        location: 'Bandung - Cicendo',
                        availability: 'Available Now',
                        roomType: 'Single Room',
                        price: '1500000',
                        rating: 4,
                        available_room: 2,
                        seller: 'Bob Johnson',
                        is_wifi: true,
                        is_ac: true,
                        is_parking: true,
                        gender: 'Male',
                    },
                    4: {
                        id: 4,
                        img: kosan1,
                        name: 'Kosan Ceria',
                        description: 'Kosan dengan fasilitas lengkap',
                        province: 'DKI Jakarta',
                        city: 'Jakarta',
                        district: 'Central Jakarta',
                        address: 'Jalan Lokasi 4, Kota D',
                        location: 'Jakarta - Cikini',
                        availability: 'Available Now',
                        roomType: 'Single Room',
                        price: '600000',
                        rating: 4,
                        available_room: 4,
                        seller: 'Alice Smith',
                        is_wifi: true,
                        is_ac: true,
                        is_parking: true,
                        gender: 'Mixed',
                    }
                };

                // Set data kosan sesuai ID dari URL
                setKosanData(data[id]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Panggil fungsi fetchData
        fetchData();
    }, [id]);

    if (!kosanData) {
        return (
            <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    

    return (
        <div className="container ">
        <div className="row my-5">
            <div className="col-md-6 px-3">
                <img src={kosanData.img} alt={kosanData.name} className="detail-image img-fluid" />
            </div>
            <div className="col-md-6 px-3">
                <img src={kosanData.img} alt={kosanData.name} className="detail-image img-fluid" />
            </div>
        </div>


        <div className="row">
            <div className="col-md-6">
                <div className="detail-header">
                    <div className="detail-header-info">
                        <h3 className="detail-title">{kosanData.name} - {kosanData.roomType} </h3>
                        <p className='mb-1'> {kosanData.description} </p>
                        <p className="detail-address">{kosanData.address} || {kosanData.location}</p>
                        <div className="detail-features row">
                            <div className="col-md-4">
                                <div className="detail-feature">
                                    <i className="fas fa-bed text-primary"></i>
                                    <span className='ms-2'>{kosanData.roomType}</span>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="detail-feature">
                                    <i className="fas fa-user-friends text-primary"></i>
                                    <span className='ms-2'>{kosanData.available_room} Roam</span>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="detail-feature">
                                    <i className="fas fa-star text-primary"></i>
                                    <span className='ms-2'>{kosanData.rating} Stars</span>
                                </div>
                            </div>
                        </div>

                        <div className="detail-price my-3"> 
                           <i class="fas fa-solid fa-tag text-danger"></i> 
                           <span className='ms-2'> Rp. {kosanData.price} / Bulan</span>
                        </div>
                    </div>
                </div>
                <div className="detail-amenities">
                    <h5>Fasilitas</h5>
                    <ul className="list-unstyled">
                        <li>
                            <i className={`fas fa-wifi me-2 ${kosanData.is_wifi ? 'text-primary' : 'text-danger'}`}></i>
                            {kosanData.is_wifi ? 'WiFi' : 'No WiFi'}
                        </li>
                        <li className='ms-1'>
                            <i className={`fas fa-snowflake me-2 ${kosanData.is_ac ? 'text-primary' : 'text-danger'}`}></i>
                            {kosanData.is_ac ? 'AC' : 'No AC'}
                        </li>
                        <li className='ms-1'>
                            <i className={`fas fa-parking me-2 ${kosanData.is_parking ? 'text-primary' : 'text-danger'}`}></i>
                            {kosanData.is_parking ? 'Parking' : 'No Parking'}
                        </li>
                    </ul>
                </div>

                <div className="detail-contact pb-5">
                    <div className="card mb-5 shadow" style={{borderRadius: '15px'}}>
                        <div className="card-body">
                            <h5 className="card-title">Hubungi Penyewa/Seller Kosan</h5>
                            <div className="contact-info d-flex align-items-center">
                                <div className="contact-detail flex-grow-1">
                                    <span>{kosanData.seller}</span>
                                    <p>penyewa@gmail.com</p>
                                </div>
                                <div className="right">
                                    <img src={img} className="seller-image" style={{ height: '80px', borderRadius: '100%' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="card ms-5">
                    <div className="card-body">
                        <h5 className="card-title">Booking</h5>
                        <div className="mb-3">
                            <label htmlFor="startDate" className="form-label">Tanggal Mulai Kos</label>
                            <input type="date" className="form-control" id="startDate" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="months" className="form-label">Bulan Kos</label>
                            <input type="number" className="form-control" id="months" />
                        </div>
                        <button className="btn btn-primary" onClick={handleCalculateCost} style={{ borderRadius: '10px', textDecoration: 'none', color: 'white' }}>Hitung Biaya</button>
                        <div className="mt-3">
                            <h5>Total Biaya: <span id="totalCost">{totalCost}</span></h5>
                        </div>
                        <Link to="https://wa.me/628123456789" target='_blank' className="btn btn-success mt-3 me-3" style={{ borderRadius: '10px', textDecoration: 'none', color: 'white' }}>
                            <i className="fas fa-comment"></i> Chat Pemilik Kos
                        </Link>
                        <Link to="/booking" className="btn btn-danger mt-3" style={{ borderRadius: '10px', textDecoration: 'none', color: 'white' }}>
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default DetailKosan;
