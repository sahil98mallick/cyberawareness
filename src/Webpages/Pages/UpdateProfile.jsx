import React, { useEffect, useState } from 'react'
import { useAuth } from '../Auth/AuthContext'
import { updateprofile, viewprofile } from '../../ApiManager/Apihandle';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const UpdateProfile = () => {
    const [auth] = useAuth();
    const navigate = useNavigate();
    const [user, setuser] = useState({});
    const fetchuserdetails = async () => {
        try {
            const response = await viewprofile(auth?.user?._id)
            setuser(response?.data?.finddata)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchuserdetails();
    }, [auth?.user?._id])
    // Update Profile
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        data.name = user?.name;
        data.email = user?.email;
        data.activestatus = user?.activestatus;
        data.address = user?.address;
        try {
            const response = await updateprofile(auth?.user?._id, data);
            if (response?.data) {
                Swal.fire({
                    icon: 'success',
                    title: response?.data?.message,
                    timer: 3000,
                    showConfirmButton: true,
                })
                navigate('/Profile')
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
                <div style={{ marginTop: "20px" }}>
                    <div class="user-card">
                        <img src="https://i.pinimg.com/1200x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg" alt="John" style={{ width: "150px", height: "150px" }} />
                        <br /><br />
                        <form style={{ padding: "10px" }} onSubmit={handleSubmit(onSubmit)}>
                            <div class="form-group">
                                <label >Email address</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user?.email} disabled />
                            </div>
                            <div class="form-group">
                                <label >Name</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user?.name} disabled />
                            </div>
                            <div class="form-group">
                                <label >Phone Number</label>
                                <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    placeholder="Enter Phone Number"
                                    {...register("phone", { required: true })} />
                            </div>
                            {errors.phone?.type === "required" && <p>Phone is Required</p>}
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"
                                    {...register("password", { required: true, minLength: 5, maxLength: 20 })} />
                            </div>
                            {errors.password?.type === "required" && <p>Password is Required</p>}
                            {errors.password?.type === "minLength" && <p>Password is Minimum length is 5</p>}
                            {errors.password?.type === "maxLength" && <p>Password is maximum length is 20</p>}
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <textarea type="text" class="form-control" placeholder="Address"
                                    value={user?.address} disabled />
                            </div>
                            <button class="contact-btn" style={{ textDecoration: "none", color: "black" }}>Submit</button>
                        </form>
                        <br />

                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateProfile