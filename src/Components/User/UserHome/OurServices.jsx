import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    Rating,
    Avatar
  } from "@material-tailwind/react";
  import axios from "axios";
  import { useEffect, useState } from "react";
  import {BaseUrl} from '../../../constants/constants'
import { getAllServices } from "../../../Services/userApi";
  
  export default function OurServices() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        getServices();
    
      }, []);
  
    async function getServices() {
      getAllServices().then((res)=>{
        setServices(res.data)
      }).catch((err)=>{
        console.log(err);
      })
    }
  
  
    return (
      <div className="div text-center">

        <h1 className="font-serif font-bold md:text-3xl mt-5">Our Services</h1>
        
      <div className="flex flex-wrap justify-center mx-12">
        {services?.map((service) => (
          <div className="w-full sm:w-1/2 lg:w-1/3 p-4" key={service.id}>
            <Card className="w-full h-full flex flex-col">
              <CardHeader shadow={false} floated={false}>
                <img
                  src={`${ BaseUrl + service?.icon}`}
                  alt="image"
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardBody className="flex flex-col justify-between">
                <div>
                  <Typography variant="h4" color="blue-gray" className="mb-2 font-serif">
                    {service?.title}
                  </Typography>
                  <Typography color="gray" className="font-normal mb-8 font-serif">
                    {service?.description}
                  </Typography>
                </div>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
        
        </div>
    );
  }
   