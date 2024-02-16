import React, { useState, useEffect } from 'react';
import axios from '../../../store/axiosInterceptor';
import { Link } from 'react-router-dom';
import SideBar from '../../../components/Admin/SideBar/SideBar';
import NavbarAdmin from '../../../components/Admin/Navbar/NavbarAdmin';
import cat1 from '../../../assets/Admin/img/categories/01.jpg'
import cat2 from '../../../assets/Admin/img/categories/02.jpg'
import cat3 from '../../../assets/Admin/img/categories/03.jpg'
import cat4 from '../../../assets/Admin/img/categories/04.jpg'

import avatar1 from '../../../assets/Admin/img/avatar/avatar-face-02.png'
import avatar2 from '../../../assets/Admin/img/avatar/avatar-face-03.png'
import avatar3 from '../../../assets/Admin/img/avatar/avatar-face-04.png'
import avatar4 from '../../../assets/Admin/img/avatar/avatar-face-05.png'


function Dashboard() {


    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalSellers, setTotalSellers] = useState(0);
    const [totalKosans, setTotalKosans] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);

    useEffect(() => {
        axios.get('/customer/v1')
            .then(response => {
                const customers = response.data; // Ambil data customer dari respons API
                const total = customers.length; // Hitung jumlah data customer
                setTotalCustomers(total); // Update state dengan jumlah total customer
            })
            .catch(error => {
                console.error('Error fetching customer data:', error);
            });
    }, []);

    useEffect(() => {
        axios.get('/seller/v1')
            .then(response => {
                const sellers = response.data; 
                const total = sellers.length;
                setTotalSellers(total); 
            })
            .catch(error => {
                console.error('Error fetching seller data:', error);
            });
    }, []);

    useEffect(() => {
        axios.get('/kost')
            .then(response => {
                const kosans = response.data.data; 
                const total = kosans.length;
                setTotalKosans(total); 
            })
            .catch(error => {
                console.error('Error fetching kosan data:', error);
            });
    }, []);

    useEffect(() => {
        axios.get('/review/v1')
            .then(response => {
                const reviews = response.data; 
                const total = reviews.length;
                setTotalReviews(total); 
            })
            .catch(error => {
                console.error('Error fetching kosan data:', error);
            });
    }, []);

  return (
    <main className="main users chart-page" id="skip-target">
      <div className="container">
        <h2 className="main-title">Dashboard</h2>
        <div className="row stat-cards">
            <div className="col-md-6 col-xl-3">
                <article className="stat-cards-item">
                    <div className="stat-cards-icon primary">
                        <i data-feather="users" aria-hidden="true"></i>
                    </div>
                    <div className="stat-cards-info">
                        <p className="stat-cards-info__num">Total : {totalCustomers}</p>
                        <p className="stat-cards-info__title">Customer</p>
                    </div>
                </article>
            </div>
            <div className="col-md-6 col-xl-3">
                <article className="stat-cards-item">
                    <div className="stat-cards-icon primary">
                        <i data-feather="user" aria-hidden="true"></i>
                    </div>
                    <div className="stat-cards-info">
                        <p className="stat-cards-info__num">Total : {totalSellers}</p>
                        <p className="stat-cards-info__title">Seller</p>
                    </div>
                </article>
            </div>
            <div className="col-md-6 col-xl-3">
                <article className="stat-cards-item">
                    <div className="stat-cards-icon primary">
                        <i data-feather="home" aria-hidden="true"></i>
                    </div>
                    <div className="stat-cards-info">
                        <p className="stat-cards-info__num">Total : {totalKosans}</p>
                        <p className="stat-cards-info__title">Kosan</p>
                    </div>
                </article>
            </div>
            <div className="col-md-6 col-xl-3">
                <article className="stat-cards-item">
                    <div className="stat-cards-icon primary">
                        <i data-feather="star" aria-hidden="true"></i>
                    </div>
                    <div className="stat-cards-info">
                        <p className="stat-cards-info__num">Total : {totalReviews}</p>
                        <p className="stat-cards-info__title">Testimonial</p>
                    </div>
                </article>
            </div>
        </div>
        <div className="row stat-cards">
            <div className="col-md-6 col-xl-3">
                <article className="stat-cards-item">
                    <div className="stat-cards-icon primary">
                        <i data-feather="star" aria-hidden="true"></i>
                    </div>
                    <div className="stat-cards-info">
                        <p className="stat-cards-info__num">Total : {totalReviews}</p>
                        <p className="stat-cards-info__title">Testimonial</p>
                    </div>
                </article>
            </div>
            <div className="col-md-6 col-xl-3">
                <article className="stat-cards-item">
                    <div className="stat-cards-icon primary">
                        <i data-feather="star" aria-hidden="true"></i>
                    </div>
                    <div className="stat-cards-info">
                        <p className="stat-cards-info__num">Total : {totalReviews}</p>
                        <p className="stat-cards-info__title">Testimonial</p>
                    </div>
                </article>
            </div>
            <div className="col-md-6 col-xl-3">
                <article className="stat-cards-item">
                    <div className="stat-cards-icon primary">
                        <i data-feather="star" aria-hidden="true"></i>
                    </div>
                    <div className="stat-cards-info">
                        <p className="stat-cards-info__num">Total : {totalReviews}</p>
                        <p className="stat-cards-info__title">Testimonial</p>
                    </div>
                </article>
            </div>
            <div className="col-md-6 col-xl-3">
                <article className="stat-cards-item">
                    <div className="stat-cards-icon primary">
                        <i data-feather="star" aria-hidden="true"></i>
                    </div>
                    <div className="stat-cards-info">
                        <p className="stat-cards-info__num">Total : {totalReviews}</p>
                        <p className="stat-cards-info__title">Testimonial</p>
                    </div>
                </article>
            </div>
        
        </div>
        <div className="row">
            <div className="col-lg-12">
                <div className="users-table table-wrapper">
                    <table className="posts-table">
                        <thead>
                            <tr className="users-table-info">
                                <th>
                                    <label className="users-table__checkbox ms-20">
                                        <input type="checkbox" className="check-all" />Thumbnail
                                    </label>
                                </th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <label className="users-table__checkbox">
                                        <input type="checkbox" className="check" />
                                        <div className="categories-table-img">
                                            <picture>
                                                <img src={cat1} alt="category" />
                                            </picture>
                                        </div>
                                    </label>
                                </td>
                                <td><Link to="#">Starting your traveling blog with Vasco</Link></td>
                                <td>
                                    <div className="pages-table-img">
                                        <picture>
                                            <img src={avatar1} alt="User Name" />
                                        </picture>
                                        <Link to="#">Jenny Wilson</Link>
                                    </div>
                                </td>
                                <td><span className="badge-pending">Pending</span></td>
                                <td>17.04.2021</td>
                                <td>
                                    <span className="p-relative">
                                        <button className="dropdown-btn transparent-btn" type="button" title="More info">
                                            <div className="sr-only">More info</div>
                                            <i data-feather="more-horizontal" aria-hidden="true"></i>
                                        </button>
                                        <ul className="users-item-dropdown dropdown">
                                            <li><Link to="#">Edit</Link></li>
                                            <li><Link to="#">Quick edit</Link></li>
                                            <li><Link to="#">Trash</Link></li>
                                        </ul>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="users-table__checkbox">
                                        <input type="checkbox" className="check" />
                                        <div className="categories-table-img">
                                            <picture>
                                                <img src={cat2} alt="category" />
                                            </picture>
                                        </div>
                                    </label>
                                </td>
                                <td><Link to="#">Start a blog to reach your creative peak</Link></td>
                                <td>
                                    <div className="pages-table-img">
                                        <picture>
                                            <img src={avatar2} alt="User Name" />
                                        </picture>
                                        <Link to="#">Annette Black</Link>
                                    </div>
                                </td>
                                <td><span className="badge-pending">Pending</span></td>
                                <td>23.04.2021</td>
                                <td>
                                    <span className="p-relative">
                                        <button className="dropdown-btn transparent-btn" type="button" title="More info">
                                            <div className="sr-only">More info</div>
                                            <i data-feather="more-horizontal" aria-hidden="true"></i>
                                        </button>
                                        <ul className="users-item-dropdown dropdown">
                                            <li><Link to="#">Edit</Link></li>
                                            <li><Link to="#">Quick edit</Link></li>
                                            <li><Link to="#">Trash</Link></li>
                                        </ul>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="users-table__checkbox">
                                        <input type="checkbox" className="check" />
                                        <div className="categories-table-img">
                                            <picture>
                                                <img src={cat3} alt="category" />
                                            </picture>
                                        </div>
                                    </label>
                                </td>
                                <td><Link to="#">Helping a local business reinvent itself</Link></td>
                                <td>
                                    <div className="pages-table-img">
                                        <picture>
                                            <img src={avatar3} alt="User Name" />
                                        </picture>
                                        <Link to="#">Kathryn Murphy</Link>
                                    </div>
                                </td>
                                <td><span className="badge-active">Active</span></td>
                                <td>17.04.2021</td>
                                <td>
                                    <span className="p-relative">
                                        <button className="dropdown-btn transparent-btn" type="button" title="More info">
                                            <div className="sr-only">More info</div>
                                            <i data-feather="more-horizontal" aria-hidden="true"></i>
                                        </button>
                                        <ul className="users-item-dropdown dropdown">
                                            <li><Link to="#">Edit</Link></li>
                                            <li><Link to="#">Quick edit</Link></li>
                                            <li><Link to="#">Trash</Link></li>
                                        </ul>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="users-table__checkbox">
                                        <input type="checkbox" className="check" />
                                        <div className="categories-table-img">
                                            <picture>
                                                <img src={cat4} alt="category" />
                                            </picture>
                                        </div>
                                    </label>
                                </td>
                                <td><Link to="#">Helping a local business reinvent itself</Link></td>
                                <td>
                                    <div className="pages-table-img">
                                        <picture>
                                            <img src={avatar4} alt="User Name" />
                                        </picture>
                                        <Link to="#">Kathryn Murphy</Link>
                                    </div>
                                </td>
                                <td><span className="badge-active">Active</span></td>
                                <td>17.04.2021</td>
                                <td>
                                    <span className="p-relative">
                                        <button className="dropdown-btn transparent-btn" type="button" title="More info">
                                            <div className="sr-only">More info</div>
                                            <i data-feather="more-horizontal" aria-hidden="true"></i>
                                        </button>
                                        <ul className="users-item-dropdown dropdown">
                                            <li><Link to="#">Edit</Link></li>
                                            <li><Link to="#">Quick edit</Link></li>
                                            <li><Link to="#">Trash</Link></li>
                                        </ul>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
