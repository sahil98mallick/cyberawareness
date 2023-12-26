import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useAuth } from '../Auth/AuthContext';
import Swal from 'sweetalert2';
import { subscribedform } from '../../ApiManager/Apihandle';

const Footer = () => {
    const [auth] = useAuth();
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        try {
            const storedEmail = localStorage.getItem('subscribedEmail');

            if (storedEmail === data.email) {
                Swal.fire({
                    icon: 'warning',
                    title: 'You are already subscribed with this email.',
                    timer: 2000,
                    showConfirmButton: true,
                });
                setValue("email", "");
            } else {
                const response = await subscribedform(data);

                if (response?.data) {
                    Swal.fire({
                        icon: 'success',
                        title: response?.data?.message,
                        timer: 2000,
                        showConfirmButton: true,
                    });

                    localStorage.setItem('subscribedEmail', data.email);

                    setValue("email", "");
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: response?.data?.message,
                        timer: 2000,
                        showConfirmButton: true,
                    });
                }
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: error,
                timer: 3000,
                showConfirmButton: true,
            });
        }
    };


    return (
        <>
            <section id='footersection'>
                <footer className="footer-container">
                    <div className="footer-section company-info">
                        <h2 className="footer-heading">Cyber Awareness</h2>
                        <p className="footer-text">Promote cyber awareness: Educate, share security tips, stay updated on threats, and empower users for a safer digital environment.</p>
                        <p className="contact-info">
                            <span className="phone">+82 1234567890</span><br />
                            <span className="email">mail@cyberawareness.com</span>
                        </p>
                        <p className="address">1907 Pearl Street</p>
                    </div>
                    <div className="footer-section quick-links">
                        <h2 className="footer-heading">Quick Links</h2>
                        <div className="footerlist">
                            <Link to='/' className='footerlink'>Home</Link>
                            <Link to='/About' className='footerlink'>About</Link>
                            <Link to='/Contact' className='footerlink'>Contact</Link>
                            {
                                !auth?.user ? (
                                    <><Link to='/Login' className='footerlink'>Login</Link>
                                        <Link to='/Register' className='footerlink'>Register</Link></>
                                ) : (
                                    <><Link className='footerlink'>{auth?.user?.name}</Link></>
                                )
                            }
                        </div>
                    </div>
                    <div className="footer-section newsletter">
                        <h2 className="footer-heading">Subscribe To Cyber Awareness</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input type="email" placeholder="Your email id here" className="newsletter-input"
                                {...register("email", { required: true })} />
                            <center><button type="submit" className="subscribe-btn">Subscribe</button></center>
                        </form>
                        <div className="social-icons">
                            <a href="/instagram" className="social-icon"><i class="bi bi-instagram" style={{ fontSize: "30px", color: "orange" }}></i></a>
                            <a className="social-icon"><i class="bi bi-twitter" style={{ fontSize: "30px", color: "white" }}></i></a>
                            <a className="social-icon"><i class="bi bi-facebook" style={{ fontSize: "30px", color: "#48A1FF" }}></i></a>
                            <a className="social-icon"><i class="bi bi-whatsapp" style={{ fontSize: "30px", color: "green" }}></i></a>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p className="copyright-text">Copyright © 2023 Cyber Awareness | All Rights Reserved</p>
                    </div>
                </footer>
            </section>
        </>
    );
}

export default Footer;
