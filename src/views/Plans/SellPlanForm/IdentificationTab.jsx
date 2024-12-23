import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import CustomCard, { CustomGridLayout } from '../../../shared/Cards/CustomCard';
import formValidation from '../../../utils/validations';
import CustomImageInput from '../../../shared/Input/CustomImageInput';
import { CustomInput, CustomInputNumber } from '../../../shared/Input/AllInputs';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../shared/Button/CustomButton';
import { showFormErrors } from '../../../utils/commonFunctions';
import debounce from 'lodash.debounce';
import api from '../../../services/api';
import endPoints from '../../../services/endPoints';

const IdentificationTab = ({ onTabEnable, onCancel, memberInfo, setMemberInfo }) => {
    const history = useHistory();

    const changeHandler = async (val) => {
        const res = await api('post', endPoints.MEMBER_BARCODE, { barCode: val });
        if (res.success) {
            setMemberInfo((prev) => ({ ...prev, uniqueBarCode: false }));
        } else {
            setMemberInfo((prev) => ({ ...prev, uniqueBarCode: true }));
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
        const formErrors = formValidation(name, value, memberInfo);
        setMemberInfo((prev) => ({ ...prev, [name]: value, formErrors }));
        if (name === 'barCode') {
            setMemberInfo((prev) => ({ ...prev, [name]: value, formErrors }));
            if (value) {
                debouncedChangeHandler(value);
            }
        }
    };

    // const handleNext = async (tab) => {
    //     if (showFormErrors(data, setMemberInfo)) {
    //         try {
    //             dispatch(showLoaderAction());

    //             if (data?.image?.length) {
    //                 let urls = await uploadImages(data.image);
    //                 data.image = urls[0];
    //             } else {
    //                 data.image = '';
    //             }

    //             if (data.driverLicensePdf?.length) {
    //                 let durls = await uploadFiles(data.driverLicensePdf);
    //                 data.driverLicensePdf = durls[0].path;
    //                 data.driverLicensePdfOriginalName = durls[0].originalname;
    //                 data.driverLicenseSize = durls[0].size;
    //             } else {
    //                 data.driverLicensePdf = '';
    //             }

    //             if (data.govtIdPdf?.length) {
    //                 let gurls = await uploadFiles(data.govtIdPdf);
    //                 data.govtIdPdf = gurls[0].path;
    //                 data.govtIdPdfOriginalName = gurls[0].originalname;
    //                 data.govtIdSize = gurls[0].size;
    //             } else {
    //                 data.govtIdPdf = '';
    //             }
    //             const payload = {
    //                 ...data,
    //                 ...(tab && { type: 'hold', tabName: 'identification', planId: newPlanId }),
    //                 accessCode: data.accessCode,
    //             };

    //             dispatch(
    //                 editSellPlan(memberId, payload, () => {
    //                     if (tab) {
    //                         history.replace('/plans/drafts');
    //                     } else {
    //                         onTabEnable(0, 1, 2, 3);
    //                         history.replace(`/plans/sell-plan/${id}/${newPlanId}/${memberId}${'?tab=agreement'}`);
    //                     }
    //                 }),
    //             );
    //         } catch (error) {
    //             console.error('Error during upload:', error);
    //         } finally {
    //             dispatch(hideLoaderAction());
    //         }
    //     }
    // };

    const handleNext = async (tab) => {
        if (showFormErrors(memberInfo, setMemberInfo)) {
            onTabEnable(3);
            history.replace({
                search: `?tab=agreement&member=${memberInfo._id}`,
            });
        }
    };

    return (
        <>
            <CustomCard col="12" title="Identification">
                <CustomGridLayout>
                    <div className="avatar-img">
                        <CustomImageInput name="image" data={memberInfo} onFilesChange={handleChange} required editable={true} />
                    </div>
                    <div className="col grid">
                        <CustomInput name="accessCode" col={6} required data={memberInfo} onChange={handleChange} />
                        <CustomInputNumber name="barCode" col={6} required data={memberInfo} onChange={handleChange} />
                        {/* <CustomFilesInput
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
                        /> */}
                        {/* <CustomFilesInput
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
                        /> */}
                    </div>
                </CustomGridLayout>
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Next" className="mx-2" onClick={() => handleNext('')} />
                <PrimaryButton label="Save & Hold" className="mx-2" onClick={() => handleNext('?tab=identification')} />
                <LightButton label="Cancel" onClick={onCancel} />
            </CustomButtonGroup>
        </>
    );
};
export default IdentificationTab;
