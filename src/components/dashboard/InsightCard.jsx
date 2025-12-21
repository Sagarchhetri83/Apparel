const InsightCard = ({ title, value, subtitle, icon: Icon }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-100 p-6 flex items-center space-x-4">
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <div className="flex items-baseline space-x-2">
                    <h4 className="text-xl font-bold text-gray-900">{value}</h4>
                </div>
                {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
            </div>
        </div>
    );
};

export default InsightCard;
