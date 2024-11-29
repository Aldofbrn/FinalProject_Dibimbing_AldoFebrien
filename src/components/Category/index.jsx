import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Slider from 'react-slick';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Using react-icons
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const Category = ({ category }) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
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
          arrows: false,
        },
      },
    ],
  };
  if (!category.length) {
    return <p>No categories available.</p>;
  }
  return (
    <section className="bg-tertiary min-h-80">
      <div className="container py-4">
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-2xl md:text-5xl font-bold text-white">
            Explore the World: Your Next Adventure Awaits
          </h1>
          <p className=" text-sm md:text-lg font-semibold text-gray-200 ">
            Discover breathtaking destinations, hidden gems, and travel tips to
            inspire your next journey. Start exploring now!
          </p>
        </div>
        <ul>
          <Slider {...settings}>
            {category.map((data) => (
              <li key={data.id} className="py-6 px-2 ">
                <div className="w-full max-w-[400px] mx-auto ">
                  <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
                    <img
                      src={data.imageUrl}
                      className="w-full h-full aspect-[16/9] object-cover transition-transform duration-300 group-hover:rotate-3 group-hover:scale-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                    <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-200 group-hover:translate-y-0">
                      <h1 className="font-dmserif text-3xl font-bold text-white">
                        {data.name}
                      </h1>
                      <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Facilis dolore adipisci placeat.
                      </p>
                      <Link to="/activityList">
                        <button className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60 hover:bg-tertiary transition duration-300">
                          Learn more
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
    </section>
  );
};

Category.propTypes = {
  category: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Category;
