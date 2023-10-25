import { confirmDialog } from 'primereact/confirmdialog';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAgreementPromotionsAction, deleteAgreementPromotions, getAgreementPromotions, updateAgreementPromotions } from '../../../../redux/actions/agreementPromotionsAction';
import { getMembershipPlans } from '../../../../redux/actions/membershipPlansAction';
import { showToast } from '../../../../redux/actions/toastAction';
import FormValidation from '../../../../utils/AllFormValidation';
import { showAllFormErrors } from '../../../../utils/commonFunctions';

const AgreementPromotionContainer = () => {
  const [addAgreementPromotions, setAgreementPromotions] = useState(false);
  const dispatch = useDispatch()
  const allAgreementPromotionsData = useSelector((state) => state.agreementPromotions.allAgreementPromotions);
  const { membershipPlans } = useSelector((state) => state.membershipPlans);

  const [required, setRequired] = useState(["code", "name", "membershipPlan", "startDate", "endDate", "uses", "promotionsType", "amount"]);
  const [editAgreementPromotions, setEditAgreementPromotions] = useState(null);
  const [initialAgreementPromotionsData, setInitialAgreementPromotionsData] = useState({})
  const [agreementPromotionsForm, setAgreementPromotionsForm] = useState({
    isActive: true,
    name: "",
    code: "",
    membershipPlan: null,
    startDate: "",
    endDate: "",
    uses: null,
    promotionsType: "",
    amount: ""
  });

  const promotionsTypes = [
    "% off down payment",
    "$ off down payments",
    "Free Months",
    "Double Referral"
  ];

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
    dispatch(deleteAgreementPromotions(id)).then((data) => {
      if (data.success) {
        dispatch(getAgreementPromotions());
      }
    });
  };

  const reject = () => { };

  const actionTemplate = (col) => {
    return (
      <>
        <div className="flex justify-content-end">
          <span onClick={() => onEditPromotions(col)}>
            <i className="pi pi-pencil mr-3 cursor-pointer"></i>
          </span>
          <span onClick={() => deleteConfirm(col?._id)}>
            <i className="pi pi-trash cursor-pointer"></i>
          </span>
        </div>
      </>
    );
  };

  const onEditPromotions = (col) => {
    setAgreementPromotions(true);
    col = {
      ...col,
      startDate: new Date(col.startDate),
      endDate: new Date(col.endDate)
    }
    setEditAgreementPromotions(col);
    setAgreementPromotionsForm({ ...col });
  }

  const dateTemplate = (dateType, col) => {
    return (
      <>
        <span>
          {col.startDate ? col[dateType].split("T")[0] : null}
        </span>
      </>
    );
  };

  const agreementPromotionsColumn = [
    {
      field: "code",
      header: "Code",
      id: "",
      index: "",
    },
    {
      field: "name",
      header: "Name",
      id: "",
      index: ""
    },
    {
      field: "membershipPlan.name",
      header: "Membership Plan",
      id: "",
      index: ""
    },
    {
      field: "startDate",
      header: "Start Date",
      id: "",
      index: "",
      body: (e) => dateTemplate('startDate', e)
    },
    {
      field: "endDate",
      header: "End Date",
      id: "",
      index: "",
      body: (e) => dateTemplate('endDate', e)
    },
    {
      field: "uses",
      header: "Uses",
      id: "",
      index: ""
    },
    {
      field: "promotionsType",
      header: "Promotions Type",
      id: "",
      index: ""
    },
    {
      field: "amount",
      header: "Amount",
      id: "",
      index: ""
    },
    {
      field: "",
      header: "",
      id: "",
      body: actionTemplate,
    },
  ];

  useEffect(() => {
    setInitialAgreementPromotionsData(initialAgreementPromotionsData);
    dispatch(getAgreementPromotions());
    dispatch(getMembershipPlans());
  }, []);

  const onClickChangePage = () => {
    setAgreementPromotions((prev) => !prev);
  };

  const handleChangeAgreement = ({ name, value }) => {
    // console.log(name, value)
    const formErrors = FormValidation(
      name,
      value,
      agreementPromotionsForm,
      required,
      initialAgreementPromotionsData
    );
    setAgreementPromotionsForm((prev) => {
      return {
        ...prev,
        [name]: value,
        formErrors
      }
    })
  };

  const save = () => {
    if (
      showAllFormErrors(agreementPromotionsForm, setAgreementPromotionsForm, required, initialAgreementPromotionsData)
    ) {
      if (editAgreementPromotions) {
        let payload = {
          ...agreementPromotionsForm
        }
        dispatch(updateAgreementPromotions(payload)).then((data) => {
          if (data.success) {
            dispatch(getAgreementPromotions());
            setAgreementPromotions(false);
            const myTimeout = setTimeout(() => {
              setAgreementPromotionsForm({ ...initialAgreementPromotionsData })
            }, 1000);
          }
        });
      } else {
        let payload = {
          ...agreementPromotionsForm
        }
        dispatch(addAgreementPromotionsAction(payload)).then((data) => {
          if (data.success) {
            dispatch(getAgreementPromotions());
            setAgreementPromotions(false);
            const myTimeout = setTimeout(() => {
              setAgreementPromotionsForm({ ...initialAgreementPromotionsData })
            }, 1000);
          }
        });
      }
    }
    else {
      console.log(agreementPromotionsForm)
      dispatch(
        showToast({
          severity: "error",
          summary: "Please Fill All Required Fields",
        })
      );
    }
  }

  return {
    addAgreementPromotions,
    onClickChangePage,
    agreementPromotionsColumn,
    allAgreementPromotionsData,
    handleChangeAgreement,
    agreementPromotionsForm,
    promotionsTypes,
    membershipPlans,
    save,
  }
}

export default AgreementPromotionContainer