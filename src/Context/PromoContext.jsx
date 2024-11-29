import axios from 'axios';
import { Children, createContext, useState } from 'react';
import { API_KEY } from '../Pages/api/config';

export const PromoContext = createContext();

const PromoContextProvider = ({ children }) => {
  const [dataPromo, setDataPromo] = useState([]);
  const handleDataPromo = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };
    axios
      .get(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos',
        config
      )
      .then((res) => {
        setDataPromo(res.data.data);
      })
      .catch((err) => console.log(err.response));
  };
  return (
    <PromoContext.Provider value={{ dataPromo, handleDataPromo }}>
      {children}
    </PromoContext.Provider>
  );
};

export default PromoContextProvider;
