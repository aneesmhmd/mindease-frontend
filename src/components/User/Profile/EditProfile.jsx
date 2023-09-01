import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { updateUserProfile } from "../../../services/userApi";
import { toast } from "react-toastify";

export default function EditProfile({ profile, getProfile }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [values, setValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setValues({ ...profile });
  }, [profile]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    // Regex patterns for validation
    const firstNameRegex = /^[a-zA-Z]{4,}$/;
    const lastNameRegex = /^[a-zA-Z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,12}$/;

    if (!values.first_name || !firstNameRegex.test(values.first_name)) {
      toast.error(
        "First name must be at least four characters long and contain only letters"
      );
    } else if (values.last_name && !lastNameRegex.test(values.last_name)) {
      toast.error("Last name should contain only letters");
    } else if (!values.email || !emailRegex.test(values.email)) {
      toast.error("Invalid email");
    } else if (!values.phone || !phoneRegex.test(values.phone)) {
      toast.error("Invalid phone number");
    } else {
      const updatedProfile = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone: values.phone,
      };

      setIsLoading(true);
      updateUserProfile(updatedProfile, profile.id)
        .then((res) => {
          getProfile();
          handleOpen();
          setIsLoading(false);
          toast.success("Profile updated");
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.response.data.email) {
            toast.error(error.response.data.email[0]);
          } else toast.error("Some error occured. Please try again!");
          console.log(error);
        });
    }
  };

  return (
    <>
      <button
        className="bg-dark-purple md:w-36 w-1/2 rounded text-sm mt-2 mb-4 py-1 text-white"
        onClick={handleOpen}
      >
        Edit Profile
      </button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem] text-center">
          <form onSubmit={handleUpdateProfile}>
            <CardBody className="flex flex-col gap-4">
              <Typography
                as="a"
                className="text-lg text-black font-serif font-semibold"
              >
                Edit Profile
              </Typography>

              <Input
                label="First name"
                size="lg"
                value={values.first_name}
                name="first_name"
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />

              <Input
                label="Last name"
                size="lg"
                value={values.last_name}
                name="last_name"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />

              <Input
                label="Email"
                size="lg"
                value={values.email}
                name="email"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />

              <Input
                label="Phone Number"
                size="lg"
                value={values.phone}
                name="phone"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                variant="gradient"
                color="blue-gray"
                type="submit"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner className="h-4 w-4 mx-auto" />
                ) : (
                  "Apply Changes"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </>
  );
}
