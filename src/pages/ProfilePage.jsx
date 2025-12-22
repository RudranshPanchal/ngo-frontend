import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { User, Mail, Phone, MapPin, Edit } from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { useAppContext } from '../contexts/AppContext.jsx';
import Modal from '../components/ui/modal.jsx';

const ProfilePage = () => {
  const { currentUser } = useAppContext();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.fullName || currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || currentUser?.contactNumber || '+91 98765 43210',
    address: currentUser?.address || '123 Main Street, Mumbai'
  });

  const handleSave = () => {
    // Validation
    if (!formData.name || !formData.email) {
      alert('Name and email are required');
      return;
    }
    
    // Save to localStorage
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const updatedUser = {
      ...userData,
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address
    };
    
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    setIsEditing(false);
    setShowSaveModal(true);
  };

  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
              
              <Card className="border-0 shadow-sm">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-purple-600" />
                      Personal Information
                    </CardTitle>
                    <Button
                      onClick={() => {
                        if (isEditing) {
                          // Reset form data when canceling
                          setFormData({
                            name: currentUser?.fullName || currentUser?.name || '',
                            email: currentUser?.email || '',
                            phone: currentUser?.phone || currentUser?.contactNumber || '+91 98765 43210',
                            address: currentUser?.address || '123 Main Street, Mumbai'
                          });
                        }
                        setIsEditing(!isEditing);
                      }}
                      variant="outline"
                      size="sm"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      {isEditing ? (
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      ) : (
                        <p className="text-gray-900">{formData.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      {isEditing ? (
                        <Input
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      ) : (
                        <p className="text-gray-900">{formData.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      {isEditing ? (
                        <Input
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      ) : (
                        <p className="text-gray-900">{formData.phone}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Role
                      </label>
                      <p className="text-gray-900 capitalize">{currentUser?.role}</p>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      {isEditing ? (
                        <Input
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                        />
                      ) : (
                        <p className="text-gray-900">{formData.address}</p>
                      )}
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="mt-6 flex gap-3">
                      <Button onClick={handleSave}>Save Changes</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Save Success Modal */}
      <Modal 
        isOpen={showSaveModal} 
        onClose={() => setShowSaveModal(false)}
        title="Profile Updated"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✅</span>
          </div>
          <p className="text-gray-700 mb-6">Your profile has been updated successfully!</p>
          <Button 
            onClick={() => setShowSaveModal(false)}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            OK
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ProfilePage;