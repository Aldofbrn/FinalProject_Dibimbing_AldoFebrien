import React, { useEffect, useState } from 'react';
import { API_KEY } from '../api/config';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Banner from '../../components/Banner';
import { useParams } from 'react-router-dom';

const PromoDetail = () => {
  const [dataOffer, setDataOffer] = useState({});
  const { id } = useParams();

  const handleDataOffer = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };
    axios
      .get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${id}`,
        config
      )
      .then((res) => {
        setDataOffer(res.data.data);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    if (id) {
      handleDataOffer();
    }
  }, [id]);

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-primary via-tertiary to-primary text-white">
        <Navbar />
        <div className="container mx-auto py-24 px-4 md:px-12">
          {/* Hero Section */}
          <div className="relative mb-16">
            {dataOffer.imageUrl && (
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src={dataOffer.imageUrl}
                  alt={dataOffer.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>
            )}
            <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-5xl font-extrabold drop-shadow-md">
                  {dataOffer.title || 'Promo Details'}
                </h1>
                <p className="mt-4 text-lg font-medium">
                  Code:{' '}
                  <span className="bg-yellow-400 text-black px-2 py-1 rounded-md">
                    {dataOffer.promo_code || 'N/A'}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Promo Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-xl shadow-2xl p-8 text-gray-800">
            {/* Left Column */}
            <div>
              <h2 className="text-3xl font-bold text-indigo-600 mb-4">
                About the Promo
              </h2>
              <p className="text-lg mb-6">
                {dataOffer.description || 'No description provided.'}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-medium text-gray-600">
                    Minimum Claim Price:
                  </span>
                  <span className="text-2xl font-bold text-green-500">
                    {dataOffer.minimum_claim_price || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-medium text-gray-600">
                    Discount Price:
                  </span>
                  <span className="text-2xl font-bold text-red-500">
                    {dataOffer.promo_discount_price || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-bold text-indigo-600">
                Terms & Conditions
              </h2>
              <p className="text-gray-600">
                {dataOffer.terms_condition ||
                  'No terms and conditions provided.'}
              </p>
              <button className="mt-auto px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-purple-500 hover:to-indigo-500 transition duration-300">
                Claim this Offer
              </button>
            </div>
          </div>
        </div>

        {/* Creative Footer */}
        <Banner />
        <Footer />
      </section>
    </>
  );
};

export default PromoDetail;
