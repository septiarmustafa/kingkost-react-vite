import React, { useState, useEffect } from 'react';
import axios from '../../store/axiosInterceptor';
import { Link } from 'react-router-dom';
import DefaultImage from '../../assets/img/DefaultImage.jpg';

function Kosan() {
  const [provinceFilter, setProvinceFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const [lokasiData, setLokasiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(1);
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await axios.get('http://localhost:8080/province');
      setProvinces(response.data.data);
    } catch (error) {
      console.error('Error fetching provinces:', error);
      setError('Failed to fetch provinces');
    }
  };

  const fetchCities = async (provinceId) => {
    try {
      const response = await axios.get(`http://localhost:8080/city?province_id=${provinceId}`);
      setCities(response.data.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setError('Failed to fetch cities');
    }
  };

  const fetchDistricts = async (cityId) => {
    try {
      const response = await axios.get(`http://localhost:8080/subdistrict?city_id=${cityId}`);
      setDistricts(response.data.data);
    } catch (error) {
      console.error('Error fetching districts:', error);
      setError('Failed to fetch districts');
    }
  };

  const fetchData = async (page) => {
    try {
      const response = await axios.get('/kost', {
        params: {
          page: page - 1,
          size: itemsPerPage,
          province: provinceFilter,
          city: cityFilter,
          district: districtFilter,
          gender: genderFilter
        }
      });
      const { data, paggingResponse } = response.data;
      setLokasiData(data);
      setTotalPages(paggingResponse.totalPages);
      setCurrentPage(paggingResponse.pageNumber + 1);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  const handleProvinceChange = (event) => {
    const selectedProvince = event.target.value;
    setProvinceFilter(selectedProvince);
    setCityFilter('');
    setDistrictFilter('');
    fetchCities(selectedProvince);
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setCityFilter(selectedCity);
    setDistrictFilter('');
    fetchDistricts(selectedCity);
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

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchData(pageNumber);
  };

  return (
    <div className="container" style={{ paddingTop: '5em', paddingBottom: '10em' }}>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <>
          {/* Filter section */}
          <div className="mb-4">
            <div className="row">
              <div className="col">
                <select
                  className="form-select"
                  value={provinceFilter}
                  onChange={handleProvinceChange}
                >
                  <option value="">Pilih Provinsi</option>
                  {provinces.map(province => (
                    <option key={province.id} value={province.id}>{province.name}</option>
                  ))}
                </select>
              </div>
              <div className="col">
                <select
                  className="form-select"
                  value={cityFilter}
                  onChange={handleCityChange}
                  disabled={!provinceFilter}
                >
                  <option value="">Pilih Kota</option>
                  {cities.map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
              </div>
              <div className="col">
                <select
                  className="form-select"
                  value={districtFilter}
                  onChange={handleDistrictChange}
                  disabled={!cityFilter}
                >
                  <option value="">Pilih Kecamatan</option>
                  {districts.map(district => (
                    <option key={district.id} value={district.id}>{district.name}</option>
                  ))}
                </select>
              </div>
              <div className="col">
                <select
                  className="form-select"
                  value={genderFilter}
                  onChange={handleGenderChange}
                >
                  <option value="">Filter by Gender</option>
                  {lokasiData.map(kosan => (
                    <option key={kosan.genderType.id} value={kosan.genderType.name}>{kosan.genderType.name}</option>
                  ))}
                </select>
              </div>
              <div className="col">
                <button className="btn btn-primary" onClick={() => fetchData(1)}>Cari</button>
              </div>
            </div>
          </div>
          {/* Kosan cards */}
          <div className="row g-4 justify-content-center mt-4">
            {lokasiData.length > 0 ? (
              lokasiData.map(kosan => (
                <div key={kosan.id} className="col-lg-4 col-md-6">
                  <div className="card">
                    <Link to={`/detailkosan/${kosan.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div className="overflow-hidden" style={{ height: '200px' }}>
                        <img
                          className="img-fluid"
                          src={kosan.images.length > 0 ? kosan.images[0].url : DefaultImage}
                          alt={kosan.images.length > 0 ? kosan.images[0].fileName : 'Placeholder'}
                          style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="card-body">
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
                          <p className='mb-2'>{kosan.name}</p>
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
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col text-center">
                <p>No data found</p>
              </div>
            )}
          </div>
          {/* Pagination */}
          <nav className="mt-4" aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}

export default Kosan;
