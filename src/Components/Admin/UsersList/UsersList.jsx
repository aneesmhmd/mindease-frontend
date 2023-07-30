import React, { useEffect, useState } from 'react'
import { Card, Typography } from "@material-tailwind/react";
import { adminManageUser, adminUserDetails } from '../../../Services/adminApi'
import { toast } from 'react-toastify';
import axios from 'axios';
import { AdminUrl } from '../../../constants/constants';


function ListTable() {

    const [users, setUsers] = useState([])
    const [manage, setManage] = useState(false)
    useEffect(() => {
        listUsers()
    }, [])

    const TABLE_HEAD = ["First name", "Last name", "Email", "Phone", "Status", "Action"];

    async function listUsers(){
        adminUserDetails().then((res) => {
            setUsers(res.data)
            console.log('This is the user data:', res.data);
        }).catch((error) => {
            console.log('this is sai as error:', error);
        })
        // axios.get(`${AdminUrl}/list-users/`).then((res)=>{
        //     setUsers(res.data)
        // }).catch((err)=>{
        //     console.log(err);
        // })
    }

    const handleManageUser = (userId) => {
        
        adminManageUser(userId).then((res) => {
            listUsers()
            if (res.status === 200) {
                toast.success(res.data.message)
            }
        }).catch((error) => {
            toast.error(error.response.data.message)
        })
        
        // axios.patch(`${AdminUrl}/manage-user/${userId}/`).then((res)=>{
        //     listUsers()
        //     toast.success(res.data.message)
        // }).catch((error)=>{
        //     toast.error(err.response.data.message)
        // })
    };

    return (
        <div>
            <Card className="md:w-full">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-500 p-4">
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
                        {users.map((user, index) => {
                            const isLast = index === user.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={user.email}>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {user.first_name}
                                        </Typography>
                                    </td>

                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {user.last_name}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {user.email}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {user.phone}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography as="a" href="#" variant="small" color="blue" className="font-medium">
                                            {user.is_active ?
                                                <p className='text-white bg-green-700 text-center rounded-full w-1/2'>Active</p>
                                                : <p className='text-white bg-red-700 text-center rounded-full w-1/2'>Inactive</p>
                                            }
                                        </Typography>
                                    </td>

                                    <td className={classes}>
                                        <Typography as="a" href="#" variant="small" color="blue" className="font-medium">
                                            <button className='w-1/2  rounded-full' type='button' onClick={() => handleManageUser(user.id)}>
                                                {user.is_active ?
                                                    <p className='text-white border-2 rounded-full text-center bg-red-700 hover:bg-white hover:text-red-700 hover:border-red-700 w-full p-1'>Block</p>
                                                    : <p className='text-white rounded-full text-center bg-green-700 hover:bg-white md:w-full border-2 hover:text-green-700 hover:border-green-700 p-1'>Unblock</p>
                                                }
                                            </button>
                                        </Typography>
                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
        </div>
    )
}

export default ListTable
