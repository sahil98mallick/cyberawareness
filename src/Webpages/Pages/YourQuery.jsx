import React, { useEffect, useState } from 'react'
import { useAuth } from '../Auth/AuthContext';
import { deletequerybyid, viewquerybyid } from '../../ApiManager/Apihandle';
import Swal from 'sweetalert2';

const YourQuery = () => {
    const [auth, setauth] = useAuth();
    const [query, setquery] = useState([]);
    const fetchdetails = async () => {
        const response = await viewquerybyid(auth?.user?._id)
        setquery(response?.data?.queryDetails)
    }
    useEffect(() => {
        fetchdetails();
    }, [auth?.user?._id])

    const deletequeryfunction = async (id) => {
        try {
            const response = await deletequerybyid(id)
            if (response?.data) {
                Swal.fire({
                    icon: 'success',
                    title: response?.data?.message,
                    timer: 3000,
                    showConfirmButton: false,
                }).then(() => {
                    fetchdetails()
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
    return (
        <>
            <div id='sectiondesign'>
                <div id="querytabledesign">
                    <br /><br />
                    {
                        query?.length > 0 ? (<>
                            <center><h2>Your All Queries</h2></center>
                            <table class="table" id='querytable'>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Created Date</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Your Query Details</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        query?.map((item, key) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <th scope="row">{key + 1}</th>
                                                        <td>{item?.createdAt?.slice(0, 15)}</td>
                                                        <td>{item?.creatorname}</td>
                                                        <td>{item?.querydetails}</td>
                                                        <td>{item?.status ? 'Query Resolved' : 'Pending'}</td>
                                                        <td><button className='send-btn' onClick={() => { deletequeryfunction(item?._id) }}>Delete</button></td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </>) : (
                            <>
                                <center><h2>No Query Found for You Account</h2></center>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default YourQuery