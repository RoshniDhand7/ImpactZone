import ProfileDetail from './ProfileDetail';
import TopLayout from './TopLayout';
import CustomTable from '../../../shared/Table/CustomTable';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { editMemberAction, getDocuments } from '../../../redux/actions/MembersPortal/memberPortalActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CustomFilterCard, CustomGridLayout } from '../../../shared/Cards/CustomCard';
import CustomDialog from '../../../shared/Overlays/CustomDialog';
import { CustomDropDown, CustomInput } from '../../../shared/Input/AllInputs';
import { documentTypeOptions } from '../../../utils/dropdownConstants';
import CustomFilesInput from '../../../shared/Input/CustomFilesInput';
import { uploadFiles } from '../../../utils/commonFunctions';

const Documents = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const documents = useSelector((state) => state.membersPortal.documents);
    const [document, setOpenDocument] = useState(false);
    const columns = [
        { field: 'member', header: 'Member Name' },
        { field: 'name', header: 'File Name' },
        { field: 'govtId', header: 'Govt Id' },
        { field: 'type', header: 'Type' },
        { field: 'createdAt', header: 'Created At', body: (r) => moment(r?.createdAt).format('DD-MM-YYYY') },
        // { field: 'url', header: 'Renewal Frequency', body: () => '-' },
    ];

    useEffect(() => {
        dispatch(getDocuments(id));
    }, []);

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
            let gurls = await uploadFiles(data.details);
            data.details = gurls[0];
            data.url = gurls[0].path;
        } else {
            data.details = '';
        }
        dispatch(
            editMemberAction(id, data, () => {
                dispatch(getDocuments(id));
                setData(initialState);
                setOpenDocument(false);
            }),
        );
    };

    console.log(data, 'data');

    return (
        <div>
            <ProfileDetail />
            <TopLayout />
            <CustomFilterCard buttonTitle="Add Documents" contentPosition="end" onClick={() => setOpenDocument(true)}></CustomFilterCard>
            <CustomTable
                data={documents}
                columns={columns}
                onView={(data) => {
                    console.log('view data', data);
                }}
            />
            <CustomDialog
                width="85vh"
                title={'Document'}
                visible={document}
                onCancel={() => {
                    setOpenDocument(false);
                }}
                loading={false}
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
        </div>
    );
};

export default Documents;
