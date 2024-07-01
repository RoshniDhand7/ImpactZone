import { useHistory, useParams } from 'react-router-dom';
import CustomCard, { CustomGridLayout } from '../../shared/Cards/CustomCard';
import { useEffect, useMemo, useState } from 'react';
import { editSellPlan, getSellPlanMember } from '../../redux/actions/Plans/SellPlan';
import { useDispatch, useSelector } from 'react-redux';
import formValidation from '../../utils/validations';
import CustomImageInput from '../../shared/Input/CustomImageInput';
import { CustomInput } from '../../shared/Input/AllInputs';
import CustomFilesInput from '../../shared/Input/CustomFilesInput';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../shared/Button/CustomButton';
import { uploadFiles, uploadImages } from '../../utils/commonFunctions';
import { checkbaCodeAction } from '../../redux/actions/Dashboard/Members';
import debounce from 'lodash.debounce';

const IdentificationTab = ({ onTabEnable }) => {
    const { id, newPlanId, memberId } = useParams();
    console.log(memberId);
    const dispatch = useDispatch();
    const history = useHistory();
    const [data, setData] = useState({
        driverLicensePdf: [],
        govtIdPdf: [],
        accessCode: '',
        barCode: '',
        image: [],
    });

    useEffect(() => {
        if (memberId) {
            getMemberIdentificationFn();
        }
    }, [dispatch, memberId]);

    useEffect(() => {
        if (newPlanId) {
            onTabEnable([0, 1, 2, 3]);
        }
    }, [newPlanId]);

    useEffect(() => {
        if (data.uniqueBarCode) {
            const formErrors = formValidation('barCode', true, data);
            setData((prev) => ({ ...prev, uniqueBarCode: true, formErrors }));
        }
    }, [data.uniqueBarCode]);

    const getMemberIdentificationFn = () => {
        if (memberId) {
            dispatch(
                getSellPlanMember(memberId, (data) => {
                    console.log(data);
                    setData({
                        driverLicensePdf: data.driverLicensePdf ? [data.driverLicensePdf] : [],
                        govtIdPdf: data.govtIdPdf ? [data.govtIdPdf] : [],
                        accessCode: data.accessCode,
                        barCode: data.barCode,
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

    console.log(data, 'data>>');
    const handleChange = ({ name, value }) => {
        console.log(name, value, 'bane');
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
        if (name === 'barCode') {
            setData((prev) => ({ ...prev, [name]: value, formErrors }));
            if (value) {
                debouncedChangeHandler(value);
            }
        }
    };

    console.log('data>>', data);

    const handleNext = async () => {
        if (data?.image?.length) {
            let urls = await uploadImages(data.image);
            data.image = urls[0];
        } else {
            data.image = '';
        }
        if (data.driverLicensePdf?.length) {
            let durls = await uploadFiles(data.driverLicensePdf);
            data.driverLicensePdf = durls[0].path;
        } else {
            data.driverLicensePdf = '';
        }

        if (data.govtIdPdf?.length) {
            let gurls = await uploadFiles(data.govtIdPdf);
            data.govtIdPdf = gurls[0].path;
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
                onTabEnable([0, 1, 2, 3]);
                history.replace(`/plans/sell-plan/${id}/${newPlanId}/${memberId}${'?tab=agreement'}`);
            }),
        );
    };
    return (
        <>
            <CustomCard col="12" title="Personal">
                <CustomGridLayout>
                    <div className="avatar-img">
                        <CustomImageInput name="image" data={data} onFilesChange={handleChange} required editable={true} />
                    </div>
                    <CustomInput name="accessCode" required data={data} onChange={handleChange} />
                    <CustomInput name="barCode" required data={data} onChange={handleChange} keyFilter="int" />
                    <CustomFilesInput
                        data={data}
                        onFilesChange={handleChange}
                        name="driverLicensePdf"
                        label="Upload Driver Licence"
                        accept="image/*,.pdf"
                        disabled={false}
                        col="12"
                    />
                    <CustomFilesInput
                        data={data}
                        onFilesChange={handleChange}
                        name="govtIdPdf"
                        label="Upload Government/School Ids"
                        accept="image/*,.pdf"
                        disabled={false}
                        col="12"
                    />
                </CustomGridLayout>
                <CustomButtonGroup>
                    <PrimaryButton label="Next" className="mx-2" onClick={handleNext} />
                    <PrimaryButton label="Save & Hold" className="mx-2" />
                    <PrimaryButton label="Sign Agreement" className="mx-2" />
                    <LightButton label="Cancel" />
                </CustomButtonGroup>
            </CustomCard>
        </>
    );
};
export default IdentificationTab;
