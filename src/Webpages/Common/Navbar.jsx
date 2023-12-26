import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Auth/AuthContext'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Navbar = () => {
    const [auth, setauth] = useAuth();
    const navigate = useNavigate()
    const logoutfunction = () => {
        Swal.fire({
            title: 'Logout',
            text: 'Are you sure you want to logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                toast.warn("Logout Successfully...");
                setauth({
                    ...auth,
                    user: null,
                    token: ""
                });
                localStorage.removeItem("auth");
                navigate("/login");
            }
        });
    };
    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div class="container-fluid">
                    <Link class="navbar-brand" to='/' style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <img src="https://cdn.logo.com/hotlink-ok/logo-social.png" alt="BrandLogo" style={{ width: "50px", height: "50px", borderRadius: "50px" }} />Cyber Awareness</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0" id='navelements'>
                            <li class="nav-item">
                                <Link to='/' class="nav-link" aria-current="page" >Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/About' class="nav-link" >About</Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/Contact' class="nav-link" >Contact</Link>
                            </li>
                            {auth?.user ? (
                                <>
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                            Accounts
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li><Link to='/Profile' class="dropdown-item" ><i class="bi bi-person-circle"></i>Profile</Link></li>
                                            <li><hr class="dropdown-divider" /></li>
                                            <li><Link to='/ChangePassword' class="dropdown-item" ><i class="bi bi-pass"></i>Change Password</Link></li>
                                            <li><hr class="dropdown-divider" /></li>
                                            <li><Link to='/YourQuery' class="dropdown-item" ><i class="bi bi-pass"></i>Your Query</Link></li>
                                            <li><hr class="dropdown-divider" /></li>
                                            <li><a onClick={() => logoutfunction()} class="dropdown-item" ><i class="bi bi-box-arrow-in-right"></i> Logout</a></li>
                                        </ul>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li class="nav-item">
                                        <Link to='/Login' class="nav-link" >Login</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                    {/* Responsive Sidebar */}

                </div>
                <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasExampleLabel">Cyber Awareness</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div id='reselements'>
                        <div id='btnnavlements'>
                            <img src="https://cdn.logo.com/hotlink-ok/logo-social.png" alt="BrandLogo" style={{ width: "150px", height: "100px", borderRadius: "50px", margin: "0 auto" }} />
                            <h3>Cyber Awareness</h3>
                            <Link to='/' className='btndesign' style={{ fontFamily: "Times", fontSize: "20px" }}>Home</Link>
                            <Link to='/About' className='btndesign' style={{ fontFamily: "Times", fontSize: "20px" }}>Contact</Link>
                            <Link to='/Contact' className='btndesign' style={{ fontFamily: "Times", fontSize: "20px" }}>Contact</Link>
                            {
                                !auth?.user ? (
                                    <><Link to='/Login' className='btndesign' style={{ fontFamily: "Times", fontSize: "20px" }}>Login</Link></>
                                ) : (
                                    <><Link className='btndesign' style={{ fontFamily: "Times", fontSize: "20px" }}>{auth?.user?.name}</Link></>
                                )
                            }

                            {
                                auth?.user ? (
                                    <>
                                        <a onClick={() => logoutfunction()} className='btndesign'><i class="bi bi-box-arrow-in-right"></i> Logout</a>
                                    </>
                                ) : null
                            }

                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar