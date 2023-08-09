import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography
} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import { toast } from "react-toastify";
import { changeUserPassword } from "../../../services/userApi";

export default function ChangePassword({id}) {
    const [passwords, setPasswords] = useState({current_password: "", new_password: "", confirm_password: ""})

    useEffect(() => {
    }, [passwords])

    const handleChangePassowrd = async (e) =>{
        e.preventDefault();
        if(passwords.current_password.trim()===''){
            toast.error('Enter your current password')
        }else if(passwords.new_password.trim()===''){
            toast.error('Enter new password')
        }else if(passwords.new_password.trim().length<8){
            toast.warn('Password  should be min 8 characters')
        }else if(passwords.confirm_password.trim===''){
            toast.error('Enter password again to confirm')
        }else if(passwords.new_password !== passwords.confirm_password){
            toast.error('Password mismatch')
        }else{
            changeUserPassword(passwords,id).then((res)=>{
                toast.success(res.data.message)
            }).catch((err)=>{
                toast.error(err.response.data.message)
                console.log(err);
            })
        }
    }


    return (
        <Card color="transparent"
            shadow={false}>

            <Typography color="gray" className="mt-1 font-normal text-center">
                Change Your Password
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleChangePassowrd}>
                <div className="mb-4 flex flex-col gap-6">
                    <Input name="current_password" type="password" size="lg" label="Current Password"
                        onChange={
                            (e) => {
                                setPasswords({
                                    ...passwords,
                                    [e.target.name]: e.target.value
                                })
                            }
                        }/>

                    <Input name="new_password" type="password" size="lg" label="New Password"
                        onChange={
                            (e) => {
                                setPasswords({
                                    ...passwords,
                                    [e.target.name]: e.target.value
                                })
                            }
                        }/>

                    <Input name="confirm_password" type="password" size="lg" label="Confirm New Password"
                        onChange={
                            (e) => {
                                setPasswords({
                                    ...passwords,
                                    [e.target.name]: e.target.value
                                })
                            }
                        }/>
                </div>

                <Button className="mt-6" type="submit" fullWidth>
                    Change Password
                </Button>

            </form>
        </Card>
    );
}
