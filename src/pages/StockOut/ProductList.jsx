import React from 'react';

export default function ProductList({ data, handleModal, handleProductItem }) {
  return (
    <div className='w-6/12 flex flex-col max-h-[450px] overflow-x-auto'>
      {data?.length > 0 &&
        data.map((itm, idx) => {
          return (
            <div
              key={idx + 1}
              className='border-gray-700 border-t-[1px] h-[80px] p-2 border-solid flex justify-between border my-2 rounded-sm hover:bg-[#374151] cursor-pointer transition-all'
            >
              <div className='flex flex-row h-full gap-4 w-4/12'>
                <img
                  className='object-cover rounded-md h-full w-[100px]'
                  src={`${itm.image}`}
                  onClick={() => handleModal(itm)}
                  alt=''
                />
                <div className='flex flex-col justify-between'>
                  <p className='font-regular text-lg'>Nomi:</p>
                  <p className='font-regular text-lg'>Miqdori:</p>
                </div>
              </div>
              <div
                className='flex justify-between items-end flex-col w-8/12'
                onClick={() => handleProductItem(itm)}
              >
                <p>
                  <span className='font-regular text-lg'>{itm.title}</span>
                </p>
                <p>
                  <span className='font-regular text-lg'>{itm.quantity}</span>
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
