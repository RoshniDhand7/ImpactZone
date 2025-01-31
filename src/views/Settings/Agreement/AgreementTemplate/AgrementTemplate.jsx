import React, { useEffect, useState } from 'react';
import { CustomFilterCard, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete, showFormErrors } from '../../../../utils/commonFunctions';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import { CustomInput, CustomInputSwitch, CustomMultiselect } from '../../../../shared/Input/AllInputs';
import formValidation from '../../../../utils/validations';
import useGetClubs from '../../../../hooks/useGetClubs';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import useFilters from '../../../../hooks/useFilters';
import AgreementTemplateFilter from './AgreementTemplateFilter';
import {
    addAgreementTemplate,
    deleteAgreementTemplates,
    getAgreementTemplates,
} from '../../../../redux/actions/Settings/AgreementSetup/AgreementTemplateAction';

const AgreementCategories = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { clubsDropdown } = useGetClubs();

    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({
        name: '',
        club: [],
        isActive: true,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(getAgreementTemplates());
        localStorage.removeItem('gjsProject');
    }, [dispatch]);

    const agreementTemplates = useSelector((state) => state.settings.agreement.agreementTemplates);

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
    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(agreementTemplates);
    const { isTableLoading } = useSelector((state) => state?.tableLoader);

    return (
        <>
            <CustomFilterCard buttonTitle="Add Agreement Template" linkTo="/settings/agreement/template/add" contentPosition="end">
                <PrimaryButton label="Filters" icon="pi pi-filter" className="mx-2" onClick={onFilterOpen} />
            </CustomFilterCard>
            <AgreementTemplateFilter filters={filters} onApplyFilters={onApplyFilters} isFilterVisible={isFilterVisible} onFilterClose={onFilterClose} />
            <CustomTable data={tableData} columns={columns} onEdit={onEdit} onDelete={onDelete} onCopy={onCopy} loading={isTableLoading} />
            <CustomDialog title="Copy Agreement Template" visible={visible} onCancel={onClose} loading={loading} onSave={handleSave}>
                <CustomGridLayout>
                    <CustomInput col="12" name="name" data={data} onChange={handleChange} />
                    <CustomMultiselect col="12" name="club" data={data} onChange={handleChange} options={clubsDropdown} />
                    <CustomInputSwitch name="isActive" data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default AgreementCategories;
