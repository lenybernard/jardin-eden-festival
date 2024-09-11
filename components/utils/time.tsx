export const Time = ({ value }: { value: string }) => {
    const datetime = new Date(value);
    const hours = datetime.getHours();
    const minutes = datetime.getMinutes();

    const formattedTime =
        minutes === 0 ? `${hours}h` : `${hours}h${minutes.toString().padStart(2, '0')}`;

    return <>{formattedTime}</>;
};
