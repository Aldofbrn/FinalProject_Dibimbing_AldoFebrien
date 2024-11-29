import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getCookie } from 'cookies-next';
import { API_KEY } from '../../api/config';

const UserProfile = () => {
  const [dataUser, setDataUser] = useState({});
  const [image, setImage] = useState(null);
  const [dataImage, setDataImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

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
      .then((res) => setDataUser(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setDataUser({ ...dataUser, [e.target.name]: e.target.value });
    setIsEditing(true); // Set editing state to true
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Generate preview URL
      setFileName(file.name);
      setIsEditing(true);
    }
  };

  const handleUploadImage = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };
    const payload = new FormData();
    payload.append('image', image);

    axios
      .post(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image',
        payload,
        config
      )
      .then((res) => {
        const uploadedImageUrl = res.data.url;
        setDataImage(uploadedImageUrl); // Store the image URL from the response

        // Immediately update the user's profile picture in the local state
        setDataUser((prevData) => ({
          ...prevData,
          profilePictureUrl: uploadedImageUrl,
        }));
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: dataUser.name,
      email: dataUser.email,
      profilePictureUrl: dataImage || dataUser.profilePictureUrl,
      phoneNumber: dataUser.phoneNumber,
    };
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };
    axios
      .post(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile',
        payload,
        config
      )
      .then((res) => {
        toast.success('Update Successful', {
          position: 'top-center',
          autoClose: 2000,
          theme: 'dark',
          transition: Bounce,
        });
        // Update the local state to reflect the changes
        setDataUser({
          ...dataUser,
          name: res.data.name,
          email: res.data.email,
          profilePictureUrl: res.data.profilePictureUrl,
          phoneNumber: res.data.phoneNumber,
        });

        setIsEditing(false); // Reset the editing state
        setFileName('');
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = () => {
    setImage(null);
    setPreviewImage(null);
    setFileName('');
    setIsEditing(false);
    handleUser(); // Reset user data to the original state
  };

  useEffect(() => {
    handleUser();
  }, []);

  useEffect(() => {
    if (image) {
      handleUploadImage();
    }
  }, [image]);

  const dataInput = [
    {
      id: 1,
      label: 'Name',
      name: 'name',
      type: 'text',
      value: dataUser.name,
    },
    {
      id: 2,
      label: 'Email',
      name: 'email',
      type: 'email',
      value: dataUser.email,
    },
    {
      id: 3,
      label: 'Role',
      name: 'role',
      type: 'text',
      value: dataUser.role,
    },
    {
      id: 4,
      label: 'Phone Number',
      name: 'phoneNumber',
      type: 'number',
      value: dataUser.phoneNumber,
    },
  ];

  return (
    <>
      <section>
        <Navbar />
        <div className="container my-36">
          <div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-8 px-6 py-8 mx-auto bg-white border shadow-sm max-w-lg sm:max-w-xl md:max-w-3xl rounded-lg shadow-slate-300 md:grid md:grid-cols-2 md:items-start"
            >
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center gap-4">
                <img
                  src={previewImage || dataUser.profilePictureUrl}
                  alt={dataUser.name}
                  className="object-cover w-32 h-32 rounded-lg aspect-square shadow-md"
                />
                <input
                  id="profilePicture"
                  type="file"
                  onChange={handleChangeImage}
                  className="hidden"
                />
                <div className="px-4 py-2 mt-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow w-full flex flex-col   gap-2 justify-between items-center">
                  {fileName ? (
                    <span className="text-center line-clamp-1">
                      File: {fileName}
                    </span>
                  ) : (
                    <span className="text-gray-500 italic">
                      No file selected
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById('profilePicture').click()
                    }
                    className="px-3 py-1 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Change profile picture
                  </button>
                </div>
              </div>

              {/* Input Fields Section */}
              <div className="w-full space-y-4 md:space-y-6">
                {dataInput.map((item) => (
                  <div key={item.id} className="flex flex-col gap-2">
                    <label
                      htmlFor={item.name}
                      className="font-medium text-gray-700"
                    >
                      {item.label}
                    </label>
                    <input
                      id={item.name}
                      disabled={item.name === 'role'}
                      type={item.type}
                      name={item.name}
                      value={item.value}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg text-gray-800 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-200"
                    />
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="self-end w-full col-span-2 flex justify-center gap-4">
                {isEditing && (
                  <>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
                    >
                      Save Changes
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>

        <Footer />
      </section>
    </>
  );
};

export default UserProfile;
