import React, { useEffect, useState } from 'react';
import { CustomDropDown } from '../shared/Input/AllInputs';
import CustomDialog from '../shared/Overlays/CustomDialog';
import useGetClubs from '../hooks/useGetClubs';
import { useDispatch, useSelector } from 'react-redux';
import { onClubAction } from '../redux/actions/profileAction';
import { getCatalogItems } from '../redux/actions/POS/catalogActions';

const ChangeClub = ({ openClub, setOpenClub }) => {
    const dispatch = useDispatch();
    const { clubsDropdown } = useGetClubs();
    const { club } = useSelector((state) => state.profile);

    useEffect(() => {
        if (club) {
            setData({ club });
        }
    }, [club]);

    const [data, setData] = useState({
        club: '',
    });
    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        dispatch(onClubAction(data?.club));
        localStorage.setItem('club', data?.club);
        dispatch(getCatalogItems());
        setOpenClub(false);
    };
    return (
        <>
            <CustomDialog
                visible={openClub}
                onCancel={() => {
                    setOpenClub(false);
                    setData({ club });
                }}
                position="top"
                width="50vw"
                contentclassname="pb-2"
                onSave={handleSave}
                saveLabel="Change Club"
            >
                <div>
                    <CustomDropDown name="club" data={data} onChange={handleChange} col="12" options={clubsDropdown} />
                </div>
            </CustomDialog>
        </>
    );
};

export default ChangeClub;
