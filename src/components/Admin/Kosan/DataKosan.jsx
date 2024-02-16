import React, { useState, useEffect } from 'react';
import axios from '../../../store/axiosInterceptor';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function DataKosan() {
    const [kosanData, setKosanData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(0); // Fetch data for initial page (page 0)
    }, []);

    const fetchData = (page) => {
        axios.get('/kost', {
            params: {
                page: page
            }
        })
        .then(response => {
            console.log("data kosan " + response.data); // Periksa respons dari API
            const { data, paggingResponse } = response.data; // Sesuaikan dengan struktur respons
            setKosanData(data); // Set data kosan ke dalam state kosanData
            setCurrentPage(paggingResponse.currentPage);
            setTotalPage(paggingResponse.totalPage);
            setItemsPerPage(paggingResponse.size);
        })
        .catch(error => {
            console.error('Error fetching kosan data:', error);
        });
    };

    // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber); // Update currentPage
        fetchData(pageNumber - 1); // Fetch data for the selected page
    };

    const handleUpdate = (kosanId) => {
        navigate(`/updateDataKosan/${kosanId}`);
    };

    const handleDelete = (kosanId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this kosan data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/kost/${kosanId}`)
                    .then(response => {
                        // Update state to reflect the removal of the kosan
                        setKosanData(kosanData.filter(kosan => kosan.id !== kosanId));
                        console.log('Kosan deleted successfully');
                    })
                    .catch(error => {
                        console.error('Error deleting kosan:', error);
                    });
                Swal.fire(
                    'Deleted!',
                    'Your kosan data has been deleted.',
                    'success'
                );
            }
        });
    };

    return (
        <div className="container-fluid mt-5">
            <div className="card mb-4 p-3">
                <h2 style={{ margin: "10px 0px 10px 10px" }}>Kosan List</h2>
                <nav>
                    <ol className="breadcrumb mb-4" style={{ marginLeft: "10px" }}>
                        <li className="breadcrumb-item"><Link style={{ textDecoration: "none", color: "black" }} to="/customer">Data Master</Link></li>
                        <li className="mx-2">/</li>
                        <li className="breadcrumb-item active">Kosan</li>
                    </ol>
                </nav>
                <div className="card-header fw-bold">
                    <i className="fa fa-user" style={{ marginRight: "10px" }}></i>
                    DATA KOSAN
                </div>
                <div className="mt-4" style={{ width: "550px", marginLeft: "18px" }}>
                    <Link to="/addDataKosan" className="btn btn-success" style={{borderRadius: '10px'}}>Add Kosan</Link>
                </div>
                <div className="mt-4" style={{ width: "550px", marginLeft: "18px" }}>
                    {/* Add category-related buttons */}
                </div>
                <div className="card-body">
                    <table className="table table-striped table-bordered">
                        <thead >
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
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {kosanData.map((kosan, index) => (
                                <tr key={kosan.id} >
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
                                            src={kosan.images.length > 0 ? kosan.images[0].url : DefaultImage}
                                            alt={kosan.images.length > 0 ? kosan.images[0].fileName : 'Placeholder'}
                                            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                                        />
                                    </td>
                                    <td className='d-flex p-2'>
                                        <button className="btn btn-secondary me-2" onClick={() => handleUpdate(kosan.id)}>
                                            <i className="fa fa-edit"></i>
                                        </button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(kosan.id)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination */}
                    <nav>
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button onClick={() => paginate(currentPage - 1)} className="page-link">Previous</button>
                            </li>
                            {Array.from({ length: totalPage }).map((_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <button onClick={() => paginate(index + 1)} className="page-link">
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPage ? 'disabled' : ''}`}>
                                <button onClick={() => paginate(currentPage + 1)} className="page-link">Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default DataKosan;
