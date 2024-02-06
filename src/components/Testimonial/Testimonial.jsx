import React from 'react';
import img1 from '../../assets/img/testimonial-1.jpg';
import img2 from '../../assets/img/testimonial-2.jpg';
import img3 from '../../assets/img/testimonial-3.jpg';
import img4 from '../../assets/img/testimonial-4.jpg';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel';


function Testimonial() {
  React.useEffect(() => {
    $('.testimonial-carousel').owlCarousel({
      items: 3,
      loop: true,
      margin: 30,
      autoplay: true,
      responsive: {
        0: {
          items: 1 // Pada layar sangat kecil (mobile), tampilkan hanya 1 item
        },
        576: {
          items: 2 // Pada layar berukuran lebih besar dari mobile (tablet), tampilkan 2 item
        },
        992: {
          items: 3 // Pada layar berukuran lebih besar dari tablet (laptop), tampilkan 3 item
        },
        1200: {
          items: 4 // Pada layar berukuran lebih besar dari laptop (desktop), tampilkan 4 item
        }
      }
      
    });
  }, []);

  const testimonials = [
    {
      name: 'Ryan R',
      location: 'Cikini, Jakarta',
      image: img1,
      message: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.'
    },
    {
      name: 'Ihsan',
      location: 'Tangsel',
      image: img2,
      message: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.'
    },
    {
      name: 'Andree',
      location: 'Batam',
      image: img3,
      message: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.'
    },
    {
      name: 'Tiar',
      location: 'New York, USA',
      image: img4,
      message: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.'
    },
    {
      name: 'Baim',
      location: 'New York, USA',
      image: img3,
      message: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.'
    },
    {
      name: 'Joo1',
      location: 'New York, USA',
      image: img4,
      message: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.'
    }
  ];

  return (
    <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s" style={{paddingTop: '5em', paddingBottom: '10em'}}>
      <div className="container-fluid">
        <div className="text-center">
          <h5 className="section-title bg-white text-center text-secondary px-3">Testimonial</h5>
          <h1 className="mb-5 mt-3">Our Clients Say!!!</h1>
        </div>
        <div className="owl-carousel testimonial-carousel position-relative">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-item bg-light border p-4">
              <div className="card" style={{ minHeight: '300px' }}>
                <img className="card-img-top rounded-circle mx-auto mt-3" src={testimonial.image} alt={testimonial.name} style={{ width: '80px', height: '80px' }} />
                <div className="card-body text-center">
                  <h5 className="card-title mb-0">{testimonial.name}</h5>
                  <p className="card-text mb-0">{testimonial.location}</p>
                  <p className="card-text mt-2 mb-0">{testimonial.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonial;