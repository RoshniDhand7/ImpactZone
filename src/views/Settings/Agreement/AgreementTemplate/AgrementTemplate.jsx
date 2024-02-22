import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { deleteAgreementTemplates, getAgreementTemplates } from '../../../../redux/actions/AgreementSettings/AgreementTemplate';

const AgreementCategories = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAgreementTemplates());
    }, [dispatch]);

    const { allAgreementTemplates } = useSelector((state) => state.agreement);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'club', header: 'Club' },

        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/agreement/template/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteAgreementTemplates(col._id, () => {}));
            },
            'Do you want to delete this Agreement Template?',
            position,
        );
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Agreement Template" linkTo="/settings/agreement/template/add" />
            <CustomTable data={allAgreementTemplates} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default AgreementCategories;
