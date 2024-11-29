import React from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BannerContext } from '../../../../Context/BannerContext';
import { API_KEY } from '../../../api/config';
import Sidebar from '../../../../components/Sidebar';
import Footer from '../../../../components/Footer';
import haikeiBlob2 from '../../../../assets/haikeiBlob2.svg';

const CreateBannerDashboard = () => {
  const navigate = useNavigate();
  const { handleDataBanner } = useContext(BannerContext);
  const [image, setImage] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [createBanner, setCreateBanner] = useState({
    name: '',
    imageUrl: '',
  });
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  const dataInput = [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Banner Name',
    },
    {
      name: 'imageUrl',
      type: 'file',
      label: 'Image URL',
      placeholder: 'Image URL',
    },
  ];

  const handleChange = (e) => {
    setCreateBanner({
      ...createBanner,
      [e.target.name]: e.target.value,
    });
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

  const createDataBanner = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };

    const payload = {
      name: createBanner.name,
      imageUrl: uploadImage,
    };

    axios
      .post(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-banner',
        payload,
        config
      )
      .then((res) => {
        toast.success('Create Banner successfully', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        setTimeout(() => {
          handleDataBanner();
          navigate('/dashboard/banner');
        }, 2000);
      })
      .catch((err) => console.log(err.response));
  };

  const handleCancel = () => {
    setShowModal(true); // Show modal on cancel
  };

  const confirmCancel = () => {
    setCreateBanner({
      name: '',
      imageUrl: '',
    });
    setImage(null);
    setUploadImage(null);
    setShowModal(false); // Hide modal after confirming
    navigate('/dashboard/banner');
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal without canceling
  };

  useEffect(() => {
    if (image) {
      handleUploadImage();
    }
  }, [image]);

  return (
    <>
      <section
        style={{
          backgroundImage: `url(${haikeiBlob2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="
        h-screen"
      >
        <Sidebar />
        <h1 className="w-full text-3xl font-bold text-center text-black py-16">
          Create Banner
        </h1>
        <form
          onSubmit={createDataBanner}
          className="max-w-sm p-5 mx-auto space-y-3 border-2 border-primary min-w-max rounded-xl"
        >
          {dataInput.map((input, index) => (
            <div key={index} className="flex flex-col gap-1">
              <label htmlFor="name">{input.label}</label>
              {input.type === 'file' ? (
                <input
                  onChange={handleChangeImage}
                  className="px-2 py-1 rounded-lg"
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                />
              ) : (
                <input
                  onChange={handleChange}
                  className="px-2 py-1 rounded-lg text-slate-950"
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                />
              )}
            </div>
          ))}

          {/* Image Preview */}
          <div className="mt-4 border-dashed border-2 border-gray-400 p-4 rounded-lg">
            {uploadImage ? (
              <img
                src={uploadImage}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
            ) : (
              <div className="text-center text-gray-500">No image selected</div>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Modal for Cancel Confirmation */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
              <h2 className="text-xl font-semibold">
                Are you sure you want to cancel?
              </h2>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={confirmCancel}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Yes
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default CreateBannerDashboard;
