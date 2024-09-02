import { Menu } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ADMIN_ROUTES, WORKER_ROUTES } from './data';
import { useAuth } from '../../../context/AuthContext';

export default () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const pathname = location.pathname;
  const { user } = useAuth();

  const routes = {
    admin: ADMIN_ROUTES,
    worker: WORKER_ROUTES,
  };

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? 'w-80' : 'w-20'
      }`}
      animate={{ width: isSidebarOpen ? 320 : 80 }}
    >
      <div className='h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'
        >
          <Menu size={30} />
        </motion.button>

        <nav className='mt-8 flex-grow'>
          {routes[user.role].map((item, idx) => {
            return (
              <Link key={idx + 1} to={item?.href}>
                <motion.div
                  className={`flex items-center px-2 py-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2 ${
                    pathname === item.href ? 'bg-gray-700' : null
                  }`}
                >
                  <item.icon
                    size={30}
                    style={{ color: item.color, minWidth: '30px' }}
                  />
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span
                        className='ml-4 whitespace-nowrap text-xl font-medium'
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, delay: 0.3 }}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.div>
  );
};
