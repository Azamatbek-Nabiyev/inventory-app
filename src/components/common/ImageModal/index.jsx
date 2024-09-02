import React from 'react';

export default ({ data }) => {
  return (
    <div className='w-[500px] h-[500px] overflow-auto border'>
      <img className='object-contain w-full h-full' src={data?.image} alt='' />
    </div>
  );
};
