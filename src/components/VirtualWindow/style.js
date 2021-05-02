import styled from 'styled-components';

export const InnerContainer = styled.div`
    position: relative;
    height: ${(props) => (props.height ? props.height : 0)}px;
    padding-top: ${(props) => (props.topHeight ? props.topHeight : 0)};
    padding-bottom: ${(props) => (props.topHeight ? props.topHeight : 0)};
`;
