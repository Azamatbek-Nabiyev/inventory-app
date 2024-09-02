import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';

const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'];

const MOSTSOLD = [
  { name: 'IELTS roadmap', value: 220 },
  { name: 'Multi level', value: 180 },
  { name: 'Fizika', value: 175 },
  { name: 'Matematik', value: 160 },
  { name: 'A20 chexol', value: 160 },
  { name: 'Quloqchin', value: 145 },
  { name: 'Tajvid ilmi', value: 140 },
  { name: 'Ruchka', value: 130 },
  { name: 'Qalam', value: 120 },
  { name: 'Atom odatlari', value: 120 },
];

const SalesChannelChart = () => {
  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className='text-xl font-medium mb-4 text-gray-100'>
        Top 10 ta eng ko'p sotilayotgan tovarlar
      </h2>

      <div className='h-80'>
        <ResponsiveContainer>
          <BarChart data={MOSTSOLD}>
            <CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
            <XAxis dataKey='name' stroke='#9CA3AF' />
            <YAxis stroke='#9CA3AF' />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(31, 41, 55, 0.8)',
                borderColor: '#4B5563',
              }}
              itemStyle={{ color: '#E5E7EB' }}
            />
            <Legend />
            <Bar dataKey={'value'} fill='#8884d8'>
              {MOSTSOLD.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
export default SalesChannelChart;
