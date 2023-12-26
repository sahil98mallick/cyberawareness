import React, { useEffect, useState } from 'react'
import { useAuth } from '../Auth/AuthContext';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { addquery, viewquerybyid } from '../../ApiManager/Apihandle';

const ChatBox = ({ onClose }) => {
    const [auth, setauth] = useAuth();
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        data.creatorname = auth?.user?.name;
        data.creatorid = auth?.user?._id
        data.status = false;
        try {
            const response = await addquery(data);
            if (response?.data) {
                toast.info(response?.data?.message);
                await fetchdetails();
                setValue("querydetails", "")
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            toast.error(error)
        }
    }
    // Fetch Query Details by UserID
    const [query, setquery] = useState([]);
    const fetchdetails = async () => {
        const response = await viewquerybyid(auth?.user?._id)
        setquery(response?.data?.queryDetails)
    }
    useEffect(() => {
        fetchdetails();
    }, [auth?.user?._id])
    return (
        <>
            <div className="chatbox">
                <div className="chatbox-header">
                    <span id='chattitle'>Chat with Us</span>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="chatbox-body">
                    <div className="system-message">
                        <span className="robot-icon"><i className="bi bi-robot"></i></span>
                        <p>Hi there 👋<br />How can I help you today?</p>
                    </div>
                    {
                        query?.map((item, key) => {
                            return (
                                <>
                                    <div className="user-message" key={key + 1}>
                                        <span className="robot-icon"><i class="bi bi-people-fill"></i></span>
                                        <p>{item?.querydetails}</p>
                                        <div className="createdppost">
                                            <i>{item?.createdAt?.slice(0, 15)}</i>
                                        </div>
                                    </div>
                                    <div className="system-message">
                                        <span className="robot-icon"><i className="bi bi-robot"></i></span>
                                        <p>Thank You 👍<br />You have Raised your Query..</p>
                                    </div>
                                    <div className="system-message">
                                        <span className="robot-icon"><i className="bi bi-robot"></i></span>
                                        <p>Our Executive will Contact your Soon.</p>
                                    </div>

                                </>
                            )
                        })
                    }
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className='chatbox-footer'>
                        <input type="text" placeholder="Type your Query Here..."
                            {...register("querydetails", { required: true })} required />
                        <button type='submit' className="send-btn">Send</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ChatBox