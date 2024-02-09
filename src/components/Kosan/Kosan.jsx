import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import kosan1 from '../../assets/img/kosan1.jpg';
import kosan2 from '../../assets/img/kosan2.jpg';
import kosan3 from '../../assets/img/kosan3.jpg';

function Kosan() {
  const [provinceFilter, setProvinceFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  const [loading, setLoading] = useState(true); // Loading state

  const [lokasiData, setLokasiData] = useState([]);

  const filteredLokasi = lokasiData.filter((lokasi) =>
    lokasi.province.toLowerCase().includes(provinceFilter.toLowerCase()) &&
    lokasi.city.toLowerCase().includes(cityFilter.toLowerCase()) &&
    lokasi.district.toLowerCase().includes(districtFilter.toLowerCase()) &&
    (genderFilter === '' || lokasi.gender.toLowerCase() === genderFilter.toLowerCase())
  );

  const handleProvinceChange = (event) => {
    setProvinceFilter(event.target.value);
  };

  const handleCityChange = (event) => {
    setCityFilter(event.target.value);
  };

  const handleDistrictChange = (event) => {
    setDistrictFilter(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGenderFilter(event.target.value);
  };

  useEffect(() => {
    // Simulate an API call or any asynchronous operation
    const fetchData = async () => {
      try {
        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Set the data and mark loading as false
        setLokasiData([
          {
            id: 1,
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
          {
            id: 2,
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
          {
            id: 3,
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
          {
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
          },
        ]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // The empty dependency array ensures that this effect runs once on component mount

  const formatRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
  };

  return (
    <div className="container" style={{paddingTop: '5em', paddingBottom: '10em'}}>
      {loading ? (
       <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
       </div>
      ) : (
      <>
      <div className="mb-4">
        <div className="row">
          <div className="col">
            <select
              className="form-select"
              value={provinceFilter}
              onChange={handleProvinceChange}
            >
              <option value="">Pilih Provinsi</option>
              <option value="DKI Jakarta">DKI Jakarta</option>
              <option value="Jawa Barat">Jawa Barat</option>
            </select>
          </div>
          <div className="col">
            <select
              className="form-select"
              value={cityFilter}
              onChange={handleCityChange}
            >
              <option value="">Pilih Kota</option>
              <option value="Jakarta">Jakarta</option>
              <option value="Bandung">Bandung</option>
            </select>
          </div>
          <div className="col">
            <select
              className="form-select"
              value={districtFilter}
              onChange={handleDistrictChange}
            >
              <option value="">Pilih Kecamatan</option>
              <option value="South Jakarta">South Jakarta</option>
              <option value="Central Jakarta">Central Jakarta</option>
            </select>
          </div>
          <div className="col">
            <select
              className="form-select"
              value={genderFilter}
              onChange={handleGenderChange}
            >
              <option value="">Filter by Gender</option>
              <option value="Mixed">Mixed</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="col">
            <button className="btn btn-primary">Cari</button>
          </div>
        </div>
      </div>
      <div className="row g-4 justify-content-center mt-4">
        {filteredLokasi.map((lokasi) => (
          <div key={lokasi.id} className="col-lg-3 col-md-6 wow flipInY" data-wow-delay="0.1s">
            <div className="package-item" style={{ height: '100%' }}>
            <Link to={`/detailkosan/${lokasi.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="overflow-hidden" style={{ height: '200px' }}>
                <img className="img-fluid" src={lokasi.img} alt={lokasi.name} style={{ height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="d-flex border-bottom">
                <small className="flex-fill text-center border-end py-2">
                  <i className="fa fa-map-marker-alt text-primary me-2"></i>
                  {lokasi.location}
                </small>
                <small className="flex-fill text-center border-end py-2">
                  <i className="fa fa-calendar-alt text-primary me-2"></i>
                  Available Rooms: {lokasi.available_room}
                </small>
                <small className="flex-fill text-center py-2">
                  <i className="fa fa-solid fa-venus-mars text-primary me-2"></i>
                  Gender Kosan: {lokasi.gender}
                </small>
              </div>
              <div className="text-center p-4">
                <h4 className="mb-2">{formatRupiah(lokasi.price)}/month</h4>
                <label className='mb-3'>{lokasi.name}</label>
                <div className="mb-3">
                  {Array.from({ length: lokasi.rating }, (_, index) => (
                    <small key={index} className="fa fa-star text-primary"></small>
                  ))}
                </div>
                <p>{lokasi.description}</p>

                <div>
                  <label className='mb-3'>Seller: {lokasi.seller}</label>
                  <p className='mb-1'>
                    WiFi: {lokasi.is_wifi ? 'Yes' : 'No'},
                    AC: {lokasi.is_ac ? 'Yes' : 'No'},
                    Parking: {lokasi.is_parking ? 'Yes' : 'No'},
                  </p>
                  <label className='mb-4'>Address: {lokasi.address}</label>
                </div>

                <div className="d-flex justify-content-center mb-2">
                  <Link to={`/detailkosan/${lokasi.id}`} className="btn btn-sm btn-primary px-3 border-end" style={{ borderRadius: '30px 0 0 30px' }}>
                    Details
                  </Link>
                  <Link to="/booking" className="btn btn-sm btn-primary px-3" style={{ borderRadius: '0 30px 30px 0' }}>
                    Book Now
                  </Link>
                </div>
              </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
      </>
    )}
    </div>
  );
}

export default Kosan;
