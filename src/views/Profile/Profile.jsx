import { useState } from 'react';
import PrimaryButton, { LightButton } from '../../shared/Button/CustomButton';
import CustomCard, { CustomListItem } from '../../shared/Cards/CustomCard';
import { CustomInput, CustomPassword } from '../../shared/Input/AllInputs';
import CustomImageInput from '../../shared/Input/CustomImageInput';
import CustomDialog from '../../shared/Overlays/CustomDialog';
import { useDispatch, useSelector } from 'react-redux';
import formValidation from '../../utils/validations';
import { showFormErrors } from '../../utils/commonFunctions';
import { onChangePassword } from '../../redux/actions/profileAction';

const Profile = () => {
    const [openModal, setOpenModal] = useState();
    const data = useSelector((state) => state.profile.user);

    return (
        <>
            <ProfileImageCard />
            <CustomCard col="12" title="Personal">
                <CustomListItem name="email" data={data} />
                <CustomListItem name="mobilePhone" label={'Phone No.'} data={data} />
                <CustomListItem name="hireDate" data={data} />
                <CustomListItem name="street" label="Street Address" data={data} />
                <CustomListItem name="city" data={data} />
                <CustomListItem name="state" data={data} />
                <CustomListItem name="zipCode" data={data} />
            </CustomCard>

            <div className="p-4 border-round-xl shadow-2 bg-lightest-blue mb-3">
                <CustomInput extraClassName="w-full" name="" type="password" value={'*********'} disabled />
                <PrimaryButton
                    label="Change Password"
                    onClick={() => {
                        setOpenModal(true);
                    }}
                />
            </div>
            {openModal && <ChangePasswordModal openModal={openModal} setOpenModal={setOpenModal} />}
        </>
    );
};

export default Profile;

const ProfileImageCard = ({ handleChange }) => {
    const data = useSelector((state) => state.profile.user);

    return (
        <div className="p-4 border-round-xl shadow-2 align-items-center bg-lightest-blue flex gap-5 mb-3">
            <div className="avatar-img">
                <CustomImageInput showAvatar showLabel={false} name="image" data={data} onFilesChange={handleChange} required editable={true} />
            </div>
            <div className="">
                <h2 className="text-dark-blue text-3xl font-semibold">{`${data.firstName} ${data.lastName} `}</h2>
                <p className="text-black font-medium">Barcode - {data.barCode}</p>
                <p className="text-black font-medium">Access Code - {data.accessCode}</p>
            </div>
        </div>
    );
};

const ChangePasswordModal = ({ openModal, setOpenModal }) => {
    const [data, setData] = useState({ password: '', newPassword: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const onSubmit = () => {
        if (showFormErrors(data, setData)) {
            dispatch(
                onChangePassword(data, setLoading, () => {
                    setOpenModal(false);
                }),
            );
        }
    };

    return (
        <CustomDialog
            visible={openModal}
            onCancel={() => {
                setOpenModal(false);
            }}
            onSave={() => {}}
            position="center"
            width="30vw"
            contentclassname="pb-2"
            title="Change Password"
            footer={
                <div className="grid">
                    <div className="col-6">
                        <PrimaryButton className={'w-full'} label="Save Changes" loading={loading} onClick={onSubmit} />
                    </div>
                    <div className="col-6">
                        <LightButton
                            className={'w-full'}
                            label="Cancel"
                            onClick={() => {
                                setOpenModal(false);
                            }}
                        />
                    </div>
                </div>
            }
        >
            <CustomPassword type="password" label={'Old Password'} extraClassName="w-full" name="password" data={data} onChange={handleChange} required />
            <CustomPassword label={'New Password'} extraClassName="w-full" name="newPassword" data={data} onChange={handleChange} required />
            <CustomPassword label={'Confirm Password'} extraClassName="w-full" name="confirmPassword" data={data} onChange={handleChange} required />
        </CustomDialog>
    );
};
