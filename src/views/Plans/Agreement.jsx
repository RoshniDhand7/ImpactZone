import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import PrimaryButton, { CustomButtonGroup } from '../../shared/Button/CustomButton';
import { mergeFields } from '../../utils/constant';
import CustomDialog from '../../shared/Overlays/CustomDialog';
import SignaturePad from 'react-signature-canvas';
import { uploadSignImage } from '../../utils/commonFunctions';
import { getImageURL } from '../../utils/imageUrl';
import { useReactToPrint } from 'react-to-print';
import { editSellPlan, getSellPlanAgreement } from '../../redux/actions/Plans/SellPlan';
import moment from 'moment';
import { getAgreementTemplates } from '../../redux/actions/Settings/AgreementSetup/AgreementTemplateAction';
var domToPdf = require('dom-to-pdf');

const PlanAgreement = React.forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(getAgreementTemplates(setLoading));
    }, [dispatch]);
    const componentRef = useRef();
    const [signatures, setSignatures] = useState([]);
    const { newPlanId, agreementId } = useParams();
    let agreementTemplates = useSelector((state) => state.settings.agreement.agreementTemplates);
    const agreementTemplate = agreementTemplates?.find((item) => item._id === agreementId);

    useEffect(() => {
        setLoading(true);
        if (agreementTemplate) {
            setLoading(false);
        }
    }, [agreementTemplate]);

    const [signaturePath, setSignaturePath] = useState([]);
    const [openModal, setOpenModal] = useState(null);
    const [actualValues, setActualValues] = useState({});

    useEffect(() => {
        dispatch(
            getSellPlanAgreement(newPlanId, (data) => {
                const formattedData = {
                    Membership_Type: data.membershipType,
                    Services: data.services,
                    Assessed_Fees: data.assessedFee,
                    Membership_Name: data.member.memberShipPlan.name,
                    'Client’s_Title': '',
                    'Client’s_First_Name': data.member.firstName,
                    'Client’s_Last_Name': data.member.lastName,
                    Company_Name: data.member.companyData.companyName,
                    'Client’s_Address': data.member.address,
                    Company_Address: data.member.companyData.address1,
                    'Client’s_City': data.member.city,
                    Company_City: data.member.companyData.city,
                    'Client’s_State': data.member.state,
                    Company_State: data.member.companyData.state,
                    'Client’s_Zip_Code': data.member.zipCode,
                    Company_Zip_Code: data.member.companyData.zipCode,
                    'Client’s_Country_or_Region': data.member.address,
                    Company_Country_or_Region: data.member.companyData.country,
                    'Client’s_Phone': data.member.primaryPhone,
                    Company_Phone: data.member.companyData.phone,
                    'Client’s_Email': data.member.email,
                    Company_Email: data.member.companyData.email,
                    Salesperson: data.member.salesPerson,
                    Campaign: data.member.campaign,
                    'Agreement_#': data.agreementNo,
                    Barcode: data.member.barCode,
                    Date: moment(data.date).format('MM-DD-YYYY'),
                    Time: moment(data.member.createdAt).format('HH:mm'),
                    'Client’s_Cell_Phone': '',
                    '⁠Driver’s_License_Number': data.member.driverLicense,
                    Employer: '',
                    Work_Phone: data.member.workNumber,
                    Emergency_Contact_Name: data.member.emergencyFirstName + data.member.emergencyLastName,
                    Emergency_Contact_Number: data.member.emergencyContact,
                    '⁠Membership_Begin_Date': moment(data.begin).format('MM-DD-YYYY'),
                    First_Month_Dues: '',
                    Billing_Date: '',
                    Billing_Frequency: '',
                    Renewal_Type: '',
                    Renewal_Date: '',
                    '⁠Payment_Method': '',
                    Past_Due_Balance: '',
                    '⁠Total_Amount_Due': '',
                };

                const mappedValues = mergeFields.reduce((acc, field) => {
                    const key = field.value.slice(2, -2); // Extract key from {{key}}
                    if (formattedData.hasOwnProperty(key)) {
                        acc[key] = formattedData[key];
                    }
                    return acc;
                }, {});

                setActualValues(mappedValues);
            }),
        );
    }, [dispatch, newPlanId]);

    const replacePlaceholders = (htmlContent, mergeFields, actualValues) => {
        let signatureIndex = 0;

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
        });

        const memberInitials = `${actualValues['Client’s_First_Name']?.charAt(0)}${actualValues['Client’s_Last_Name']?.charAt(0)}`;
        htmlContent = htmlContent.replace(/\[Member’s initials\]/g, memberInitials);

        htmlContent = htmlContent.replace(/\[Member’s signature\]/g, () => {
            const signatureImg = signaturePath[signatureIndex]
                ? `<img src="${getImageURL(signaturePath[signatureIndex])}" alt="Member’s signature" class="h-auto w-2" />`
                : '[Member’s signature]';
            signatureIndex++;
            return signatureImg;
        });
        // htmlContent = `<div id="element-to-print">${htmlContent}</div>`;
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

    const base64ToBlob = (base64, mime) => {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mime });
    };
    const blobToFile = (blob, fileName) => {
        return new File([blob], fileName, { type: blob.type, lastModified: Date.now() });
    };
    const base64ToFile = (base64, mime, fileName) => {
        const blob = base64ToBlob(base64, mime);
        return blobToFile(blob, fileName);
    };

    const handleSave = async () => {
        if (signRef.current) {
            const isEmpty = signRef.current.isEmpty();
            const updatedSignatures = [...signatures];
            const updatedSignaturePath = [...signaturePath];

            if (isEmpty) {
                updatedSignatures[openModal - 1] = '';
            } else {
                const trimmedDataURL = signRef.current.getTrimmedCanvas().toDataURL('image/png');
                const base64ContentArray = trimmedDataURL.split(',');
                const base64Data = base64ContentArray[1]; // remove the data:URL scheme prefix
                const mimeType = 'image/png';
                const fileName = `signature_${openModal}.png`;
                const file = base64ToFile(base64Data, mimeType, fileName);
                let urls = await uploadSignImage(file);
                const uploadedURL = urls;
                updatedSignatures[openModal - 1] = trimmedDataURL;
                updatedSignaturePath[openModal - 1] = uploadedURL;
            }
            setSignatures(updatedSignatures);
            setSignaturePath(updatedSignaturePath);
            setOpenModal(null);
        }
    };
    const handleOpenModal = (index) => {
        setOpenModal(signatures[index] ? false : index + 1);
        // setTimeout(() => {
        //     if (signRef.current) {
        //         if (signatures[index]) {
        //             signRef.current.fromDataURL(signatures[index]);
        //         }
        //     }
        // }, 100);
    };

    const history = useHistory();

    const handleConfirm = () => {
        dispatch(
            editSellPlan(newPlanId, { htmlContent, finalStep: true }, () => {
                history.push('/plans');
            }),
        );
    };

    const handleDownloadPdf = async () => {
        setLoading(true); // Start loading
        const elementToPrint = document.getElementById('element-to-print');

        // Define the options for dom-to-pdf
        const options = {
            filename: 'agreement.pdf',
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
            html2canvas: {
                scale: 2, // Increase the scale to enhance the quality
            },
        };
        // Create a wrapper with specific margins
        const wrapper = document.createElement('div');
        wrapper.style.paddingTop = '1in'; // Top margin
        wrapper.style.paddingRight = '1in'; // Right margin
        wrapper.style.paddingBottom = '1in'; // Bottom margin
        wrapper.style.paddingLeft = '1in'; // Left margin
        wrapper.appendChild(elementToPrint.cloneNode(true));
        const content = wrapper.querySelector('#element-to-print');
        if (content) {
            content.style.fontSize = '18px'; // Increase font size
            content.style.lineHeight = '1.8'; // Increase line height for spacing between lines
            content.style.letterSpacing = '0.5px'; // Increase letter spacing
        }

        // Append the wrapper to the document body
        document.body.appendChild(wrapper);
        // Generate the PDF
        await new Promise((resolve) => {
            domToPdf(wrapper, options, () => {
                document.body.removeChild(wrapper); // Clean up the wrapper after generating the PDF
                setLoading(false); // End loading
                resolve();
            });
        });
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Visitor Pass',
        onAfterPrint: () => console.log('Printed PDF successfully!'),
    });

    return (
        <div className="grid p-4">
            <div className="md:col-8  ">
                <div className="shadow-2 border-round-lg p-5">
                    <h1 className="text-center mb-3 font-bold">Agreement</h1>
                    <div className="agreementclassName">
                        <div
                            id="element-to-print"
                            className="print-content"
                            ref={componentRef}
                            style={{ margin: '20px', padding: '10px', lineHeight: '1.8', fontSize: '18px' }}
                            dangerouslySetInnerHTML={{ __html: htmlContent }}
                        ></div>
                    </div>
                </div>
            </div>
            <div className="md:col-4 agreementclassName">
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
                {/* <ComponentToPrint ref={componentRef} /> */}
                <CustomButtonGroup>
                    <PrimaryButton name="" label="Confirm" className="mx-2" onClick={handleConfirm} />
                    <PrimaryButton name="" label="Download" className="mx-2" icon="pi pi-download" loading={loading} onClick={handleDownloadPdf} />

                    <PrimaryButton name="" label="Print" className="bg-yellow-300 mx-2" icon="pi pi-print" onClick={() => handlePrint()} />
                </CustomButtonGroup>
            </div>

            <CustomDialog
                visible={openModal}
                onCancel={() => {
                    setOpenModal(null);
                }}
                width="80vh"
                height="60vh"
                contentclassname="pb-2"
                showHeader={false}
                onClear={handleClearSign}
                onSave={handleSave}
            >
                <SignaturePad canvasProps={{ className: 'sigPad' }} ref={signRef} />
            </CustomDialog>
        </div>
    );
});

export default PlanAgreement;
