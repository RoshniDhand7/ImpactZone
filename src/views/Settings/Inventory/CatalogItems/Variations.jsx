import React, { useCallback, useEffect, useState } from 'react';
import CustomCard, { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import AddandEditVariatons from './AddandEditVariatons';
import CustomAccordion from '../../../../shared/Accordion/Accordion';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { CustomCheckbox } from '../../../../shared/Input/AllInputs';
import { showToast } from '../../../../redux/actions/toastAction';
import {
    deleteAllCatalogVariation,
    deleteCatalogVariation,
    editSubVariationCatalog,
    getCatalogVariations,
} from '../../../../redux/actions/Settings/InventorySetup/catalogItemsAction';

const Variations = ({ editItem }) => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const [variationId, setVariationId] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        dispatch(getCatalogVariations(id));
    }, [dispatch, id]);

    const categoryVariations = useSelector((state) => state?.catalogItems?.allCategoryVariations);

    useEffect(() => {
        setProducts(categoryVariations);
    }, [categoryVariations]);

    const customHeader = (item) => {
        return (
            <div className="flex align-items-center justify-content-between gap-2 w-full ml-auto">
                <div>{item.variationName}</div>
                <div className="flex gap-3 mr-3">
                    <i
                        className="pi pi-pencil"
                        onClick={() => {
                            setOpen(true);
                            setVariationId(item._id);
                        }}
                    ></i>
                    <i
                        className="pi pi-trash"
                        onClick={() =>
                            confirmDelete(() => {
                                dispatch(
                                    deleteAllCatalogVariation(item._id, () => {
                                        dispatch(getCatalogVariations(id));
                                    }),
                                );
                            }, 'Do you want to delete this Variation?')
                        }
                    ></i>
                </div>
            </div>
        );
    };

    const [products, setProducts] = useState([]);
    const onRowEditComplete = (e) => {
        const { newData } = e;

        //check validation
        if (!newData.upc) {
            dispatch(showToast({ severity: 'error', summary: 'UPC is required' }));
            return;
        }

        //save data if valid
        dispatch(
            editSubVariationCatalog(
                newData._id,
                {
                    subVariation: newData.subVariation,
                    ...newData,
                },
                () => {
                    dispatch(getCatalogVariations(id));
                },
            ),
        );
    };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };
    const priceEditor = (options) => {
        return (
            <InputNumber
                value={options.value}
                onValueChange={(e) => options.editorCallback(e.value)}
                mode="currency"
                currency="USD"
                locale="en-US"
                maxFractionDigits={4}
                useGrouping={false}
            />
        );
    };

    const handleChange = (e, options) => {
        options.editorCallback(e.value);
    };

    const numberEditor = (options) => {
        return <InputNumber value={options.value} onValueChange={(e) => handleChange(e, options)} maxFractionDigits={4} useGrouping={false} />;
    };

    const taxableEditor = (options) => {
        return <CustomCheckbox value={options.value} onChange={(e) => options.editorCallback(e.value)} />;
    };
    const taxableTemplate = (rowData) => {
        return <CustomCheckbox value={rowData.taxable} />;
    };
    const deleteTemplate = (col, position) => {
        return (
            <i
                className=" cursor-pointer pi pi-trash"
                onClick={() =>
                    confirmDelete(
                        () => {
                            dispatch(
                                deleteCatalogVariation(col._id, () => {
                                    dispatch(getCatalogVariations(id));
                                }),
                            );
                        },
                        'Do you want to delete this Variation?',
                        position,
                    )
                }
            />
        );
    };

    const markupPriceTemplate = useCallback((r) => {
        // return <>{products[0]?.markupPrice && <>{PercentageDifference(products[0]?.markupPrice, r?.unitPrice)}</>}</>;
        return;
    }, []);

    return (
        <CustomCard col="12" title="All Variations">
            <CustomFilterCard buttonTitle="Add" onClick={() => setOpen(true)} />
            <AddandEditVariatons
                visible={open}
                setOpen={setOpen}
                setVariationId={setVariationId}
                variationId={variationId}
                catalogId={id}
                catelogItem={editItem}
            />
            {products?.length > 0 &&
                products?.map((item, i) => {
                    return (
                        <CustomAccordion key={item._id} isActive={true} extraClassName="employee-accordion w-full" title={customHeader(item)}>
                            <DataTable
                                value={item?.subVariations}
                                editMode="row"
                                dataKey="_id"
                                onRowEditComplete={onRowEditComplete}
                                tableStyle={{ minWidth: '50rem' }}
                            >
                                <Column field="subVariation" header="Sub Variation" editor={(options) => textEditor(options)} />
                                <Column field="sku" header="Sku" editor={(options) => numberEditor(options, 'sku')} />
                                <Column field="upc" header="UPC" editor={(options) => numberEditor(options, 'upc')} />
                                <Column field="netPrice" header="Net Price" editor={(options) => priceEditor(options)} />
                                <Column field="netPrice" header="Markup Price" body={markupPriceTemplate} />
                                <Column field="minimumQuantity" header="Min. Quantity" editor={(options) => numberEditor(options, 'minimumQuantity')} />
                                <Column field="maximumQuantity" header="Max. Quantity" editor={(options) => numberEditor(options, 'maximumQuantity')} />
                                <Column field="defaultQuantity" header="Default Quantity" editor={(options) => numberEditor(options, 'defaultQuantity')} />
                                <Column field="wholesaleCost" header="WholeSale Cost" editor={(options) => priceEditor(options)} />
                                <Column field="reorderQuantity" header="Reorder Quantity" editor={(options) => numberEditor(options, 'reorderQuantity')} />
                                <Column field="taxable" body={taxableTemplate} header="Taxable" editor={(options) => taxableEditor(options)} />

                                <Column header="Actions" rowEditor={true} bodyStyle={{ textAlign: 'center' }} />
                                <Column body={deleteTemplate} />
                            </DataTable>
                        </CustomAccordion>
                    );
                })}
        </CustomCard>
    );
};

export default Variations;
