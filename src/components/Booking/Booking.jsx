import React, { useState } from 'react';

function Booking() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [transactionDate, setTransactionDate] = useState(''); 
  const [monthTypeId, setMonthTypeId] = useState(''); 
  const [customerId, setCustomerId] = useState(''); 
  const [paymentTypeId, setPaymentTypeId] = useState(''); 
  const [trxDetailId, setTrxDetailId] = useState(''); 
  const [approveStatus, setApproveStatus] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here

    // Reset form fields after submission
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setTransactionDate('');
    setMonthTypeId('');
    setCustomerId('');
    setPaymentTypeId('');
    setTrxDetailId('');
    setApproveStatus(false);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-6">
          <h2 className="text-center mb-4">Book Now</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input type="tel" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Additional Message (Optional)</label>
              <textarea className="form-control" id="message" rows="3" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="transactionDate" className="form-label">Transaction Date</label>
              <input type="date" className="form-control" id="transactionDate" value={transactionDate} onChange={(e) => setTransactionDate(e.target.value)} required />
            </div>
            {/* Add more inputs for other data */}
            <div className="mb-3">
              <label htmlFor="monthTypeId" className="form-label">Month Type ID</label>
              <input type="text" className="form-control" id="monthTypeId" value={monthTypeId} onChange={(e) => setMonthTypeId(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="customerId" className="form-label">Customer ID</label>
              <input type="text" className="form-control" id="customerId" value={customerId} onChange={(e) => setCustomerId(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="paymentTypeId" className="form-label">Payment Type ID</label>
              <input type="text" className="form-control" id="paymentTypeId" value={paymentTypeId} onChange={(e) => setPaymentTypeId(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="trxDetailId" className="form-label">Transaction Detail ID</label>
              <input type="text" className="form-control" id="trxDetailId" value={trxDetailId} onChange={(e) => setTrxDetailId(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Submit Booking</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Booking;
