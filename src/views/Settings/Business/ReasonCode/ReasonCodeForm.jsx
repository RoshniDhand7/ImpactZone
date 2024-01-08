import React from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, {
  CustomGridLayout,
} from '../../../../shared/Cards/CustomCard';
import { CustomInput } from '../../../../shared/Input/AllInputs';
import PrimaryButton, {
  CustomButtonGroup,
  LightButton,
} from '../../../../shared/Button/CustomButton';

export default function ReasonCodeForm({ history }) {
  return (
    <div>
      <FormPage backText="Reason Codes" backTo="/settings/business">
        <CustomCard col="12" title="Active">
          <CustomGridLayout>
            <CustomInput name="Reason Code" />
          </CustomGridLayout>
        </CustomCard>
        <CustomButtonGroup>
          <PrimaryButton label="Save" className="mx-2" />
          <LightButton
            label="Cancel"
            onClick={() => history.replace('/settings/business')}
          />
        </CustomButtonGroup>
      </FormPage>
    </div>
  );
}
