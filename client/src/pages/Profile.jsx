import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { updateUserSuccess, updateUserFailure, deleteUserSuccess, deleteUserFailure, signOutUserFailure, signOutUserSuccess } from '../redux/user/userSlice.js'
import { useDispatch } from 'react-redux';

export default function Profile() {
  const { currentUser } = useSelector(state => state.user)
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);  // Add error state
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    }
    catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);  // Reset error before submitting

    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      
      const data = await res.json();  // Parse response
      
      if (!res.ok) {
        setError(data.message || "Failed to update profile");
        dispatch(updateUserFailure(data.message || "Failed to update profile"));
        return;
      }
      
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);  
    } 
    catch (err) {
      setError(err.message); // Store error in state
      dispatch(updateUserFailure(err.message));
    }
  }

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/auth/signOut');
      const data = await res.json();
      if(data.success === false){
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } 
    catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
        <input 
          type="text" 
          placeholder='username' 
          defaultValue={currentUser.username}
          onChange={handleChange} 
          id='username' 
          className='border p-3 rounded-lg'
        />
        <input 
          type="email" 
          placeholder='email' 
          id='email' 
          defaultValue={currentUser.email}
          onChange={handleChange}
          className='border p-3 rounded-lg' 
        />
        <input 
          type="password" 
          placeholder='password'
          onChange={handleChange} 
          id='password' 
          className='border p-3 rounded-lg' 
        />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>update</button>
      </form>

      {error && <p className='text-red-700 mt-3 text-center'>{error}</p>}  {/* Display error message if exists */}
      <p className='text-green-700 text-center mt-3'>{updateSuccess ? 'Updated Successfully' : ''}</p>

      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>

    </div>
  )
}