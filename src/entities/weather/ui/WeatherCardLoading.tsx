export const WeatherCardLoading = () => {
    return (
        <div className="bg-white h-full rounded-2xl shadow-sm p-6 flex items-center justify-center">
            <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                <div className="text-gray-500 text-sm">날씨 정보를 불러오는 중...</div>
            </div>
        </div>
    );
};
