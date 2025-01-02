import React, { useState, useEffect } from 'react';
import { TabMenu } from 'primereact/tabmenu';

export const CustomTabMenu = ({ isActive, items, extraClassName, col = 12, onChangeTabIndex }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (isActive) {
            setActiveIndex(1);
            if (onChangeTabIndex) {
                onChangeTabIndex(1);
            }
        } else {
            setActiveIndex(null);
        }
    }, [isActive]);

    const handleTabChangeIndex = (e) => {
        setActiveIndex(e.index);
        if (onChangeTabIndex) {
            onChangeTabIndex(e.index);
        }
    };
    console.log(activeIndex);
    return (
        <div className="card">
            <TabMenu
                model={items}
                activeIndex={activeIndex}
                onTabChange={handleTabChangeIndex}
                col={col}
                className={`custom-accordion border-none my-2 ${extraClassName}`}
            />
        </div>
    );
};
