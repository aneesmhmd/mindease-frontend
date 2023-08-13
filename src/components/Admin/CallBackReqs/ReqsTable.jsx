import { PencilIcon } from "@heroicons/react/24/solid";
import {
    ArrowDownTrayIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {FcApproval} from 'react-icons/fc'
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    IconButton,
    Tooltip,
    Input,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { adminListCallbackReqs } from "../../../services/adminApi";

const TABLE_HEAD = ["Name", "Email", "Phone", "Status", "Action"];

const TABLE_ROWS = [
    {
        name: "Spotify",
        amount: "$2,500",
        date: "Wed 3:00pm",
        status: "paid",
        account: "visa",
        accountNumber: "1234",
    }
];

export default function ReqsTable() {
    const [requests, setRequests] = useState([])
    useEffect(() => {
        getRequests();
    }, [])

    const getRequests = async () => {
        await adminListCallbackReqs().then((res) => {
            setRequests(res.data)
            console.log('Requests', requests);
        }).catch((err) => {
            console.log('Requests error', err);
        })
    }

    return (
        <Card className="h-full w-full border-t shadow-lg">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            CallBack Requests
                        </Typography>
                    </div>
                    <div className="flex w-full shrink-0 gap-2 md:w-max">
                        <div className="w-full md:w-72">
                            <Input
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            />
                        </div>
                        <Button className="flex items-center gap-3" size="sm">
                            <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="px-0">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-500  p-4"
                                >
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
                        {requests.map((request, index) => {
                            const isLast = index === requests.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={index}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">

                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {request.name}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {request.email}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {request.phone}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <div className="w-max">
                                            <Chip
                                                size="sm"
                                                variant="ghost"
                                                value = {request.is_contacted ? 'Contacted' : 'Not contacted'}
                                                color={request.is_contacted ? "green" : "red"}
                                            />
                                        </div>
                                    </td>

                                    <td className={classes}>
                                        <Tooltip content="Mark as Contacted">
                                            <IconButton variant="text">
                                                <FcApproval className="h-6 w-6" />
                                            </IconButton>
                                        </Tooltip>
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