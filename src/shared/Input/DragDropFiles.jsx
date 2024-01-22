import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const PhotoUpload = ({ name, value, data, onDropChange }) => {
    const [selectedImages, setSelectedImages] = useState(value || data?.[name] || []);

    useEffect(() => {
        if (value || data?.[name]) {
            if (JSON.stringify(value || data?.[name]) !== JSON.stringify(selectedImages)) {
                setSelectedImages(value || data?.[name]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value || data?.[name]]);

    useEffect(() => {
        if (onDropChange) {
            onDropChange({ name, value: selectedImages });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedImages, name]);

    const onDrop = useCallback(
        (acceptedFiles, rejectedFiles) => {
            if (rejectedFiles.length > 0) {
                console.log('Rejected Files:', rejectedFiles);
            } else {
                acceptedFiles.forEach((file) => {
                    const isFileAlreadySelected = selectedImages.some((selectedFile) => selectedFile.name === file.name);

                    if (!isFileAlreadySelected) {
                        setSelectedImages((prevState) => [...prevState, file]);
                    } else {
                        console.log(`File "${file.name}" is already selected.`);
                    }
                });
            }
        },
        [selectedImages],
    );

    console.log('selecetdImages>>', selectedImages);

    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
        },
    });

    const style = useMemo(
        () => ({
            ...(isDragAccept ? { borderColor: '#00e676' } : {}),
            ...(isDragReject ? { borderColor: '#ff1744' } : {}),
        }),
        [isDragAccept, isDragReject],
    );

    const removeImage = (index) => {
        setSelectedImages((prevState) => prevState.filter((_, i) => i !== index));
    };

    return (
        <>
            <div {...getRootProps({ style })} style={dropzoneStyle}>
                <input {...getInputProps()} />
                {isDragActive ? isDragReject ? <p>Only image files are allowed!</p> : <p>Drop the photo here...</p> : <p>Drag your photo here or Browse.</p>}
            </div>
            <div className="upload-image ">
                {selectedImages?.length > 0 &&
                    selectedImages?.map((image, index) => (
                        <div key={index} className="flex">
                            <img src={`${URL.createObjectURL(image)}`} alt="" />
                            <i className="pi pi-times" onClick={() => removeImage(index)}></i>
                        </div>
                    ))}
            </div>
        </>
    );
};

const dropzoneStyle = {
    border: '2px dashed #eeeeee',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
};

export default PhotoUpload;
