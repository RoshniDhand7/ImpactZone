import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFilterCard, CustomGridLayout } from '../../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../../shared/Table/CustomTable';
import { confirmDelete, showFormErrors } from '../../../../../utils/commonFunctions';
import formValidation from '../../../../../utils/validations';
import CustomDialog from '../../../../../shared/Overlays/CustomDialog';
import { CustomInput } from '../../../../../shared/Input/AllInputs';
import { addTags, deleteTags, editTags, getTag, getTags } from '../../../../../redux/actions/Settings/InventorySetup/tagAction';

export default function Tags() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTags());
    }, [dispatch]);

    const [tagsId, setTagsId] = useState(null);
    const [visible, setVisible] = useState(false);

    const { allTags } = useSelector((state) => state.tags);

    const columns = [{ field: 'name', header: 'Name' }];

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteTags(col._id, () => {}));
            },
            'Do you want to delete this Tag?',
            position,
        );
    };
    const onEdit = (col) => {
        setTagsId(col?._id);
    };

    const [data, setData] = useState({
        name: '',
    });

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    useEffect(() => {
        if (tagsId) {
            dispatch(
                getTag(tagsId, (data) => {
                    setData({
                        name: data.name,
                    });
                }),
            );
        }
    }, [tagsId, dispatch]);

    const onClose = () => {
        setVisible(false);
        setTagsId(null);
        setData({
            name: '',
        });
    };

    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            if (tagsId) {
                dispatch(
                    editTags(tagsId, data, () => {
                        onClose();
                        setData({
                            name: '',
                        });
                        dispatch(getTags());
                    }),
                );
            } else {
                dispatch(
                    addTags(data, () => {
                        onClose();
                        setData({
                            name: '',
                        });
                        dispatch(getTags());
                    }),
                );
            }
        }
    };
    return (
        <>
            <CustomFilterCard
                buttonTitle="Add Tags"
                onClick={() => {
                    setVisible(true);
                }}
            />
            <CustomTable data={allTags} columns={columns} onEdit={onEdit} onDelete={onDelete} />
            <CustomDialog title={tagsId ? 'Edit Tags' : 'Add Tags'} visible={visible || tagsId} onCancel={onClose} loading={false} onSave={handleSave}>
                <CustomGridLayout>
                    <CustomInput name="name" col={12} data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
}
