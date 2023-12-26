import React, { useState } from 'react'
import ChatBox from './ChatBox';
import Services from './Services';
import Banner from './Banner';
import Footer from './Footer';
import { useAuth } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const Home = () => {
    const [auth] = useAuth();
    const navigate = useNavigate()
    const [isChatboxOpen, setChatboxOpen] = useState(false);
    const toggleChatbox = () => {
        setChatboxOpen(!isChatboxOpen);
    };
    const closeChatbox = () => {
        setChatboxOpen(false);
    };
    const unauthorized = () => {
        Swal.fire({
            icon: 'warning',
            title: "You are Not Authorized Person",
            text: "Please Login First",
            timer: 3000,
            showConfirmButton: true,
        }).then(() => {
            navigate("/Login");
        });
    };
    return (
        <>
            {/* Benner Design */}
            <div id='sectiondesign'>
                <Banner />
                <section>
                    <h1 class="section-heading">About us</h1>
                    <div className="aboutsection">
                        <div className="aboutcard1">
                            <div className="headtitle">
                                <center><h2>Welcome to Cyber Awareness</h2></center>
                            </div>
                            <div className="bodytext">
                                <p id='abouttext'>
                                    Our website envisions a cyber-resilient community where individuals and organizations are empowered with the knowledge and skills to navigate the digital landscape safely. We strive to foster a culture of cybersecurity awareness that transcends barriers, creating a robust defense against evolving online threats.<br />
                                    Our mission is to deliver accessible and practical cyber awareness resources, equipping users with the tools to protect themselves from cyber threats. Through informative content, engaging educational materials, and community collaboration, we aim to demystify cybersecurity, making it an integral part of everyday online activities. By fostering a sense of shared responsibility.</p>
                            </div>
                        </div>
                        <div className="aboutcard2">

                        </div>
                    </div>
                </section>
                <Services />
                {/* Chat Bot Design */}
                {
                    auth?.user ? (
                        <>
                            <div className="chatbot-icon" onClick={toggleChatbox} title="Chat With Us">
                                <i class="bi bi-chat-dots-fill" style={{ fontSize: "35px" }}></i>
                            </div>
                            {isChatboxOpen && <ChatBox onClose={closeChatbox} />}
                        </>
                    ) : (
                        <>
                            <div className="chatbot-icon" onClick={() => { unauthorized() }} title="Chat With Us">
                                <i class="bi bi-chat-dots-fill" style={{ fontSize: "35px" }}></i>
                            </div>

                        </>
                    )
                }

                <Footer />
            </div>
        </>
    )
}

export default Home