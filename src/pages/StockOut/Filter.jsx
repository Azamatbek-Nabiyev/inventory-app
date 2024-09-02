import React from 'react';
import Switch from '../../components/Form/Switch';
import { categories } from './data';

export default function Filter({ onCategoryChange, onSearchChange }) {
  return (
    <div className='flex justify-start gap-5 items-center mb-4'>
      <div className='w-[250px]'>
        <Switch onChange={onCategoryChange} options={categories} />
      </div>
      <div className='flex items-center w-[400px]'>
        <input
          onChange={onSearchChange}
          type='text'
          placeholder='Tovar nomini yozing...'
          className='border text-lg rounded-lg block w-full p-2.5 font-regular bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 h-[45px] outline-none'
        />
        {/* <button
          type='submit'
          className='p-2.5 ms-2 text-lg font-medium rounded-lg border focus:ring-4 focus:outline-none  bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'
        >
          <svg
            className='w-4 h-4'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
            />
          </svg>
        </button> */}
      </div>
    </div>
  );
}
