import React, { useCallback, useEffect, useState } from 'react';
import CustomCard, { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import AddandEditVariatons from './AddandEditVariatons';
import CustomAccordion from '../../../../shared/Accordion/Accordion';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteAllCatalogVariation,
    deleteCatalogVariation,
    editSubVariationCatalog,
    getCatalogVariations,
} from '../../../../redux/actions/InventorySettings/catalogItemsAction';
import { useParams } from 'react-router-dom';
import { PercentageDifference, confirmDelete } from '../../../../utils/commonFunctions';
import { CustomCheckbox } from '../../../../shared/Input/AllInputs';

const Variations = () => {
    const [open, setOpen] = useState(false);
    const [variationId, setVariationId] = useState(null);
    const dispatch = useDispatch();
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
        const updatedProducts = products.map((product) => {
            const updatedSubVariations = product.subVariations.map((subVariation) => {
                if (subVariation._id === newData._id) {
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
                    return { ...subVariation, ...newData };
                }
                return subVariation;
            });

            return { ...product, subVariations: updatedSubVariations };
        });

        setProducts(updatedProducts);
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
                minFractionDigits={4}
                maxFractionDigits={4}
                useGrouping={false}
            />
        );
    };

    const handleChange = (e, options) => {
        options.editorCallback(e.value);
    };

    const numberEditor = (options) => {
        return (
            <InputNumber
                value={options.value}
                onValueChange={(e) => handleChange(e, options)}
                minFractionDigits={4}
                maxFractionDigits={4}
                useGrouping={false}
            />
        );
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

    const unitPriceTemplate = useCallback(
        (r) => {
            return (
                <>
                    {products[0]?.markupPrice && (
                        <div className="text-center">
                            <span className=""> Markup:</span>
                            {PercentageDifference(products[0]?.markupPrice, r?.unitPrice)}
                        </div>
                    )}
                </>
            );
        },
        [products],
    );

    return (
        <>
            <CustomCard col="12" title="General">
                <CustomFilterCard buttonTitle="Add" onClick={() => setOpen(true)} />
                <AddandEditVariatons visible={open} setOpen={setOpen} setVariationId={setVariationId} variationId={variationId} catalogId={id} />
                {products?.length > 0 &&
                    products?.map((item, i) => {
                        return (
                            <>
                                <CustomAccordion isActive={true} extraClassName="employee-accordion w-full" title={customHeader(item)}>
                                    <DataTable
                                        value={item?.subVariations}
                                        editMode="row"
                                        dataKey="id"
                                        onRowEditComplete={onRowEditComplete}
                                        tableStyle={{ minWidth: '50rem' }}
                                    >
                                        <Column
                                            field="subVariation"
                                            header="Sub Variation"
                                            editor={(options) => textEditor(options)}
                                            style={{ width: '20%' }}
                                        ></Column>
                                        <Column field="sku" header="Sku" editor={(options) => numberEditor(options, 'sku')} style={{ width: '20%' }}></Column>
                                        <Column field="upc" header="UPC" editor={(options) => numberEditor(options, 'upc')} style={{ width: '20%' }}></Column>
                                        <Column
                                            field="unitPrice"
                                            header="Unit Price"
                                            editor={(options) => priceEditor(options)}
                                            style={{ width: '20%' }}
                                        ></Column>
                                        <Column field="unitPrice" header="Markup Price" body={unitPriceTemplate} style={{ width: '20%' }}></Column>
                                        <Column
                                            field="variationMinQuantity"
                                            header="Minimum Quantity"
                                            editor={(options) => numberEditor(options, 'variationMinQuantity')}
                                            style={{ width: '20%' }}
                                        ></Column>
                                        <Column
                                            field="variationMaxQuantity"
                                            header="Maximum Quantity"
                                            editor={(options) => numberEditor(options, 'variationMaxQuantity')}
                                            style={{ width: '20%' }}
                                        ></Column>
                                        <Column
                                            field="defaultQuantity"
                                            header="Default Quantity"
                                            editor={(options) => numberEditor(options, 'defaultQuantity')}
                                            style={{ width: '20%' }}
                                        ></Column>
                                        <Column
                                            field="variationWholesaleCost"
                                            header="WholeSale Cost"
                                            editor={(options) => priceEditor(options)}
                                            style={{ width: '20%' }}
                                        ></Column>
                                        <Column
                                            field="reorderQuantity"
                                            header="Reorder Quantity"
                                            editor={(options) => numberEditor(options, 'reorderQuantity')}
                                            style={{ width: '20%' }}
                                        ></Column>
                                        <Column
                                            field="taxable"
                                            body={taxableTemplate}
                                            header="Taxable"
                                            editor={(options) => taxableEditor(options)}
                                            style={{ width: '20%' }}
                                        ></Column>

                                        <Column
                                            header="Actions"
                                            rowEditor={true}
                                            // headerStyle={{ width: '10%', minWidth: '8rem' }}
                                            bodyStyle={{ textAlign: 'center' }}
                                        ></Column>
                                        <Column body={deleteTemplate}></Column>
                                    </DataTable>
                                </CustomAccordion>
                            </>
                        );
                    })}
            </CustomCard>
        </>
    );
};

export default Variations;