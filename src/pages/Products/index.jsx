import { useEffect, useState } from 'react';
import Header from '../../components/Common/Header';
import ProductsTable from '../../components/Form/Table';
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
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastDocs, setLastDocs] = useState([]); // Track lastDocs for pagination
  const [page, setPage] = useState(1); // Current page number
  const [hasMore, setHasMore] = useState(true); // Track if more data is available
  const pageSize = 5; // Number of items per page

  const fetchData = async (pageNumber = 1) => {
    setLoading(true);
    try {
      let q = query(collection(db, 'products'), limit(pageSize));

      if (pageNumber > 1) {
        q = query(
          collection(db, 'products'),
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

      // Check if we have more data to fetch
      if (querySnapshot.docs.length < pageSize) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      // Store lastDoc if moving forward in pages
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
      <Header title='Tovarlar' />
      <main className='max-w-[1450px] mx-auto py-6 px-4 lg:px-8 h-[90%]'>
        {data.length > 0 ? (
          <>
            <ProductsTable
              data={data}
              tableHeader={tableHeader}
              TableBody={(props) => (
                <TableBody {...props} fetchData={fetchData} />
              )}
              tableTitle="Tovarlar ro'yxati"
              renderActions
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
