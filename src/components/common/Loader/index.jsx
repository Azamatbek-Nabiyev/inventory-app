import React from 'react';
import ReactDOM from 'react-dom';

export default () => {
  const loaderRoot = document.getElementById('loader-root');
  return ReactDOM.createPortal(
    <div className='absolute top-0 left-0 w-full h-full z-40 flex justify-center items-center backdrop-blur-sm bg-white/2'>
      <div className='loader'></div>
    </div>,
    loaderRoot
  );
};
