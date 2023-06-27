import React, { useEffect, useState } from "react";
import Logo from "../../assets/icons/logo.png";
import Input from "../../components/input/input";
import Checkbox from "../../components/checkbox/checkbox";
import Button from "../../components/buttons/button";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "../../redux/actions/toastAction";
import { useDispatch } from "react-redux";
import api from "../../services/api";
import constants from "../../utils/constants";
import validation from "../../utils/Validation";
import { Password } from "primereact/password";
import InputPassword from "../../components/input/inputfields";

const Login = ({ setIsLogged }) => {
  const { loginValidations } = validation();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [dataIsCorrect, setDataIsCorrect] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handelChange = (name) => (e) => {
    setData({ ...data, [name]: e.target.value });
    // console.log(data);
  };

  const onClickLogin = async () => {
    const res = await api("post", constants.endPoints.Login, data);
    if (res.success) {
      const token = res.data.token;
      localStorage.setItem("token", token);
      const firstname = res.data.firstName;
      const email = res.data.email;
      const lastname = res.data.lastName;
      localStorage.setItem("firstName", firstname);
      localStorage.setItem("email", email);
      localStorage.setItem("lastName", lastname);
      dispatch(showToast({ severity: "success", summary: res.message }));
      setIsLogged(true);
      navigate("/");
    } else {
      dispatch(showToast({ severity: "error", summary: res.message }));
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    let validate = await loginValidations(data);
    if (validate.email || validate.password) {
      setErrors(validate);
    } else {
      setDataIsCorrect();
      onClickLogin();
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && dataIsCorrect) {
      onClickLogin();
    }
    setErrors(false);
  }, [data]);

  return (
    <div className="login-page h-screen bg-light-gray flex justify-content-center align-items-center">
      <div className="flex justify-content-center align-items-center">
        <div className="loginCard flex-column  flex align-items-center p-4  py-5">
          <div className="logo ">
            <img src={Logo} alt="" />
          </div>
          <div className="text-3xl text-dark-gray font-bold my-3">
            Welcome Back!
          </div>
          <div className="col-9">
            <Input
              id=""
              values={data.email}
              title="Username"
              placeholder="Please Enter Your Email"
              onChange={handelChange("email")}
            ></Input>
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="col-9 mt-2">
            {/* <div className="">
              <label
                htmlFor=""
                className="text-xs text-dark-gray font-semibold"
              >
                Password
              </label>
            </div> */}
            <Password
              style={{ width: "100%" }}
              title="Password"
              id=""
              placeholder="Please Enter Your Password"
              inputType="password"
              value={data.password}
              type="password"
              toggleMask
              onChange={handelChange("password")}
            ></Password>
            {errors.password && (
              <p className="text-red-600 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <div className="col-9 -m-2 mt-1 flex justify-content-between ">
            <div className=" text-xs  ">
              <Checkbox title="Remember Me" />
            </div>
            <Link to="/forgotpassword">
              <div
                className="text-xs underline cursor-pointer font-semibold "
                style={{ color: "#222222" }}
              >
                Forgot Password?
              </div>
            </Link>
          </div>
          <div className="col-9 mr-3 mt-3 mb-3">
            <Button
              onClick={handleLoginSubmit}
              className="btn-dark border-none m-0"
              label="Login"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
