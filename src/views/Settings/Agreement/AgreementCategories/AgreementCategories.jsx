import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { deleteAgreementCategories, getAgreementCategories } from '../../../../redux/actions/AgreementSettings/agreementCategories';

const AgreementCategories = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAgreementCategories());
    }, [dispatch]);

    const { allAgreementCategories } = useSelector((state) => state.agreementCategories);

    const columns = [
        { field: 'name', header: 'Agreement Categories' },
        {
            field: 'subCategories',
            body: (r) => (r.subCategories ? r.subCategories?.join(',') : '-'),
            header: 'Sub Categories',
        },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/agreement/categories/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteAgreementCategories(col._id, () => {}));
            },
            'Do you want to delete this Agreement Categories ?',
            position,
        );
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Agreement Categories" linkTo="/settings/agreement/categories/add" />
            <CustomTable data={allAgreementCategories} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default AgreementCategories;
