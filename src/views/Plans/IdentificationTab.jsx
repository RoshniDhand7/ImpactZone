import { useHistory, useParams } from 'react-router-dom';
import CustomCard, { CustomGridLayout } from '../../shared/Cards/CustomCard';
import { useEffect, useMemo, useState } from 'react';
import { editSellPlan, getSellPlanMember } from '../../redux/actions/Plans/SellPlan';
import { useDispatch } from 'react-redux';
import formValidation from '../../utils/validations';
import CustomImageInput from '../../shared/Input/CustomImageInput';
import { CustomInput, CustomInputNumber } from '../../shared/Input/AllInputs';
import CustomFilesInput from '../../shared/Input/CustomFilesInput';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../shared/Button/CustomButton';
import { showFormErrors, uploadFiles, uploadImages } from '../../utils/commonFunctions';
import debounce from 'lodash.debounce';
import { hideLoaderAction, showLoaderAction } from '../../redux/actions/loaderAction';
import useCancelSellPlans from '../../hooks/useCancelSellPlans';
import api from '../../services/api';
import endPoints from '../../services/endPoints';

const IdentificationTab = ({ onTabEnable }) => {
    const { id, newPlanId, memberId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [data, setData] = useState({
        driverLicensePdf: [],
        govtIdPdf: [],
        accessCode: '',
        barCode: 0,
        image: [],
        uniqueBarCode: false,
    });

    useEffect(() => {
        if (memberId) {
            getMemberIdentificationFn();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, memberId]);

    useEffect(() => {
        const formErrors = formValidation('barCode', data.uniqueBarCode, data);
        if (data?.uniqueBarCode) {
            formErrors['barCode'] = 'BarCode should be unique!';
        } else {
            formErrors['barCode'] = '';
        }
        setData((prev) => ({ ...prev, formErrors }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.uniqueBarCode]);

    const getMemberIdentificationFn = () => {
        if (memberId) {
            dispatch(
                getSellPlanMember(memberId, (data) => {
                    setData({
                        driverLicensePdf: data.driverLicensePdf ? [data.driverLicensePdf] : [],
                        driverLicensePdfOriginalName: data.driverLicensePdfOriginalName ? data.driverLicensePdfOriginalName : '',
                        govtIdPdf: data.govtIdPdf ? [data.govtIdPdf] : [],
                        govtIdPdfOriginalName: data.govtIdPdfOriginalName ? data.govtIdPdfOriginalName : '',
                        govtIdSize: data.govtIdSize ? data.govtIdSize : '',
                        driverLicenseSize: data.driverLicenseSize ? data.driverLicenseSize : '',
                        accessCode: data.accessCode,
                        barCode: Number(data.barCode),
                        image: data.image ? [data.image] : [],
                    });
                }),
            );
        }
    };
    const changeHandler = async (val) => {
        const res = await api('post', endPoints.MEMBER_BARCODE, { barCode: val });
        if (res.success) {
            setData((prev) => ({ ...prev, uniqueBarCode: false }));
        } else {
            setData((prev) => ({ ...prev, uniqueBarCode: true }));
        }
    };

    const debouncedChangeHandler = useMemo(
        () =>
            debounce((val) => {
                changeHandler(val);
            }, 1000),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
        if (name === 'barCode') {
            setData((prev) => ({ ...prev, [name]: value, formErrors }));
            if (value) {
                debouncedChangeHandler(value);
            }
        }
    };

    const handleNext = async (tab) => {
        if (showFormErrors(data, setData)) {
            try {
                dispatch(showLoaderAction());

                if (data?.image?.length) {
                    let urls = await uploadImages(data.image);
                    data.image = urls[0];
                } else {
                    data.image = '';
                }

                if (data.driverLicensePdf?.length) {
                    let durls = await uploadFiles(data.driverLicensePdf);
                    data.driverLicensePdf = durls[0].path;
                    data.driverLicensePdfOriginalName = durls[0].originalname;
                    data.driverLicenseSize = durls[0].size;
                } else {
                    data.driverLicensePdf = '';
                }

                if (data.govtIdPdf?.length) {
                    let gurls = await uploadFiles(data.govtIdPdf);
                    data.govtIdPdf = gurls[0].path;
                    data.govtIdPdfOriginalName = gurls[0].originalname;
                    data.govtIdSize = gurls[0].size;
                } else {
                    data.govtIdPdf = '';
                }
                const payload = {
                    ...data,
                    ...(tab && { type: 'hold', tabName: 'identification', planId: newPlanId }),
                    accessCode: data.accessCode,
                };

                dispatch(
                    editSellPlan(memberId, payload, () => {
                        if (tab) {
                            history.replace('/plans/drafts');
                        } else {
                            onTabEnable(0, 1, 2, 3);
                            history.replace(`/plans/sell-plan/${id}/${newPlanId}/${memberId}${'?tab=agreement'}`);
                        }
                    }),
                );
            } catch (error) {
                console.error('Error during upload:', error);
            } finally {
                dispatch(hideLoaderAction());
            }
        }
    };
    const { confirm } = useCancelSellPlans(newPlanId);

    return (
        <>
            <CustomCard col="12" title="Identification">
                <CustomGridLayout>
                    <div className="avatar-img">
                        <CustomImageInput name="image" data={data} onFilesChange={handleChange} required editable={true} />
                    </div>
                    <div className="col grid">
                        <CustomInput name="accessCode" col={6} required data={data} onChange={handleChange} />
                        <CustomInputNumber name="barCode" col={6} required data={data} onChange={handleChange} />
                        <CustomFilesInput
                            data={data}
                            onFilesChange={handleChange}
                            name="driverLicensePdf"
                            label="Upload Driver Licence"
                            accept="image/*,.pdf"
                            disabled={false}
                            col="6"
                            uploadType="Image/Pdf"
                            originalName={data?.driverLicensePdfOriginalName}
                            fileSize={data.driverLicenseSize}
                        />
                        <CustomFilesInput
                            data={data}
                            onFilesChange={handleChange}
                            name="govtIdPdf"
                            label="Upload Government/School IDs"
                            accept="image/*,.pdf"
                            disabled={false}
                            col="6"
                            uploadType="Image/Pdf"
                            originalName={data.govtIdPdfOriginalName}
                            fileSize={data.govtIdSize}
                        />
                    </div>
                </CustomGridLayout>
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Next" className="mx-2" onClick={() => handleNext('')} />
                <PrimaryButton label="Save & Hold" className="mx-2" onClick={() => handleNext('?tab=identification')} />
                <LightButton label="Cancel" onClick={confirm} />
            </CustomButtonGroup>
        </>
    );
};
export default IdentificationTab;
