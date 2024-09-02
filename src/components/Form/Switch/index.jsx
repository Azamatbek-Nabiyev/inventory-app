import React from 'react';

export default ({ label, className, options, onChange, value, name }) => {
  return (
    <>
      {label?.length > 0 && (
        <label
          htmlFor='countries'
          className='block mb-2 text-lg font-medium text-white'
        >
          {label}
        </label>
      )}
      <select
        name={name}
        onChange={onChange}
        defaultValue={options?.length > 0 && value}
        id='countries'
        className={`border outline-none text-lg rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white  focus:border-blue-500 font-regular ${className}`}
      >
        {options?.length > 0 &&
          options.map((option, idx) => (
            <option key={idx + 1} value={option.value}>
              {option.title}
            </option>
          ))}
      </select>
    </>
  );
};
