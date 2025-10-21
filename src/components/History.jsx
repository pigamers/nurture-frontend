import { useState, useEffect } from 'react';
import { health } from '../api';

const History = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await health.getHistory();
        setAssessments(response.data.assessments);
      } catch (err) {
        console.error('Failed to fetch history:', err);
      }
      setLoading(false);
    };
    fetchHistory();
  }, []);

  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 60) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (score >= 40) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your health history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Health History</h2>
        <p className="text-gray-600">Track your wellness journey</p>
      </div>

      {assessments.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Assessments Yet</h3>
          <p className="text-gray-600 mb-6">Take your first health assessment to get started!</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Take Assessment
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">{assessments.length}</div>
              <div className="text-sm text-gray-600">Total Assessments</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-2xl font-bold text-green-600">
                {assessments.length > 0 ? Math.round(assessments.reduce((sum, a) => sum + a.result.score, 0) / assessments.length) : 0}
              </div>
              <div className="text-sm text-gray-600">Average Score</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {assessments.length > 0 ? Math.ceil((Date.now() - new Date(assessments[0].createdAt)) / (1000 * 60 * 60 * 24)) : 0}
              </div>
              <div className="text-sm text-gray-600">Days Since Last</div>
            </div>
          </div>

          <div className="space-y-4">
            {assessments.map((assessment, index) => (
              <div key={assessment._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      Assessment #{assessments.length - index}
                    </div>
                    <div className="text-lg font-semibold text-gray-800">
                      {new Date(assessment.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getScoreColor(assessment.result.score)}`}>
                    {assessment.result.score}/100 - {assessment.result.category}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-md">
                    <div className="text-sm text-gray-600 mb-1">Sleep</div>
                    <div className="font-semibold text-blue-600">{assessment.sleepQuality}/5</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-md">
                    <div className="text-sm text-gray-600 mb-1">Appetite</div>
                    <div className="font-semibold text-green-600">{assessment.appetite}/5</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-md">
                    <div className="text-sm text-gray-600 mb-1">Stress</div>
                    <div className="font-semibold text-orange-600">{assessment.stressLevel}/5</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-md">
                    <div className="text-sm text-gray-600 mb-1">Activity</div>
                    <div className="font-semibold text-purple-600 capitalize">{assessment.activityType}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-md">
                    <div className="text-sm text-gray-600 mb-1">Energy</div>
                    <div className="font-semibold text-yellow-600">{assessment.energyLevel}/5</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-md p-4">
                  <div className="font-medium text-gray-800 mb-2">Recommendation</div>
                  <p className="text-gray-700 text-sm">{assessment.result.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default History;