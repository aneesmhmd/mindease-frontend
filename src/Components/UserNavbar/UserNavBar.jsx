import React from "react";
import {Navbar, Collapse, Typography, IconButton} from "@material-tailwind/react";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import ProfileIcon from './ProfileIcon'
import NavList from "./NavList";

export default function NavBar() {
    const [openNav, setOpenNav] = React.useState(false);

    const handleWindowResize = () => window.innerWidth >= 960 && setOpenNav(false);

    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return() => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <Navbar className="fixed z-10 mx-auto bg-blue-900 max-w-full px-6 py-3 rounded-none border-0">
            <div className="flex mx-auto max-w-screen-2xl items-center justify-between text-light">
                <Typography as="a" href="#" variant="h6" className="mr-4 cursor-pointer py-1.5 text-2xl font-bold text-white-800">
                    MindEase
                </Typography>
                <div className="hidden lg:block">
                    <NavList/>
                </div>
                <ProfileIcon/>
                <IconButton variant="text" className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={
                        () => setOpenNav(!openNav)
                }>
                    {
                    openNav ? (
                        <XMarkIcon className="h-6 w-6"
                            strokeWidth={2}/>
                    ) : (
                        <Bars3Icon className="h-6 w-6"
                            strokeWidth={2}/>
                    )
                } </IconButton>
            </div>
            <Collapse open={openNav}>
                <NavList/>
            </Collapse>
        </Navbar>
    );
}
