export const Anchor = ({ id, className  }: { id: string, className?: string }) => {
    return (
        <div id={id} className={`absolute -mt-32 ${className}`}/>
    );
};
