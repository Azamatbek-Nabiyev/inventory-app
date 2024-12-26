import React, { useEffect, useState } from 'react';
import Header from '../../components/Common/Header';
import { motion } from 'framer-motion';
import Textarea from '../../components/Form/Textarea';
import LoadingButton from '../../components/Form/LoadingButton';
import Filter from './Filter';
import ImageModal from '../../components/Common/ImageModal';
import Modal from '../../components/Common/Modal';
import ProductList from './ProductList';
import Loader from '../../components/Common/Loader';
import { collection, getDocs, addDoc, setDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default () => {
  const navigate = useNavigate();
  const [imageModal, setImageModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [calcData, setCalcData] = useState([]);
  const [filteredData, setFilteredData] = useState();
  const [description, setDescription] = useState('');

  const handleModal = (itm) => {
    setImageModal(true);
    setModalData(itm);
  };

  const handleFilterCategory = (e) => {
    setFilteredData(
      data?.length > 0 && data.filter((itm) => itm.category == e.target.value)
    );
  };

  const onSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = data.filter((product) =>
      product.title.toLowerCase().includes(term)
    );

    setFilteredData(filtered);
  };

  const handleCloseModal = () => setImageModal(false);

  const handleProductItem = (item) => {
    let isThere = calcData.find((itm) => itm.id === item.id);
    if (!isThere)
      setCalcData([
        ...calcData,
        { ...item, soldPrice: item.price, soldQuantity: 1 },
      ]);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      setData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
      setFilteredData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdatedQuantityPrice = (e, id) => {
    setCalcData(
      calcData.map((product) => {
        if (product.id == id) {
          return { ...product, [e.target.name]: Number(e.target.value) };
        }
        return product;
      })
    );
  };

  const handleFormSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      // update old product

      const updateOldProductsPromises = calcData.map((product) => {
        return setDoc(doc(db, 'products', product.id), {
          title: product.title,
          price: product.price,
          quantity: product.quantity - product.soldQuantity,
          category: product.category,
          description: product.description,
          image: product.image,
        });
      });

      // add product to transaction collection
      const addProductsPromises = calcData.map((product) => {
        return addDoc(collection(db, 'transactions'), {
          category: product.category,
          description: description,
          price: product.price,
          soldPrice: product.soldPrice,
          quantity: product.quantity,
          soldQuantity: product.soldQuantity,
          image: product.image,
          title: product.title,
          date: new Date(),
          createdDate: product.createdDate,
          status: 2,
        });
      });

      await Promise.all([addProductsPromises, updateOldProductsPromises]);
      setCalcData([]);
      toast.success('Tovar sotildi!');
      navigate('/');
    } catch (err) {
      console.log(err);
      toast.success('Tovar sotishda xatolik!');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      {imageModal && (
        <Modal handleModal={handleCloseModal}>
          <ImageModal data={modalData} />
        </Modal>
      )}
      <Header title='Tovar sotish' />

      <main className='max-w-[1450px] mx-auto py-6 px-4 lg:px-8 h-[90%]'>
        {data?.length > 0 ? (
          <motion.form
            onSubmit={handleFormSubmit}
            className='bg-gray-800 bg-opacity-50 w-full backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8 min-h-[700px]'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Filter
              onCategoryChange={handleFilterCategory}
              onSearchChange={onSearchChange}
            />
            <div className='w-full flex gap-2 relative'>
              <ProductList
                handleModal={handleModal}
                data={filteredData}
                handleProductItem={handleProductItem}
              />

              <div className='w-6/12 flex flex-col max-h-[450px] overflow-x-auto'>
                {calcData?.length > 0 &&
                  calcData.map((item, idx) => {
                    return (
                      // Map calculated product
                      <div
                        key={idx + 1}
                        className='border-gray-700 border-t-[1px] h-[80px] p-2 border-solid flex justify-between border my-2 rounded-sm cursor-pointer'
                      >
                        <div className='flex flex-row h-full gap-4'>
                          <img
                            onClick={() => handleModal(item)}
                            className='object-cover rounded-md h-full w-[100px]'
                            src={item?.image}
                            alt=''
                          />
                          <span className='font-regular text-lg'>
                            {item.title}
                          </span>
                        </div>
                        <div className='flex justify-between flex-col'>
                          <div className='flex gap-4 justify-end'>
                            <span className='text-lg font-regular'>
                              Sotilgan miqdor:{' '}
                            </span>
                            <input
                              name='soldQuantity'
                              value={item.soldQuantity}
                              onChange={(e) =>
                                handleUpdatedQuantityPrice(e, item.id)
                              }
                              type='text'
                              className='w-20 outline-none px-2 text-right font-regular bg-[#36404F]'
                            />
                          </div>
                          <div className='flex gap-4 justify-end'>
                            <span className='text-lg font-regular'>
                              Sotilgan narx
                            </span>
                            <input
                              value={item.soldPrice}
                              name='soldPrice'
                              onChange={(e) =>
                                handleUpdatedQuantityPrice(e, item.id)
                              }
                              type='text'
                              className='w-20 outline-none text-right px-2 font-regular bg-[#36404F]'
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className='flex mt-4 gap-10 absolute bottom-5 left-6 w-11/12'>
              <Textarea
                className='w-[670px]'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <LoadingButton className='self-end' type='submit' />
            </div>
          </motion.form>
        ) : (
          <div className='h-full flex justify-center items-center flex-col gap-5'>
            <p className='text-2xl font-semibold'>
              Avval tovar qo'shishingiz kerak
            </p>
            <Link to='/stock-in'>
              <button className='font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 inline-flex items-center cursor-pointer h-14'>
                Qo'shish
              </button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};
