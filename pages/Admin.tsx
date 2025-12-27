import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, ShoppingBag, DollarSign, LogOut } from 'lucide-react';

const MOCK_DATA = [
  { name: 'Mon', orders: 12, revenue: 600 },
  { name: 'Tue', orders: 19, revenue: 950 },
  { name: 'Wed', orders: 15, revenue: 750 },
  { name: 'Thu', orders: 22, revenue: 1100 },
  { name: 'Fri', orders: 28, revenue: 1400 },
  { name: 'Sat', orders: 35, revenue: 1750 },
  { name: 'Sun', orders: 25, revenue: 1250 },
];

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple mock auth
      setIsAuthenticated(true);
    } else {
      alert('Invalid password (hint: admin123)');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-900">In & Out Admin</h1>
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="flex items-center text-gray-600 hover:text-red-600"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </button>
      </nav>

      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
            <div className="p-3 bg-blue-100 rounded-full text-blue-600 mr-4">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">1,245</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
            <div className="p-3 bg-green-100 rounded-full text-green-600 mr-4">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">AED 65,400</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
            <div className="p-3 bg-purple-100 rounded-full text-purple-600 mr-4">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Customers</p>
              <p className="text-2xl font-bold text-gray-900">450</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Weekly Performance</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="orders" name="Orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="revenue" name="Revenue (AED)" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#ORD-00{i}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Customer {i}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Processing
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">AED {40 + i * 10}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Admin;
