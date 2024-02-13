import React, { useState, useEffect } from 'react';
import axios from '../../../store/axiosInterceptor';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function DataKosan() {
    const [kosanData, setKosanData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/kost')
            .then(response => {
                console.log(response.data);
                const { data, paggingResponse } = response.data;
                setKosanData(data);
                setCurrentPage(paggingResponse.currentPage);
                setTotalPage(paggingResponse.totalPage);
                setPageSize(paggingResponse.size);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleUpdate = (kosanId) => {
        navigate(`/updateKosan/${kosanId}`);
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
                axios.delete(`/kosan/${kosanId}`)
                    .then(response => {
                        // Update state to reflect the removal of the customer
                        setKosan(kosanData.filter(kosan => kosan.id !== kosanId));
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
                <h2 style={{ margin: "10px 0px 10px 10px" }}>Data Kosan </h2>
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
                    <Link to="/addKosan" className="btn btn-success" style={{borderRadius: '10px'}}>Add Kosan</Link>
                </div>
                <div className="mt-4" style={{ width: "550px", marginLeft: "18px" }}>
                    {/* Add category-related buttons */}
                </div>
                <div className="card-body">
                    <table className="table table-striped table-bordered">
                        <thead >
                            <tr>
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
                            </tr>
                        </thead>
                        <tbody>
                            {kosanData.map(kos => (
                            <tr key={kos.id}>
                                <td>{kos.name}</td>
                                <td>{kos.description}</td>
                                <td>{kos.kostPrice.price}</td>
                                <td>{kos.availableRoom}</td>
                                <td>{kos.isWifi ? 'Yes' : 'No'}</td>
                                <td>{kos.isAc ? 'Yes' : 'No'}</td>
                                <td>{kos.isParking ? 'Yes' : 'No'}</td>
                                <td>{kos.genderType.name}</td>
                                <td>{kos.seller.fullName}</td>
                                <td>{kos.province.name}</td>
                                <td>{kos.city.name}</td>
                                <td>{kos.subdistrict.name}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="row mt-3">
                <div className="col">
                    <p>Current Page: {currentPage}</p>
                </div>
                <div className="col">
                    <p>Total Page: {totalPage}</p>
                </div>
                <div className="col">
                    <p>Page Size: {pageSize}</p>
                </div>
            </div>
                </div>
            </div>
        </div>

    );
}

export default DataKosan;
