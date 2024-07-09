import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAgreementTemplates } from '../../redux/actions/AgreementSettings/AgreementTemplate';
import PrimaryButton from '../../shared/Button/CustomButton';

const PlanAgreement = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAgreementTemplates());
    }, [dispatch]);

    const { agreementId } = useParams();
    let { allAgreementTemplates } = useSelector((state) => state.agreement);

    const agreementTemplate = allAgreementTemplates?.find((item) => item._id === agreementId);

    const mergeFields = [
        { name: 'Membership Type', value: '{{Membership_Type}}' },
        { name: 'Services', value: '{{Services}}' },
        { name: 'Assessed Fees', value: '{{Assessed_Fees}}' },
        { name: 'Membership Name', value: '{{Membership_Name}}' },
        { name: 'Title', value: '{{Title}}' },
        { name: 'First Name', value: '{{First_Name}}' },
        { name: 'Last Name', value: '{{Last_Name}}' },
        { name: 'Company Name', value: '{{Company_Name}}' },
        { name: 'Address Line 1', value: '{{Address_Line_1}}' },
        { name: 'Address Line 2', value: '{{Address_Line_2}}' },
        { name: 'City', value: '{{City}}' },
        { name: 'State', value: '{{State}}' },
        { name: 'Zip Code', value: '{{Zip_Code}}' },
        { name: 'Country or Region', value: '{{Country_or_Region}}' },
        { name: 'Phone', value: '{{Phone}}' },
        { name: 'Email', value: '{{Email}}' },
        { name: 'Salesperson', value: '{{Salesperson}}' },
        { name: 'Campaign', value: '{{Campaign}}' },
    ];

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
            const memberInitials = `${actualValues.First_Name.charAt(0)}${actualValues.Last_Name.charAt(0)}`;
            htmlContent = htmlContent.replace(/\[Member’s initials\]/g, memberInitials);
        });
        return htmlContent;
    };
    const countPlaceholders = (htmlContent, placeholder) => {
        const regex = new RegExp(placeholder, 'g');
        const matches = htmlContent.match(regex);
        console.log('matches>>', matches);
        return matches ? matches : [];
    };

    const signatureCount = agreementTemplate ? countPlaceholders(agreementTemplate.htmlContent, '\\[Member’s signature\\]') : [];

    console.log(signatureCount, 'signatureCount');

    const htmlContent = agreementTemplate ? replacePlaceholders(agreementTemplate.htmlContent, mergeFields, actualValues) : '';

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
                            <PrimaryButton label={`Sign ${i + 1}`} />
                        </div>
                        <p className="text-center">Your signature</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlanAgreement;
