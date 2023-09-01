import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Input, Typography,Spinner } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { addCallBackReqs } from "../../../services/userApi";

function DetailsForm() {
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(3, "Name should be minumum 3 characters long")
      .required("This field is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("This field is required"),
    phone: yup
      .string()
      .matches(/^\d{10}$/, "Enter valid phone number")
      .min(10, "Phone number should be 10 digits")
      .required("This field is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    await addCallBackReqs(values)
      .then((res) => {
        toast.success("Request has been submitted");
        setIsLoading(false);
        resetForm();
      })
      .catch((err) => {
        console.log("CallBack reqw err", err);
        setIsLoading(false);
        toast.error("Some error occured. Please try again!");
      });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit,
    validateOnBlur: true,
  });

  return (
    <div className="flex flex-col items-center text-center w-full h-full bg-teal-100 pt-4 gap-3">
      <Typography className="font-pacifico" color="white" variant="h5">
        Request a Callback
      </Typography>

      <Typography className="text-sm font-thin md:mx-0 mx-0.5">
        Please fill the form given below.
        <br />
        Our team will contact you as soon as possible
      </Typography>

      <form className="w-3/4 mt-3" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col items-center gap-4 max-h-72">
          <div className="w-full">
            <Input
              label="Your name"
              name="name"
              size="md"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              className="bg-white bg-opacity-75"
            />
            <div className="text-red-600 font-mono text-[12px] lg:text-[12px]">
              {formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ""}
            </div>
          </div>

          <div className="w-full">
            <Input
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              size="md"
              className="bg-white bg-opacity-75"
            />
            <div className="text-red-600 font-mono text-[12px] lg:text-[12px]">
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""}
            </div>
          </div>

          <div className="w-full">
            <Input
              label="Contact Number"
              size="md"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              name="phone"
              className="bg-white bg-opacity-75"
            />
            <div className="text-red-600 font-mono text-[12px] lg:text-[12px]">
              {formik.touched.phone && formik.errors.phone
                ? formik.errors.phone
                : ""}
            </div>
          </div>

          <Button
            type="submit"
            color="teal"
            className="w-3/4 mb-6"
            disabled={isLoading}
          >
            {isLoading ? <Spinner className="h-4 w-4 mx-auto" /> : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default DetailsForm;
