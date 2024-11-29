import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { API_KEY } from '../api/config';
import { BiSolidCategory } from 'react-icons/bi';
import { FaStar } from 'react-icons/fa';
import { BsFillEyeFill } from 'react-icons/bs';
import { ImLocation2 } from 'react-icons/im';
import { SlideUp } from '../../utilities/animation';
import { motion } from 'framer-motion';
import haikeiWave from '../../assets/haikeiWave.svg';
import { Link } from 'react-router-dom';
import { getCookie } from 'cookies-next';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';

const ActivitiesList = () => {
  const token = getCookie('token');
  const role = getCookie('role');
  const { handleDataCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]); // Store all activities
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [showModal, setShowModal] = useState(false);
  const [textColor, setTextColor] = useState('text-black');
  const colors = [
    'text-primary',
    'text-tertiary',
    'text-black',
    'text-secondary',
  ];

  useEffect(() => {
    // Set up the interval to change the color every 3 seconds
    const interval = setInterval(() => {
      setTextColor((prevColor) => {
        // Get the next color in the array
        const currentIndex = colors.indexOf(prevColor);
        const nextIndex = (currentIndex + 1) % colors.length;
        return colors[nextIndex];
      });
    }, 3000); // Change every 3 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const getCategories = () => {
    axios
      .get(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories',
        {
          // Replace with the actual API URL for categories
          headers: {
            apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          },
        }
      )
      .then((res) => {
        setCategories(res.data.data); // Assuming the response has categories data
      })
      .catch((err) => console.error('Error fetching categories:', err));
  };

  // Fetch activities
  const getActivityList = (categoryId = '') => {
    const url = categoryId
      ? `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities-by-category/${categoryId}`
      : `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities`; // Default fetch all activities if no category

    axios
      .get(url, {
        headers: {
          apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
        },
      })
      .then((res) => {
        setActivities(res.data.data);
      })
      .catch((err) => console.error('Error fetching activities:', err));
  };

  useEffect(() => {
    getCategories();
    getActivityList();
  }, []);

  useEffect(() => {
    getActivityList(selectedCategory); // Fetch activities based on selected category
  }, [selectedCategory]);

  useEffect(() => {
    // Scroll to top when currentPage changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth <= 768) {
        setItemsPerPage(2); // Mobile view
      } else {
        setItemsPerPage(6); // Desktop view
      }
    };

    // Set initial value
    updateItemsPerPage();

    // Add event listener for screen resize
    window.addEventListener('resize', updateItemsPerPage);

    // Cleanup
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // Calculate the data for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = activities.slice(indexOfFirstItem, indexOfLastItem);

  // Change the current page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate page numbers based on the data length
  const totalPages = Math.ceil(activities.length / itemsPerPage);

  // Generate the page numbers to be displayed (responsively)
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxButtons = window.innerWidth <= 768 ? 3 : 5; // Max buttons for mobile vs desktop
    const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxButtons - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis if needed
    if (startPage > 1) pageNumbers.unshift('...');
    if (endPage < totalPages) pageNumbers.push('...');

    return pageNumbers;
  };

  const handleLogin = () => {
    setShowModal(false);
    navigate('/login');
  };

  const handleContinueAsGuest = () => {
    setShowModal(false);
    console.log('Continuing as guest...');
  };

  //handle add to cart
  const handleAddToCart = (id) => {
    if (token && role === 'admin') {
      toast.error('You are an Admin. You are not allowed to add to cart', {
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
      return;
    }
    if (!token) {
      setShowModal(true); // Show the modal if there's no token.
      return;
    }
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };

    const payload = {
      activityId: id,
    };

    axios
      .post(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/add-cart',
        payload,
        config
      )
      .then((res) => {
        toast.success('Add to cart successfully', {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        handleDataCart();
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          aria-hidden="true"
        >
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-lg font-bold mb-4">Login Required</h2>
            <p className="mb-6">
              You need to log in to perform this action. Would you like to log
              in now or continue as a guest?
            </p>
            <div className="flex justify-between">
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Go to Login
              </button>
              <button
                onClick={handleContinueAsGuest}
                className="px-4 py-2 bg-gray-300 text-black rounded-md"
              >
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
      )}
      <section
        style={{
          backgroundImage: `url(${haikeiWave})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Navbar />
        <div className="container min-h-screen h-full ">
          <div className="mt-20 py-8">
            <div className="py-4">
              <h1
                className={`font-bold text-6xl mb-3 ${textColor} transition-colors duration-1000`}
              >
                Explore our Activities
              </h1>
              <p>
                From thrilling outdoor adventures like zip-lining through
                forests to relaxing beachside retreats, travel activities cater
                to every kind of traveler. Engaging in these experiences not
                only creates lasting memories but also allows you to connect
                with the world in meaningful ways.
              </p>
            </div>
            {/* Category Filter */}
            <div className="mb-6">
              <label htmlFor="category" className="mr-2 text-lg">
                Filter by Category:
              </label>
              <select
                id="category"
                className="p-2 border rounded-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              {/* Display activities for the current page */}
              {activities.length === 0 ? (
                <div className="text-center text-2xl md:text-4xl flex justify-center">
                  <p className="px-2 py-4 bg-fourth rounded-lg">
                    No activities available for this category.
                  </p>
                </div>
              ) : (
                <ul className="grid md:grid-cols-3 gap-4">
                  {currentItems.map((activity, index) => (
                    <motion.li
                      variants={SlideUp(index * 0.2)}
                      initial="hidden"
                      animate="visible"
                      key={activity.id}
                      className="px-1"
                    >
                      <div className="card w-full transition-transform duration-300 hover:translate-y-[-10px]">
                        <div className="relative w-full h-[200px] overflow-hidden">
                          <img
                            src={activity.imageUrls}
                            alt={activity.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-5 flex flex-col gap-3">
                          <div className="flex items-center gap-2">
                            <span className="badge flex items-center gap-1 text-black font-normal">
                              <BiSolidCategory />
                              {activity.category.name}
                            </span>
                            <span className="badge flex items-center gap-1 text-black">
                              <ImLocation2 /> {activity.city}
                            </span>
                          </div>
                          <h2 className="font-semibold text-2xl overflow-ellipsis overflow-hidden whitespace-nowrap">
                            {activity.title}
                          </h2>
                          <div>
                            <span className="text-xl font-bold">
                              Rp.{' '}
                              {activity.price_discount.toLocaleString('id-ID')}
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm line-through opacity-50">
                                Rp. {activity.price.toLocaleString('id-ID')}
                              </span>
                              {activity.price > activity.price_discount && (
                                <span className="text-xs font-semibold text-red-500 px-1.5 py-0.5 rounded-md border border-red-500">
                                  {Math.round(
                                    ((activity.price -
                                      activity.price_discount) /
                                      activity.price) *
                                      100
                                  )}
                                  % Off
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="flex items-center mt-1 gap-1">
                            <FaStar className="text-yellow-300" />
                            <span className="text-sm text-gray-500">
                              {activity.rating}
                            </span>
                            <span className="text-sm text-gray-500">
                              ({activity.total_reviews} reviews)
                            </span>
                          </span>
                          <span>
                            <hr />
                          </span>
                          <div className="mt-2 flex gap-2">
                            <button
                              className="bg-primary/80 text-xs md:text-lg  text-white hover:bg-primary px-6 py-2 rounded-md font-medium tracking-wider transition"
                              onClick={() => handleAddToCart(activity.id)}
                            >
                              Add to cart
                            </button>
                            <Link to={`/activityList/${activity.id}`}>
                              <button className="bg-tertiary/80 text-xs md:text-lg text-white hover:bg-tertiary px-6 py-2 rounded-md font-medium tracking-wider transition flex items-center gap-2">
                                <BsFillEyeFill /> View activity
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Pagination using Flowbite */}
            <nav
              aria-label="Page navigation example"
              className="mt-4 flex items-center justify-center"
            >
              <ul className="inline-flex -space-x-px text-sm">
                <li>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`px-3 h-8 text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${
                      currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                  >
                    Previous
                  </button>
                </li>
                {getPageNumbers().map((number, index) => (
                  <li key={index}>
                    {number === '...' ? (
                      <button
                        onClick={
                          () =>
                            index === 0
                              ? setCurrentPage(1) // Left ellipsis goes to first page
                              : setCurrentPage(totalPages) // Right ellipsis goes to last page
                        }
                        className="px-3 h-8 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                      >
                        ...
                      </button>
                    ) : (
                      <button
                        onClick={() => setCurrentPage(number)}
                        className={`px-3 h-8 border ${
                          currentPage === number
                            ? 'text-gray-500 bg-fourth/80 border-gray-300 hover:bg-fourth hover:text-gray-700'
                            : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                        }`}
                      >
                        {number}
                      </button>
                    )}
                  </li>
                ))}
                <li>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-3 h-8 text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${
                      currentPage === totalPages
                        ? 'cursor-not-allowed opacity-50'
                        : ''
                    }`}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
};

export default ActivitiesList;
