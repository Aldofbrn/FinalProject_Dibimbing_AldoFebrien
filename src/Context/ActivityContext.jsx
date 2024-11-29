import axios from 'axios';
import { createContext, useState } from 'react';
import { API_KEY } from '../Pages/api/config';

export const ActivityContext = createContext();

const ActivityContextProvider = ({ children }) => {
  const [dataActivity, setDataActivity] = useState([]);

  const handleDataActivity = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    axios
      .get(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities',
        config
      )
      .then((res) => {
        setDataActivity(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <ActivityContext.Provider value={{ dataActivity, handleDataActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};

export default ActivityContextProvider;
