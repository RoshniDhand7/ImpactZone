import React, { useState } from "react";
import Logo from "../../assets/icons/logo.png";
import Input from "../../components/input/input";
import Button from "../../components/buttons/button";
import { Password } from "primereact/password";
import OtpInput from "react-otp-input";
import OTPInput, { ResendOTP } from "otp-input-react";

const ForgotPassword = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [newPassword, setIsNewPassword] = useState(false);
  const [value, setValue] = useState("");
  const [otp, setOtp] = useState("");
  const [OTP, setOTP] = useState("");

  const sendEmail = () => {
    setIsOtpSent(true);
  };

  const otpVerify = () => {
    setIsNewPassword(false);
    setIsOtpSent(false);
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
            <Input title="Email" placeholder="mike"></Input>
          </div>
          <div className="col-9">
            <Button
              className="btn-dark border-none"
              label="Continue"
              onClick={sendEmail}
            ></Button>
          </div>
        </div>
      </div>
    );
  };

  const otpVerifyCard = () => {
    return (
      <>
        {" "}
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
              imp....@gmail.com
            </span>
            <div className="customOtp  col-9">
              <Input title=" " placeholder=""></Input>
              {/* <OtpInput
                className="border-round-1"
                inputStyle={{ width: "66px", height: "61px" }}
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
              /> */}
              {/* <OTPInput
                inputStyle={{ width: "66px", height: "61px" }}
                value={OTP}
                onChange={setOTP}
                autoFocus
                OTPLength={4}
                otpType="number"
                disabled={false}
                secure
              />
              <ResendOTP
                handelResendClick={() => console.log("Resend clicked")}
              /> */}
            </div>
            <div>
              <span claass="text-base font-medium">Resend</span> code
              <span className="text-green-600"> in </span> 55
              <span className="text-green-600"> s</span>
            </div>
            <div className="col-9">
              <Button
                className="btn-dark border-none"
                label="Continue"
                onClick={sendEmail}
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
          <div className="col-9">
            <Password
              value={value}
              onChange={(e) => setValue(e.target.value)}
              toggleMask
            />
          </div>
          <div className="col-9">
            <Password
              value={value}
              onChange={(e) => setValue(e.target.value)}
              toggleMask
            />
          </div>
          <div className="col-9">
            <Button
              className="btn-dark border-none"
              label="Reset Password"
              onClick={sendEmail}
            ></Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {isOtpSent
        ? otpVerifyCard()
        : newPassword
        ? createNewPasswordCard()
        : sendEmailCard()}
    </>
  );
};

export default ForgotPassword;
