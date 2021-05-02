import { useEffect } from 'react';
import useScroll from './useScroll';

function useScrollBottomEffect(onScrollBottom, ref) {
    const scrollTop = useScroll(ref);

    useEffect(() => {
        if (
            ref.current &&
            // 這行是為了避免初始沒有scroll時觸發effect
            ref.current.scrollTop !== 0 &&
            // 實際觀察發現會有0.2左右的誤差，所以需要減1
            scrollTop >= ref.current.scrollHeight - ref.current.offsetHeight - 1
        ) {
            onScrollBottom();
        }
    }, [scrollTop, onScrollBottom]);
}

export default useScrollBottomEffect;
