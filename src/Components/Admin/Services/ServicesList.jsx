import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { adminDeleteService, adminListServices, adminManageService } from "../../../Services/adminApi";
import AddModal from "./AddModal";
import AlertModal from "./AlertModal";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import { AdminUrl } from "../../../constants/constants";
import EditModal from "./EditModal";


const TABLE_HEAD = ["Title", "Description", "Status", "Action", "Edit/Delete"];



export default function TransactionsTable() {
  const [services, setServices] = useState([])

  useEffect(() => {
    getServices();
  }, [])

  // Getting all services
  async function getServices() {
    adminListServices().then((res) => {
      setServices(res.data)
      console.log('This is the services data:', res.data);
    }).catch((error) => {
      console.log('This is said as error:', error);
    })
  }
  // async function getServices(){
  //   axios.get(`${AdminUrl}/list-services`).then((res)=>{
  //     setServices(res.data)
  //     console.log('Services data:',res.data);
  //   }).catch((err)=>{
  //     console.log('Service error:', err.response);
  //   })
  // }



  // List and unlist services
  async function handleManageService(serviceId) {
    console.log('Thisis the servie Id:',serviceId);
    adminManageService(serviceId).then((res) => {
      getServices();
      toast.success(res.data.message)
    }).catch((error) => {
      toast.error(error.response.data.message)
    })

    // await axios.patch(`${AdminUrl}/manage-service/${serviceId}/`).then((res)=>{
    //   getServices();
    //   toast.success(res.data.message)
    // }).catch((err)=>{
    //   toast.error(err.response.data.message)
    // })
  };

  // Deleting services
  const handleDeleteService = async (serviceId) => {
    adminDeleteService(serviceId).then((res) => {
      getServices();
      toast.success('Service Deletion succesfull')
    }).catch((error) => {
      toast.error('Something went wrong. Please try again!')
    })
    
    // await axios.delete(`${AdminUrl}/delete-service/${serviceId}/`).then((res)=>{
    //   getServices();
    //   toast.success('Service Deletion succesfull')
    // }).catch((err)=>{
    //   toast.error('Something went wrong')
    // })
  }


  return (
    <Card className="h-full md:w-full mb-8 border-t" shadow={true}>
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Services
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about our services
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
            </div>

            {/* Add Modal Of Services */}
            <AddModal getServices={getServices}/>

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
            {services.map(
              (service, index) => {
                const isLast = index === services.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={service.image}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={service.icon}
                          alt={service.title}
                          size="xl"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        />
                        <Typography variant="small" color="blue-gray" className="font-bold">
                          {service.title}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {service.description}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className={`font-normal text-center text-white px-2 rounded-md ${service.is_active ? 'bg-green-500' : 'bg-red-500'}`} >
                        {service.is_active ? 'Listed' : 'Unlisted'}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Button
                        onClick={() => handleManageService(service.id)}
                        className={`rounded-md py-1 px-2 text-center item w-20 ${service.is_active ? 'bg-red-500' : 'bg-green-500'}`}
                      >
                        {service.is_active ? 'Unlist' : 'List'}
                      </Button>
                    </td>
                    <td className={classes}>
                      {/* <Tooltip content="Edit Service">
                        <IconButton variant="text" color="blue-gray">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip> */}
                      <EditModal service={service} getServices={getServices}/>

                      {/* Service Deletion */}
                      <AlertModal
                        message={`Are you sure want to delete the service ${service.title}`}
                        confirm={'delete'}
                        serviceId={service.id}
                        action={handleDeleteService}
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
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" color="blue-gray" size="sm">
            Previous
          </Button>
          <Button variant="outlined" color="blue-gray" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}