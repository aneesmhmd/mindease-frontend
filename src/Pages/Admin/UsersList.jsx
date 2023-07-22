import React from 'react'
import { Card, Typography } from "@material-tailwind/react";
import SideBar from '../../Components/Admin/Home/SideBar';
import NavBar from '../../Components/Admin/Home/NavbarAdmin';
import ListTable from '../../Components/Admin/UsersList/ListTable';

const TABLE_HEAD = ["Name", "Email", "Phone", "Status", "Action"];

const TABLE_ROWS = [
    {
        name: "John Michael",
        job: "Manager",
        date: "23/04/18",
        status: "Active",
    },
    {
        name: "Alexa Liras",
        job: "Developer",
        date: "23/04/18",
        status: "Inactive",

    },
    {
        name: "Laurent Perrier",
        job: "Executive",
        date: "19/09/17",
        status: "Active",

    },
    {
        name: "Michael Levi",
        job: "Developer",
        date: "24/12/08",
        status: "Active",

    },
    {
        name: "Richard Gran",
        job: "Manager",
        date: "04/10/21",
        status: "Active",

    },
];

function UsersList() {
    return (
        <div>
            <NavBar />
            <div className='flex flex-row justify-between'>
                
                <div>
                    <SideBar />
                </div>

                <div className='w-full items-center mt-5 px-4'>
                    <h1 className='font-medium md:text-xl ms-2'>Users List</h1>
                    <ListTable />
                </div>
            </div>
        </div>
    );
}

export default UsersList
