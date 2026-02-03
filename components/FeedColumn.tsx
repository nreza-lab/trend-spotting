import React from 'react';
import { TrendItem } from '../types';
import TrendCard from './TrendCard';

interface Props {
  countryName: string;
  flagCode: string; // ISO 2-letter code for flagcdn
  items: TrendItem[];
}

const FeedColumn: React.FC<Props> = ({ countryName, flagCode, items }) => {
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-slate-200 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <img 
            src={`https://flagcdn.com/48x36/${flagCode.toLowerCase()}.png`} 
            srcSet={`https://flagcdn.com/96x72/${flagCode.toLowerCase()}.png 2x, https://flagcdn.com/144x108/${flagCode.toLowerCase()}.png 3x`}
            width="32" 
            height="24" 
            alt={countryName} 
            className="rounded shadow-sm"
          />
          <div>
            <h2 className="text-xl font-bold text-slate-900">{countryName}</h2>
            <p className="text-xs text-slate-500">Daily Search Trends</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 overflow-y-auto custom-scrollbar flex-1">
        {items.length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            No trends available right now.
          </div>
        ) : (
          items.map((item) => (
            <TrendCard key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default FeedColumn;