import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { CustomCheckbox, CustomInput } from '../shared/Input/AllInputs';
import FormLayout from '../shared/Form/FormLayout';
import PrimaryButton from '../shared/Button/CustomButton';
import formValidation from '../utils/validations';
import { showFormErrors } from '../utils/commonFunctions';
import { onChangeForgotPassword, onForgotPassword, onLogin } from '../redux/actions/profileAction';
import { isAuthenticated } from '../services/auth';
import { CustomGridLayout } from '../shared/Cards/CustomCard';

export default function ForgetPassword({ history }) {
    useEffect(() => {
        if (isAuthenticated()) {
            history.push('/dashboard');
        }
    }, [history]);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: '',
        otpCode: '',
    });

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const onSendOTP = (e) => {
        e.preventDefault();
        if (showFormErrors(data, setData, ['password', 'otpCode'])) {
            dispatch(
                onForgotPassword(data, setLoading, () => {
                    setIsOtpSent(true);
                }),
            );
        }
    };

    const changeForgotPassword = (e) => {
        e.preventDefault();
        if (showFormErrors(data, setData)) {
            dispatch(onChangeForgotPassword(data, history, setLoading));
        }
    };

    const EmailTemplate = () => {
        return (
            <FormLayout onSubmit={onSendOTP}>
                <CustomInput data={data} name="email" onChange={handleChange} col={12} />
                <PrimaryButton className="w-full" label="Send OTP" loading={loading} type="submit" />
            </FormLayout>
        );
    };

    const PasswordOTPTemplate = () => {
        return (
            <FormLayout onSubmit={changeForgotPassword}>
                <div className="text-xs text-dark-gray">
                    OTP has been sent on: <span className="font-semibold">{data.email}</span>
                </div>
                <CustomInput data={data} name="password" type="password" onChange={handleChange} col={12} />
                <CustomInput data={data} name="otpCode" onChange={handleChange} col={12} />
                <PrimaryButton className="w-full" label="Reset Password" loading={loading} type="submit" />
            </FormLayout>
        );
    };
    return (
        <>
            <div className="login-page h-screen surface-ground flex justify-content-center align-items-center w-full">
                <div className="flex justify-content-center align-items-center w-full">
                    <div className="bg-white w-11 sm:w-9 md:w-8 lg:w-6 xl:w-4 flex-column flex align-items-center p-4 border-round-2xl">
                        <div className="logo ">
                            <img src={Logo} alt="" width="50%" />
                        </div>
                        <div className="text-3xl text-dark-gray font-bold my-3">Forgot Password</div>
                        <div className="col-9">{isOtpSent ? PasswordOTPTemplate() : EmailTemplate()}</div>
                    </div>
                </div>
            </div>
        </>
    );
}
