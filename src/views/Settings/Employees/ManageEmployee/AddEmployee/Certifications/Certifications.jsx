import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../../../shared/Table/CustomTable';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteCertificates, getCertificates } from '../../../../../../redux/actions/EmployeeSettings/certificationAction';
import { useParams } from 'react-router-dom';
import { confirmDelete } from '../../../../../../utils/commonFunctions';

const Certifications = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        dispatch(getCertificates(id));
    }, [dispatch]);

    const { allCertificates } = useSelector((state) => state.certificates);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'certificateNumber', header: 'Cerificate Number' },
        { field: 'description', header: 'Description' },
        { field: 'issuer', header: 'Issuer' },
        { field: 'acquiredDate', header: 'Acquired Date' },
        { field: 'expirationDate', header: 'Expiration Date' },
    ];
    const onEdit = (col) => {
        history.push(`/settings/employee/manage-employee/edit/${col._id}/certifications/${id}`);
    };
    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteCertificates(col._id, () => {}));
            },
            'Do you want to delete this Certificates ?',
            position,
        );
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Certifications" linkTo={`/settings/employee/manage-employee/add/certifications/${id}`} />
            <CustomTable data={allCertificates} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default Certifications;
