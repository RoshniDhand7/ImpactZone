import React, { useState, useEffect } from 'react';
import { PickList } from 'primereact/picklist';
import InputLayout from '../Form/InputLayout';

const CustomPickList = ({
    selected = [],
    name,
    sourceData = [],
    onPickListChange,
    breakpoint = '1280px',
    sourceHeader = 'Available',
    targetHeader = 'Selected',
    sourceStyle = { height: '24rem' },
    targetStyle = { height: '24rem' },
    showSourceControls = false,
    showTargetControls = false,
    required,
    label,
    col = 12,
    extraClassName,
    data,
    errorMessage,
}) => {
    useEffect(() => {
        if (sourceData.length && selected) {
            let _target = sourceData.filter((item) => selected.includes(item.value));

            let _source = sourceData.filter((item) => !selected.includes(item.value));
            setSource(_source);
            setTarget(_target);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sourceData, selected?.length]);

    const [source, setSource] = useState([]);
    const [target, setTarget] = useState([]);

    const itemTemplate = (item) => {
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <h6>{item.name}</h6>
            </div>
        );
    };
    const handlePickListChange = ({ target, source }) => {
        setSource(source);
        setTarget(target);
    };

    useEffect(() => {
        if (onPickListChange) {
            let _values = target.map((item) => item.value);
            onPickListChange({ name, value: _values });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [target?.length, name]);

    return (
        <InputLayout col={col} label={label} name={name} required={required} extraClassName={extraClassName} data={data} errorMessage={errorMessage}>
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
        </InputLayout>
    );
};

export default CustomPickList;
