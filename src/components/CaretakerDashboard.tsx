import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import {
  Users,
  Bell,
  Activity,
  MessageSquare,
  Plus,
  Search,
  LogOut,
  Shield,
  Clock,
  Heart,
  TrendingUp,
  Calendar,
  Edit,
  AlertCircle
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CaretakerDashboardProps {
  user: any;
  onLogout: () => void;
}

export function CaretakerDashboard({ user, onLogout }: CaretakerDashboardProps) {
  const [selectedResident, setSelectedResident] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const residents = [
    {
      id: 1,
      name: 'Margaret Johnson',
      age: 78,
      room: '101',
      status: 'stable',
      lastCheckup: '2 hours ago',
      medications: 3,
      upcomingTasks: 2
    },
    {
      id: 2,
      name: 'Robert Williams',
      age: 82,
      room: '102',
      status: 'attention',
      lastCheckup: '5 hours ago',
      medications: 5,
      upcomingTasks: 4
    },
    {
      id: 3,
      name: 'Dorothy Martinez',
      age: 75,
      room: '103',
      status: 'stable',
      lastCheckup: '1 hour ago',
      medications: 2,
      upcomingTasks: 1
    },
    {
      id: 4,
      name: 'James Anderson',
      age: 80,
      room: '104',
      status: 'stable',
      lastCheckup: '3 hours ago',
      medications: 4,
      upcomingTasks: 3
    }
  ];

  const healthData = [
    { date: 'Mon', bloodPressure: 120, heartRate: 72, temperature: 98.6 },
    { date: 'Tue', bloodPressure: 118, heartRate: 70, temperature: 98.4 },
    { date: 'Wed', bloodPressure: 122, heartRate: 74, temperature: 98.7 },
    { date: 'Thu', bloodPressure: 119, heartRate: 71, temperature: 98.5 },
    { date: 'Fri', bloodPressure: 121, heartRate: 73, temperature: 98.6 },
    { date: 'Sat', bloodPressure: 120, heartRate: 72, temperature: 98.4 },
    { date: 'Sun', bloodPressure: 118, heartRate: 70, temperature: 98.5 }
  ];

  const medicationAdherence = [
    { day: 'Mon', completed: 95, missed: 5 },
    { day: 'Tue', completed: 100, missed: 0 },
    { day: 'Wed', completed: 90, missed: 10 },
    { day: 'Thu', completed: 98, missed: 2 },
    { day: 'Fri', completed: 100, missed: 0 },
    { day: 'Sat', completed: 95, missed: 5 },
    { day: 'Sun', completed: 97, missed: 3 }
  ];

  const chatMessages = [
    {
      id: 1,
      resident: 'Margaret Johnson',
      family: 'John Johnson',
      lastMessage: 'Thank you for the update on my mother\'s health.',
      time: '10 min ago',
      unread: false
    },
    {
      id: 2,
      resident: 'Robert Williams',
      family: 'Sarah Williams',
      lastMessage: 'Can we schedule a call to discuss his medication?',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      resident: 'Dorothy Martinez',
      family: 'Maria Martinez',
      lastMessage: 'She mentioned some discomfort. Is everything okay?',
      time: '2 hours ago',
      unread: true
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      resident: 'Margaret Johnson',
      task: 'Blood Pressure Medication',
      time: '9:00 AM',
      type: 'medication',
      status: 'pending'
    },
    {
      id: 2,
      resident: 'Robert Williams',
      task: 'Diabetes Check',
      time: '10:30 AM',
      type: 'checkup',
      status: 'pending'
    },
    {
      id: 3,
      resident: 'Dorothy Martinez',
      task: 'Physical Therapy Session',
      time: '2:00 PM',
      type: 'therapy',
      status: 'scheduled'
    },
    {
      id: 4,
      resident: 'James Anderson',
      task: 'Evening Medication',
      time: '6:00 PM',
      type: 'medication',
      status: 'scheduled'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'attention':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const filteredResidents = residents.filter(resident =>
    resident.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resident.room.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Shield className="w-10 h-10 text-indigo-600" />
              <div>
                <h1 className="text-2xl">Staff Dashboard</h1>
                <p className="text-sm text-gray-600">{user.name} - {user.role}</p>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Total Residents</CardTitle>
              <Users className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{residents.length}</div>
              <p className="text-xs text-gray-500 mt-1">Active residents</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Pending Tasks</CardTitle>
              <Bell className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">
                {upcomingTasks.filter(t => t.status === 'pending').length}
              </div>
              <p className="text-xs text-gray-500 mt-1">Require attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Health Alerts</CardTitle>
              <AlertCircle className="w-4 h-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">
                {residents.filter(r => r.status === 'attention').length}
              </div>
              <p className="text-xs text-gray-500 mt-1">Need attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Unread Messages</CardTitle>
              <MessageSquare className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">
                {chatMessages.filter(m => m.unread).length}
              </div>
              <p className="text-xs text-gray-500 mt-1">From families</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="residents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="residents">
              <Users className="w-4 h-4 mr-2" />
              Residents
            </TabsTrigger>
            <TabsTrigger value="tasks">
              <Bell className="w-4 h-4 mr-2" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="health">
              <Activity className="w-4 h-4 mr-2" />
              Health Monitor
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageSquare className="w-4 h-4 mr-2" />
              Family Chat
            </TabsTrigger>
            <TabsTrigger value="schedule">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </TabsTrigger>
          </TabsList>

          {/* Residents Tab */}
          <TabsContent value="residents" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Resident Management</CardTitle>
                    <CardDescription>View and manage resident information</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Resident
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Resident</DialogTitle>
                        <DialogDescription>Enter the resident's information</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input placeholder="John Doe" />
                          </div>
                          <div className="space-y-2">
                            <Label>Age</Label>
                            <Input type="number" placeholder="75" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Room Number</Label>
                            <Input placeholder="101" />
                          </div>
                          <div className="space-y-2">
                            <Label>Blood Type</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="a+">A+</SelectItem>
                                <SelectItem value="a-">A-</SelectItem>
                                <SelectItem value="b+">B+</SelectItem>
                                <SelectItem value="b-">B-</SelectItem>
                                <SelectItem value="o+">O+</SelectItem>
                                <SelectItem value="o-">O-</SelectItem>
                                <SelectItem value="ab+">AB+</SelectItem>
                                <SelectItem value="ab-">AB-</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Medical Conditions</Label>
                          <Textarea placeholder="List any medical conditions..." />
                        </div>
                        <div className="space-y-2">
                          <Label>Emergency Contact</Label>
                          <Input placeholder="Name and phone number" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Resident</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search residents by name or room..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <ScrollArea className="h-[500px]">
                  <div className="grid gap-4">
                    {filteredResidents.map((resident) => (
                      <Card key={resident.id} className="border-2">
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Avatar className="w-12 h-12">
                                <AvatarFallback>{resident.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="text-lg">{resident.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <span>Age: {resident.age}</span>
                                  <span>•</span>
                                  <span>Room: {resident.room}</span>
                                  <span>•</span>
                                  <span>Last checkup: {resident.lastCheckup}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge className={getStatusColor(resident.status)}>
                                {resident.status}
                              </Badge>
                              <div className="text-sm text-gray-600">
                                <div>{resident.medications} medications</div>
                                <div>{resident.upcomingTasks} upcoming tasks</div>
                              </div>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </Button>
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

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Task & Reminder Management</CardTitle>
                    <CardDescription>Create and manage tasks for residents</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Task
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Task</DialogTitle>
                        <DialogDescription>Set up a reminder or task for a resident</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label>Select Resident</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose resident" />
                            </SelectTrigger>
                            <SelectContent>
                              {residents.map((resident) => (
                                <SelectItem key={resident.id} value={resident.id.toString()}>
                                  {resident.name} - Room {resident.room}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Task Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="medication">Medication</SelectItem>
                              <SelectItem value="checkup">Health Checkup</SelectItem>
                              <SelectItem value="meal">Meal Reminder</SelectItem>
                              <SelectItem value="therapy">Therapy Session</SelectItem>
                              <SelectItem value="activity">Activity</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Task Title</Label>
                          <Input placeholder="e.g., Blood pressure medication" />
                        </div>
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea placeholder="Additional details..." />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Date</Label>
                            <Input type="date" />
                          </div>
                          <div className="space-y-2">
                            <Label>Time</Label>
                            <Input type="time" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" id="voice" />
                          <Label htmlFor="voice">Enable voice reminder for resident</Label>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button>Create Task</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-3">
                    {upcomingTasks.map((task) => (
                      <Card key={task.id} className="border-l-4 border-l-indigo-500">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-base">{task.task}</h3>
                                <Badge variant="outline">{task.type}</Badge>
                              </div>
                              <div className="text-sm text-gray-600">
                                <span>{task.resident}</span> • <span>{task.time}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}>
                                {task.status}
                              </Badge>
                              {task.status === 'pending' && (
                                <Button size="sm">Mark Complete</Button>
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

          {/* Health Monitor Tab */}
          <TabsContent value="health" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Health Monitoring Dashboard</CardTitle>
                <CardDescription>Track vital signs and medication adherence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Label>Select Resident</Label>
                  <Select defaultValue="1">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {residents.map((resident) => (
                        <SelectItem key={resident.id} value={resident.id.toString()}>
                          {resident.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg mb-4">Vital Signs (Last 7 Days)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={healthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="bloodPressure" stroke="#8b5cf6" name="Blood Pressure" />
                        <Line type="monotone" dataKey="heartRate" stroke="#ef4444" name="Heart Rate" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div>
                    <h3 className="text-lg mb-4">Medication Adherence (%)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={medicationAdherence}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="completed" fill="#10b981" name="Completed" />
                        <Bar dataKey="missed" fill="#ef4444" name="Missed" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <Heart className="w-8 h-8 mx-auto mb-2 text-red-500" />
                        <div className="text-2xl">120/80</div>
                        <div className="text-sm text-gray-600">Blood Pressure</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <Activity className="w-8 h-8 mx-auto mb-2 text-green-500" />
                        <div className="text-2xl">72 bpm</div>
                        <div className="text-sm text-gray-600">Heart Rate</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                        <div className="text-2xl">96%</div>
                        <div className="text-sm text-gray-600">Med Adherence</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Family Communication</CardTitle>
                <CardDescription>Chat with residents' family members</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-3">
                    {chatMessages.map((chat) => (
                      <Card key={chat.id} className={`cursor-pointer hover:shadow-md transition-shadow ${chat.unread ? 'border-l-4 border-l-indigo-500' : ''}`}>
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <Avatar>
                                <AvatarFallback>{chat.family.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-base">{chat.family}</h3>
                                  {chat.unread && (
                                    <Badge variant="default" className="text-xs">New</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mb-1">
                                  Re: {chat.resident}
                                </p>
                                <p className="text-sm">{chat.lastMessage}</p>
                                <p className="text-xs text-gray-500 mt-1">{chat.time}</p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              Reply
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Daily Schedule Overview</CardTitle>
                <CardDescription>View and manage today's schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['8:00 AM - Morning Rounds', '9:00 AM - Medication Distribution', '12:00 PM - Lunch Service', '2:00 PM - Therapy Sessions', '5:00 PM - Evening Medication', '6:00 PM - Dinner Service', '8:00 PM - Evening Checkup'].map((schedule, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <span className="flex-1">{schedule}</span>
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
