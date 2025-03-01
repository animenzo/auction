import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import  {UserDataContext} from '../context/UserContext'
import axios from 'axios'
import { toast } from 'react-toastify';
const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors,setErrors] = useState({})

    const {user,setUser} = React.useContext(UserDataContext)
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        try {
            e.preventDefault();
        // setUserData({email:email,password:password})
        // console.log(email,password)

        const userData = {
            email:email,password:password
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData)
        if(response.status === 200){
            const data = response.data
            setUser(data.user)
            localStorage.setItem('token',data.token)
            navigate('/home')
        }
        setEmail('')
        setPassword('')
        } catch (error) {
            console.log(error);
            
        }
        if(errors){
            toast.error('Invalid Email or Password')
            }
       
    }


    return (
        <div className="py-5 d-flex flex-column justify-content-center px-5 align-items-center  ">
            <div className="text-center mb-4">
                <img className='w-25 ' src="https://www.shutterstock.com/image-vector/judge-hammer-icon-vector-design-600nw-1707322342.jpg" alt="Uber Logo" />
            </div>
            <div className="col-lg-4 col-md-4 bg-white py-5 px-3 shadow col-12 mb-4">
           
                <form onSubmit={(e)=>submitHandler(e)}>
                    <h3 className="mb-2">What's your email?</h3>
                    <input type="email" className="form-control mb-3" required placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <h3 className="mb-2">Enter Password</h3>
                    <input type="password" className="form-control mb-3" required placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="btn btn-dark w-100 mb-3">Login</button>
                </form>
                <p className="text-center">
                    New Here? <Link to="/signup" className="text-primary">Create Account</Link>
                </p>
            </div>
           
        </div>
    );
};

export default UserLogin;
