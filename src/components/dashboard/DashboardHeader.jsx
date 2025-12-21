const DashboardHeader = ({ title, subtitle }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 p-1">
                {['Today', '7 Days', '30 Days'].map((range) => (
                    <button
                        key={range}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${range === 'Today'
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                    >
                        {range}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DashboardHeader;
