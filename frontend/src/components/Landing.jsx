import React from "react";

import { Link } from "react-router-dom";

const Landing = () => {
  const howItWorks = [
    { title: "Post Items", description: "Auctioneer posts items for bidding." },
    { title: "Place Bids", description: "Bidders place bids on listed items." },
    {
      title: "Win Notification",
      description: "Highest bidder receives a winning email.",
    },
    {
      title: "Payment & Fees",
      description: "Bidder pays; auctioneer pays 5% fee.",
    },
  ];

  return (
    <>
      <section className="container-fluid px-4 pt-5 min-vh-100 d-flex flex-column justify-content-center">
        <div>
          <p className="text-secondary fw-bold fs-4 mb-3">
            Transparency Leads to Your Victory
          </p>
          <h1 className="text-dark fw-bold display-4 mb-2">
            Transparent Auctions
          </h1>
          <h1 className="text-danger fw-bold display-4 mb-4">
            Be The Winner
          </h1>
          <div className="d-flex gap-3 mb-5">
            {/* {!isAuthenticated && ( */}
            <>
              <Link
                to="/signup"
                className="btn btn-danger text-white fw-semibold px-4 py-2 mr-3"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="btn btn-outline-secondary fw-bold px-4 py-2"
              >
                Login
              </Link>
            </>
            {/* )} */}
          </div>
        </div>
        <div className="mb-5">
          <h3 className="text-dark fw-semibold mb-4 fs-3">
            How it works
          </h3>
          <div className="row g-4">
            {howItWorks.map((element) => {
              return (
                <div
                  key={element.title}
                  className="col-12 mb-3 col-md-6 col-lg-3"
                >
                  <div className="bg-white rounded shadow-sm p-3 h-100 d-flex flex-column justify-content-center">
                    <h5 className="fw-bold">{element.title}</h5>
                    <p className="mb-0">{element.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* <FeaturedAuctions />
        <UpcomingAuctions />
        <Leaderboard /> */}
      </section>
    </>
  );
};

export default Landing;
