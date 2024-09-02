import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

export default ({ label, value, setDate }) => {
  return (
    <>
      {label?.length > 0 && (
        <label className='block mb-2 text-lg font-medium text-white'>
          {label}
        </label>
      )}
      <DatePicker
        value={value}
        dateFormat='yyyy/MM/dd'
        selected={value}
        onChange={(date) => setDate(date)}
        className='border outline-none text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white'
      />
    </>
  );
};
