import React from 'react';
import { capitalizeCamelCase } from '../../utils/commonFunctions';
import PrimaryButton from '../Button/CustomButton';
import { useHistory } from 'react-router-dom';

export default function CustomCard({ title, children, col = 6, height }) {
  return (
    <div className={`col-12 md:col-${col}`}>
      <div className="bg-primary-dark border-round shadow-2 p-3">
        <div className="text-xl text-white">{title}</div>
      </div>
      <div
        className="bg-lightest-blue border-round p-2 mt-2 "
        style={{ height: height, overflowY: 'auto' }}
      >
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
}
export function CustomGridLayout({ children }) {
  return <div className="grid">{children}</div>;
}
export function CustomListItem({ label, name, data, value }) {
  if (!label) {
    if (name) {
      label = capitalizeCamelCase(name);
    }
  }

  if (typeof value === 'boolean') {
    if (value) {
      value = 'Yes';
    } else {
      value = 'No';
    }
  } else if (!value) {
    value = data[name];
    if (typeof data[name] === 'boolean' && data[name]) {
      value = 'Yes';
    } else if (typeof data[name] === 'boolean' && !data[name]) {
      value = 'No';
    } else {
      value = data[name];
    }
  } else {
    value = value;
  }

  return (
    <div className="flex justify-content-between text-sm mb-2">
      <span className="font-semibold ">{label}</span>
      <span className="text-dark-gray">{value}</span>
    </div>
  );
}

export function CustomFilterCard({ children, buttonTitle, linkTo, onClick }) {
  const history = useHistory();
  return (
    <div className="bg-lightest-blue border-round p-2 mt-2 mb-3">
      <div className="flex justify-content-between">
        <div>{children}</div>
        {buttonTitle ? (
          linkTo ? (
            <PrimaryButton
              label={buttonTitle}
              onClick={() => history.push(linkTo)}
            />
          ) : (
            <PrimaryButton label={buttonTitle} onClick={onClick} />
          )
        ) : null}
      </div>
    </div>
  );
}
