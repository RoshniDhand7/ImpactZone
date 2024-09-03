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
        timesShown: 'Quarter Hour',
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
                        timesShown: data.timesShown ? data.timesShown : 'Quarter Hour',
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

    const handleSave = (tab) => {
        if (showFormErrors(data, setData)) {
            if (id) {
                dispatch(editScheduledEvent(id, data, setLoading, history, tab));
            }
        }
    };

    return (
        <>
            <CustomCard col="12" title="Calendar Display">
                <CustomPickList
                    name="calanderDisplay"
                    selected={data?.calanderDisplay}
                    sourceData={calendarDisplayOptions}
                    onPickListChange={handleChange}
                    showTargetControls={true}
                />
            </CustomCard>
            <CustomCard col="12" title="PopUp Display">
                <CustomPickList
                    name="popupDisplay"
                    selected={data?.popupDisplay}
                    sourceData={calendarDisplayOptions}
                    onPickListChange={handleChange}
                    showTargetControls={true}
                />
            </CustomCard>
            <CustomCard col="12" title="Pending Color">
                <CustomGridLayout>
                    <CustomPicker name="boxColor" data={data} onChange={handleChange} col={4} />
                    <CustomPicker name="textColor" data={data} onChange={handleChange} col={4} />
                    <div className="bg-white border-round-lg p-4 ml-auto" style={{ width: '230px', height: '270px' }}>
                        <h3 className="mb-3">Display Preview</h3>
                        <div style={{ backgroundColor: `#${data?.boxColor}`, color: `#${data?.textColor}`, height: '182px' }} className="p-3 border-round ">
                            John Smith, Aga Group 60 Min, Status Pending, Employee Paul Jones, 15/20
                        </div>
                    </div>
                </CustomGridLayout>
            </CustomCard>

            <CustomCard col="12" title="Rebooking Time Option">
                <CustomGridLayout extraClass="align-items-center gap-4">
                    <CustomDropDown name="timesShown" options={timeShownOptions} data={data} onChange={handleChange} col={6} />

                    <div className="p-3 flex gap-2 border-round-md mt-4 bg-white   ">
                        <h4>Preview:</h4>
                        <div className="mx-4"> {calculateTimes(data?.timesShown)}</div>
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
