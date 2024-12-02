import React, { useState } from 'react';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomDropDown, CustomInput } from '../../../../shared/Input/AllInputs';
import CustomFilesInput from '../../../../shared/Input/CustomFilesInput';
import { uploadFiles1 } from '../../../../utils/commonFunctions';
import { addMemberDocuments, getDocuments } from '../../../../redux/actions/MembersPortal/memberPortalActions';
import { documentTypeOptions } from '../../../../utils/dropdownConstants';

const AddDocument = ({ document, setOpenDocument, dispatch, id }) => {
    const [loading, setLoading] = useState(false);
    const initialState = {
        name: '',
        govtId: '',
        type: '',
        details: '',
        url: '',
    };

    const [data, setData] = useState(initialState);
    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (data.details?.length) {
            let gurls = await uploadFiles1(data.details);
            data.details = gurls[0];
            data.url = gurls[0].path;
        } else {
            data.details = '';
        }
        dispatch(
            addMemberDocuments(id, data, setLoading, () => {
                dispatch(getDocuments(id));
                setData(initialState);
                setOpenDocument(false);
            }),
        );
    };
    return (
        <>
            <CustomDialog
                width="85vh"
                title={'Document'}
                visible={document}
                onCancel={() => {
                    setOpenDocument(false);
                }}
                loading={loading}
                onSave={handleSave}
            >
                <CustomGridLayout>
                    <CustomInput name="name" data={data} onChange={handleChange} />
                    <CustomInput name="govtId" data={data} onChange={handleChange} />
                    <CustomDropDown name="type" options={documentTypeOptions} data={data} onChange={handleChange} />
                    <CustomFilesInput
                        data={data}
                        onFilesChange={handleChange}
                        name="details"
                        label="Upload Document"
                        accept="image/*,.pdf"
                        disabled={false}
                        col="6"
                        uploadType="Image/Pdf"
                        originalName={data.details}
                    />
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default AddDocument;
