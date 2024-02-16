import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { Row, Col } from 'react-bootstrap';
import defaultUserImg from '../../assets/img/default-user.png';

function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/review/v1')
      .then(response => {
        setTestimonials(response.data);
      })
      .catch(error => {
        console.error('Error fetching testimonials:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch customer data for each testimonial
    const fetchCustomerData = async () => {
      const customerIds = testimonials.map(testimonial => testimonial.customerId);
      const uniqueCustomerIds = [...new Set(customerIds)]; // Get unique customer IDs

      // Fetch customer data for each unique customer ID
      const customersData = await Promise.all(uniqueCustomerIds.map(async customerId => {
        try {
          const response = await axios.get(`http://localhost:8080/customer/v1/${customerId}`);
          return response.data;
        } catch (error) {
          console.error(`Error fetching customer data for ID ${customerId}:`, error);
          return null;
        }
      }));

      // Map customer data to each testimonial
      const updatedTestimonials = testimonials.map(testimonial => {
        const customerData = customersData.find(customer => customer.id === testimonial.customerId);
        return {
          ...testimonial,
          customerData: customerData || {} // Set customerData or an empty object if not found
        };
      });

      setTestimonials(updatedTestimonials);
    };

    fetchCustomerData();
  }, [testimonials]);

  // Memisahkan testimonial menjadi bagian-bagian yang berisi tiga testimonial
  const separatedTestimonials = [];
  for (let i = 0; i < testimonials.length; i += 3) {
    separatedTestimonials.push(testimonials.slice(i, i + 3));
  }

  return (
    <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s" style={{ paddingTop: '5em', paddingBottom: '10em' }}>
      <div className="container-fluid">
        <div className="text-center">
          <h5 className="section-title bg-white text-center text-secondary px-3">Testimonial</h5>
          <h1 className="mb-5 mt-3">Our Clients Say!!!</h1>
        </div>
        <Carousel nextLabel={<span aria-hidden="true" className="carousel-control-next-icon" />} prevLabel={<span aria-hidden="true" className="carousel-control-prev-icon" />}>
          {separatedTestimonials.map((testimonialGroup, index) => (
            <Carousel.Item key={index}>
              <Row className="justify-content-center testimonial-carousel">
                {testimonialGroup.map((testimonial, i) => (
                  <Col key={i} md={4}>
                    {testimonial.customerData && (
                      <div className="testimonial-item bg-light border p-4">
                        <div className="card" style={{ minHeight: '350px' }}>
                          <img
                            className="card-img-top rounded-circle mx-auto"
                            src={testimonial.customerData.url || defaultUserImg}
                            alt={testimonial.customerData.fullName}
                            style={{ width: '80px', height: '80px' }}
                          />
                          <div className="card-body text-center">
                            <h5 className="card-title mb-2">{testimonial.customerData.fullName}</h5>
                            <p className="card-text mb-2">Address: {testimonial.customerData.address}</p>
                            <p className="card-text mt-2 mb-0">{testimonial.message}</p>
                          </div>
                        </div>
                      </div>
                    )}

                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Testimonial;
