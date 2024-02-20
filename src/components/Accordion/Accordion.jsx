import React from 'react';
import './Style.css'; 
import faq from '../../assets/img/faq.webp'

function Accordion() {
  return (
    <div className="row py-5" style={{ marginTop: '5em', marginBottom: '5em' }}>
      <div className="col-sm-6 px-5 wow fadeInUp" data-wow-delay="0.1s">
        <h1 className="text-24-bold ps-5" style={{ color: 'black' }}>
          Frequently Asked Questions
        </h1>
        <p className="text-16-light ps-5" style={{ color: 'black' }}>
          Here are some frequently asked questions about booking with Kingkos.
        </p>
        <img src={faq} alt="FAQ Image" className="img-fluid ps-5" />
      </div>

      <div className="col-sm-6 pe-5">
        <div className="accordion wow fadeInUp" data-wow-delay="0.1s" id="accordionPanelsStayOpenExample">
          <div className="accordion-item ">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
                style={{ background: '#f28e02', color: 'white' }}
              >
                How do I book a kosan with Kingkosa?
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseOne"
              className="accordion-collapse collapse show"
            >
              <div className="accordion-body">
                To book a kosan with Kingkos, you can follow these steps: [Add specific booking instructions or information].
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseTwo"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseTwo"
                style={{ background: '#f28e02', color: 'white' }}
              >
                How much does it cost to book a kosan with Kingkosa?
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseTwo"
              className="accordion-collapse collapse"
            >
              <div className="accordion-body">
                The cost of booking a kosan with Kingkosa can vary. Please check the product page or contact us for more information about fees and payment requirements.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseThree"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseThree"
                style={{ background: '#f28e02', color: 'white' }}
              >
                Can I cancel my kosan booking after making payment?
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseThree"
              className="accordion-collapse collapse"
            >
              <div className="accordion-body">
                Cancellation policies may vary. Please read our terms and conditions or contact customer service for more information about the cancellation policy for kosan bookings with Kingkosa.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseFour"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseFour"
                style={{ background: '#f28e02', color: 'white' }}
              >
                How can I change my booking details?
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseFour"
              className="accordion-collapse collapse"
            >
              <div className="accordion-body">
                You can change your booking details by [insert instructions on how to change booking details]. Please note that changes may be subject to availability and additional charges.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseFive"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseFive"
                style={{ background: '#f28e02', color: 'white' }}
              >
                How do I contact customer support?
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseFive"
              className="accordion-collapse collapse"
            >
              <div className="accordion-body">
                You can reach our customer support team at [insert contact information]. Our team is available to assist you with any questions or concerns you may have regarding your booking or any other inquiries.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
