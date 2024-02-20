import React, { useEffect, useState } from 'react';
import axios from '../../store/axiosInterceptor';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaUser, FaWhatsapp, FaMoneyBill, FaAddressBook, FaMoneyBillAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const userId = useSelector((state) => state.authentication.userId);
    const [transactionDate, setTransactionDate] = useState(new Date());

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const userDataResponse = await axios.get(`/customer/user/${userId}`);
                const matchedUser = userDataResponse.data.data;
                const customerId = matchedUser.id;
                const response = await axios.get(`/transactions?customerId=${customerId}`);
                setTransactions(response.data.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, [userId]);

    const formatRupiah = (value) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
    };

    return (
        <div className="container">
            <h2 className="text-center mt-5 mb-4">Transaction History</h2>
            <div className="row">
                {transactions.map((transaction) => (
                    <div key={transaction.id} className="col-md-4 mb-4">
                        <Card className="shadow" style={{ borderRadius: "15px" }}>
                            <Card.Body>
                                <img src={transaction.kost.images[0].url} alt="Kost Image" style={{ width: '100%', height: '15rem', borderRadius: '10px', marginBottom: '1rem' }} />
                                <h5 className="card-title">{transaction.kost.name}</h5>
                                <p className="mb-0 my-2">{formatRupiah(transaction.kost.kostPrice.price)} <FaMoneyBillAlt className='ms-2 mb-1'/>  </p>
                                <p className="card-text mb-3">{transaction.kost.description}</p>
                                <span>Seller Name : </span>
                                <div className="d-flex justify-content-between align-items-center">
                                    
                                    <p className="mb-0"><FaUser /> {transaction.kost.seller.fullName}</p>
                                    <Link to={`https://wa.me/${transaction.kost.seller.phoneNumber}`} target="_blank" className="btn btn-success" style={{borderRadius: '10px'}}><FaWhatsapp /> Chat Seller</Link>
                                </div>
                                <hr />
                                <span>Data Customer : </span>
                                <p className="mb-0 my-2"><FaEnvelope /> {transaction.customer.email}</p>
                                <p className="mb-0 my-2"><FaPhone /> {transaction.customer.phoneNumber}</p>
                                <p className="mb-0 my-2"><FaAddressBook /> {transaction.customer.address}</p>
                                <hr />
                                <span>Data Booking : </span>
                                <p className='mt-2'> Payment Type : <FaMoneyBillAlt className='ms-5'/> {transaction.paymentType.name}</p>
                                <div>
                                    <p className='me-2'>Transaction Date :
                                        <DatePicker className='ms-4' selected={transactionDate} onChange={date => setTransactionDate(date)} dateFormat="dd/MM/yyyy" />
                                    </p>
                                </div>
                                <p>Status Booking: 
                                    <span className={`ms-5 badge ${
                                        transaction.aprStatus === 0 ? 'bg-info' :
                                        transaction.aprStatus === 1 ? 'bg-danger' :
                                        transaction.aprStatus === 2 ? 'bg-danger' :
                                        transaction.aprStatus === 3 ? 'bg-success' : 'bg-danger'}`}
                                        style={{ padding: '10px', fontSize: '12px', borderRadius: '10px', marginLeft: '1rem' }}>
                                        {transaction.aprStatus === 0 ? 'Pending' :
                                        transaction.aprStatus === 1 ? 'Cancel' :
                                        transaction.aprStatus === 2 ? 'Reject' :
                                        transaction.aprStatus === 3 ? 'Approve' : 'Unknown'}
                                    </span>
                                </p>

                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionHistory;
