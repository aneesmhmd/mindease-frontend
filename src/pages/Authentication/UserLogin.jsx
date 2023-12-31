import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "react-toastify";
import isLogged from "../../Context/auth";
import jwtDecode from "jwt-decode";
import { googleAuthentication, userLogin } from "../../services/userApi";
import image from "../../images/signup.png";
import { Helmet } from "react-helmet";
import { Button, Input, Spinner } from "@material-tailwind/react";

function UserLogin() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const message = urlParams.get("message");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (message) {
      if (message.length === 13) {
        toast.error(message);
      } else {
        toast.success(message);
      }
    } else {
      toast.info("Please login to continue!");
    }
    const response = isLogged("userJwt");
    if (response && response === "user") {
      navigate("/");
    }
  }, [navigate]);

  // Google login
  const handleGoogleAuth = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      setIsLoading(true);
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
          googleAuthentication(userProfile)
            .then((res) => {
              setIsLoading(false);
              if (res.data.status === 200) {
                localStorage.setItem("userJwt", JSON.stringify(res.data.token));
                toast.success(res.data.msg);
                navigate("/");
              } else if (res.data.status === 400) {
                toast.error(res.data.msg);
              }
            })
            .catch((err) => {
              setIsLoading(false);
              toast.error("Some error occured.Please try again!");
            });
        })
        .catch((err) => toast.error("Something went wrong!"));
    }
  }, [user]);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Enter your email"),
    password: yup.string().required("Enter your password"),
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    userLogin(values)
      .then((res) => {
        const token = JSON.stringify(res.data);
        const decoded = jwtDecode(token);
        setIsLoading(false);
        if (decoded.role === "user") {
          localStorage.setItem("userJwt", token);
          toast.success("Login succesfull");
          navigate("/");
        } else {
          toast.error("Invalid user");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response.data.detail) {
          toast.error(error.response.data.detail);
        } else {
          toast.error("Some error occured.Please try again!");
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
    <div className="flex flex-col md:flex-row h-screen">
      <Helmet>
        <title>Login | MindEase</title>
      </Helmet>
      <div className="bg-white-200 md:w-1/2 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-gray-800">MindEase</h2>

        <h4 className="text-xl  text-gray-800 mb-4 font-casual">
          "Find Ease, Unlock Your Peace"
        </h4>
        <img
          src={image}
          alt="Company Logo"
          className="w-96 h-96 object-contain mb-4"
        />
        <h2 className="text-2xl text-gray-800">Online Counseling Platform</h2>
      </div>
      <div className="bg-white flex flex-col justify-center items-center md:w-1/2">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Login into your account
        </h1>

        <form onSubmit={formik.handleSubmit} className="w-full max-w-xs">
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
                disabled={isLoading}
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
          <div className="mb-4">
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="py-2 px-4 rounded-md hover:bg-blue-600 w-full"
              disabled={isLoading}
            >
              {isLoading ? <Spinner className="h-5 w-5 mx-auto" /> : "Login"}
            </Button>
          </div>
          <div className="mb-4 text-center">
            <button
              type="button"
              className="text-blue-500 hover:underline"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </button>
          </div>
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
            <span className="text-gray-600">Don't have an account?</span>
            <button
              type="button"
              className="text-blue-500 hover:underline ml-1"
              onClick={() => navigate("/register")}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
