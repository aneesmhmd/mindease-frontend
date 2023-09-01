import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuthentication } from "../../services/userApi";
import Loaders from "../../components/Loaders";
import image from "../../images/signup.png";
import { Helmet } from "react-helmet";
import { Button, Input, Spinner } from "@material-tailwind/react";

const Signup = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

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
    password: yup
      .string()
      .min(6, "Password should be min 6 characters long")
      .max(16, "Password should be atmost 16 characters long")
      .matches(
        passwordRegex,
        "Password must contain an upper case, a lower case, a number and a special character"
      )
      .required("Required Password !!"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password !!"),
  });

  // Email registration
  const onSubmit = async (values) => {
    setLoading(true);
    console.log("vlaues", values);
    await axios
      .post(import.meta.env.VITE_BASE_USER_URL + "/api/register/", values)
      .then((response) => {
        setLoading(false);
        toast.success(response.data.msg);
        navigate("/login");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.data.email) {
          toast.error(error.response.data.email[0]);
        } else {
          toast.error("Some error occured.Please try again!");
        }
      });
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: validationSchema,
    onSubmit,
    validateOnBlur: true,
  });

  // Google login
  const handleGoogleAuth = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          const userProfile = res.data;
          googleAuthentication(userProfile).then((res) => {
            if (res.data.status === 200) {
              localStorage.setItem("userJwt", JSON.stringify(res.data.token));
              toast.success(res.data.msg);
              navigate("/");
            } else if (res.data.status === 400) {
              toast.error(res.data.msg);
            }
          });
        })
        .catch((err) => toast.error("Something went wrong!"));
    }
  }, [user]);

  return (
    <div>
      <Helmet>
        <title>Sign Up | MindEase</title>
      </Helmet>

      <div className="flex flex-col md:flex-row h-screen">
        <div className="bg-white-200 md:w-1/2 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-gray-800">MindEase</h2>
          <h4 className="text-xl text-gray-800 mb-4 font-casual">
            "Find Ease, Unlock Your Peace"
          </h4>
          <img
            src={image}
            alt="MindEase"
            className="w-96 h-96 object-contain mb-4"
          />
          <h2 className="text-2xl text-gray-800">Online Counseling Platform</h2>
        </div>
        <div className="bg-white flex flex-col justify-center items-center md:w-1/2">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Register your account here
          </h1>
          <form onSubmit={formik.handleSubmit} className="w-full max-w-sm">
            <div className="mb-4">
              <div className="w-full">
                <Input
                  label="First name"
                  name="first_name"
                  size="md"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.first_name &&
                    Boolean(formik.errors.first_name)
                  }
                  className="bg-white bg-opacity-75"
                  disabled={loading}
                />
              </div>
              <div className="text-red-600 font-mono text-[12px] lg:text-[12px]">
                {formik.touched.first_name && formik.errors.first_name
                  ? formik.errors.first_name
                  : ""}
              </div>
            </div>

            <div className="mb-4">
              <div className="w-full">
                <Input
                  label="Last name"
                  name="last_name"
                  size="md"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.last_name && Boolean(formik.errors.last_name)
                  }
                  className="bg-white bg-opacity-75"
                  disabled={loading}
                />
              </div>
              <div className="text-red-600 font-mono text-[12px] lg:text-[12px]">
                {formik.touched.last_name && formik.errors.last_name
                  ? formik.errors.last_name
                  : ""}
              </div>
            </div>

            <div className="mb-4">
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
                  disabled={loading}
                />
              </div>
              <div className="text-red-600 font-mono text-[12px] lg:text-[12px]">
                {formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ""}
              </div>
            </div>

            <div className="mb-4">
              <div className="w-full">
                <Input
                  label="Phone Number"
                  name="phone"
                  size="md"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  className="bg-white bg-opacity-75"
                  disabled={loading}
                />
              </div>
              <div className="text-red-600 font-mono text-[12px] lg:text-[12px]">
                {formik.touched.phone && formik.errors.phone
                  ? formik.errors.phone
                  : ""}
              </div>
            </div>

            <div className="mb-4">
              <div className="w-full">
                <Input
                  label="Password"
                  name="password"
                  size="md"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  className="bg-white bg-opacity-75"
                  disabled={loading}
                />
              </div>
              <div className="text-red-600 font-mono text-[12px] lg:text-[12px]">
                {formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ""}
              </div>
            </div>

            <div className="mb-4">
              <div className="w-full">
                <Input
                  label="Confirm Password"
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
                  disabled={loading}
                />
              </div>
              <div className="text-red-600 font-mono text-[12px] lg:text-[12px]">
                {formik.touched.confirm_password &&
                formik.errors.confirm_password
                  ? formik.errors.confirm_password
                  : ""}
              </div>
            </div>

            <div className="mb-4 flex justify-center">
              <Button
                type="submit" // This will trigger the form submission
                size="lg"
                variant="gradient"
                className="py-2 px-4 rounded-md hover:bg-blue-600 md:w-full"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex flex-row gap-3 items-center justify-center capitalize font-normal">
                    <span>Sending verification mail</span>
                    <Spinner className="h-5 w-5" />
                  </div>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>
          </form>

          <div className="mb-4">
            <button
              type="button"
              className="bg-white text-gray-500 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100 w-full"
              onClick={handleGoogleAuth}
            >
              <FontAwesomeIcon icon={faGoogle} className="text-blue-500 mr-2" />
              Continue with Google
            </button>
          </div>
          <div className="text-center">
            <span className="text-gray-600">Already have an account?</span>
            <button
              type="button"
              className="text-blue-500 hover:underline ml-1"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
