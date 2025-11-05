import { Heart, Activity, Droplet, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface HealthMetric {
  id: string;
  name: string;
  value: string;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  lastUpdated: string;
  icon: React.ReactNode;
}

export function HealthTracking() {
  const healthMetrics: HealthMetric[] = [
    {
      id: '1',
      name: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      status: 'good',
      lastUpdated: '2 hours ago',
      icon: <Heart className="w-6 h-6" />
    },
    {
      id: '2',
      name: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      status: 'good',
      lastUpdated: '2 hours ago',
      icon: <Activity className="w-6 h-6" />
    },
    {
      id: '3',
      name: 'Blood Sugar',
      value: '110',
      unit: 'mg/dL',
      status: 'good',
      lastUpdated: '4 hours ago',
      icon: <Droplet className="w-6 h-6" />
    },
    {
      id: '4',
      name: 'Weight',
      value: '165',
      unit: 'lbs',
      status: 'good',
      lastUpdated: 'Today',
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  const bloodPressureData = [
    { date: 'Mon', systolic: 118, diastolic: 78 },
    { date: 'Tue', systolic: 122, diastolic: 80 },
    { date: 'Wed', systolic: 120, diastolic: 79 },
    { date: 'Thu', systolic: 119, diastolic: 77 },
    { date: 'Fri', systolic: 121, diastolic: 81 },
    { date: 'Sat', systolic: 120, diastolic: 80 },
    { date: 'Sun', systolic: 120, diastolic: 80 }
  ];

  const activityData = [
    { day: 'Mon', steps: 3200 },
    { day: 'Tue', steps: 4100 },
    { day: 'Wed', steps: 3800 },
    { day: 'Thu', steps: 4500 },
    { day: 'Fri', steps: 3600 },
    { day: 'Sat', steps: 2900 },
    { day: 'Sun', steps: 3400 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'warning':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'good':
        return (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            Normal
          </span>
        );
      case 'warning':
        return (
          <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">
            ⚠️ Monitor
          </span>
        );
      case 'critical':
        return (
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
            ⚠️ Alert
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-white mb-1">Health Tracking</h2>
            <p className="text-emerald-100">Your health at a glance</p>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm mb-1">Overall Status</p>
              <p className="text-white">All metrics normal</p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>
      </div>

      {/* Current Metrics */}
      <div>
        <h3 className="text-gray-900 mb-4">Current Readings</h3>
        <div className="grid grid-cols-2 gap-3">
          {healthMetrics.map((metric) => (
            <div
              key={metric.id}
              className={`bg-white rounded-2xl p-5 shadow-lg border-2 ${getStatusColor(metric.status)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${getStatusColor(metric.status)}`}>
                  {metric.icon}
                </div>
                {getStatusBadge(metric.status)}
              </div>
              
              <div className="mb-2">
                <div className="text-gray-900 mb-1">{metric.value}</div>
                <p className="text-gray-600 text-sm">{metric.unit}</p>
              </div>
              
              <p className="text-gray-700 mb-1">{metric.name}</p>
              <p className="text-gray-500 text-xs">{metric.lastUpdated}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Blood Pressure Chart */}
      <div className="bg-white rounded-2xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-gray-900 mb-1">Blood Pressure Trend</h3>
            <p className="text-gray-600 text-sm">Last 7 days</p>
          </div>
          <Heart className="w-6 h-6 text-red-500" />
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={bloodPressureData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
                domain={[60, 140]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '14px' }}
              />
              <Line 
                type="monotone" 
                dataKey="systolic" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ fill: '#ef4444', r: 4 }}
                name="Systolic"
              />
              <Line 
                type="monotone" 
                dataKey="diastolic" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 4 }}
                name="Diastolic"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="bg-white rounded-2xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-gray-900 mb-1">Daily Steps</h3>
            <p className="text-gray-600 text-sm">Weekly activity</p>
          </div>
          <Activity className="w-6 h-6 text-emerald-500" />
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              <Bar 
                dataKey="steps" 
                fill="#10b981" 
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 bg-emerald-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700 text-sm">Average Daily Steps</p>
              <p className="text-emerald-700">3,643 steps</p>
            </div>
            <div className="text-2xl">🎯</div>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-200">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-gray-900 mb-1">Next Checkup</h3>
            <p className="text-gray-700">Dr. Smith - Regular Checkup</p>
            <p className="text-gray-600 text-sm">Today at 3:30 PM</p>
          </div>
        </div>
        
        <button className="w-full bg-purple-600 text-white py-4 rounded-xl hover:bg-purple-700 active:scale-95 transition-all">
          View Details
        </button>
      </div>

      {/* Health Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
        <div className="flex gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h4 className="text-gray-900 mb-2">Daily Health Tips</h4>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>✓ Stay hydrated - drink 6-8 glasses of water</li>
              <li>✓ Take a short walk after meals</li>
              <li>✓ Remember your evening medication at 6 PM</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
