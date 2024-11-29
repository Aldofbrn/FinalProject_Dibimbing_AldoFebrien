import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import Offers from '../../components/offers';
import Category from '../../components/Category';
import Activities from '../../components/Activities';
import Promos from '../../components/Promos';
import axios from 'axios';
import Banner from '../../components/Banner';
import AccordionHome from '../../components/Accordion';
import Footer from '../../components/Footer';

const Home = () => {
  const [category, setCategory] = useState([]);
  const [activities, setActivities] = useState([]);
  const [promos, setPromos] = useState([]);
  console.log(category);
  console.log(activities);
  console.log(promos);

  const getCategoryList = () => {
    axios
      .get(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories',
        {
          headers: {
            apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          },
        }
      )
      .then((res) => {
        console.log('Response:', res); // Logs the full response object
        setCategory(res.data.data);
      })
      .catch((err) => alert('error'));
  };

  const getActivityList = () => {
    axios
      .get(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities',
        {
          headers: {
            apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          },
        }
      )
      .then((res) => {
        console.log('Response:', res);
        setActivities(res.data.data);
      })
      .catch((err) => alert('error'));
  };
  const getPromoList = () => {
    axios
      .get(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos',
        {
          headers: {
            apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          },
        }
      )
      .then((res) => {
        console.log('Response:', res);
        setPromos(res.data.data);
      })
      .catch((err) => alert('error'));
  };

  useEffect(() => {
    getCategoryList();
    getActivityList();
    getPromoList();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Offers />
      <Category category={category} />
      <Activities activities={activities} />
      <Promos promos={promos} />
      <Banner />
      <AccordionHome />
      <Footer />
    </>
  );
};

export default Home;
