import { useState } from 'react';
import Modal from '../../components/Common/Modal';
import ModalView from './ModalView';
import { Eye } from 'lucide-react';
import {
  categories,
  productStatus,
  productStatusColor,
} from '../../constants/statuses';
import ImageModal from '../../components/Common/ImageModal';

export const TableBody = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageModal, setImageModal] = useState(false);

  const handleModal = () => setIsOpen(false);

  const buttonColor = productStatusColor[product.status];

  const handleImageModal = () => {
    setImageModal(!imageModal);
  };

  return (
    <>
      {isOpen && (
        <Modal handleModal={handleModal}>
          <ModalView
            buttonColor={buttonColor}
            data={product}
            handleImageModal={handleImageModal}
            handleModal={handleModal}
          />
        </Modal>
      )}
      {imageModal && (
        <Modal handleModal={handleImageModal}>
          <ImageModal data={product} />
        </Modal>
      )}
      <td className='px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-300 flex gap-2 items-center'>
        <img
          src={product?.image}
          alt='Product img'
          className='size-10 rounded-full object-cover'
        />
        {product.title}
      </td>

      <td className='px-6 py-4 whitespace-nowrap text-lg text-gray-300'>
        {categories[product.category]}
      </td>

      <td className='px-6 py-4 whitespace-nowrap text-lg text-gray-300'>
        {product.price}
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-lg text-gray-300'>
        <button
          type='button'
          className={`px-4 py-1 text-lg font-medium text-center text-white rounded-sm focus:outline-none w-[140px]`}
          style={{
            backgroundColor: buttonColor,
            borderColor: buttonColor,
            boxShadow: `0 0 0 2px ${buttonColor}`,
          }}
        >
          {productStatus[product.status]}
        </button>
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-lg text-gray-300'>
        <button
          onClick={() => setIsOpen(true)}
          className='text-red-400 hover:text-red-300'
        >
          <Eye size={20} />
        </button>
      </td>
    </>
  );
};
