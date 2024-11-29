import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { API_KEY } from '../Pages/api/config';

export const BannerContext = createContext();

const BannerContextProvider = ({ children }) => {
  const [dataBanner, setDataBanner] = useState([]);

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
      .then((res) => setDataBanner(res.data.data))
      .catch((err) => console.log(err.response));
  };
  return (
    <BannerContext.Provider value={{ dataBanner, handleDataBanner }}>
      {children}
    </BannerContext.Provider>
  );
};

export default BannerContextProvider;
