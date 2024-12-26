import { motion } from 'framer-motion';

export default ({ tableTitle, TableBody, tableHeader, data }) => {
  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-semibold text-gray-100'>{tableTitle}</h2>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-700'>
          <thead>
            <tr>
              {tableHeader?.length > 0 &&
                tableHeader.map((item, idx) => {
                  return (
                    <th
                      key={idx + 1}
                      className='px-6 py-3 text-left text-lg text-gray-400 uppercase tracking-wider font-medium'
                    >
                      {item}
                    </th>
                  );
                })}
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-700'>
            {data?.length > 0 &&
              data.map((product, idx) => (
                <motion.tr
                  key={idx + 1}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <TableBody product={product} />
                </motion.tr>
              ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
