import { Phone, PhoneCall, User, Heart, MapPin, Shield } from 'lucide-react';

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  available: boolean;
  type: 'emergency' | 'family' | 'staff' | 'medical';
}

export function EmergencyContacts() {
  const contacts: EmergencyContact[] = [
    {
      id: '1',
      name: '911 Emergency',
      relationship: 'Emergency Services',
      phone: '911',
      available: true,
      type: 'emergency'
    },
    {
      id: '2',
      name: 'Nursing Station',
      relationship: 'On-Site Medical Staff',
      phone: '(555) 123-4567',
      available: true,
      type: 'staff'
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      relationship: 'Daughter',
      phone: '(555) 234-5678',
      available: true,
      type: 'family'
    },
    {
      id: '4',
      name: 'Dr. Robert Smith',
      relationship: 'Primary Care Physician',
      phone: '(555) 345-6789',
      available: true,
      type: 'medical'
    },
    {
      id: '5',
      name: 'Michael Johnson',
      relationship: 'Son',
      phone: '(555) 456-7890',
      available: true,
      type: 'family'
    },
    {
      id: '6',
      name: 'Facility Manager',
      relationship: 'Care Coordinator',
      phone: '(555) 567-8901',
      available: true,
      type: 'staff'
    }
  ];

  const handleCall = (contact: EmergencyContact) => {
    // In a real app, this would initiate a phone call
    if (confirm(`Call ${contact.name} at ${contact.phone}?`)) {
      // Simulate call initiation
      window.location.href = `tel:${contact.phone}`;
    }
  };

  const speakContact = (contact: EmergencyContact) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `${contact.name}, ${contact.relationship}. Phone number: ${contact.phone.split('').join(' ')}`
      );
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const getContactColor = (type: string) => {
    switch (type) {
      case 'emergency':
        return 'bg-red-600 hover:bg-red-700';
      case 'staff':
        return 'bg-blue-600 hover:bg-blue-700';
      case 'family':
        return 'bg-emerald-600 hover:bg-emerald-700';
      case 'medical':
        return 'bg-purple-600 hover:bg-purple-700';
      default:
        return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'emergency':
        return <Shield className="w-10 h-10" />;
      case 'staff':
        return <User className="w-10 h-10" />;
      case 'family':
        return <Heart className="w-10 h-10" />;
      case 'medical':
        return <Heart className="w-10 h-10" />;
      default:
        return <Phone className="w-10 h-10" />;
    }
  };

  const emergencyContacts = contacts.filter(c => c.type === 'emergency' || c.type === 'staff');
  const otherContacts = contacts.filter(c => c.type !== 'emergency' && c.type !== 'staff');

  return (
    <div className="space-y-6">
      {/* Emergency Alert Banner */}
      <div className="bg-gradient-to-r from-red-600 to-rose-600 rounded-3xl p-6 text-white shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-white mb-1">Emergency Contacts</h2>
            <p className="text-red-100">Tap any contact to call immediately</p>
          </div>
        </div>
      </div>

      {/* Emergency Services */}
      <div>
        <h3 className="text-gray-900 mb-4">Emergency Services</h3>
        <div className="space-y-3">
          {emergencyContacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => handleCall(contact)}
              className={`w-full ${getContactColor(contact.type)} text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl active:scale-95 transition-all`}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  {getContactIcon(contact.type)}
                </div>
                <div className="text-left flex-1">
                  <h4 className="text-white mb-1">{contact.name}</h4>
                  <p className="text-white/90 text-sm mb-2">{contact.relationship}</p>
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-5 h-5" />
                    <span className="text-lg">{contact.phone}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Family & Medical Contacts */}
      <div>
        <h3 className="text-gray-900 mb-4">Family & Medical</h3>
        <div className="space-y-3">
          {otherContacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white rounded-2xl p-5 shadow-lg border-2 border-gray-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 ${getContactColor(contact.type).replace('hover:', '')} rounded-full flex items-center justify-center text-white flex-shrink-0`}>
                  {getContactIcon(contact.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-gray-900 mb-1">{contact.name}</h4>
                  <p className="text-gray-600 text-sm">{contact.relationship}</p>
                </div>
                {contact.available && (
                  <div className="flex items-center gap-1 text-green-600 text-sm">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Available</span>
                  </div>
                )}
              </div>
              
              <div className="text-gray-700 mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-gray-500" />
                <span className="text-lg">{contact.phone}</span>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => speakContact(contact)}
                  className="flex-1 bg-gray-100 text-gray-700 py-4 px-4 rounded-xl hover:bg-gray-200 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span className="text-xl">🔊</span>
                  <span>Read Aloud</span>
                </button>
                <button
                  onClick={() => handleCall(contact)}
                  className={`flex-1 ${getContactColor(contact.type)} text-white py-4 px-4 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2`}
                >
                  <PhoneCall className="w-6 h-6" />
                  <span>Call Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Location Info */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-5 border border-indigo-200">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-gray-900 mb-2">Your Location</h4>
            <p className="text-gray-700 mb-1">Sunshine Senior Living Center</p>
            <p className="text-gray-600 text-sm">Room 302, Building A</p>
            <p className="text-gray-600 text-sm">123 Care Street, Boston, MA 02101</p>
          </div>
        </div>
      </div>

      {/* Help Text */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <div className="flex gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h4 className="text-gray-900 mb-1">Quick Tips</h4>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Tap "Call Now" to dial immediately</li>
              <li>• Use "Read Aloud" to hear contact details</li>
              <li>• Emergency contacts are always at the top</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
