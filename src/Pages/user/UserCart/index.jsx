import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../Context/CartContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_KEY } from '../../api/config';
import { getCookie } from 'cookies-next';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Banner from '../../../components/Banner';
import { FaTrash } from 'react-icons/fa6';
import haikeiBlob2 from '../../../assets/haikeiBlob2.svg';

const UserCart = () => {
  const { dataCart, handleDataCart } = useContext(CartContext);
  console.log(dataCart);

  // const handleCartQuantity = (id, action) => {
  //   const config = {
  //     headers: {
  //       apiKey: API_KEY,
  //       Authorization: `Bearer ${getCookie('token')}`,
  //     },
  //   };

  //   const itemCart = dataCart.find((item) => item.id === id);
  //   const updateQty =
  //     action === 'add' ? itemCart.quantity + 1 : itemCart.quantity - 1;

  //   const payload = {
  //     quantity: updateQty,
  //   };

  //   axios
  //     .post(
  //       `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-cart/${itemCart.id}`,
  //       payload,
  //       config
  //     )
  //     .then((res) => {
  //       // Update the quantity in the local state without altering the order
  //       const updatedCart = dataCart.map((item) =>
  //         item.id === id ? { ...item, quantity: updateQty } : item
  //       );
  //       handleDataCart(updatedCart); // You can pass updatedCart here to preserve the order
  //     })
  //     .catch((err) => console.log(err));
  // };
  const updateCartQuantity = (id, newQuantity) => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };

    const payload = { quantity: newQuantity };

    axios
      .post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-cart/${id}`,
        payload,
        config
      )
      .then(() => {
        const updatedCart = dataCart.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        );
        handleDataCart([...updatedCart]);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteCart = (id) => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };

    axios
      .delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-cart/${id}`,
        config
      )
      .then((res) => {
        const updatedCart = dataCart.filter((item) => item.id !== id);
        handleDataCart(updatedCart); // Ensure the cart is updated after deletion
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleDataCart(); // Initial data load
  }, []);

  // Calculate the subtotal for each item
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
    <section
      style={{
        backgroundImage: `url(${haikeiBlob2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100%',
        width: '100%',
      }}
    >
      <Navbar />
      <div className="container  py-24 md:py-40">
        <div className="mb-2">
          <h1 className="text-3xl text-black font-bold border-l-8 border-primary">
            Ready to Check Out? Review Your Items Below
          </h1>
        </div>

        {/* Display "Cart is empty" message if dataCart is empty */}
        {dataCart.length === 0 ? (
          <div className=" flex items-center justify-center mt-8 h-[400px] rounded-xl bg-gray-500/30 backdrop-blur-xl">
            <h1 className="text-center text-5xl font-semibold">
              Your cart is empty. Add some items to your cart to proceed!
            </h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:gap-0 md:grid-cols-2">
            <div className="p-2">
              {dataCart.map((item, index) => {
                const originalPrice = item.activity.price;
                const discountedPrice = item.activity.price_discount;
                const discountPercentage = Math.round(
                  ((originalPrice - discountedPrice) / originalPrice) * 100
                );
                const subtotal = calculateSubtotal(item);

                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-2 gap-2 rounded-lg shadow-xl bg-white border-4 border-primary my-2"
                  >
                    <div className="w-full h-48 overflow-hidden relative group">
                      <img
                        src={item.activity.imageUrls}
                        alt={item.activity.title}
                        className="w-full h-full object-cover ease-in-out transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="py-4">
                      <h1 className="md:text-2xl font-bold">
                        {item.activity.title}
                      </h1>
                      <p className="text-xs md:text-sm text-gray-500 line-clamp-1">
                        {item.activity.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <p className="md:text-lg font-bold text-green-600">
                          Rp. {discountedPrice?.toLocaleString('id')}
                        </p>
                        <p className="text-sm md:text-sm line-through text-gray-500">
                          Rp. {originalPrice?.toLocaleString('id')}
                        </p>
                      </div>
                      <p className="text-xs text-red-500 font-medium">
                        Save {discountPercentage}%!
                      </p>
                      <div className="mt-4 flex items-center justify-between pr-2">
                        <div className="flex items-center">
                          <button
                            className="border rounded-full w-7 aspect-square shadow-lg active:shadow-none transition-shadow"
                            disabled={item.quantity === 1}
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity - 1)
                            }
                          >
                            -
                          </button>

                          <input
                            type="text"
                            pattern="[0-9]*"
                            className="w-8 text-center border-none p-0"
                            value={item.quantity}
                            min={1}
                            onChange={(e) => {
                              const newValue = e.target.value.replace(
                                /\D/g,
                                ''
                              );
                              updateCartQuantity(
                                item.id,
                                newValue === '' ? '' : parseInt(newValue, 10)
                              );
                            }}
                            onBlur={(e) => {
                              if (e.target.value === '') {
                                updateCartQuantity(item.id, 1);
                              }
                            }}
                          />

                          <button
                            className="border rounded-full w-7 aspect-square shadow-lg active:shadow-none transition-shadow"
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                        <div>
                          <button
                            onClick={() => handleDeleteCart(item.id)}
                            className="flex gap-2 items-center py-2 px-3 bg-red-500/80 hover:bg-red-600 transition-all duration-300 rounded-lg shadow-lg active:shadow-none"
                          >
                            <FaTrash />{' '}
                            <span className="hidden md:block">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center items-start pt-6">
              <div className="bg-gray-400/30 md:w-8/12 p-4 rounded-xl border border-primary backdrop-blur-lg">
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
                    <span>
                      Rp. {calculateGrandTotal().toLocaleString('id')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center mt-4">
                  <Link to="/user/UserCart/CheckOutCart">
                    <button className="py-2 px-2 bg-blue-500 rounded-xl w-full shadow-lg hover:bg-primary transition-all duration-300 hover:text-white font-semibold">
                      Proceed to Checkout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </section>
  );
};

export default UserCart;
