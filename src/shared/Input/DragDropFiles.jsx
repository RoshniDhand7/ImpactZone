import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Badge } from 'primereact/badge';
import { useDropzone } from 'react-dropzone';
import { getImageURL } from '../../utils/imageUrl';
import CustomAvatar from '../Avatar/Avatar';

const PhotoUpload = ({ name, value, data, onDropChange, multiple = true }) => {
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
            } else {
                acceptedFiles.forEach((file) => {
                    const isFileAlreadySelected = selectedImages.some((selectedFile) => selectedFile.name === file.name);

                    if (!isFileAlreadySelected) {
                        setSelectedImages((prevState) => [...prevState, file]);
                    } else {
                        // console.log(`File "${file.name}" is already selected.`);
                    }
                });
            }
        },
        [selectedImages],
    );

    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        onDrop,
        multiple,
        // maxFiles: 1,
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
                {isDragActive ? (
                    isDragReject ? (
                        <>
                            <CustomAvatar icon="pi pi-exclamation-triangle" className="bg-red-50" style={{ color: '#252B42' }} />
                            <p className="text-color-secondary font-medium text-lg">Only image files are allowed!</p>
                        </>
                    ) : (
                        <>
                            <CustomAvatar icon="pi pi-download" className="bg-green-50" style={{ color: '#252B42' }} />
                            <p className="text-color-secondary font-medium text-lg">Drop the photo here...</p>
                        </>
                    )
                ) : (
                    <>
                        <CustomAvatar icon="pi pi-file" style={{ backgroundColor: '#F2F5FE', color: '#252B42' }} />
                        <p className="text-color-secondary font-medium text-lg">Drag your photo here or browse.</p>
                    </>
                )}
            </div>
            <div className="flex flex-wrap my-2">
                {selectedImages?.length > 0 &&
                    selectedImages?.map((image, index) => (
                        <CustomAvatar className="p-overlay-badge my-2 mr-3" image={getImageURL(image)} size="xlarge">
                            <Badge value="X" icon="pi pi-fast-forward" severity="danger" className="cursor-pointer" onClick={() => removeImage(index)} />
                        </CustomAvatar>
                    ))}
            </div>
        </>
    );
};

const dropzoneStyle = {
    border: '2px dashed #eeeeee',
    borderRadius: '4px',
    padding: '60px',
    textAlign: 'center',
    cursor: 'pointer',
    background: '#fff',
};

export default PhotoUpload;
