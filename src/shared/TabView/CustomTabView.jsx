import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import styled from 'styled-components';
import {
  SlideInLeftAnimation,
  SlideInRightAnimation,
  fadeInAnimation,
} from '../Transitions/Animate';

const TabContent = styled.div`
  animation: ${({ direction }) =>
      direction
        ? direction === 'right'
          ? SlideInRightAnimation
          : SlideInLeftAnimation
        : fadeInAnimation}
    0.6s both;
`;

export default function CustomTabView({ tabs }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tabDirection, setTabDirection] = useState(null);

  const handleChange = ({ index }) => {
    setTabDirection(() => (activeIndex < index ? 'right' : 'left'));
    setActiveIndex(index);
  };
  return (
    <TabView activeIndex={activeIndex} onTabChange={handleChange}>
      {tabs?.map((tab, i) => (
        <TabPanel key={i} header={tab?.title}>
          <div style={{ overflowX: 'hidden' }}>
            <TabContent direction={tabDirection}>{tab.content}</TabContent>
          </div>
        </TabPanel>
      ))}
    </TabView>
  );
}
