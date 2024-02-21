import React from 'react';
import Ihsan from '../../assets/img/team/ihsan.jpg';
import Ryan from '../../assets/img/team/ryan.jpg';
import Andre from '../../assets/img/team/andre.jpg';
import Leo from '../../assets/img/team/leo.jpg';
import Tiar from '../../assets/img/team/tiar.jpg';
import Baim from '../../assets/img/team/baim.jpg';
import TeamKel from '../../assets/img/team/kel2.jpeg';
import { Link } from 'react-router-dom';
import './Style.css';

function Team() {
  return (
    <>
      <div className="container-xxl py-5" style={{ marginTop: '5em' }}>
        <div className="container-fluid">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">KingKos Team Project</h6>
            <h1 className="mb-5">Meet Our Team</h1>
          </div>
          <div className="row g-5 team-row mb-5">
            <div className="col-lg-7 col-md-6 col-sm-12 col-xs-12 wow fadeInUp" data-wow-delay="0.1s">
                <div className="team-item mx-auto border rounded shadow" style={{ borderColor: 'blue' }}>
                    <div className="overflow-hidden">
                        <img className="img-fluid border" src={TeamKel} alt="" />
                    </div>
                    <div className="position-relative d-flex justify-content-center mt-3">
                        <p className='fw-bold'>Kelompok 2 || Enigmacamp</p>
                    </div>
                </div>
            </div>
          </div>

          <div className="row g-5 team-row">
            <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 wow fadeInUp" data-wow-delay="0.1s">
              <div className="team-item mx-auto border rounded shadow" style={{ borderColor: 'blue' }}>
                <div className="overflow-hidden">
                  <img className="img-fluid border" src={Ryan} alt="" />
                </div>
                <div className="position-relative d-flex justify-content-center mt-3">
                  <Link className="btn btn-square mx-1" style={{ backgroundColor: 'gold', color: 'black' }} to="https://github.com/RyanRamadhan11" target='_blank'><i className="fab fa-github"></i></Link>
                  <Link className="btn btn-square mx-1" style={{ backgroundColor: 'gold', color: 'black' }} to="https://www.linkedin.com/in/ryan-ramadhan-17118b222/" target='_blank'><i className="fab fa-linkedin"></i></Link>
                  <Link className="btn btn-square mx-1" style={{ backgroundColor: 'gold', color: 'black' }} to="https://www.instagram.com/ryanrmdhans/" target='_blank'><i className="fab fa-instagram"></i></Link>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Ryan Ramadhan</h5>
                  <small style={{ fontSize: '14px' }}>Frontend</small>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 wow fadeInUp" data-wow-delay="0.1s">
              <div className="team-item mx-auto  border rounded shadow">
                <div className="overflow-hidden">
                  <img className="img-fluid" src={Leo} alt="" />
                </div>
                <div className="position-relative d-flex justify-content-center mt-3">
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-github"></i></Link>
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-linkedin"></i></Link>
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-instagram"></i></Link>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Leonardo</h5>
                  <small style={{fontSize: '14px'}}>Frontend</small>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 wow fadeInUp" data-wow-delay="0.1s">
              <div className="team-item mx-auto border rounded shadow">
                <div className="overflow-hidden">
                  <img className="img-fluid" src={Andre} alt="" />
                </div>
                <div className="position-relative d-flex justify-content-center mt-3">
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-github"></i></Link>
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-linkedin"></i></Link>
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-instagram"></i></Link>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Andre Riyanto</h5>
                  <small style={{fontSize: '14px'}}>Backend</small>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 wow fadeInUp" data-wow-delay="0.1s">
              <div className="team-item mx-auto border rounded shadow">
                <div className="overflow-hidden">
                  <img className="img-fluid" src={Ihsan} alt="" />
                </div>
                <div className="position-relative d-flex justify-content-center mt-3">
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-github"></i></Link>
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-linkedin"></i></Link>
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-instagram"></i></Link>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Muhammad Ihsan</h5>
                  <small style={{fontSize: '14px'}}>Backend</small>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 wow fadeInUp" data-wow-delay="0.1s">
              <div className="team-item mx-auto border rounded shadow">
                <div className="overflow-hidden">
                  <img className="img-fluid" src={Tiar} alt="" />
                </div>
                <div className="position-relative d-flex justify-content-center mt-3">
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="https://github.com/septiarmustafa" target='_blank'><i className="fab fa-github"></i></Link>
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="https://www.linkedin.com/in/septiar-mustafa-26a121176/" target='_blank'><i className="fab fa-linkedin"></i></Link>
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="https://www.instagram.com/septiarmustafa" target='_blank'><i className="fab fa-instagram"></i></Link>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Septiar Mustafa</h5>
                  <small style={{fontSize: '14px'}}>Mobile</small>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 wow fadeInUp" data-wow-delay="0.1s">
              <div className="team-item mx-auto border rounded shadow">
                <div className="overflow-hidden">
                  <img className="img-fluid" src={Baim} alt="" />
                </div>
                <div className="position-relative d-flex justify-content-center mt-3">
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-github"></i></Link>
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-linkedin"></i></Link>
                  <Link className="btn btn-square mx-1" style={{backgroundColor: 'gold', color: 'black'}} to="#"><i className="fab fa-instagram"></i></Link>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Muhammad Ibrahim</h5>
                  <small style={{fontSize: '14px'}}>Mobile</small>
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
