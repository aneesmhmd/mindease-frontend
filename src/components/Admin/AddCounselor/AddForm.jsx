import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { addCounselor } from "../../../services/adminApi";
import { useNavigate } from "react-router-dom";
import Loaders from "../../Loaders";
import { Input } from "@material-tailwind/react";

function AddForm() {
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);

  const [values, setValues] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

  // useEffect(() => {
  //   setValues({
  //     ...values,
  //     ["password"]: values.email,
  //   });
  // }, [formik.values.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (values.first_name.trim() === "") {
        toast.error("First name cannot be empty");
      } else if (values.last_name.trim() === "") {
        toast.error("Last name cannot be empty");
      } else if (values.email.trim() === "") {
        toast.error("Email cannot be empty");
      } else if (values.phone.trim() === "") {
        toast.error("Phone number cannot be empty");
      } else {
        handleLoading();
        addCounselor(values)
          .then((res) => {
            if (res.status === 200) {
              handleLoading();
              toast.success("Counselor added succesfully");
              navigate("/admin/counselors");
            } else {
              toast.error("Counselor registration failed");
            }
          })
          .catch((error) => {
            handleLoading();
            console.log("Error", error);
            toast.error(error.message);
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const validationSchema = yup.object({
    first_name: yup
      .string()
      .min(3, "First name should be minumum 3 characters long")
      .required("This field is required"),
    last_name: yup.string(),
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

  const onSubmit = async (values) => {
    handleLoading();
    addCounselor(values)
      .then((res) => {
        handleLoading();
        toast.success(res.data.message);
        navigate("/admin/counselors");
      })
      .catch((error) => {
        handleLoading();
        if (error.response.data.email) {
          toast.error(error.response.data.email[0]);
        } else {
          toast.error("Registration failed.Please try again!");
        }
      });
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
    },
    validationSchema: validationSchema,
    validateOnBlur: true,
    onSubmit,
  });

  return (
    <div className="md:w-1/2">
      {loading ? (
        <Loaders />
      ) : (
        <div className="flex justify-center flex-col md:w-full items-center">
          <h1 className="justify-center font-bold md:text-2xl text-gray-800 mb-4">
            Add Psychologist
          </h1>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col items-center w-full border-t max-w-xl shadow-lg rounded-lg gap-5 bg-gray-50"
          >
            <div className="md:w-full px-8">
              <div className="mt-9">
                <Input
                  label="First name"
                  name="first_name"
                  size="lg"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.first_name &&
                    Boolean(formik.errors.first_name)
                  }
                  className="bg-white bg-opacity-75"
                />
              </div>
              <div className="text-red-600 font-mono text-[12px] lg:text-[12px]">
                {formik.touched.first_name && formik.errors.first_name
                  ? formik.errors.first_name
                  : ""}
              </div>
            </div>

            <div className="md:w-full px-8">
              <div className="w-full">
                <Input
                  label="Last name"
                  name="last_name"
                  size="lg"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.last_name && Boolean(formik.errors.last_name)
                  }
                  className="bg-white bg-opacity-75"
                />
              </div>
              <div className="text-red-600 font-mono text-[12px] lg:text-[12px]">
                {formik.touched.last_name && formik.errors.last_name
                  ? formik.errors.last_name
                  : ""}
              </div>
            </div>

            <div className="md:w-full px-8">
              <div className="w-full">
                <Input
                  label="Email"
                  name="email"
                  size="lg"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  className="bg-white bg-opacity-75"
                />
              </div>
              <div className="text-red-600 font-mono text-[12px] lg:text-[12px]">
                {formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ""}
              </div>
            </div>

            <div className="md:w-full px-8">
              <div className="w-full">
                <Input
                  label="Phone Number"
                  name="phone"
                  size="lg"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  className="bg-white bg-opacity-75"
                />
              </div>
              <div className="text-red-600 font-mono text-[12px] lg:text-[12px]">
                {formik.touched.phone && formik.errors.phone
                  ? formik.errors.phone
                  : ""}
              </div>
            </div>

            <div className="mb-6 md:w-1/2">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddForm;
