import React, { useEffect, useState } from 'react';
import FormPage from '../../../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../../../shared/Cards/CustomCard';
import { CustomCalenderInput, CustomInput, CustomTextArea } from '../../../../../../shared/Input/AllInputs';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../../../shared/Button/CustomButton';
import { addCertificates, editCertificates, getCertificate } from '../../../../../../redux/actions/EmployeeSettings/certificationAction';
import CustomFilesInput from '../../../../../../shared/Input/CustomFilesInput';

const CertificationForm = () => {
    const { id, employeeId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [data, setData] = useState({
        name: '',
        certificationNumber: '',
        issuer: '',
        acquiredDate: '',
        expirationDate: '',
        certificate: [],
        employee: '',
        certificateSize: '',
        certificateName: '',
    });
    useEffect(() => {
        if (id) {
            dispatch(
                getCertificate(id, (data) => {
                    setData({
                        name: data.name,
                        certificationNumber: data.certificationNumber,
                        issuer: data.issuer,
                        acquiredDate: data.acquiredDate ? new Date() : '',
                        expirationDate: data.expirationDate ? new Date() : '',
                        certificate: data.certificate ? [data.certificate] : [],
                        description: data.description,
                        employee: employeeId,
                        certificateName: data?.certificateName ? data?.certificateName : '',
                        certificateSize: data?.certificateSize ? data?.certificateSize : '',
                    });
                }),
            );
        } else {
            setData({ ...data, employee: employeeId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, dispatch]);

    const [loading, setLoading] = useState(false);
    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSave = () => {
        if (id) {
            dispatch(editCertificates(id, data, setLoading, history));
        } else {
            dispatch(addCertificates(data, setLoading, history));
        }
    };
    return (
        <>
            <FormPage backText="Certifications">
                <CustomCard col="12" title="Personal">
                    <CustomGridLayout>
                        <CustomInput name="name" data={data} onChange={handleChange} />
                        <CustomInput name="certificationNumber" data={data} onChange={handleChange} />
                        <CustomInput name="issuer" data={data} onChange={handleChange} />
                        <CustomCalenderInput name="acquiredDate" data={data} onChange={handleChange} />
                        <CustomCalenderInput name="expirationDate" data={data} onChange={handleChange} />
                        <CustomTextArea name="description" data={data} onChange={handleChange} />
                        <CustomFilesInput
                            data={data}
                            onFilesChange={handleChange}
                            name="certificate"
                            label="Upload Certificate"
                            accept="image/*,.pdf"
                            disabled={false}
                            col="6"
                            uploadType="Image/Pdf"
                            originalName={data?.certificateName}
                            fileSize={data.certificateSize}
                        />
                    </CustomGridLayout>
                </CustomCard>
                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" loading={loading} onClick={handleSave} />
                    <LightButton label="Cancel" onClick={() => history.replace('/settings/employee')} />
                </CustomButtonGroup>
            </FormPage>
        </>
    );
};

export default CertificationForm;
