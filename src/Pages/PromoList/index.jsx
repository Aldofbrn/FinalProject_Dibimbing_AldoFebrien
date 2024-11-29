import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY } from '../api/config';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import haikeiBlob2 from '../../assets/haikeiBlob2.svg';

const PromoList = () => {
  const [promosData, setPromosData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page

  const handlePromoData = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };
    axios
      .get(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos',
        config
      )
      .then((res) => {
        setPromosData(res.data.data);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    handlePromoData();
  }, []);

  // Calculate indexes for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = promosData.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(promosData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <section
        style={{
          backgroundImage: `url(${haikeiBlob2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      >
        <Navbar />
        <div className="container mx-auto py-36 px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Explore our promos
          </h1>
          <p className="text-center mb-8">
            Discover our exciting promos and exclusive deals that make your next
            adventure more affordable. Don't miss out on these limited-time
            offers – book now and save big!
          </p>
          <div>
            <div className="grid md:grid-cols-3 gap-6">
              {currentItems.map((promo, index) => (
                <div key={index} className="px-4 py-8">
                  <div className="relative w-full h-[400px] bg-white rounded-xl overflow-hidden shadow-lg transition duration-300 group">
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
                      <Link to={`/promoList/${promo.id}`}>
                        <button className="bg-primary/70 text-white px-4 py-2 rounded-lg hover:bg-primary transition duration-300">
                          Learn More
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-8 space-x-4 py-8">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`py-2 px-4 bg-gray-300 rounded-lg hover:bg-gray-400 transition ${
                  currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Previous
              </button>
              <span className="text-lg font-medium text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`py-2 px-4 bg-gray-300 rounded-lg hover:bg-gray-400 transition ${
                  currentPage === totalPages
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default PromoList;
