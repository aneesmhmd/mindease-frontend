import { Link, useNavigate } from "react-router-dom";

import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Typography
} from "@material-tailwind/react";
import {
    PowerIcon,
    UserPlusIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";
import { getLocal } from "../../Context/auth";
import { toast } from "react-toastify";

export default function Example() {

    const localResponse = getLocal('userJwt');

    const navigate = useNavigate()


    const handleLogOut = () => {
        localStorage.removeItem('userJwt');
        toast.success('Succesfully Logged Out')
        navigate('/login')
    }

    return (
        <Menu>
            <MenuHandler>
                <Avatar variant="circular" alt="tania andrew" className="cursor-pointer w-9 h-9" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" />
            </MenuHandler>

            <MenuList>
                {localResponse ?
                    <Link to='/profile'>
                        <MenuItem className="flex items-center gap-2">
                            <UserCircleIcon strokeWidth={2}
                                className="h-4 w-4" />
                            <Typography variant="small" className="font-normal">
                                My profile
                            </Typography>
                        </MenuItem>
                    </Link>
                    :
                    <Link to='/register'>
                        <MenuItem className="flex items-center gap-2">
                            <UserPlusIcon strokeWidth={2}
                                className="h-4 w-4" />
                            <Typography variant="small" className="font-normal">
                                SignUp
                            </Typography>
                        </MenuItem>
                    </Link>
                }

                {localResponse ?
                    <Link to='/login'>
                        <MenuItem className="flex items-center gap-2" onClick={handleLogOut}>
                            <PowerIcon strokeWidth={2}
                                className="h-4 w-4" />
                            <Typography variant="small" className="font-normal">
                                Logout
                            </Typography>
                        </MenuItem>
                    </Link>
                    :
                    <Link to='/login'>
                        <MenuItem className="flex items-center gap-2">
                            <PowerIcon strokeWidth={2}
                                className="h-4 w-4" />
                            <Typography variant="small" className="font-normal">
                                Login
                            </Typography>
                        </MenuItem>
                    </Link>
                }



            </MenuList>
        </Menu>
    );
}
