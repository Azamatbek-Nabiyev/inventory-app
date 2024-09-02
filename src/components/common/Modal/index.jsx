import React from 'react';
import ReactDOM from 'react-dom';

export default ({ children, handleModal }) => {
  const modalRoot = document.getElementById('modal-root');

  return ReactDOM.createPortal(
    <div
      className={`absolute top-0 left-0 w-full h-full z-40 flex justify-center items-center backdrop-blur-sm bg-white/2`}
    >
      <div className='relative bg-gray-700 rounded-lg shadow-2xl w-auto h-auto'>
        {children}
        <button
          onClick={handleModal}
          type='button'
          className='absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 '
          data-modal-hide='popup-modal'
        >
          <svg
            className='w-4 h-4'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
            />
          </svg>
          <span className='sr-only'>Close modal</span>
        </button>
      </div>
    </div>,
    modalRoot
  );
};
