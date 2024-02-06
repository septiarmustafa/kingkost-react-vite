import React from 'react';
import Team1 from '../../assets/img/team-1.jpg';
import Team2 from '../../assets/img/team-2.jpg';
import Team3 from '../../assets/img/team-3.jpg';
import { Link } from 'react-router-dom';
import './Style.css';

function Team() {
  return (
    <>
      <div className="container-xxl py-5" style={{marginTop: '5em'}}>
        <div className="container-fluid">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">KingKos Team Project</h6>
            <h1 className="mb-5">Meet Our Team</h1>
          </div>
          <div className="row g-5 team-row">
            <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 wow fadeInUp" data-wow-delay="0.1s">
              <div className="team-item mx-auto">
                <div className="overflow-hidden">
                  <img className="img-fluid" src={Team1} alt="" />
                </div>
                <div className="position-relative d-flex justify-content-center mt-3">
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-facebook-f"></i></Link>
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-twitter"></i></Link>
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-instagram"></i></Link>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Ryan Ramadhan</h5>
                  <small>Frontend</small>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 wow fadeInUp" data-wow-delay="0.1s">
              <div className="team-item mx-auto">
                <div className="overflow-hidden">
                  <img className="img-fluid" src={Team2} alt="" />
                </div>
                <div className="position-relative d-flex justify-content-center mt-3">
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-facebook-f"></i></Link>
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-twitter"></i></Link>
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-instagram"></i></Link>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Leonardo</h5>
                  <small>Frontend</small>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 wow fadeInUp" data-wow-delay="0.1s">
              <div className="team-item mx-auto">
                <div className="overflow-hidden">
                  <img className="img-fluid" src={Team3} alt="" />
                </div>
                <div className="position-relative d-flex justify-content-center mt-3">
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-facebook-f"></i></Link>
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-twitter"></i></Link>
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-instagram"></i></Link>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Andre Riyanto</h5>
                  <small>Backend</small>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 wow fadeInUp" data-wow-delay="0.1s">
              <div className="team-item mx-auto">
                <div className="overflow-hidden">
                  <img className="img-fluid" src={Team2} alt="" />
                </div>
                <div className="position-relative d-flex justify-content-center mt-3">
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-facebook-f"></i></Link>
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-twitter"></i></Link>
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-instagram"></i></Link>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Muhammad Ihsan</h5>
                  <small>Backend</small>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 wow fadeInUp" data-wow-delay="0.1s">
              <div className="team-item mx-auto">
                <div className="overflow-hidden">
                  <img className="img-fluid" src={Team3} alt="" />
                </div>
                <div className="position-relative d-flex justify-content-center mt-3">
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-facebook-f"></i></Link>
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-twitter"></i></Link>
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-instagram"></i></Link>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Septiar Mustafa</h5>
                  <small>Mobile</small>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 wow fadeInUp" data-wow-delay="0.1s">
              <div className="team-item mx-auto">
                <div className="overflow-hidden">
                  <img className="img-fluid" src={Team1} alt="" />
                </div>
                <div className="position-relative d-flex justify-content-center mt-3">
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-facebook-f"></i></Link>
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-twitter"></i></Link>
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-instagram"></i></Link>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Muhammad Ibrahim</h5>
                  <small>Mobile</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Team;
