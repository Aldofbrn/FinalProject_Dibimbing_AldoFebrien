import React from 'react';
import haikeiFooter from '../../assets/haikeiFooter.svg';
import { TiLocation } from 'react-icons/ti';
import { MdEmail } from 'react-icons/md';
import { FaPhone } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Footer = () => {
  return (
    <>
      <section
        className="bg-[#001220] py-8"
        // style={{
        //   backgroundImage: `url(${haikeiFooter})`,
        //   backgroundSize: 'cover',
        //   backgroundPosition: 'center',
        // }}
      >
        <div className="container text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-4">
            {/* Brand Section */}
            <div className="flex flex-col justify-start pr-20">
              <h1 className="text-5xl  font-[yellowtail]">Miles</h1>
              <p className="text-sm mt-3">
                Step into a space where elegance meets purpose. Every detail is
                designed to inspire and elevate your journey. Let us be part of
                the moments that matter most to you.
              </p>
            </div>
            {/* Navigation */}
            <div>
              <h1 className="text-4xl font-semibold">Navigation</h1>
              <ul>
                <li className="mt-2 cursor-pointer hover:text-tertiary">
                  <a href="/">Home</a>
                </li>
                <li className="mt-2 cursor-pointer hover:text-tertiary">
                  <Link to="/activityList">Activities</Link>
                </li>

                <li className="mt-2 cursor-pointer hover:text-tertiary">
                  <Link to="/promoList">Promos</Link>
                </li>
              </ul>
            </div>
            {/* Address */}
            <div className="mb-4">
              <h1 className="text-4xl font-semibold">Address</h1>
              <ul>
                <li className="flex items-center gap-2 mt-2">
                  <TiLocation className="w-6 h-6" /> 123 Mile Lane, City of
                  Adventures, Country 12345
                </li>
                <li className="flex items-center gap-2 mt-2">
                  <MdEmail className="w-6 h-6" /> contact@milesapp.com
                </li>
                <li className="flex items-center gap-2 mt-2">
                  <FaPhone className="w-6 h-6" /> +1 (555) 123-4567
                </li>
                <li className="flex gap-3 mt-4">
                  {' '}
                  <a
                    href="https://www.linkedin.com/in/aldofebrien/"
                    target="blank"
                  >
                    <FaLinkedin className="w-6 h-6 hover:text-tertiary transition-all duration-300" />{' '}
                  </a>
                  <a href="https://github.com/Aldofbrn" target="blank">
                    <FaGithub className="w-6 h-6 hover:text-tertiary transition-all duration-300" />{' '}
                  </a>
                  <a href="https://web.whatsapp.com/" target="blank">
                    <IoLogoWhatsapp className="w-6 h-6 hover:text-tertiary transition-all duration-300" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr className="bg-primary border border-8 border-primary my-4" />
          <span className="block text-sm text-gray-500 text-center dark:text-gray-400">
            © 2023{' '}
            <a href="https://flowbite.com/" className="hover:underline">
              Flowbite™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </section>
    </>
  );
};

export default Footer;
