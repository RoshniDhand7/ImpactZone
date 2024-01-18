import React, { useEffect } from 'react';
import CustomCard, { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { getCompanyDetails } from '../../../../redux/actions/BusinessSettings/companyActions';
import { useDispatch, useSelector } from 'react-redux';
import ProfileImg from '../../../../assets/icons/camera.png';
import { getImageURL } from '../../../../utils/imageUrl';

const Customization = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCompanyDetails());
    }, [dispatch]);
    let { allCompany } = useSelector((state) => state?.company);
    return (
        <>
            <CustomFilterCard buttonTitle="Edit Customization" linkTo="/settings/business/customization/edit" />
            <CustomCard col="12" title="Customization">
                <div className="flex">
                    <label className="text-align-center mt-2 mr-2">Logo</label>
                    <img
                        src={
                            allCompany?.logo
                                ? typeof allCompany?.logo === 'string'
                                    ? getImageURL(allCompany?.logo)
                                    : URL.createObjectURL(allCompany?.logo)
                                : ProfileImg
                        }
                        alt="logo"
                        style={{ width: '100px' }}
                    />
                </div>
            </CustomCard>
        </>
    );
};

export default Customization;
