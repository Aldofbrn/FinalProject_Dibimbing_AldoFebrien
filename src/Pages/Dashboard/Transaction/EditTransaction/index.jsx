import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { API_KEY } from '../../../api/config';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../../../components/Sidebar';

const EditTransactionDashboard = () => {
  const navigate = useNavigate();
  const [dataTransaction, setDataTransaction] = useState({});
  const [dataStatus, setDataStatus] = useState('');
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { id } = useParams();

  const handleDataTransaction = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };
    axios
      .get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/transaction/${id}`,
        config
      )
      .then((res) => {
        setDataTransaction(res.data.data);
        setDataStatus(res.data.data.status);
        setIsClient(true); // Set isClient to true when data is fetched
      })
      .catch((err) => {
        console.log(err.response || err);
      });
  };

  const cancelTransaction = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };
    const cancelPayload = {
      reason: 'Customer request', // Add reason if needed
    };
    axios
      .post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/cancel-transaction/${id}`,
        cancelPayload, // Sending cancel reason or other necessary fields
        config
      )
      .then((res) => {
        toast.info('Transaction cancelled', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        handleDataTransaction();
        setIsOpenCancel(false);
        navigate('/transaction');
      })
      .catch((err) => console.log(err.response || err));
  };

  const handleEditStatusTransaction = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };
    const payload = {
      status: dataStatus, // status is sent to update
    };
    axios
      .post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-transaction-status/${id}`,
        payload,
        config
      )
      .then((res) => {
        toast.success('Status updated successfully', {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        handleDataTransaction();
        setIsOpenUpdate(false);
        navigate('/transaction');
      })
      .catch((err) => console.log(err.response || err));
  };

  useEffect(() => {
    if (id) {
      handleDataTransaction();
    }
  }, [id]);

  if (!isClient) return null;

  return (
    <section className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-center text-black mb-8">
          Transaction Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-100 border border-gray-300 shadow-lg p-6 rounded-xl">
            <div className="mb-4">
              <label className="font-semibold">Invoice No.</label>
              <p>{dataTransaction.invoiceId}</p>
            </div>
            <div className="mb-4">
              <label className="font-semibold">Order Date</label>
              <p>{new Date(dataTransaction.orderDate).toLocaleDateString()}</p>
            </div>
            <div className="mb-4">
              <label className="font-semibold">Status</label>
              <p>{dataTransaction.status}</p>
            </div>
          </div>

          <div className="bg-slate-100 border border-gray-300 shadow-lg p-6 rounded-xl">
            <div className="flex flex-col justify-between h-full">
              <div className="mb-4">
                <label className="font-semibold">Transaction Image</label>
                {/* Add your image here */}
                <img
                  src={dataTransaction.imageUrl || 'default-image-url.jpg'}
                  alt="Transaction"
                  className="w-full h-48 object-cover rounded-lg mt-2"
                />
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => setIsOpenCancel(true)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Cancel Transaction
                </button>
                <button
                  onClick={() => setIsOpenUpdate(true)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cancel Transaction Modal */}
        {isOpenCancel && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="font-bold text-lg">
                Are you sure you want to cancel this transaction?
              </h3>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={cancelTransaction}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Yes, Cancel
                </button>
                <button
                  onClick={() => setIsOpenCancel(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                >
                  No, Keep
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Update Status Modal */}
        {isOpenUpdate && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="font-bold text-lg">
                Choose the new status for this transaction
              </h3>
              <select
                value={dataStatus}
                onChange={(e) => setDataStatus(e.target.value)}
                className="select w-full mt-4 p-2 border rounded-lg"
              >
                <option value="success">Success</option>
                <option value="failed">Failed</option>
              </select>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleEditStatusTransaction}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Update Status
                </button>
                <button
                  onClick={() => setIsOpenUpdate(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EditTransactionDashboard;
