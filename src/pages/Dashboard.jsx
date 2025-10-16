import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserInjured, FaCalendarCheck, FaDollarSign, FaBoxes } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    monthlyRevenue: 0,
    lowStockItems: 0
  });

  const [recentAppointments, setRecentAppointments] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/analytics/dashboard');
      setStats(response.data.stats);
      setRecentAppointments(response.data.recentAppointments);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const statCards = [
    { title: 'Total Patients', value: stats.totalPatients, icon: FaUserInjured, color: 'bg-blue-500' },
    { title: 'Today\'s Appointments', value: stats.todayAppointments, icon: FaCalendarCheck, color: 'bg-green-500' },
    { title: 'Monthly Revenue', value: `₹${stats.monthlyRevenue?.toLocaleString()}`, icon: FaDollarSign, color: 'bg-purple-500' },
    { title: 'Low Stock Items', value: stats.lowStockItems, icon: FaBoxes, color: 'bg-orange-500' }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-4 rounded-full`}>
                <stat.icon className="text-2xl text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Appointments */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Today's Appointments</h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="bg-gray-50">
                <th className="th">Time</th>
                <th className="th">Patient</th>
                <th className="th">Dentist</th>
                <th className="th">Type</th>
                <th className="th">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentAppointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td className="td">{appointment.startTime}</td>
                  <td className="td">{appointment.patient?.firstName} {appointment.patient?.lastName}</td>
                  <td className="td">{appointment.dentist?.name}</td>
                  <td className="td capitalize">{appointment.type}</td>
                  <td className="td">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
