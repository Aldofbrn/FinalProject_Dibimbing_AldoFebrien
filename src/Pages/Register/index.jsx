import React, { useState } from 'react';
import { Label, Select } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
// import { API_KEY, BASE_URL } from '../api/config';
import axios from 'axios';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import haikeiBlob2 from '../../assets/haikeiBlob2.svg';
// import { form } from 'motion/react-client';

const Register = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [formRegister, setFormRegister] = useState({
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
    role: '',
    profilePictureUrl: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    console.log(e);
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
  };

  const toggleIcon1 = () => {
    setOpen1(!open1);
  };
  const toggleIcon2 = () => {
    setOpen2(!open2);
  };
  const handleSubmitClick = async (e) => {
    e.preventDefault();

    if (formRegister.password !== formRegister.passwordRepeat) {
      setError('Passwords do not match');
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }

    if (
      !formRegister.email ||
      !formRegister.name ||
      !formRegister.password ||
      !formRegister.passwordRepeat ||
      !formRegister.phoneNumber ||
      !formRegister.role
    ) {
      toast.error('All fields are required', {
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

    try {
      const res = await axios.post(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/register',
        formRegister,
        {
          headers: {
            apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          },
        }
      );
      console.log(res);
      toast.success('Register successfully', {
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
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.log('API Error:', err.response); // Check for response data
      toast.error(err.response?.data?.message || 'An error occurred', {
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
    }
  };

  return (
    <>
      <div
        className="lg:h-screen flex items-center "
        style={{
          backgroundImage: `url(${haikeiBlob2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="w-4/5 md:w-8/12 rounded-xl mx-auto shadow-2xl border border-gray-500 overflow-hidden flex flex-col md:flex-row my-6">
          <div
            className="w-full md:w-1/2 bg-red-300/40 backdrop-blur-lg flex flex-col items-center justify-center text-center px-4 py-16"
            style={{
              backgroundImage: 'url("/login-img/cloud.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <h1 className="text-4xl md:text-8xl font-[yellowtail]">Miles</h1>
            <div className="text-xs md:text-lg mt-2">
              <p>
                Step into a space where elegance meets purpose. Every detail is
                designed to inspire and elevate your journey. Let us be part of
                the moments that matter most to you.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 bg-white px-8 py-16">
            <h2 className="text-3xl mb-2"> Register</h2>
            <p className="mb-4">Create your account.</p>

            <form className="max-w-md mx-auto" onSubmit={handleSubmitClick}>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="email"
                  value={formRegister.email}
                  onChange={handleChange}
                  name="email"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Your Email
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  value={formRegister.name}
                  onChange={handleChange}
                  name="name"
                  id="floating_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Your Name
                </label>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type={open1 === false ? 'password' : 'text'}
                    value={formRegister.password}
                    onChange={handleChange}
                    name="password"
                    id="floating_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="floating_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Password
                  </label>
                  <div className="absolute right-2 top-3">
                    {open1 === false ? (
                      <AiFillEye onClick={toggleIcon1} />
                    ) : (
                      <AiFillEyeInvisible onClick={toggleIcon1} />
                    )}
                  </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type={open2 === false ? 'password' : 'text'}
                    value={formRegister.passwordRepeat}
                    onChange={handleChange}
                    name="passwordRepeat"
                    id="floating_repeat_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="floating_repeat_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Confirm password
                  </label>
                  <div className="absolute right-2 top-3">
                    {open2 === false ? (
                      <AiFillEye onClick={toggleIcon2} />
                    ) : (
                      <AiFillEyeInvisible onClick={toggleIcon2} />
                    )}
                  </div>
                </div>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="tel"
                  value={formRegister.phoneNumber}
                  onChange={handleChange}
                  name="phoneNumber"
                  id="floating_phone"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_phone"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Phone number
                </label>
              </div>

              <div className="mb-2 block">
                <Label htmlFor="countries" value="Select your role" />
              </div>
              <Select
                className="mb-4 transition-all ease-in-out duration-300"
                onChange={handleChange}
                name="role"
                value={formRegister.role}
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Select>
              <div className="w-full">
                <button
                  type="submit"
                  className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all duration-300"
                >
                  Register new account
                </button>
              </div>
            </form>
            <div className="mt-4 flex flex-col text-center t0xt-md font-light">
              <p>Visit App without Register? </p>
              <p className="hover:text-primary transition-all duration-300">
                {' '}
                <Link to="/">Click here</Link>
              </p>
              <div className="relative flex items-center my-4">
                <span className="flex-grow border-t border-gray-400"></span>
                <span className="mx-2 text-gray-600">Or</span>
                <span className="flex-grow border-t border-gray-400"></span>
              </div>
              <p>Already have account?</p>
              <Link to="/login">
                <button className="px-2 py-3 bg-tertiary/70 hover:bg-tertiary transition-all duration-300 rounded-xl font-bold text-white hover:text-black w-full">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
