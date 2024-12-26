import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Loader from '../../components/Common/Loader';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Signed in
          let user = {};
          if (userCredential.user.email === '37abdurahmonov07@gmail.com') {
            user = { ...userCredential.user, role: 'admin' };
          } else {
            user = { ...userCredential.user, role: 'worker' };
          }
          localStorage.setItem('user', JSON.stringify(user));
        }
      );
      window.location.href = '/';
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  return (
    <div className='flex-1 relative z-10 justify-center items-center flex'>
      <form className='w-[400px] p-4 mx-auto' onSubmit={handleSubmit}>
        <div className='mb-5'>
          <label
            htmlFor='email'
            className='block mb-2 text-lg font-medium text-white'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border text-lg rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none font-regular'
            required
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='password'
            className='block mb-2 text-lg font-medium text-white'
          >
            Parol
          </label>
          <input
            type='text'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border text-lg outline-none rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 font-regular'
            required
          />
        </div>

        <button
          type='submit'
          className='text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'
        >
          Kirish
        </button>
      </form>
    </div>
  );
};
