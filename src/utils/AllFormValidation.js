import React from 'react'
import { FirstletterUpperCase, equal, length } from './javascript';
import { emailValidation, passwordValidation } from './regex';

const FormValidation = (name,value,data,required,initialData) => {
    console.log("name Inside form",name,value)
    let formErrors = {...data.formErrors};
    switch (name) {
        case "email":
            if (equal(length(value))) {
                formErrors[name] = `${FirstletterUpperCase(name)} is required!`;
            } else if (!emailValidation(value)) {
                formErrors[name] = `Please enter valid email!`;
            } else {
                formErrors[name] = "";
            }
            
            break;

            case "password":
                if (equal(length(value))) {
                    formErrors[name] = `${FirstletterUpperCase(name)} is required!`;
                } else if (!passwordValidation(value)) {
                    formErrors[name] = `Please enter a password with 8-16 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character`;
                } else {
                    formErrors[name] = "";
                }
                break;

            case name:
                if(name!=formErrors && required.includes(name) ){
                    console.log("typeof initialData[name] == typeof value",typeof initialData[name] === typeof value,typeof initialData[name],typeof value,initialData[name])
                    if(typeof value==="object" && value!=null && !Array.isArray(value) && typeof initialData[name] == typeof value && initialData[name]!==null){
                        // console.log("value",value)
                        // if(Array.isArray(value)){
                        //     console.log("arrayy",value)
                        //     if (equal(length(value)) || value==null) {
                        //         formErrors[name] = `${FirstletterUpperCase(name)} is required!`;
                        //     } else {
                        //         formErrors[name] = "";
                        //     }
                            
                        // }
                        // else{
                            Object.keys(value).map((item)=>{
                                console.log("item",item,value[item])
                                console.log("check",equal(length(value[item])))
                                // if(value[item]==null){
                                //     if(value[item]==null){
                                //         formErrors[name] = {
                                //             ...formErrors[name],
                                //             [item] : `${FirstletterUpperCase(item)} is required!`
                                //         }
                                //         // formErrors[name][item] = `${FirstletterUpperCase(name)} is required!`;
                                //     }
                                //     else{
                                //         formErrors[name] = {
                                //             ...formErrors[name],
                                //             [item] : null
                                //         }
                                //     }
                                // }else{
                                    if(equal(length(value[item])) || value[item]==null){
                                        formErrors[name] = {
                                            ...formErrors[name],
                                            [item] : `${FirstletterUpperCase(item)} is required!`
                                        }
                                        // formErrors[name][item] = `${FirstletterUpperCase(name)} is required!`;
                                    }
                                    else{
                                        console.log("iam here in elsepart")
                                        formErrors[name] = {
                                            ...formErrors[name],
                                            [item] : ""
                                        }
                                        console.log("after set",formErrors)
                                    }
                                // }
                               
                            })
                        // }
                    }else{
                        console.log("nextttt",formErrors)
                        if (equal(length(value)) || value==null) {
                            formErrors[name] = `${FirstletterUpperCase(name)} is required!`;
                        } else {
                            // console.log("name,value",name,value,initialData)
                            // if(typeof initialData[name] == "object"){
                            //     formErrors[name] = null;
                            // }
                            // else{
                                formErrors[name] = "";
                            // }
                            
                        }
                    }
                    
                    break;
                }
                else{
                    break;
                }
                    
    
        default:
            break;
    }
    console.log("lastformerror",formErrors)
  return formErrors
}

export default FormValidation