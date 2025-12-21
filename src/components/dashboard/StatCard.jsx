import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color, trend }) => {
    return (
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{label}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50 ${color}`}>
                    <Icon className="h-6 w-6" />
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-sm">
                    {trend > 0 ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                    ) : trend < 0 ? (
                        <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                    ) : (
                        <Minus className="h-4 w-4 text-gray-400 mr-1" />
                    )}
                    <span className={trend > 0 ? "text-green-600 font-medium" : trend < 0 ? "text-red-600 font-medium" : "text-gray-500"}>
                        {Math.abs(trend)}%
                    </span>
                    <span className="text-gray-400 ml-2">vs last month</span>
                </div>
            )}
        </div>
    );
};

export default StatCard;
