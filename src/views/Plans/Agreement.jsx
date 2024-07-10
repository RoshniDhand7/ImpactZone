import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAgreementTemplates } from '../../redux/actions/AgreementSettings/AgreementTemplate';
import PrimaryButton from '../../shared/Button/CustomButton';
import { mergeFields } from '../../utils/constant';
import CustomDialog from '../../shared/Overlays/CustomDialog';
import SignaturePad from 'react-signature-canvas';

const PlanAgreement = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAgreementTemplates());
    }, [dispatch]);
    const [signatures, setSignatures] = useState([]);
    const { agreementId } = useParams();
    let { allAgreementTemplates } = useSelector((state) => state.agreement);

    const agreementTemplate = allAgreementTemplates?.find((item) => item._id === agreementId);

    const [openModal, setOpenModal] = useState(null);

    const actualValues = {
        Membership_Type: 'Premium',
        Services: [
            {
                _id: '65e9b1a55d6fd52ef5afae72',
                name: 'Immaculate Conception School',
                upc: 'tert',
                unitPrice: 10,
            },
            {
                _id: '65e9b9a522c1eb3f3d5e2927',
                name: 'vendow1',
                upc: 'tert',
                unitPrice: 10,
            },
            {
                _id: '65fa76246305c578f316b10d',
                name: 'Immaculate Conception School',
                upc: 'KJU87',
                unitPrice: 10,
            },
            {
                _id: '660692548ce942798dac40a4',
                name: 'Copy1',
                upc: 'KJU87',
                unitPrice: 10,
            },
        ],
        Assessed_Fees: [
            {
                _id: '66166ac910ebbc59947e4057',
                name: 'Assesed Fee1',
            },
            {
                _id: '66878b80bc8461ba33c10e06',
                name: 'Assessed fee 2',
            },
        ],
        Membership_Name: 'John Doe Membership',
        Title: 'Mr.',
        First_Name: 'Roshni',
        Last_Name: 'Dhand',
        Company_Name: 'Doe Inc.',
        Address_Line_1: '123 Main St',
        Address_Line_2: 'Suite 100',
        City: 'Somewhere',
        State: 'CA',
        Zip_Code: '90210',
        Country_or_Region: 'USA',
        Phone: '555-1234',
        Email: 'john.doe@example.com',
        Salesperson: 'Jane Smith',
        Campaign: 'Spring2024',
        'Client’s_Last_Name': 'Doe',
        'Client’s_First_Name': 'Simran',
        Billing_Frequency: '85',
        '⁠Driver’s_License_Number': '78HGFEEJH',
        'Client’s_Zip_Code': 35242,
        'Client’s_Title': 'KJJYU&&%',
    };

    const replacePlaceholders = (htmlContent, mergeFields, actualValues) => {
        mergeFields.forEach((field) => {
            const fieldName = field.name.replace(/ /g, '_');
            let value = actualValues[fieldName] || '';
            if (Array.isArray(value)) {
                if (fieldName === 'Services' || fieldName === 'Assessed_Fees') {
                    value = value.map((item) => item.name).join(', ');
                }
            }
            const regex = new RegExp(field.value, 'g');
            htmlContent = htmlContent.replace(regex, value);
            const memberInitials = `${actualValues['Client’s_First_Name'].charAt(0)}${actualValues['Client’s_Last_Name'].charAt(0)}`;
            htmlContent = htmlContent.replace(/\[Member’s initials\]/g, memberInitials);
            let signatureIndex = 0;
            htmlContent = htmlContent.replace(/\[Member’s signature\]/g, () => {
                const signatureImg = signatures[signatureIndex]
                    ? `<img src="${signatures[signatureIndex]}" alt="Member’s signature" class="h-auto w-2" />`
                    : '[Member’s signature]';
                signatureIndex++;
                return signatureImg;
            });
        });
        return htmlContent;
    };
    const countPlaceholders = (htmlContent, placeholder) => {
        const regex = new RegExp(placeholder, 'g');
        const matches = htmlContent.match(regex);
        return matches ? matches : [];
    };

    const signatureCount = agreementTemplate ? countPlaceholders(agreementTemplate.htmlContent, '\\[Member’s signature\\]') : [];
    const htmlContent = agreementTemplate ? replacePlaceholders(agreementTemplate.htmlContent, mergeFields, actualValues) : '';

    const signRef = useRef();
    const handleClearSign = () => {
        signRef.current.clear();
    };
    const handleSave = () => {
        if (signRef.current) {
            const isEmpty = signRef.current.isEmpty();
            const updatedSignatures = [...signatures];
            if (isEmpty) {
                updatedSignatures[openModal - 1] = '';
            } else {
                const trimmedDataURL = signRef.current.getTrimmedCanvas().toDataURL('image/png');
                updatedSignatures[openModal - 1] = trimmedDataURL;
            }
            setSignatures(updatedSignatures);
            setOpenModal(null);
        }
    };
    const handleOpenModal = (index) => {
        setOpenModal(index + 1);
        setTimeout(() => {
            if (signRef.current) {
                if (signatures[index]) {
                    signRef.current.fromDataURL(signatures[index]);
                }
            }
        }, 100);
    };

    return (
        <div className="grid p-4">
            <div className="md:col-8 ">
                <div className="shadow-2 border-round-lg p-5">
                    <h1 className="text-center mb-3 font-bold">Agreement</h1>
                    <div className="" dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
                </div>
            </div>
            <div className="md:col-4 ">
                {signatureCount?.map((_, i) => (
                    <div className="bg-lightest-blue border-round-lg p-4 h-12rem mt-2">
                        <div className=" text-right">
                            <PrimaryButton label={`Sign ${i + 1}`} onClick={() => handleOpenModal(i)} />
                        </div>

                        {signatures?.length > 0 && signatures[i] ? (
                            <img src={signatures[i]} alt={`signature-${i}`} className="w-5 h-5rem m-auto block " />
                        ) : (
                            <p className="text-center">Your signature</p>
                        )}
                    </div>
                ))}
            </div>

            <CustomDialog
                visible={openModal}
                onCancel={() => {
                    setOpenModal(null);
                }}
                width="80vh"
                height="60vh"
                contentClassName="pb-2"
                showHeader={false}
                onClear={handleClearSign}
                onSave={handleSave}
            >
                <SignaturePad canvasProps={{ className: 'sigPad' }} ref={signRef} />
            </CustomDialog>
        </div>
    );
};

export default PlanAgreement;
