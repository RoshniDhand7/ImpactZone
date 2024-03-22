import React, { useEffect, useState } from 'react';
import { calendarDisplayOptions, timeShownOptions } from '../../../../utils/dropdownConstants';
import CustomPickList from '../../../../shared/Input/CustomPickList';
import formValidation from '../../../../utils/validations';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import CustomPicker from '../../../../shared/ColorPicker/ColorPicker';
import { CustomDropDown } from '../../../../shared/Input/AllInputs';
import { calculateTimes, showFormErrors } from '../../../../utils/commonFunctions';
import { getClubs } from '../../../../redux/actions/BusinessSettings/clubsAction';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import { editScheduledEvent, getScheduledEvent } from '../../../../redux/actions/ScheduleSettings/eventsActions';

const DisplayOptions = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getClubs());
    }, [dispatch]);

    let { clubsDropdown } = useSelector((state) => state.clubs);
    const [data, setData] = useState({
        calanderDisplay: [],
        popupDisplay: [],
        boxColor: 'fc1c1c',
        textColor: 'fcfcfc',
        timesShown: '',
        club: [],
    });

    useEffect(() => {
        if (id) {
            dispatch(
                getScheduledEvent(id, (data) => {
                    setData({
                        calanderDisplay: data.calanderDisplay ? data.calanderDisplay : '',
                        popupDisplay: data.popupDisplay ? data.popupDisplay : '',
                        boxColor: data.boxColor,
                        textColor: data.textColor ?? 'fc1c1c',
                        timesShown: data.timesShown ?? 'fcfcfc',
                        club: data.club,
                    });
                }),
            );
        }
    }, [id, dispatch]);
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    console.log(data);
    const handleSave = (tab) => {
        if (showFormErrors(data, setData)) {
            if (id) {
                dispatch(editScheduledEvent(id, data, setLoading, history, tab));
            }
        }
    };

    console.log('data>>', data, calendarDisplayOptions);
    return (
        <>
            <CustomCard col="12" title="Calendar Display">
                <CustomPickList name="calanderDisplay" selected={data?.calanderDisplay} sourceData={calendarDisplayOptions} onPickListChange={handleChange} />
            </CustomCard>
            <CustomCard col="12" title="PopUp Display">
                <CustomPickList name="popupDisplay" selected={data?.popupDisplay} sourceData={calendarDisplayOptions} onPickListChange={handleChange} />
            </CustomCard>
            <CustomCard col="12" title="Pending Color">
                <CustomGridLayout>
                    <CustomPicker name="boxColor" data={data} onChange={handleChange} col={4} />
                    <CustomPicker name="textColor" data={data} onChange={handleChange} col={4} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Display Preview">
                <div style={{ backgroundColor: `#${data?.boxColor}`, color: `#${data?.textColor}` }} className="p-3 border-round">
                    John Smith, Aga Group 60 Min, Status Pending, Employee Paul Jones, 15/20
                </div>
            </CustomCard>
            <CustomCard col="12" title="Rebooking Time Option">
                <CustomGridLayout>
                    <CustomDropDown name="timesShown" options={timeShownOptions} data={data} onChange={handleChange} col={6} />
                    <div col={6} className="border-round bg-white text-center mx-auto">
                        <div className="p-2 flex justify-content-between mx-auto">
                            <h4>Preview:</h4>
                            <div className="mx-4"> {calculateTimes(data?.timesShown)}</div>
                        </div>
                    </div>
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Deploy Clubs">
                <CustomPickList name="club" selected={data?.club} sourceData={clubsDropdown} onPickListChange={handleChange} />
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" onClick={() => handleSave('')} loading={loading} />
                <PrimaryButton label="Save & Next" className="mx-2" onClick={() => handleSave('?tab=online')} loading={loading} />
                <LightButton label="Cancel" onClick={() => history.replace('/settings/schedule?tab=events-setups')} />
            </CustomButtonGroup>
        </>
    );
};

export default DisplayOptions;
