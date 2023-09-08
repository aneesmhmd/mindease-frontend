import { PencilIcon } from "@heroicons/react/24/solid";
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
import { useEffect, useState } from "react";
import { adminListTaskSubscriptions } from "../../../services/adminApi";

const TABLE_HEAD = [
  "Task",
  "User",
  "Amount Paid",
  "Subscribed date",
  "Expiry Date",
  "Payment status",
  "Validity Status",
];

export default function SubscriptionTable() {
  const [subscriptions, setSubscriptions] = useState([]);
  useEffect(() => {
    listSubscriptions();
  }, []);

  const listSubscriptions = async () => {
    adminListTaskSubscriptions()
      .then((res) => {
        setSubscriptions(res.data);
        console.log("subs", res.data);
      })
      .catch((err) => {
        console.log("subs err", err);
      });
  };

  return (
    <Card className="h-full w-full border-t">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Task Subscriptions
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            
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
                  className="border-y border-blue-gray-100 bg-blue-gray-500 p-4"
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
            {subscriptions.map((subscription, index) => {
              const isLast = index === subscriptions.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={subscription}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={subscription?.task?.image}
                        alt={subscription?.task?.title}
                        size="md"
                        className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                      />
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {subscription?.task?.title}
                      </Typography>
                    </div>
                  </td>

                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {subscription?.user?.first_name}&nbsp;
                      {subscription?.user?.last_name}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {subscription?.amount_paid}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {subscription?.subscribed_date}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {subscription?.expiry_date}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        size="sm"
                        variant="ghost"
                        value={subscription.is_paid ? "Paid" : "Not Paid"}
                        color={subscription.is_paid ? "green" : "red"}
                      />
                    </div>
                  </td>

                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        size="sm"
                        variant="ghost"
                        value={subscription.is_expired ? "Expired" : "Active"}
                        color={subscription.is_expired ? "red" : "green"}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      
    </Card>
  );
}
