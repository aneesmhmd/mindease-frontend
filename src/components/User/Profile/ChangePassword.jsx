import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import { changeUserPassword } from "../../../services/userApi";
import { decodedToken } from "../../../Context/auth";

export default function ChangePassword() {
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  const validationSchema = yup.object({
    current_password: yup.string().required("Password is required"),
    new_password: yup
      .string()
      .min(6, "Password should be min 6 characters long")
      .max(16, "Password should be atmost 16 characters long")
      .matches(
        passwordRegex,
        "Password must contain an upper case, a lower case, a number and a special character"
      )
      .required("Enter your password"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("new_password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const onSubmit = async (values, { resetForm }) => {
    const token = decodedToken("userJwt");
    changeUserPassword(values, token.user_id)
      .then((res) => {
        toast.success(res.data.message);
        resetForm();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      });
  };

  const formik = useFormik({
    initialValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: validationSchema,
    validateOnBlur: true,
    onSubmit,
  });

  return (
    <Card color="transparent" shadow={false}>
      <Typography color="gray" className="mt-1 font-normal text-center">
        Change Your Password
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-4 flex flex-col gap-2">
          <div className="w-full">
            <Input
              label="Current Password"
              name="current_password"
              size="md"
              type="password"
              value={formik.values.current_password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.current_password &&
                Boolean(formik.errors.current_password)
              }
              className="bg-white bg-opacity-75"
            />
          </div>
          <div className="text-red-600 font-mono text-[12px] lg:text-[12px]">
            {formik.touched.current_password && formik.errors.current_password
              ? formik.errors.current_password
              : ""}
          </div>

          <div className="w-full">
            <Input
              label="New Password"
              name="new_password"
              size="md"
              type="password"
              value={formik.values.new_password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.new_password &&
                Boolean(formik.errors.new_password)
              }
              className="bg-white bg-opacity-75"
            />
          </div>
          <div className="text-red-600 font-mono text-[12px] lg:text-[12px]">
            {formik.touched.new_password && formik.errors.new_password
              ? formik.errors.new_password
              : ""}
          </div>

          <div className="w-full">
            <Input
              label="Confirm New Password"
              name="confirm_password"
              size="md"
              type="password"
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirm_password &&
                Boolean(formik.errors.confirm_password)
              }
              className="bg-white bg-opacity-75"
            />
          </div>
          <div className="text-red-600 font-mono text-[12px] lg:text-[12px]">
            {formik.touched.confirm_password && formik.errors.confirm_password
              ? formik.errors.confirm_password
              : ""}
          </div>
        </div>

        <Button className="mt-6" type="submit" fullWidth>
          Change Password
        </Button>
      </form>
    </Card>
  );
}
