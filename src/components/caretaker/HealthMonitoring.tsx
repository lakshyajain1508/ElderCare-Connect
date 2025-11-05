import { useState } from 'react';
import { Heart, Activity, TrendingUp, TrendingDown, AlertCircle, User, Calendar, Plus } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface HealthRecord {
  id: string;
  residentId: string;
  residentName: string;
  type: 'blood-pressure' | 'heart-rate' | 'blood-sugar' | 'weight' | 'temperature';
  value: string;
  timestamp: string;
  status: 'normal' | 'elevated' | 'critical';
}

interface ResidentHealth {
  id: string;
  name: string;
  latestMetrics: {
    bloodPressure: string;
    heartRate: string;
    bloodSugar: string;
    weight: string;
  };
  status: 'good' | 'warning' | 'critical';
  lastCheckup: string;
}

export function HealthMonitoring() {
  const [selectedResident, setSelectedResident] = useState<string | null>(null);
  const [showAddRecord, setShowAddRecord] = useState(false);

  const residentsHealth: ResidentHealth[] = [
    {
      id: '1',
      name: 'Margaret Wilson',
      latestMetrics: {
        bloodPressure: '120/80',
        heartRate: '72',
        bloodSugar: '110',
        weight: '165'
      },
      status: 'good',
      lastCheckup: '2 hours ago'
    },
    {
      id: '2',
      name: 'Robert Thompson',
      latestMetrics: {
        bloodPressure: '145/92',
        heartRate: '88',
        bloodSugar: '140',
        weight: '178'
      },
      status: 'warning',
      lastCheckup: '5 hours ago'
    },
    {
      id: '3',
      name: 'Dorothy Martinez',
      latestMetrics: {
        bloodPressure: '118/76',
        heartRate: '70',
        bloodSugar: '105',
        weight: '142'
      },
      status: 'good',
      lastCheckup: '1 hour ago'
    }
  ];

  const bloodPressureTrend = [
    { date: 'Mon', systolic: 118, diastolic: 78 },
    { date: 'Tue', systolic: 122, diastolic: 80 },
    { date: 'Wed', systolic: 120, diastolic: 79 },
    { date: 'Thu', systolic: 119, diastolic: 77 },
    { date: 'Fri', systolic: 121, diastolic: 81 },
    { date: 'Sat', systolic: 120, diastolic: 80 },
    { date: 'Sun', systolic: 120, diastolic: 80 }
  ];

  const activityTrend = [
    { day: 'Mon', steps: 3200 },
    { day: 'Tue', steps: 4100 },
    { day: 'Wed', steps: 3800 },
    { day: 'Thu', steps: 4500 },
    { day: 'Fri', steps: 3600 },
    { day: 'Sat', steps: 2900 },
    { day: 'Sun', steps: 3400 }
  ];

  const recentRecords: HealthRecord[] = [
    {
      id: '1',
      residentId: '1',
      residentName: 'Margaret Wilson',
      type: 'blood-pressure',
      value: '120/80 mmHg',
      timestamp: '2 hours ago',
      status: 'normal'
    },
    {
      id: '2',
      residentId: '1',
      residentName: 'Margaret Wilson',
      type: 'heart-rate',
      value: '72 bpm',
      timestamp: '2 hours ago',
      status: 'normal'
    },
    {
      id: '3',
      residentId: '2',
      residentName: 'Robert Thompson',
      type: 'blood-pressure',
      value: '145/92 mmHg',
      timestamp: '5 hours ago',
      status: 'elevated'
    },
    {
      id: '4',
      residentId: '2',
      residentName: 'Robert Thompson',
      type: 'blood-sugar',
      value: '140 mg/dL',
      timestamp: '5 hours ago',
      status: 'elevated'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
      case 'normal':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'warning':
      case 'elevated':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getMetricIcon = (type: string) => {
    switch (type) {
      case 'blood-pressure':
        return <Heart className="w-5 h-5" />;
      case 'heart-rate':
        return <Activity className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  if (showAddRecord) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-900">Add Health Record</h2>
          <button
            onClick={() => setShowAddRecord(false)}
            className="text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Select Resident</label>
            <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none">
              <option value="">Choose a resident...</option>
              {residentsHealth.map(resident => (
                <option key={resident.id} value={resident.id}>
                  {resident.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Measurement Type</label>
            <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none">
              <option value="blood-pressure">Blood Pressure</option>
              <option value="heart-rate">Heart Rate</option>
              <option value="blood-sugar">Blood Sugar</option>
              <option value="weight">Weight</option>
              <option value="temperature">Temperature</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Systolic</label>
              <input
                type="number"
                placeholder="120"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Diastolic</label>
              <input
                type="number"
                placeholder="80"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Notes (Optional)</label>
            <textarea
              rows={3}
              placeholder="Any observations or notes..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none resize-none"
            />
          </div>

          <button
            onClick={() => {
              alert('Health record saved!');
              setShowAddRecord(false);
            }}
            className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 active:scale-95 transition-all"
          >
            Save Record
          </button>
        </div>
      </div>
    );
  }

  if (selectedResident) {
    const resident = residentsHealth.find(r => r.id === selectedResident);
    if (!resident) return null;

    return (
      <div className="space-y-4">
        <button
          onClick={() => setSelectedResident(null)}
          className="text-blue-600 hover:underline flex items-center gap-1"
        >
          ← Back to overview
        </button>

        {/* Resident Header */}
        <div className={`rounded-3xl p-6 text-white shadow-xl ${
          resident.status === 'good' 
            ? 'bg-gradient-to-br from-green-500 to-emerald-600'
            : resident.status === 'warning'
            ? 'bg-gradient-to-br from-amber-500 to-orange-600'
            : 'bg-gradient-to-br from-red-500 to-rose-600'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white mb-1">{resident.name}</h2>
              <p className="text-white/90">Health Monitoring</p>
            </div>
            <button
              onClick={() => setShowAddRecord(true)}
              className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-xl transition-all"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <p className="text-white/90 text-sm mb-1">Overall Status</p>
            <p className="text-white capitalize">{resident.status}</p>
          </div>
        </div>

        {/* Current Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-gray-600 text-sm">Blood Pressure</span>
            </div>
            <p className="text-gray-900">{resident.latestMetrics.bloodPressure}</p>
            <p className="text-gray-500 text-xs">mmHg</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-blue-500" />
              <span className="text-gray-600 text-sm">Heart Rate</span>
            </div>
            <p className="text-gray-900">{resident.latestMetrics.heartRate}</p>
            <p className="text-gray-500 text-xs">bpm</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-purple-500" />
              <span className="text-gray-600 text-sm">Blood Sugar</span>
            </div>
            <p className="text-gray-900">{resident.latestMetrics.bloodSugar}</p>
            <p className="text-gray-500 text-xs">mg/dL</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-gray-600 text-sm">Weight</span>
            </div>
            <p className="text-gray-900">{resident.latestMetrics.weight}</p>
            <p className="text-gray-500 text-xs">lbs</p>
          </div>
        </div>

        {/* Blood Pressure Chart */}
        <div className="bg-white rounded-2xl p-5 shadow-lg">
          <h3 className="text-gray-900 mb-4">Blood Pressure Trend (7 days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bloodPressureTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" domain={[60, 140]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="systolic"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ fill: '#ef4444', r: 4 }}
                  name="Systolic"
                />
                <Line
                  type="monotone"
                  dataKey="diastolic"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  name="Diastolic"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Chart */}
        <div className="bg-white rounded-2xl p-5 shadow-lg">
          <h3 className="text-gray-900 mb-4">Daily Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="steps" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white mb-1">Health Monitoring</h2>
            <p className="text-blue-100">Track vital signs and health metrics</p>
          </div>
          <button
            onClick={() => setShowAddRecord(true)}
            className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-xl transition-all"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-white text-sm">Normal</p>
            <p className="text-blue-100 text-xs">
              {residentsHealth.filter(r => r.status === 'good').length}
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-white text-sm">Monitor</p>
            <p className="text-blue-100 text-xs">
              {residentsHealth.filter(r => r.status === 'warning').length}
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-white text-sm">Critical</p>
            <p className="text-blue-100 text-xs">
              {residentsHealth.filter(r => r.status === 'critical').length}
            </p>
          </div>
        </div>
      </div>

      {/* Residents Health Overview */}
      <div>
        <h3 className="text-gray-900 mb-3">Residents Overview</h3>
        <div className="space-y-3">
          {residentsHealth.map((resident) => (
            <button
              key={resident.id}
              onClick={() => setSelectedResident(resident.id)}
              className="w-full bg-white rounded-2xl p-5 shadow-lg border-2 border-white hover:border-blue-200 transition-all text-left"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">{resident.name}</h4>
                    <p className="text-gray-600 text-sm">Last checked: {resident.lastCheckup}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${getStatusColor(resident.status)}`}>
                  {resident.status === 'good' && '✓'}
                  {resident.status === 'warning' && '⚠'}
                  {resident.status === 'critical' && '⚠'}
                  {' '}
                  {resident.status}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-600 text-xs mb-1">Blood Pressure</p>
                  <p className="text-gray-900 text-sm">{resident.latestMetrics.bloodPressure} mmHg</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-600 text-xs mb-1">Heart Rate</p>
                  <p className="text-gray-900 text-sm">{resident.latestMetrics.heartRate} bpm</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Records */}
      <div>
        <h3 className="text-gray-900 mb-3">Recent Records</h3>
        <div className="space-y-2">
          {recentRecords.map((record) => (
            <div
              key={record.id}
              className="bg-white rounded-xl p-4 shadow-md border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getStatusColor(record.status)}`}>
                    {getMetricIcon(record.type)}
                  </div>
                  <div>
                    <p className="text-gray-900 text-sm">{record.residentName}</p>
                    <p className="text-gray-600 text-xs">{record.value}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-xs">{record.timestamp}</p>
                  <span className={`text-xs px-2 py-1 rounded ${getStatusColor(record.status)}`}>
                    {record.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-gray-900 mb-2">🤖 AI Health Insights</h4>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Robert Thompson's BP trending high - consider medication review</li>
              <li>• All residents maintaining good activity levels this week</li>
              <li>• Margaret Wilson's metrics show excellent consistency</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
