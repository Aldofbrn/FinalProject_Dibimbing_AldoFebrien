import axios from 'axios';
import { getCookie } from 'cookies-next';
import { createContext, useEffect, useState } from 'react';
import { API_KEY } from '../Pages/api/config';

export const TransactionContext = createContext();

const TransactionContextProvider = ({ children }) => {
  const [allTransaction, setAllTransaction] = useState([]);
  const handleAllTransaction = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };
    axios
      .get(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-transactions',
        config
      )
      .then((res) => {
        setAllTransaction(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <TransactionContext.Provider
      value={{ allTransaction, handleAllTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContextProvider;
