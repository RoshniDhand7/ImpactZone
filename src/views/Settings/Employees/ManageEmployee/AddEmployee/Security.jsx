import React, { useEffect, useState } from 'react';
import CustomCard, { CustomGridLayout } from '../../../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../../shared/Button/CustomButton';
import { CustomCalenderInput, CustomDropDown, CustomInput } from '../../../../../shared/Input/AllInputs';
import { yesNoOptions } from '../../../../../utils/dropdownConstants';
import CustomPickList from '../../../../../shared/Input/CustomPickList';
import { ProductService } from './ProductServiceDummy';

const Security = () => {
    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setPickData({ source: data, target: [] }));
    }, []);

    const [pickdata, setPickData] = useState({ source: [], target: [] });

    const handlePickListChange = (event) => {
        setPickData(event);
    };
    const itemTemplate = (item) => {
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <img
                    className="w-4rem shadow-2 flex-shrink-0 border-round"
                    src={`https://primefaces.org/cdn/primereact/images/product/${item.image}`}
                    alt={item.name}
                />
                <div className="flex-1 flex flex-column gap-2">
                    <span className="font-bold">{item.name}</span>
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-tag text-sm"></i>
                        <span>{item.category}</span>
                    </div>
                </div>
                <span className="font-bold text-900">${item.price}</span>
            </div>
        );
    };
    console.log('pickData>>', pickdata);
    return (
        <>
            <CustomCard col="12" title="Personal">
                <CustomGridLayout>
                    <CustomInput name="firstName" required col={3} />
                    <CustomInput name="Mi" col={1} />
                    <CustomInput name="lastName" required />
                    <CustomInput name="title" />
                    <CustomCalenderInput name="dateOfBirth" />
                    <CustomInput name="socialSecurity" />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="System">
                <CustomGridLayout>
                    <CustomInput name="barcode" required />
                    <CustomInput name="accessCode" required />
                    <CustomInput name="email" required />
                    <CustomDropDown label="Allow Multi-Club Clock In/Out" name="multiClubInOut" options={yesNoOptions} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Select Roles">
                <div col={12}>
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
                </div>
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" />
                <LightButton label="Cancel" />
            </CustomButtonGroup>
        </>
    );
};

export default Security;
