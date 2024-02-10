import React, { useState, useEffect } from 'react';
import axios from '../../../store/axiosInterceptor';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Customer() {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/customer/v1')
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.error('Error fetching customer data:', error);
            });
    }, []);

    // Logic for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = customers.slice(indexOfFirstItem, indexOfLastItem);

    const handleUpdate = (customerId) => {
        navigate(`/customer/update/${customerId}`);
    };

    const handleDelete = (customerId) => {
        axios.delete(`/customer/v1/${customerId}`)
            .then(response => {
                // Update state to reflect the removal of the customer
                setCustomers(customers.filter(customer => customer.id !== customerId));
                console.log('Customer deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting customer:', error);
            });
    };

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mt-5">
            <div className="card mb-4 p-3">
                <h2 style={{ margin: "10px 0px 10px 10px" }}>Customer List</h2>
                <nav>
                    <ol className="breadcrumb mb-4" style={{ marginLeft: "10px" }}>
                        <li className="breadcrumb-item"><Link style={{ textDecoration: "none", color: "black" }} to="/customer">Data Master</Link></li>
                        <li className="breadcrumb-item active">Customer</li>
                    </ol>
                </nav>
                <div className="card-header fw-bold">
                    <i className="fa fa-user" style={{ marginRight: "10px" }}></i>
                    DATA CUSTOMER
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
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((customer, index) => (
                                <tr key={customer.id} style={{ backgroundColor: index % 2 === 0 ? 'azure' : 'azure' }}>
                                    <td>{index + 1}</td>
                                    <td>{customer.fullName}</td>
                                    <td>{customer.username}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.genderTypeId.name}</td>
                                    <td>{customer.phoneNumber}</td>
                                    <td>{customer.address}</td>
                                    <td>
                                        <button className="btn btn-secondary me-2" onClick={() => handleUpdate(customer.id)}>
                                            <i className="fa fa-edit"></i>
                                        </button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(customer.id)}>
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
                            {Array.from({ length: Math.ceil(customers.length / itemsPerPage) }).map((_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <button onClick={() => paginate(index + 1)} className="page-link">
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === Math.ceil(customers.length / itemsPerPage) ? 'disabled' : ''}`}>
                                <button onClick={() => paginate(currentPage + 1)} className="page-link">Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Customer;
