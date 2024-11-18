import { useEffect, useState } from 'react';
import logo from "../../assets/logo/BSESA.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

export default function NavBar() {
  const [state, setState] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Replace javascript:void(0) paths with your paths
  const navigation = [
   
    { title: "Home", to: "/" },
    { title: "AboutUs", to: "/About" },
    { title: "Courses", to: "/courses" },
    { title: "Blogs", to: "/Blogs" },
    { title: "Conferences", to: "/ConferencesPage" },
    { title: "Contact", to: "/Contact" },
    // { title: "News", to: "/News" },
  
    // { title: "Service", to: "/blogs" },
   
  ];

  useEffect(() => {
    // Check for user data in localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Close menu on click outside
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setState(false);
      if (!target.closest(".user-avatar")) setMenuOpen(false);
    };
  }, []);

  return (
    <div className='Navbar'>
      <nav className={`pt-4 bg-white md:text-sm ${state ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0" : ""}`}>
        <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
          <div className="logo flex items-center justify-between md:block">
            <Link to="/">
              <img
                src={logo}
                width={90}
                height={40}
                alt="logo"
              />
            </Link>
            <div className="md:hidden">
              <button className="menu-btn text-red-400 hover:text-red-600"
                onClick={() => setState(!state)}
              >
                {
                  state ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                  )
                }
              </button>
            </div>
          </div>
          <div className={`flex-1 items-center mt-8 md:mt-0 md:flex ${state ? 'block' : 'hidden'} `}>
            <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
              {
                navigation.map((item, idx) => {
                  return (
                    <li key={idx} className="text-red-600 hover:text-red-800 text-lg no-underline">
                      <Link to={item.to} className="no-underline">
                        {item.title}
                      </Link>
                    </li>
                  )
                })
              }
            </ul>
            <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
              {user ? (
                <div className="relative">
                  <button className="user-avatar flex items-center gap-2" onClick={() => setMenuOpen(!menuOpen)}>
                    {/* <img src={<FaRegUserCircle/>} alt="avatar" className="w-8 h-8 rounded-full" /> */}
                    <sapn className="user-icon w-8 h-8 rounded-full" ><FaRegUserCircle/></sapn>
                    <span className="text-black-600 text-lg">{user.firstName}  {user.lastName}</span>
                  </button>
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10">
                      <Link to="/account" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Account </Link>
                      <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"> Settings</Link>
                      <Link to="/Newblog" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">New Blog </Link>
                      <Link to="/create-category" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">create-category </Link>
                      <Link to="/create-video" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">New video </Link>
                      <Link to="/NewCours" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">New Course </Link>
                      <Link to="/NewConference" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"> NewConference </Link>
                      <Link to="/NewQuiz" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">NewQuiz</Link>
                      <Link to="/certificates" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">My Certificates</Link>
                      <button
                        onClick={() => {
                          localStorage.removeItem("user");
                          setUser(null);
                          setMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-100 rounded"
                      >
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/Login" className="Log-button block text-red-500 hover:text-red-800 text-lg no-underline rounded-md p-2">
                    Log in
                  </Link>
                  <Link to="/Signup" className="sig-button flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-full md:inline-flex">
                    Sign in
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
