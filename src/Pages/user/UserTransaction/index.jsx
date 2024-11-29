import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { API_KEY } from '../../api/config';
import { getCookie } from 'cookies-next';
import { toast, Bounce } from 'react-toastify';

const UserTransaction = () => {
  const [dataTransaction, setDataTransaction] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState({}); // Tracks which dropdowns are open
  const [uploadedPhotos, setUploadedPhotos] = useState({}); // Tracks uploaded photos
  const [file, setFile] = useState(null);
  const [dataUpload, setDataUpload] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false); // State for showing upload photo modal
  const [showCancelModal, setShowCancelModal] = useState(false); // State for showing cancel transaction modal
  const [transactionIdToCancel, setTransactionIdToCancel] = useState(null); // Transaction ID to cancel
  const [currentTransactionId, setCurrentTransactionId] = useState(null); // To track the current transaction ID for photo upload
  const [sortOrder, setSortOrder] = useState('desc'); // State to track sort order

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set number of items per page
  console.log(dataTransaction);

  // Function to sort transactions by date
  const sortTransactions = (order) => {
    const sortedData = [...dataTransaction].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return order === 'desc' ? dateB - dateA : dateA - dateB;
    });
    setDataTransaction(sortedData);
    setSortOrder(order); // Set the selected order
  };

  const handleDataTransaction = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };
    axios
      .get(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/my-transactions',
        config
      )
      .then((res) => {
        setDataTransaction(res.data.data);
      })
      .catch((err) => console.log(err.response));
  };

  // Calculate the index for pagination
  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
  const currentTransactions = dataTransaction.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const totalPages = Math.ceil(dataTransaction.length / itemsPerPage);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };
    const payload = new FormData();
    payload.append('image', file);

    axios
      .post(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image',
        payload,
        config
      )
      .then((res) => {
        setDataUpload(res.data.url); // save the uploaded photo URL
        setUploadedPhotos((prev) => ({
          ...prev,
          [currentTransactionId]: res.data.url, // Link the uploaded photo to the current transaction ID
        }));
        setShowUploadModal(false); // Close the modal after successful upload
      })
      .catch((err) => {
        toast.error('File is too large', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Bounce,
        });
        console.log(err);
      });
  };

  const handleUploadImage = (id) => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };
    const payload = {
      proofPaymentUrl: dataUpload,
    };
    axios
      .post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-transaction-proof-payment/${id}`,
        payload,
        config
      )
      .then((res) => {
        toast.success('Upload Success', {
          position: 'center-top',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        handleDataTransaction();
        setShowUploadModal(false);
      })
      .catch((err) => console.log(err));
  };

  const handleCancelTransaction = (id) => {
    const dataTransactionDetail = dataTransaction.find(
      (item) => item.id === id
    );
    if (dataTransactionDetail.status !== 'pending') {
      toast.warning('Just pending transaction can be cancelled', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      return;
    }

    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };
    axios
      .post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/cancel-transaction/${id}`,
        null,
        config
      )
      .then((res) => {
        toast.info('Transaction cancelled', {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        // Update the status of the canceled transaction in state
        setDataTransaction((prevData) =>
          prevData.map((transaction) =>
            transaction.id === id
              ? { ...transaction, status: 'canceled' }
              : transaction
          )
        );
        setShowCancelModal(false);
      })
      .catch((err) => console.log(err));
  };

  const handleDeletePhoto = (id) => {
    setUploadedPhotos((prev) => {
      const newPhotos = { ...prev };
      delete newPhotos[id];
      return newPhotos;
    });
  };

  useEffect(() => {
    handleDataTransaction();
  }, [currentPage]);

  // Handle pagination change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleDropdown = (id) => {
    setDropdownOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openUploadModal = (id) => {
    setCurrentTransactionId(id); // Set the current transaction ID to track which one to upload
    setShowUploadModal(true);
  };

  const openCancelModal = (id) => {
    setTransactionIdToCancel(id);
    setShowCancelModal(true);
  };

  return (
    <div>
      <Navbar />
      <div className="mt-40 container min-h-[500px]">
        <h1 className="font-bold text-5xl text-black mb-4">
          User Transactions
        </h1>
        <div className="mb-6">
          <label
            htmlFor="sortOptions"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Sort Transactions :
          </label>
          <select
            id="sortOptions"
            onChange={(e) => sortTransactions(e.target.value)} // Pass selected value
            value={sortOrder} // Sync dropdown with current sortOrder
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all font-semibold"
          >
            <option value="desc">Most Recent</option>
            <option value="asc">Oldest</option>
          </select>
        </div>
        {dataTransaction.map((data) => (
          <div
            key={data.id}
            className="mb-6 bg-gray-100 rounded-md shadow-xl p-4"
          >
            {/* Transaction Header */}
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-xl text-black">
                Invoice: {data.invoiceId}
              </h2>
              <button
                onClick={() => toggleDropdown(data.id)}
                className="text-blue-500 hover:underline"
              >
                {dropdownOpen[data.id] ? 'Hide Details' : 'View Details'}
              </button>
            </div>

            {/* Collapsible Content */}
            {dropdownOpen[data.id] && (
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                {/* First Column: List of Items */}
                <div className="space-y-4">
                  {data.transaction_items.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-2 gap-1 border-4 border-gray-300  rounded-md hover:bg-gray-200 transition-all duration-300"
                    >
                      {/* Image */}
                      <div className="w-full max-h-28 rounded-sm overflow-hidden">
                        <img
                          src={item.imageUrls}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Details */}
                      <div className="content-center">
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-xs md:text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                        <p className=" text-xs md:text-sm text-gray-600">
                          Price: Rp.{' '}
                          {item.price_discount.toLocaleString('id-ID')}
                        </p>
                        <p className="text-sm font-semibold">
                          Total: Rp.{' '}
                          {(item.quantity * item.price_discount).toLocaleString(
                            'id-ID'
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Second Column: Summary */}
                <div className="border border-gray-300 p-4 rounded-md bg-white">
                  <div className="mb-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-bold text-2xl">Summary</h3>
                        <h3 className="mb-2">
                          Transaction date:{' '}
                          {new Date(data.createdAt).toISOString().split('T')[0]}
                        </h3>
                      </div>
                      <img src={data.payment_method.imageUrl} />
                    </div>

                    <p className="mt-2 text-md font-semibold text-gray-400">
                      Total Items: {data.transaction_items.length}
                    </p>
                    <p className="mt-1 text-xl font-bold">
                      Total Price: Rp.{' '}
                      {data.transaction_items
                        .reduce(
                          (acc, item) =>
                            acc + item.quantity * item.price_discount,
                          0
                        )
                        .toLocaleString('id-ID')}
                    </p>
                    <p
                      className={`text-xl font-bold ${
                        data.status === 'pending'
                          ? 'text-red-500'
                          : data.status === 'cancelled'
                          ? 'text-orange-500' // Orange color when cancelled
                          : 'text-green-500' // Green color for other statuses
                      }`}
                    >
                      Status: <span className="uppercase">{data.status}</span>
                    </p>
                  </div>
                  <div className="flex flex-col">
                    {/* Upload Photo Section */}
                    <div className="mt-4">
                      {uploadedPhotos[data.id] ? (
                        <div className="mb-4 flex gap-2">
                          <img
                            src={uploadedPhotos[data.id]}
                            alt="Uploaded"
                            className="w-3/4 h-36 object-cover rounded-md"
                          />
                          <button
                            onClick={() => handleDeletePhoto(data.id)}
                            className="mt-2 text-red-500 hover:underline transition-all duration-300"
                          >
                            Delete Photo
                          </button>
                        </div>
                      ) : data.status !== 'cancelled' ? ( // Check if transaction status is not 'canceled'
                        <div className="flex items-center justify-center h-36 bg-gray-100 rounded-md">
                          <button
                            onClick={() => openUploadModal(data.id)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-primary font-semibold transition-all duration-300"
                          >
                            Upload Payment Proof
                          </button>
                        </div>
                      ) : null}
                    </div>

                    {/* Cancel Transaction Button */}
                    {data.status === 'pending' && (
                      <button
                        onClick={() => openCancelModal(data.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-800 font-semibold transition-all duration-300"
                      >
                        Cancel Transaction
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div className="flex justify-center my-6">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white py-2 px-6 rounded-md mr-2 disabled:opacity-50 hover:bg-blue-600"
          >
            Previous
          </button>
          <span className="text-lg self-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-blue-500 text-white py-2 px-6 rounded-md ml-2 disabled:opacity-50 hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-xl">
            <h3 className="font-semibold text-xl">Upload Payment Proof</h3>
            <input
              type="file"
              onChange={handleChange}
              className="mt-4 p-2 border border-gray-300"
            />
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setShowUploadModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-xl">
            <h3 className="font-semibold text-xl">Cancel Transaction</h3>
            <p className="mt-4 text-gray-700">
              Are you sure you want to cancel this transaction?
            </p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setShowCancelModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                No
              </button>
              <button
                onClick={() => handleCancelTransaction(transactionIdToCancel)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default UserTransaction;
