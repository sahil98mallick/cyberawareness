import React, { useState } from 'react'
import Banner from './Banner'
import Footer from './Footer'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { addcontactdata } from '../../ApiManager/Apihandle';
import { useNavigate } from 'react-router-dom';
import ChatBox from './ChatBox';
import { useAuth } from '../Auth/AuthContext';

const Contact = () => {
  const { register, formState: { errors }, handleSubmit, setValue } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await addcontactdata(data);
      if (response?.data) {
        Swal.fire({
          icon: 'success',
          title: response?.data?.message,
          timer: 3000,
          showConfirmButton: false,
        }).then(() => {
          setValue("name", "");
          setValue("email", "");
          setValue("phone", "");
          setValue("message", "");
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: response?.data?.message,
          timer: 3000,
          showConfirmButton: false,
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: error,
        timer: 3000,
        showConfirmButton: false,
      })
    }
  }
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
      <div id='sectiondesign'>
        <Banner />
        <section id="contactsection">
          <div class="contactcontainer">
            <div className="mapdesign">
              <iframe
                width={"100%"}
                height={"100%"}
                src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE_HERE"
                allowfullscreen=""
                loading="lazy"
                style={{ borderRadius: "20px" }}
              ></iframe>
            </div>
            <div className="contactformdesign">
              <center><h2>Contact Us</h2>
                <p>Fill up the below details to contact with us</p></center>
              <form onSubmit={handleSubmit(onSubmit)} id='formpart'>
                <input type="text" id="name" name="name" placeholder="Your Name"
                  {...register("name", { required: true })} />
                {errors.name?.type === "required" && <p>Email is Required</p>}
                <input type="email" id="email" name="email" placeholder="Your E-mail Address"
                  {...register("email", { required: true })} />
                {errors.email?.type === "required" && <p>Email is Required</p>}
                <input type="tel" id="phone" name="phone" placeholder="Your Phone Number"
                  {...register("phone", { required: true })} />
                {errors.phone?.type === "required" && <p>Email is Required</p>}
                <textarea id="message" name="message" placeholder="Your Message"
                  {...register("message", { required: true })}></textarea>
                {errors.message?.type === "required" && <p>Email is Required</p>}
                <center><button type="submit" class="btn">Get a Call Back</button></center>
              </form>
            </div>
          </div>
        </section>
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

export default Contact