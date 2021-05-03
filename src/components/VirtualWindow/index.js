import React, { useState, useEffect, forwardRef } from 'react';

import useScroll from '@/utils/useScroll';
import { InnerContainer } from './style';

const VirtualWindow = forwardRef(({ Container, height, children }, ref) => {
    const [elements, setElements] = useState(undefined);
    const [topIndex, setTopIndex] = useState(0);
    const [bottomIndex, setBottomIndex] = useState(0);
    const scrollTop = useScroll(ref);

    useEffect(() => {
        setTopIndex(Math.floor(scrollTop / height));
        setBottomIndex(
            Math.floor((scrollTop + ref.current.offsetHeight) / height) + 2
        );
    }, [scrollTop]);

    useEffect(() => {
        const nextChildren = React.Children.map(children, (item, index) => {
            if (index < topIndex) return null;
            if (index > bottomIndex) return null;
            return React.cloneElement(item, {
                style: { position: 'absolute', top: `${index * height}px` },
            });
        });
        setElements(nextChildren);
    }, [topIndex, bottomIndex, children, ref]);

    return (
        <Container ref={ref}>
            <InnerContainer height={children.length * height}>
                {elements}
            </InnerContainer>
        </Container>
    );
});

export default VirtualWindow;
