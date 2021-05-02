import React, { useState, useLayoutEffect, useEffect, forwardRef } from 'react';

import useScroll from '@/utils/useScroll';
import { InnerContainer } from './style';

const handleBlur = () => {
    console.log('blur');
};

const VirtualWindow = forwardRef(({ Container = <div />, children }, ref) => {
    const [elements, setElements] = useState(undefined);
    const [topIndex, setTopIndex] = useState(0);
    const [bottomIndex, setBottomIndex] = useState(0);
    const scrollTop = useScroll(ref);

    useLayoutEffect(() => {
        setTopIndex(Math.floor(scrollTop / 160));
        setBottomIndex(
            Math.floor((scrollTop + ref.current.offsetHeight) / 160) + 2
        );
    }, [scrollTop]);

    useEffect(() => {
        ref.current.addEventListener('blur', handleBlur);
        return () => {
            ref.current.removeEventListener('blur', handleBlur);
        };
    });

    useEffect(() => {
        const nextChildren = React.Children.map(children, (item, index) => {
            if (index < topIndex) return null;
            if (index > bottomIndex) return null;
            return React.cloneElement(item, {
                style: { position: 'absolute', top: `${index * 160}px` },
            });
        });
        setElements(nextChildren);
    }, [topIndex, bottomIndex, children, ref]);

    return (
        <Container ref={ref}>
            <InnerContainer height={children.length * 160}>
                {elements}
            </InnerContainer>
        </Container>
    );
});

export default VirtualWindow;
