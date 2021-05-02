import { useState, useEffect, useCallback } from 'react';

function useScrollBottomEffect(onScrollBottom, ref) {
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

    useEffect(() => {
        if (
            ref.current &&
            ref.current.scrollTop !== 0 && // 這行是為了避免初始沒有scroll時觸發effect
            scrollTop >=
                ref.current.scrollHeight - ref.current.offsetHeight - 10
        ) {
            onScrollBottom();
        }
    }, [scrollTop, onScrollBottom]);
}

export default useScrollBottomEffect;
