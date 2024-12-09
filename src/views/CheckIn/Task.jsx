import React, { useEffect } from 'react';
import CustomDialog from '../../shared/Overlays/CustomDialog';
import { useDispatch, useSelector } from 'react-redux';
import { editTaskAction, getTaskAction } from '../../redux/actions/CheckIn/CheckIn';
import { DataView } from 'primereact/dataview';
import { CustomCheckbox } from '../../shared/Input/AllInputs';
import moment from 'moment';
import _ from 'lodash';

const Task = ({ openTask, setOpenTask }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTaskAction());
    }, []);

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
                    <div className="my-auto mr-4">{index + 1}</div>
                    <div>
                        <div>{moment(item?.dueDate)?.format('MMMM-DD-YYYY')}</div>
                    </div>
                </div>
                <div className="mx-3">
                    <div>{item?.taskTitle}</div>
                </div>
            </div>
        );
    };
    console.log(task, 'task');

    return (
        <div>
            <CustomDialog
                title="Task"
                visible={openTask}
                onCancel={() => {
                    setOpenTask(false);
                }}
                loading={false}
                width="auto"
            >
                <DataView value={task} itemTemplate={itemTemplate} paginator rows={5} />
            </CustomDialog>
        </div>
    );
};

export default Task;
