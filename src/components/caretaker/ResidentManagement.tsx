import { useState } from 'react';
import { User, Plus, Search, Heart, Pill, AlertCircle, CheckCircle, Edit, MoreVertical } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Resident {
  id: string;
  name: string;
  room: string;
  age: number;
  status: 'good' | 'needs-attention' | 'critical';
  conditions: string[];
  lastCheckup: string;
  medications: number;
  nextAppointment?: string;
  imageUrl: string;
}

export function ResidentManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResident, setSelectedResident] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const residents: Resident[] = [
    {
      id: '1',
      name: 'Margaret Wilson',
      room: '302A',
      age: 78,
      status: 'good',
      conditions: ['Hypertension', 'Diabetes Type 2'],
      lastCheckup: '2 days ago',
      medications: 3,
      nextAppointment: 'Today at 3:30 PM',
      imageUrl: 'https://images.unsplash.com/photo-1595837268690-c433b3ee403f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwcGVyc29uJTIwc21pbGluZ3xlbnwxfHx8fDE3NjIzNTExMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: '2',
      name: 'Robert Thompson',
      room: '205B',
      age: 82,
      status: 'needs-attention',
      conditions: ['Heart Disease', 'Arthritis'],
      lastCheckup: '5 days ago',
      medications: 5,
      nextAppointment: 'Tomorrow at 10:00 AM',
      imageUrl: 'https://images.unsplash.com/photo-1595837268690-c433b3ee403f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwcGVyc29uJTIwc21pbGluZ3xlbnwxfHx8fDE3NjIzNTExMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: '3',
      name: 'Dorothy Martinez',
      room: '401C',
      age: 75,
      status: 'good',
      conditions: ['Mild Cognitive Impairment'],
      lastCheckup: '1 day ago',
      medications: 2,
      imageUrl: 'https://images.unsplash.com/photo-1595837268690-c433b3ee403f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwcGVyc29uJTIwc21pbGluZ3xlbnwxfHx8fDE3NjIzNTExMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: '4',
      name: 'James Anderson',
      room: '308A',
      age: 80,
      status: 'good',
      conditions: ['Osteoporosis', 'High Cholesterol'],
      lastCheckup: '3 days ago',
      medications: 4,
      nextAppointment: 'Next week',
      imageUrl: 'https://images.unsplash.com/photo-1595837268690-c433b3ee403f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwcGVyc29uJTIwc21pbGluZ3xlbnwxfHx8fDE3NjIzNTExMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'good':
        return {
          color: 'bg-green-100 text-green-700 border-green-200',
          icon: <CheckCircle className="w-5 h-5" />,
          label: 'Good'
        };
      case 'needs-attention':
        return {
          color: 'bg-amber-100 text-amber-700 border-amber-200',
          icon: <AlertCircle className="w-5 h-5" />,
          label: 'Needs Attention'
        };
      case 'critical':
        return {
          color: 'bg-red-100 text-red-700 border-red-200',
          icon: <AlertCircle className="w-5 h-5" />,
          label: 'Critical'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-700 border-gray-200',
          icon: <User className="w-5 h-5" />,
          label: 'Unknown'
        };
    }
  };

  const filteredResidents = residents.filter(resident =>
    resident.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resident.room.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (showAddForm) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-900">Add New Resident</h2>
          <button
            onClick={() => setShowAddForm(false)}
            className="text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter resident name"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Age</label>
              <input
                type="number"
                placeholder="Age"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Room</label>
              <input
                type="text"
                placeholder="Room number"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Medical Conditions</label>
            <textarea
              placeholder="List conditions (comma separated)"
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Emergency Contact</label>
            <input
              type="tel"
              placeholder="Phone number"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none"
            />
          </div>

          <button
            onClick={() => {
              alert('Resident information saved!');
              setShowAddForm(false);
            }}
            className="w-full bg-emerald-600 text-white py-4 rounded-xl hover:bg-emerald-700 active:scale-95 transition-all"
          >
            Save Resident Information
          </button>
        </div>
      </div>
    );
  }

  if (selectedResident) {
    const resident = residents.find(r => r.id === selectedResident);
    if (!resident) return null;

    const statusConfig = getStatusConfig(resident.status);

    return (
      <div className="space-y-4">
        <button
          onClick={() => setSelectedResident(null)}
          className="text-emerald-600 hover:underline flex items-center gap-1"
        >
          ← Back to residents
        </button>

        {/* Resident Profile */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-xl">
          <div className="flex items-start gap-4">
            <ImageWithFallback
              src={resident.imageUrl}
              alt={resident.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-white/30"
            />
            <div className="flex-1">
              <h2 className="text-white mb-1">{resident.name}</h2>
              <p className="text-emerald-100">Room {resident.room} • Age {resident.age}</p>
              <div className={`mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig.color}`}>
                {statusConfig.icon}
                <span>{statusConfig.label}</span>
              </div>
            </div>
            <button className="text-white hover:bg-white/20 p-2 rounded-lg">
              <MoreVertical className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Pill className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-900">{resident.medications}</p>
                <p className="text-gray-600 text-sm">Medications</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-900">{resident.conditions.length}</p>
                <p className="text-gray-600 text-sm">Conditions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Conditions */}
        <div className="bg-white rounded-2xl p-5 shadow-lg">
          <h3 className="text-gray-900 mb-3">Medical Conditions</h3>
          <div className="flex flex-wrap gap-2">
            {resident.conditions.map((condition, index) => (
              <span
                key={index}
                className="bg-purple-100 text-purple-700 px-3 py-2 rounded-lg text-sm"
              >
                {condition}
              </span>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-5 shadow-lg">
          <h3 className="text-gray-900 mb-3">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 text-sm">Medication taken</p>
                <p className="text-gray-500 text-xs">Blood pressure medication - 2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 text-sm">Vital signs recorded</p>
                <p className="text-gray-500 text-xs">BP: 120/80, HR: 72 - 2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-4 h-4 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 text-sm">Appointment reminder</p>
                <p className="text-gray-500 text-xs">Dr. Smith checkup - Today at 3:30 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-emerald-600 text-white py-4 rounded-xl hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center gap-2">
            <Edit className="w-5 h-5" />
            <span>Edit Info</span>
          </button>
          <button className="bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 active:scale-95 transition-all">
            View Full Records
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white mb-1">Resident Management</h2>
            <p className="text-emerald-100">{residents.length} residents under care</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-white text-sm">Good</p>
            <p className="text-emerald-100 text-xs">
              {residents.filter(r => r.status === 'good').length}
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-white text-sm">Monitor</p>
            <p className="text-emerald-100 text-xs">
              {residents.filter(r => r.status === 'needs-attention').length}
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-white text-sm">Critical</p>
            <p className="text-emerald-100 text-xs">
              {residents.filter(r => r.status === 'critical').length}
            </p>
          </div>
        </div>
      </div>

      {/* Search and Add */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search residents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none"
          />
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-emerald-600 text-white p-4 rounded-xl hover:bg-emerald-700 active:scale-95 transition-all"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Residents List */}
      <div className="space-y-3">
        {filteredResidents.map((resident) => {
          const statusConfig = getStatusConfig(resident.status);

          return (
            <button
              key={resident.id}
              onClick={() => setSelectedResident(resident.id)}
              className="w-full bg-white rounded-2xl p-5 shadow-lg border-2 border-white hover:border-emerald-200 transition-all text-left"
            >
              <div className="flex items-start gap-4">
                <ImageWithFallback
                  src={resident.imageUrl}
                  alt={resident.name}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-gray-900 mb-1">{resident.name}</h3>
                      <p className="text-gray-600 text-sm">
                        Room {resident.room} • {resident.age} years old
                      </p>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${statusConfig.color} text-xs`}>
                      {statusConfig.icon}
                      <span className="hidden sm:inline">{statusConfig.label}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Pill className="w-4 h-4" />
                      {resident.medications} meds
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {resident.conditions.length} conditions
                    </span>
                  </div>

                  {resident.nextAppointment && (
                    <div className="bg-purple-50 text-purple-700 px-3 py-1 rounded-lg text-sm inline-block">
                      📅 {resident.nextAppointment}
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
