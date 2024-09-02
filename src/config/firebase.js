import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC8EC6GUI4brXo99E0xm0wP-lU-HEW9Lc4',
  authDomain: 'store-6f1c6.firebaseapp.com',
  projectId: 'store-6f1c6',
  storageBucket: 'store-6f1c6.appspot.com',
  messagingSenderId: '885475247740',
  appId: '1:885475247740:web:83b0da5381a3d49c3eebf9',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
