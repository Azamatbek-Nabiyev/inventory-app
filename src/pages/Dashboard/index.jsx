import { BarChart2, ShoppingBag, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

import Header from '../../components/Common/Header';
import StatCard from '../../components/Common/StatCard';
import SalesOverviewChart from '../../components/Charts/SalesOverviewChart';
import CategoryDistributionChart from '../../components/Charts/CategoryDistributionChart';
import SalesChannelChart from '../../components/Charts/SalesChannelChart';

const OverviewPage = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Dashbord' />

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Oylik kirim (so'm)"
            icon={Zap}
            value='29,012,345'
            iconColor='#6366F1'
            textColor='#f5f5f5'
          />
          <StatCard
            name='Jami sotilgan tovar'
            icon={Users}
            value='1,234'
            textColor='#f5f5f5'
            iconColor='#8B5CF6'
          />
          <StatCard
            name='Jami tovarlar'
            icon={ShoppingBag}
            textColor='#f5f5f5'
            value='567'
            iconColor='#EC4899'
          />
          <StatCard
            name='Savdo foizi (Joriy oy)'
            icon={BarChart2}
            value='+12.5%'
            iconColor='#10B981'
            textColor='#10B981'
          />
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <SalesOverviewChart />
          <CategoryDistributionChart />
          <SalesChannelChart />
        </div>
      </main>
    </div>
  );
};
export default OverviewPage;
