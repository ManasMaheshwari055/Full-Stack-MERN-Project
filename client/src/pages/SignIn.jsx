import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
  };
  console.log(formData);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 font-medium'>
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button className='bg-sky-950 text-sky-50 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign In</button>
      </form>
      <div className='flex gap-2 mt-3'>
        <p>Do not have an account ?</p>
        <Link to="/sign-up">
          <span className='text-blue-900 hover:underline'>Sign Up</span>
        </Link>
      </div>
    </div>
  )
}
