import React from 'react';

const UserProfile = () => {
  return (
    <div className='container py-5'>
      <h2 className='text-center mb-4'>User Profile</h2>
      <div className='card shadow-sm mx-auto' style={{ maxWidth: '600px' }}>
        <div className='card-body text-center'>
          <img 
            src='https://static1.srcdn.com/wordpress/wp-content/uploads/2023/11/ken-kaneki-tokyo-ghoul-_1.jpg' 
            alt='User Avatar' 
            className='rounded mb-3 w-25' 
          />
          <h4 className='card-title'>test</h4>
          <p className='text-muted'>test@example.com</p>
          <hr />
          <h5>About Me</h5>
          <p>Hello! I am a passionate bidder and seller.</p>
          <hr />
          <h5>My Auctions</h5>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'>PS5 - Highest Bid: $800</li>
            <li className='list-group-item'>Artistic Painting - Highest Bid: $750</li>
            <li className='list-group-item'>Luxury Car Model - Highest Bid: $10,000</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
