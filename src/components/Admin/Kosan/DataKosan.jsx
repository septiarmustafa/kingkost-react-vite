import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../../store/axiosInterceptor';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import defaultImage from '../../../assets/img/DefaultImage.jpg';

function DataKosan() {
    const [kosanData, setKosanData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const userId = useSelector((state) => state.authentication.userId);
    const userRole = useSelector((state) => state.authentication.role);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        try {
            let response;
            if (userRole === "ROLE_SELLER") {
                // Fetch data based on seller id
                const userDataResponse = await axios.get(`/seller/user/${userId}`);
                const matchedUser = userDataResponse.data.data;
                const sellerId = matchedUser.id;
                response = await axios.get(`/kost?sellerId=${sellerId}&page=${currentPage}`);
            } else if (userRole === "ROLE_ADMIN") {
                // Fetch all kosan data
                response = await axios.get(`/kost?page=${currentPage}`);
            }
            const { data } = response.data;
            setKosanData(data);
        } catch (error) {
            console.error('Error fetching kosan data:', error);
        }
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

    const handlePrevPage = () => {
        if (currentPage >= 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
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
                                            src={kosan.images.length > 0 ? kosan.images[0].url : defaultImage}
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
                    <nav>
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={handlePrevPage}>Previous</button>
                            </li>
                            <li className="page-item disabled">
                                <span className="page-link">{currentPage}</span>
                            </li>
                            <li className="page-item">
                                <button className="page-link" onClick={handleNextPage}>Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default DataKosan;
