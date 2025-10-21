import { useState } from 'react';
import { health } from '../api';

const HealthForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    sleepQuality: 3,
    appetite: 3,
    stressLevel: 3,
    activityType: 'light',
    energyLevel: 3
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await health.submitAssessment(formData);
      onSubmit(response.data.assessment);
    } catch (err) {
      console.error('Assessment failed:', err);
    }
    setLoading(false);
  };

  const getSliderColor = (value) => {
    if (value <= 2) return 'from-red-400 to-red-600';
    if (value <= 3) return 'from-yellow-400 to-yellow-600';
    return 'from-green-400 to-green-600';
  };

  const getStressSliderColor = (value) => {
    if (value >= 4) return 'from-red-400 to-red-600';
    if (value >= 3) return 'from-yellow-400 to-yellow-600';
    return 'from-green-400 to-green-600';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 p-8 text-white">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold mb-2">Health Assessment</h2>
            <p className="text-blue-100">Help us understand your current wellness state</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  </div>
                  <div>
                    <label className="text-lg font-semibold text-gray-800">Sleep Quality</label>
                    <p className="text-sm text-gray-600">How well did you sleep last night?</p>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={formData.sleepQuality}
                    onChange={(e) => setFormData({...formData, sleepQuality: parseInt(e.target.value)})}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Poor</span>
                    <span>Fair</span>
                    <span>Good</span>
                    <span>Very Good</span>
                    <span>Excellent</span>
                  </div>
                </div>
                <div className={`text-center mt-4 px-4 py-2 rounded-full bg-gradient-to-r ${getSliderColor(formData.sleepQuality)} text-white font-semibold`}>
                  {formData.sleepQuality}/5
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                  </div>
                  <div>
                    <label className="text-lg font-semibold text-gray-800">Appetite</label>
                    <p className="text-sm text-gray-600">How is your appetite today?</p>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={formData.appetite}
                    onChange={(e) => setFormData({...formData, appetite: parseInt(e.target.value)})}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Very Low</span>
                    <span>Low</span>
                    <span>Normal</span>
                    <span>Good</span>
                    <span>Excellent</span>
                  </div>
                </div>
                <div className={`text-center mt-4 px-4 py-2 rounded-full bg-gradient-to-r ${getSliderColor(formData.appetite)} text-white font-semibold`}>
                  {formData.appetite}/5
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <label className="text-lg font-semibold text-gray-800">Stress Level</label>
                    <p className="text-sm text-gray-600">How stressed do you feel?</p>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={formData.stressLevel}
                    onChange={(e) => setFormData({...formData, stressLevel: parseInt(e.target.value)})}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Very Low</span>
                    <span>Low</span>
                    <span>Moderate</span>
                    <span>High</span>
                    <span>Very High</span>
                  </div>
                </div>
                <div className={`text-center mt-4 px-4 py-2 rounded-full bg-gradient-to-r ${getStressSliderColor(formData.stressLevel)} text-white font-semibold`}>
                  {formData.stressLevel}/5
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <label className="text-lg font-semibold text-gray-800">Energy Level</label>
                    <p className="text-sm text-gray-600">How energetic do you feel?</p>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={formData.energyLevel}
                    onChange={(e) => setFormData({...formData, energyLevel: parseInt(e.target.value)})}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Very Low</span>
                    <span>Low</span>
                    <span>Moderate</span>
                    <span>High</span>
                    <span>Very High</span>
                  </div>
                </div>
                <div className={`text-center mt-4 px-4 py-2 rounded-full bg-gradient-to-r ${getSliderColor(formData.energyLevel)} text-white font-semibold`}>
                  {formData.energyLevel}/5
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <label className="text-lg font-semibold text-gray-800">Activity Level</label>
                    <p className="text-sm text-gray-600">What's your typical activity level?</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'sedentary', label: 'Sedentary', icon: '🪑' },
                    { value: 'light', label: 'Light', icon: '🚶' },
                    { value: 'moderate', label: 'Moderate', icon: '🏃' },
                    { value: 'intense', label: 'Intense', icon: '💪' }
                  ].map((activity) => (
                    <button
                      key={activity.value}
                      type="button"
                      onClick={() => setFormData({...formData, activityType: activity.value})}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        formData.activityType === activity.value
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                      }`}
                    >
                      <div className="text-2xl mb-2">{activity.icon}</div>
                      <div className="font-semibold">{activity.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white px-12 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[200px]"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Your Health...
                </div>
              ) : (
                '✨ Get My Health Score'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HealthForm;