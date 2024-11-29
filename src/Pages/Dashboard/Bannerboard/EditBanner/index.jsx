import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BannerContext } from '../../../../Context/BannerContext';
import Sidebar from '../../../../components/Sidebar';
import { API_KEY } from '../../../api/config';
import haikeiBlob2 from '../../../../assets/haikeiBlob2.svg';

const EditBannerDashboard = () => {
  const { dataBanner, handleDataBanner } = useContext(BannerContext);
  const [bannerId, setBannerId] = useState({});
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false); // State for modal
  const navigate = useNavigate();
  const { id } = useParams();

  const dataInput = [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      value: bannerId?.name,
    },
    {
      name: 'imageUrl',
      type: 'file',
      label: 'Image URL',
    },
  ];

  const handleBannerId = () => {
    setBannerId(dataBanner.find((item) => item.id === id));
  };

  const handleChange = (e) => {
    setBannerId({
      ...bannerId,
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
        setBannerId({ ...bannerId, imageUrl: res.data.url });
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
      name: bannerId.name,
      imageUrl: bannerId.imageUrl,
    };

    axios
      .post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-banner/${id}`,
        payload,
        config
      )
      .then(() => {
        toast.success('Data updated successfully', {
          position: 'top-center',
          autoClose: 2000,
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
    setShowModal(true); // Show modal on Cancel
  };

  const confirmCancel = () => {
    setShowModal(false); // Close modal
    navigate('/dashboard/banner'); // Navigate to banners
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (id) {
      handleBannerId();
    }
    handleDataBanner();
  }, [id]);

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
        className="h-screen"
      >
        <Sidebar />
        <h1 className="w-full text-3xl font-bold text-center text-black pt-32">
          Edit Banner
        </h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-sm p-5 mx-auto space-y-3 border min-w-max rounded-xl my-2 border-2 border-primary
          "
        >
          <img
            src={bannerId?.imageUrl}
            alt={bannerId?.name}
            className="object-cover w-full rounded-md h-44"
          />
          {dataInput.map((input, index) => (
            <div className="flex flex-col gap-1" key={index}>
              <label>{input.label}</label>
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
                  value={input.value}
                />
              )}
            </div>
          ))}
          <div className="flex justify-start gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-5 bg-white rounded-md">
            <h2 className="text-xl font-bold">Are you sure?</h2>
            <p className="mt-2">This action will discard your changes.</p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={confirmCancel}
                className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditBannerDashboard;
