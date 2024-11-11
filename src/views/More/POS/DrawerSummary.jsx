import React from 'react';
import CustomCard from '../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButton, CustomButtonGroup, LightButton } from '../../../shared/Button/CustomButton';

export default function DrawerSummary() {
    return (
        <div>
            <CustomCard title="Drawer / Transaction / On Account Collected" col={12}>
                
            </CustomCard>
            <CustomCard title="Income Balances" col={12}></CustomCard>
            <CustomCard title="Non-Income Balances" col={12}></CustomCard>
            <CustomCard title="Total Balances" col={12}></CustomCard>
            <CustomButtonGroup>
                <CustomButton label="Print" severity="warning" icon="pi pi-print" outlined={false} />
                <PrimaryButton label="Receipt" className="mx-2" />
                <LightButton label="Close Out" />
            </CustomButtonGroup>
        </div>
    );
}
