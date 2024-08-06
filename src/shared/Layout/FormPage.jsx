import React from 'react';
import { useHistory } from 'react-router-dom';
import CustomTransition from '../Transitions/CustomTransition';

export default function FormPage({ children, backText, backTo, isConfirm = true, confirmFn }) {
    const history = useHistory();

    const onBack = (event) => {
        if (backTo && isConfirm) {
            history.replace(backTo);
        }
        if (!isConfirm) {
            confirmFn(event);
        } else {
            history.goBack();
        }
    };
    return (
        <CustomTransition>
            {backText ? (
                <div className="flex mb-3 text-dark-gray">
                    <i className="pi pi-angle-left text-2xl cursor-pointer" onClick={onBack}></i>
                    <div className=" my-auto font-semibold text-lg cursor-pointer" onClick={onBack}>
                        Back to {backText}
                    </div>
                </div>
            ) : null}
            <>{children}</>
        </CustomTransition>
    );
}
