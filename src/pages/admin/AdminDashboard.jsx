import { useState, useEffect } from 'react';
import { dashboardAPI } from '../../utils/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalCategories: 0,
    totalProducts: 0,
    totalOrders: 0,
    monthlyRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await dashboardAPI.getStats();
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Kategori',
      value: stats.totalCategories,
      icon: '📂',
      color: 'primary',
      bgColor: 'bg-primary-500'
    },
    {
      title: 'Total Produk',
      value: stats.totalProducts,
      icon: '📦',
      color: 'secondary',
      bgColor: 'bg-secondary-500'
    },
    // {
    //   title: 'Pesanan',
    //   value: stats.totalOrders,
    //   icon: '📋',
    //   color: 'accent',
    //   bgColor: 'bg-accent-500'
    // },
    // {
    //   title: 'Pendapatan Bulanan',
    //   value: new Intl.NumberFormat('id-ID', {
    //     style: 'currency',
    //     currency: 'IDR',
    //     minimumFractionDigits: 0,
    //   }).format(stats.monthlyRevenue),
    //   icon: '💰',
    //   color: 'green',
    //   bgColor: 'bg-green-500'
    // }
  ];

  const recentActivities = [
    { action: 'Produk baru ditambahkan', time: '2 jam yang lalu', type: 'create' },
    { action: 'Kategori diupdate', time: '4 jam yang lalu', type: 'update' },
    { action: 'Pesanan baru masuk', time: '6 jam yang lalu', type: 'order' },
    { action: 'Settings diupdate', time: '1 hari yang lalu', type: 'update' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Selamat datang di admin panel PT. Central Blessindo Indonesia</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="card overflow-hidden">
            <div className="card-body p-0">
              <div className={`${stat.bgColor} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className="text-3xl opacity-80">{stat.icon}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">Aktivitas Terbaru</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-xs
                    ${activity.type === 'create' ? 'bg-green-100 text-green-600' : ''}
                    ${activity.type === 'update' ? 'bg-blue-100 text-blue-600' : ''}
                    ${activity.type === 'order' ? 'bg-yellow-100 text-yellow-600' : ''}
                  `}>
                    {activity.type === 'create' && '➕'}
                    {activity.type === 'update' && '✏️'}
                    {activity.type === 'order' && '🛒'}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">Aksi Cepat</h3>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-2 gap-4">
              <a
                href="/admin/categories"
                className="p-4 border-2 border-dashed border-primary-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 text-center group"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">📂</div>
                <div className="text-sm font-medium text-gray-700 group-hover:text-primary-600">Kelola Kategori</div>
              </a>
              
              <a
                href="/admin/products"
                className="p-4 border-2 border-dashed border-secondary-300 rounded-lg hover:border-secondary-500 hover:bg-secondary-50 transition-all duration-200 text-center group"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">📦</div>
                <div className="text-sm font-medium text-gray-700 group-hover:text-secondary-600">Kelola Produk</div>
              </a>
              
              <a
                href="/admin/clients"
                className="p-4 border-2 border-dashed border-accent-300 rounded-lg hover:border-accent-500 hover:bg-accent-50 transition-all duration-200 text-center group"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">👥</div>
                <div className="text-sm font-medium text-gray-700 group-hover:text-accent-600">Kelola Klien</div>
              </a>
              
              <a
                href="/admin/settings"
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-500 hover:bg-gray-50 transition-all duration-200 text-center group"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">⚙️</div>
                <div className="text-sm font-medium text-gray-700 group-hover:text-gray-600">Pengaturan</div>
              </a>
              
              <a
                href="/"
                target="_blank"
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-500 hover:bg-gray-50 transition-all duration-200 text-center group"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">🌐</div>
                <div className="text-sm font-medium text-gray-700 group-hover:text-gray-600">Lihat Website</div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Informasi Sistem</h3>
        </div>
        <div className="card-body">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Versi Aplikasi</div>
              <div className="font-semibold text-gray-900">v1.0.0</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Last Update</div>
              <div className="font-semibold text-gray-900">
                {new Date().toLocaleDateString('id-ID')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Status</div>
              <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                Online
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;