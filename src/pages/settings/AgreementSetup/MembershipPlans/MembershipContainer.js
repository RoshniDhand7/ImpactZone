import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteMemberShipPlan, UpdateMemberShipPlan, addMemberShipPlan, getMembershipPlans } from '../../../../redux/actions/membershipPlansAction';
import { useEffect } from 'react';
import { Chips } from "primereact/chips";
import { getAgreementCategory } from '../../../../redux/actions/agreementCategoryAction';
import { getClubs } from '../../../../redux/actions/clubsActions';
import { getMemberShipType } from '../../../../redux/actions/memberShipTypesAction';
import { getAssessed } from '../../../../redux/actions/assessedAction';
import { getStateVAlue } from '../../../../redux/actions/stateAction';
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { confirmDialog } from "primereact/confirmdialog";
import FormValidation from '../../../../utils/AllFormValidation';
import { showAllFormErrors } from '../../../../utils/commonFunctions';
import { showToast } from '../../../../redux/actions/toastAction';

const MembershipContainer = () => {
const dispatch = useDispatch()

const AllMembershipPlan = useSelector((state)=>state.membershipPlans.membershipPlans)
const allAgreementCategoryData = useSelector((state) => state.AgreementCategory.AllAgreementCategory.map((item)=>{return {label:item.name,value:item._id}}))
const allSubCategory = useSelector((state) => state.AgreementCategory.AllAgreementCategory.map((item)=>{return {label:item._id,value:item.subCategories}}))
const allClubs = useSelector((state) => state.clubs.clubs.map((item)=>{return {label:item.name,value:item._id}}));
const membershipTypeData = useSelector((state) => state.memberShip.membershipType.map((item)=>{return {label:item.name,value:item._id}}));
const allAssessedData = useSelector((state)=>state.Assessed.AllAssessed)
console.log("allAssessedData",allAssessedData)
const [subCategoryOption,setSubCategoryOption] = useState([])
const [selectedRow, setSelectedRow] = useState([]);
const [editMemberShip,setEditMemberShip] = useState(null)
const [initialMemberShip,setInitialMemberShip] = useState([])
const [required, setRequired] = useState(["category","subCategory","name","clubs","membershipTypes","agreementTemplate","assessedFees","autoPay","clientsChargeCycle","clientsChargeTime","clientsChargeTime","resultAfterSixPayments","sellOnline"])
// const [memberPlanData,setMemberPlanData] = useState([])
    const [addPaymentPlans, setPaymentPlans] = useState(false);
    const [allAssessedFee,setAllAssessedFee] = useState([])
    const [showAddMemberShipService, setShowAddMemberShipService] = useState(false);


    const [membershipForm,setMembershipForm] = useState({
      category: null,
      subCategory: null,
      name: null,
      clubs: [],
      membershipType:null,
      agreementTemplate: null,
      assessedFees: [],
      services: [],
      autoPay: null,
      clientsChargeCycle: null,
      clientsChargeTime: null,
      timePeriod: null,
      noOfAutoPays: null,
      date: null,
      resultAfterSixPayments: null,
      sellOnline: null,
      onlineDescription: null,
      assessedOption:[]
    })

    const onClickChangePage = () => {
      setPaymentPlans((prev) => !prev);
      if (editMemberShip) {
        setEditMemberShip(null);
        setMembershipForm({ ...initialMemberShip });
      }
    };

    const deleteConfirm = (id) => {
      confirmDialog({
        message: "Do you want to delete this record?",
        header: "Delete Confirmation",
        icon: "pi pi-info-circle",
        acceptClassName: "p-button-danger",
        rejectClassName: "cancel-button",
        accept: () => acceptFunc(id),
        reject,
      });
    };
    const acceptFunc = (id) => {
      dispatch(DeleteMemberShipPlan(id)).then((data) => {
        if (data.success) {
          dispatch(getMembershipPlans());
        }
      });
    };
  
    const reject = () => { };

    const actionTemplate = (col) => {
        // console.log(col._id, "collllll");
        return (
          <>
            <div className="flex justify-content-end">
              <span onClick={() => setEditMemberShip(col)}>
                <i className="pi pi-pencil mr-3 cursor-pointer"></i>
              </span>
              <span onClick={() => deleteConfirm(col?._id)}>
                <i className="pi pi-trash cursor-pointer"></i>
              </span>
            </div>
          </>
        );
      };

    const clubsTemplate = (col) => {
      console.log("colsss",col.clubs)
        return (
            <div>
                {col?.clubs ? col?.clubs[0]?.name : null}
                {/* <Chips value={clubs} separator="," /> */}
            </div>
        )
    }
    const categoryTemplate = (col) => {
      return (
<div>{col?.category?.name}</div>
      )
    }

    const memberTypeTemplate = (col) => {
      return (
        <div>
          {col?.membershipType ? col?.membershipType?.name : null}
        </div>
      )
    }

    const noofmemberTemplate = (col) => {
      return (
        <div>
          0
        </div>
      )
    }

    const soldOnlineTemplate = (col) => {
      return (
        <div>
          {col.soldOnlineTemplate===true ? 'Yes' : 'No'}
        </div>
      )
    }
    
      const ManagePaymentPlansColumn = [
        {
          field: "name",
          header: "Plan Name",
          id: "",
          index: "",
        },
        {
          field: "clubs",
          header: "Clubs",
          id: "",
          index: "",
          body: clubsTemplate,
        },
        {
          field: "category",
          header: "Category",
          id: "",
          index: "",
          body: categoryTemplate
        },
        {
          field: "membershiptype",
          header: "Membership Type",
          id: "",
          index: "",
          body: memberTypeTemplate
        },
        {
          field: "noofmembers",
          header: "No.of Members",
          id: "",
          index: "",
          body:noofmemberTemplate
        },
        {
          field: "soldonline",
          header: "Sold Online",
          id: "",
          index: "",
          body:soldOnlineTemplate
        },
        {
          field: "",
          header: "",
          id: "",
          body: actionTemplate,
        },
      ];



      const handleChangeMember = ({name,value}) => {
        const formErrors = FormValidation(
          name,
          value,
          membershipForm,
          required,
          initialMemberShip
        );
        setMembershipForm((prev)=>{
          return {
            ...prev,
            [name]:value,
            formErrors
          }
        })
      }


      const MemberPickerHandleChange = ({ name, value, source }) => {
        console.log("nameassessed",name, value, source)
        const formErrors = FormValidation(
          "assessedFees",
          value,
          membershipForm,
          required,
          initialMemberShip
        );
          let assessedNew = value.map((item) => {
            return item.value;
          });

          setMembershipForm((prev) => {
            return {
              ...prev,
              [name]: value,
              assessedFees: assessedNew,
              formErrors
            };
          });
          setAllAssessedFee(source)
        
      }

      const memberShipAddColumn = [
        {},
        {
          field: "name",
          header: "Item Name",
          id: "",
          index: "",
          sorting: true,
        },
        {
          field: "size",
          header: "Item UPC",
          id: "",
          index: "",
          sorting: true,
        },
        {
          field: "catelogPrice",
          header: "Price",
          id: "",
          index: "",
          sorting: true,
        },
      ];
      const [memberShipAddData, setMemberShipAddData] = useState([
        {
          id: "a1",
          catelogPrice: "100",
          name: "agreements",
          size: "10",
          status: true,
        },
        {
          id: "a2",
          catelogPrice: "200",
          name: "Adults",
          size: "15",
          status: true,
        },
        {
          id: "a3",
          catelogPrice: "200",
          name: "Students",
          size: "15",
          status: true,
        },
        {
          id: "a4",
          catelogPrice: "150",
          name: "Corporate",
          size: "18",
          status: false,
        },
        {
          id: "a5",
          catelogPrice: "120",
          name: "Annual",
          size: "25",
          status: false,
        },
      ]);
    
      const [globalFilterValue, setGlobalFilterValue] = useState("");
      const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      });
    
      const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
    
        _filters["global"].value = value;
    
        setFilters(_filters);
        setGlobalFilterValue(value);
      };
    
      const removeAll = () => {
        setMembershipForm((prev) => {
          return {
            ...prev,
            services: [],
          };
        });
        delete membershipForm?.formErrors?.services;
        setSelectedRow([]);
      };

      const submit = () => {
        if (
          showAllFormErrors(
            membershipForm,
            setMembershipForm,
            required,
            initialMemberShip
          )
        ) {
          if (editMemberShip) {
            dispatch(UpdateMemberShipPlan(membershipForm)).then(
              (data) => {
                if (data.success) {
                  dispatch(getMembershipPlans())
                  setPaymentPlans(false);
                  setMembershipForm({ ...initialMemberShip });
                }
              }
            );
          } else {
            dispatch(addMemberShipPlan(membershipForm)).then((data) => {
              if (data.success) {
                dispatch(getMembershipPlans())
                setPaymentPlans(false);
                setMembershipForm({ ...initialMemberShip });
              }
            });
          }
        } else {
          dispatch(
            showToast({
              severity: "error",
              summary: "Please Fill All Required Fields",
            })
          );
          window.scrollTo({
            top: 250,
            left: 0,
            behavior: "smooth",
          });
        }
      };

