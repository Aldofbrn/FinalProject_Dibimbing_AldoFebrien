import React from 'react';
import { IoCart } from 'react-icons/io5';
import { RiPinDistanceFill } from 'react-icons/ri';
import { deleteCookie, getCookie } from 'cookies-next';
import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../Context/CartContext';
import { UserContext } from '../../Context/UserContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoPersonCircle } from 'react-icons/io5';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { dataCart, handleDataCart } = useContext(CartContext);
  const { user, handleUser } = useContext(UserContext);

  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const token = getCookie('token');

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleCartClick = () => {
    if (menuOpen && window.innerWidth < 768) {
      setMenuOpen(false); // Collapse the menu on cart click (mobile view)
    }
  };

  const handleLogout = (id) => {
    deleteCookie('token');
    deleteCookie('role');
    deleteCookie('idUser');
    toast.success('Logout successfully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  useEffect(() => {
    setMounted(true); // Only run on the client-side
    handleUser();
  }, []);

  useEffect(() => {
    handleDataCart();
  }, [dataCart.length]);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen); // Toggle the menu visibility
  };

  // Prevent rendering before mount to avoid SSR issues

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between px-2 mx-auto py-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <div className="text-3xl flex items-center font-semibold gap-2 text-gray-700">
              <RiPinDistanceFill />
              <p className="font-[yellowtail]">Miles</p>
            </div>
          </Link>

          {/* Right-side Buttons */}
          <div className="flex flex-row md:order-2 space-x-3 rtl:space-x-reverse">
            {/* If user is logged in */}
            {token ? (
              <div className="flex items-center space-x-3">
                {/* Cart Button (Only shown if user is not admin) */}
                {user.role !== 'admin' && (
                  <Link to="/user/UserCart">
                    <button
                      onClick={handleCartClick}
                      className="text-2xl text-gray-600 hover:bg-orange-500 hover:text-white w-10 h-10 duration-200 flex items-center justify-center relative rounded-md"
                    >
                      <div className="absolute flex items-center justify-center w-5 text-xs text-gray-600 rounded-full -top-[2px] -right-1 aspect-square">
                        {dataCart.length}
                      </div>
                      <IoCart />
                    </button>
                  </Link>
                )}

                <div className="relative">
                  {/* Button to open dropdown */}
                  <button
                    id="dropdownUserAvatarButton"
                    onClick={toggleDropdown}
                    className="flex text-sm bg-gray-800 rounded-full md:me-0 hover:bg-orange-500"
                    type="button"
                  >
                    <span className="sr-only">Open user menu</span>
                    {/* Check if pictureSrc exists, if not use the IoPersonCircle icon */}
                    {user.profilePictureUrl ? (
                      <img
                        className="w-8 h-8 rounded-full"
                        src={user.profilePictureUrl}
                        alt="user photo"
                      />
                    ) : (
                      <IoPersonCircle className="w-8 h-8 text-white" />
                    )}
                  </button>

                  {/* Dropdown menu */}
                  <div
                    id="dropdownAvatar"
                    className={`z-10 ${
                      isDropdownOpen ? 'block' : 'hidden'
                    } absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
                  >
                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      <div>{user.name}</div>
                      <div className="font-medium truncate">{user.email}</div>
                    </div>
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownUserAvatarButton"
                    >
                      {/* Show Dashboard if the user is admin */}
                      {user.role === 'admin' ? (
                        <>
                          <li>
                            <Link to="/dashboard">
                              <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                Dashboard
                              </a>
                            </Link>
                          </li>
                          <li>
                            <Link to="/user/UserProfile">
                              <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                My Profile
                              </a>
                            </Link>
                          </li>
                        </>
                      ) : (
                        // Show "My Profile" and "My Transaction" if the user is a regular user
                        <>
                          <li>
                            <Link to="/user/UserProfile">
                              <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                My Profile
                              </a>
                            </Link>
                          </li>
                          <li>
                            <Link to="/user/UserTransaction">
                              <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                My Transaction
                              </a>
                            </Link>
                          </li>
                        </>
                      )}
                    </ul>
                    <div className="py-2">
                      <a
                        onClick={() => handleLogout(user.id)}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-500 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white hover:font-bold transition duration-300"
                      >
                        Log Out
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // If user is not logged in, show the Login button
              <Link to="/login">
                <button className="hover:bg-orange-500 font-semibold hover:text-white rounded-md border-2 border-orange-400 px-4 py-2 duration-200">
                  Login
                </button>
              </Link>
            )}

            {/* Hamburger menu button for mobile */}
            <button
              onClick={handleMenuToggle}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          {/* Collapsible Menu */}
          <div
            className={`${
              menuOpen ? 'block' : 'hidden'
            } items-center justify-between w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li className="group relative">
                <Link
                  to="/"
                  className="block py-2 px-3 text-black rounded md:bg-transparent md:hover:text-orange-500 hover:bg-gray-100 md:hover:bg-transparent dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page"
                >
                  Home
                </Link>
                {/* Underline Animation */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </li>

              <li className="group relative">
                <Link
                  to="/activityList"
                  className="block py-2 px-3 text-black rounded md:bg-transparent md:hover:text-orange-500 hover:bg-gray-100 md:hover:bg-transparent dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Activities
                </Link>
                {/* Underline Animation */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </li>

              <li className="group relative">
                <Link
                  to="/promoList"
                  className="block py-2 px-3 text-black rounded md:bg-transparent md:hover:text-orange-500 hover:bg-gray-100 md:hover:bg-transparent dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Promos
                </Link>
                {/* Underline Animation */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
