import React, { useEffect, useState } from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import { CustomDropDown } from '../../../../shared/Input/AllInputs';
import { useDispatch, useSelector } from 'react-redux';
import { getLevels } from '../../../../redux/actions/ScheduleSettings/levelActions';
import CustomCard, { CustomFilterCard1, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import CustomTable from '../../../../shared/Table/CustomTable';
import { getCatalogItems } from '../../../../redux/actions/InventorySettings/catalogItemsAction';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import { useHistory, useParams } from 'react-router-dom';
import { confirmDelete, getIds, showFormErrors } from '../../../../utils/commonFunctions';
import formValidation from '../../../../utils/validations';
import {
    deleteAllServices,
    editScheduledEvent,
    editScheduledEventServices,
    getScheduledEventService,
    getServicesEvents,
} from '../../../../redux/actions/ScheduleSettings/eventsActions';

const AddandEditServices = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const { id, eventId } = useParams();
    const [data, setData] = useState({
        level: '',
        services: [],
    });
    useEffect(() => {
        dispatch(getLevels());
        dispatch(getCatalogItems());
    }, [dispatch]);
    useEffect(() => {
        dispatch(getServicesEvents(id));
    }, [dispatch, id]);

    const getServiceList = () => {
        dispatch(
            getScheduledEventService(eventId, (data) => {
                setData({
                    level: data.eventLevel,
                    services: data.services,
                });
            }),
        );
    };
    useEffect(() => {
        if (eventId) {
            getServiceList();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventId, dispatch]);

    const { allServicesEventsLevels } = useSelector((state) => state.event);

    useEffect(() => {
        if (id) {
            if (open && data.services) {
                setSelected(data?.services);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.services, open]);

    const { levelDropdown, allLevels } = useSelector((state) => state.level);
    let filterdLevelsDropdown = levelDropdown.filter((item) => !allServicesEventsLevels.map((ed) => ed).includes(item.name));

    const { catalogServiceFilterItems } = useSelector((state) => state.catalogItems);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const columns = [
        { selectionMode: 'multiple', headerStyle: '' },
        { field: 'unitPrice', header: 'Catalog Price' },
        { field: 'name', header: 'Name' },
        { field: 'upc', header: 'UPC' },
    ];
    const columns1 = [
        { field: 'unitPrice', header: 'Catalog Price' },
        { field: 'name', header: 'Name' },
        { field: 'upc', header: 'UPC' },
    ];

    const levelIndex = allLevels?.findIndex((item) => item._id === data.level);
    const handleSave = () => {
        const formErrors = formValidation('services', selected, data);
        setData((prev) => ({ ...prev, services: selected, formErrors }));
        setOpen(false);
        setSelected('');
    };
    const handleSave1 = (tab) => {
        if (showFormErrors(data, setData)) {
            if (eventId) {
                dispatch(editScheduledEventServices(eventId, { ...data, services: getIds(data.services) }, setLoading, history));
            } else {
                dispatch(editScheduledEvent(id, { ...data, services: getIds(data.services) }, setLoading, history));
            }
        }
    };

    const handleServiceDelete = (col) => {
        confirmDelete(
            () => {
                const services = data?.services?.filter((item) => item?._id !== col?._id);
                setData((prev) => ({ ...prev, services }));
                // dispatch(
                //     singleServiceDelete(eventId, col?._id, () => {
                //         getServiceList();
                //     }),
                // );
            },
            `Do you want to delete this Service ?`,
            'center',
        );
    };

    return (
        <>
            <FormPage backText="Services">
                <CustomDropDown
                    name="level"
                    options={eventId ? levelDropdown : filterdLevelsDropdown}
                    onChange={handleChange}
                    data={data}
                    disabled={eventId ? true : false}
                />

                <CustomCard col="12" title={`Level ${data?.level && levelDropdown[levelIndex]?.name}`}>
                    <CustomFilterCard1 buttonTitle="Add" onClick={() => setOpen(true)} extraClass="justify-content-end gap-2">
                        <div>
                            <PrimaryButton
                                label={'Remove All'}
                                onClick={() => {
                                    setData((prev) => ({ ...prev, services: [] }));
                                    dispatch(deleteAllServices(eventId));
                                }}
                            />
                        </div>
                    </CustomFilterCard1>
                    <CustomTable data={data?.services} columns={columns1} showSelectionElement={false} onDelete={(col) => handleServiceDelete(col)} />
                    {<div className="text-red text-sm">{data?.formErrors?.services}</div>}
                </CustomCard>
                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" onClick={() => handleSave1('')} loading={loading} />
                    <LightButton label="Cancel" onClick={() => history.goBack()} />

                    {/* <PrimaryButton label="Save & Next" className="mx-2" onClick={() => handleSave1('?tab=variations')} loading={loading} /> */}
                </CustomButtonGroup>

                <CustomDialog
                    title={'Add Services'}
                    visible={open}
                    onCancel={() => {
                        setOpen('');
                    }}
                    loading={loading}
                    onSave={handleSave}
                    width="auto"
                >
                    <CustomGridLayout>
                        {open && (
                            <CustomTable
                                convertToboolean={false}
                                data={catalogServiceFilterItems}
                                columns={columns}
                                selectedRow={selected}
                                setSelectedRow={setSelected}
                            />
                        )}
                    </CustomGridLayout>
                </CustomDialog>
            </FormPage>
        </>
    );
};

export default AddandEditServices;
