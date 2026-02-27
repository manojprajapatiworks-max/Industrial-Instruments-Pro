import { useEffect, useState } from "react";
import { Request } from "../../types";

export default function Requests() {
  const [requests, setRequests] = useState<Request[]>([]);

  const fetchRequests = () => {
    fetch("/api/requests").then(res => res.json()).then(setRequests);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    await fetch(`/api/requests/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchRequests();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Client Requests</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Client Info</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {requests.map((request) => (
              <tr key={request.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {new Date(request.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-slate-900">{request.name}</div>
                  <div className="text-sm text-slate-500">{request.email}</div>
                  <div className="text-sm text-slate-500">{request.mobile}</div>
                  {request.company && <div className="text-xs text-slate-400 mt-1">{request.company}</div>}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate" title={request.description}>
                  {request.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <select
                    value={request.status}
                    onChange={(e) => handleStatusChange(request.id, e.target.value)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer outline-none focus:ring-2 focus:ring-blue-500 ${getStatusColor(request.status)}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-slate-500">No requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
