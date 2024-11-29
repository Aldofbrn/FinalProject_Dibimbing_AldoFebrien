import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_KEY } from '../api/config';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { FaCity } from 'react-icons/fa';
import { FaMapLocation } from 'react-icons/fa6';
import Banner from '../../components/Banner';
import haikeiBlob2 from '../../assets/haikeiBlob2.svg';

const ActivityDetail = () => {
  const token = getCookie('token');
  const role = getCookie('role');
  const navigate = useNavigate();
  const [dataActivity, setDataActivity] = useState({});
  const { id } = useParams();

  const description = [
    { name: 'Description', ket: dataActivity.description },
    { name: 'Facilities', ket: dataActivity.facilities },
    { name: 'Address', ket: dataActivity.address },
    // { name: 'Tour Map', ket: dataActivity.location_maps },
  ];

  const handleDataActivity = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    axios
      .get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${id}`,
        config
      )
      .then((res) => {
        setDataActivity(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleAddToCart = () => {
    if (token && role === 'admin') {
      toast.error('Admin are limited to access this feature', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      return;
    }
    if (!token) {
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return toast.warning('Please login to access this feature', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }

    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };

    const payload = {
      activityId: dataActivity.id,
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
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    id && handleDataActivity();
  }, [id]);

  const location = {
    lat: parseFloat(dataActivity.latitude || 0), // Ensure this is a valid number from your API
    lng: parseFloat(dataActivity.longitude || 0), // Ensure this is a valid number from your API
  };

  return (
    <section
      style={{
        backgroundImage: `url(${haikeiBlob2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <Navbar />
      <div className="container mx-auto px-6 py-36">
        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side - Activity Image and Details */}
          <div className="flex flex-col items-center">
            <img
              src={dataActivity.imageUrls}
              alt={dataActivity.title}
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Right Side - Activity Title, Description, Price and Cart Button */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {dataActivity.title}
            </h1>
            <div className="flex gap-4">
              <p className="text-gray-500 text-xs flex items-center gap-2">
                {' '}
                <FaMapLocation />
                {dataActivity.province}
              </p>
              <p className="text-gray-500 text-xs flex items-center gap-2">
                {' '}
                <FaCity />
                {dataActivity.city}
              </p>
            </div>

            <p className="text-gray-700 mb-4">{dataActivity.description}</p>
            <p className="font-semibold text-lg text-gray-600">
              Rating: {dataActivity.rating}
            </p>
            <p className="text-gray-500 text-sm">
              Total Reviews: {dataActivity.total_reviews}
            </p>

            {/* Price & Discount */}
            <div className="mt-6">
              <p className="text-xl text-gray-800 font-bold">
                ${dataActivity.price_discount || dataActivity.price}
              </p>
              {dataActivity.price_discount && (
                <p className="text-gray-500 line-through">
                  ${dataActivity.price}
                </p>
              )}
            </div>

            {/* Add to Cart Button */}
            <div className="mt-6">
              <button
                onClick={handleAddToCart}
                className="w-full py-3 px-6 text-white bg-orange-600 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Description Details */}
        <div className="mt-12">
          {description.map((item, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-gray-600 mt-2">{item.ket}</p>
            </div>
          ))}
        </div>

        {/* Tour Map Section */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-800">Tour Map</h3>
          <div className="w-full h-80 mt-4 rounded-lg shadow-lg">
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <GoogleMap
                mapContainerStyle={{ height: '100%', width: '100%' }}
                center={location}
                zoom={14}
              >
                <Marker position={location} />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
      <Banner />
      <Footer />
    </section>
  );
};

export default ActivityDetail;
