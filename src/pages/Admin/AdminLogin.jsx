import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { adminLogin } from "../../services/adminApi";
import isLogged from "../../Context/auth";
import image from "../../images/adminBanner.png";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, Input, Spinner } from "@material-tailwind/react";

function AdminLogin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const response = isLogged("adminJwt");
    if (response && response == "admin") {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Enter your email"),
    password: yup.string().required("Enter your password"),
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    adminLogin(values)
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false);
          localStorage.setItem("adminJwt", JSON.stringify(res.data.token));
          toast.success("Login succesfull");
          navigate("/admin/dashboard");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.response.data.message);
        if (error.response.status === 401) {
          navigate("/login");
        }
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    validateOnBlur: true,
    onSubmit,
  });

  return (
    <div>
      <Helmet>
        <title>Admin Login | MindEase</title>
      </Helmet>

      <section className="bg-gray-300 min-h-screen flex items-center justify-center">
        <div className="bg-gray-50 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center py-10">
          <div className="md:w-1/2 px-8 md:px-16">
            <h1 className="font-bold font-sans text-2xl text-[#002D74] mb-5">
              MindEase
            </h1>
            <h2 className="font-medium text-2xl text-[#002D74]">Admin Login</h2>
            <p className="text-xs mt-4 text-[#002D74]">
              Login to your account as admin
            </p>

            <form
              className="flex flex-col gap-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="relative mt-3">
                <div className="w-full">
                  <Input
                    label="Email"
                    name="email"
                    size="md"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    className="bg-white bg-opacity-75"
                    disabled={isLoading}
                  />
                </div>
                <div className="text-red-600 font-mono text-[12px] lg:text-[12px]">
                  {formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : ""}
                </div>
              </div>

              <div className="relative">
                <div className="w-full">
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    size="md"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    className="bg-white bg-opacity-75"
                    disabled={isLoading}
                  />
                </div>
                <div className="text-red-600 font-mono text-[12px] lg:text-[12px]">
                  {formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : ""}
                </div>
              </div>
              <Button
                className="bg-[#002D74] rounded-xl py-2 hover:scale-105 duration-300"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <Spinner className="h-5 w-5 mx-auto" /> : "Login"}
              </Button>
            </form>


            <div className="text-md  text-center py-4 text-[#002D74]">
              <h2>
                "Find Ease
                <br />
                Unlock Your Peace"
              </h2>
            </div>
          </div>

          <div className="md:block hidden w-1/2">
            <img className="rounded-2xl" src={image} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminLogin;
