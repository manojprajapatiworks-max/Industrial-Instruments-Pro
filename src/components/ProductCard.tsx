import React from "react";
import { Product, Settings } from "../types";
import { CheckCircle2, Clock, Tag } from "lucide-react";

const ProductCard: React.FC<{ item: Product, settings: Settings | null }> = ({ item, settings }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
      {item.image_url && (
        <div className="h-48 w-full bg-slate-100 overflow-hidden">
          <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      )}
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800" style={{ backgroundColor: settings?.primaryColor ? `${settings.primaryColor}20` : undefined, color: settings?.primaryColor }}>
            {item.category_name}
          </span>
        </div>
        <p className="text-slate-600 mb-4 flex-grow">{item.description}</p>
        
        <div className="space-y-2 text-sm text-slate-500 mb-6">
          {item.specifications && (
            <div className="flex items-start gap-2">
              <CheckCircle2 size={16} className="mt-0.5 text-emerald-500 flex-shrink-0" />
              <span>{item.specifications}</span>
            </div>
          )}
          {item.delivery_time && (
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-slate-400 flex-shrink-0" />
              <span>{item.type === 'service' ? 'Service Time: ' : 'Delivery: '}{item.delivery_time}</span>
            </div>
          )}
          {item.price && (
            <div className="flex items-center gap-2">
              <Tag size={16} className="text-slate-400 flex-shrink-0" />
              <span className="font-semibold text-slate-900">{item.price}</span>
            </div>
          )}
        </div>
        
        <a href={`#contact`} className="w-full text-center block bg-slate-900 text-white py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors mt-auto">
          {item.type === 'service' ? 'Request Service' : 'Inquire Now'}
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
