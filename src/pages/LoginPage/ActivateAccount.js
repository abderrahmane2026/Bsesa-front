// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function ActivateAccount() {
//   const { token } = useParams(); // الحصول على التوكن من رابط التفعيل
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const activateAccount = async () => {
//       try {
//         const response = await axios.get(`https://develop-yourself.onrender.com/api/user/verify/${token}`);
//         setMessage(response.data.message);

//         // إعادة توجيه إلى صفحة تسجيل الدخول بعد 3 ثوانٍ
//         setTimeout(() => {
//           navigate('/Login');
//         }, 3000);
//       } catch (err) {
//         setError(err.response ? err.response.data.message : "Activation failed.");
//       }
//     };

//     activateAccount();
//   }, [token, navigate]);

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6 text-center">
//           {error ? (
//             <div className="alert alert-danger">
//               <h4>Error</h4>
//               <p>{error}</p>
//             </div>
//           ) : (
//             <div className="alert alert-success">
//               <h4>Account Activation</h4>
//               <p>{message || "Activating your account, please wait..."}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
