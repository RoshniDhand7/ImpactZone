import React, { useState, useEffect } from 'react';
import CustomCard, { CustomFilterCard, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import { editCatalogItem, getCatalogItem, getCatalogItems } from '../../../../redux/actions/InventorySettings/catalogItemsAction';
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
                getCatalogItem(id, (data) => {
                    if (data.checkInDeduction) {
                        setData({
                            checkInDeduction: data.checkInDeduction.toString(),
                        });
                        setPayTo(data.payTo);
                        setPayFor(data.payFor);
                        setBundled(data.bundleRecipe);
                    }
                }),
            );
        }
    }, [id, dispatch]);

    const handleSave1 = (tab) => {
        if (id) {
            dispatch(
                editCatalogItem(
                    id,
                    { payTo: getIds(payTo), payFor: getIds(payFor), bundleRecipe: getIds(bundled), checkInDeduction: data.checkInDeduction },
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
                <CustomFilterCard
                    buttonTitle="Add"
                    onClick={() => setOpen('payTo')}
                    buttonTitle1="Remove All"
                    extraClass="jusify-content-end"
                    onClick1={() => setBundled([])}
                />
                <CustomTable data={payTo} columns={columns1} showSelectionElement={false} />
            </CustomCard>
            <CustomCard col="12" title="Pays For">
                <CustomFilterCard
                    buttonTitle="Add"
                    onClick={() => setOpen('payFor')}
                    buttonTitle1="Remove All"
                    extraClass="jusify-content-end"
                    onClick1={() => setBundled([])}
                />
                <CustomTable data={payFor} columns={columns1} />
            </CustomCard>
            <CustomCard col="12" title="Bundle/Recipe">
                <CustomFilterCard
                    buttonTitle="Add"
                    onClick={() => setOpen('bundleRecipe')}
                    buttonTitle1="Remove All"
                    extraClass="jusify-content-end"
                    onClick1={() => setBundled([])}
                />
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
