import React, { useEffect, useState } from 'react';
import DashboardHeader from '../components/DashboardHeader.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Users, UserPlus, Search, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select.jsx';
import api from '../config/api.js';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/Foundation2.png"

const MemberManagementPage = () => {
    const [activeTab, setActiveTab] = useState('member-management');
    const [isLoading, setIsLoading] = useState(true);
    const [members, setMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        gender: '',
        dob: '',
        age: '',
        contactNumber: '',
        address: '',
        area: '',
        pinCode: '',
        typesOfSupport: '',
        governmentIdProof: '',
        specialRequirement: ''
    });

    const navigate = useNavigate()

    useEffect(() => {
        const loadMembers = () => {
            try {
                setIsLoading(true);
                const savedMembers = localStorage.getItem('members');
                if (savedMembers) {
                    setMembers(JSON.parse(savedMembers));
                } else {
                    // Demo data
                    const demoMembers = [
                        {
                            _id: '1',
                            fullName: 'Sunita Kumari',
                            email: 'sunita@example.com',
                            contactNumber: '+91 76543 21098',
                            address: '123 Main Street, Kolkata',
                            memberId: 'MEM001',
                            createdBy: { fullName: 'Admin User' }
                        },
                        {
                            _id: '2',
                            fullName: 'Kavita Singh',
                            email: 'kavita@example.com',
                            contactNumber: '+91 65432 10987',
                            address: '456 Park Avenue, Pune',
                            memberId: 'MEM002',
                            createdBy: { fullName: 'Admin User' }
                        }
                    ];
                    setMembers(demoMembers);
                    localStorage.setItem('members', JSON.stringify(demoMembers));
                }
            } finally {
                setIsLoading(false);
            }
        };
        loadMembers();
    }, []);

    const filtered = members.filter(m =>
        (m.fullName || m.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (m.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Create new member (offline mode)
            const newMember = {
                _id: Date.now().toString(),
                ...formData,
                memberId: `MEM${String(members.length + 1).padStart(3, '0')}`,
                createdBy: { fullName: 'Admin User' },
                createdAt: new Date().toISOString()
            };

            const updatedMembers = [newMember, ...members];
            setMembers(updatedMembers);
            localStorage.setItem('members', JSON.stringify(updatedMembers));

            alert('Member added successfully!');
            closeModal();
            loadMembers(); // Refresh the list
        } catch (err) {
            alert('Failed to add member. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="flex h-screen bg-gray-50">
                {/* Sidebar */}
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Dashboard Header */}
                    <DashboardHeader />

                    {/* Main Content Area */}
                    <div className="flex-1 overflow-auto p-6">
                        <h2 className="text-xl font-bold text-gray-900">Member Management</h2>

                        <div className="max-w-7xl mx-auto mt-10 bg-white shadow-xl p-10 rounded-md">
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                                <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <UserPlus className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900">Member Applications</h2>
                                </div>

                                <Button
                                    onClick={openModal}
                                    className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                                >
                                    Add Member
                                </Button>
                            </div>

                            {/* Search */}
                            <div className="flex-1 relative mb-6">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search members..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>

                            {/* List */}
                            {isLoading ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Members...</h3>
                                    <p className="text-gray-500">Please wait while we fetch the member data.</p>
                                </div>
                            ) : filtered.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Users className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
                                    <p className="text-gray-500">Try adjusting your search.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filtered.map((member, idx) => (
                                        <Card
                                            key={member._id || member.id || idx}
                                            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-purple-300 transition-all duration-300 group cursor-pointer"
                                            onClick={() => navigate(`/member-detail/${member._id}`, { state: { member } })}
                                        >
                                            <div
                                                className="flex items-start justify-between mb-4"
                                                onClick={() => navigate(`/member-detail/${member._id}`, { state: { member } })}
                                            >

                                                <div className="flex items-center space-x-3">
                                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                                                        {member.profilePic ? (
                                                            <img
                                                                src={member.profilePic}
                                                                alt={member.fullName || "User"}
                                                                className="w-full h-full object-cover rounded-full"
                                                            />
                                                        ) : (
                                                            <span className="text-white font-bold text-lg">
                                                                {(member.fullName || member.name || "M")
                                                                    .split(" ")
                                                                    .map((n) => n[0])
                                                                    .join("")}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-gray-900 text-lg">{member.fullName || member.name || 'Unknown'}</h3>
                                                        <p className="text-sm text-gray-500">{member.email || 'No email'}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2 text-sm text-gray-600">
                                                <p>📞 {member.contactNumber || 'No contact'}</p>
                                                <p>📍 {member.address || member.city || 'No address'}</p>
                                                <p>🆔 Member ID: {member.memberId || 'N/A'}</p>
                                                <p>👤 Created : {member.createdBy.fullName || 'N/A'}</p>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Member Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="max-w-3xl w-full mx-auto max-h-[85vh] overflow-y-auto scrollbar-hide">
                        <Card className="bg-white shadow-lg border-0">
                            <div className="flex justify-end mb-4 p-4">
                                <button
                                    onClick={closeModal}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                                >
                                    <X className="h-5 w-5 text-gray-600" />
                                </button>
                            </div>
                            <CardHeader className="text-center pb-4 pt-0">
                                <div className="flex justify-center mb-4">
                                    <img src={logo} alt="logo" className='w-40 h-20' />
                                </div>
                                <CardTitle className="text-2xl font-bold text-purple-700">Add Member</CardTitle>
                                <p className="text-gray-600 mt-1">Please fill member details carefully</p>
                            </CardHeader>
                            <CardContent className="px-8 pb-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Personal Info */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Full Name *</label>
                                                <input
                                                    type="text"
                                                    value={formData.fullName}
                                                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                                                    placeholder="Enter full name"
                                                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Email *</label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                                    placeholder="Enter Email"
                                                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Password *</label>
                                                <input
                                                    type="password"
                                                    value={formData.password}
                                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                                    placeholder="Enter Password"
                                                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                                    required
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-700">Gender *</label>
                                                    <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                                                        <SelectTrigger className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                                                            <SelectValue placeholder="Select gender" />
                                                        </SelectTrigger>
                                                        <SelectContent className="z-[60] bg-white border border-gray-200 rounded-md shadow-lg">
                                                            <SelectItem value="male" className="bg-white hover:bg-gray-50 cursor-pointer">Male</SelectItem>
                                                            <SelectItem value="female" className="bg-white hover:bg-gray-50 cursor-pointer">Female</SelectItem>
                                                            <SelectItem value="other" className="bg-white hover:bg-gray-50 cursor-pointer">Other</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                                                    <input
                                                        type="date"
                                                        value={formData.dateOfBirth}
                                                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                                        className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Age</label>
                                                <input
                                                    type="number"
                                                    value={formData.age}
                                                    onChange={(e) => handleInputChange('age', e.target.value)}
                                                    placeholder="Enter age"
                                                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact & Address */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact & Address</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Contact Number (optional)</label>
                                                <input
                                                    type="tel"
                                                    value={formData.contactNumber}
                                                    onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                                                    placeholder="+91 98765 43210"
                                                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Area *</label>
                                                <input
                                                    type="text"
                                                    value={formData.area}
                                                    onChange={(e) => handleInputChange('area', e.target.value)}
                                                    placeholder="Area"
                                                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Pincode *</label>
                                                <input
                                                    type="text"
                                                    value={formData.pincode}
                                                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                                                    placeholder="e.g., 452001"
                                                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Address *</label>
                                            <textarea
                                                rows={3}
                                                value={formData.address}
                                                onChange={(e) => handleInputChange('address', e.target.value)}
                                                placeholder="Enter complete address"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Additional Details */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Additional Details</h3>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Type of Support Needed *</label>
                                            <Select value={formData.supportType} onValueChange={(value) => handleInputChange('supportType', value)}>
                                                <SelectTrigger className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                                                    <SelectValue placeholder="Select support type" />
                                                </SelectTrigger>
                                                <SelectContent className="z-50 bg-white border border-gray-200 rounded-md shadow-lg">
                                                    <SelectItem value="training" className="bg-white hover:bg-gray-50 cursor-pointer">Training</SelectItem>
                                                    <SelectItem value="education" className="bg-white hover:bg-gray-50 cursor-pointer">Education</SelectItem>
                                                    <SelectItem value="health" className="bg-white hover:bg-gray-50 cursor-pointer">Health</SelectItem>
                                                    <SelectItem value="livelihood" className="bg-white hover:bg-gray-50 cursor-pointer">Livelihood</SelectItem>
                                                    <SelectItem value="other" className="bg-white hover:bg-gray-50 cursor-pointer">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Any Government ID / Proof (optional)</label>
                                            <input
                                                type="string"
                                                onChange={(e) => handleInputChange('governmentIdProof', e.target.value)}
                                                value={formData.governmentIdProof}
                                                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Notes / Special Requirements</label>
                                            <textarea
                                                rows={3}
                                                value={formData.notes}
                                                onChange={(e) => handleInputChange('notes', e.target.value)}
                                                placeholder="Any additional notes"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="pt-4 flex gap-3 justify-end">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={closeModal}
                                            className="px-6 py-2 cursor-pointer"
                                            disabled={isSubmitting}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    <span>Submitting...</span>
                                                </div>
                                            ) : (
                                                'Add Member'
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </>
    );
};

export default MemberManagementPage;