console.log("membershipForm",membershipForm)
console.log("editmembershipForm",editMemberShip)

useEffect(() => {
  if (editMemberShip) {
    // let newCategory = {
    //   label:editMemberShip.category.name,
    //   value:editMemberShip.category._id
    // }
    let obj = {
      ...editMemberShip,
      category: editMemberShip.category._id,
      subCategory: editMemberShip.subCategory,
      name: editMemberShip.name,
      clubs: editMemberShip.clubs.map((item)=>{return item._id}),
      membershipType:editMemberShip.membershipType._id,
      agreementTemplate: editMemberShip.agreementTemplate,
      assessedFees: editMemberShip.assessedFees?.map((item) => {
        return item._id;
      }),
      services: editMemberShip.services,
      autoPay: editMemberShip.autoPay,
      clientsChargeCycle: editMemberShip.clientsChargeCycle,
      clientsChargeTime: editMemberShip.clientsChargeTime,
      timePeriod: editMemberShip.timePeriod,
      noOfAutoPays: editMemberShip.noOfAutoPays,
      date: editMemberShip.date,
      resultAfterSixPayments: editMemberShip.resultAfterSixPayments,
      sellOnline: editMemberShip.sellOnline,
      onlineDescription: editMemberShip.onlineDescription,
      assessedOption:editMemberShip.assessedFees.map((item)=>{return {label:item.name,value:item._id}})
      // isActive: editMemberShip.isActive,
      // name: editMemberShip.name,
      // description: editMemberShip.description,
      // discountType: editMemberShip.discountType,
      // accessRestriction: editMemberShip.accessRestriction,
      // accessSchedule: editMemberShip.accessSchedule,
      // allowRemoteCheckIn: editMemberShip.allowRemoteCheckIn,
      // clubCreditAmount: editMemberShip.clubCreditAmount,
      // transferToAnotherType: editMemberShip.transferToAnotherType?._id,
      // specialRestriction: editMemberShip.specialRestriction,
      // minimumAgeAllowed: editMemberShip.minimumAgeAllowed,
      // maximumAgeAllowed: editMemberShip.maximumAgeAllowed,
      // maximumDaysAllowed: editMemberShip.maximumDaysAllowed,
      // maximumDistanceAllowed: editMemberShip.maximumDistanceAllowed,
      // clubs: editMemberShip.clubs?.map((item) => {
      //   return item._id;
      // }),
      // clubsOption: editMemberShip.clubs,
      // services: editMemberShip.services,
    };
    console.log("objjj",obj)
    setMembershipForm(obj);
    setPaymentPlans(true);
    setSelectedRow(editMemberShip.services);
    let assessedSource = allAssessedFee.filter((item) => {
      return !editMemberShip.assessedFees.find((child) => {
        return item._id == child._id;
      });
    });
    setAllAssessedFee(assessedSource);
  }
}, [editMemberShip]);



