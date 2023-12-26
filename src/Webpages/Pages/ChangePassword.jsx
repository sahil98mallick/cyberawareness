import React, { useState } from 'react'
import { useAuth } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { changepasswordfromaccounts } from '../../ApiManager/Apihandle';
import Swal from 'sweetalert2';

const ChangePassword = () => {
    const [auth, setauth] = useAuth();
    const [isLoading, setisloading] = useState(false)
    const naviagte = useNavigate();
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        data.email = auth?.user?.email;
        try {
            const response = await changepasswordfromaccounts(data)
            if (response?.data) {
                Swal.fire({
                    icon: 'success',
                    title: response?.data?.message,
                    timer: 3000,
                    showConfirmButton: true,
                }).then(() => {
                    naviagte("/Profile");
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: response?.data?.message,
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
        }

    }

    return (
        <>
            <div id='sectiondesign'>

                <div class="changepasswordcontainer">
                    <center><img src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png" alt="Logo"
                        style={{ width: "150px", height: "150px", borderRadius: "50px", margin: "auto", marginTop: "15px", background: "#F4F8F6" }} /></center>
                    <center><h4 style={{ marginTop: '5px' }}>Change Your Password Here</h4></center>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div style={{ padding: "35px", }}>
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
                                    value={auth?.user?.email} disabled />
                                <label for="floatingInput">Email address</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
                                    {...register("currentPassword", { required: true })} />
                                <label for="floatingPassword">Previous Password</label>
                            </div>
                            {errors.currentPassword?.type === "required" && <p>Password is Required</p>}
                            {errors.currentPassword?.type === "minLength" && <p>Password is Minimum length is 5</p>}
                            {errors.currentPassword?.type === "maxLength" && <p>Password is maximum length is 20</p>}
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
                                    {...register("newPassword", { required: true })} />
                                <label for="floatingPassword">New Password</label>
                            </div>
                            {errors.currentPassword?.type === "required" && <p>Password is Required</p>}
                            {errors.currentPassword?.type === "minLength" && <p>Password is Minimum length is 5</p>}
                            {errors.currentPassword?.type === "maxLength" && <p>Password is maximum length is 20</p>}
                            <br />
                            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                <center><button type='submit' className='loginbtndesign'>Submit</button></center>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ChangePassword