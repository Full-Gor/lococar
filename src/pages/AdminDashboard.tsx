import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, BoxPlot
} from 'recharts';
import { supabase } from '../lib/supabase';
import { BookingStats, ContactMessage, Car } from '../types';
import { 
  Car as CarIcon, 
  Users, 
  DollarSign, 
  TrendingUp,
  MessageSquare,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<BookingStats | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch booking statistics
      const { data: bookings } = await supabase
        .from('bookings')
        .select('*');

      // Fetch contact messages
      const { data: contactData } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch cars
      const { data: carsData } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (bookings) {
        const processedStats = processBookingStats(bookings);
        setStats(processedStats);
      }

      setMessages(contactData || []);
      setCars(carsData || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const processBookingStats = (bookings: any[]): BookingStats => {
    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.total_amount, 0);
    const averageBookingValue = totalRevenue / totalBookings || 0;

    // Group by month
    const monthlyData = bookings.reduce((acc, booking) => {
      const month = new Date(booking.created_at).toLocaleDateString('fr-FR', { 
        month: 'short', 
        year: 'numeric' 
      });
      
      if (!acc[month]) {
        acc[month] = { month, bookings: 0, revenue: 0 };
      }
      
      acc[month].bookings += 1;
      acc[month].revenue += booking.total_amount;
      
      return acc;
    }, {});

    return {
      totalBookings,
      totalRevenue,
      averageBookingValue,
      monthlyData: Object.values(monthlyData),
      categoryData: [
        { category: 'Standard', count: 15, revenue: 45000 },
        { category: 'Électrique', count: 8, revenue: 32000 },
        { category: 'Occasion', count: 5, revenue: 15000 }
      ]
    };
  };

  const COLORS = ['#D4AF37', '#AA8C2C', '#806921', '#554616'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Tableau de Bord Administrateur</h1>
          <p className="text-gray-600">Gérez votre flotte et suivez vos performances</p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8">
          {[
            { id: 'overview', label: 'Vue d\'ensemble', icon: TrendingUp },
            { id: 'cars', label: 'Véhicules', icon: CarIcon },
            { id: 'messages', label: 'Messages', icon: MessageSquare }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-gold-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Réservations</p>
                    <p className="text-2xl font-bold">{stats.totalBookings}</p>
                  </div>
                  <Users className="h-8 w-8 text-gold-500" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Chiffre d'Affaires</p>
                    <p className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()}€</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-gold-500" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Panier Moyen</p>
                    <p className="text-2xl font-bold">{Math.round(stats.averageBookingValue)}€</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-gold-500" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Véhicules Actifs</p>
                    <p className="text-2xl font-bold">{cars.filter(car => car.available).length}</p>
                  </div>
                  <CarIcon className="h-8 w-8 text-gold-500" />
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Monthly Revenue Chart */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-4">Évolution Mensuelle</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={stats.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#D4AF37" 
                      fill="#D4AF37" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Category Distribution */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-4">Répartition par Catégorie</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={stats.categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, count }) => `${category}: ${count}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {stats.categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Box Plot for Booking Values */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4">Distribution des Valeurs de Réservation</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#D4AF37" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* Cars Management Tab */}
        {activeTab === 'cars' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestion des Véhicules</h2>
              <button className="bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Plus size={20} />
                <span>Ajouter un véhicule</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img 
                    src={car.image_url} 
                    alt={`${car.brand} ${car.name}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{car.brand} {car.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{car.category}</p>
                    <p className="text-gold-600 font-bold">{car.price_per_month}€/mois</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        car.available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {car.available ? 'Disponible' : 'Indisponible'}
                      </span>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold">Messages de Contact</h2>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nom
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sujet
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {messages.map((message) => (
                      <tr key={message.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {message.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {message.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {message.subject}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(message.created_at).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            message.status === 'unread' 
                              ? 'bg-red-100 text-red-800'
                              : message.status === 'read'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {message.status === 'unread' ? 'Non lu' : 
                             message.status === 'read' ? 'Lu' : 'Répondu'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;