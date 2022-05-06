import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding-top: 130px; /* 헤더 높이 */
`;

const Layout = ({children}) => (
    <Wrapper>
        {children}
    </Wrapper>
);

export default Layout;