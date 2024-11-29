import React from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import { API_KEY } from '../api/config';
import { handleDataBannerRedux } from '../../Store/bannerSlice';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../Context/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import haikeiCircle from '../../assets/haikeiCircle.svg';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dataBanner } = useSelector((state) => state.banner);
  const { user } = useContext(UserContext);

  const handleDataBanner = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };
    axios
      .get(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners',
        config
      )
      .then((res) => {
        dispatch(handleDataBannerRedux(res.data.data));
      })
      .catch((err) => console.log(err.response));
  };
  useEffect(() => {
    handleDataBanner();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${haikeiCircle})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Sidebar />

      <main className="flex flex-col md:flex-row items-center justify-center h-screen container font-poppins text-slate-100">
        <div className=" rounded-xl backdrop-blur-2xl">
          <h1 className="text-2xl font-bold text-center font-casser md:text-5xl">
            Hello {user.name}
          </h1>
          <p className="mt-2 text-center md:text-lg">
            Welcome to your dashboard! Here you can manage your account, view
            analytics, and track your progress. Explore the various sections to
            stay updated with all the latest information.
          </p>
        </div>
        <img
          src="dashboardimg1.svg"
          alt="dashboard image"
          className="object-cover w-[500px]"
        />
      </main>
    </div>
  );
};

export default Dashboard;
