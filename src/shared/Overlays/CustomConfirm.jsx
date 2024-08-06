import { confirmDialog } from 'primereact/confirmdialog';

const CustomConfirm = (message, accept, reject) => {
    const confirm = (event) => {
        confirmDialog({
            // target: event.currentTarget,
            message,
            position: 'center',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
            reject,
            showHeader: false,
            contentClassName: 'pt-4',
        });
    };

    return { confirm };
};

export default CustomConfirm;
