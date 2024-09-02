import React from 'react';

export default ({ label, className, value, onChange, name, required }) => {
  return (
    <>
      {label?.length > 0 && (
        <label
          htmlFor='message'
          className='block mb-2 text-lg font-medium text-white'
        >
          {label}
        </label>
      )}
      <textarea
        value={value}
        id='message'
        rows='4'
        required={required}
        name={name}
        onChange={onChange}
        className={`border outline-none text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white font-regular ${className}`}
        placeholder='Izoh yozing...'
      ></textarea>
    </>
  );
};
