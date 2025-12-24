import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.jsx';
import { TrendingUp, Users, GraduationCap, Heart, Home } from 'lucide-react';

const DonorImpact = () => {
  const [impactData, setImpactData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setImpactData({
        totalBeneficiaries: 240,
        educationImpact: { students: 50, programs: 3 },
        healthcareImpact: { families: 80, checkups: 320 },
        nutritionImpact: { children: 110, meals: 2200 },
        impactScore: 85,
        stories: [
          {
            id: 1,
            name: 'Priya',
            story: 'Thanks to your donation, I completed my computer training and now work at a local IT company.',
            category: 'Education'
          },
          {
            id: 2,
            name: 'Sunita',
            story: 'The healthcare support helped my family during a medical emergency. We are forever grateful.',
            category: 'Healthcare'
          }
        ]
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Impact Report...</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Impact Report</h1>
          <p className="text-gray-600">See the difference your donations are making in people's lives.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="p-3 rounded-full bg-purple-100 w-fit mx-auto mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{impactData.totalBeneficiaries}</p>
              <p className="text-sm text-gray-600">Lives Impacted</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="p-3 rounded-full bg-blue-100 w-fit mx-auto mb-4">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{impactData.educationImpact?.students}</p>
              <p className="text-sm text-gray-600">Students Educated</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="p-3 rounded-full bg-red-100 w-fit mx-auto mb-4">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{impactData.healthcareImpact?.families}</p>
              <p className="text-sm text-gray-600">Families Supported</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="p-3 rounded-full bg-green-100 w-fit mx-auto mb-4">
                <Home className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{impactData.nutritionImpact?.children}</p>
              <p className="text-sm text-gray-600">Children Fed</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Impact Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Education Programs</span>
                    <span className="text-sm text-gray-600">{impactData.educationImpact?.students} students</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Healthcare Support</span>
                    <span className="text-sm text-gray-600">{impactData.healthcareImpact?.families} families</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Nutrition Programs</span>
                    <span className="text-sm text-gray-600">{impactData.nutritionImpact?.children} children</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Success Stories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {impactData.stories?.map((story) => (
                  <div key={story.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{story.name}</h4>
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                        {story.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 italic">"{story.story}"</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Impact Score</h3>
              <div className="text-6xl font-bold text-purple-600 mb-4">{impactData.impactScore}</div>
              <p className="text-gray-600 mb-6">
                Your contributions have created lasting change in the community. Thank you for being a catalyst for positive transformation.
              </p>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                <p className="text-lg font-semibold text-gray-900 mb-2">Together, we're building a better tomorrow</p>
                <p className="text-gray-600">
                  Every donation, no matter the size, contributes to our mission of empowering women and transforming communities.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonorImpact;