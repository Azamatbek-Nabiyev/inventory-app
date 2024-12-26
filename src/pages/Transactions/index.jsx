import { useEffect, useState } from 'react';
import Header from '../../components/Common/Header';
import ProductTable from '../../components/Form/Table';
import { tableHeader } from './data';
import { TableBody } from './TableBody';
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import Loader from '../../components/Common/Loader';
import LoadingButton from '../../components/Form/LoadingButton';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastDocs, setLastDocs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 5;

  const fetchData = async (pageNumber = 1) => {
    setLoading(true);
    try {
      let q = query(collection(db, 'transactions'), limit(pageSize));

      if (pageNumber > 1) {
        q = query(
          collection(db, 'transactions'),
          startAfter(lastDocs[pageNumber - 2]),
          limit(pageSize)
        );
      }

      const querySnapshot = await getDocs(q);
      const newData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData(newData);

      if (querySnapshot.docs.length < pageSize) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      if (pageNumber > lastDocs.length) {
        setLastDocs((prevDocs) => [
          ...prevDocs,
          querySnapshot.docs[querySnapshot.docs.length - 1],
        ]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  if (loading) return <Loader />;

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Tranzaksiyalar' />

      <main className='max-w-[1450px] mx-auto py-6 px-4 lg:px-8 h-[90%]'>
        {data.length > 0 ? (
          <>
            <ProductTable
              data={data}
              tableHeader={tableHeader}
              TableBody={TableBody}
              tableTitle='Sotilgan va sotib olingan tovarlar'
            />
            <div className='flex justify-end gap-4 mt-4'>
              <button
                disabled={page === 1}
                style={{ cursor: page === 1 ? 'not-allowed' : 'pointer' }}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className='font-medium rounded-lg text-lg px-5 py-1 text-center me-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 inline-flex items-center h-12'
              >
                <ChevronLeft size={25} /> Orqaga
              </button>
              <button
                disabled={!hasMore}
                style={{ cursor: !hasMore ? 'not-allowed' : 'pointer' }}
                onClick={() => setPage((prev) => prev + 1)}
                className='font-medium rounded-lg text-lg px-5 py-1 text-center me-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 inline-flex items-center cursor-pointer h-12'
              >
                Oldinga <ChevronRight size={25} />
              </button>
            </div>
          </>
        ) : (
          <div className='h-full flex justify-center items-center'>
            <p className='text-2xl font-semibold'>
              Hozircha tranzaksiyalar amalga oshirilmadi
            </p>
          </div>
        )}
      </main>
    </div>
  );
};
