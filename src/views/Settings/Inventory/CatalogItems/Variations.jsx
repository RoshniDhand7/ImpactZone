import React, { useState } from 'react';
import CustomCard, { CustomFilterCard, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import AddandEditVariatons from './AddandEditVariatons';
import CustomAccordion from '../../../../shared/Accordion/Accordion';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

const Variations = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [variationId, setVariationId] = useState(null);

    const handleData = (data) => {
        setData([data]);
    };

    const data1 = [{ name: 'A1' }, { name: 'A2' }];

    const customHeader = (item) => {
        return (
            <div className="flex align-items-center justify-content-between gap-2 w-full ml-auto">
                <div>{item.name}</div>
                <div className="flex gap-3 mr-3">
                    <i
                        className="pi pi-pencil"
                        onClick={() => {
                            setOpen(true);
                            setVariationId(item._id);
                        }}
                    ></i>
                    <i className="pi pi-trash"></i>
                </div>
            </div>
        );
    };

    const subCateid = [
        {
            company: 'JHYY',
            variationName: 'TYTYU&*',
            subVariation: 'SDJG',
            sku: 'KK',
            unitPrice: '7',
            variationMinQuantity: '23',
            variationMaxQuantity: '344',
            variationWholesaleCost: '33',
            reorderQuantity: '23',
        },
    ];

    const [products, setProducts] = useState(subCateid);
    const onRowEditComplete = (e) => {
        let _products = [...products];
        let { newData, index } = e;

        console.log(newData, index);

        _products[index] = newData;

        setProducts(_products);
    };
    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };
    const priceEditor = (options) => {
        return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} mode="currency" currency="USD" locale="en-US" />;
    };
    return (
        <>
            <CustomCard col="12" title="General">
                <CustomFilterCard buttonTitle="Add" onClick={() => setOpen(true)} />
                <AddandEditVariatons visible={open} setVisible={setOpen} onData={handleData} />
                {data1?.map((item, i) => {
                    return (
                        <>
                            <CustomAccordion isActive={true} extraClassName="employee-accordion w-full" title={customHeader(item)}>
                                <DataTable
                                    value={products}
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
                                    <Column field="sku" header="Sku" editor={(options) => priceEditor(options)} style={{ width: '20%' }}></Column>
                                    <Column field="unitPrice" header="Unit Price" editor={(options) => priceEditor(options)} style={{ width: '20%' }}></Column>
                                    <Column
                                        field="variationMinQuantity"
                                        header="Minimum Quantity"
                                        editor={(options) => priceEditor(options)}
                                        style={{ width: '20%' }}
                                    ></Column>
                                    <Column
                                        field="variationMaxQuantity"
                                        header="Maximum Quantity"
                                        editor={(options) => priceEditor(options)}
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
                                        editor={(options) => priceEditor(options)}
                                        style={{ width: '20%' }}
                                    ></Column>

                                    <Column rowEditor={true} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
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
