import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_KEY } from '../../../api/config';
import { getCookie } from 'cookies-next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../../../components/Sidebar';
import Footer from '../../../../components/Footer';
import { useNavigate } from 'react-router-dom';

const CreateCategoryDashboard = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [dataCategory, setDataCategory] = useState({
    name: '',
    imageUrl: '',
  });
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleChange = (e) => {
    setDataCategory({
      ...dataCategory,
      [e.target.name]: e.target.value,
    });
  };

  const createCategory = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };
    const payload = {
      name: dataCategory.name,
      imageUrl: uploadImage,
    };
    axios
      .post(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-category',
        payload,
        config
      )
      .then(() => {
        toast.success('Category created successfully', {
          position: 'bottom-right',
          autoClose: 2000,
          theme: 'dark',
        });
        navigate('/dashboard/category');
      })
      .catch((err) => console.log(err.response));
  };

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
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
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    if (image) {
      handleUploadImage();
    }
  }, [image]);

  return (
    <>
      <Sidebar />
      <section className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-6">Create Category</h1>
        <form
          onSubmit={createCategory}
          className="max-w-md mx-auto p-5 space-y-5 border rounded-lg"
        >
          {/* Input for Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Category Name"
              value={dataCategory.name}
              onChange={handleChange}
              className="border px-3 py-2 rounded-lg"
            />
          </div>

          {/* Image Upload and Preview */}
          <div className="flex flex-col gap-2">
            <label htmlFor="imageUrl">Image</label>
            <input
              type="file"
              name="imageUrl"
              onChange={handleChangeImage}
              className="border px-3 py-2"
            />
            {/* Preview Box */}
            <div className="w-full h-40 border border-dashed rounded-lg flex justify-center items-center">
              {uploadImage ? (
                <img
                  src={uploadImage}
                  alt="Preview"
                  className="object-cover h-full w-full rounded-lg"
                />
              ) : (
                <span className="text-gray-500">No image uploaded</span>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setShowCancelModal(true)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </section>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-xl font-semibold">Cancel Changes?</h2>
            <p className="text-gray-600">
              Are you sure you want to cancel? All unsaved changes will be lost.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                No, Keep Editing
              </button>
              <button
                onClick={() => navigate('/dashboard/category')}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default CreateCategoryDashboard;
