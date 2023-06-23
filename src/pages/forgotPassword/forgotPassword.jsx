import React, { useEffect, useState } from "react";
import Logo from "../../assets/icons/logo.png";
import Input from "../../components/input/input";
import Button from "../../components/buttons/button";
import { Password } from "primereact/password";
import { useDispatch } from "react-redux";
import { showToast } from "../../redux/actions/toastAction";
import { useNavigate } from "react-router-dom";
import constants from "../../utils/constants";
import api from "../../services/api";
import validation from "../../utils/Validation";
import OtpInput from "react-otp-input";

const ForgotPassword = () => {
  const [otp, setotp] = useState();
  const { loginValidations } = validation();
  const [resendOtpTime, setResnedOtpTime] = useState(null);
  const [isResendOtp, setIsResendOtp] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [newPassword, setIsNewPassword] = useState(false);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [dataIsCorrect, setDataIsCorrect] = useState(false);
  let navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    otpcode: "",
    OTP: "",
  });

  const handelChange = (name) => (e) => {
    setData({ ...data, [name]: e.target?.value });
  };
  console.log(data, "data");

  const callForgotApi = async () => {
    const res = await api("post", constants.endPoints.ForgotPassword, data);
    console.log(res.data.email);
    if (res.success) {
      const email = res.data.email;
      localStorage.getItem("email", email);
      dispatch(showToast({ severity: "success", summary: res.message }));
      setIsOtpSent(true);
      setResnedOtpTime(60);
      setIsResendOtp(false);
    } else {
      dispatch(showToast({ severity: "error", summary: res.message }));
      showcomponent(false);
    }
  };

  const OtpVerify = async () => {
    const res = await api("post", constants.endPoints.OtpVerfiy, {
      email: data.email,
      OTP: otp,
    });
    console.log(res.data, "otp");
    if (res.success) {
      dispatch(showToast({ severity: "success", summary: res.message }));
    } else {
      setIsNewPassword(false);
      dispatch(showToast({ severity: "error", summary: res.message }));
    }
    // } else {
    //   setErrors({ confirmPassword: "Passwords didn't matched" });}
  };

  const createNewPassword = async () => {
    if (data.password === data.confirmPassword) {
      const res = await api(
        "post",
        constants.endPoints.CreateNewPassword,
        data
      );
      if (res.success) {
        dispatch(showToast({ severity: "success", summary: res.message }));
        setIsOtpSent(true);
        navigate("/login");
      } else {
        dispatch(showToast({ severity: "error", summary: res.message }));
        showcomponent(false);
      }
    } else {
      setErrors({ confirmPassword: "Passwords didn't matched" });
    }
  };

  const handleForgetSubmit = async (event) => {
    event.preventDefault();
    let validate = await loginValidations(data);
    if (validate.email) {
      setErrors(validate);
    } else {
      setDataIsCorrect(true);
      setErrors({});
      callForgotApi();
    }
  };

  useEffect(() => {
    if (resendOtpTime > 0) {
      setTimeout(() => {
        setResnedOtpTime((prev) => prev - 1);
      }, 1000);
    }
    if (resendOtpTime === 0) {
      setIsResendOtp(true);
    }
  }, [resendOtpTime]);

  const showcomponent = () => {};
  const verifyOtp = () => {
    if (otp) {
      setIsNewPassword(true);
      OtpVerify();
    } else {
      setErrors({ otp: "Please enter otp" });
    }
  };

  const sendEmailCard = () => {
    return (
      <div className=" bg-light-gray flex justify-content-center align-items-center h-screen ">
        <div className="loginCard flex-column primaryfont flex align-items-center p-4 ">
          <div className="logo mt-5">
            <img src={Logo} alt="" />
          </div>
          <div className="text-3xl text-dark-gray   font-bold my-3">
            Forget Password
          </div>
          <span className="text-sm text-dark-gray text-center mb-3">
            Forgot your password? Enter your email address <br /> and we’ll send
            you one time password.
          </span>
          <div className="col-9">
            <Input
              title="Email"
              placeholder=""
              value={data.email}
              onChange={handelChange("email")}
            ></Input>
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="col-9 mr-3">
            <Button
              className="btn-dark border-none "
              label="Continue"
              onClick={handleForgetSubmit}
            ></Button>
          </div>
        </div>
      </div>
    );
  };

  const otpVerifyCard = () => {
    return (
      <>
        <div className=" bg-light-gray flex justify-content-center align-items-center h-screen ">
          <div className="loginCard flex-column primaryfont flex align-items-center p-4 ">
            <div className="logo mt-5">
              <img src={Logo} alt="" />
            </div>
            <div className="text-3xl text-dark-gray   font-bold my-3">
              OTP Verification
            </div>
            <span className="text-sm text-dark-gray text-center mb-3">
              Code has been send to registered email: <br />
              {localStorage.getItem("email")}
            </span>
            <div className="customOtp flex justify-content-center col-9">
              <OtpInput
                inputStyle={{ width: "4em", height: "3rem" }}
                value={otp}
                onChange={setotp}
                numInputs={4}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
              />

              {/* <Input
                title=" "
                placeholder=""
                value={data.otpcode}
                onChange={handelChange("otpcode")}
              ></Input> */}
            </div>
            {errors.otp && (
              <p className="text-red-600 text-xs mt-1">{errors.otp}</p>
            )}
            <div>
              {isResendOtp ? (
                <span
                  className="text-base font-medium cursor-pointer underline"
                  onClick={callForgotApi}
                >
                  Resend code
                </span>
              ) : (
                <span className="text-base font-medium">Resend code</span>
              )}
              <span className="text-green-600"> in </span> {resendOtpTime}
              <span className="text-green-600"> s</span>
            </div>
            <div className="col-9 mr-3 ">
              <Button
                className="btn-dark border-none "
                label="Continue"
                // onClick={OtpVerify}
                onClick={verifyOtp}
              ></Button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const createNewPasswordCard = () => {
    return (
      <div className=" bg-light-gray flex justify-content-center align-items-center h-screen ">
        <div className="loginCard flex-column primaryfont flex align-items-center p-4 ">
          <div className="logo mt-5">
            <img src={Logo} alt="" />
          </div>
          <div className="text-3xl text-dark-gray   font-bold my-3">
            Reset password
          </div>
          {/* <span className="text-sm text-dark-gray text-center mb-3">
            Forgot your password? Enter your email address <br /> and we’ll send
            you one time password.
          </span> */}
          <div className="mb-3">
            <div className="flex flex-column gap-1">
              <label htmlFor="" className="text-xs font-semibold">
                New Password
              </label>
              <Password
                value={data.password}
                onChange={handelChange("password")}
                toggleMask
              />
            </div>
          </div>
          <div className="">
            <div className=" flex flex-column gap-1">
              <label htmlFor="" className="text-xs font-semibold">
                Confirm Password
              </label>
              <Password
                value={data.confirmPassword}
                onChange={handelChange("confirmPassword")}
                toggleMask
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
          <div className="mt-3 mr-3 " style={{ width: "236px" }}>
            <Button
              className="btn-dark border-none"
              label="Reset Password"
              onClick={createNewPassword}
            ></Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {newPassword
        ? createNewPasswordCard()
        : isOtpSent
        ? otpVerifyCard()
        : sendEmailCard()}
    </>
  );
};

export default ForgotPassword;
