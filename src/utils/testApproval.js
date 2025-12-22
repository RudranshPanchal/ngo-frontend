// Test function to verify approval flow
export const testApprovalFlow = () => {
  // Create a test application
  const testApp = {
    id: Date.now(),
    fullName: 'Test User',
    email: 'test@example.com',
    phoneNumber: '+91 8770702092',
    address: 'Test Address',
    city: 'Test City',
    state: 'Test State',
    pincode: '123456',
    areaOfInterest: 'Digital Skills Training',
    occupation: 'Student',
    status: 'Pending',
    submittedAt: new Date().toISOString()
  };

  // Add to applications
  const existingApps = JSON.parse(localStorage.getItem('membershipApplications') || '[]');
  existingApps.push(testApp);
  localStorage.setItem('membershipApplications', JSON.stringify(existingApps));

  console.log('Test application created:', testApp);
  return testApp.id;
};

export const approveTestApplication = (appId) => {
  const applications = JSON.parse(localStorage.getItem('membershipApplications') || '[]');
  const updated = applications.map(app => 
    app.id === appId ? { ...app, status: 'Approved' } : app
  );
  localStorage.setItem('membershipApplications', JSON.stringify(updated));

  // Add to members
  const approvedApp = applications.find(app => app.id === appId);
  if (approvedApp) {
    const existingMembers = JSON.parse(localStorage.getItem('members') || '[]');
    const newMember = {
      _id: Date.now().toString(),
      fullName: approvedApp.fullName,
      email: approvedApp.email,
      contactNumber: approvedApp.phoneNumber,
      address: `${approvedApp.address}, ${approvedApp.city}, ${approvedApp.state}`,
      memberId: `MEM${String(existingMembers.length + 1).padStart(3, '0')}`,
      createdBy: { fullName: 'Admin User' },
      createdAt: new Date().toISOString()
    };
    const updatedMembers = [newMember, ...existingMembers];
    localStorage.setItem('members', JSON.stringify(updatedMembers));
    
    console.log('Member created:', newMember);
    window.dispatchEvent(new Event('storage'));
  }
};