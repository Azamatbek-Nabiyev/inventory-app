import React from 'react';
import Input from '../../components/Form/Input';
import Textarea from '../../components/Form/Textarea';
import Datepicker from '../../components/Form/Datepicker';
import Switch from '../../components/Form/Switch';
import LoadingButton from '../../components/Form/LoadingButton';
import { categories } from './data';

export default function UpdateModal({
  data,
  handleUpdateInput,
  handleSubmit,
  loading,
  handleImageModal,
}) {
  return (
    <form className='p-10' onSubmit={handleSubmit}>
      <h3 className='mb-5 text-2xl font-semibold text-white text-center'>
        Tovarni yangilash
      </h3>
      <ul className='grid gap-6 md:grid-cols-2'>
        <li className='min-w-80 w-auto p-5 border rounded-lg cursor-pointer hover:text-gray-300 border-gray-700 peer-checked:text-blue-500  text-gray-400 bg-gray-800'>
          <p className='w-full text-lg font-semibold'>Nomi</p>
          <Input name='title' onChange={handleUpdateInput} value={data.title} />
        </li>
        <li className='min-w-80 w-auto p-5 border rounded-lg cursor-pointer hover:text-gray-300 border-gray-700 peer-checked:text-blue-500  text-gray-400 bg-gray-800'>
          <p className='w-full text-lg font-semibold'>Narxi</p>
          <Input name='price' onChange={handleUpdateInput} value={data.price} />
        </li>
        <li className='min-w-80 w-auto p-5 border rounded-lg cursor-pointer hover:text-gray-300 border-gray-700 peer-checked:text-blue-500  text-gray-400 bg-gray-800'>
          <p className='w-full text-lg font-semibold'>Miqdori</p>
          <Input
            name='quantity'
            onChange={handleUpdateInput}
            value={data.quantity}
          />
        </li>
        <li className='min-w-80 w-auto p-5 border rounded-lg cursor-pointer hover:text-gray-300 border-gray-700 peer-checked:text-blue-500  text-gray-400 bg-gray-800'>
          <p className='w-full text-lg font-semibold'>Kategoriya</p>
          <Switch
            className='h-[50px]'
            options={categories}
            name='category'
            value={data.category}
            onChange={handleUpdateInput}
          />
        </li>
        <li className='min-w-80 w-auto p-5 border rounded-lg cursor-pointer hover:text-gray-300 border-gray-700 peer-checked:text-blue-500  text-gray-400 bg-gray-800'>
          <p className='w-full text-lg font-semibold'>Olib kelingan vaqti</p>
          <Datepicker />
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
          <p className='w-full text-lg font-semibold'>Izoh</p>
          <Textarea
            required
            name='description'
            onChange={handleUpdateInput}
            value={data.description}
          />
        </li>
        <li className='min-w-80 w-auto p-5 flex justify-end'>
          <LoadingButton
            loading={loading}
            type='submit'
            className='text-white self-end'
          />
        </li>
      </ul>
    </form>
  );
}
