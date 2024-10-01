import React from 'react';
import CustomDialog from '../shared/Overlays/CustomDialog';
import { CustomInput, CustomTextArea } from '../shared/Input/AllInputs';
import CustomCard, { CustomGridLayout } from '../shared/Cards/CustomCard';
import moment from 'moment';
import PrimaryButton from '../shared/Button/CustomButton';

const ClockInOutModal = ({ openClockModal, setOpenClockModal }) => {
    const onApply = () => {};
    const onSave = () => {};
    return (
        <>
            <CustomDialog
                visible={openClockModal}
                onCancel={() => {
                    setOpenClockModal(false);
                }}
                position="top"
                width="50vw"
                contentclassname="pb-2"
                title="Employee Clock In/Out"
                onApply={onApply}
                onSave={onSave}
                saveLabel="ClockOut"
                applyLabel="ClockIn"
            >
                <CustomGridLayout>
                    <div className="col-6">
                        <h5 className="text-bold mb-2">Date/Time</h5>
                        {moment(new Date()).format('DD-MM-YYYY hh:mm A')}
                    </div>
                    <div className="col-6 flex align-items-end ">
                        <CustomInput name="barCode" col={6} />
                        <PrimaryButton label="Find" className="my-0" />
                    </div>
                    <h3 className="text-bold mb-2 col-12">Employee</h3>
                    <CustomInput name="name" />
                    <CustomInput name="status" />
                    <CustomTextArea name="comment" />
                </CustomGridLayout>
                <CustomCard title="Alerts" col={12} />
            </CustomDialog>
        </>
    );
};

export default ClockInOutModal;
