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
      </div>
    </div>
  );
}
