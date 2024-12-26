import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { useHistory, useParams } from 'react-router-dom';
import { deleteAllServicesList, getServicesEvents } from '../../../../redux/actions/Settings/ScheduleSetup/eventsActions';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../../../shared/Table/CustomTable';
import CustomAccordion from '../../../../shared/Accordion/Accordion';
import { confirmDelete } from '../../../../utils/commonFunctions';

const EventServices = () => {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getServicesEvents(id));
    }, [dispatch, id]);
    const columns = [
        { field: 'netPrice', header: 'Catalog Price' },
        { field: 'name', header: 'Name' },
        { field: 'isActive', header: 'Status' },
    ];

    const { servicesEvents } = useSelector((state) => state.settings.schedule);

    const customHeader = (item) => {
        return (
            <div className="flex align-items-center justify-content-between gap-2 w-full ml-auto">
                <div> {item?.eventLevel?.name}</div>
                <div className="flex gap-3 mr-3">
                    <i
                        className="pi pi-pencil"
                        onClick={() => {
                            history.push(`/settings/schedule/events/edit/${id}/services/edit/${item._id}`);
                        }}
                    ></i>
                    <i
                        className="pi pi-trash"
                        onClick={() =>
                            confirmDelete(() => {
                                dispatch(
                                    deleteAllServicesList(item._id, () => {
                                        dispatch(getServicesEvents(id));
                                    }),
                                );
                            }, 'Do you want to delete this Service?')
                        }
                    ></i>
                </div>
            </div>
        );
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Level & Services" linkTo={`/settings/schedule/events/edit/${id}/services/add`} />
            {servicesEvents?.EventService?.map((item, i) => (
                <CustomAccordion isActive={true} extraClassName="employee-accordion w-full" title={customHeader(item)}>
                    <CustomTable data={item.services} columns={columns} />
                </CustomAccordion>
            ))}
        </>
    );
};

export default EventServices;
