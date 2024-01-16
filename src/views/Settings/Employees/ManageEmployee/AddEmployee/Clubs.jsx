import React, { useState, useEffect } from 'react';
import CustomCard, { CustomGridLayout } from '../../../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../../shared/Button/CustomButton';
import { CustomInput } from '../../../../../shared/Input/AllInputs';
import CustomPickList from '../../../../../shared/Input/CustomPickList';

const Clubs = () => {
    const [pickdata, setPickData] = useState({ source: [], target: [] });

    const handlePickListChange = (event) => {
        setPickData(event);
    };
    const itemTemplate = () => {};
    return (
        <>
            <CustomCard col="12" title="Report Data Access">
                <CustomPickList
                    sourceData={pickdata?.source}
                    targetData={pickdata?.target}
                    onPickListChange={handlePickListChange}
                    itemTemplate={itemTemplate}
                    breakpoint="1280px"
                    sourceHeader="Available"
                    targetHeader="Selected"
                    sourceStyle={{ height: '24rem' }}
                    targetStyle={{ height: '24rem' }}
                    showSourceControls={false}
                    showTargetControls={false}
                />
            </CustomCard>
            <CustomCard col="12" title="Clubs">
                <CustomPickList
                    sourceData={pickdata?.source}
                    targetData={pickdata?.target}
                    onPickListChange={handlePickListChange}
                    itemTemplate={itemTemplate}
                    breakpoint="1280px"
                    sourceHeader="Available"
                    targetHeader="Selected"
                    sourceStyle={{ height: '24rem' }}
                    targetStyle={{ height: '24rem' }}
                    showSourceControls={false}
                    showTargetControls={true}
                />
            </CustomCard>

            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" />
                <LightButton label="Cancel" />
            </CustomButtonGroup>
        </>
    );
};

export default Clubs;
