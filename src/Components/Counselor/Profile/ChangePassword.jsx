import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { changeCounselorPassword } from "../../../Services/counselorApi";
import { getLocal } from '../../../Context/auth'
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation regex patterns
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    const uppercaseRegex = /^(?=.*[A-Z])/;
    const lowercaseRegex = /^(?=.*[a-z])/;
    const specialcharRegex = /^(?=.*[!@#$%^&*])/;
    const numberRegex = /^(?=.*\d)/;

    // Reset error messages
    setOldPasswordError('')
    setNewPasswordError('');
    setConfirmPasswordError('');


    if (oldPassword.trim() === '') {
      setOldPasswordError('Enter old Password')
    } else if (!uppercaseRegex.test(newPassword)) {
      setNewPasswordError("Password must contain at least one uppercase letter.");
    } else if (!lowercaseRegex.test(newPassword)) {
      setNewPasswordError("Password must contain at least one lowercase letter.");
    } else if (!numberRegex.test(newPassword)) {
      setNewPasswordError("Password must contain at least one number.");
    } else if(!specialcharRegex.test(newPassword)){
      setNewPasswordError('Password must contain one special character')
    }else if (newPassword.trim().length < 8) {
      setNewPasswordError("Password must be at least 8 characters long")
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      // If all validations pass, password will be reset
      const token = getLocal('counselorJwt')
      if (token) {
        const decoded = jwtDecode(token)
        const user_id = decoded.user_id

        changeCounselorPassword({ oldPassword, newPassword }, user_id)
          .then((res) => {
            console.log(res);
            toast.success(res.data.message)
            setOldPassword('')
            setNewPassword('')
            setConfirmPassword('')
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.response.data.message)
            if (err.response.status === 404) {
              navigate('/counselor/login')
              localStorage.removeItem('counselorJwt')
            }
          })
      } else {
        toast.warn('Please login to change password')
        navigate('/counselor/login')
      }

    }
  }

  return (
    <div className="bg-white bg-opacity-90 flex items-center justify-center rounded">

      <Card color="transparent" shadow={false}>

        <Typography color="gray" className="mt-5 text-center text-black font-semibold underline">
          Change your password here
        </Typography>

        <form className="mt-2 mb-2 w-70 max-w-screen-lg md:w-96">
          <div className="mb-4 flex flex-col gap-3">

            <Input
              value={oldPassword}
              type="password"
              size="lg"
              label="Old Password"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            {oldPasswordError &&
              <span className="text-red-900 text-sm bg-red-300 bg-opacity-40 text-center rounded-lg p-2">
                {oldPasswordError}
              </span>
            }

            <Input
              value={newPassword}
              type="password"
              size="lg"
              label="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {newPasswordError &&
              <span className="text-red-900 text-sm  bg-red-300 bg-opacity-40 text-center rounded-lg p-2">
                {newPasswordError}
              </span>
            }

            <Input
              value={confirmPassword}
              type="password"
              size="lg"
              label="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPasswordError &&
              <span className="text-red-900 text-sm  bg-red-300 bg-opacity-40 text-center rounded-lg p-2">
                {confirmPasswordError}
              </span>
            }

          </div>

          <Button className="my-6" onClick={handleSubmit} fullWidth>
            Change Password
          </Button>

        </form>
      </Card>
    </div>

  );
}