const constants = {
  base_url: "https://impactzoneapi.appdeft.biz/api/",
  // base_url: "http://localhost:1102/api/",

  endPoints: {
    Login: "gym-owner/login",
    CreateEmployee: "employee/create-employee",
    GetEmployeeTableData: "employee/employees?sortOrder=DESC",
    DeleteEmployee: "employee/delete/",
    ForgotPassword: "gym-owner/forget-password",
    CreateNewPassword: "gym-owner/change-forget-password",
    OtpVerfiy: "gym-owner/verify-otp",
    GetDepartment: "departments",
    CreateDepartment: "departments",
    JobTitle: "gym-owner/titles",
    CreateJobTitle: "gym-owner/title",
    DeleteTitle: "gym-owner/title/delete/",
    DeleteDepartment: "departments/delete/",
    TitleUpdate: "gym-owner/title/update/",
    UpdateDepartment: "departments/update/",
    GetClubs: "gym-owner/clubs",
    AddLevel: "levels",
    DeleteLevel: "levels/delete/",
    UpdateLevel: "levels/update/",
    uploadFile: "upload"
  },
};

export default constants;
