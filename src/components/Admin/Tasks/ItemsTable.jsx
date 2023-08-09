import { PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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
import { adminGetTaskItems } from "../../../services/adminApi";
import { useEffect, useState } from "react";
import EditTaskItem from "./EditTaskItem";
import DeleteTaskitem from "./DeleteTaskitem";

const TABLE_HEAD = ["Title", "Instructions", "Demo Link", "Edit", "Delete"];

export default function ItemsTable({ taskId }) {
    const [taskItems, setTaskItems] = useState([])

    useEffect(() => {
        getTaskItems();
    },[ ])

    const getTaskItems = async () => {
        adminGetTaskItems(taskId).then((res) => {
            setTaskItems(res.data)
            console.log('task items', res.data);
        }).catch((err) => {
            console.log('Task items err', err);
        })
    }

    return (
        <Card className="h-full w-full border-t mb-10 shadow-lg">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">

                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Task Activites
                        </Typography>
                    </div>

                    <div className="flex w-full shrink-0 gap-2 md:w-max">
                        <div className="w-full md:w-72">
                            <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
                        </div>

                        <Link to={`/admin/add-task-activity/?task=${taskId}`}>
                            <Button className="flex items-center gap-3" color="blue" size="sm">
                                <PlusCircleIcon strokeWidth={2} className="h-4 w-4" />  Add Task </Button>
                        </Link>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="px-0">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-400 p-4 w-40">
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
                        {taskItems.map(
                            (taskItem, index) => {
                                const isLast = index === taskItems.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={index}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Typography variant="small" color="blue-gray" className="font-bold">
                                                    {taskItem?.title}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {taskItem?.instructions}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {taskItem?.demo_link}
                                            </Typography>
                                        </td>

                                        <td className={classes}>
                                            <EditTaskItem taskItem={taskItem} getTaskItems={getTaskItems}/>
                                        </td>

                                        <td className={classes}>
                                            <DeleteTaskitem taskId={taskItem.id} getTaskItems={getTaskItems}/>
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
                        ...
                    </IconButton>
                    <IconButton variant="text" color="blue-gray" size="sm">
                        8
                    </IconButton>
                    <IconButton variant="text" color="blue-gray" size="sm">
                        9
                    </IconButton>
                    <IconButton variant="text" color="blue-gray" size="sm">
                        10
                    </IconButton>
                </div>
                <Button variant="outlined" color="blue-gray" size="sm">
                    Next
                </Button>
            </CardFooter>
        </Card>
    );
}