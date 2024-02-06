import React from 'react';
import { Link } from 'react-router-dom';

function Contact() {
  return (
    <div className="container-fluid px-5" style={{paddingTop: '5em', paddingBottom: '5em'}}>
      <div className="container-fluid">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h5 className="section-title bg-white text-center text-primary px-3">Hubungi Kami</h5>
          <h4 className="mb-5 mt-3">Hubungi Kami untuk Informasi Lebih Lanjut</h4>
        </div>
        <div className="row g-4">
          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <h5>Terhubunglah dengan Kami</h5>
            <p className="mb-4">Jika Anda memiliki pertanyaan atau butuh informasi lebih lanjut tentang kingkosan, jangan ragu untuk menghubungi kami.</p>
            <div className="d-flex align-items-center mb-4">
              <div className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary" style={{ width: '50px', height: '50px' }}>
                <i className="fa fa-map-marker-alt text-white"></i>
              </div>
              <div className="ms-3">
                <h5 className="text-primary">Alamat</h5>
                <p className="mb-0">Jalan Ragunan, Jakarta, Indonesia</p>
              </div>
            </div>
            <div className="d-flex align-items-center mb-4">
              <div className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary" style={{ width: '50px', height: '50px' }}>
                <i className="fa fa-phone-alt text-white"></i>
              </div>
              <div className="ms-3">
                <h5 className="text-primary">Telepon</h5>
                <p className="mb-0">+012 345 67890</p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary" style={{ width: '50px', height: '50px' }}>
                <i className="fa fa-envelope-open text-white"></i>
              </div>
              <div className="ms-3">
                <h5 className="text-primary">Email</h5>
                <p className="mb-0">info@kingkosan.com</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <iframe
            className="position-relative rounded w-100 h-100"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1989.539509342334!2d106.81818424810043!3d-6.343419792905496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4c045a7c5d7%3A0x1b3cf2b1cc2d6e87!2sRagunan%20Zoo!5e0!3m2!1sen!2sid!4v1677840679746!5m2!1sen!2sid"
            frameBorder="0"
            style={{ minHeight: '300px', border: '0' }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
            ></iframe>

          </div>
          <div className="col-lg-4 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
            <form>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-floating">
                    <input type="text" className="form-control" id="name" placeholder="Nama Anda" />
                    <label htmlFor="name">Nama Anda</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input type="email" className="form-control" id="email" placeholder="Email Anda" />
                    <label htmlFor="email">Email Anda</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating">
                    <input type="text" className="form-control" id="subject" placeholder="Subjek" />
                    <label htmlFor="subject">Subjek</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating">
                    <textarea className="form-control" placeholder="Tinggalkan pesan di sini" id="message" style={{ height: '100px' }}></textarea>
                    <label htmlFor="message">Pesan</label>
                  </div>
                </div>
                <div className="col-12">
                  <button className="btn btn-primary w-100 py-3" type="submit">
                    Kirim Pesan
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
