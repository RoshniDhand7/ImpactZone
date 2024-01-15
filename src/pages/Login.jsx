import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { CustomInput } from '../shared/Input/AllInputs';
import FormLayout from '../shared/Form/FormLayout';
import PrimaryButton from '../shared/Button/CustomButton';
import Checkbox from '../shared/Input/Checkbox';
import formValidation from '../utils/validations';
import { showFormErrors } from '../utils/commonFunctions';
import { onLogin } from '../redux/actions/profileAction';
import { isAuthenticated } from '../services/auth';

export default function Login({ history }) {
    useEffect(() => {
        if (isAuthenticated()) {
            history.push('/dashboard');
        }
    }, [history]);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        email: 'goldgym@yopmail.com',
        password: 'Iz-1384',
        rememberMe: false,
    });

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (showFormErrors(data, setData)) {
            dispatch(onLogin(data, history, setLoading));
        }
    };
    return (
        <>
            <div className="login-page h-screen surface-ground flex justify-content-center align-items-center w-full">
                <div className="flex justify-content-center align-items-center w-full">
                    <div className="bg-white w-11 sm:w-9 md:w-8 lg:w-6 xl:w-4 flex-column flex align-items-center p-4 border-round-2xl">
                        <div className="logo ">
                            <img src={Logo} alt="" width="50%" />
                        </div>
                        <div className="text-3xl text-dark-gray font-bold my-3">Welcome Back!</div>
                        <div className="col-9">
                            <FormLayout onSubmit={onSubmit}>
                                <CustomInput data={data} name="email" onChange={handleChange} col={12} />
                                <CustomInput data={data} name="password" type="password" onChange={handleChange} col={12} />
                                <div className="flex justify-content-between w-full">
                                    <Checkbox data={data} label="Remember Me" name="rememberMe" onChange={handleChange} />
                                    <Link to="/forgot-password" className="underline cursor-pointer text-xs text-dark-gray  font-semibold">
                                        Forgot Password?
                                    </Link>
                                </div>

                                <PrimaryButton className="w-full" label="Login" loading={loading} type="submit" />
                            </FormLayout>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
