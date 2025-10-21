import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const Dashboard = ({ assessment, onBack }) => {
  const { result } = assessment;
  
  const pieData = [
    { name: 'Health Score', value: result.score },
    { name: 'Remaining', value: 100 - result.score }
  ];

  const barData = [
    { name: 'Sleep', value: assessment.sleepQuality },
    { name: 'Appetite', value: assessment.appetite },
    { name: 'Stress', value: 6 - assessment.stressLevel },
    { name: 'Energy', value: assessment.energyLevel }
  ];

  const COLORS = ['#3B82F6', '#E5E7EB'];

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-blue-50 border-blue-200';
    if (score >= 40) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Health Results</h2>
        <p className="text-gray-600">Assessment completed on {new Date().toLocaleDateString()}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Overall Health Score</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className={`text-4xl font-bold ${getScoreColor(result.score)} mt-4`}>
              {result.score}/100
            </div>
            <div className="text-lg font-medium text-gray-700 mt-2">
              {result.category}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Health Breakdown</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className={`rounded-lg border p-6 ${getScoreBg(result.score)}`}>
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Recommendation</h3>
        <p className="text-gray-700 leading-relaxed">{result.recommendation}</p>
      </div>

      <div className="flex justify-center">
        <button 
          onClick={onBack}
          className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
        >
          Back to Assessment
        </button>
      </div>
    </div>
  );
};

export default Dashboard;