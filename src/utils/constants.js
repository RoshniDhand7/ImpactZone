const constants = {
  base_url: "https://impactzoneapi.appdeft.biz/api",
  endPoints: {
    Login: "/gym-owner/login",
    CreateEmployee: "/employee/create-employee",
    GetEmployeeTableData: "/employee/employees?sortOrder=DESC",
    DeleteEmployee: "/employee/delete/",
    ForgotPassword: "/gym-owner/forget-password",
    CreateNewPassword: "/gym-owner/change-forget-password",
    OtpVerfiy: "/gym-owner/verify-otp",
  },
};

export default constants;
