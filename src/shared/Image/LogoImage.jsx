import React, { useState, useEffect } from 'react';
import ProfileImg from '../../assets/icons/camera.png';
// import CameraIcon from '../../assets/icons/Vector.png';
import { getDefaultImage, getImageURL } from '../../utils/imageUrl';
import LogoImg from '../../assets/images/logo.png';

const CustomLogoImage = ({
    label,
    name,
    onFilesChange,
    errorMessage,
    extraClassName,
    value,
    data,
    col,
    required,
    imgclass,
    removeable,
    editable,
    uploadboxclass,
    uploadIcon,
    disabled = false,
    ...props
}) => {
    const [files, setFiles] = useState(value || data?.[name] || []);

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
            if (files.length) {
                onFilesChange({ name, value: files });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files, name]);

    const onFileChange = (e) => {
        const chossenFile = e.target.files;
        handlefileChange(Object.values(chossenFile));
    };
    const handlefileChange = (uploadedfile) => {
        let uploadedFiles = [];
        uploadedfile.forEach((file) => {
            if (files.findIndex((f) => f.name === file.name) === -1) {
                uploadedFiles.push(file);
            }
        });
        setFiles([...uploadedFiles]);
    };
    const onDelete = (id) => {
        const s = files.filter((item, index) => index !== id);
        setFiles([...s]);
    };

    return (
        <div>
            <input type="file" className=" " name={name} onChange={onFileChange} id={name} accept="image/*" hidden {...props} />
            {files.length ? (
                Object.values(files).map((image, i) => (
                    <>
                        {console.log(image)}
                        {removeable && <i onClick={() => onDelete(i)} className="pi pi-times cursor-pointer"></i>}
                        <img
                            src={image ? (typeof image === 'string' ? getImageURL(image) : URL.createObjectURL(image)) : ProfileImg}
                            onError={(e) => (e.target.src = getDefaultImage())}
                            alt="Image"
                            className={`profile-img relative btn-border-color ${imgclass}`}
                        />
                    </>
                ))
            ) : (
                <div
                    className="photo-upload flex justify-content-center align-items-center"
                    style={{
                        height: '95px',
                        width: '90px',
                    }}
                >
                    <label htmlFor={name}>
                        <img
                            className="w-full h-full fit-cover"
                            style={{ width: '50px' }}
                            src={ProfileImg}
                            onError={(e) => (e.target.src = getDefaultImage())}
                            alt=""
                        />
                    </label>
                </div>
            )}

            <div className="text-left ">
                {errorMessage || data?.formErrors?.[name] ? <small className="p-error">{errorMessage || data?.formErrors?.[name]}</small> : null}
            </div>
        </div>
    );
};

export default CustomLogoImage;
