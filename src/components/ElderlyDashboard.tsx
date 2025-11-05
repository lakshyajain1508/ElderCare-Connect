import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Bell, 
  Phone, 
  Heart, 
  MessageSquare, 
  FileText, 
  Volume2, 
  AlertCircle,
  LogOut,
  Clock,
  Pill,
  Utensils,
  Activity
} from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface ElderlyDashboardProps {
  user: any;
  onLogout: () => void;
}

export function ElderlyDashboard({ user, onLogout }: ElderlyDashboardProps) {
  const [speakingReminder, setSpeakingReminder] = useState<string | null>(null);

  const reminders = [
    {
      id: 1,
      type: 'medicine',
      title: 'Blood Pressure Medication',
      time: '9:00 AM',
      status: 'pending',
      description: 'Take 1 tablet with water'
    },
    {
      id: 2,
      type: 'food',
      title: 'Breakfast Time',
      time: '8:30 AM',
      status: 'completed',
      description: 'Dining room is open'
    },
    {
      id: 3,
      type: 'medicine',
      title: 'Diabetes Medication',
      time: '2:00 PM',
      status: 'pending',
      description: 'Take after lunch'
    },
    {
      id: 4,
      type: 'activity',
      title: 'Afternoon Walk',
      time: '4:00 PM',
      status: 'upcoming',
      description: 'Garden area'
    }
  ];

  const emergencyContacts = [
    { name: 'Emergency Services', number: '911', type: 'emergency' },
    { name: 'Nurse Station', number: '(555) 0123', type: 'nurse' },
    { name: 'Dr. Sarah Chen', number: '(555) 0124', type: 'doctor' },
    { name: 'Family - John (Son)', number: '(555) 0125', type: 'family' }
  ];

  const messages = [
    {
      id: 1,
      from: 'Dr. Sarah Chen',
      message: 'Your checkup went great today! Keep up the good work.',
      time: '2 hours ago',
      type: 'staff'
    },
    {
      id: 2,
      from: 'John (Son)',
      message: 'Hi Mom! I\'ll visit you this Sunday. Looking forward to it!',
      time: '5 hours ago',
      type: 'family'
    },
    {
      id: 3,
      from: 'Nurse Mary',
      message: 'Reminder: Please come to the activity room at 3 PM for music therapy.',
      time: '1 day ago',
      type: 'staff'
    }
  ];

  const healthRecords = {
    bloodPressure: '120/80 mmHg',
    heartRate: '72 bpm',
    temperature: '98.6°F',
    lastCheckup: 'Today, 10:30 AM',
    medications: [
      'Lisinopril 10mg - Once daily',
      'Metformin 500mg - Twice daily',
      'Vitamin D3 - Once daily'
    ]
  };

  const speakReminder = (text: string) => {
    setSpeakingReminder(text);
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
      
      utterance.onend = () => {
        setSpeakingReminder(null);
      };
    } else {
      setTimeout(() => setSpeakingReminder(null), 2000);
    }
  };

  const getReminderIcon = (type: string) => {
    switch (type) {
      case 'medicine':
        return <Pill className="w-8 h-8" />;
      case 'food':
        return <Utensils className="w-8 h-8" />;
      case 'activity':
        return <Activity className="w-8 h-8" />;
      default:
        return <Clock className="w-8 h-8" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Heart className="w-10 h-10 text-indigo-600" />
              <div>
                <h1 className="text-3xl text-indigo-900">Welcome, {user.name}!</h1>
                <p className="text-gray-600">Have a wonderful day</p>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout} className="h-12 px-6">
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Emergency Alert */}
        <Alert className="mb-6 bg-red-50 border-red-200">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <AlertDescription className="text-base">
            In case of emergency, press the red emergency button below or call 911
          </AlertDescription>
        </Alert>

        {/* Emergency Contact Button */}
        <Button 
          className="w-full h-20 mb-6 text-xl bg-red-600 hover:bg-red-700"
          size="lg"
        >
          <Phone className="w-8 h-8 mr-3" />
          EMERGENCY CALL
        </Button>

        <Tabs defaultValue="reminders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-14">
            <TabsTrigger value="reminders" className="text-base">
              <Bell className="w-5 h-5 mr-2" />
              Reminders
            </TabsTrigger>
            <TabsTrigger value="contacts" className="text-base">
              <Phone className="w-5 h-5 mr-2" />
              Contacts
            </TabsTrigger>
            <TabsTrigger value="messages" className="text-base">
              <MessageSquare className="w-5 h-5 mr-2" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="health" className="text-base">
              <FileText className="w-5 h-5 mr-2" />
              Health
            </TabsTrigger>
          </TabsList>

          {/* Reminders Tab */}
          <TabsContent value="reminders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Today's Reminders</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-4">
                    {reminders.map((reminder) => (
                      <Card 
                        key={reminder.id} 
                        className={`border-2 ${getStatusColor(reminder.status)}`}
                      >
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1">
                              <div className="p-3 bg-white rounded-lg">
                                {getReminderIcon(reminder.type)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="text-xl">{reminder.title}</h3>
                                  <Badge variant="outline" className="text-base px-3 py-1">
                                    {reminder.time}
                                  </Badge>
                                </div>
                                <p className="text-gray-600 text-lg">{reminder.description}</p>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Button
                                size="lg"
                                variant="outline"
                                className="h-14 w-14"
                                onClick={() => speakReminder(`${reminder.title}. ${reminder.description}. Time: ${reminder.time}`)}
                              >
                                <Volume2 className={`w-6 h-6 ${speakingReminder === `${reminder.title}. ${reminder.description}. Time: ${reminder.time}` ? 'text-indigo-600 animate-pulse' : ''}`} />
                              </Button>
                              {reminder.status === 'pending' && (
                                <Button size="lg" className="h-14 px-6">
                                  Done
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Emergency & Quick Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {emergencyContacts.map((contact, index) => (
                    <Card 
                      key={index} 
                      className={`border-2 ${contact.type === 'emergency' ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`p-4 rounded-full ${contact.type === 'emergency' ? 'bg-red-600' : 'bg-indigo-100'}`}>
                              <Phone className={`w-8 h-8 ${contact.type === 'emergency' ? 'text-white' : 'text-indigo-600'}`} />
                            </div>
                            <div>
                              <h3 className="text-xl">{contact.name}</h3>
                              <p className="text-gray-600 text-lg">{contact.number}</p>
                            </div>
                          </div>
                          <Button 
                            size="lg" 
                            className={`h-16 px-8 text-lg ${contact.type === 'emergency' ? 'bg-red-600 hover:bg-red-700' : ''}`}
                          >
                            Call Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <Card key={message.id} className="border-2 border-gray-200">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback className="text-lg">
                                {message.from.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg">{message.from}</h3>
                                <Badge variant={message.type === 'family' ? 'default' : 'secondary'}>
                                  {message.type}
                                </Badge>
                              </div>
                              <p className="text-gray-700 text-base mb-2">{message.message}</p>
                              <p className="text-sm text-gray-500">{message.time}</p>
                            </div>
                            <Button
                              variant="outline"
                              size="lg"
                              className="h-12 w-12"
                              onClick={() => speakReminder(`Message from ${message.from}. ${message.message}`)}
                            >
                              <Volume2 className="w-5 h-5" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
                <div className="mt-4">
                  <Button size="lg" className="w-full h-14 text-lg">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Send New Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Health Records Tab */}
          <TabsContent value="health" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Latest Vitals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Heart className="w-8 h-8 text-red-500" />
                        <span className="text-lg">Blood Pressure</span>
                      </div>
                      <span className="text-xl">{healthRecords.bloodPressure}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Activity className="w-8 h-8 text-green-500" />
                        <span className="text-lg">Heart Rate</span>
                      </div>
                      <span className="text-xl">{healthRecords.heartRate}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Activity className="w-8 h-8 text-orange-500" />
                        <span className="text-lg">Temperature</span>
                      </div>
                      <span className="text-xl">{healthRecords.temperature}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Last updated: {healthRecords.lastCheckup}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Current Medications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {healthRecords.medications.map((med, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <Pill className="w-6 h-6 text-indigo-600 mt-1" />
                        <span className="text-base">{med}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
