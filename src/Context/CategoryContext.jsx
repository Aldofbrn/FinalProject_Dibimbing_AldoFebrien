import axios from 'axios';
import { createContext, useState } from 'react';
import { API_KEY } from '../Pages/api/config';

export const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
  const [dataCategory, setDataCategory] = useState([]);

  const handleDataCategory = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    axios
      .get(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories',
        config
      )
      .then((res) => setDataCategory(res.data.data))
      .catch((err) => console.log(err.response));
  };
  return (
    <CategoryContext.Provider value={{ dataCategory, handleDataCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
