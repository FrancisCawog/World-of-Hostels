// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import logo from 'path/to/your/logo'; // Import your logo
// import userIcon from 'path/to/your/userIcon'; // Import your user icon
// import './Navigation.css';

// function Navigation() {
//   const location = useLocation();
//   const sessionUser = null; // Replace null with your session user logic

//   const handleLogout = () => {
//     // Logic for handling logout
//   };

//   return (
//     <div className="container">
//       <header>
//         <div className="left-content">
//           <img src={logo} style={{ width: '50px' }} alt="Logo" />
//           <p className="WOF">World of Hostels</p>
//         </div>
        
//         <div className="circles">
//           {location.pathname === '/' && (
//             <>
//               <Link to="/login">
//                 <div className="circle">
//                   <img src={userIcon} alt="User" />
//                 </div>
//               </Link>
//               <div className="circle"></div>
//             </>
//           )}
//         </div>
//       </header>

//       {sessionUser && (
//         <button onClick={handleLogout}>Logout</button>
//       )}
//     </div>
//   );
// }

// export default Navigation;
