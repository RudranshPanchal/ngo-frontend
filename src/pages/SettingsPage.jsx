import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Settings, Lock, Bell, Shield, Palette } from "lucide-react";
import DashboardHeader from "../components/DashboardHeader.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useTheme } from "../contexts/ThemeContext.jsx";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("settings");
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
  });
  const { theme, setTheme } = useTheme('light');
  return (
    <>
      <div className="flex h-screen ">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />

          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Settings
              </h1>

              <div className="space-y-6">
                {/* Password Settings */}
                <Card className="border-0 shadow-sm">
                  <CardHeader className="border-b border-gray-100">
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-purple-600" />
                      Password & Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <Input
                          type="password"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <Input
                          type="password"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm Password
                        </label>
                        <Input
                          type="password"
                          placeholder="Confirm new password"
                        />
                      </div>
                      <Button>Update Password</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card className="border-0 shadow-sm">
                  <CardHeader className="border-b border-gray-100">
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-purple-600" />
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Email Notifications
                          </h4>
                          <p className="text-sm text-gray-500">
                            Receive notifications via email
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.email}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              email: e.target.checked,
                            })
                          }
                          className="h-4 w-4 text-purple-600"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Push Notifications
                          </h4>
                          <p className="text-sm text-gray-500">
                            Receive push notifications
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.push}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              push: e.target.checked,
                            })
                          }
                          className="h-4 w-4 text-purple-600"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            SMS Notifications
                          </h4>
                          <p className="text-sm text-gray-500">
                            Receive notifications via SMS
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.sms}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              sms: e.target.checked,
                            })
                          }
                          className="h-4 w-4 text-purple-600"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Theme Settings */}
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto (system)</option>
                </select>
                <Card className="border-0 shadow-sm">
                  <CardHeader className="border-b border-gray-100">
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5 text-purple-600" />
                      Appearance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Theme
                        </label>
                        <select
                          value={theme}
                          onChange={(e) => setTheme(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                          <option value="auto">Auto</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Privacy Settings */}
                <Card className="border-0 shadow-sm">
                  <CardHeader className="border-b border-gray-100">
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-purple-600" />
                      Privacy & Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <Button
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Download My Data
                      </Button>
                      <Button
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
