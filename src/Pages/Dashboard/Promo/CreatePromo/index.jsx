import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../../../../components/Sidebar';
import axios from 'axios';
import Footer from '../../../../components/Footer';
import { getCookie } from 'cookies-next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PromoContext } from '../../../../Context/PromoContext';
import { API_KEY } from '../../../api/config';
import { useNavigate } from 'react-router-dom';
import haikeiBlob2 from '../../../../assets/haikeiBlob2.svg';

const CreatePromoDashboard = () => {
  const { handleDataPromo } = useContext(PromoContext);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [dataPromo, setDataPromo] = useState({
    title: '',
    description: '',
    imageUrl: '',
    terms_condition: '',
    promo_code: '',
    promo_discount_price: 0,
    minimum_claim_price: 0,
  });
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const dataInput = [
    {
      name: 'title',
      type: 'text',
      label: 'Title Promo',
      placeholder: 'Promo Name',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description Promo',
      placeholder: 'Promo Description',
    },
    {
      name: 'promo_code',
      type: 'text',
      label: 'Promo Code',
      placeholder: 'Promo Code',
    },
    {
      name: 'promo_discount_price',
      type: 'number',
      label: 'Promo Discount Price',
      placeholder: 'Promo Discount Price',
    },
    {
      name: 'minimum_claim_price',
      type: 'number',
      label: 'Minimum Claim Price',
      placeholder: 'Minimum Claim Price',
    },
  ];

  const handleChange = (e) => {
    setDataPromo({
      ...dataPromo,
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

  const submitData = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };

    const payload = {
      title: dataPromo.title,
      description: dataPromo.description,
      imageUrl: uploadImage,
      terms_condition: dataPromo.terms_condition,
      promo_code: dataPromo.promo_code,
      promo_discount_price: Number(dataPromo.promo_discount_price),
      minimum_claim_price: Number(dataPromo.minimum_claim_price),
    };

    axios
      .post(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-promo',
        payload,
        config
      )
      .then((res) => {
        toast.success('Create Promo Successfully', {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        setTimeout(() => {
          handleDataPromo();
          navigate('/dashboard/promo');
        }, 2000);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    if (image) {
      handleUploadImage();
    }
  }, [image]);

  return (
    <section
      style={{
        backgroundImage: `url(${haikeiBlob2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Sidebar />
      <div className="container mx-auto md:px-64">
        <h1 className="w-full text-3xl font-bold text-center text-black py-8 ">
          Create Promo
        </h1>
        <form
          onSubmit={submitData}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 mx-auto border rounded-xl border-2 border-primary"
        >
          {/* Image Upload Section */}
          <div className="col-span-2 flex flex-col gap-2 items-start ">
            <label htmlFor="imageUrl" className="block">
              Image URL
            </label>

            {/* Preview image or placeholder box */}
            {uploadImage ? (
              <img
                src={uploadImage}
                alt="Uploaded"
                className="mt-2 w-full h-48 object-cover"
              />
            ) : (
              <div className="mt-2 w-full h-48 border border-dashed border-gray-400 flex items-center justify-center text-gray-500">
                No Image Uploaded
              </div>
            )}

            {/* File input */}
            <input
              onChange={handleChangeImage}
              className="px-2 py-1 rounded-lg text-slate-950"
              type="file"
              name="imageUrl"
              placeholder="Image URL"
            />
          </div>

          {dataInput.map((input, index) => (
            <div key={index} className="flex flex-col gap-1">
              <label htmlFor={input.name}>{input.label}</label>
              <input
                onChange={handleChange}
                className="px-2 py-1 rounded-lg text-slate-950"
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
              />
            </div>
          ))}

          {/* Terms and Conditions as Textarea */}
          <div className="flex flex-col gap-1 col-span-2">
            <label htmlFor="terms_condition">Terms & Conditions</label>
            <textarea
              onChange={handleChange}
              name="terms_condition"
              className="p-2 rounded-lg text-slate-950"
              rows="6"
              placeholder="Enter terms and conditions here..."
            />
          </div>

          <div className="flex justify-between col-span-2">
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 transition-all duration-300"
              onClick={() => setShowModal(true)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-800 transition-all duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Modal for Cancel button */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">
                Are you sure you want to cancel?
              </h2>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded mr-2 hover:bg-red-800 transition-all duration-300"
                onClick={() => setShowModal(false)} // Close modal without action
              >
                No
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition-all duration-300"
                onClick={() => navigate('/dashboard/promo')} // Redirect to promo dashboard
              >
                Yes
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CreatePromoDashboard;
