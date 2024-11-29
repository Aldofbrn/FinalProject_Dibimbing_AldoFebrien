import React from 'react';
import { ImLocation2 } from 'react-icons/im';
import { BiSolidCategory } from 'react-icons/bi';
import { FaStar } from 'react-icons/fa';
import Slider from 'react-slick';
import axios from 'axios';
import { API_KEY } from '../../Pages/api/config';
import { BsFillEyeFill } from 'react-icons/bs';
import { toast, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { useState, useContext } from 'react';
import { getCookie } from 'cookies-next';
import { Link } from 'react-router-dom';

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="custom-arrow prev-arrow flex items-center justify-center bg-primary text-white rounded-full w-8 h-8 cursor-pointer absolute top-1/2 left-[-15px] z-10 transform -translate-y-1/2 sm:w-10 sm:h-10 sm:left-[-30px]"
  >
    &#10094; {/* Left Arrow Icon */}
  </div>
);

const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="custom-arrow next-arrow flex items-center justify-center bg-primary text-white rounded-full w-8 h-8 cursor-pointer absolute top-1/2 right-[-15px] z-10 transform -translate-y-1/2 sm:w-10 sm:h-10 sm:right-[-30px]"
  >
    &#10095; {/* Right Arrow Icon */}
  </div>
);

const Activities = ({ activities }) => {
  const token = getCookie('token');
  const role = getCookie('role');
  const { handleDataCart } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />, // Enable centering // Adjust padding for spacing
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          dots: false,
        },
      },
    ],
  };

  const handleLogin = () => {
    setShowModal(false);
    navigate('/login');
  };

  const handleContinueAsGuest = () => {
    setShowModal(false);
    console.log('Continuing as guest...');
  };

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
      <div className="py-8">
        <div className="container">
          <div className="flex flex-col justify-center items-center gap-2 my-4 text-center">
            <h1 className="text-2xl md:text-5xl font-bold text-black">
              Discover the Activities You’ve Always Wanted to Experience!
            </h1>
            <p className=" text-sm md:text-lg font-semibold text-gray-500 ">
              Explore a Curated Collection of Activities Tailored to Your
              Wanderlust – Find the Perfect Experience for Your Next Adventure!
            </p>

            <Link to="/activityList">
              <button className="px-2 py-2 rounded-xl font-semibold text-white bg-primary hover:scale-110 transition-all duration-300">
                Explore More
              </button>
            </Link>
          </div>
          <ul className="flex flex-col">
            <Slider {...settings}>
              {activities.map((activity) => (
                <li key={activity.id} className="px-1">
                  <div className="card w-full transition-transform duration-300 hover:translate-y-[-10px]">
                    <div className="relative w-full h-[200px] overflow-hidden">
                      <img
                        src={activity.imageUrls}
                        alt={activity.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5 flex flex-col gap-3">
                      {/* Badge */}
                      <div className="flex items-center gap-2">
                        <span className="badge flex items-center gap-1 text-black font-normal">
                          <BiSolidCategory />
                          {activity.category.name}
                        </span>
                        <span className="badge flex items-center gap-1 text-black">
                          <ImLocation2 /> {activity.city}
                        </span>
                      </div>
                      {/* Prduct Title */}
                      <h2 className="font-semibold text-2xl overflow-ellipsis overflow-hidden whitespace-nowrap">
                        {activity.title}
                      </h2>
                      {/* Product Price */}
                      <div>
                        <span className="text-xl font-bold">
                          Rp. {activity.price_discount.toLocaleString('id-ID')}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm line-through opacity-50">
                            Rp. {activity.price.toLocaleString('id-ID')}
                          </span>
                          {activity.price > activity.price_discount && (
                            <span className="text-xs font-semibold text-red-500 px-1.5 py-0.5 rounded-md border border-red-500">
                              {Math.round(
                                ((activity.price - activity.price_discount) /
                                  activity.price) *
                                  100
                              )}
                              % Off
                            </span>
                          )}
                        </div>
                      </div>
                      {/* Product Rating */}
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
                      {/* Product Action button */}
                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() => handleAddToCart(activity.id)}
                          className="bg-primary/80 text-xs md:text-lg  text-white hover:bg-primary px-6 py-2 rounded-md font-medium tracking-wider transition"
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
                </li>
              ))}
            </Slider>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Activities;
