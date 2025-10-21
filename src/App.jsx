import { useState } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import HealthForm from './components/HealthForm';
import Dashboard from './components/Dashboard';
import History from './components/History';

const AppContent = () => {
  const { user, logout } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [currentView, setCurrentView] = useState('form');
  const [currentAssessment, setCurrentAssessment] = useState(null);

  const handleAssessmentSubmit = (assessment) => {
    setCurrentAssessment(assessment);
    setCurrentView('dashboard');
  };

  const handleBackToAssessment = () => {
    setCurrentView('form');
    setCurrentAssessment(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen">
        {isLogin ? (
          <Login onToggle={() => setIsLogin(false)} />
        ) : (
          <Register onToggle={() => setIsLogin(true)} />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h1 className="hidden text-xl font-bold text-gray-900 md:block">Nurture Health</h1>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-700 text-sm font-medium">{user.name.charAt(0).toUpperCase()}</span>
                </div>
                <span className="text-gray-700 font-medium">{user.name}</span>
              </div>
              
              <div className="flex space-x-1">
                <button
                  onClick={() => setCurrentView('form')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    currentView === 'form'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Assessment
                </button>
                <button
                  onClick={() => setCurrentView('history')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    currentView === 'history'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  History
                </button>
              </div>
              
              <button 
                onClick={logout} 
                className="text-gray-500 hover:text-red-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          {currentView === 'form' && (
            <HealthForm onSubmit={handleAssessmentSubmit} />
          )}
          {currentView === 'dashboard' && currentAssessment && (
            <Dashboard assessment={currentAssessment} onBack={handleBackToAssessment} />
          )}
          {currentView === 'history' && (
            <History />
          )}
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
