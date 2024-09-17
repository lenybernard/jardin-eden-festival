import {useCallback} from "react";

export const useSmoothScroll = () => {
    const scrollToContent = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth' });
            }, 30);
        }
    }, []);

    return scrollToContent;
};
