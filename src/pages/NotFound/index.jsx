import React from 'react';
import './style.css';

export default () => {
  return (
    <div className='relative z-10 font-semibold flex justify-center items-center w-full'>
      <div>
        <h1 className='text-4xl'>Bunday sahifa yo'q</h1>
        <p className='zoom-area text-3xl'>
          <b>Siz</b> qidirgan sahifa majvud emas{' '}
        </p>
        <section className='error-container'>
          <span>4</span>
          <span>
            <span className='screen-reader-text'>0</span>
          </span>
          <span>4</span>
        </section>
      </div>
    </div>
  );
};
