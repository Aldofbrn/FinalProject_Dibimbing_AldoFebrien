import React from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useContext, useEffect, useState } from 'react';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ActivityContext } from '../../../../Context/ActivityContext';
import { CategoryContext } from '../../../../Context/CategoryContext';
import { API_KEY } from '../../../api/config';
import Sidebar from '../../../../components/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import haikeiBlob2 from '../../../../assets/haikeiBlob2.svg';

const EditActivityDashboard = () => {
  const { dataCategory, handleDataCategory } = useContext(CategoryContext);
  const { dataActivity, handleDataActivity } = useContext(ActivityContext);
  const [activityId, setActivityId] = useState({});
  const [image, setImage] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleActivityId = () => {
    const foundActivity = dataActivity.find((item) => item.id === id);
    if (foundActivity) setActivityId(foundActivity);
  };

  const handleChange = (e) => {
    setActivityId({
      ...activityId,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageName(file.name);
  };

  const handleUploadImage = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };
    const formData = new FormData();
    formData.append('image', image);

    axios
      .post(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image',
        formData,
        config
      )
      .then((res) => {
        setUploadImage(res.data.url);
      })
      .catch((err) => console.error(err.response));
  };

  const handleEditActivity = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };
    const payload = {
      ...activityId,
      imageUrls: uploadImage
        ? [uploadImage, ...activityId.imageUrls]
        : activityId.imageUrls,
    };

    axios
      .post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${id}`,
        payload,
        config
      )
      .then((res) => {
        toast.success('Activity Updated Successfully', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark',
          transition: Bounce,
        });
        setTimeout(() => {
          handleDataActivity();
          navigate('/dashboard/activity');
        }, 2000);
      })
      .catch((err) => console.error(err.response));
  };

  const handleCancel = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const dataInput = [
    {
      label: 'Title',
      name: 'title',
      type: 'text',
      placeholder: 'Title Activity',
      change: handleChange,
      value: activityId?.title,
    },
    {
      label: 'Description',
      name: 'description',
      type: 'text',
      placeholder: 'Description Activity',
      change: handleChange,
      value: activityId?.description,
    },
    {
      label: 'Category',
      name: 'categoryId',
      change: handleChange,
      value: activityId?.categoryId,
    },
    {
      label: 'Province',
      name: 'province',
      type: 'text',
      placeholder: 'Province Activity',
      change: handleChange,
      value: activityId?.province,
    },
    {
      label: 'City',
      name: 'city',
      type: 'text',
      placeholder: 'City Activity',
      change: handleChange,
      value: activityId?.city,
    },
    {
      label: 'Facilities',
      name: 'facilities',
      type: 'text',
      placeholder: 'Facilities Activity',
      change: handleChange,
      value: activityId?.facilities,
    },
    {
      label: 'Price',
      name: 'price',
      type: 'number',
      placeholder: '0',
      change: handleChange,
      value: activityId?.price,
    },
    {
      label: 'Discount Price',
      name: 'price_discount',
      type: 'number',
      placeholder: '0',
      change: handleChange,
      value: activityId?.price_discount,
    },
    {
      label: 'Rating',
      name: 'rating',
      type: 'number',
      placeholder: '5',
      change: handleChange,
      value: activityId?.rating,
    },
    {
      label: 'Total Reviews',
      name: 'total_reviews',
      type: 'number',
      placeholder: 'Total Reviews',
      change: handleChange,
      value: activityId?.total_reviews,
    },
  ];

  useEffect(() => {
    handleActivityId();
    handleDataActivity();
    handleDataCategory();
  }, [id]);

  useEffect(() => {
    if (image) {
      handleUploadImage();
    }
  }, [image]);

  return (
    <>
      <section
        className="min-h-screen bg-gray-100 py-5"
        style={{
          backgroundImage: `url(${haikeiBlob2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex container">
          <Sidebar />
          <div className="flex-1 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-6">
              Edit Activity
            </h1>

            {/* Form */}
            <form
              onSubmit={handleEditActivity}
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-2"
            >
              {/* Image Preview Box - Default or Uploaded */}
              <div className="mb-4 grid grid-cols-1 gap-4">
                <div className="col-span-1">
                  {!uploadImage && (
                    <div
                      className="w-full h-40 border-dashed border-2 border-gray-400 flex items-center justify-center"
                      style={{ minHeight: '160px' }}
                    >
                      <span className="text-gray-500">No Image Uploaded</span>
                    </div>
                  )}
                  {uploadImage && (
                    <div className="w-full h-40 overflow-hidden">
                      <img
                        src={uploadImage}
                        alt="Uploaded Preview"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* File input and Image Name Display */}
                <div className="col-span-1">
                  <label
                    className="block text-sm font-semibold mb-2"
                    htmlFor="imageUrls"
                  >
                    Upload Image
                  </label>
                  <input
                    type="file"
                    className="block w-full text-sm p-2 border rounded-lg"
                    name="imageUrls"
                    onChange={handleChangeImage}
                  />
                  {/* Display the uploaded file name */}
                  {imageName && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>File Name: {imageName}</p>
                    </div>
                  )}
                </div>
              </div>
              {dataInput.map((input, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">{input.label}</label>
                  {input.name === 'categoryId' ? (
                    <select
                      onChange={input.change}
                      className="px-3 py-2 border rounded-lg text-gray-800"
                      name={input.name}
                      value={input.value || ''} // Default to empty if undefined
                    >
                      <option value="" disabled>
                        Select Category
                      </option>
                      {dataCategory.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      onChange={input.change}
                      className="px-3 py-2 border rounded-lg text-gray-800"
                      type={input.type}
                      name={input.name}
                      placeholder={input.placeholder}
                      value={input.value || ''} // Default to empty if undefined
                    />
                  )}
                </div>
              ))}

              <div className="flex gap-2 mt-6">
                <button className="px-6 py-2 bg-primary/70 text-white rounded-lg shadow-md hover:bg-primary transition-all duration-300">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition-all duration-300"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>

            {/* Confirmation Modal */}
            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
                  <p className="mb-4">
                    You have unsaved changes. Do you want to cancel?
                  </p>
                  <div className="flex justify-end">
                    <button
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
                      onClick={closeModal}
                    >
                      No
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-lg"
                      onClick={() => navigate('/dashboard/activity')}
                    >
                      Yes, Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default EditActivityDashboard;
