import React, { useState, useEffect } from 'react';
import CustomCard, { CustomFilterCard1, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import { deleteUsageItem, editUsageItem, getCatalogItems, getUsageItem } from '../../../../redux/actions/InventorySettings/catalogItemsAction';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory, useParams } from 'react-router-dom';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { yesNoOptions } from '../../../../utils/dropdownConstants';
import { CustomDropDown } from '../../../../shared/Input/AllInputs';
import { getIds } from '../../../../utils/commonFunctions';

const Usage = () => {
    const [open, setOpen] = useState('');
    const { id } = useParams();
    const history = useHistory();
    const { loading, setLoading } = useState(false);
    const [selected, setSelected] = useState([]);
    const [payTo, setPayTo] = useState([]);
    const [payFor, setPayFor] = useState([]);
    const [bundled, setBundled] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCatalogItems());
    }, [dispatch]);

    const { allCatalogItems, catalogTypeFilterItems } = useSelector((state) => state.catalogItems);

    const [data, setData] = useState({
        checkInDeduction: 'false',
    });

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
    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    console.log(selected);
    const handleSave = () => {
        if (open === 'payTo') {
            setPayTo(selected);
            setOpen('');
            setSelected('');
        } else if (open === 'payFor') {
            setPayFor(selected);
            setOpen('');
            setSelected('');
        } else if (open === 'bundleRecipe') {
            setBundled(selected);
            setOpen('');
            setSelected('');
        }
    };

    useEffect(() => {
        if (id) {
            dispatch(
                getUsageItem(id, (data) => {
                    if (data.checkInDeduction) {
                        setData({
                            checkInDeduction: data.checkInDeduction.toString(),
                        });
                        setPayTo(data.paysTo);
                        setPayFor(data.paysFor);
                        setBundled(data.bundleRecipe);
                    }
                }),
            );
        }
    }, [id, dispatch]);

    const handleSave1 = (tab) => {
        if (id) {
            dispatch(
                editUsageItem(
                    id,
                    { paysTo: getIds(payTo), paysFor: getIds(payFor), bundleRecipe: getIds(bundled), checkInDeduction: data.checkInDeduction },
                    history,
                    tab,
                ),
            );
        }
    };

    return (
        <>
            <CustomDropDown name="checkInDeduction" options={yesNoOptions} onChange={handleChange} data={data} />

            <CustomCard col="12" title="Pays To">
                <CustomFilterCard1 buttonTitle="Add" onClick={() => setOpen('payTo')} extraClass="justify-content-end gap-2">
                    <div>
                        <PrimaryButton
                            label={'Remove All'}
                            onClick={() => {
                                setPayTo([]);
                                dispatch(deleteUsageItem(id, 'paysTo'));
                            }}
                        />
                    </div>
                </CustomFilterCard1>
                <CustomTable data={payTo} columns={columns1} showSelectionElement={false} />
            </CustomCard>
            <CustomCard col="12" title="Pays For">
                <CustomFilterCard1 buttonTitle="Add" onClick={() => setOpen('payFor')} extraClass="justify-content-end gap-2">
                    <div>
                        <PrimaryButton
                            label={'Remove All'}
                            onClick={() => {
                                setPayFor([]);
                                dispatch(deleteUsageItem(id, 'paysFor'));
                            }}
                        />
                    </div>
                </CustomFilterCard1>
                <CustomTable data={payFor} columns={columns1} />
            </CustomCard>
            <CustomCard col="12" title="Bundle/Recipe">
                <CustomFilterCard1 buttonTitle="Add" onClick={() => setOpen('bundleRecipe')} extraClass="justify-content-end gap-2">
                    <div>
                        <PrimaryButton
                            label={'Remove All'}
                            onClick={() => {
                                setBundled([]);
                                dispatch(deleteUsageItem(id, 'bundleRecipe'));
                            }}
                        />
                    </div>
                </CustomFilterCard1>
                <CustomTable data={bundled} columns={columns1} />
                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" onClick={() => handleSave1('')} loading={loading} />
                    <PrimaryButton label="Save & Next" className="mx-2" onClick={() => handleSave1('?tab=variations')} loading={loading} />
                    <LightButton label="Cancel" onClick={() => history.goBack()} />
                </CustomButtonGroup>
            </CustomCard>

            <CustomDialog
                title={'Add Services'}
                visible={open}
                onCancel={() => {
                    setOpen('');
                    setSelected('');
                }}
                loading={loading}
                onSave={handleSave}
                width="auto"
            >
                <CustomGridLayout>
                    <CustomTable
                        data={open === 'payTo' || open === 'payFor' ? catalogTypeFilterItems : allCatalogItems}
                        columns={columns}
                        selectedRow={selected}
                        setSelectedRow={setSelected}
                    />
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default Usage;
