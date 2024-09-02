import {
  LayoutDashboard,
  History,
  TrendingUp,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  ListOrdered,
} from 'lucide-react';

export const WORKER_ROUTES = [
  {
    name: 'Kirim',
    icon: ArrowDownWideNarrow,
    color: '#10B981',
    href: '/stock-in',
  },
  {
    name: 'Chiqim',
    icon: ArrowUpWideNarrow,
    color: '#EC4899',
    href: '/stock-out',
  },
  {
    name: 'Tovarlar',
    icon: ListOrdered,
    color: '#8B5CF6',
    href: '/products',
  },
];

export const ADMIN_ROUTES = [
  {
    name: 'Bosh sahifa',
    icon: LayoutDashboard,
    color: '#6366f1',
    href: '/',
  },
  {
    name: 'Kirim',
    icon: ArrowDownWideNarrow,
    color: '#10B981',
    href: '/stock-in',
  },
  {
    name: 'Chiqim',
    icon: ArrowUpWideNarrow,
    color: '#EC4899',
    href: '/stock-out',
  },
  {
    name: 'Tovarlar',
    icon: ListOrdered,
    color: '#8B5CF6',
    href: '/products',
  },
  {
    name: 'Tranzaksiyalar',
    icon: History,
    color: '#F59E0B',
    href: '/transactions',
  },
  {
    name: 'Hisobot (Tez orada)',
    icon: TrendingUp,
    color: '#3B82F6',
    // href: '/analytics',
  },
];
