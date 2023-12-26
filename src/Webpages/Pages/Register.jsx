import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { registerfunction } from '../../ApiManager/Apihandle';
import { toast } from 'react-toastify';

const Register = () => {
  const [isLoading, setisloading] = useState(false)
  const naviagte = useNavigate();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    data.activestatus = true;
    setisloading(true)
    try {
      const response = await registerfunction(data);
      if (response.data) {
        toast.success(response.data.message);
        naviagte('/Login')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error)
    } finally {
      setisloading(false)
    }
  }
  return (
    <>
      <div id='sectiondesign'>
        <div class="regcontainer">
          <center><img src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png" alt="Logo"
            style={{ width: "150px", height: "150px", borderRadius: "50px", margin: "auto", marginTop: "15px", background: "#F4F8F6" }} /></center>
          <center><h4 style={{ marginTop: '10px' }}>Welcome Cyber Awareness || Register Here</h4></center>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ padding: "25px", }}>
              <div class="row">
                <div class="col">
                  <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Name"
                      {...register("name", { required: true })} />
                    <label for="exampleFormControlInput1" class="form-label">Full Name</label>
                  </div>
                  {errors.name?.type === "required" && <p>Name is Required</p>}
                </div>
                <div class="col">
                  <div class="form-floating mb-3">
                    <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="1234567890"
                      {...register("phone", { required: true })} />
                    <label for="exampleFormControlInput1" class="form-label">Phone</label>
                  </div>
                  {errors.phone?.type === "required" && <p>Phone is Required</p>}
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"
                      {...register("email", { required: true })} />
                    <label for="exampleFormControlInput1" class="form-label">Email address</label>
                  </div>
                  {errors.email?.type === "required" && <p>Email is Required</p>}
                </div>
                <div class="col">
                  <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="*************"
                      {...register("password", { required: true, minLength: 5, maxLength: 20 })} />
                    <label for="exampleFormControlInput1" class="form-label">Password</label>
                  </div>
                  {errors.password?.type === "required" && <p>Password is Required</p>}
                  {errors.password?.type === "required" && <p>Password is Required</p>}
                  {errors.password?.type === "minLength" && <p>Password is Minimum length is 5</p>}
                  {errors.password?.type === "maxLength" && <p>Password is maximum length is 20</p>}
                </div>
              </div>
              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="ABC, 2023"
                  {...register("address", { required: true })} />
                <label for="exampleFormControlInput1" class="form-label">Address</label>
              </div>
              {errors.address?.type === "required" && <p>Address is Required</p>}
              <br />
              <div style={{ display: "flex", justifyContent: "space-evenly", width: "400px", margin: "auto" }}>
                <center><button type='submit' className='loginbtndesign'>
                {isLoading ? 'Wait...' : 'Submit'}
                </button></center>
                <center><Link to='/Login' className='regbtndesign'>Back to Login</Link></center>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register