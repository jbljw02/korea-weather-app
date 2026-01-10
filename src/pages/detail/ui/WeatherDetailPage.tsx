import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { WeatherDetailWidget } from '@widgets/weather-detail/ui/WeatherDetailWidget';
import { ArrowLeftIcon } from '@shared/ui/icon/ArrowLeftIcon';
import { isNil } from '@shared/lib/type-guards';

export const WeatherDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const parsedLat = lat ? parseFloat(lat) : null;
    const parsedLon = lon ? parseFloat(lon) : null;
    
    if (isNil(id) || isNil(lat) || isNil(lon)) {
        return null;
    }
    
    return (
        <div className="min-h-screen w-full bg-gray-50 px-4 py-6 md:px-8 md:py-8">
            <div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                >
                    <ArrowLeftIcon className="w-5 h-5 mr-2" />
                    <span className="text-sm md:text-base">뒤로 가기</span>
                </button>

                <WeatherDetailWidget id={id} lat={parsedLat} lon={parsedLon} />
            </div>
        </div>
    );
};
