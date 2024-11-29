import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="custom-arrow prev-arrow flex items-center justify-center bg-orange-500 hover:bg-orange-800 text-white rounded-full w-8 h-8 cursor-pointer absolute top-1/2 left-[-15px] z-10 transform -translate-y-1/2 sm:w-10 sm:h-10 sm:left-[-30px]"
  >
    &#10094; {/* Left Arrow Icon */}
  </div>
);

const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="custom-arrow next-arrow flex items-center justify-center bg-orange-500 hover:bg-orange-800 text-white rounded-full w-8 h-8 cursor-pointer absolute top-1/2 right-[-15px] z-10 transform -translate-y-1/2 sm:w-10 sm:h-10 sm:right-[-30px]"
  >
    &#10095; {/* Right Arrow Icon */}
  </div>
);

const Promos = ({ promos }) => {
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
          centerPadding: '15px',
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
  return (
    <>
      <section className="bg-gradient-to-tr from-secondary to-primary">
        <div className="container md:grid md:grid-cols-2 items-center">
          <div className="pt-8 text-white text-left mr-10">
            <h1 className="font-bold text-3xl md:text-5xl ">
              Discover Exclusive Travel Deals to Make Your Journey
              Unforgettable!
            </h1>
            <p className=" text-sm md:text-lg font-semibold text-gray-300 my-4 ">
              Looking for the perfect getaway at the best price? Explore our
              exclusive travel deals and make your dream journey a reality!
            </p>
            <Link to="/promoList">
              <button className="px-2 py-2 bg-tertiary rounded-xl font-bold hover:scale-105 transition-all duration-300 flex items-start">
                {' '}
                Explore more
              </button>
            </Link>
          </div>
          <div>
            <Slider {...settings}>
              {promos.map((promo, index) => (
                <div key={index} className="px-4  py-8">
                  <div className=" relative w-full h-[400px]  rounded-xl overflow-hidden transition duration-300 group ">
                    {/* Top Card */}
                    <div className="relative w-full h-full">
                      <img
                        src={promo.imageUrl}
                        alt={promo.title}
                        className="w-full h-full object-cover rounded-xl transition duration-300 transform group-hover:scale-110 group-hover:blur-sm"
                      />
                    </div>
                    {/* Bottom Card */}
                    <div className="absolute inset-0 bg-tertiary/70 text-white p-6 text-center flex flex-col items-center justify-center transform translate-y-full group-hover:translate-y-0 transition-all duration-700">
                      <span className="text-xl font-bold mb-2">
                        {promo.title}
                      </span>
                      <span className="text-sm mb-4 text-center line-clamp-2">
                        {promo.description}
                      </span>
                      <Link to="/promoList">
                        <button className="bg-primary/70 text-white px-4 py-2 rounded-lg hover:bg-primary transition duration-300">
                          learn more
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
};

export default Promos;
