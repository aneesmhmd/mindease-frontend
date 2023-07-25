import React from 'react'
import ListTable from '../../Components/Admin/UsersList/UsersList';
import NavBar from '../../Components/Admin/Home/NavbarAdmin';
import SideBar from '../../Components/Admin/Home/SideBar';


function UsersList() {

    return (
        <div >
            <div className='w-full items-center mt-5 px-4'>
                <h1 className='font-medium md:text-xl ms-2'>Users List</h1>
                <ListTable />
            </div>
        </div>
    );
}

export default UsersList
