import React, { useContext, useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { API_KEY } from '../../api/config';
import { toast, Bounce } from 'react-toastify';
import { ActivityContext } from '../../../Context/ActivityContext';
import Sidebar from '../../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import haikeiBlob2 from '../../../assets/haikeiBlob2.svg';
import { MdCategory } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { IoStar } from 'react-icons/io5';
import { MdDelete, MdEditDocument } from 'react-icons/md';
import Footer from '../../../components/Footer';

const ActivityDashboard = () => {
  const { dataActivity, handleDataActivity } = useContext(ActivityContext);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5,
    totalPage: 0,
  });
  const [searchTitle, setSearchTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const navigate = useNavigate();

  const nextPage = () => {
    if (pagination.page < pagination.totalPage) {
      setPagination({
        ...pagination,
        page: pagination.page + 1,
      });
    }
  };

  const prevPage = () => {
    if (pagination.page > 1) {
      setPagination({
        ...pagination,
        page: pagination.page - 1,
      });
    }
  };

  const firstIndex = pagination.page * pagination.perPage - pagination.perPage;
  const lastIndex = pagination.page * pagination.perPage;

  const filteredActivities = dataActivity.filter((item) => {
    const titleMatch = item.title
      .toLowerCase()
      .includes(searchTitle.toLowerCase());
    const categoryMatch = selectedCategory
      ? item.category.name === selectedCategory
      : true;
    return titleMatch && categoryMatch;
  });

  const dataActivitiesPage = filteredActivities.slice(firstIndex, lastIndex);

  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      totalPage: Math.ceil(filteredActivities.length / pagination.perPage),
    }));
  }, [dataActivity, searchTitle, selectedCategory]);

  useEffect(() => {
    handleDataActivity();
  }, [pagination.totalPage]);

  // Pagination logic for displaying page numbers in chunks
  const paginate = () => {
    const maxVisiblePages = 5;
    let pages = [];
    const totalPages = pagination.totalPage;
    let startPage = Math.max(
      1,
      pagination.page - Math.floor(maxVisiblePages / 2)
    );
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };
  const deleteActivity = (id) => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };
    axios
      .delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-activity/${id}`,
        config
      )
      .then((res) => {
        toast.success('Delete Data Successfully', {
          position: 'bottom-right',
          autoClose: 2000,
        });

        // Filter out the deleted activity and update the context
        const updatedActivity = dataActivity.filter(
          (activity) => activity.id !== id
        );

        // Update the context or state
        handleDataActivity(updatedActivity);
      })
      .catch((err) => {
        console.error(err.response);
        toast.error(
          err.response?.data?.message || 'Failed to delete activity',
          {
            position: 'bottom-right',
            autoClose: 2000,
          }
        );
      });
  };
  // Edit Activity
  const editActivity = (activityId) => {
    navigate(`/dashboard/activity/editActivity/${activityId}`);
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
      <div className="container mx-auto justify-center min-h-[960px] pt-24">
        <h1 className="text-8xl font-bold font-[yellowtail] text-center text-orange-900">
          Miles
        </h1>
        <h1 className="text-4xl font-bold mb-4 text-center">
          Track Your Activity and Stay Updated with Real-Time Insights
        </h1>

        <div className="mb-4 font-semibold text-center text-white">
          <p className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md mb-6">
            Total Activities: {filteredActivities.length}
          </p>
        </div>

        <div className="md:flex items-center justify-between">
          <div className="md:grid-cols-2 grid gap-4">
            <div className="mb-4 flex gap-4 justify-between">
              <input
                type="text"
                placeholder="Search by title"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                className="border-2 border-primary p-2 rounded-lg w-full mb-2"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border-2 border-primary p-2 rounded-lg w-full"
              >
                <option value="">Select Category</option>
                {dataActivity.map((item) => (
                  <option key={item.id} value={item.category.name}>
                    {item.category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-left mb-4">
            <button
              onClick={() => navigate('/dashboard/activity/createActivity')}
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300"
            >
              Create Activity
            </button>
          </div>
        </div>

        {/* Activity Grid */}
        {dataActivitiesPage.map((item, index) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 rounded-xl border-primary border-2 mb-4 overflow-hidden hover:bg-gray-400/50 transition-all duration-300"
            key={index}
          >
            <div className="h-52">
              <img
                src={item.imageUrls}
                alt="Activity Image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="border-b-2 md:border-r-2 px-3">
              <h1 className="text-xl font-bold line-clamp-1 my-2">
                {item.title}
              </h1>
              <div className="flex gap-2 items-start justify-start text-sm">
                <p className="flex gap-1 items-center bg-tertiary rounded-xl px-2 py-1">
                  <MdCategory /> {item.category.name}
                </p>
                <p className="flex gap-1 items-center bg-fourth px-2 py-1 rounded-xl">
                  <FaLocationDot /> {item.province}
                </p>
              </div>
              <div className="my-2 font-semibold">
                <p>Price: Rp. {item.price.toLocaleString('id-ID')}</p>
                <p className="line-clamp-1">Facilities: {item.facilities}</p>
              </div>
              <div className="flex">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <IoStar /> {item.rating}{' '}
                  <span className="text-gray-500 font-normal">
                    ({item.total_reviews} reviews)
                  </span>
                </p>
              </div>
              <hr className="border-2 border-primary" />
              <div>
                <p className="text-sm my-2 text-gray-500">
                  Created at: {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div>
              <h1 className="text-center text-2xl font-bold md:mb-8">Action</h1>
              <div className="grid grid-rows-2 gap-1 px-2 mb-4">
                <button
                  className="bg-red-600 hover:bg-red-800 hover:text-white font-semibold px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-300"
                  onClick={() => deleteActivity(item.id)}
                >
                  <MdDelete /> Delete
                </button>
                <button
                  className="bg-yellow-400 hover:bg-yellow-600 hover:text-white font-semibold px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-300"
                  onClick={() => editActivity(item.id)}
                >
                  <MdEditDocument /> Edit
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Pagination Controls */}
        <div className="flex justify-center gap-4 py-4">
          <button
            onClick={prevPage}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Previous
          </button>

          {/* Pagination Numbers */}
          {paginate().map((page) => (
            <button
              key={page}
              onClick={() => setPagination({ ...pagination, page })}
              className={`px-4 py-2 rounded-lg ${
                pagination.page === page ? 'bg-blue-500' : 'bg-gray-600'
              } text-white hover:bg-gray-800`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={nextPage}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default ActivityDashboard;
