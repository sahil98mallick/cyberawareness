import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Webpages/Pages/Home';
import Navbar from './Webpages/Common/Navbar';
import About from './Webpages/Pages/About';
import Contact from './Webpages/Pages/Contact';
import Login from './Webpages/Pages/Login';
import Register from './Webpages/Pages/Register';
import ChangePassword from './Webpages/Pages/ChangePassword';
import Profile from './Webpages/Pages/Profile';
import YourQuery from './Webpages/Pages/YourQuery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Resetpassword from './Webpages/Pages/Resetpassword';
import UpdateProfile from './Webpages/Pages/UpdateProfile';
import { useAuth } from './Webpages/Auth/AuthContext';

function App() {
  const [auth, setauth] = useAuth()
  function PrivateRoute({ children }) {
    const token = localStorage.getItem("auth") || sessionStorage.getItem("auth");
    return token !== null && token !== undefined ? (
      children
    ) : (
      <Navigate to="/Login" />
    );
  }
  const PublicRoute = [
    {
      path: "/",
      components: <Home />
    },
    {
      path: "/Login",
      components: auth?.token ? <Navigate to="/Pofile" /> : <Login />
    },
    {
      path: "/Register",
      components: auth?.token ? <Navigate to="/Profile" /> : <Register />
    },
    {
      path: "/About",
      components: <About />
    },
    {
      path: "/Contact",
      components: <Contact />
    },
  ]
  const ProtectedRoute = [
    {
      path: "/Profile",
      components: <Profile />
    },
    {
      path: "/YourQuery",
      components: <YourQuery />
    },
    {
      path: "/UpdateProfile",
      components: <UpdateProfile />
    },
    {
      path: "/ChangePassword",
      components: <ChangePassword />
    },
  ]
  return (
    <>
      <ToastContainer />
      <Router>
        <Navbar />
        <Routes>
          {/* Public Route */}
          {
            PublicRoute?.map((item, key) => {
              return (
                <>
                  <Route
                    key={key + 1}
                    path={item.path}
                    element={item.components} />
                </>
              )
            })
          }
          {/* Private Route */}
          {
            ProtectedRoute?.map((item, key) => {
              return (
                <>
                  <Route
                    key={key + 1}
                    path={item.path}
                    element={<PrivateRoute>{item.components}</PrivateRoute>} />
                </>
              )
            })
          }
          {/* <Route path='/' element={<Home />} />
          <Route path='/About' element={<About />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/ChangePassword' element={<ChangePassword />} />
          <Route path='/Resetpassword' element={<Resetpassword />} />
          <Route path='/YourQuery' element={<YourQuery />} />
          <Route path='/UpdateProfile' element={<UpdateProfile />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
