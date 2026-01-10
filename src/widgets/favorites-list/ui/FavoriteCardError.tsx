interface FavoriteCardErrorProps {
    displayName?: string;
}

export const FavoriteCardError = ({ displayName }: FavoriteCardErrorProps) => {
    const message = displayName ? `${displayName}의 정보가 제공되지 않습니다.` : '해당 장소의 정보가 제공되지 않습니다ㄴ.';
    return <div className="w-full h-full bg-white rounded-2xl shadow-sm p-4 flex flex-col items-center justify-center text-gray-400 min-h-[170px]">
        <p className="text-sm text-center">{message}</p>
    </div>;
};
