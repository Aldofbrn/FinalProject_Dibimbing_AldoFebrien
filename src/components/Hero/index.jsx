import React from 'react';
import plane from '../../assets/plane.svg';
import haike1 from '../../assets/haike1.svg';
import { SlideRight, SlideLeft } from '../../utilities/animation';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <>
      <section
        style={{
          backgroundImage: `url(${haike1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px] relative">
          {/* Brand Info */}
          <div className="flex flex-col justify-center py-24 md:py-0">
            <div className=" text-left space-y-6">
              <motion.h1
                variants={SlideRight(0.3)}
                initial="hidden"
                animate="visible"
                className="text-5xl lg:text-6xl font-bold leading-relaxed xl:leading-normal"
              >
                <span className="font-[yellowtail] text-orange-700 text-6xl lg:text-8xl">
                  Miles:
                </span>{' '}
                Travel Made Personal, Every Step of the Way
              </motion.h1>
              <motion.p
                variants={SlideRight(0.6)}
                initial="hidden"
                animate="visible"
                className="text-gray-600 xl:max-w-[500px]"
              >
                From dream destinations to seamless travel plans, we're with you
                every mile.
              </motion.p>

              {/* Button Explore */}
              <motion.div
                variants={SlideRight(0.9)}
                initial="hidden"
                animate="visible"
                className=" flex justify-start"
              >
                <button className="bg-primary text-white font-semibold py-3  px-6 rounded-md hover:!scale-110 duratiooon-300 transition-all ">
                  Explore Now ✈️
                </button>
              </motion.div>
            </div>
          </div>
          {/* Hero Images */}
          <motion.div
            variants={SlideLeft(0.3)}
            initial="hidden"
            animate="visible"
            className="flex justify-center items-center"
          >
            <img src={plane} alt="plane" className="drop-shadow-lg" />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
