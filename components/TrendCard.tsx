import React, { useState } from 'react';
import { TrendItem, NewsItem } from '../types';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface Props {
  item: TrendItem;
}

const TrendCard: React.FC<Props> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  // Format date nicely
  const formattedDate = new Date(item.pubDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden mb-4 shadow-sm hover:shadow-md transition-all">
      <div 
        className="p-4 cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-4">
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 mb-1 capitalize">
              {item.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-slate-500">
               <span className="flex items-center gap-1 text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full text-xs border border-emerald-100">
                 {item.traffic} searches
               </span>
               <span>•</span>
               <span>{formattedDate}</span>
            </div>
          </div>

          {item.mainPicture && (
            <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-slate-100 border border-slate-200">
              <img 
                src={item.mainPicture} 
                alt={item.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}

          <div className="text-slate-400 mt-1">
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </div>

      {/* Expanded News Content */}
      {expanded && (
        <div className="bg-slate-50 p-4 border-t border-slate-200">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Related News</h4>
          <div className="space-y-3">
            {item.newsItems.map((news, idx) => (
              <a 
                key={idx} 
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="flex items-start gap-3">
                  {news.imageUrl && (
                    <img 
                      src={news.imageUrl} 
                      alt="" 
                      className="w-12 h-12 object-cover rounded bg-slate-200 flex-shrink-0 opacity-100 group-hover:opacity-80 transition-opacity shadow-sm" 
                    />
                  )}
                  <div>
                    <p className="text-sm text-slate-700 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug font-medium">
                      {news.title}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <p className="text-xs text-slate-500">{news.source}</p>
                      <ExternalLink size={10} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendCard;