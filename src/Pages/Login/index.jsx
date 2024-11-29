import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { API_KEY } from '../api/config';
import axios from 'axios';
import haikeiCircle from '../../assets/haikeiCircle.svg';
import { toast, Bounce } from 'react-toastify';
import { setCookie } from 'cookies-next';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [formLogin, setFormLogin] = useState({
    email: '',
    password: '',
  });

  const toggleIcon = () => {
    setOpen(!open);
  };
  const handleChange = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };
    axios
      .post(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login',
        formLogin,
        config
      )
      .then((res) => {
        toast.success('Login successfully', {
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
        setCookie('token', res.data.token);
        setCookie('role', res.data.data.role);
        setCookie('idUser', res.data.data.id);
        setTimeout(() => {
          if (res.data.data.role === 'admin') {
            navigate('/dashboard');
          } else {
            navigate('/');
          }
        }, 2000);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
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
      });
  };

  return (
    <>
      <section
        className="h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${haikeiCircle})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="w-4/5 md:w-1/2 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-20 bg-tertiary/80 relative grid grid-cols-1 md:grid-cols-2">
          <div className="w-full flex flex-col items-center justify-center my-4 text-center">
            <h1 className="text-4xl md:text-8xl font-[yellowtail]">Miles</h1>
            <div className="text-xs md:text-lg mt-2">
              <p>
                Step into a space where elegance meets purpose. Every detail is
                designed to inspire and elevate your journey. Let us be part of
                the moments that matter most to you.
              </p>
            </div>
            <p className="mt-4">
              Continue as a guest?{' '}
              <Link to="/">
                <span className="hover:text-white transition-all duration-300">
                  Click here
                </span>
              </Link>
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl text-black font-bold text-center mb-6">
              Login
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="relative my-8">
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  value={formLogin.email}
                  className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-400 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor=""
                  className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 -top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-6 "
                >
                  Your Email
                </label>
              </div>
              <div className="relative my-8 group">
                <input
                  type={open === false ? 'password' : 'text'}
                  name="password"
                  onChange={handleChange}
                  value={formLogin.password}
                  className="block w-72 py-2.3 text-black px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-400 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor=""
                  className="absolute text-sm text-black duration-300 transform -translate-y-4 scale-75 -top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-6 "
                >
                  Your Password
                </label>
                <div className="absolute right-2 top-3">
                  {open === false ? (
                    <AiFillEye onClick={toggleIcon} />
                  ) : (
                    <AiFillEyeInvisible onClick={toggleIcon} />
                  )}
                </div>
              </div>

              <button className="px-2 py-1 bg-fourth/60 rounded-xl hover:bg-fourth transition-all duration-300 w-full font-bold">
                Login
              </button>
              <div className="text-center  mt-3">
                <span>
                  New Here?{' '}
                  <Link to="/Register">
                    <span className="hover:text-white transition-all duration-300">
                      Create An Account
                    </span>
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
