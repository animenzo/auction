import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate('/home');
        setEmail("")
        setPassword("")

    }

    return (
        <div className="py-5 d-flex flex-column justify-content-center px-5 align-items-center  ">
            <div className="text-center mb-4">
                <img className='w-25 ' src="https://www.shutterstock.com/image-vector/judge-hammer-icon-vector-design-600nw-1707322342.jpg" alt="Uber Logo" />
            </div>
            <div className="col-lg-4 col-md-4 bg-white py-5 px-3 shadow col-12 mb-4">
           
                <form>
                    <h3 className="mb-2">What's your email?</h3>
                    <input type="email" className="form-control mb-3" required placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <h3 className="mb-2">Enter Password</h3>
                    <input type="password" className="form-control mb-3" required placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleSubmit} className="btn btn-dark w-100 mb-3">Login</button>
                </form>
                <p className="text-center">
                    New Here? <Link to="/signup" className="text-primary">Create Account</Link>
                </p>
            </div>
           
        </div>
    );
};

export default UserLogin;
