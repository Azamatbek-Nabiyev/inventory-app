import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Root from './root';

createRoot(document.getElementById('root')).render(
  <>
    <Root />
    <ToastContainer
      position='top-right'
      autoClose={3000}
      closeOnClick
      hideProgressBar
      limit={3}
      pauseOnHover
      theme='light'
    />
  </>
);
