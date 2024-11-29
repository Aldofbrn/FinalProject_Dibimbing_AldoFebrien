import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_KEY } from '../../api/config';
import { BannerContext } from '../../../Context/BannerContext';
import Sidebar from '../../../components/Sidebar';
import Footer from '../../../components/Footer';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import haikeiBlob2 from '../../../assets/haikeiBlob2.svg';

const BannerDashboard = () => {
  const navigate = useNavigate();
  const { dataBanner, handleDataBanner } = useContext(BannerContext);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 6,
    totalPage: 0, // Calculate this dynamically
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);

  useEffect(() => {
    handleDataBanner();
  }, [pagination.page, searchQuery, sortAsc]);

  const deleteBanner = (id) => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };
    axios
      .delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-banner/${id}`,
        config
      )
      .then(() => {
        toast.success('Data deleted successfully', {
          position: 'bottom-right',
          autoClose: 2000,
          theme: 'dark',
        });
        const updatedBanner = dataBanner.filter((banner) => banner.id !== id);
        handleDataBanner(updatedBanner);
        setModalOpen(false);
      })
      .catch((err) => console.log(err.response));
  };

  const handleNext = () => {
    setPagination((prev) => ({
      ...prev,
      page: Math.min(prev.page + 1, pagination.totalPage),
    }));
  };

  const handleBack = () => {
    setPagination((prev) => ({
      ...prev,
      page: Math.max(prev.page - 1, 1),
    }));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = () => {
    setSortAsc(!sortAsc);
  };

  const filteredBanners = dataBanner.filter((banner) =>
    banner.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedBanners = filteredBanners.sort((a, b) =>
    sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );

  const totalBanners = filteredBanners.length;
  const totalPages = Math.ceil(totalBanners / pagination.perPage);

  const indexFirstBanner = (pagination.page - 1) * pagination.perPage; // Corrected this line
  const indexLastBanner = pagination.page * pagination.perPage;
  const dataPage = sortedBanners.slice(indexFirstBanner, indexLastBanner);

  // Update totalPage state dynamically
  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      totalPage: totalPages,
    }));
  }, [totalBanners, searchQuery, sortAsc]);

  // Edit Promo
  const editBanner = (bannerId) => {
    navigate(`/dashboard/banner/editBanner/${bannerId}`);
  };

  return (
    <>
      <section
        style={{
          backgroundImage: `url(${haikeiBlob2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Sidebar />
        <div className="container">
          <h1 className="text-8xl font-bold font-[yellowtail] text-center text-orange-900">
            Miles
          </h1>
          <h1 className="w-full text-3xl font-bold text-left text-black">
            Banner List
          </h1>
          <p className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md mb-6">
            Total Banners: {totalBanners}
          </p>

          <div>
            <input
              type="text"
              placeholder="Search banners"
              value={searchQuery}
              onChange={handleSearchChange}
              className="px-4 py-2 border rounded-lg w-1/2"
            />
            <button
              onClick={handleSort}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Sort {sortAsc ? 'Ascending' : 'Descending'}
            </button>
          </div>
          {/* Create Banner Button */}
          <div className="text-left mt-4">
            <button
              onClick={() => navigate('/dashboard/banner/createBanner')}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Create Banner
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {dataPage.map((item, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-lg hover:bg-gray-400 transition-all duration-300"
              >
                <div>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="mt-2">
                  <h1 className="font-semibold">{item.name}</h1>
                  <p>{new Date(item.createdAt).toLocaleDateString()}</p>
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => {
                        setBannerToDelete(item.id);
                        setModalOpen(true);
                      }}
                      className="bg-red-600 hover:bg-red-800 text-white px-3 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                    <button
                      className="bg-yellow-400 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg"
                      onClick={() => editBanner(item.id)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-4 justify-center pb-4 items-center">
            <button
              onClick={handleBack}
              disabled={pagination.page === 1}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg"
            >
              Prev
            </button>

            {/* Page Indicator */}
            <span className="font-semibold">
              Page {pagination.page} of {pagination.totalPage}
            </span>

            <button
              onClick={handleNext}
              disabled={pagination.page === pagination.totalPage}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg"
            >
              Next
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">
              Are you sure you want to delete this banner?
            </h2>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => deleteBanner(bannerToDelete)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default BannerDashboard;
