export const reportGenerator = {
  // Generate CSV report
  generateCSV: (data, filename) => {
    if (!data || !Array.isArray(data) || data.length === 0) return;
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9-_]/g, '');
    const headers = Object.keys(data[0]).map(h => h.replace(/["\r\n]/g, '')).join(',');
    const rows = data.map(row => 
      Object.values(row).map(v => String(v).replace(/["\r\n]/g, '')).join(',')
    ).join('\n');
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${sanitizedFilename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // Generate monthly report data
  generateMonthlyReport: (volunteers, members, donations) => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    
    return {
      title: `Monthly Report - ${currentMonth}`,
      summary: {
        totalVolunteers: volunteers.length,
        totalMembers: members.length,
        totalDonations: donations.reduce((sum, d) => sum + d.amount, 0),
        newRegistrations: volunteers.filter(v => 
          new Date(v.createdAt).getMonth() === new Date().getMonth()
        ).length
      },
      data: {
        volunteers,
        members,
        donations
      }
    };
  },

  // Export to Excel format (basic CSV)
  exportToExcel: (reportData, filename) => {
    if (!reportData || !reportData.summary) return;
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9-_]/g, '');
    const worksheet = [
      ['Report Summary'],
      ['Total Volunteers', reportData.summary.totalVolunteers || 0],
      ['Total Members', reportData.summary.totalMembers || 0],
      ['Total Donations', `₹${(reportData.summary.totalDonations || 0).toLocaleString()}`],
      ['New Registrations', reportData.summary.newRegistrations || 0],
      [''],
      ['Detailed Data'],
      ...(reportData.data?.volunteers || []).map(v => [
        String(v.name || '').replace(/["\r\n]/g, ''),
        String(v.email || '').replace(/["\r\n]/g, ''),
        String(v.phone || '').replace(/["\r\n]/g, ''),
        String(v.skills || '').replace(/["\r\n]/g, '')
      ])
    ];

    const csvContent = worksheet.map(row => row.join(',')).join('\n');
    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);
    
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${sanitizedFilename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};