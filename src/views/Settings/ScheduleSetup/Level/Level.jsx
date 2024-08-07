import React, { useEffect } from 'react';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { deleteLevel, getLevels } from '../../../../redux/actions/ScheduleSettings/levelActions';
import { confirmDelete } from '../../../../utils/commonFunctions';
import PrimaryButton from '../../../../shared/Button/CustomButton';

const Level = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLevels());
    }, [dispatch]);

    const { allLevels } = useSelector((state) => state.level);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/schedule/levels/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteLevel(col._id, () => {}));
            },
            'Do you want to delete this Level ?',
            position,
        );
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Levels" linkTo="/settings/schedule/levels/add">
                {/* <div className="text-end w-full">
                    <PrimaryButton label="Scheduling Options" className="mx-2 " onClick={() => history.push('/settings/schedule/levels/scheduling/')} />
                </div> */}
            </CustomFilterCard>
            <CustomTable data={allLevels} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default Level;
