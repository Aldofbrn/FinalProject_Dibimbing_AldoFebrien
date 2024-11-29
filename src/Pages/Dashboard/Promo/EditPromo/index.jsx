import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../../../../components/Sidebar';
import Footer from '../../../../components/Footer';
import { API_KEY } from '../../../api/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from 'cookies-next';
import { PromoContext } from '../../../../Context/PromoContext';
import { useParams } from 'react-router-dom';
import haikeiBlob2 from '../../../../assets/haikeiBlob2.svg';

const EditPromoDashboard = () => {
  const navigate = useNavigate();
  const { dataPromo, handleDataPromo } = useContext(PromoContext);
  const [image, setImage] = useState(null);
  const [promoId, setPromoId] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

  const handlePromoId = () => {
    const promo = dataPromo.find((item) => item.id === id);
    if (promo) {
      setPromoId(promo);
    } else {
      console.error('Promo not found for ID:', id);
    }
    setLoading(false);
  };

  const dataInput = [
    {
      name: 'title',
      type: 'text',
      label: 'Title Promo',
      placeholder: 'Promo Name',
      value: promoId?.title || '',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description Promo',
      placeholder: 'Promo Description',
      value: promoId?.description || '',
    },
    {
      name: 'promo_code',
      type: 'text',
      label: 'Promo Code',
      placeholder: 'Promo Code',
      value: promoId?.promo_code || '',
    },
    {
      name: 'promo_discount_price',
      type: 'number',
      label: 'Promo Discount Price',
      placeholder: 'Promo Discount Price',
      value: promoId?.promo_discount_price || '',
    },
    {
      name: 'minimum_claim_price',
      type: 'number',
      label: 'Minimum Claim Price',
      placeholder: 'Minimum Claim Price',
      value: promoId?.minimum_claim_price || '',
    },
  ];

  const handleChange = (e) => {
    setPromoId({
      ...promoId,
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
        setPromoId({ ...promoId, imageUrl: res.data.url });
      })
      .catch((err) => console.log(err.response));
  };

  const editPromo = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };

    const payload = {
      title: promoId?.title,
      description: promoId?.description,
      imageUrl: promoId?.imageUrl,
      terms_condition: promoId?.terms_condition,
      promo_code: promoId?.promo_code,
      promo_discount_price: Number(promoId?.promo_discount_price),
      minimum_claim_price: Number(promoId?.minimum_claim_price),
    };

    axios
      .post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${id}`,
        payload,
        config
      )
      .then((res) => {
        toast.success('Update Promo Successfully', {
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
    if (id) {
      handlePromoId();
    }
    handleDataPromo();
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
      >
        <div className="container pb-8">
          <Sidebar />
          <h1 className="text-3xl font-bold text-center text-black py-5 ">
            Edit Promo
          </h1>
          <form
            onSubmit={editPromo}
            className="grid grid-cols-1 gap-4 rounded-xl border-2 border-primary overflow-hidden px-2"
          >
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
                {/* Image Upload */}
                {promoId?.imageUrl ? (
                  <div className="w-full h-32 md:h-96 mb-4">
                    <img
                      src={promoId.imageUrl}
                      alt={promoId?.title || 'Promo Image'}
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>
                ) : (
                  <div className="border-dashed border-2 border-gray-400 w-full h-32 flex justify-center items-center text-gray-600">
                    <span>No Image Uploaded</span>
                  </div>
                )}
                <input
                  onChange={handleChangeImage}
                  className="px-2 py-1 rounded-lg mb-4 w-full"
                  type="file"
                  name="image"
                />

                {/* Data Inputs (Title, Description, Promo Code, etc.) */}
                {dataInput.map((input, index) => (
                  <div key={index}>
                    <label htmlFor={input.name}>{input.label}</label>
                    <input
                      onChange={handleChange}
                      className="px-2 py-1 rounded-lg text-slate-950 w-full"
                      type={input.type}
                      name={input.name}
                      placeholder={input.placeholder}
                      value={input.value}
                    />
                  </div>
                ))}

                {/* Terms & Conditions */}
                <div className="">
                  <label htmlFor="terms_condition">Terms & Conditions</label>
                  <textarea
                    onChange={handleChange}
                    className="px-2 py-1 rounded-lg text-slate-950 w-full"
                    name="terms_condition"
                    placeholder="Enter terms and conditions"
                    value={promoId?.terms_condition}
                    rows="4"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-start mt-4 gap-2 mb-5">
                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto hover:bg-red-800 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto hover:bg-primary transition-all duration-300"
                  >
                    Save Changes
                  </button>
                </div>
              </>
            )}
          </form>

          {/* Modal for cancel confirmation */}
          {showModal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg">
                <h2>Are you sure you want to cancel?</h2>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded-lg"
                  >
                    No
                  </button>
                  <button
                    onClick={() => navigate('/dashboard/promo')}
                    className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default EditPromoDashboard;
