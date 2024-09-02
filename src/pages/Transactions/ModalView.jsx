import moment from 'moment';
import React from 'react';
import { categories, productStatus } from '../../constants/statuses';

export default function ModalView({ data, buttonColor, handleImageModal }) {
  console.log(data);
  const formattedDate = data.date
    ? moment(data.date.seconds * 1000).format('YYYY/MM/DD')
    : '...';
  const formattedCreatedDate = data.createdDate
    ? moment(data.createdDate.seconds * 1000).format('YYYY/MM/DD')
    : '...';

  return (
    <div className='p-10'>
      <h3 className='mb-5 text-2xl font-semibold text-white text-center'>
        Tranzaksiya haqida to'liq ma'lumot
      </h3>
      <ul className='grid gap-6 md:grid-cols-2'>
        <li className='min-w-80 w-auto p-5 border rounded-lg cursor-pointer hover:text-gray-300 border-gray-700 peer-checked:text-blue-500  text-gray-400 bg-gray-800'>
          <p className='w-full text-lg font-semibold'>Nomi</p>
          <p className='w-full font-medium text-white text-base'>
            {data.title}
          </p>
        </li>
        <li className='min-w-80 w-auto p-5 border rounded-lg cursor-pointer hover:text-gray-300 border-gray-700 peer-checked:text-blue-500  text-gray-400 bg-gray-800'>
          <p className='w-full text-lg font-semibold'>
            {data.status == 2 ? 'Sotilgan miqdor' : 'Miqdor'}
          </p>
          <p
            className='w-full font-medium text-base'
            style={{
              color:
                data.status == 2
                  ? '#EC4899'
                  : data.status == 3
                  ? '#F59E0B'
                  : '#10B981',
            }}
          >
            {data.status == 2 ? `-${data.soldQuantity}` : `+${data.quantity}`}
          </p>
        </li>
        <li className='min-w-80 w-auto p-5 border rounded-lg cursor-pointer hover:text-gray-300 border-gray-700 peer-checked:text-blue-500  text-gray-400 bg-gray-800'>
          <p className='w-full text-lg font-semibold'>Narxi</p>
          <p className='w-full font-medium text-white text-base'>
            {data.price}
          </p>
        </li>
        <li className='min-w-80 w-auto p-5 border rounded-lg cursor-pointer hover:text-gray-300 border-gray-700 peer-checked:text-blue-500  text-gray-400 bg-gray-800'>
          <p className='w-full text-lg font-semibold'>Sotilgan narxi</p>
          <p className='w-full font-medium text-white text-base'>
            {data?.soldPrice}
          </p>
        </li>
        <li className='min-w-80 w-auto p-5 border rounded-lg cursor-pointer hover:text-gray-300 border-gray-700 peer-checked:text-blue-500  text-gray-400 bg-gray-800'>
          <p className='w-full text-lg font-semibold'>Tranzaksiya sanasi</p>
          <p className='w-full font-medium text-white text-base'>
            {formattedDate}
          </p>
        </li>
        <li className='min-w-80 w-auto p-5 border rounded-lg cursor-pointer hover:text-gray-300 border-gray-700 peer-checked:text-blue-500  text-gray-400 bg-gray-800'>
          <p className='w-full text-lg font-semibold'>Yaratilgan sana</p>
          <p className='w-full font-medium text-white text-base'>
            {formattedCreatedDate}
          </p>
        </li>
        <li className='min-w-80 w-auto p-5 border rounded-lg cursor-pointer hover:text-gray-300 border-gray-700 peer-checked:text-blue-500  text-gray-400 bg-gray-800'>
          <p className='w-full text-lg font-semibold'>Kategoriya</p>
          <p className='w-full font-medium text-white text-base'>
            {categories[data.category]}
          </p>
        </li>
        <li className='min-w-80 w-auto p-5 border rounded-lg cursor-pointer hover:text-gray-300 border-gray-700 peer-checked:text-blue-500  text-gray-400 bg-gray-800'>
          <p className='w-full text-lg font-semibold'>Sotuvchi</p>
          <p className='w-full font-medium text-white text-base'>admin</p>
        </li>
        <li className='min-w-80 w-auto p-5 border rounded-lg cursor-pointer hover:text-gray-300 border-gray-700 peer-checked:text-blue-500  text-gray-400 bg-gray-800'>
          <p className='w-full text-lg font-semibold'>Rasm</p>
          <img
            src={data?.image}
            alt=''
            onClick={handleImageModal}
            className='w-[100px] h-[60px] object-cover rounded-sm'
          />
        </li>
        <li className='min-w-80 w-auto p-5 border rounded-lg cursor-pointer hover:text-gray-300 border-gray-700 peer-checked:text-blue-500  text-gray-400 bg-gray-800'>
          <p className='w-full text-lg font-semibold'>Holati</p>
          <div className='w-full font-medium text-white'>
            <button
              type='button'
              className={`px-4 py-1 mt-1 text-base font-medium text-center text-white rounded-lg focus:outline-none`}
              style={{
                backgroundColor: buttonColor,
                borderColor: buttonColor,
                boxShadow: `0 0 0 2px ${buttonColor}`,
              }}
            >
              {productStatus[data.status]}
            </button>
          </div>
        </li>
        <li className='min-w-80 w-auto p-5 border rounded-lg cursor-pointer hover:text-gray-300 border-gray-700 peer-checked:text-blue-500  text-gray-400 bg-gray-800'>
          <p className='w-full text-lg font-semibold'>Izoh</p>
          <p className='w-full font-medium text-white text-base'>
            {data.description}
          </p>
        </li>
      </ul>
    </div>
  );
}
