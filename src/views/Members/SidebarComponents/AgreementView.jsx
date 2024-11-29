import { useEffect, useState } from 'react';
import CustomCard, { CustomListItem } from '../../../shared/Cards/CustomCard';
import CustomDialog from '../../../shared/Overlays/CustomDialog';
import { getAgreementView } from '../../../redux/actions/MembersPortal/memberPortalActions';
import { useParams } from 'react-router-dom';

const AgreementView = ({ openModal, setOpenModal }) => {
    const [data, setData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        getAgreementView(id, setData);
    }, []);

    return (
        <CustomDialog
            visible={openModal}
            onCancel={() => {
                setOpenModal(false);
            }}
            position="top"
            width="75vw"
            contentclassname="pb-2"
            title="Find Member"
        >
            <CustomCard
                title="Relationships"
                col={6}
                name="Edit"
                // onClick={() => {
                //     setVisiblePersonal(id);
                // }}
                height="250px"
            >
                <CustomListItem label="Pays for" data={data} />
                <CustomListItem label="Pays by" data={data} />
                <CustomListItem label="Shares w/" data={data} />
            </CustomCard>
        </CustomDialog>
    );
};

export default AgreementView;
