import api from '../config/api.js';

export const emailService = {
  // Send welcome email to new members
  sendWelcomeEmail: async (userData) => {
    try {
      const response = await api.post('/api/email/welcome', {
        to: userData.email,
        name: userData.name,
        role: userData.role
      });
      return response.data;
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      throw error;
    }
  },

  // Send certificate notification
  sendCertificateEmail: async (certificateData) => {
    try {
      const response = await api.post('/api/email/certificate', {
        to: certificateData.email,
        name: certificateData.name,
        course: certificateData.course,
        certificateUrl: certificateData.url
      });
      return response.data;
    } catch (error) {
      console.error('Failed to send certificate email:', error);
      throw error;
    }
  },

  // Send donation acknowledgment
  sendDonationAck: async (donationData) => {
    try {
      const response = await api.post('/api/email/donation-ack', {
        to: donationData.email,
        name: donationData.name,
        amount: donationData.amount,
        transactionId: donationData.transactionId
      });
      return response.data;
    } catch (error) {
      console.error('Failed to send donation acknowledgment:', error);
      throw error;
    }
  }
};