useEffect(() => {
  if(allAssessedData){
  let newAssessedFee = allAssessedData.map((item)=>{return {label:item.name,value:item._id}})
    setAllAssessedFee(newAssessedFee)
  }
}, [allAssessedData])


useEffect(() => {
  if(allSubCategory){
    let newSubCAtegory = []
    allSubCategory.map((item)=>{
      if(item.label==membershipForm.category){
        newSubCAtegory.push(...item.value)
      }
    })
    setSubCategoryOption(newSubCAtegory)
  }
}, [membershipForm.category])

useEffect(() => {
  setInitialMemberShip(membershipForm)
}, [])


      useEffect(() => {
        dispatch(getMembershipPlans())
        dispatch(getAgreementCategory())
        dispatch(getClubs());
        dispatch(getMemberShipType());
        dispatch(getAssessed())
      }, [])
      

  return {
    ManagePaymentPlansColumn,
    addPaymentPlans,
    onClickChangePage,
    AllMembershipPlan,
    allAgreementCategoryData,
    handleChangeMember,
    membershipForm,
    subCategoryOption,
    allClubs,
    membershipTypeData,
    allAssessedFee,
    MemberPickerHandleChange,
    showAddMemberShipService,
    setShowAddMemberShipService,
    globalFilterValue,
    setGlobalFilterValue,
    filters,
    onGlobalFilterChange,
    memberShipAddColumn,
    memberShipAddData,
    selectedRow,
    setSelectedRow,
    removeAll,
    submit
  }
}

export default MembershipContainer