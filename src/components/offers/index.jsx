import React from 'react';
import { ImAirplane } from 'react-icons/im';
import { FaCalendarCheck } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa';
import { motion } from 'motion/react';
import { SlideLeft } from '../../utilities/animation';

const offerData = [
  {
    id: 1,
    title: 'Exclusive Getaways at Your Fingertips',
    desc: 'Unlock handpicked travel packages tailored for your dream destinations. Hassle-free planning, unforgettable experiences!',
    icon: <ImAirplane />,
    delay: 0.3,
  },
  {
    id: 2,
    title: 'Seamless Activity Planning',
    desc: 'Plan and book unique local experiences, excursions, and events with ease—right from the app.',
    icon: <FaCalendarCheck />,
    delay: 0.6,
  },
  {
    id: 3,
    title: 'Your Personalized Travel Assistant',
    desc: 'Get itinerary planning, destination insights, and 24/7 support—all in one app, designed just for you.',
    icon: <FaClock />,
    delay: 0.9,
  },
];

const Offers = () => {
  return (
    <div>
      <div className="container py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-4 p-6">
            <h1 className="text-3xl md:text-4xl font-bold">
              What We Offer For You
            </h1>
            <p className="text-gray-500">
              Your ultimate travel companion is here! From planning your dream
              vacations to booking the best deals,{' '}
              <span className="font-[yellowtail]">Miles</span> brings
              convenience, flexibility, and adventure to your fingertips.
              Wherever you go, we’re here to guide your journey.
            </p>
          </div>
          {offerData.map((data) => {
            return (
              <motion.div
                variants={SlideLeft(data.delay)}
                initial="hidden"
                animate="visible"
                key={data.id}
                className="space-y-4 p-6 bg-[#fbfbfb] hover:bg-fourth transition-all duration-300 rounded-xl hover:shadow-xl"
              >
                <div className="text-4xl">{data.icon}</div>
                <p className="text-2xl font-semibold">{data.title}</p>
                <p className="text-gray-500">{data.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Offers;
