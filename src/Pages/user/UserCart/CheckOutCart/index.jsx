import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { API_KEY } from '../../../api/config';
import { Link } from 'react-router-dom';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import { toast } from 'react-toastify';
import { getCookie } from 'cookies-next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../../../Context/CartContext';

const CheckOutCart = () => {
  const navigate = useNavigate();
  const { dataCart, handleDataCart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [transaction, setTransaction] = useState({
    cartIds: [],
    paymentMethodId: '',
  });

  const handlePaymentMethod = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };
    axios
      .get(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/payment-methods',
        config
      )
      .then((res) => {
        setPaymentMethod(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateTransaction = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };
    const payload = {
      cartIds: dataCart.map((item) => item.id),
      paymentMethodId: transaction.paymentMethodId,
    };

    axios
      .post(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-transaction',
        payload,
        config
      )
      .then((res) => {
        toast.success('Transaction Success', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        setTimeout(() => {
          navigate('/user/UserTransaction');
        }, 2000);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    handleDataCart();
    handlePaymentMethod();
  }, []);

  const calculateSubtotal = (item) => {
    const price = item.activity.price_discount;
    const quantity = item.quantity;
    return price * quantity;
  };

  // Calculate the grand total by summing up all item subtotals
  const calculateGrandTotal = () => {
    return dataCart.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  return (
    <>
      <Navbar />
      <section className="container">
        <h1 className="text-black text-4xl text-center font-semibold pt-24">
          {' '}
          Complete Your Payment and Confirm Your Order
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border rounded-xl border-primary justify-center items-start py-6 my-6">
          {/* Summary Section in the First Column */}
          <div className="w-full p-8 rounded-xl ">
            <h2 className="space-x-2 text-2xl font-bold text-center">
              Summary <br />
              <span className="text-sm font-normal">
                🛒You have purchased {dataCart.length} Products🛒
              </span>
            </h2>
            <div className="mt-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Item</span>
                <span>Subtotal</span>
              </div>
              <hr className="my-2 border-tertiary" />
              {dataCart.map((item) => {
                const subtotal = calculateSubtotal(item);
                return (
                  <div
                    key={item.id}
                    className="flex justify-between gap-14 py-2"
                  >
                    <span className="font-bold">
                      {item.activity.title} x {item.quantity}
                    </span>
                    <span>Rp. {subtotal.toLocaleString('id')}</span>
                  </div>
                );
              })}
              <hr className="my-4 border-tertiary" />
              <div className="flex justify-between text-xl font-bold">
                <span>Grand Total</span>
                <span>Rp. {calculateGrandTotal().toLocaleString('id')}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Section in the Second Column */}
          <div className="w-full p-4">
            <h1 className="font-semibold text-xl mb-2 text-center md:text-left">
              Select a payment method
            </h1>
            <div className="grid grid-cols-1 gap-1">
              {paymentMethod.map((data, index) => (
                <div key={index} className="relative">
                  <input
                    type="radio"
                    id={data.name}
                    name="paymentMethodId"
                    value={data.id}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <label
                    htmlFor={data.name}
                    className="block w-full h-full aspect-w-1 aspect-h-1 p-5 shadow-lg rounded-lg cursor-pointer flex items-center justify-center gap-4"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="imgContainer">
                        <img
                          src={data.imageUrl}
                          alt={data.name}
                          className="h-12"
                        />
                      </div>
                    </div>
                    <div
                      className={`absolute top-2 right-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center ${
                        transaction.paymentMethodId === data.id
                          ? 'block'
                          : 'hidden'
                      }`}
                    >
                      <i className="text-white text-lg">✔</i>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* The second row with the 'Make a Payment' button */}
          <div className="w-full md:col-span-2 mb-4 p-2">
            <button
              className="py-2 px-2 bg-blue-500 rounded-xl w-full shadow-lg hover:bg-primary transition-all duration-300 hover:text-white font-semibold"
              onClick={handleCreateTransaction}
            >
              Make a payment
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CheckOutCart;
