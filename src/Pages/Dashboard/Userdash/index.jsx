import React, { useContext, useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { AllUserContext } from '../../../Context/AllUsersContext';
import Sidebar from '../../../components/Sidebar';
import haikeiBlob2 from '../../../assets/haikeiBlob2.svg';
import axios from 'axios';

const UsersDashboard = () => {
  const { allUsers, handleDataUser } = useContext(AllUserContext);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 6,
    totalPage: 0,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isSorted, setIsSorted] = useState(false);
  const [roles, setRoles] = useState({});
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const apiKey = '24405e01-fbc1-45a5-9f5a-be13afcd757c';
  const authToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjI4NDgzODl9.Yblw19ySKtguk-25Iw_4kBKPfqcNqKWx9gjf505DIAk';

  useEffect(() => {
    handleDataUser();
  }, []);

  useEffect(() => {
    setFilteredUsers(allUsers);
  }, [allUsers]);

  useEffect(() => {
    setPagination({
      ...pagination,
      totalPage: Math.ceil(filteredUsers.length / pagination.perPage),
    });
  }, [filteredUsers, pagination.perPage]);

  const handleNext = () => {
    if (pagination.page < pagination.totalPage) {
      setPagination({ ...pagination, page: pagination.page + 1 });
    }
  };

  const handleBack = () => {
    if (pagination.page > 1) {
      setPagination({ ...pagination, page: pagination.page - 1 });
    }
  };

  const handleFirstPage = () => {
    setPagination({ ...pagination, page: 1 });
  };

  const handleLastPage = () => {
    setPagination({ ...pagination, page: pagination.totalPage });
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = allUsers.filter((user) =>
      user.name.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
    setPagination({ ...pagination, page: 1 });
  };

  const handleSort = () => {
    const sortedUsers = [...filteredUsers].sort((a, b) =>
      isSorted
        ? allUsers.indexOf(a) - allUsers.indexOf(b)
        : a.name.localeCompare(b.name)
    );
    setFilteredUsers(sortedUsers);
    setIsSorted(!isSorted);
  };

  const handleOpenRoleModal = (userId, currentRole) => {
    setSelectedUser(userId);
    setSelectedRole(currentRole);
    setShowRoleModal(true);
  };

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setShowRoleModal(false);
    setShowConfirmModal(true);
  };

  const handleConfirmRoleChange = async () => {
    try {
      const response = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${selectedUser}`,
        { role: selectedRole },
        {
          headers: {
            apiKey: apiKey,
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      alert(`Role updated to ${selectedRole}`);
      setRoles((prev) => ({ ...prev, [selectedUser]: selectedRole }));
      setShowConfirmModal(false);
    } catch (error) {
      alert('Failed to update role.');
    }
  };

  const indexFirstUser =
    pagination.page * pagination.perPage - pagination.perPage;
  const indexLastUser = pagination.page * pagination.perPage;
  const dataPage = filteredUsers.slice(indexFirstUser, indexLastUser);

  const userStats = {
    total: filteredUsers.length,
    admins: filteredUsers.filter(
      (user) => (roles[user.id] || user.role) === 'admin'
    ).length,
    users: filteredUsers.filter(
      (user) => (roles[user.id] || user.role) === 'user'
    ).length,
  };

  return (
    <>
      <section
        style={{
          backgroundImage: `url(${haikeiBlob2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      >
        <div className="container mx-auto px-4 py-6">
          <Sidebar />
          <div className="py-10 text-center">
            <h1 className="text-8xl font-bold font-[yellowtail] text-center text-orange-900">
              Miles
            </h1>
            <h1 className="text-6xl font-extrabold text-orange-800">
              Users Dashboard
            </h1>
            <div className="mt-4 flex justify-center gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search Users"
                className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                onClick={handleSort}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 focus:outline-none"
              >
                {isSorted ? 'Reset Sort' : 'Sort by Name'}
              </button>
            </div>
          </div>

          {/* User Stats Box */}
          <div className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 rounded-lg shadow-lg p-6 mb-6 text-white">
            <h2 className="text-xl font-semibold mb-4">User Statistics</h2>
            <div className="flex gap-6">
              <div className="flex-1">
                <p className="text-lg font-semibold">Total Users</p>
                <p className="text-xl">{userStats.total}</p>
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold">Admins</p>
                <p className="text-xl">{userStats.admins}</p>
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold">Users</p>
                <p className="text-xl">{userStats.users}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {dataPage.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-all"
              >
                <img
                  src={user.profilePictureUrl || ''}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-600">Email: {user.email}</p>
                <p className="text-sm text-gray-600">
                  Role: {roles[user.id] || user.role}
                </p>
                <button
                  onClick={() =>
                    handleOpenRoleModal(user.id, roles[user.id] || user.role)
                  }
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
                >
                  Change Role
                </button>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row justify-center mt-6 gap-4 items-center">
            <button
              onClick={handleFirstPage}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition w-full sm:w-auto"
            >
              First
            </button>
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition w-full sm:w-auto"
            >
              Previous
            </button>
            <span className="text-lg w-full sm:w-auto text-center sm:text-left">
              Page {pagination.page} of {pagination.totalPage}
            </span>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition w-full sm:w-auto"
            >
              Next
            </button>
            <button
              onClick={handleLastPage}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition w-full sm:w-auto"
            >
              Last
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default UsersDashboard;
