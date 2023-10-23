import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DeleteAgreementCategory, UpdateAgreementCategory, addAgreementCategoryAction, getAgreementCategory } from '../../../../redux/actions/agreementCategoryAction';
import { useEffect } from 'react';
import { confirmDialog } from "primereact/confirmdialog";
import { showToast } from '../../../../redux/actions/toastAction';
import { showAllFormErrors } from '../../../../utils/commonFunctions';
import FormValidation from '../../../../utils/AllFormValidation';

const AgreementCategoriesContainer = () => {
    const dispatch = useDispatch()
    const allAgreementCategoryData = useSelector((state)=>state.AgreementCategory.AllAgreementCategory)
    const [addAgreementCategories, setAgreementCategories] = useState(false);
    const [initialAgreementCategoryData,setInitialAgreementCategoryData] = useState({})
    const [editAgreementCategory,setEditAgreementCategory] = useState(null)
    const [required, setRequired] = useState(["name"]);
    const [agreementCategoryForm,setAgreementCategoryForm] = useState({
      isActive:true,
        name:"",
        subCategories:["",]
    })
    

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
        dispatch(DeleteAgreementCategory(id)).then((data) => {
          if (data.success) {
            dispatch(getAgreementCategory());
          }
        });
      };
    
      const reject = () => {};

    const actionTemplate = (col) => {
        // console.log(col._id, "collllll");
        return (
          <>
            <div className="flex justify-content-end">
              <span onClick={()=>setEditAgreementCategory(col)}>
                <i className="pi pi-pencil mr-3 cursor-pointer"></i>
              </span>
              <span onClick={() => deleteConfirm(col?._id)}>
                <i className="pi pi-trash cursor-pointer"></i>
              </span>
            </div>
          </>
        );
      };

      console.log("editcategory",editAgreementCategory)

const subcategoryTemplate = (rowData) => {
    return(
<div>{rowData?.subCategories?.length}</div>
    )
}

    const agreementCategoriesColumn = [
        {
          field: "name",
          header: "Agreement Category",
          id: "",
          index: "",
        },
        {
          field: "agreements",
          header: "Agreements #",
          id: "",
          index: "",
          body: subcategoryTemplate
        },
    
        {
          field: "",
          header: "",
          id: "",
          body: actionTemplate,
        },
      ];


      const onClickChangePage = () => {
        setAgreementCategories((prev) => !prev);
        if(editAgreementCategory){
            setEditAgreementCategory(null)
            setAgreementCategoryForm({...initialAgreementCategoryData})
          }
      };

      const handleChangeAgreement = ({name,value}) => {
        const formErrors = FormValidation(
          name,
          value,
          agreementCategoryForm,
          required,
          initialAgreementCategoryData
        );
        setAgreementCategoryForm((prev)=>{
            return{
                ...prev,
                [name]:value,
                formErrors
            }
        })
      }

      const handleChangeSubCategory = ({index,value}) => {
        const formErrors = FormValidation(
          "subCategories",
          value,
          agreementCategoryForm,
          required,
          initialAgreementCategoryData
        );
        let array = [...agreementCategoryForm.subCategories]
        array.splice(index,1,value)
        setAgreementCategoryForm((prev)=>{
            return {
                ...prev,
                subCategories:array,
                formErrors
            }
        })
      }

      const handleChangeSubCategoryDelete = ({index,value}) => {
        let array = [...agreementCategoryForm.subCategories]
        array.splice(index,1)
        setAgreementCategoryForm((prev)=>{
            return {
                ...prev,
                subCategories:array
            }
        })
      }

      const addSubCategory = () => {
        let array = [...agreementCategoryForm.subCategories]
        array.push("");
        setAgreementCategoryForm((prev)=>{
            return {
                ...prev,
                subCategories:array
            }
        })

      }

      const save = () => {
        if (
          showAllFormErrors(agreementCategoryForm, setAgreementCategoryForm, required, initialAgreementCategoryData)
        ) {
        if(editAgreementCategory){
          let newCategory = agreementCategoryForm.subCategories.filter((item)=>{return item!=''})
          let payload = {
            ...agreementCategoryForm,
            subCategories:newCategory
          }
            dispatch(UpdateAgreementCategory(payload)).then((data)=>{
                if (data.success) {
                  dispatch(getAgreementCategory());
                  const myTimeout = setTimeout(() => {
                    setAgreementCategories(false);
                    setAgreementCategoryForm({...initialAgreementCategoryData})
                  }, 1000);
                }
              });
        }else{
          let newCategory = agreementCategoryForm.subCategories.filter((item)=>{return item!=''})
          let payload = {
            ...agreementCategoryForm,
            subCategories:newCategory
          }
            dispatch(addAgreementCategoryAction(payload)).then((data)=>{
                if (data.success) {
                  dispatch(getAgreementCategory());
                  const myTimeout = setTimeout(() => {
                    setAgreementCategories(false);
                    setAgreementCategoryForm({...initialAgreementCategoryData})
                  }, 1000);
                }
              });
        }
      }
      else{
        dispatch(
          showToast({
            severity: "error",
            summary: "Please Fill All Required Fields",
          })
        );
      }
      }

      useEffect(() => {
        if(editAgreementCategory){
          let obj = {
            ...editAgreementCategory,
        name: editAgreementCategory.name,
        subCategories: editAgreementCategory.subCategories,
          }
          setAgreementCategoryForm(obj)
          setAgreementCategories(true)
        }
      }, [editAgreementCategory])


      useEffect(() => {
        setInitialAgreementCategoryData(agreementCategoryForm)
        dispatch(getAgreementCategory())
      }, [])
      
console.log("form",agreementCategoryForm)

  return {
    agreementCategoriesColumn,
    allAgreementCategoryData,
    addAgreementCategories,
    onClickChangePage,
    agreementCategoryForm,
    handleChangeAgreement,
    addSubCategory,
    handleChangeSubCategory,
    handleChangeSubCategoryDelete,
    save
  }
}

export default AgreementCategoriesContainer