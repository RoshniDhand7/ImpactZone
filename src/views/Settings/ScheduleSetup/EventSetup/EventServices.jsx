import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { useHistory, useParams } from 'react-router-dom';
import { getEvents, getServicesEvents } from '../../../../redux/actions/ScheduleSettings/eventsActions';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../../../shared/Table/CustomTable';
import CustomAccordion from '../../../../shared/Accordion/Accordion';

const EventServices = () => {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getServicesEvents());
    }, [dispatch]);
    const columns = [
        { field: 'unitPrice', header: 'Catalog Price' },
        { field: 'name', header: 'Name' },
        { field: 'size', header: 'Size' },
        { field: 'isActive', header: 'Status' },
    ];

    const { allServicesEvents } = useSelector((state) => state.event);

    console.log(allServicesEvents);

    const customHeader = (item) => {
        console.log('item>>', item);
        return (
            <div className="flex align-items-center justify-content-between gap-2 w-full ml-auto">
                <div> Level {item?.eventLevel?.name}</div>
                <div className="flex gap-3 mr-3">
                    <i
                        className="pi pi-pencil"
                        onClick={() => {
                            history.push(`/settings/schedule/events/edit/${id}/services/edit/${item._id}`);
                        }}
                    ></i>
                    <i
                        className="pi pi-trash"
                        // onClick={() =>
                        //     confirmDelete(() => {
                        //         dispatch(
                        //             deleteAllCatalogVariation(item._id, () => {
                        //                 dispatch(getCatalogVariations(id));
                        //             }),
                        //         );
                        //     }, 'Do you want to delete this Variation?')
                        // }
                    ></i>
                </div>
            </div>
        );
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Level & Services" linkTo={`/settings/schedule/events/edit/${id}/services/add`} />
            {allServicesEvents?.EventService?.map((item, i) => (
                <CustomAccordion isActive={true} extraClassName="employee-accordion w-full" title={customHeader(item)}>
                    <CustomTable data={item.services} columns={columns} />
                </CustomAccordion>
            ))}
        </>
    );
};

export default EventServices;
