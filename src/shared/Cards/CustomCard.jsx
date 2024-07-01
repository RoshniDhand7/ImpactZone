import React from 'react';
import { capitalizeCamelCase } from '../../utils/commonFunctions';
import PrimaryButton, { CustomButton } from '../Button/CustomButton';
import { useHistory } from 'react-router-dom';
import { OverlayPanel } from 'primereact/overlaypanel';

export default function CustomCard({ title, button, name, children, col = 6, height, extraClassName, onClick }) {
    return (
        <div className={`col-12 md:col-${col} ${extraClassName}`}>
            <div className={`bg-primary-dark border-round shadow-2 ${name ? 'p-2' : 'p-3'} ${name ? 'flex justify-content-between align-items-center' : ''}`}>
                <div className="text-xl text-white justify-content-end align-items-end">{title}</div>
                {name && (
                    <CustomButton
                        icon={name === 'Edit' ? 'pi pi-pencil' : 'pi pi-plus'}
                        className="p-1 border-gray-200 text-sm gap-2 px-3 p-2 text-white justify-content-end align-items-end"
                        onClick={onClick}
                        outlined={true}
                    >
                        {name}
                    </CustomButton>
                )}
            </div>
            <div className="bg-lightest-blue border-round p-2 mt-2 " style={{ height: height, overflowY: 'auto' }}>
                <div className="p-2">{children}</div>
            </div>
        </div>
    );
}

export const CustomOverlay = React.forwardRef(({ children, col }, ref) => {
    return (
        <div className={`col-6 md:col-${col}`}>
            <div className={` flex justify-content-center `}>
                <OverlayPanel ref={ref} style={{ width: '50%' }}>
                    {children}
                </OverlayPanel>
            </div>
        </div>
    );
});
export function CustomGridLayout({ children, extraClass }) {
    return <div className={`grid ${extraClass}`}>{children}</div>;
}
export function CustomListItem({ label, name, data, value, keys, dynamicKey }) {
    console.log('bb>>', data, name);
    if (!label) {
        if (name) {
            label = capitalizeCamelCase(name);
        }
    }
    const formatValue = (val) => {
        if (typeof val === 'boolean') {
            return val ? 'Yes' : 'No';
        }
        if (val && typeof val === 'object') {
            console.log(val, 'val');
            if (val.name) {
                // Check if the object has a 'name' key
                return val.name;
            }
            return JSON.stringify(val);
        }
        return val ? val : '-';
    };

    let displayValue = '-';
    if (value) {
        console.log(value, 'value');
        displayValue = formatValue(value);
    } else if (keys && Array.isArray(keys)) {
        const values = keys.map((key) => formatValue(key[dynamicKey])).join(', ');
        displayValue = values ? values : '-';
        console.log(values, 'values');
    } else {
        console.log(data[name], 'data[name]');
        displayValue = formatValue(data[name]);
    }

    return (
        <div className="flex justify-content-between text-sm mb-2">
            <span className="font-semibold ">{label}</span>
            <span className="text-dark-gray cstmValue">{displayValue}</span>
        </div>
    );
}

export function CustomFilterCard({ children, buttonTitle, linkTo, onClick, extraClassName, title, titleClassName, contentPosition = 'between' }) {
    const history = useHistory();
    return (
        <div className="border-round p-2 mt-2 ">
            <div className={`flex align-items-center justify-content-${contentPosition} ${extraClassName}`}>
                {title && <div className={titleClassName}>{title}</div>}
                <div>{children}</div>
                {buttonTitle ? (
                    linkTo ? (
                        <PrimaryButton label={buttonTitle} onClick={() => history.push(linkTo)} />
                    ) : (
                        <PrimaryButton label={buttonTitle} onClick={onClick} />
                    )
                ) : null}
            </div>
        </div>
    );
}

export function CustomSearchCard({ children, extraClass }) {
    return (
        <div className="bg-lightest-blue border-round p-2 mb-3">
            <div className={` flex justify-content-between ${extraClass}`}>{children}</div>
        </div>
    );
}
export function CustomFilterCard1({ children, buttonTitle, linkTo, onClick, extraClass }) {
    const history = useHistory();
    return (
        <div className="bg-lightest-blue border-round p-2 mt-2 mb-3">
            <div className={`flex ${extraClass}`}>
                {buttonTitle ? (
                    linkTo ? (
                        <PrimaryButton label={buttonTitle} onClick={() => history.push(linkTo)} />
                    ) : (
                        <PrimaryButton label={buttonTitle} onClick={onClick} />
                    )
                ) : null}
                <div>{children}</div>
            </div>
        </div>
    );
}
