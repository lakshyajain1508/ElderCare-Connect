import { useState } from 'react';
import { Plus, Bell, Clock, Pill, Utensils, Calendar, User, Volume2, Check, X, Edit } from 'lucide-react';

interface Reminder {
  id: string;
  residentId: string;
  residentName: string;
  type: 'medicine' | 'meal' | 'appointment' | 'exercise' | 'other';
  title: string;
  time: string;
  repeat: 'once' | 'daily' | 'weekly';
  voiceEnabled: boolean;
  status: 'active' | 'paused';
  details?: string;
}

export function RemindersManagement() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [newReminder, setNewReminder] = useState({
    residentId: '',
    type: 'medicine',
    title: '',
    time: '',
    repeat: 'daily',
    voiceEnabled: true,
    details: ''
  });

  const reminders: Reminder[] = [
    {
      id: '1',
      residentId: '1',
      residentName: 'Margaret Wilson',
      type: 'medicine',
      title: 'Blood Pressure Medication',
      time: '09:00',
      repeat: 'daily',
      voiceEnabled: true,
      status: 'active',
      details: 'Take 1 tablet with water'
    },
    {
      id: '2',
      residentId: '1',
      residentName: 'Margaret Wilson',
      type: 'meal',
      title: 'Lunch Time',
      time: '12:30',
      repeat: 'daily',
      voiceEnabled: true,
      status: 'active'
    },
    {
      id: '3',
      residentId: '2',
      residentName: 'Robert Thompson',
      type: 'medicine',
      title: 'Heart Medication',
      time: '08:00',
      repeat: 'daily',
      voiceEnabled: true,
      status: 'active',
      details: 'Take with breakfast'
    },
    {
      id: '4',
      residentId: '1',
      residentName: 'Margaret Wilson',
      type: 'appointment',
      title: 'Dr. Smith Visit',
      time: '15:30',
      repeat: 'once',
      voiceEnabled: false,
      status: 'active',
      details: 'Regular checkup - Room 205'
    },
    {
      id: '5',
      residentId: '3',
      residentName: 'Dorothy Martinez',
      type: 'exercise',
      title: 'Physical Therapy',
      time: '10:00',
      repeat: 'weekly',
      voiceEnabled: true,
      status: 'active'
    }
  ];

  const residents = [
    { id: '1', name: 'Margaret Wilson' },
    { id: '2', name: 'Robert Thompson' },
    { id: '3', name: 'Dorothy Martinez' },
    { id: '4', name: 'James Anderson' }
  ];

  const getReminderIcon = (type: string) => {
    switch (type) {
      case 'medicine':
        return <Pill className="w-5 h-5" />;
      case 'meal':
        return <Utensils className="w-5 h-5" />;
      case 'appointment':
        return <Calendar className="w-5 h-5" />;
      case 'exercise':
        return <User className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getReminderColor = (type: string) => {
    switch (type) {
      case 'medicine':
        return 'bg-blue-100 text-blue-700';
      case 'meal':
        return 'bg-green-100 text-green-700';
      case 'appointment':
        return 'bg-purple-100 text-purple-700';
      case 'exercise':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleAddReminder = () => {
    if (!newReminder.residentId || !newReminder.title || !newReminder.time) {
      alert('Please fill in all required fields');
      return;
    }
    alert('Reminder created successfully!');
    setShowAddForm(false);
    setNewReminder({
      residentId: '',
      type: 'medicine',
      title: '',
      time: '',
      repeat: 'daily',
      voiceEnabled: true,
      details: ''
    });
  };

  const filteredReminders = filterType === 'all' 
    ? reminders 
    : reminders.filter(r => r.type === filterType);

  if (showAddForm) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-900">Create New Reminder</h2>
          <button
            onClick={() => setShowAddForm(false)}
            className="text-gray-600 hover:text-gray-900"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg space-y-4">
          {/* Resident Selection */}
          <div>
            <label className="block text-gray-700 mb-2">Select Resident *</label>
            <select
              value={newReminder.residentId}
              onChange={(e) => setNewReminder({ ...newReminder, residentId: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-amber-400 focus:outline-none"
            >
              <option value="">Choose a resident...</option>
              {residents.map(resident => (
                <option key={resident.id} value={resident.id}>
                  {resident.name}
                </option>
              ))}
            </select>
          </div>

          {/* Reminder Type */}
          <div>
            <label className="block text-gray-700 mb-2">Reminder Type *</label>
            <div className="grid grid-cols-2 gap-2">
              {['medicine', 'meal', 'appointment', 'exercise'].map(type => (
                <button
                  key={type}
                  onClick={() => setNewReminder({ ...newReminder, type: type as any })}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    newReminder.type === type
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {getReminderIcon(type)}
                    <span className="capitalize">{type}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-gray-700 mb-2">Reminder Title *</label>
            <input
              type="text"
              value={newReminder.title}
              onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
              placeholder="e.g., Blood Pressure Medication"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-amber-400 focus:outline-none"
            />
          </div>

          {/* Time and Repeat */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Time *</label>
              <input
                type="time"
                value={newReminder.time}
                onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Repeat</label>
              <select
                value={newReminder.repeat}
                onChange={(e) => setNewReminder({ ...newReminder, repeat: e.target.value as any })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-amber-400 focus:outline-none"
              >
                <option value="once">Once</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>

          {/* Details */}
          <div>
            <label className="block text-gray-700 mb-2">Additional Details</label>
            <textarea
              value={newReminder.details}
              onChange={(e) => setNewReminder({ ...newReminder, details: e.target.value })}
              placeholder="Optional instructions or notes..."
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-amber-400 focus:outline-none resize-none"
            />
          </div>

          {/* Voice Reminder Toggle */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-gray-900">Voice Reminder</p>
                  <p className="text-gray-600 text-sm">Text-to-speech notification</p>
                </div>
              </div>
              <button
                onClick={() => setNewReminder({ ...newReminder, voiceEnabled: !newReminder.voiceEnabled })}
                className={`w-12 h-6 rounded-full transition-all ${
                  newReminder.voiceEnabled ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-all ${
                  newReminder.voiceEnabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setShowAddForm(false)}
              className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl hover:bg-gray-200 active:scale-95 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleAddReminder}
              className="flex-1 bg-amber-600 text-white py-4 rounded-xl hover:bg-amber-700 active:scale-95 transition-all"
            >
              Create Reminder
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white mb-1">Reminders & Tasks</h2>
            <p className="text-amber-100">{reminders.length} active reminders</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Bell className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-2">
          {['medicine', 'meal', 'appointment', 'exercise'].map(type => (
            <div key={type} className="bg-white/20 backdrop-blur-sm rounded-xl p-2 text-center">
              <div className="mx-auto mb-1 w-6 h-6 flex items-center justify-center">
                {getReminderIcon(type)}
              </div>
              <p className="text-white text-xs">
                {reminders.filter(r => r.type === type).length}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Add */}
      <div className="flex gap-3">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:outline-none"
        >
          <option value="all">All Reminders</option>
          <option value="medicine">Medicine</option>
          <option value="meal">Meals</option>
          <option value="appointment">Appointments</option>
          <option value="exercise">Exercise</option>
        </select>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-amber-600 text-white px-6 py-3 rounded-xl hover:bg-amber-700 active:scale-95 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add</span>
        </button>
      </div>

      {/* Reminders List */}
      <div className="space-y-3">
        {filteredReminders.map((reminder) => (
          <div
            key={reminder.id}
            className="bg-white rounded-2xl p-5 shadow-lg border-2 border-white hover:border-amber-200 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${getReminderColor(reminder.type)} flex-shrink-0`}>
                {getReminderIcon(reminder.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-gray-900 mb-1">{reminder.title}</h3>
                    <p className="text-gray-600 text-sm flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {reminder.residentName}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {reminder.voiceEnabled && (
                      <div className="bg-blue-100 text-blue-700 p-2 rounded-lg">
                        <Volume2 className="w-4 h-4" />
                      </div>
                    )}
                    {reminder.status === 'active' ? (
                      <div className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Active
                      </div>
                    ) : (
                      <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs">
                        Paused
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {reminder.time}
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs capitalize">
                    {reminder.repeat}
                  </span>
                </div>

                {reminder.details && (
                  <p className="text-gray-600 text-sm mb-3 bg-gray-50 p-3 rounded-lg">
                    {reminder.details}
                  </p>
                )}

                <div className="flex gap-2">
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button className="flex-1 bg-red-100 text-red-700 py-2 px-4 rounded-lg hover:bg-red-200 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm">
                    <X className="w-4 h-4" />
                    Delete
                  </button>
                  <button className="bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 active:scale-95 transition-all text-sm">
                    Test Reminder
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Volume2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-gray-900 mb-1">Voice Reminders</h4>
            <p className="text-gray-600 text-sm mb-2">
              Voice-enabled reminders will speak aloud the reminder text to help elderly residents who may have vision difficulties.
            </p>
            <p className="text-gray-600 text-sm">
              {reminders.filter(r => r.voiceEnabled).length} of {reminders.length} reminders have voice enabled.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
