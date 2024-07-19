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
import { checkbaCodeAction } from '../../redux/actions/Dashboard/Members';
import debounce from 'lodash.debounce';
import { hideLoaderAction, showLoaderAction } from '../../redux/actions/loaderAction';

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
    }, [dispatch, memberId]);

    useEffect(() => {
        const formErrors = formValidation('barCode', data.barCode, data);

        if (data.uniqueBarCode) {
            setData((prev) => ({ ...prev, uniqueBarCode: true, formErrors }));
        } else {
            setData((prev) => ({ ...prev, uniqueBarCode: false, formErrors }));
        }
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
    const changeHandler = (val) => {
        dispatch(checkbaCodeAction(val, setData));
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

    const handleNext = async () => {
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
                    type: 'next',
                    accessCode: data.accessCode,
                };

                dispatch(
                    editSellPlan(memberId, payload, () => {
                        onTabEnable(0, 1, 2, 3);
                        history.replace(`/plans/sell-plan/${id}/${newPlanId}/${memberId}${'?tab=agreement'}`);
                    }),
                );
            } catch (error) {
                console.error('Error during upload:', error);
            } finally {
                dispatch(hideLoaderAction());
            }
        }
    };
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
                <PrimaryButton label="Next" className="mx-2" onClick={handleNext} />
                <PrimaryButton label="Save & Hold" className="mx-2" />
                <PrimaryButton label="Sign Agreement" className="mx-2" />
                <LightButton label="Cancel" />
            </CustomButtonGroup>
        </>
    );
};
export default IdentificationTab;
