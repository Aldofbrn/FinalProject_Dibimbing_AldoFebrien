import React, { useContext, useEffect, useState } from 'react';
import { TransactionContext } from '../../../Context/TransactionContext';
import Sidebar from '../../../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const TransactionDashboard = () => {
  const navigate = useNavigate();
  const { allTransaction, handleAllTransaction } =
    useContext(TransactionContext);

  // Pagination State
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 6,
    totalPage: 0,
  });

  // State to store the sorting option
  const [sortOption, setSortOption] = useState('all');

  const allPage = () => {
    setPagination({
      ...pagination,
      totalPage: Math.ceil(allTransaction.length / pagination.perPage),
    });
  };

  const firstIndexData =
    pagination.page * pagination.perPage - pagination.perPage;
  const lastIndexData = pagination.page * pagination.perPage;

  // Sorting function
  const sortedTransactions = () => {
    let sorted = [...allTransaction];

    if (sortOption !== 'all') {
      sorted = sorted.filter(
        (transaction) => transaction.status === sortOption
      );
    }

    return sorted.slice(firstIndexData, lastIndexData);
  };

  const dataPage = sortedTransactions();

  const handleNext = () => {
    setPagination({
      ...pagination,
      page: pagination.page + 1,
    });
  };

  const handleBack = () => {
    setPagination({
      ...pagination,
      page: pagination.page - 1,
    });
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setPagination({ ...pagination, page: 1 }); // Reset to first page when sorting changes
  };

  useEffect(() => {
    handleAllTransaction();
  }, [pagination.totalPage]);

  useEffect(() => {
    allPage();
  }, [allTransaction]);

  // Function to conditionally style the status text
  const getStatusStyle = (status) => {
    switch (status) {
      case 'success':
        return 'text-green-500 font-semibold'; // Green for success
      case 'failed':
        return 'text-red-500 font-semibold'; // Red for failed
      case 'cancelled':
        return 'text-gray-300 font-semibold'; // Gray for canceled
      case 'pending':
        return 'text-yellow-500 font-semibold'; // Yellow for pending
      default:
        return 'text-gray-500 font-semibold'; // Default gray if status is unknown
    }
  };
  // Edit User
  const editTransaction = (transactionId) => {
    navigate(`/dashboard/transaction/editTransaction/${transactionId}`);
  };

  return (
    <section className="bg-gray-100 min-h-screen p-6">
      <Sidebar />

      {/* Title */}
      <h1 className="text-3xl font-bold text-left text-gray-800 mb-6">
        Transaction List
      </h1>

      {/* Sorting Dropdown */}
      <div className="mb-4">
        <label htmlFor="sort" className="text-gray-700 mr-2">
          Sort by Status:
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={handleSortChange}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value="all">All</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
          <option value="cancelled">Cancelled</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Transaction Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dataPage.map((user, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition"
          >
            <div className="flex items-center mb-4">
              <img
                src={user.payment_method.imageUrl}
                alt={user.payment_method.name}
                className="w-18 h-16 object-cover mr-4"
              />
              <div>
                <p className="text-lg font-semibold">
                  {user.payment_method.name}
                </p>
                <p className="text-sm text-gray-600">Payment Method</p>
              </div>
            </div>

            <div className="mt-2">
              <h2 className="text-xl font-bold text-gray-800">
                {user.invoiceId}
              </h2>
              <p className="text-gray-700">
                Date: {new Date(user.orderDate).toLocaleDateString()}
              </p>
              {/* Status with Conditional Styling */}
              <p className={`text-gray-700 ${getStatusStyle(user.status)}`}>
                Status: {user.status}
              </p>
              <p className="text-gray-700 font-semibold mt-2">
                Total: Rp {user.totalAmount.toLocaleString('id-ID')}
              </p>
            </div>

            <button
              onClick={() => editTransaction(user.id)}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Change Status
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 gap-4 items-center">
        <button
          onClick={handleBack}
          disabled={pagination.page === 1}
          className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="text-lg">
          Page {pagination.page} of {pagination.totalPage}
        </span>
        <button
          onClick={handleNext}
          disabled={pagination.page === pagination.totalPage}
          className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default TransactionDashboard;
