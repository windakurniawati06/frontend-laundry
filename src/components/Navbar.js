import React from 'react';
import { Link } from "react-router-dom";

function Logout() {
    // remove data token dan user dari local storage
    localStorage.removeItem("user")
    localStorage.removeItem("token")
}
export default function Navbar(props) {
    return (
        <div>
            {/* <nav className="navbar navbar-light" style="background-color: #e3f2fd;"> */}
            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor : '#1597E5'}}>
                <div className="container">
                    <a className="navbar-brand text-white"><i class="fa-solid fa-soap mx-1"></i>
                        Timmy Laundry
                    </a>

                    {/* button toggler */}
                    <button className="navbar-toggler"
                        data-bs-toggle="collapse"
                        data-bs-target="myNav"
                        aria-controls="myNav"
                        aria-expanded="false">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* define menus */}
                    <div className="collapse navbar-collapse" id="#myNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">
                                <i class="fa-solid fa-house text-white"></i>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/member" className="nav-link text-white">
                                    Member
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/paket" className="nav-link text-white">
                                    Packages
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/user" className="nav-link text-white ">
                                    User
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/transaksi" className="nav-link text-white">
                                    Transaction 
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/form_transaksi" className="nav-link text-white">
                                    Add Transaksi
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                                <Link to="/auth" className="nav-link"
                                    onClick={() => Logout()}>
                                        <i class="fa-solid fa-right-from-bracket"></i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {props.children}
        </div>
    )
}