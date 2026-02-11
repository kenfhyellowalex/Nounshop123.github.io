import React from 'react';
import { MOCK_CAMPAIGNS } from '../constants';
import { CampaignChannel } from '../types';
import { MessageSquare, Send, PauseCircle, PlayCircle, Plus } from 'lucide-react';

const Marketing: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Marketing Automation</h2>
          <p className="text-gray-500 text-sm">Manage SMS, WhatsApp, and Telegram campaigns</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
          <Plus size={16} /> New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CAMPAIGNS.map((campaign) => (
          <div key={campaign.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg ${campaign.channel === CampaignChannel.SMS ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                <MessageSquare size={20} />
              </div>
              <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${campaign.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {campaign.status}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-800 mb-2">{campaign.name}</h3>
            <p className="text-gray-600 text-sm flex-1 mb-4">"{campaign.message}"</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <div className="text-sm text-gray-500">
                <span className="font-bold text-gray-900">{campaign.sent_count.toLocaleString()}</span> sent
              </div>
              <button className="text-gray-400 hover:text-indigo-600">
                {campaign.status === 'active' ? <PauseCircle size={20} /> : <PlayCircle size={20} />}
              </button>
            </div>
          </div>
        ))}

        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-6 text-gray-400 hover:border-indigo-300 hover:text-indigo-500 transition-colors cursor-pointer group">
          <Send size={32} className="mb-2 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Create Blank Campaign</span>
        </div>
      </div>
    </div>
  );
};

export default Marketing;