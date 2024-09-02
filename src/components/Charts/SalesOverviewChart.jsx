import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';

const salesData = [
  { name: 'Iyul', sales: 50 },
  { name: 'Avg', sales: 100 },
  { name: 'Sen', sales: 150 },
  { name: 'Okt', sales: 50 },
  { name: 'Noy', sales: 250 },
  { name: 'Dek', sales: 300 },
  { name: 'Yan', sales: 350 },
  { name: 'Feb', sales: 400 },
  { name: 'Mar', sales: 380 },
  { name: 'Apr', sales: 300 },
  { name: 'May', sales: 500 },
  { name: 'Iyun', sales: 600 },
];

const SalesOverviewChart = () => {
  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className='text-xl font-medium mb-4 text-gray-100'>
        Tovarlar sotilish grafiki
      </h2>

      <div className='h-80'>
        <ResponsiveContainer width={'100%'} height={'100%'}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
            <XAxis dataKey={'name'} stroke='#9ca3af' />
            <YAxis stroke='#9ca3af' />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(31, 41, 55, 0.8)',
                borderColor: '#4B5563',
              }}
              itemStyle={{ color: '#E5E7EB' }}
            />
            <Line
              type='monotone'
              dataKey='sales'
              stroke='#6366F1'
              strokeWidth={3}
              dot={{ fill: '#6366F1', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
export default SalesOverviewChart;