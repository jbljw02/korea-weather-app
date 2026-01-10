import { formatDateWithDay } from '@shared/lib/date';

interface DateLabelProps {
    date: string | Date;
}

export const DateLabel = ({ date }: DateLabelProps) => {
    const { dayOfWeek, label } = formatDateWithDay(date);

    const getDayColor = () => {
        if (dayOfWeek === '토') {
            return 'text-blue-500';
        }
        if (dayOfWeek === '일') {
            return 'text-red-500';
        }
        return '';
    };

    return (
        <div className="flex items-center gap-2 w-20">
            <span className={`text-sm font-medium ${getDayColor()}`}>
                {dayOfWeek}
            </span>
            <span className={`text-xs text-gray-500 ${getDayColor()}`}>{label}</span>
        </div>
    );
};
