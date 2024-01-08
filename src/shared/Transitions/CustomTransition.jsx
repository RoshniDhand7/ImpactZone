import React from 'react';
import styled from 'styled-components';
import { fadeInAnimation } from './Animate';
const Content = styled.div`
  animation: ${fadeInAnimation} 0.3s both;
`;

export default function CustomTransition({ children }) {
  return <Content>{children}</Content>;
}
