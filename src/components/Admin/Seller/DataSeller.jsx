import React, { useState, useEffect } from 'react';
import axios from '../../../store/axiosInterceptor';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function DataSeller() {
    const [sellers, setSellers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/seller/v1')
            .then(response => {
                console.log('Response from API:', response.data);
                setSellers(response.data);
            })
            .catch(error => {
                console.error('Error fetching seller data:', error);
            });
    }, []);
    

    // Logic for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sellers.slice(indexOfFirstItem, indexOfLastItem);

    const handleUpdate = (sellerId) => {
        navigate(`/updateSeller/${sellerId}`);
    };

    const handleDelete = (sellerId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this seller data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/seller/v1/${sellerId}`)
                    .then(response => {
                        // Update state to reflect the removal of the seller
                        setSellers(sellers.filter(seller => seller.id !== sellerId));
                        console.log('Seller deleted successfully');
                    })
                    .catch(error => {
                        console.error('Error deleting seller:', error);
                    });
                Swal.fire(
                    'Deleted!',
                    'Your seller data has been deleted.',
                    'success'
                );
            }
        });
    };

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container-fluid mt-5">
            <div className="card mb-4 p-3">
                <h2 style={{ margin: "10px 0px 10px 10px" }}>Seller List</h2>
                <nav>
                    <ol className="breadcrumb mb-4" style={{ marginLeft: "10px" }}>
                        <li className="breadcrumb-item"><Link style={{ textDecoration: "none", color: "black" }} to="/seller">Data Master</Link></li>
                        <li className="mx-2">/</li>
                        <li className="breadcrumb-item active">Seller</li>
                    </ol>
                </nav>
                <div className="card-header fw-bold">
                    <i className="fa fa-user" style={{ marginRight: "10px" }}></i>
                    DATA SELLER
                </div>
                <div className="mt-4" style={{ width: "550px", marginLeft: "18px" }}>
                    <Link to="/addDataSeller" className="btn btn-success" style={{borderRadius: '10px'}}>Add Seller</Link>
                </div>
                <div className="mt-4" style={{ width: "550px", marginLeft: "18px" }}>
                    {/* Add category-related buttons */}
                </div>
                <div className="card-body">
                    <table className="table table-striped table-bordered">
                        <thead >
                            <tr>
                                <th>No</th>
                                <th>Full Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Phone Number</th>
                                <th>Address</th>
                                <th>isActive</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((seller, index) => (
                                <tr key={seller.id} >
                                    <td>{index + 1}</td>
                                    <td>{seller.fullName}</td>
                                    <td>{seller.username}</td>
                                    <td>{seller.email}</td>
                                    <td>{seller.genderTypeId.name}</td>
                                    <td>{seller.phoneNumber}</td>
                                    <td>{seller.address}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <span className={`badge text-white ${seller.active === "true" ? 'bg-success' : 'bg-danger'}`}
                                            style={{ padding: '10px', fontSize: '12px', borderRadius: '10px' }}>
                                            {seller.active === "true" ? 'Active' : 'nonActive'}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn btn-secondary me-2" onClick={() => handleUpdate(seller.id)}>
                                            <i className="fa fa-edit"></i>
                                        </button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(seller.id)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>


                    </table>
                    {/* Pagination */}
                    {/* <nav>
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button onClick={() => paginate(currentPage - 1)} className="page-link">Previous</button>
                            </li>
                            {Array.from({ length: Math.ceil(sellers.length / itemsPerPage) }).map((_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <button onClick={() => paginate(index + 1)} className="page-link">
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === Math.ceil(sellers.length / itemsPerPage) ? 'disabled' : ''}`}>
                                <button onClick={() => paginate(currentPage + 1)} className="page-link">Next</button>
                            </li>
                        </ul>
                    </nav> */}
                </div>
            </div>
        </div>
    );
}

export default DataSeller;
