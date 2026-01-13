import { ClipLoader } from 'react-spinners';

export const LoadingOverlay = () => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <ClipLoader color="#3b82f6" size={32} />
        </div>
    );
};
