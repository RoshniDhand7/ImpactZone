import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import SignaturePad from 'react-signature-canvas';
import { useReactToPrint } from 'react-to-print';
import domToPdf from 'dom-to-pdf';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import dummy from '../../../../assets/images/signature.png';

import CustomCard, { CustomColLayout, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup } from '../../../../shared/Button/CustomButton';
import { getSubscriptionAgreementDetails } from '../../../../redux/actions/Plans/plansActions';
import { base64ToFile } from '../../../../utils/fileHelper';
import { getImageURL } from '../../../../utils/imageUrl';
import { CustomCheckbox } from '../../../../shared/Input/AllInputs';

export default function SubscriptionPlanAgreement() {
    const templateRef = useRef();
    const signRef = useRef();
    const dispatch = useDispatch();
    const { subscriptionPlanId } = useParams();
    const [loading, setLoading] = useState(false);
    const [copyToAll, setCopyToAll] = useState(false);
    const [openSignatureModal, setOpenSignatureModal] = useState(null);
    const [signatures, setSignatures] = useState([]);
    const [data, setData] = useState({});

    useEffect(() => {
        dispatch(
            getSubscriptionAgreementDetails(subscriptionPlanId, setLoading, (e) => {
                setData({ ...e, htmlContent: replaceWithImage(e?.htmlContent, '{{MEMBER_SIGNATURE}}') });
                let _signatures = getPlaceholderUrls(e?.htmlContent, '{{MEMBER_SIGNATURE}}');
                setSignatures(_signatures);
            }),
        );
    }, [dispatch]);

    function getPlaceholderUrls(template, placeholder) {
        const regex = new RegExp(placeholder, 'g');
        const matches = [...template.matchAll(regex)];
        return matches.map(() => ({
            url: '',
        }));
    }

    function replaceWithImage(template, placeholder) {
        let occurrence = 0;
        return template.replace(new RegExp(placeholder, 'g'), () => {
            occurrence += 1;
            return `<img id="signature-${occurrence}" alt="signature-${occurrence}" style="max-height: 100px; max-width: 300px" />`;
        });
    }

    const onOpenSignatureModel = (i) => {
        setOpenSignatureModal(i + 1);
    };
    const onCloseSignatureModel = () => {
        setOpenSignatureModal(null);
    };

    const handleSave = () => {
        if (signRef.current) {
            let isEmpty = signRef.current.isEmpty();
            let file = '';

            if (!isEmpty) {
                let dataURL = signRef.current.getTrimmedCanvas().toDataURL('image/png');
                dataURL = dataURL.split(',')[1];
                const mimeType = 'image/png';
                const fileName = `signature_${openSignatureModal}.png`;
                file = base64ToFile(dataURL, mimeType, fileName);
            }
            let _signatures = [...signatures];
            if (copyToAll) {
                _signatures = _signatures.map(() => ({ url: file }));
            } else {
                _signatures[openSignatureModal - 1].url = file;
            }
            setSignatures(_signatures);
            onCloseSignatureModel();
        }
    };

    useEffect(() => {
        signatures.forEach((item, i) => {
            let imgElement = document.getElementById(`signature-${i + 1}`);
            imgElement.src = getImageURL(item?.url);
        });
    }, [signatures]);

    const handleClearSign = () => {
        signRef.current.clear();
    };

    const handlePrint = useReactToPrint({
        content: () => templateRef.current,
        documentTitle: 'Visitor Pass',
        onAfterPrint: () => console.log('Printed PDF successfully!'),
    });
    const handleDownloadPdf = async () => {
        setLoading(true);
        const elementToPrint = document.getElementById('agreement-template');
        const options = {
            filename: 'agreement.pdf',
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
            html2canvas: {
                scale: 2,
            },
        };
        const wrapper = document.createElement('div');
        wrapper.appendChild(elementToPrint.cloneNode(true));
        document.body.appendChild(wrapper);
        await new Promise((resolve) => {
            domToPdf(wrapper, options, () => {
                document.body.removeChild(wrapper);
                setLoading(false);
                resolve();
            });
        });
    };

    return (
        <>
            <CustomCard col="12" title="Subscription Agreement">
                <CustomGridLayout>
                    <CustomColLayout size={9}>
                        <div className="overflow-x-auto bg-white border-round-sm p-2">
                            <div ref={templateRef} id="agreement-template" className="p-2">
                                <div dangerouslySetInnerHTML={{ __html: data?.htmlContent }}></div>
                                <style dangerouslySetInnerHTML={{ __html: data?.cssContent }}></style>
                            </div>
                        </div>
                    </CustomColLayout>
                    <CustomColLayout size={3}>
                        <CustomButtonGroup position="center">
                            <PrimaryButton label="Confirm" />
                            <PrimaryButton label="Download" className="mx-2" icon="pi pi-download" loading={loading} onClick={handleDownloadPdf} />
                            <PrimaryButton label="Print" className="bg-yellow-300" onClick={handlePrint} icon="pi pi-print" />
                        </CustomButtonGroup>
                        <div>
                            {signatures?.map((item, i) => (
                                <div key={i} className="signature-box border-round-lg p-2 my-1">
                                    <button className="cursor-pointer" onClick={() => onOpenSignatureModel(i)}>
                                        Sign {i + 1}
                                    </button>

                                    {item?.url ? (
                                        <img style={{ height: '100px' }} src={getImageURL(item?.url)} alt={`signature-${i + 1}`} />
                                    ) : (
                                        <p className="" style={{ height: '100px' }}>
                                            Your Signature Here...
                                            <img className="border-round-lg" style={{ maxHeight: '80px' }} src={dummy} alt={`signature-${i + 1}`} />
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CustomColLayout>
                </CustomGridLayout>
            </CustomCard>
            <CustomDialog
                title={`Signature ${openSignatureModal ? openSignatureModal : ''}`}
                visible={openSignatureModal}
                onCancel={onCloseSignatureModel}
                width="80vh"
                onClear={handleClearSign}
                onSave={handleSave}
            >
                <div className="border-round-sm border-1 surface-border ">
                    <SignaturePad canvasProps={{ className: 'sigPad' }} ref={signRef} />
                </div>
                <CustomCheckbox label="Copy To All" value={copyToAll} onChange={(e) => setCopyToAll(e.value)} />
            </CustomDialog>
        </>
    );
}
