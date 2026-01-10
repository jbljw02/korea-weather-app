import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@shared/ui/icon/ArrowLeftIcon';

export const WeatherDetailError = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-gray-50 px-4 py-6 md:px-8 md:py-8 flex flex-col">
            <div className="max-w-4xl mx-auto w-full flex flex-col gap-6 flex-1">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                >
                    <ArrowLeftIcon className="w-5 h-5 mr-2" />
                    <span className="text-sm md:text-base">뒤로 가기</span>
                </button>
                <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="text-gray-500 text-center">
                        <p className="text-lg font-medium mb-2">해당 장소의 정보가 제공되지 않습니다.</p>
                        <p className="text-sm">다른 장소를 검색해주세요.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
