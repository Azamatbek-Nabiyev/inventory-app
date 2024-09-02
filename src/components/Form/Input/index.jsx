import React from 'react';

export default ({ label, value, onChange, name }) => {
  return (
    <>
      {label?.length > 0 && (
        <label className='block mb-2 text-lg font-medium text-white'>
          {label}
        </label>
      )}
      <input
        value={value}
        name={name}
        onChange={onChange}
        type='text'
        className='border outline-none text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white font-regular'
        required
      />
    </>
  );
};
