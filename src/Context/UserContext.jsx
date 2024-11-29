import { API_KEY } from '../Pages/api/config';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { createContext, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const handleUser = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };

    axios
      .get(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user',
        config
      )
      .then((res) => setUser(res.data.data))
      .catch((err) => console.log(err));
  };
  return (
    <UserContext.Provider value={{ user, setUser, handleUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
