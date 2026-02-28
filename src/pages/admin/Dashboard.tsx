import { useEffect, useState } from "react";
import { Product, Category, Request } from "../../types";
import { Package, Tags, Inbox, CheckCircle, Clock, XCircle } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    services: 0,
    categories: 0,
    pendingRequests: 0,
    inProgressRequests: 0,
    completedRequests: 0,
    rejectedRequests: 0,
    totalRequests: 0,
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/products").then(res => res.json()),
      fetch("/api/categories").then(res => res.json()),
      fetch("/api/requests").then(res => res.json())
    ]).then(([productsData, categoriesData, requestsData]) => {
      setStats({
        products: productsData.filter((p: Product) => p.type === 'product').length,
        services: productsData.filter((p: Product) => p.type === 'service').length,
        categories: categoriesData.length,
        pendingRequests: requestsData.filter((r: Request) => r.status === 'pending').length,
        inProgressRequests: requestsData.filter((r: Request) => r.status === 'in_progress').length,
        completedRequests: requestsData.filter((r: Request) => r.status === 'completed').length,
        rejectedRequests: requestsData.filter((r: Request) => r.status === 'rejected').length,
        totalRequests: requestsData.length,
      });
    });
  }, []);

  const statCards = [
    { label: "Total Products", value: stats.products, icon: Package, color: "bg-blue-500" },
    { label: "Total Services", value: stats.services, icon: Package, color: "bg-indigo-500" },
    { label: "Categories", value: stats.categories, icon: Tags, color: "bg-emerald-500" },
    { label: "Total Requests", value: stats.totalRequests, icon: Inbox, color: "bg-slate-500" },
  ];

  const requestCards = [
    { label: "Pending", value: stats.pendingRequests, icon: Inbox, color: "bg-amber-500" },
    { label: "In Progress", value: stats.inProgressRequests, icon: Clock, color: "bg-blue-500" },
    { label: "Completed", value: stats.completedRequests, icon: CheckCircle, color: "bg-emerald-500" },
    { label: "Rejected", value: stats.rejectedRequests, icon: XCircle, color: "bg-red-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center gap-4">
              <div className={`${stat.color} text-white p-3 rounded-lg`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="text-xl font-bold text-slate-900 mb-4">Requests Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {requestCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center gap-4">
              <div className={`${stat.color} text-white p-3 rounded-lg`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
