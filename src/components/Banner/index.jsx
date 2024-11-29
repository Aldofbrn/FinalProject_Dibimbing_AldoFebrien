import React from 'react';
import AppStoreImg from '../../assets/app_store.png';
import PlayStoreImg from '../../assets/play_store.png';

const Banner = () => {
  return (
    <>
      <section
        style={{
          backgroundImage: `url('/banner-img/bannerPic2.jpg')`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '100%',
          width: '100%',
          backgroundAttachment: 'fixed', // Add this line for the scroll effect
        }}
        className="py-14"
      >
        <div className="container text-black">
          <div
            className="grid grid-cols-1 md:grid-cols-2 items-center
           gap-8 md:gap-4"
          >
            <div className="space-y-6 text-center max-w-xl mx-auto">
              <h1 className=" text-2xl md:text-4xl font-semibold pl-3">
                Miles is Live on Android and iOS – Download the App and Start
                Earning Miles!
              </h1>
              <div className="flex flex-wrap items-center justify-center space-x-4">
                <a href="#">
                  <img
                    src={AppStoreImg}
                    alt=""
                    className="max-w-[150px] sm:max-w-[120px] md:max-w-[200px]"
                  />
                </a>
                <a href="#">
                  <img
                    src={PlayStoreImg}
                    alt=""
                    className="max-w-[150px] sm:max-w-[120px] md:max-w-[200px]"
                  />
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <button className=" bg-opacity-40 text-white py-2 px-6 rounded-lg text-xl font-semibold transform transition-all duration-500 hover:scale-105 animate-bounce-slow backdrop-blur-lg shadow-lg border border-gray-200">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
