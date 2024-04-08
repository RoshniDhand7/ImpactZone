import React, { useEffect, useState } from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomFilterCard1, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomDropDown, CustomInput, CustomInputNumber, CustomInputSwitch } from '../../../../shared/Input/AllInputs';
import formValidation from '../../../../utils/validations';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SpecialRestrictionOptions, defaultDiscountOptions, yesNoOptions } from '../../../../utils/dropdownConstants';
import CustomPickList from '../../../../shared/Input/CustomPickList';
import { getClubs } from '../../../../redux/actions/BusinessSettings/clubsAction';
import CustomTable from '../../../../shared/Table/CustomTable';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import { getCatalogItems } from '../../../../redux/actions/InventorySettings/catalogItemsAction';
import { confirmDelete } from '../../../../utils/commonFunctions';

const MembershipTypeForm = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getClubs());
        dispatch(getCatalogItems());
    }, [dispatch]);

    const { catalogServiceFilterItems } = useSelector((state) => state.catalogItems);

    let { clubsDropdown } = useSelector((state) => state.clubs);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([]);

    const [data, setData] = useState({
        name: '',
        description: '',
        discountType: '',
        accessRestriction: '',
        accessSchedule: null,
        allowRemoteCheckIn: '',
        minimumAgeAllowed: '',
        maximumAgeAllowed: '',
        maximumDaysAllowed: '',
        club: [],
        services: [],
        isActive: true,
    });

    const history = useHistory();

    const { loading } = useSelector((state) => state?.loader?.isLoading);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const discountTypeOptions = defaultDiscountOptions;

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
    console.log('data>>', data);
    return (
        <>
            <FormPage backText="Membership Types">
                <CustomCard col="12" title="General">
                    <CustomInputSwitch name="isActive" data={data} onChange={handleChange} />
                    <CustomGridLayout>
                        <CustomInput name="name" data={data} onChange={handleChange} required />
                        <CustomInput name="description" data={data} onChange={handleChange} required />
                        <CustomDropDown name="discountType" options={discountTypeOptions} onChange={handleChange} data={data} />
                        <CustomDropDown name="accessRestriction" options={yesNoOptions} onChange={handleChange} data={data} />
                        {data?.accessRestriction === 'true' && (
                            <CustomDropDown name="accessSchedule" options={yesNoOptions} onChange={handleChange} data={data} />
                        )}
                        <CustomDropDown name="allowRemoteCheckIn" options={yesNoOptions} onChange={handleChange} data={data} />
                        <CustomDropDown name="availableTypes" options={yesNoOptions} onChange={handleChange} data={data} />
                        <CustomInputNumber prefix="$" name="clubCreditAmount" data={data} onChange={handleChange} col="4" />
                        <CustomDropDown name="specialResrictions" options={SpecialRestrictionOptions} onChange={handleChange} data={data} />
                        {data?.specialResrictions === 'By Age' && (
                            <>
                                <CustomInputNumber name="minimumAgeAllowed" data={data} onChange={handleChange} col="4" />
                                <CustomInputNumber name="maximumAgeAllowed" data={data} onChange={handleChange} col="4" />
                            </>
                        )}
                        {data?.specialResrictions === 'By Location' && (
                            <>
                                <CustomInputNumber name="maximumDistanceAllowed" data={data} onChange={handleChange} col="4" />
                            </>
                        )}
                        {data?.specialResrictions === 'By Days' && (
                            <>
                                <CustomInputNumber name="maximumDaysAllowed" data={data} onChange={handleChange} col="4" />
                            </>
                        )}
                    </CustomGridLayout>
                </CustomCard>
                <CustomCard col="12" title=" Clubs">
                    <CustomPickList name="club" selected={data?.club} sourceData={clubsDropdown} onPickListChange={handleChange} />
                </CustomCard>
                <CustomCard col="12" title=" Add Services">
                    <CustomFilterCard1 buttonTitle="Add" onClick={() => setOpen(true)} extraClass="justify-content-end gap-2">
                        <div>
                            <PrimaryButton
                                label={'Remove All'}
                                onClick={() => {
                                    setData((prev) => ({ ...prev, services: [] }));
                                    setSelected([]);
                                    // dispatch(deleteUsageItem(id, 'paysTo'));
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
                                data={open && catalogServiceFilterItems}
                                columns={columns}
                                selectedRow={selected}
                                setSelectedRow={setSelected}
                            />
                        )}
                    </CustomGridLayout>
                </CustomDialog>
                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={loading} />
                    <LightButton label="Cancel" onClick={() => history.goBack()} />
                </CustomButtonGroup>
            </FormPage>
        </>
    );
};

export default MembershipTypeForm;
