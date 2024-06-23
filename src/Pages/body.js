// * This page is Landing Page before logging in
// import React from 'react';
// import { Link} from 'react-router-dom'

// const Body = () => {
//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-8 offset-md-2">
//           <h1 className="text-center mt-5">Welcome to GateKeeper</h1>
//           <h3 className="text-center mt-3">Your solution for access management</h3>
//           <p className="text-center mt-4">Manage access to your premises efficiently with our NFC-based solution.</p>
//           <div className="text-center mt-5">
//           <Link to="/login" ><button className="btn btn-dark btn-lg me-3">Login</button></Link>
//             <Link to="/signup" ><button className="btn btn-outline-dark btn-lg">Signup</button></Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Body;

import React from 'react';
import { Link } from 'react-router-dom';
import '../css/body.css';  // Custom CSS for the Body component

const Body = () => {
  return (
    <div className="body-container">
      <div className="hero-section">
        <div className="overlay">
          <div className="content">
            <h1>Welcome to GateKeeper</h1>
            <h3>Your solution for access management</h3>
            <p>Manage access to your premises efficiently with our NFC-based solution.</p>
            <div className="button-group">
              <Link to="/login">
                <button className="btn btn-dark btn-lg me-3">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-outline-dark btn-lg">Signup</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;

