import { useState, useEffect } from "react";
import {
  Bell,
  Volume2,
  Pill,
  Utensils,
  Calendar,
  CheckCircle2,
  Clock,
  Phone,
  MessageCircle,
} from "lucide-react";

interface Reminder {
  id: string;
  type: "medicine" | "meal" | "appointment" | "exercise";
  title: string;
  time: string;
  status: "pending" | "completed" | "missed";
  details?: string;
}

export function ElderlyDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "1",
      type: "medicine",
      title: "Blood Pressure Medication",
      time: "09:00 AM",
      status: "completed",
      details: "Take 1 tablet with water",
    },
    {
      id: "2",
      type: "meal",
      title: "Lunch Time",
      time: "12:30 PM",
      status: "pending",
      details: "Main dining hall",
    },
    {
      id: "3",
      type: "medicine",
      title: "Vitamin D Supplement",
      time: "02:00 PM",
      status: "pending",
      details: "Take 1 capsule",
    },
    {
      id: "4",
      type: "appointment",
      title: "Dr. Smith Visit",
      time: "03:30 PM",
      status: "pending",
      details: "Regular checkup - Room 205",
    },
    {
      id: "5",
      type: "medicine",
      title: "Evening Medication",
      time: "06:00 PM",
      status: "pending",
      details: "Take with dinner",
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const speakReminder = (reminder: Reminder) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(
        `Reminder: ${reminder.title} at ${reminder.time}. ${reminder.details || ""}`,
      );
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      speechSynthesis.speak(utterance);
    } else {
      alert(`Reminder: ${reminder.title} at ${reminder.time}`);
    }
  };

  const completeReminder = (id: string) => {
    setReminders(
      reminders.map((r) =>
        r.id === id ? { ...r, status: "completed" } : r,
      ),
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "medicine":
        return <Pill className="w-8 h-8" />;
      case "meal":
        return <Utensils className="w-8 h-8" />;
      case "appointment":
        return <Calendar className="w-8 h-8" />;
      default:
        return <Bell className="w-8 h-8" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "medicine":
        return "bg-blue-100 text-blue-700";
      case "meal":
        return "bg-green-100 text-green-700";
      case "appointment":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const pendingReminders = reminders.filter(
    (r) => r.status === "pending",
  );
  const completedReminders = reminders.filter(
    (r) => r.status === "completed",
  );

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white mb-1">
              Good Morning, Margaret!
            </h2>
            <p className="text-indigo-100">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="text-right">
            <div className="text-white">
              {currentTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
            <div className="text-white mb-1">
              {pendingReminders.length}
            </div>
            <p className="text-indigo-100 text-sm">
              Pending Tasks
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
            <div className="text-white mb-1">
              {completedReminders.length}
            </div>
            <p className="text-indigo-100 text-sm">
              Completed Today
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-gray-900 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-red-600 text-white p-6 rounded-2xl shadow-lg hover:bg-red-700 active:scale-95 transition-all">
            <Phone className="w-10 h-10 mx-auto mb-2" />
            <span className="block">Emergency Call</span>
          </button>
          <button className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg hover:bg-blue-700 active:scale-95 transition-all">
            <MessageCircle className="w-10 h-10 mx-auto mb-2" />
            <span className="block">Call Nurse</span>
          </button>
        </div>
      </div>

      {/* Upcoming Reminders */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-900">Today's Schedule</h3>
          <span className="text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-sm">
            {pendingReminders.length} pending
          </span>
        </div>

        <div className="space-y-3">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className={`bg-white rounded-2xl p-5 shadow-lg border-2 transition-all ${
                reminder.status === "completed"
                  ? "border-green-200 bg-green-50/50 opacity-75"
                  : "border-white hover:border-indigo-200"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-xl ${getColor(reminder.type)} flex-shrink-0`}
                >
                  {getIcon(reminder.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-gray-900">
                      {reminder.title}
                    </h4>
                    {reminder.status === "completed" && (
                      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Clock className="w-4 h-4" />
                    <span>{reminder.time}</span>
                  </div>

                  {reminder.details && (
                    <p className="text-gray-600 text-sm mb-3">
                      {reminder.details}
                    </p>
                  )}

                  {reminder.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => speakReminder(reminder)}
                        className="flex-1 bg-indigo-100 text-indigo-700 py-3 px-4 rounded-xl hover:bg-indigo-200 active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <Volume2 className="w-5 h-5" />
                        <span>Listen</span>
                      </button>
                      <button
                        onClick={() =>
                          completeReminder(reminder.id)
                        }
                        className="flex-1 bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Done</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Summary */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-200">
        <h3 className="text-gray-900 mb-3">Daily Progress</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-700">Medications</span>
              <span className="text-emerald-700">
                1 of 3 taken
              </span>
            </div>
            <div className="h-3 bg-white rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500"
                style={{ width: "33%" }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-700">Meals</span>
              <span className="text-emerald-700">
                1 of 3 meals
              </span>
            </div>
            <div className="h-3 bg-white rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500"
                style={{ width: "33%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}