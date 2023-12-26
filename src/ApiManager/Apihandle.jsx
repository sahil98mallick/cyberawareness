import axios from "axios";

const baseURL = "https://cyberawarenessserver.onrender.com";

// Register API
export const registerfunction = async (data) => {
    return await axios.post(`${baseURL}/users/userregister`, data)
}
// Login API
export const loginfunction = async (data) => {
    return await axios.post(`${baseURL}/users/login`, data)
}
// View Profile by id
export const viewprofile = async (id) => {
    return await axios.get(`${baseURL}/users/singleuser/${id}`)
}
// Update Profile Details
export const updateprofile = async (userid, data) => {
    return await axios.put(`${baseURL}/users/updateuserdetail/${userid}`, data)
}
// Update Password from Accounts
export const changepasswordfromaccounts = async (data) => {
    return await axios.put(`${baseURL}/users/changepasswordfromaccount`, data)
}
// Reset Password
export const resetpassword = async (data) => {
    return await axios.put(`${baseURL}/users/resetpassword`, data)
}
// Add Query Details
export const addquery = async (data) => {
    return await axios.post(`${baseURL}/querydetails/addquerydetails`, data)
}
// View Query Details by UserID
export const viewquerybyid = async (userid) => {
    return await axios.get(`${baseURL}/querydetails/viewquerybyuserid/${userid}`)
}
// Delete Query Details by id
export const deletequerybyid = async (id) => {
    return await axios.delete(`${baseURL}/querydetails/deletequerybyid/${id}`)
}

// Add Contact Form Details
export const addcontactdata = async (data) => {
    return await axios.post(`${baseURL}/contactdetails/addcontactdetails`, data)
}

// Add Subscribe Form Details
export const subscribedform = async (data) => {
    return await axios.post(`${baseURL}/Subscribeusers/subscribe`, data)
}

