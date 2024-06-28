import { useHistory, useParams } from "react-router-dom";
import CustomCard, { CustomGridLayout } from "../../shared/Cards/CustomCard";
import { useEffect, useState } from "react";
import { editSellPlan, getSellPlanMember } from "../../redux/actions/Plans/SellPlan";
import { useDispatch, useSelector } from "react-redux";
import { getMemberAction } from "../../redux/actions/Dashboard/Members";
import formValidation from "../../utils/validations";
import CustomImageInput from "../../shared/Input/CustomImageInput";
import { CustomInput } from "../../shared/Input/AllInputs";
import CustomFilesInput from "../../shared/Input/CustomFilesInput";
import PrimaryButton, { CustomButtonGroup, LightButton } from "../../shared/Button/CustomButton";
import { uploadFiles, uploadImages } from "../../utils/commonFunctions";

const IdentificationTab = ({ onTabEnable, planId, memberId }) => {

    console.log(memberId)
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [data, setData] = useState({
        driverLicense: [],
        govtId: [],
        accessCode: "",
        barCode: "",
        image: [],
    });
    const { getMember } = useSelector((state) => state.members);

    useEffect(() => {
        if (memberId) {
            getMemberIdentificationFn()
        }
    }, [dispatch, memberId,getMember]);

    useEffect(() => {
        dispatch(getMemberAction(memberId));
    }, [dispatch, memberId]);


    useEffect(()=>{
        if(planId){
            onTabEnable(planId,[0,1,2,3],memberId);
        }
    },[planId])


    const getMemberIdentificationFn = () => {
        if (getMember) {
            dispatch(
                getSellPlanMember(memberId, (data) => {
                    setData({
                        driverLicense: data.driverLicense?[data.driverLicense]:[],
                        govtId:data.govtId? [data.govtId]:[],
                        accessCode: data.accessCode,
                        barCode: getMember.barCode,
                        image: getMember.image  ? [getMember.image] : [data.image],
                    });
                }),
            );
        }
    }

    console.log(data, "data>>")
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data)
        setData((prev => ({ ...prev, [name]: value, formErrors })))
    }

    const handleNext = async() => {
        if (data?.image?.length) {
            let urls = await uploadImages(data.image);
            data.image = urls[0];
        } 

        if(data.driverLicense?.length){
            let durls = await uploadFiles(data.driverLicense);
            data.driverLicense = durls[0].path;
        }
       

        if(data.govtId?.length){
            let gurls = await uploadFiles(data.govtId);
            data.govtId = gurls[0].path;
        }
       
      
        const payload = {
            ...data,
            type:"next",
            accessCode:data.accessCode
        }
        dispatch(editSellPlan(planId, payload, () => {
            getMemberIdentificationFn();
            onTabEnable(planId, [0, 1, 2, 3], memberId);
            history.replace(`/plans/sell-plan/${id}/?tab=agreement`);

        }))
    }
    return <>
        <CustomCard col="12" title="Personal">
            <CustomGridLayout>
                <div className="avatar-img">
                    <CustomImageInput name="image" data={data} onFilesChange={handleChange} required editable={true} />
                </div>
                <CustomInput name="accessCode" required data={data} onChange={handleChange} />
                <CustomInput name="barCode" required data={data} onChange={handleChange} disabled />
                <CustomFilesInput
                    data={data}
                    onFilesChange={handleChange}
                    name="driverLicense"
                    label="Upload Driver Licence"
                    accept="image/*,.pdf"
                    disabled={false}
                    removeable
                    editable
                    col="12"
                />
                <CustomFilesInput
                    data={data}
                    onFilesChange={handleChange}
                    name="govtId"
                    label="Upload Government/School Ids"
                    accept="image/*,.pdf"
                    disabled={false}
                    removeable
                    editable
                    col="12"
                />
            </CustomGridLayout>
            <CustomButtonGroup>
                <PrimaryButton label="Next" className="mx-2" onClick={handleNext} />
                <PrimaryButton label="Save & Hold" className="mx-2" />
                <PrimaryButton label="Sign Agreement" className="mx-2" />
                <LightButton label="Cancel" />
            </CustomButtonGroup>
        </CustomCard></>
}
export default IdentificationTab;