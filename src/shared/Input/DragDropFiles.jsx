import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const PhotoUpload = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length > 0) {
            console.log('Rejected Files:', rejectedFiles);
        } else {
            acceptedFiles.forEach((file) => {
                setSelectedImages((prevState) => [...prevState, file]);
            });
        }
    }, []);

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

    return (
        <>
            <div {...getRootProps({ style })} style={dropzoneStyle}>
                <input {...getInputProps()} />
                {isDragActive ? isDragReject ? <p>Only image files are allowed!</p> : <p>Drop the photo here...</p> : <p>Drag your photo here or Browse.</p>}
            </div>
            <div className="upload-image">
                {selectedImages?.length > 0 && selectedImages?.map((image, index) => <img src={`${URL.createObjectURL(image)}`} key={index} alt="" />)}
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
