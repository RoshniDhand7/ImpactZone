import React, { useState, useEffect } from 'react';
import { PickList } from 'primereact/picklist';

const CustomPickList = ({
    sourceData,
    targetData,
    onPickListChange,
    itemTemplate,
    breakpoint,
    sourceHeader,
    targetHeader,
    sourceStyle,
    targetStyle,
    showSourceControls,
    showTargetControls,
}) => {
    const [source, setSource] = useState(sourceData || []);
    const [target, setTarget] = useState(targetData || []);

    useEffect(() => {
        setSource(sourceData || []);
        setTarget(targetData || []);
    }, [sourceData, targetData]);

    useEffect(() => {});

    const handlePickListChange = (event) => {
        setSource(event.source);
        setTarget(event.target);

        if (onPickListChange) {
            onPickListChange(event);
        }
    };

    return (
        <div className="card">
            <PickList
                source={source}
                target={target}
                onChange={handlePickListChange}
                itemTemplate={itemTemplate}
                breakpoint={breakpoint}
                sourceHeader={sourceHeader}
                targetHeader={targetHeader}
                sourceStyle={sourceStyle}
                targetStyle={targetStyle}
                showSourceControls={showSourceControls}
                showTargetControls={showTargetControls}
            />
        </div>
    );
};

export default CustomPickList;
