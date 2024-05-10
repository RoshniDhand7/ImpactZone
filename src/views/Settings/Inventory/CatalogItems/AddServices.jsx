import React, { useState, useEffect } from 'react';
import CustomCard, { CustomFilterCard1, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { confirmDelete } from '../../../../utils/commonFunctions';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import CustomTable from '../../../../shared/Table/CustomTable';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { getCatalogItems } from '../../../../redux/actions/InventorySettings/catalogItemsAction';

const AddServices = ({ data, setData, id, loading, type }) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCatalogItems());
    }, [dispatch]);
    useEffect(() => {
        if (id) {
            if (open) {
                setSelected(data?.services);
            }
        }
    }, [data?.services, open, id]);

    const { catalogServiceFilterItems, allCatalogItemsFilter } = useSelector((state) => state.catalogItems);

    const columns = [
        { selectionMode: 'multiple', headerStyle: '' },
        { field: 'name', header: 'Item Name' },
        { field: 'upc', header: 'Item UPC' },
        { field: 'unitPrice', header: 'Price' },
    ];

    const columns1 = [
        { field: 'name', header: 'Item Name' },
        { field: 'upc', header: 'Item UPC' },
        { field: 'unitPrice', header: 'Price' },
    ];

    const handleServiceDelete = (col) => {
        confirmDelete(
            () => {
                setData((prev) => ({ ...prev, services: data?.services?.filter((item) => item._id !== col?._id) }));
            },
            `Do you want to delete this Service ?`,
            'center',
        );
    };

    const handleSave = () => {
        setData((prev) => ({ ...prev, services: selected }));
        setOpen(false);
    };

    return (
        <>
            <CustomCard col="12" title=" Add Services">
                <CustomFilterCard1 buttonTitle="Add" onClick={() => setOpen(true)} extraClass="justify-content-end gap-2">
                    <div>
                        <PrimaryButton
                            label={'Remove All'}
                            onClick={() => {
                                setData((prev) => ({ ...prev, services: [] }));
                                setSelected([]);
                            }}
                        />
                    </div>
                </CustomFilterCard1>
                <CustomTable data={data?.services} columns={columns1} showSelectionElement={false} onDelete={handleServiceDelete} />
            </CustomCard>
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
                            data={type === 'discount' ? allCatalogItemsFilter : catalogServiceFilterItems}
                            columns={columns}
                            selectedRow={selected}
                            setSelectedRow={setSelected}
                        />
                    )}
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default AddServices;
