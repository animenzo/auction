import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div>
     
      <nav className="navbar shadow-sm">
        <div className="container ">
          <Link className="navbar-brand h1 text-primary" to="/home">
            Auction
          </Link>
         
          <div className=" w-75 d-flex justify-content-between " id="navbarNav">
           
                <Link className="nav-link text-dark" to="/home">Home</Link>
                <Link className="nav-link text-dark" to="/dashboard">Dashboard</Link>
                <Link className="nav-link text-dark" to="/userprofile">User Profile</Link>
                <Link className="nav-link text-danger" to="/">Logout</Link>
          </div>
        </div>
      </nav>

 
      <section className="bg-light text-dark py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">Welcome to AuctionHub</h1>
          <p className="lead">Bid. Win. Own. The best auction platform for all your needs.</p>
          <Link to="/explore" className="btn btn-primary btn-lg mt-3">Explore Auctions</Link>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="text-center mb-4">Featured Auctions</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm">
             
             
              <div className="card-body">
                <h5 className="card-title">PS5</h5>
                <p className="card-text">Starting Bid: $750</p>
                <Link to="/auction/1" className="btn btn-primary">Bid Now</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm">
            
              <div className="card-body">
                <h5 className="card-title">Artistic Painting</h5>
                <p className="card-text">Starting Bid: $500</p>
                <Link to="/auction/2" className="btn btn-primary">Bid Now</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm">
             
              <div className="card-body">
                <h5 className="card-title">Luxury Car Model</h5>
                <p className="card-text">Starting Bid: $5,000</p>
                <Link to="/auction/3" className="btn btn-primary">Bid Now</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
