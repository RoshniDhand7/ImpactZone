import React, { useEffect } from 'react';
import CustomCard, { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { useDispatch, useSelector } from 'react-redux';
import ProfileImg from '../../../../assets/icons/camera.png';
import { getImageURL } from '../../../../utils/imageUrl';
import { getCompanyDetail } from '../../../../redux/actions/Settings/Business/companyActions';

const Customization = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCompanyDetail());
    }, [dispatch]);
    let { company } = useSelector((state) => state?.settings.business);
    return (
        <>
            <CustomFilterCard buttonTitle="Edit Customization" linkTo="/settings/business/customization/edit" />
            <CustomCard col="12" title="Customization">
                <div className="flex">
                    <label className="text-align-center mt-2 mr-2">Logo</label>
                    <img
                        src={company?.logo ? (typeof company?.logo === 'string' ? getImageURL(company?.logo) : URL.createObjectURL(company?.logo)) : ProfileImg}
                        alt="logo"
                        style={{ width: '100px' }}
                    />
                </div>
            </CustomCard>
        </>
    );
};

export default Customization;
