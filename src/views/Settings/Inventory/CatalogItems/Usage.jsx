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
import { confirmDelete, getIds } from '../../../../utils/commonFunctions';

const Usage = () => {
    const [open, setOpen] = useState('');
    const { id } = useParams();
    const history = useHistory();
    const [selected, setSelected] = useState([]);
    const [selected1, setSelected1] = useState([]);
    const [selected2, setSelected2] = useState([]);
    const [payTo, setPayTo] = useState([]);
    const [payFor, setPayFor] = useState([]);
    const [bundled, setBundled] = useState([]);
    const [usageId, setUsageId] = useState('');

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCatalogItems());
    }, [dispatch]);

    const { allCatalogItemsFilter, catalogTypeFilterItems } = useSelector((state) => state.catalogItems);
    const loading = useSelector((state) => state?.loader?.isLoading);

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

    const handleSave = () => {
        if (open === 'payTo') {
            setPayTo(selected);
            setOpen('');
            setSelected('');
        } else if (open === 'payFor') {
            setPayFor(selected1);
            setOpen('');
            setSelected1('');
        } else if (open === 'bundleRecipe') {
            setBundled(selected2);
            setOpen('');
            setSelected1('');
        }
    };

    const getUsageItems = () => {
        dispatch(
            getUsageItem(id, (data) => {
                if (data.checkInDeduction) {
                    setData({
                        checkInDeduction: data.checkInDeduction,
                    });
                    setPayTo(data.paysTo);
                    setPayFor(data.paysFor);
                    setBundled(data.bundleRecipe);
                    setUsageId(data._id);
                }
            }),
        );
    };

    useEffect(() => {
        if (id) {
            getUsageItems();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, dispatch]);
    useEffect(() => {
        if (id) {
            if (open === 'payTo' && payTo) {
                setSelected(payTo);
            } else if (open === 'payFor' && payFor) {
                setSelected1(payFor);
            } else if (open === 'bundleRecipe' && bundled) {
                setSelected2(bundled);
            }
        }
    }, [payTo, payFor, bundled, id, open]);

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

    const handleUsageDelete = (id, col, type) => {
        confirmDelete(
            () => {
                if (type === 'paysTo') {
                    // dispatch(singleUsageDelete(usageId, col?._id, type, () => getUsageItems()));
                    setPayTo(payTo?.filter((item) => item._id !== col?._id));
                } else if (type === 'paysFor') {
                    setPayFor(payFor?.filter((item) => item._id !== col?._id));
                    // dispatch(singleUsageDelete(usageId, col?._id, type, () => getUsageItems()));
                } else if (type === 'bundleRecipe') {
                    setBundled(bundled?.filter((item) => item._id !== col?._id));
                    // dispatch(singleUsageDelete(usageId, col?._id, type, () => getUsageItems()));
                }
            },
            `Do you want to delete this ${type} ?`,
            'center',
        );
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
                <CustomTable data={payTo} columns={columns1} showSelectionElement={false} onDelete={(col) => handleUsageDelete(usageId, col, 'paysTo')} />
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
                <CustomTable data={payFor} columns={columns1} onDelete={(col) => handleUsageDelete(usageId, col, 'paysFor')} />
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
                <CustomTable data={bundled} columns={columns1} onDelete={(col) => handleUsageDelete(usageId, col, 'bundleRecipe')} />
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
                }}
                loading={loading}
                onSave={handleSave}
                width="auto"
            >
                <CustomGridLayout>
                    {open === 'payTo' && (
                        <CustomTable
                            convertToboolean={false}
                            data={open === 'payTo' && catalogTypeFilterItems}
                            columns={columns}
                            selectedRow={selected}
                            setSelectedRow={setSelected}
                        />
                    )}
                    {open === 'payFor' && (
                        <CustomTable
                            data={open === 'payFor' && catalogTypeFilterItems}
                            columns={columns}
                            selectedRow={selected1}
                            convertToboolean={false}
                            setSelectedRow={setSelected1}
                        />
                    )}
                    {open === 'bundleRecipe' && (
                        <CustomTable
                            convertToboolean={false}
                            data={allCatalogItemsFilter}
                            columns={columns}
                            selectedRow={selected2}
                            setSelectedRow={setSelected2}
                        />
                    )}
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default Usage;
