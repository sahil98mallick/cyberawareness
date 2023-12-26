import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { resetpassword } from '../../ApiManager/Apihandle';

const Resetpassword = () => {
    const navigate = useNavigate();
    const [isLoading, setisloading] = useState(false)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        setisloading(true)
        try {
            const response = await resetpassword(data);
            if (response?.data.success) {
                toast.success(response?.data?.message);
                navigate('/Login')
            } else {
                toast.error(response?.data?.message)
            }
        } catch (error) {
            toast.error(error)
        } finally {
            setisloading(false);
        }
    }
    return (
        <>
            <div id='sectiondesign'>

                <div class="container">
                    <center><img src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png" alt="Logo"
                        style={{ width: "150px", height: "150px", borderRadius: "50px", margin: "auto", marginTop: "10px", background: "#F4F8F6" }} /></center>
                    <center><h4 style={{ marginTop: '0px' }}>Reset Your Password</h4></center>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div style={{ padding: "35px", }}>
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
                                    {...register("email", { required: true })} />
                                <label for="floatingInput">Email address</label>
                            </div>
                            {errors.email?.type === "required" && <p>Email is Required</p>}
                            <div class="form-floating mb-3">
                                <input type="number" class="form-control" id="floatingPassword" placeholder="Phone"
                                    {...register("phone", { required: true })} />
                                <label>Phone</label>
                            </div>
                            {errors.phone?.type === "required" && <p>Phone is Required</p>}
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control" id="floatingPassword" placeholder="New Password"
                                    {...register("newPassword", { required: true, minLength: 5, maxLength: 20 })} />
                                <label>New Password</label>
                            </div>
                            {errors.newPassword?.type === "required" && <p>Password is Required</p>}
                            {errors.newPassword?.type === "minLength" && <p>Password is Minimum length is 5</p>}
                            {errors.newPassword?.type === "maxLength" && <p>Password is maximum length is 20</p>}
                            <br />
                            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                <center><button type='submit' className='loginbtndesign'>
                                {isLoading ? 'Wait...' : 'Submit'}</button></center>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Resetpassword