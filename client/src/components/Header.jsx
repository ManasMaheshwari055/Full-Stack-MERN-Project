import React from 'react';
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function Header() {
    const {currentUser} = useSelector(state => state.user)
  return (
    <header className='bg-sky-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-sky-700'>Motor</span>
                    <span className='text-sky-900'>.</span>
                    <span className='text-sky-950'>Mart</span>
                </h1>
            </Link>
            <form className='bg-slate-50 p-3 rounded-lg flex items-center'>
                <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
                <img src="./search.png" alt="icon" className='h-6'/>
            </form>
            <ul className='flex gap-8'>
                <Link to='/'>
                    <li className='hidden sm:inline text-sky-950 hover:underline cursor-pointer'>Home</li>
                </Link>
                <Link to='/about'>
                    <li className='hidden sm:inline text-sky-950 hover:underline cursor-pointer'>About</li>
                </Link>
                <Link to='/profile'>
                {currentUser ? (
                    <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="profile" />
                ): (
                    <li className='text-sky-950 hover:underline cursor-pointer'>Sign In</li> 
                )}
                </Link>
            </ul>
        </div>
    </header>
  )
}
