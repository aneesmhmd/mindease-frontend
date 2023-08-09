import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import CounselorProfileIcon from "./CounselorProfileIcon";


function NavList() {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium me-6"
      >
        <Link to='/counselor/home' className="flex items-center md:text-base hover:text-blue-100 transition-colors">
          Home
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium me-6"
      >
        <Link className="flex items-center md:text-base hover:text-blue-100 transition-colors">
          Appointments
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium me-6"
      >
        <Link className="flex items-center md:text-base hover:text-blue-100 transition-colors">
          Session
        </Link>
      </Typography>
      {/* <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium me-6"
      >
        <a href="#" className="flex items-center md:text-base hover:text-blue-100 transition-colors">
          Add Activities
        </a>
      </Typography> */}

      {/* <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium lg:me-6"
      >
        <a href="#" className="flex items-center md:text-base hover:text-blue-100 transition-colors">
          Contact Us
        </a>
      </Typography> */}
    </ul>
  );
}

export default function NavBar() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="fixed z-10 mx-auto bg-dark-purple max-w-full px-6 py-3 rounded-none border-0">
      <div className="flex mx-auto max-w-screen-2xl items-center justify-between text-light">
        <Typography
          as="a"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 text-2xl font-bold text-white-800"
        >
          MindEase
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6 me-10" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6 me-10" strokeWidth={2} />
          )}
        </IconButton>
      <CounselorProfileIcon/>

      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}