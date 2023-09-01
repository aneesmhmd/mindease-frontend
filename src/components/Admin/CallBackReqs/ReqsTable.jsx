import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { FcApproval } from "react-icons/fc";
import { FaCircleNotch } from "react-icons/fa";
import { HiPhoneXMark } from "react-icons/hi2";
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
import {
  adminListCallbackReqs,
  adminUpdateCallBackReqs,
} from "../../../services/adminApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const TABLE_HEAD = ["Name", "Email", "Phone", "Status", "Action"];

export default function ReqsTable() {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = async () => {
    await adminListCallbackReqs()
      .then((res) => {
        setRequests(res.data);
        console.log("Requests", requests);
      })
      .catch((err) => {
        console.log("Requests error", err);
      });
  };

  const handleSubmit = async (id) => {
    await adminUpdateCallBackReqs(id)
      .then((res) => {
        toast.success("Updated Succesfully!");
        getRequests();
      })
      .catch((err) => {
        toast.error("Some error occured. Please try again");
      });
  };

  return (
    <Card className="h-full w-full border-t shadow-lg">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              CallBack Requests
            </Typography>
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
                    <Link to={`mailto:${request.email}`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {request.email}
                      </Typography>
                    </Link>
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
                        value={
                          request.is_contacted ? "Contacted" : "Not contacted"
                        }
                        color={request.is_contacted ? "green" : "red"}
                      />
                    </div>
                  </td>

                  <td className={classes}>
                    <Tooltip
                      content={
                        request.is_contacted
                          ? "Mark as not Contacted"
                          : "Mark as Contacted"
                      }
                    >
                      <IconButton
                        variant="text"
                        onClick={() => handleSubmit(request.id)}
                      >
                        {request.is_contacted ? (
                          <HiPhoneXMark className="h-5 w-5 text-red-400" />
                        ) : (
                          <FcApproval className="h-6 w-6" />
                        )}
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
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
