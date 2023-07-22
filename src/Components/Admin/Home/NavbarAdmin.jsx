import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import ProfileIcon from '../../UserNavbar/ProfileIcon'
import AdminProfileIcon from './AdminProfileIcon'
import SideBar from "./SideBar";

function NavList() {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <Link to='/admin/dashboard' className="flex items-center md:text-base hover:text-blue-100 transition-colors">
          Home
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <Link to='/admin/add-counselor/' className="flex items-center md:text-base hover:text-blue-100 transition-colors">
          Psychologists
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <Link className="flex items-center md:text-base hover:text-blue-100 transition-colors">
          Book Slot
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <a href="#" className="flex items-center md:text-base hover:text-blue-100 transition-colors">
          Testimonials
        </a>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <a href="#" className="flex items-center md:text-base hover:text-blue-100 transition-colors">
          Contact Us
        </a>
      </Typography>
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
    <Navbar className="mx-auto bg-blue-900 max-w-full px-6 py-3 rounded-none border-0">
      <div className="flex mx-auto max-w-screen-2xl items-center justify-between text-light">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 md:text-2xl font-bold text-white-800"
        >
         MindEase
        </Typography>
        
        <AdminProfileIcon/>
        
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}