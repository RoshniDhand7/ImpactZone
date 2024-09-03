import React, { useEffect, useState } from 'react';
import { CustomFilterCard, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete, showFormErrors } from '../../../../utils/commonFunctions';
import { addAgreementTemplate, deleteAgreementTemplates, getAgreementTemplates } from '../../../../redux/actions/AgreementSettings/AgreementTemplate';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import { CustomInput, CustomMultiselect } from '../../../../shared/Input/AllInputs';
import formValidation from '../../../../utils/validations';
import { getClubs } from '../../../../redux/actions/BusinessSettings/clubsAction';

const AgreementCategories = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getClubs());
    }, [dispatch]);

    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({
        name: '',
        club: [],
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(getAgreementTemplates());
        localStorage.removeItem('gjsProject');
    }, [dispatch]);

    const { allAgreementTemplates } = useSelector((state) => state.agreement);
    const { clubsDropdown } = useSelector((state) => state.clubs);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'club', header: 'Club', body: (r) => r.clubs.join(',') },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/agreement/template/edit/${col._id}`);
    };
    const onCopy = (col) => {
        setVisible(col);
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
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const onClose = () => {
        setVisible(null);
        setData({
            name: '',
        });
    };

    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            dispatch(
                addAgreementTemplate({ ...data, htmlContent: visible.htmlContent, cssContent: visible.cssContent }, setLoading, () => {
                    localStorage.removeItem('gjsProject');
                    onClose();
                    dispatch(getAgreementTemplates());
                }),
            );
        }
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Agreement Template" linkTo="/settings/agreement/template/add" />
            <CustomTable data={allAgreementTemplates} columns={columns} onEdit={onEdit} onDelete={onDelete} onCopy={onCopy} />
            <CustomDialog title="Copy Agreement Template" visible={visible} onCancel={onClose} loading={loading} onSave={handleSave}>
                <CustomGridLayout>
                    <CustomInput col="12" name="name" data={data} onChange={handleChange} />
                    <CustomMultiselect col="12" name="club" data={data} onChange={handleChange} options={clubsDropdown} />
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default AgreementCategories;
