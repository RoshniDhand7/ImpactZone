import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDocumentView } from '../../../../redux/actions/MembersPortal/memberPortalActions';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import CustomCard, { CustomListItem } from '../../../../shared/Cards/CustomCard';

const DocumentView = ({ viewData, setViewData, openViewModal, setOpenViewModal }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    useEffect(() => {
        if (openViewModal) {
            dispatch(
                getDocumentView(viewData?._id, (res) => {
                    setData({
                        name: res?.name,
                        govtId: res?.govtId,
                        type: res?.type,
                        details: res?.details ? [res?.details] : [],
                    });
                }),
            );
        }
        //eslint-disable-next-line
    }, [openViewModal]);
    return (
        <>
            <CustomDialog
                width="85vh"
                title={'Document'}
                visible={openViewModal}
                onCancel={() => {
                    setOpenViewModal(false);
                    setViewData(null);
                }}
                loading={false}
            >
                <CustomCard title="Details" col={12} height="250px">
                    <CustomListItem name="name" data={data} />
                    <CustomListItem name="govtId" data={data} />
                    <CustomListItem name="type" data={data} />
                    {data?.details?.length ? (
                        <div>
                            <div className="border-1 p-2 border-300">
                                <div className="grid align-items-center p-0 border-bottom-1 border-300">
                                    <div className="md:col-6 ">Name</div>
                                    <div className="md:col-6 ">File size</div>
                                </div>
                                <div className="grid align-items-center py-2">
                                    {Object.values(data?.details).map((file, i) => (
                                        <>
                                            <div className="md:col-6 text-main-color  " key={i}>
                                                {file.originalname}
                                            </div>
                                            <div className="md:col-6 text-main-color  ">{parseInt(file?.size)}kb</div>
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : null}
                </CustomCard>
            </CustomDialog>
        </>
    );
};

export default DocumentView;
