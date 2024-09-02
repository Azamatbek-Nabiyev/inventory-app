import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import Modal from '../../components/common/Modal';
import DeleteModal from './DeleteModal';
import UpdateModal from './UpdateModal';
import { doc, deleteDoc, collection, addDoc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { toast } from 'react-toastify';
import ImageModal from '../../components/common/ImageModal';

export const TableBody = ({ product, fetchData }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [updatedData, setUpdatedData] = useState(product);
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [date, setDate] = useState(product.createdDate);

  const handleDeleteModal = () => setDeleteModal(false);
  const handleUpdateModal = () => setUpdateModal(false);

  const handleDeleteProduct = async () => {
    setDelLoading(true);
    try {
      // delete product
      await deleteDoc(doc(db, 'products', product.id));
      setDeleteModal(false);

      // add transaction
      await addDoc(collection(db, 'transactions'), {
        ...product,
        date: new Date(),
        status: 4,
      });

      toast.success("Tovar o'chirildi!");

      // fetch products
      await fetchData();
    } catch (err) {
      console.log(err);
      toast.error("Tovarni o'chirishda xatolik!");
    } finally {
      setDelLoading(false);
    }
  };

  const handleUpdateInput = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // update product
      await setDoc(doc(db, 'products', product.id), updatedData);
      // add product to transactions collection
      await addDoc(collection(db, 'transactions'), {
        ...updatedData,
        status: 3,
        date: new Date(),
      });
      setUpdateModal(false);
      toast.success('Tovar yangilandi!');

      // fetch updated products
      await fetchData();
    } catch (err) {
      console.log(err);
      toast.error('Tovar yangilashda xatolik!');
    } finally {
      setLoading(false);
    }
  };

  const handleImageModal = () => setImageModal(!imageModal);
  return (
    <>
      {deleteModal && (
        <Modal handleModal={handleDeleteModal}>
          <DeleteModal
            loading={delLoading}
            handleDeleteProduct={handleDeleteProduct}
            handleModal={handleDeleteModal}
          />
        </Modal>
      )}
      {imageModal && (
        <Modal handleModal={handleImageModal}>
          <ImageModal data={product} />
        </Modal>
      )}
      {updateModal && (
        <Modal handleModal={handleUpdateModal}>
          <UpdateModal
            loading={loading}
            data={updatedData}
            handleSubmit={handleSubmit}
            handleUpdateInput={handleUpdateInput}
            handleModal={handleUpdateModal}
            setDate={setDate}
            date={date}
            handleImageModal={handleImageModal}
          />
        </Modal>
      )}
      <td className='px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-100 flex gap-2 items-center'>
        <img
          src={product?.image}
          alt='Product img'
          className='size-10 rounded-full object-cover'
        />
        {product.title}
      </td>

      <td className='px-6 py-4 whitespace-nowrap text-lg text-gray-300 font-medium'>
        {product.price}
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-lg text-gray-300 font-medium'>
        {product.quantity}
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-lg text-gray-300'>
        <button className='text-indigo-400 hover:text-indigo-300 mr-2'>
          <Edit onClick={() => setUpdateModal(true)} size={20} />
        </button>
        <button
          onClick={() => setDeleteModal(true)}
          className='text-red-400 hover:text-red-300'
        >
          <Trash2 size={20} />
        </button>
      </td>
    </>
  );
};
