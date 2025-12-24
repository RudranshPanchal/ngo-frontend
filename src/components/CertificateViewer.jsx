import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.jsx';
import { Button } from './ui/button.jsx';
import { Badge } from './ui/badge.jsx';
import { Download, Eye, Award, Calendar, User } from 'lucide-react';

const CertificateViewer = () => {
  const [certificates] = useState([
    {
      id: 1,
      title: 'Volunteer Excellence Certificate',
      description: 'Awarded for outstanding volunteer service',
      issueDate: '2024-01-15',
      type: 'Volunteer',
      status: 'Active',
      downloadUrl: '#'
    },
    {
      id: 2,
      title: 'Community Service Award',
      description: 'Recognition for community impact',
      issueDate: '2023-12-20',
      type: 'Service',
      status: 'Active',
      downloadUrl: '#'
    }
  ]);

  const handleViewCertificate = (certificate) => {
    alert(`Viewing Certificate: ${certificate.title}\nIssued: ${new Date(certificate.issueDate).toLocaleDateString()}\nDescription: ${certificate.description}`);
  };

  const handleDownloadCertificate = (certificate) => {
    alert(`Downloading certificate: ${certificate.title}`);
    // In a real app, this would trigger a download
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">My Certificates</h2>
          <p className="text-gray-600">View and download your earned certificates</p>
        </div>

        <div className="grid gap-4">
          {certificates.map((certificate) => (
            <Card key={certificate.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Award className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{certificate.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{certificate.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Issued: {new Date(certificate.issueDate).toLocaleDateString()}</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          {certificate.status}
                        </Badge>
                        <Badge className="bg-purple-100 text-purple-800 text-xs">
                          {certificate.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewCertificate(certificate)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => handleDownloadCertificate(certificate)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {certificates.length === 0 && (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-12 text-center">
              <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Certificates Yet</h3>
              <p className="text-gray-500">
                Complete volunteer activities to earn certificates and recognition.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CertificateViewer;