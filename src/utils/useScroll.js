import { useState, useEffect, useCallback } from 'react';

function useScroll(ref) {
    const [scrollTop, setScrollTop] = useState(0);

    const handleOnScroll = useCallback((e) => {
        setScrollTop(e.target.scrollTop);
    }, []);

    useEffect(() => {
        if (ref.current) {
            ref.current.addEventListener('scroll', handleOnScroll);
        }

        return () => {
            ref.current.removeEventListener('scroll', handleOnScroll);
        };
    }, [ref]);

    return scrollTop;
}

export default useScroll;
