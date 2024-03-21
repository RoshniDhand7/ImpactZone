import React, { useEffect, useState } from 'react';
import { calendarDisplayOptions, timeShownOptions } from '../../../../utils/dropdownConstants';
import CustomPickList from '../../../../shared/Input/CustomPickList';
import formValidation from '../../../../utils/validations';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import CustomPicker from '../../../../shared/ColorPicker/ColorPicker';
import { CustomDropDown } from '../../../../shared/Input/AllInputs';
import { calculateTimes } from '../../../../utils/commonFunctions';
import { getClubs } from '../../../../redux/actions/BusinessSettings/clubsAction';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory } from 'react-router-dom';

const DisplayOptions = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        dispatch(getClubs());
    }, [dispatch]);

    let { clubsDropdown } = useSelector((state) => state.clubs);
    const [data, setData] = useState({
        calandarDisplay: '',
        popupDisplay: '',
        selectBoxColor: 'fc1c1c',
        selectTextColor: 'fcfcfc',
        clubs: '',
    });
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const handleSave = () => {};

    console.log('data>>', data);
    return (
        <>
            <CustomCard col="12" title="Calendar Display">
                <CustomPickList name="calandarDisplay" selected={data?.duration} sourceData={calendarDisplayOptions} onPickListChange={handleChange} />
            </CustomCard>
            <CustomCard col="12" title="PopUp Display">
                <CustomPickList name="popupDisplay" selected={data?.duration} sourceData={calendarDisplayOptions} onPickListChange={handleChange} />
            </CustomCard>
            <CustomCard col="12" title="Pending Color">
                <CustomGridLayout>
                    <CustomPicker name="selectBoxColor" data={data} onChange={handleChange} col={4} />
                    <CustomPicker name="selectTextColor" data={data} onChange={handleChange} col={4} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Display Preview">
                <div style={{ backgroundColor: `#${data?.selectBoxColor}`, color: `#${data?.selectTextColor}` }} className="p-3 border-round">
                    John Smith, Aga Group 60 Min, Status Pending, Employee Paul Jones, 15/20
                </div>
            </CustomCard>
            <CustomCard col="12" title="Rebooking Time Option">
                <CustomGridLayout>
                    <CustomDropDown name="time" options={timeShownOptions} data={data} onChange={handleChange} col={6} />
                    <div col={6} className="border-round bg-white text-center mt-5 p-1">
                        <div className="p-2 flex justify-content-between ">
                            <h4>Preview:</h4>
                            <div> {calculateTimes(data?.time)}</div>
                        </div>
                    </div>
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Deploy Clubs">
                <CustomPickList name="clubs" selected={data?.clubs} sourceData={clubsDropdown} onPickListChange={handleChange} />
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" onClick={() => handleSave('')} loading={loading} />
                <PrimaryButton label="Save & Next" className="mx-2" onClick={() => handleSave('?tab=categories')} loading={loading} />
                <LightButton label="Cancel" onClick={() => history.replace('/settings/schedule')} />
            </CustomButtonGroup>
        </>
    );
};

export default DisplayOptions;
