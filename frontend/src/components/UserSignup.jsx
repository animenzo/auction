import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/Home')

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");

  }

  return (
    <div
      className="min-vh-100 d-flex flex-column 
      justify-content-center align-items-center py-5"
      
    >
     
      
      <div className="container mb-9">
      
        <div className="col-lg-6 col-md-6  col-12 mx-auto bg-white rounded p-4 shadow">
          <form>
            <h3 className="fw-bold mb-3">What's your name?</h3>
            <div className="row g-2 mb-4">
              <div className="col">
                <input
                  className="form-control"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder="First name"
                />
              </div>
              <div className="col">
                <input
                  className="form-control"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder="Last name"
                />
              </div>
            </div>

            <h3 className="fw-bold mb-3">What's your email?</h3>
            <input
              className="form-control mb-4"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="example@gmail.com"
            />

            <h3 className="fw-bold mb-3">Enter Password</h3>
            <input
              className="form-control mb-4"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />

            <button onClick={handleSubmit} className="btn btn-dark w-100 mb-3">
              Create Account
            </button>

            <p className="text-center mb-4">
              Already have an account?{" "}
              <Link to="/login" className="text-primary fw-bold">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className="container text-center text-white mb-4">
        <p className="small">
          By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages,
          including by automated means, from Uber and its affiliates to the
          number provided.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
