import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { loginfunction } from '../../ApiManager/Apihandle';
import { toast } from 'react-toastify';
import { useAuth } from '../Auth/AuthContext';
import Swal from 'sweetalert2';

const Login = () => {
  const [auth, setauth] = useAuth();
  const [isLoading, setisloading] = useState(false)
  const naviagte = useNavigate();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const response = await loginfunction(data);
    const logindt = response?.data;
    try {
      if (logindt.success) {
        setauth({
          ...auth,
          user: logindt.user,
          token: logindt.token
        })
        localStorage.setItem("auth", JSON.stringify(response.data))
        Swal.fire({
          icon: 'success',
          title: logindt?.message,
          timer: 1000,
          showConfirmButton: false,
        }).then(() => {
          naviagte("/");
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: logindt?.message,
          timer: 3000,
          showConfirmButton: true,
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: error,
        timer: 3000,
        showConfirmButton: true,
      })
    } finally {
      setisloading(false)
    }
  }
  return (
    <>
      <div id='sectiondesign'>
        <div class="container">
          <center><img src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png" alt="Logo"
            style={{ width: "150px", height: "150px", borderRadius: "50px", margin: "auto", marginTop: "15px", background: "#F4F8F6" }} /></center>
          <center><h4 style={{ marginTop: '10px' }}>Welcome Cyber Awareness || Login Here</h4></center>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ padding: "35px", }}>
              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput"
                  {...register("email", { required: true })} />
                <label for="floatingInput">Email address</label>
              </div>
              {errors.email?.type === "required" && <p>Email is Required</p>}
              <div class="form-floating mb-3">
                <input type="password" class="form-control" id="floatingPassword"
                  {...register("password", { required: true, minLength: 5, maxLength: 20 })} />
                <label for="floatingPassword">Password</label>
              </div>
              {errors.password?.type === "required" && <p>Password is Required</p>}
              {errors.password?.type === "minLength" && <p>Password is Minimum length is 5</p>}
              {errors.password?.type === "maxLength" && <p>Password is maximum length is 20</p>}
              <br />
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <center><button type='submit' className='loginbtndesign'>{isLoading ? 'Logging in...' : 'Login'}</button></center>
                <center><Link to='/Register' className='regbtndesign'>Register</Link></center>
              </div>
              <br />
              <center><Link to='/Resetpassword' className='resetbtn'>Reset Your Password Here</Link></center>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login