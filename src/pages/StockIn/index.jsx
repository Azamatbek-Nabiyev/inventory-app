import React, { useState } from 'react';
import Header from '../../components/Common/Header';
import { motion } from 'framer-motion';
import Datepicker from '../../components/Form/Datepicker';
import Switch from '../../components/Form/Switch';
import Textarea from '../../components/Form/Textarea';
import Input from '../../components/Form/Input';
import LoadingButton from '../../components/Form/LoadingButton';
import { categories } from './data';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../../config/firebase';
import { toast } from 'react-toastify';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import imageCompression from 'browser-image-compression';

export default () => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(1);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [imageFile, setImageFile] = useState(null);

  const handleImageUpload = async (file) => {
    // Image compression options
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);

      // Upload image to Firebase Storage
      const storageRef = ref(storage, `products/${compressedFile.name}`);
      await uploadBytes(storageRef, compressedFile);

      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      let imageUrl = '';
      // Upload image if a file is selected
      if (imageFile) {
        imageUrl = await handleImageUpload(imageFile);
      }

      // add product
      await addDoc(collection(db, 'products'), {
        category: Number(category),
        description,
        price: Number(price),
        quantity: Number(quantity),
        title,
        createdDate: date,
        image: imageUrl,
      });

      // add transaction
      await addDoc(collection(db, 'transactions'), {
        title,
        price: Number(price),
        quantity: Number(quantity),
        category: Number(category),
        date,
        createdDate: date,
        description,
        status: 1,
        image: imageUrl,
      });
      toast.success("Tovar qo'shildi!");

      // reset form fields
      setCategory(1);
      setDescription('');
      setPrice(0);
      setQuantity(0);
      setTitle('');
      setDate(new Date());
      setImageFile(null);
    } catch (err) {
      console.log(err);
      toast.error("Tovar qo'shishda xatolik!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title="Tovar qo'shish" />

      <main className='max-w-[1450px] mx-auto py-6 px-4 lg:px-8'>
        <motion.form
          onSubmit={handleSubmit}
          className='bg-gray-800 bg-opacity-50 w-full backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className='text-2xl font-semibold text-gray-100 mb-6'>
            Do'konga kelgan tovarlarni qo'shing{' '}
          </h2>
          <div className='flex justify-evenly gap-5'>
            <div className='mb-5 w-96'>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label='Nomi'
              />
            </div>
            <div className='mb-5 w-96'>
              <Input
                label='Narxi'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className='mb-5 w-96'>
              <Input
                label='Miqdori'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>
          <div className='flex justify-evenly gap-5'>
            <div className='mb-5 w-96'>
              <Switch
                onChange={(e) => setCategory(e.target.value)}
                options={categories}
                label='Kategoriya'
              />
            </div>
            <div className='mb-5 w-96'>
              <Datepicker value={date} setDate={setDate} label='Sana' />
            </div>
            <div className='mb-5 w-96'>
              <label
                class='block mb-2 text-lg font-medium text-white'
                for='file_input'
              >
                Rasm yuklang
              </label>
              <input
                class='block w-full text-lg border rounded-lg cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400 p-2'
                id='file_input'
                type='file'
                accept='image/*'
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </div>
          </div>
          <div className='flex justify-start pl-9 gap-5'>
            <div className='mb-5 w-96'>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                label='Izoh'
              />
            </div>
          </div>
          <div className='flex justify-end pr-7 mt-10'>
            <LoadingButton loading={loading} type='submit' />
          </div>
        </motion.form>
      </main>
    </div>
  );
};
