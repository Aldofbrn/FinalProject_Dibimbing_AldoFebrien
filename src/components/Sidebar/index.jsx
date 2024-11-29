import { useContext, useEffect, useState, useRef } from 'react';
import { MdDashboard } from 'react-icons/md';
import { PiUsersFill } from 'react-icons/pi';
import { IoMdImage } from 'react-icons/io';
import { PiCompassRoseBold } from 'react-icons/pi';
import { BiSolidDiscount } from 'react-icons/bi';
import { FaPersonWalkingLuggage } from 'react-icons/fa6';
import { MdCategory } from 'react-icons/md';
import { GrTransaction } from 'react-icons/gr';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteCookie } from 'cookies-next';
import { Link } from 'react-router-dom';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

const Sidebar = () => {
  const [open, setOpen] = useState(false); // Sidebar open state (default closed)
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown visibility
  const navigate = useNavigate();
  const { user, handleUser } = useContext(UserContext);
  const [mounted, setMounted] = useState(false);

  console.log(user);

  const dropdownRef = useRef(null); // Reference for dropdown menu
  const avatarRef = useRef(null); // Reference for the avatar click area

  const handleLogout = () => {
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
      theme: 'dark',
      transition: Bounce,
    });
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setMounted(true);
    handleUser();
  }, []);

  const userAvatar = null; // Set to null or empty string to simulate no image
  const userName = 'User Name'; // User's name
  const Menus = [
    { title: 'Dashboard', src: <MdDashboard />, link: '/dashboard' },
    { title: 'All Users', src: <PiUsersFill />, link: '/dashboard/users' },
    { title: 'Banner', src: <IoMdImage />, link: '/dashboard/banner' },
    { title: 'Promo', src: <BiSolidDiscount />, link: '/dashboard/promo' },
    {
      title: 'Activity',
      src: <FaPersonWalkingLuggage />,
      link: '/dashboard/activity',
    },
    { title: 'Category', src: <MdCategory />, link: '/dashboard/category' },
    {
      title: 'Transaction',
      src: <GrTransaction />,
      link: '/dashboard/transaction',
    },
  ];

  return (
    <div className="relative">
      {/* Sidebar overlay */}
      {open && <div className="fixed inset-0 bg-black opacity-50 z-10"></div>}

      {/* Sidebar container */}
      <div
        className={`${
          open ? 'left-0' : '-left-72' // Sidebar slides in from left when open
        } fixed top-0 bg-primary h-screen w-72 p-5 pt-8 duration-300 z-20`}
      >
        {/* Arrow button to toggle sidebar */}
        <p
          className={`absolute cursor-pointer -right-8 top-9 text-xl border-primary border-4 rounded-full ${
            !open && 'rotate-180'
          }`}
          onClick={() => setOpen(!open)}
        >
          {' '}
          <FaArrowAltCircleLeft />
        </p>

        {/* Logo and Title */}
        <div className="flex gap-x-4 items-center pl-2.5">
          <p
            className={`cursor-pointer text-white text-xl duration-500 text-center ${
              open && 'rotate-[360deg]'
            }`}
          >
            <PiCompassRoseBold />
          </p>
          <h1
            className={`text-white origin-left font-medium text-3xl duration-200 font-[yellowtail] ${
              !open && 'scale-0'
            }`}
          >
            Miles
          </h1>
        </div>

        {/* Menu Items */}
        <ul className="pt-6 flex-1">
          {Menus.map((Menu, index) => (
            <Link key={index} to={Menu.link}>
              <li className="flex items-center p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm gap-x-4 hover:bg-blue-800 transition-all duration-300">
                <span className="flex items-center justify-center text-2xl h-8 w-8">
                  {Menu.src}
                </span>
                <span
                  className={`${!open && 'hidden'} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>

        {/* Avatar and Name Section */}
        <div
          ref={avatarRef}
          className="flex items-center gap-x-3 cursor-pointer mt-96 p-3 bg-gray-800 rounded-md"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {userAvatar ? (
            <img
              src={user.profilePictureUrl}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <FaUser className="w-10 h-10 text-white" />
          )}
          <span className={`${!open && 'hidden'} text-white`}>{user.name}</span>
        </div>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute left-12 -mt-48 bg-white rounded-md shadow-md w-48 text-sm p-2"
            style={{
              top: avatarRef.current
                ? avatarRef.current.offsetTop + avatarRef.current.offsetHeight
                : 'auto',
            }}
          >
            <ul className="text-gray-700">
              <Link to="/">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Go to Home
                </li>
              </Link>
              <Link to="/user/UserProfile">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  My Profile
                </li>
              </Link>
              <li
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Responsive Sidebar Button */}
      {/* <div className={`lg:hidden absolute top-4 right-4`}>
        <button
          className="bg-primary p-2 rounded-full"
          onClick={() => setOpen(!open)}
        >
          <span className="text-white">{open ? 'Close' : 'Open'}</span>
        </button>
      </div> */}
    </div>
  );
};

export default Sidebar;
