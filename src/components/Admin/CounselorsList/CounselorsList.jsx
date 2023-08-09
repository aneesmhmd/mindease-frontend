import React, { useEffect, useState } from 'react'
import { Card, Typography } from "@material-tailwind/react";
import { adminCounselorDetails, adminManageCounselor } from '../../../services/adminApi'
import { toast } from 'react-toastify';
import axios from 'axios';
import { AdminUrl } from '../../../constants/constants';
import { Helmet } from 'react-helmet';


function ListTable() {

    const [counselors, setCounselors] = useState([])

    useEffect(() => {
        listCounselors()
    }, [])

    const TABLE_HEAD = ["First name", "Last name", "Email", "Phone", "Status", "Action"];

    async function listCounselors() {
        adminCounselorDetails().then((res) => {
            setCounselors(res.data)
        }).catch((error) => {
            console.log('this is counselor data error:', error);
        })
    }

    // async function listCounselors(){
    //     await axios.get(`${AdminUrl}/list-counselors`).then((res)=>{
    //         setCounselors(res.data)
    //     }).catch((error)=>{
    //         console.log('Counselor listing error:', error.response);
    //     })
    // }




    const handleManageCounselor = async (counselorId) => {
        // await axios.patch(`${AdminUrl}/manage-counselor/${counselorId}/`).then((res)=>{
        //     listCounselors();
        //     toast.success(res.data.message)
        // }).catch((err)=>{
        //     toast.error(err.response.data.message)
        // })

        await adminManageCounselor(counselorId).then((res) => {
            listCounselors()
            if (res.status === 200) {
                toast.success(res.data.message)
            }
        }).catch((error) => {
            toast.error(error.response.data.message)
        })
    };

    return (
        <div>
            <Card className="md:w-full sm:w-1/2">
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
                        {counselors.map((counselor, index) => {
                            const isLast = index === counselor.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={counselor.email}>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {counselor.first_name}
                                        </Typography>
                                    </td>

                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {counselor.last_name}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {counselor.email}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {counselor.phone}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography as="a" href="#" variant="small" color="blue" className="font-medium">
                                            {counselor.is_active ?
                                                <p className='text-white bg-green-700 text-center rounded-full w-1/2'>Active</p>
                                                : <p className='text-white bg-red-700 text-center rounded-full w-1/2'>Inactive</p>
                                            }
                                        </Typography>
                                    </td>

                                    <td className={classes}>
                                        <Typography as="a" href="#" variant="small" color="blue" className="font-medium">
                                            <button className='w-1/2  rounded-full' type='button' onClick={() => handleManageCounselor(counselor.id)}>
                                                {counselor.is_active ?
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
