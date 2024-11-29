import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ActivityContextProvider from './Context/ActivityContext.jsx';
import CartContextProvider from '../src/Context/CartContext.jsx';
import UserContextProvider from './Context/UserContext.jsx';
import CategoryContextProvider from './Context/CategoryContext.jsx';
import PromoContextProvider from './Context/PromoContext.jsx';
import BannerContextProvider from './Context/BannerContext.jsx';
import AllUserContextProvider from './Context/AllUsersContext.jsx';
import TransactionContextProvider from './Context/TransactionContext.jsx';
import { Provider } from 'react-redux';
import 'flowbite';
import 'flowbite/dist/flowbite.min.css';
import { store } from './Store';
import { Banner } from 'flowbite-react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <TransactionContextProvider>
          <AllUserContextProvider>
            <BannerContextProvider>
              <PromoContextProvider>
                <CategoryContextProvider>
                  <ActivityContextProvider>
                    <UserContextProvider>
                      <CartContextProvider>
                        <App />
                        <ToastContainer />
                      </CartContextProvider>
                    </UserContextProvider>
                  </ActivityContextProvider>
                </CategoryContextProvider>
              </PromoContextProvider>
            </BannerContextProvider>
          </AllUserContextProvider>
        </TransactionContextProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
