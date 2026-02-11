import React, { useState } from 'react';
import { MOCK_AI_PREDICTIONS, MOCK_PRODUCTS, MOCK_ORDERS } from '../constants';
import { generateBusinessInsights } from '../services/geminiService';
import { Sparkles, Loader2, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const AIInsights: React.FC = () => {
  const [insightText, setInsightText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateInsights = async () => {
    setLoading(true);
    const text = await generateBusinessInsights(MOCK_AI_PREDICTIONS, MOCK_PRODUCTS, MOCK_ORDERS);
    setInsightText(text);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
             <Sparkles className="text-purple-600" /> AI Business Intelligence
           </h2>
           <p className="text-gray-500 mt-1">Powered by Google Gemini models</p>
        </div>
        <button 
          onClick={handleGenerateInsights}
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
          {loading ? "Analyzing Data..." : "Generate Gemini Report"}
        </button>
      </div>

      {insightText && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-xl p-6 shadow-sm animate-fade-in">
          <h3 className="text-lg font-bold text-purple-900 mb-2 flex items-center gap-2">
             <Lightbulb size={20} /> Executive Summary
          </h3>
          <div className="prose prose-purple max-w-none text-gray-800 whitespace-pre-line leading-relaxed">
            {insightText}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prediction Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-800">Sales Forecast (Next 48h)</h3>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded uppercase">High Confidence</span>
           </div>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={MOCK_AI_PREDICTIONS}>
                 <defs>
                   <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#9333ea" stopOpacity={0.8}/>
                     <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
                 <XAxis dataKey="date" hide />
                 <YAxis hide />
                 <Tooltip contentStyle={{borderRadius: '8px'}} />
                 <Area type="monotone" dataKey="predicted_sales" stroke="#9333ea" fill="url(#colorPred)" name="Predicted" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
           <p className="text-xs text-center text-gray-400 mt-2">Projection based on historical data and seasonal trends.</p>
        </div>

        {/* Anomaly Detection Mock */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
           <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800">Detected Anomalies</h3>
              <AlertTriangle className="text-orange-500" size={20} />
           </div>
           <div className="space-y-4 flex-1">
              <div className="p-3 bg-orange-50 border border-orange-100 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">Unusual Stock Depletion</h4>
                    <p className="text-xs text-gray-600 mt-1">Chicken Wings stock dropping 40% faster than average Tuesday.</p>
                  </div>
                  <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded">High Priority</span>
                </div>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">Traffic Spike</h4>
                    <p className="text-xs text-gray-600 mt-1">Online orders surged between 11:00 AM - 11:30 AM.</p>
                  </div>
                  <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">Info</span>
                </div>
              </div>
           </div>
           <button className="w-full mt-4 text-sm text-gray-500 hover:text-indigo-600 underline">View all system logs</button>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;