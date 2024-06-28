import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Cross from "../../assets/icons/cross.png";
import uploadicon from "../../assets/icons/uploadicon.png";
import { showToast } from "../../redux/actions/toastAction";
import { Inplace, InplaceDisplay, InplaceContent } from "primereact/inplace";
import { InputText } from "primereact/inputtext";
import InputLayout from "../Form/InputLayout";

export default function CustomFilesInput({
    label,
    name,
    onFilesChange,
    errorMessage,
    extraClassName,
    value,
    data,
    limit,
    multiple,
    accept,
    uploadType,
    col,
    required,
    removeable,
    editable,
    disabled= false,
    ...props
}) {
    const [files, setFiles] = useState(value || data?.[name] || []);
    const dispatch = useDispatch();

    useEffect(() => {
        if (value || data?.[name]) {
            if (JSON.stringify(value || data?.[name]) !== JSON.stringify(files)) {
                setFiles(value || data?.[name]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value || data?.[name]]);

    useEffect(() => {
        if (onFilesChange) {
            onFilesChange({ name, value: files });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files, name]);

    const onDelete = (id) => {
        if (editable) {
            const s = files.filter((item, index) => index !== id);
            setFiles([...s]);
        }
    };

    const onFileChange = (e) => {
        if (editable) {
            const chossenFile = e.target.files;
            handlefileChange(Object.values(chossenFile));
        }
    };
    const handlefileChange = (uploadedfile) => {
        let uploadedFiles = [];
        uploadedfile.forEach((file) => {
            if (files.findIndex((f) => f.name === file.name) === -1) {
                uploadedFiles.push(file);
            }
        });
        if (multiple) {
            if (limit) {
                let newarr = [...files, ...uploadedFiles];
                if (newarr.length > limit) {
                    newarr = newarr.slice(0, limit);
                    dispatch(showToast({ severity: "warn", summary: "Limit Exceeded", detail: `Max. file limit is ${limit}.` }));
                }
                setFiles(newarr);
            } else {
                setFiles([...files, ...uploadedFiles]);
            }
        } else {
            setFiles([...uploadedFiles]);
        }
    };

    const changeName = (value, i) => {
        let newArr = [...files];
        newArr[i].originalname = value;
        setFiles(newArr);
    };

    console.log(files)

    return (
        <>
            <input
                name={name}
                onClick={(e) => (e.target.value = "")}
                type="file"
                id={name}
                onChange={onFileChange}
                multiple={multiple}
                accept={accept}
                {...props}
                disabled={disabled}
                hidden
            />
            <InputLayout
                col={col || 12}
                label={label}
                name={name}
                required={required}
                extraClassName={extraClassName}
                data={data}
                errorMessage={errorMessage}
                
            >
                {!files.length ? (
                    <>
                        <label htmlFor={name} icon="pi pi-cloud-upload" className="p-button" style={ disabled ? { pointerEvents: "none",width:"30px",height:"20px" } : {}}>
                            <img className="uploadicon" src={uploadicon} alt="" /> &nbsp; 
                        </label>
                        <br />
                        {accept ? <small>Upload only {uploadType || accept}</small> : null}
                    </>
                ) : null}

                {files.length ? (
                    <div>
                        <div className="border-1 p-2 border-300">
                            <div className="grid align-items-center p-0 border-bottom-1 border-300">
                                <div className="md:col-3 text-center">Name</div>
                                <div className="md:col-3 text-center">File size</div>
                                <div className="md:col-3 text-center">Date modified</div>
                                {/* <div className="md:col-3 text-center">
                                    <label htmlFor="files">
                                        <img src={UploadBlack} alt="" width="30" />
                                        Upload New
                                    </label>
                                </div> */}
                            </div>
                            {Object.values(files).map((file, i) => (
                                <div className="grid align-items-center p-2" key={i}>
                                    <div className="md:col-6 text-main-color text-center ">
                                        {file?.path ? (
                                            <Inplace>
                                                <InplaceDisplay>{file.originalname}</InplaceDisplay>
                                                <InplaceContent closeIcon="pi pi-check">
                                                    <InputText
                                                        value={file.originalname}
                                                        onChange={(e) => changeName(e.target.value, i)}
                                                        autoFocus
                                                    />
                                                </InplaceContent>
                                            </Inplace>
                                        ) : (
                                            file
                                        )}
                                    </div>
                                    {file?.path&&<div className="md:col-3 text-main-color text-center">{parseInt(file?.size / 1024)}kb</div>}
                                    {/* <div className="md:col-3 text-main-color text-center">{getDate(file?.lastModified)}</div> */}
                                    {/* <div className="md:col-3 text-main-color text-center">
                                        <img className="pointer" onClick={() => onDelete(i)} src={Cross} alt="" style={{width:"15px"}}  />
                                    </div> */}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
            </InputLayout>
        </>
    );
}
