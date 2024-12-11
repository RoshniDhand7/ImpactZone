import React, { useEffect } from 'react';
import CustomCard, { CustomFilterCard } from '../../../shared/Cards/CustomCard';
import { useDispatch, useSelector } from 'react-redux';
import { editTaskAction, getTaskAction } from '../../../redux/actions/CheckIn/CheckIn';
import { CustomCheckbox } from '../../../shared/Input/AllInputs';
import { DataView } from 'primereact/dataview';
import { dateConversions, formatLetter } from '../../../utils/commonFunctions';
import FormPage from '../../../shared/Layout/FormPage';

const Tasks = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTaskAction());
    }, [dispatch]);

    let task = useSelector((state) => state?.checkin?.task);

    const handleEditStatus = (id, active) => {
        task = task?.map((item) => {
            if (item._id === id) {
                dispatch(editTaskAction(item?._id, { status: active ? 'COMPLETED' : 'PENDING' }));
                return { ...item, status: 'COMPLETED' };
            } else {
                return { ...item, status: 'PENDING' };
            }
        });
    };

    const itemTemplate = (item, index) => {
        return (
            <div className="col-12 grid py-2  " key={item?._id}>
                <div className="col-1 my-auto">
                    <CustomCheckbox name="status" col="4" checked={item?.status === 'COMPLETED'} onChange={(e) => handleEditStatus(item._id, e.value)} />
                </div>
                <div className="col-10">{renderRow(item, index)}</div>
            </div>
        );
    };

    const renderRow = (item, index) => {
        return (
            <div className="flex">
                <div className="mx-3 flex w-5">
                    <div className="mx-3">
                        <div className="font-medium ">Deadline</div>
                        <div>{dateConversions(item?.dueDate)}</div>
                    </div>
                </div>
                <div className="mx-3">
                    <div className="font-medium ">Task Title</div>
                    <div>{item?.taskTitle}</div>
                </div>
                <div className="mx-3">
                    <div className="font-medium ">Task Type</div>
                    <div>{formatLetter(item?.taskType)}</div>
                </div>
                <div className="mx-3">
                    <div className="font-medium ">Member</div>
                    <div>{item?.member}</div>
                </div>
            </div>
        );
    };
    return (
        <FormPage backText="Members">
            <CustomCard title="Task" col="12">
                <CustomFilterCard buttonTitle="Add Task" linkTo="/more/members/tasks/add" contentPosition="end" />
                <DataView value={task} itemTemplate={itemTemplate} paginator rows={5} />
            </CustomCard>
        </FormPage>
    );
};

export default Tasks;
