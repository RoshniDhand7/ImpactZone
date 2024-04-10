import React, { useEffect, useState } from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomFilterCard1, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomDropDown, CustomInput, CustomInputNumber, CustomInputSwitch } from '../../../../shared/Input/AllInputs';
import formValidation from '../../../../utils/validations';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SpecialRestrictionOptions, defaultDiscountOptions, yesNoOptions } from '../../../../utils/dropdownConstants';
import CustomPickList from '../../../../shared/Input/CustomPickList';
import { getClubs } from '../../../../redux/actions/BusinessSettings/clubsAction';
import CustomTable from '../../../../shared/Table/CustomTable';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import { getCatalogItems } from '../../../../redux/actions/InventorySettings/catalogItemsAction';
import { confirmDelete, getIds, showFormErrors } from '../../../../utils/commonFunctions';
import { getAccessSchedules } from '../../../../redux/actions/MembersSettings/accessSchedule';
import { addMembershipType, editMembershipType, getMembershipType } from '../../../../redux/actions/MembersSettings/membershipTypes';

const MembershipTypeForm = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getClubs());
        dispatch(getCatalogItems());
        dispatch(getAccessSchedules());
    }, [dispatch]);

    const { AccessScheduleDropdown } = useSelector((state) => state.accessSchedule);
    const { MembershipTypesDropdown } = useSelector((state) => state.membershipTypes);
    const { catalogServiceFilterItems } = useSelector((state) => state.catalogItems);

    let { clubsDropdown } = useSelector((state) => state.clubs);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([]);

    const [data, setData] = useState({
        name: '',
        description: '',
        discountType: 'None',
        accessRestriction: 'false',
        accessSchedule: null,
        remotecheckin: '',
        transferToAnotherType: null,
        clubCreditAmount: '',
        specialRestriction: '',
        minimumAgeAllowed: 0,
        maximumAgeAllowed: 0,
        maximumDaysAllowed: 0,
        maximumDistanceAllowed: 0,
        club: [],
        services: [],
        isActive: true,
    });

    const history = useHistory();

    const { loading } = useSelector((state) => state?.loader?.isLoading);

    useEffect(() => {
        if (id) {
            dispatch(
                getMembershipType(id, (data) => {
                    setData({
                        name: data.name,
                        description: data.description,
                        discountType: data.discountType,
                        accessRestriction: data.accessRestriction,
                        accessSchedule: data.accessSchedule,
                        remotecheckin: data.remotecheckin,
                        transferToAnotherType: data.transferToAnotherType,
                        clubCreditAmount: data.clubCreditAmount,
                        specialRestriction: data.specialRestriction,
                        minimumAgeAllowed: data.minimumAgeAllowed,
                        maximumAgeAllowed: data.maximumAgeAllowed,
                        maximumDaysAllowed: data.maximumDaysAllowed,
                        maximumDistanceAllowed: data.maximumDistanceAllowed,
                        club: data.club,
                        services: data.services,
                        isActive: true,
                    });
                }),
            );
        }
    }, [id, dispatch]);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    useEffect(() => {
        if (id) {
            if (open) {
                setSelected(data?.services);
            }
        }
    }, [data?.services, open]);

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

    const onSave = () => {
        let ignore = [];
        switch (data?.specialRestriction) {
            case 'By Age':
                ignore = ['maximumDaysAllowed', 'maximumDistanceAllowed', 'services'];
                break;
            case 'By Location':
                ignore = ['minimumAgeAllowed', 'maximumAgeAllowed', 'maximumDaysAllowed', 'services'];
                break;
            case 'By Days':
                ignore = ['maximumAgeAllowed', 'minimumAgeAllowed', 'maximumDistanceAllowed', 'services'];
                break;
            default:
                ignore = ['maximumDaysAllowed', 'maximumDistanceAllowed', 'minimumAgeAllowed', 'maximumAgeAllowed', 'services'];
                break;
        }
        if (showFormErrors(data, setData, ignore)) {
            if (id) {
                dispatch(editMembershipType(id, { ...data, services: getIds(data.services) }, history));
            } else {
                dispatch(addMembershipType({ ...data, services: getIds(data.services) }, () => history.goBack()));
            }
        }
    };
    return (
        <>
            <FormPage backText="Membership Types">
                <CustomCard col="12" title="General">
                    <CustomInputSwitch name="isActive" data={data} onChange={handleChange} />
                    <CustomGridLayout>
                        <CustomInput name="name" data={data} onChange={handleChange} required />
                        <CustomInput name="description" data={data} onChange={handleChange} />
                        <CustomDropDown name="discountType" options={discountTypeOptions} onChange={handleChange} data={data} />
                        <CustomDropDown name="accessRestriction" options={yesNoOptions} onChange={handleChange} data={data} />
                        {data?.accessRestriction === 'true' && (
                            <CustomDropDown name="accessSchedule" options={AccessScheduleDropdown} onChange={handleChange} data={data} />
                        )}
                        <CustomDropDown name="remotecheckin" options={yesNoOptions} onChange={handleChange} data={data} />
                        <CustomDropDown name="transferToAnotherType" options={MembershipTypesDropdown} onChange={handleChange} data={data} />
                        <CustomInputNumber prefix="$" name="clubCreditAmount" data={data} onChange={handleChange} col="4" />
                        <CustomDropDown name="specialRestriction" options={SpecialRestrictionOptions} onChange={handleChange} data={data} />
                        {data?.specialRestriction === 'By Age' && (
                            <>
                                <CustomInputNumber name="minimumAgeAllowed" data={data} onChange={handleChange} col="4" />
                                <CustomInputNumber name="maximumAgeAllowed" data={data} onChange={handleChange} col="4" />
                            </>
                        )}
                        {data?.specialRestriction === 'By Location' && (
                            <>
                                <CustomInputNumber name="maximumDistanceAllowed" data={data} onChange={handleChange} col="4" />
                            </>
                        )}
                        {data?.specialRestriction === 'By Days' && (
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
                    <PrimaryButton label="Save" className="mx-2" onClick={onSave} loading={loading} />
                    <LightButton label="Cancel" onClick={() => history.goBack()} />
                </CustomButtonGroup>
            </FormPage>
        </>
    );
};

export default MembershipTypeForm;
