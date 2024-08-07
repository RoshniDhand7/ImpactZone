import React, { useState, useEffect } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import styled from 'styled-components';
import { SlideInLeftAnimation, SlideInRightAnimation, fadeInAnimation } from '../Transitions/Animate';
import { useHistory, useLocation } from 'react-router-dom';
import { dashToSpace, spaceToDash } from '../../utils/commonFunctions';

const TabContent = styled.div`
    animation: ${({ direction }) => (direction ? (direction === 'right' ? SlideInRightAnimation : SlideInLeftAnimation) : fadeInAnimation)} 0.6s both;
`;

export default function CustomTabView({ name = 'tab', tabs, disabledTabIndices, useIndex = false, scrollable = false }) {
    const history = useHistory();
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const tab = searchParams.get(name);
    const [activeIndex, setActiveIndex] = useState(0);
    const [tabDirection, setTabDirection] = useState(null);

    useEffect(() => {
        let idx = 0;
        if (tab) {
            let value = dashToSpace(tab);
            idx = tabs.findIndex((obj) => obj.title === value);
        }
        setActiveIndex(idx);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tab]);

    const handleChange = ({ index }) => {
        setTabDirection(() => (activeIndex < index ? 'right' : 'left'));
        if (useIndex) {
            setActiveIndex(index);
        } else {
            let tab = spaceToDash(tabs[index].title);
            history.replace({
                search: `?${name}=` + tab,
            });
        }
    };
    return (
        <TabView activeIndex={activeIndex} onTabChange={handleChange} scrollable={scrollable}>
            {tabs?.map((tab, i) => (
                <TabPanel key={i} header={tab?.title} disabled={disabledTabIndices?.includes(i)}>
                    <div style={{ overflowX: 'hidden' }}>
                        <TabContent direction={tabDirection}>{tab.content}</TabContent>
                    </div>
                </TabPanel>
            ))}
        </TabView>
    );
}
