import React, { useState, useEffect } from 'react';
import CustomCard, { CustomFilterCard1, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { confirmDelete } from '../../../../utils/commonFunctions';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import CustomTable from '../../../../shared/Table/CustomTable';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import useCatalogItems from '../../../../hooks/Inventory/useCatalogItems';

const SelectCatalogItems = ({ data, setData, id, loading, name }) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const { CatalogItemsList } = useCatalogItems();

    useEffect(() => {
        if (id) {
            if (open) {
                setSelected(data?.catalogs);
            }
        }
    }, [data?.catalogs, open, id]);

    const columns = [
        { selectionMode: 'multiple', headerStyle: '' },
        { field: 'name', header: ' Name' },
        { field: 'upc', header: 'UPC' },
        { field: 'unitPrice', header: 'Price' },
    ];

    const columns1 = [
        { field: 'name', header: 'Name' },
        { field: 'upc', header: 'UPC' },
        { field: 'unitPrice', header: 'Price' },
    ];

    const handleServiceDelete = (col) => {
        confirmDelete(
            () => {
                setData((prev) => ({ ...prev, catalogs: data?.catalogs?.filter((item) => item._id !== col?._id) }));
            },
            `Do you want to delete this Catalog Item ?`,
            'center',
        );
    };

    const handleSave = () => {
        setData((prev) => ({ ...prev, catalogs: selected }));
        setOpen(false);
    };

    return (
        <>
            <CustomCard col="12" title={name}>
                <CustomFilterCard1 buttonTitle="Add" onClick={() => setOpen(true)} extraClass="justify-content-end gap-2">
                    <div>
                        <PrimaryButton
                            label={'Remove All'}
                            onClick={() => {
                                setData((prev) => ({ ...prev, catalogs: [] }));
                                setSelected([]);
                            }}
                        />
                    </div>
                </CustomFilterCard1>
                <CustomTable data={data?.catalogs} columns={columns1} showSelectionElement={false} onDelete={handleServiceDelete} />
            </CustomCard>
            <CustomDialog
                title={'Add Catlog Item'}
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
                        <CustomTable convertToboolean={false} data={CatalogItemsList} columns={columns} selectedRow={selected} setSelectedRow={setSelected} />
                    )}
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default SelectCatalogItems;
