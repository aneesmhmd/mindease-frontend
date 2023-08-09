import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
    Input,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { adminDeletePsychologicalTask, adminListPsychologicalTasks, adminManagePsychologicalTasks, adminUpdatePsyhcologicalTasks } from "../../../services/adminApi";
import { toast } from "react-toastify";
import DeleteTaskModal from "./DeleteTaskModal";
import EditTaskModal from "./EditTaskModal";

const TABLE_HEAD = ["Title", "Subscritption", "Validity", "Status", "List/Unlist", "View", "Edit/Delete"];



export function TasksTable() {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        listTasks();
    }, [])

    async function listTasks() {
        await adminListPsychologicalTasks().then((res) => {
            setTasks(res.data)
        }).catch((err) => {
            console.log('Task list err:', err);
        })
    }

    async function handleManageTask(id) {
        await adminManagePsychologicalTasks(id).then((res) => {
            toast.success(res.data.message)
            listTasks();
        }).catch((err) => {
            console.log('Mange task error', err);
            toast.error('Something went wrong. Please try again')
        })
    }

    async function handleDeleteTask(id) {
        await adminDeletePsychologicalTask(id).then((res) => {
            listTasks();
            toast.success('Task Deleted!')
        }).catch((err) => {
            toast.error('Some error occured')
            console.log('Psy task deletion err:', err);
        })
    }

    async function handleUpdateTask(id, updatedData) {

        adminUpdatePsyhcologicalTasks(id, updatedData).then((res) => {
            listTasks();
            toast.success('Task updated')
        }).catch((err) => {
            toast.error('Something went wrong. Try again!')
            console.log('Task updation error:', err);
        })
    }

    return (
        <Card className="h-full w-full border-t">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Psychological Tasks
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            These are basic details about Psychological tasks
                        </Typography>
                    </div>
                    <div className="flex w-full shrink-0 gap-2 md:w-max">
                        <div className="w-full md:w-72">
                            <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
                        </div>
                        <Link to='add'>
                            <Button className="flex items-center gap-3" color="blue" size="sm">
                                <PlusCircleIcon strokeWidth={2} className="h-4 w-4" /> Add Tasks
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="px-0">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-500 p-4">
                                    <Typography
                                        variant="small"
                                        color="white"
                                        className="font-normal leading-none"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(
                            (task, index) => {
                                const isLast = index === tasks.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={task.id}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    variant="rounded"
                                                    src={task.image}
                                                    alt={task.title}
                                                    size="xxl"
                                                    className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                                />
                                                <Typography variant="small" color="blue-gray" className="font-bold">
                                                    {task.title}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                Rs.{task.amount}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {task.validity} days
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    size="sm"
                                                    variant="ghost"
                                                    value={task.is_active ? 'Listed' : 'Unlisted'}
                                                    color={task.is_active ? "green" : "red"}
                                                />
                                            </div>
                                        </td>

                                        <td className={classes}>
                                            <Button
                                                onClick={() => handleManageTask(task.id)}
                                                className={`rounded-md py-1 px-2 text-center item w-20 ${task.is_active ? 'bg-red-500' : 'bg-green-500'}`}
                                            >
                                                {task.is_active ? 'Unlist' : 'List'}
                                            </Button>
                                        </td>
                                        <td className={classes}>
                                            <Link to={`/admin/view-tasks/?task=${task.id}`}>
                                                <Button className='rounded-md py-1 px-2 text-center item w-20'>
                                                    View
                                                </Button>
                                            </Link>
                                        </td>
                                        <td className={classes}>

                                            <EditTaskModal
                                                task={task}
                                                action={handleUpdateTask}
                                            />

                                            <DeleteTaskModal
                                                action={handleDeleteTask}
                                                taskId={task.id}
                                            />
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Button variant="outlined" color="blue-gray" size="sm">
                    Previous
                </Button>
                <div className="flex items-center gap-2">
                    <IconButton variant="outlined" color="blue-gray" size="sm">
                        1
                    </IconButton>
                    <IconButton variant="text" color="blue-gray" size="sm">
                        2
                    </IconButton>
                    <IconButton variant="text" color="blue-gray" size="sm">
                        3
                    </IconButton>

                    <IconButton variant="text" color="blue-gray" size="sm">
                        4
                    </IconButton>

                </div>
                <Button variant="outlined" color="blue-gray" size="sm">
                    Next
                </Button>
            </CardFooter>
        </Card>
    );
}