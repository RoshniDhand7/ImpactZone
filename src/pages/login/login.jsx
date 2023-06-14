import React from "react";
import Logo from "../../assets/icons/logo.png";
import Input from "../../components/input/input";
import Checkbox from "../../components/checkbox/checkbox";
import Button from "../../components/buttons/button";
import { Link } from "react-router-dom";

const login = () => {
  return (
    <div className="login-page h-screen bg-light-gray flex justify-content-center align-items-center">
      <div className="flex justify-content-center align-items-center">
        <div className="loginCard flex-column  flex align-items-center p-4 ">
          <div className="logo ">
            <img src={Logo} alt="" />
          </div>
          <div className="text-3xl text-dark-gray font-bold my-3">
            Welcome Back!
          </div>
          <div className="col-9">
            <Input title="Usename" placeholder="mike"></Input>
          </div>
          <div className="col-9 mt-2">
            <Input title="Password" placeholder="*******"></Input>
          </div>
          <div className="col-9 -m-2 flex justify-content-between ">
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
          <div className="col-9 mr-3 mt-3">
            <Button className="btn-dark border-none m-0" label="Login"></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
