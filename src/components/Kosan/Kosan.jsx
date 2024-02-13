import React, { useState, useEffect } from 'react';
import axios from '../../store/axiosInterceptor';
import { Link } from 'react-router-dom';

function Kosan() {
  const [provinceFilter, setProvinceFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const [lokasiData, setLokasiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/kost');
        const { data } = response.data;
        setLokasiData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredLokasi = lokasiData.filter((lokasi) =>
    (typeof lokasi.province === 'object' && lokasi.province.name.toLowerCase().includes(provinceFilter.toLowerCase())) &&
    (typeof lokasi.city === 'object' && lokasi.city.name.toLowerCase().includes(cityFilter.toLowerCase())) &&
    (typeof lokasi.subdistrict === 'object' && lokasi.subdistrict.name.toLowerCase().includes(districtFilter.toLowerCase())) &&
    (genderFilter === '' || (typeof lokasi.genderType === 'object' && lokasi.genderType.name.toLowerCase() === genderFilter.toLowerCase()))
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
                  {/* Render options for provinces */}
                </select>
              </div>
              <div className="col">
                <select
                  className="form-select"
                  value={cityFilter}
                  onChange={handleCityChange}
                >
                  <option value="">Pilih Kota</option>
                  {/* Render options for cities */}
                </select>
              </div>
              <div className="col">
                <select
                  className="form-select"
                  value={districtFilter}
                  onChange={handleDistrictChange}
                >
                  <option value="">Pilih Kecamatan</option>
                  {/* Render options for districts */}
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
            {filteredLokasi.map(kosan => (
              <div key={kosan.id} className="col-lg-3 col-md-6 wow flipInY" data-wow-delay="0.1s">
                <div className="package-item" style={{ height: '100%' }}>
                  <Link to={`/detailkosan/${kosan.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="overflow-hidden" style={{ height: '200px' }}>
                      <img className="img-fluid" src={`http://localhost:8080/${kosan.images[0].fileName}`} alt={kosan.images[0].fileName} style={{ height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="d-flex border-bottom">
                      <small className="flex-fill text-center border-end py-2">
                        <i className="fa fa-map-marker-alt text-primary me-2"></i>
                        {kosan.city.name}
                      </small>
                      <small className="flex-fill text-center border-end py-2">
                        <i className="fa fa-calendar-alt text-primary me-2"></i>
                        Available Rooms: {kosan.availableRoom}
                      </small>
                      <small className="flex-fill text-center py-2">
                        <i className="fa fa-solid fa-venus-mars text-primary me-2"></i>
                        Gender Kosan: {kosan.genderType.name}
                      </small>
                    </div>
                    <div className="text-center p-4">
                      <h4 className="mb-2">{formatRupiah(kosan.kostPrice.price)}/month</h4>
                      <label className='mb-1'>{kosan.name}</label>
                      <label className='mb-3'>Seller: {kosan.seller.fullName}</label>
                      <div className="">
                        {Array.from({ length: kosan.rating }, (_, index) => (
                          <small key={index} className="fa fa-star text-primary"></small>
                        ))}
                      </div>
                      <p>{kosan.description}</p>
                      <div>
                        
                        <p className='mb-2 text-dark'>Address: {kosan.subdistrict.name}, {kosan.city.name}, {kosan.province.name}</p>
                        <div>
                          <p className='mb-4'>
                            <i className={`fa fa-wifi ${kosan.isWifi ? 'text-success' : 'text-danger'}`}></i> WiFi: {kosan.isWifi ? 'Yes' : 'No'} |
                            <i className={`ps-1 fa fa-thermometer-three-quarters ${kosan.isAc ? 'text-success' : 'text-danger'}`}></i> AC: {kosan.isAc ? 'Yes' : 'No'} |
                            <i className={`ps-1 fa fa-car ${kosan.isParking ? 'text-success' : 'text-danger'}`}></i> Park: {kosan.isParking ? 'Yes' : 'No'}
                          </p>
                        </div>
                      </div>
                      <div className="fw-bold d-flex justify-content-center mb-2">
                        <Link to={`/detailkosan/${kosan.id}`} className="btn btn-sm btn-primary px-3 border-end" style={{ borderRadius: '30px 0 0 30px' }}>
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
