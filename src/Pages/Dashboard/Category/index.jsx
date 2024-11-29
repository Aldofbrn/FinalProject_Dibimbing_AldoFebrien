import React, { useContext, useEffect, useState } from 'react';
import { API_KEY } from '../../api/config';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { CategoryContext } from '../../../Context/CategoryContext';
import { toast } from 'react-toastify';
import Sidebar from '../../../components/Sidebar';
import Footer from '../../../components/Footer';
import { getCookie } from 'cookies-next';
import haikeiBlob2 from '../../../assets/haikeiBlob2.svg';

const CategoryDashboard = () => {
  const { dataCategory, handleDataCategory } = useContext(CategoryContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('name'); // Default sort by name
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 6,
    totalPage: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    handleDataCategory();
  }, []);

  useEffect(() => {
    setPagination({
      ...pagination,
      totalPage: Math.ceil(dataCategory.length / pagination.perPage),
    });
  }, [dataCategory, pagination.perPage]);

  const openModal = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const confirmDelete = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };

    axios
      .delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-category/${selectedCategory.id}`,
        config
      )
      .then(() => {
        toast.success('Category deleted successfully', { theme: 'dark' });
        handleDataCategory();
        closeModal();
      })
      .catch((err) => console.error(err));
  };

  const handleSort = (type) => {
    setSortType(type);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCategories = dataCategory
    .filter((cat) => cat.name.toLowerCase().includes(searchTerm))
    .sort((a, b) => {
      if (sortType === 'name') return a.name.localeCompare(b.name);
      if (sortType === 'date')
        return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  const indexFirst = pagination.page * pagination.perPage - pagination.perPage;
  const indexLast = pagination.page * pagination.perPage;
  const paginatedData = filteredCategories.slice(indexFirst, indexLast);

  // Edit Activity
  const editCategory = (categoryId) => {
    navigate(`/dashboard/category/editCategory/${categoryId}`);
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
        <div className="container mx-auto min-h-screen pt-24 px-4">
          <h1 className="text-8xl font-bold font-[yellowtail] text-center text-orange-900">
            Miles
          </h1>
          <h1 className="text-4xl font-bold text-center mb-6">
            Category Dashboard
          </h1>

          {/* Total Categories */}
          <div className="mb-6">
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md mb-6">
              Total Categories: {dataCategory.length}
            </div>
          </div>

          {/* Search and Sort */}
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search categories..."
              className="border p-2 rounded w-1/3"
              onChange={handleSearch}
            />
            <div>
              <label htmlFor="sort" className="mr-2">
                Sort by:
              </label>
              <select
                id="sort"
                className="border p-2 rounded"
                onChange={(e) => handleSort(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="date">Date Created</option>
              </select>
            </div>
          </div>
          <Link to="/dashboard/category/createCategory">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4">
              Add Category
            </button>
          </Link>

          {/* Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedData.map((data) => (
              <div
                key={data.id}
                className="border rounded-lg overflow-hidden shadow hover:bg-gray-400/50 transition-all duration-300"
              >
                <div className="w-full h-48">
                  <img
                    src={data.imageUrl}
                    alt={data.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{data.name}</h2>
                  <p className="text-sm text-gray-500">
                    Date created:{' '}
                    {new Date(data.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => openModal(data)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                      onClick={() => editCategory(data.id)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 my-6">
            <button
              disabled={pagination.page === 1}
              onClick={() =>
                setPagination({ ...pagination, page: pagination.page - 1 })
              }
              className={`px-4 py-2 rounded ${
                pagination.page === 1
                  ? 'bg-gray-300'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Previous
            </button>
            <span>
              Page {pagination.page} of {pagination.totalPage}
            </span>
            <button
              disabled={pagination.page === pagination.totalPage}
              onClick={() =>
                setPagination({ ...pagination, page: pagination.page + 1 })
              }
              className={`px-4 py-2 rounded ${
                pagination.page === pagination.totalPage
                  ? 'bg-gray-300'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Next
            </button>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-xl font-semibold mb-4">
                Are you sure you want to delete this category?
              </h2>
              <p className="mb-4">Category: {selectedCategory?.name}</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </section>
    </>
  );
};

export default CategoryDashboard;
