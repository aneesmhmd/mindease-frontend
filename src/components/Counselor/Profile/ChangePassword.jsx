import {
  Card,
  Input,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { changeCounselorPassword } from "../../../services/counselorApi";
import { decodedToken } from "../../../Context/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  const validationSchema = yup.object({
    oldPassword: yup.string().required("Password is required"),
    newPassword: yup
      .string()
      .min(6, "Password should be min 6 characters long")
      .max(16, "Password should be atmost 16 characters long")
      .matches(
        passwordRegex,
        "Password must contain an upper case, a lower case, a number and a special character"
      )
      .required("Enter your password"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const onSubmit = async (values, { resetForm }) => {
    const decoded = decodedToken("counselorJwt");
    setIsLoading(true);
    changeCounselorPassword(values, decoded.user_id)
      .then((res) => {
        setIsLoading(false);
        toast.success(res.data.message);
        resetForm();
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.message);
        if (err.response.status === 404) {
          navigate("/counselor/login");
          localStorage.removeItem("counselorJwt");
        }
      });
  };

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    validateOnBlur: true,
    onSubmit,
  });

  return (
    <div className="bg-white bg-opacity-90 flex items-center justify-center rounded">
      <Card color="transparent" shadow={false}>
        <Typography
          color="gray"
          className="mt-5 text-center text-black font-semibold underline"
        >
          Change your password here
        </Typography>

        <form
          className="mt-2 mb-2 w-70 max-w-screen-lg md:w-96"
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-4 flex flex-col gap-2">
            <div className="w-full">
              <Input
                label="Current Password"
                name="oldPassword"
                size="md"
                type="password"
                value={formik.values.oldPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.oldPassword &&
                  Boolean(formik.errors.oldPassword)
                }
                className="bg-white bg-opacity-75"
              />
            </div>
            <div className="text-red-600 font-mono text-[12px] lg:text-[12px]">
              {formik.touched.oldPassword && formik.errors.oldPassword
                ? formik.errors.oldPassword
                : ""}
            </div>

            <div className="w-full">
              <Input
                label="New Password"
                name="newPassword"
                size="md"
                type="password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.newPassword &&
                  Boolean(formik.errors.newPassword)
                }
                className="bg-white bg-opacity-75"
              />
            </div>
            <div className="text-red-600 font-mono text-[12px] lg:text-[12px]">
              {formik.touched.newPassword && formik.errors.newPassword
                ? formik.errors.newPassword
                : ""}
            </div>

            <div className="w-full">
              <Input
                label="Confirm New Password"
                name="confirmPassword"
                size="md"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                className="bg-white bg-opacity-75"
              />
            </div>
            <div className="text-red-600 font-mono text-[12px] lg:text-[12px]">
              {formik.touched.confirmPassword && formik.errors.confirmPassword
                ? formik.errors.confirmPassword
                : ""}
            </div>
          </div>

          <Button className="my-6" type="submit" fullWidth disabled={isLoading}>
            {isLoading ? (
              <Spinner className="h-4 w-5 mx-auto" />
            ) : (
              "Change Password"
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}
