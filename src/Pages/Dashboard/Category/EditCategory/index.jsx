import React from 'react';
import axios from 'axios';
import { API_KEY } from '../../../api/config';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { toast, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../../components/Sidebar';
import Footer from '../../../../components/Footer';
import { useParams } from 'react-router-dom';

const EditCategoryDashboard = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const [dataCategory, setDataCategory] = useState({
    name: '',
    imageUrl: '',
  });

  const handleCategory = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    axios
      .get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/category/${id}`,
        config
      )
      .then((res) => setDataCategory(res.data.data))
      .catch((err) => console.log(err.response));
  };
  const handleChange = (e) => {
    setDataCategory({
      ...dataCategory,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImage = () => {
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
        setDataCategory({
          ...dataCategory,
          imageUrl: res.data.url,
        });
      })
      .catch((err) => console.log(err.response));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };

    const payload = {
      name: dataCategory.name,
      imageUrl: dataCategory.imageUrl,
    };

    axios
      .post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-category/${id}`,
        payload,
        config
      )
      .then((res) => {
        toast.success('Data Category updated successfully', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Bounce,
        });
        setTimeout(() => {
          navigate('/dashboard/category');
        }, 2000);
      })
      .catch((err) => console.log(err.response));
  };
  const dataInput = [
    {
      name: 'name',
      type: 'text',
      label: 'Category Name',
      value: dataCategory.name,
    },
    {
      type: 'file',
      label: 'Image URL',
    },
  ];
  useEffect(() => {
    handleCategory();
  }, [id]);

  useEffect(() => {
    if (image) {
      handleImage();
    }
  }, [image]);

  return (
    <>
      <section>
        <Sidebar />
        <section className="container mx-auto py-10">
          <h1 className="text-3xl font-bold text-center mb-6">Edit Category</h1>
          <form
            onSubmit={handleSubmit}
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
                Are you sure you want to cancel? All unsaved changes will be
                lost.
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
      </section>
    </>
  );
};

export default EditCategoryDashboard;
