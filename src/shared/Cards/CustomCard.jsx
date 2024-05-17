import React from 'react';
import { capitalizeCamelCase } from '../../utils/commonFunctions';
import PrimaryButton from '../Button/CustomButton';
import { useHistory } from 'react-router-dom';
import { OverlayPanel } from 'primereact/overlaypanel';

export default function CustomCard({ title, children, col = 6, height }) {
    return (
        <div className={`col-12 md:col-${col}`}>
            <div className="bg-primary-dark border-round shadow-2 p-3">
                <div className="text-xl text-white">{title}</div>
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
        value = '-';
        if (typeof data[name] === 'boolean' && data[name]) {
            value = 'Yes';
        } else if (typeof data[name] === 'boolean' && !data[name]) {
            value = 'No';
        } else {
            value = data[name] ? data[name] : '-';
        }
    }

    return (
        <div className="flex justify-content-between text-sm mb-2">
            <span className="font-semibold ">{label}</span>
            <span className="text-dark-gray">{value}</span>
        </div>
    );
}

export function CustomFilterCard({ children, buttonTitle, linkTo, onClick, extraClass, title }) {
    const history = useHistory();
    return (
        <div className="border-round p-2 mt-2 ">
            <div className={`flex justify-content-between ${extraClass}`}>
                <div>{children}</div>
                <div>{title}</div>
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
