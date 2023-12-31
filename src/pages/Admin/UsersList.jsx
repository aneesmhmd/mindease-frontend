import React from 'react'
import ListTable from '../../components/Admin/UsersList/UsersList';
import { Helmet } from 'react-helmet';


function UsersList() {

    return (
        <div>
            <Helmet>
                <title>Users | MindEase</title>
            </Helmet>
            <div className='w-full items-center mt-5 px-4'>
                <h1 className='font-medium md:text-xl ms-2'>Users List</h1>
                <ListTable />
            </div>
        </div>
    );
}

export default UsersList
