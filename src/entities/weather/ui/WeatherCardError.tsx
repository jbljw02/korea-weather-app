interface WeatherCardErrorProps {
    message: string;
}

export const WeatherCardError = ({ message }: WeatherCardErrorProps) => {
    return (
        <div className="bg-white h-full rounded-2xl shadow-sm p-6 flex items-center justify-center">
            <div className="text-red-500 text-sm text-center px-4">{message}</div>
        </div>
    );
};
