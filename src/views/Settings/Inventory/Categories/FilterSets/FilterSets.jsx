import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFilterCard, CustomGridLayout } from '../../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../../shared/Table/CustomTable';
import { confirmDelete, showFormErrors } from '../../../../../utils/commonFunctions';
import { addFilterSet, deleteFilterSet, editFilterSet, getFilterSet, getFilterSets } from '../../../../../redux/actions/InventorySettings/filterSetsAction';
import formValidation from '../../../../../utils/validations';
import CustomDialog from '../../../../../shared/Overlays/CustomDialog';
import { CustomInput } from '../../../../../shared/Input/AllInputs';

export default function FilterSets() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFilterSets());
    }, [dispatch]);

    const [filterSetId, setFilterSetId] = useState(null);
    const [visible, setVisible] = useState(false);
    const { allFilterSet } = useSelector((state) => state.filterSet);

    const columns = [{ field: 'name', header: 'Name' }];

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteFilterSet(col._id, () => {}));
            },
            'Do you want to delete this Filter Set?',
            position,
        );
    };
    const onEdit = (col) => {
        setFilterSetId(col?._id);
    };

    const [data, setData] = useState({
        name: '',
    });

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    useEffect(() => {
        if (filterSetId) {
            dispatch(
                getFilterSet(filterSetId, (data) => {
                    setData({
                        name: data.name,
                    });
                }),
            );
        }
    }, [filterSetId, dispatch]);

    const onClose = () => {
        setVisible(false);
        setFilterSetId(null);
        setData({
            name: '',
        });
    };

    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            if (filterSetId) {
                dispatch(
                    editFilterSet(filterSetId, data, () => {
                        onClose();
                        setData({
                            name: '',
                        });
                        dispatch(getFilterSets());
                    }),
                );
            } else {
                dispatch(
                    addFilterSet(data, () => {
                        onClose();
                        setData({
                            name: '',
                        });
                        dispatch(getFilterSets());
                    }),
                );
            }
        }
    };
    return (
        <>
            <CustomFilterCard
                buttonTitle="Add Filter Sets"
                onClick={() => {
                    setVisible(true);
                }}
            />
            <CustomTable data={allFilterSet} columns={columns} onEdit={onEdit} onDelete={onDelete} />
            <CustomDialog
                title={filterSetId ? 'Edit Filter Set' : 'Add Filter Set'}
                visible={visible || filterSetId}
                onCancel={onClose}
                loading={false}
                onSave={handleSave}
            >
                <CustomGridLayout>
                    <CustomInput name="name" col={12} data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
}
