import axios from 'axios';
import { getCookie } from 'cookies-next';
import { createContext, useEffect, useState } from 'react';
import { API_KEY } from '../Pages/api/config';

export const AllUserContext = createContext();

const AllUserContextProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState([]);
  const handleDataUser = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
        apiKey: API_KEY,
      },
    };
    axios
      .get(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user',
        config
      )
      .then((res) => {
        setAllUsers(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <AllUserContext.Provider value={{ allUsers, handleDataUser }}>
      {children}
    </AllUserContext.Provider>
  );
};
export default AllUserContextProvider;
