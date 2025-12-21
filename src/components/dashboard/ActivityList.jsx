import { FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const ActivityList = ({ activities }) => {
    const getStatusConfig = (status) => {
        switch (status?.toUpperCase()) {
            case 'PAID':
            case 'COMPLETED':
                return { color: 'text-green-700 bg-green-50', icon: CheckCircle };
            case 'PENDING':
                return { color: 'text-yellow-700 bg-yellow-50', icon: Clock };
            case 'OVERDUE':
            case 'CANCELLED':
                return { color: 'text-red-700 bg-red-50', icon: AlertCircle };
            default:
                return { color: 'text-gray-700 bg-gray-50', icon: FileText };
        }
    };

    if (!activities || activities.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-50 mb-4">
                    <FileText className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-sm font-medium text-gray-900">No recent activity</h3>
                <p className="text-sm text-gray-500 mt-1">New sales and orders will appear here.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Recent Sales Activity</h3>
            </div>
            <div className="divide-y divide-gray-100">
                {activities.map((activity) => {
                    const statusConfig = getStatusConfig(activity.status);
                    const StatusIcon = statusConfig.icon;
                    return (
                        <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${statusConfig.color}`}>
                                <StatusIcon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {activity.customerName || `Order #${activity.id}`}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {new Date(activity.createdAt).toLocaleString()}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-900">
                                    {/* Handle various amount fields depending on model */}
                                    ₹{activity.total?.toLocaleString() || '0'}
                                </p>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusConfig.color}`}>
                                    {activity.status}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ActivityList;
