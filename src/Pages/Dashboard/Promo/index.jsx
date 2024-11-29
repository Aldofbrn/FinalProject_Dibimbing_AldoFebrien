import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { API_KEY } from '../../api/config';
import Sidebar from '../../../components/Sidebar';
import Footer from '../../../components/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PromoContext } from '../../../Context/PromoContext';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'cookies-next';
import haikeiBlob2 from '../../../assets/haikeiBlob2.svg';

const PromoDashboard = () => {
  const { dataPromo, handleDataPromo } = useContext(PromoContext);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 6,
    totalPage: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [promoToDelete, setPromoToDelete] = useState(null);
  const navigate = useNavigate();

  // Calculate total pages
  const allPage = () => {
    setPagination({
      ...pagination,
      totalPage: Math.ceil(dataPromo.length / pagination.perPage),
    });
  };

  const firstIndexData =
    pagination.page * pagination.perPage - pagination.perPage;
  const lastIndexData = pagination.page * pagination.perPage;
  const dataPromoPage = dataPromo
    .filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((item) => (filter === 'all' ? true : item.promo_code === filter))
    .slice(firstIndexData, lastIndexData);

  const handleNext = () => {
    setPagination({
      ...pagination,
      page: pagination.page + 1,
    });
  };

  const handleBack = () => {
    setPagination({
      ...pagination,
      page: pagination.page - 1,
    });
  };

  const deleteData = (id) => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };
    axios
      .delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/${id}`,
        config
      )
      .then((res) => {
        toast.success('Data deleted successfully', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        const updatedPromo = dataPromo.filter((promo) => promo.id !== id);
        handleDataPromo(updatedPromo);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    handleDataPromo();
  }, [pagination.totalPage]);

  useEffect(() => {
    allPage();
  }, [dataPromo, searchQuery, filter]);

  // Edit Promo
  const editPromo = (promoId) => {
    navigate(`/dashboard/promo/editPromo/${promoId}`);
  };

  return (
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
        <h1 className="text-4xl font-bold text-center mb-6">Promo Dashboard</h1>

        {/* Promo Count */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md mb-6">
          <p className="text-lg font-semibold">
            Total Promos: {dataPromo.length}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-1 mb-6">
          <input
            type="text"
            placeholder="Search by promo title"
            className="p-2 border border-gray-300 rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="p-2 border border-gray-300 rounded-md"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option value="all">All</option>
            <option value="promo_code_1">Promo Code 1</option>
            <option value="promo_code_2">Promo Code 2</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Create Promo Button */}
        <div className="flex justify-start mb-4">
          <button
            onClick={() => navigate('/dashboard/promo/createPromo')}
            className="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Create Promos
          </button>
        </div>

        {/* Promo List */}
        <div className="grid md:grid-cols-2 gap-6">
          {dataPromoPage.map((item, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow-md flex flex-col hover:bg-gray-400/50 transition-all
         duration-300"
            >
              <img
                src={item.imageUrl}
                alt="Promo Image"
                className="w-full h-60 object-cover rounded-md mb-4"
              />
              <h2 className="font-semibold text-lg">{item.title}</h2>
              <p>Promo Code: {item.promo_code}</p>
              <p>
                Promo Discount:{' '}
                {item.promo_discount_price.toLocaleString('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                })}
              </p>
              <p className="text-sm text-gray-500">
                Created Date:{' '}
                {new Date(item.createdAt).toLocaleDateString('id-ID')}
              </p>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    setModalOpen(true);
                    setPromoToDelete(item.id);
                  }}
                  className="bg-red-600 hover:bg-red-800 text-white px-3 py-2 rounded-lg"
                >
                  Delete
                </button>
                <button
                  className="bg-yellow-400 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg"
                  onClick={() => editPromo(item.id)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between my-6">
          <button
            onClick={handleBack}
            disabled={pagination.page === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Previous
          </button>
          <span>
            Page {pagination.page} of {pagination.totalPage}
          </span>
          <button
            onClick={handleNext}
            disabled={pagination.page === pagination.totalPage}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Next
          </button>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default PromoDashboard;
