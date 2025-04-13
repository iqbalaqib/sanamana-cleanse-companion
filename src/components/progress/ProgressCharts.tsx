
import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { format } from 'date-fns';

interface DataPoint {
  date: string;
  weight: number;
  waist: number;
}

interface ProgressChartsProps {
  data: DataPoint[];
}

type TimeRange = '7days' | '30days' | 'all';

const ProgressCharts: React.FC<ProgressChartsProps> = ({ data }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('7days');
  const [chartType, setChartType] = useState<'weight' | 'waist'>('weight');
  
  const filteredData = React.useMemo(() => {
    if (timeRange === 'all') return data;
    
    const now = new Date();
    const daysAgo = timeRange === '7days' ? 7 : 30;
    const cutoffDate = new Date(now);
    cutoffDate.setDate(now.getDate() - daysAgo);
    
    return data.filter(item => new Date(item.date) >= cutoffDate);
  }, [data, timeRange]);
  
  const formattedData = filteredData.map(item => ({
    ...item,
    formattedDate: format(new Date(item.date), 'MMM dd')
  }));
  
  return (
    <div className="sanamana-card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Progress Charts</h2>
        
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              timeRange === '7days'
                ? 'bg-sanamana-green text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setTimeRange('7days')}
          >
            7 Days
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              timeRange === '30days'
                ? 'bg-sanamana-green text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setTimeRange('30days')}
          >
            30 Days
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              timeRange === 'all'
                ? 'bg-sanamana-green text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setTimeRange('all')}
          >
            All
          </button>
        </div>
      </div>
      
      <div className="flex mb-4 border-b">
        <button
          className={`pb-2 px-4 text-sm font-medium relative ${
            chartType === 'weight'
              ? 'text-sanamana-green border-b-2 border-sanamana-green'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setChartType('weight')}
        >
          Weight
        </button>
        <button
          className={`pb-2 px-4 text-sm font-medium relative ${
            chartType === 'waist'
              ? 'text-sanamana-green border-b-2 border-sanamana-green'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setChartType('waist')}
        >
          Waist
        </button>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{
              top: 5,
              right: 5,
              left: 5,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="formattedDate" 
              tick={{ fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              height={50}
            />
            <YAxis 
              domain={chartType === 'weight' ? ['dataMin - 1', 'dataMax + 1'] : ['dataMin - 2', 'dataMax + 2']}
              tick={{ fontSize: 10 }}
              width={35}
            />
            <Tooltip />
            
            {chartType === 'weight' ? (
              <Line
                type="monotone"
                dataKey="weight"
                name="Weight (kg)"
                stroke="#9DC88D"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            ) : (
              <Line
                type="monotone"
                dataKey="waist"
                name="Waist (cm)"
                stroke="#FDE1D3"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressCharts;
