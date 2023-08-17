import { Helmet } from "react-helmet";
import React, { useState } from "react";
import image from "../../../images/experience.png";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addCounselorExperience } from "../../../services/counselorApi";
import jwtDecode from "jwt-decode";
import { getLocal } from "../../../Context/auth";
import { useEffect } from "react";

function CounselorAddExperience() {
  const [institute, setInstitute] = useState("");
  const [location, setLocation] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [certificate, setCertificate] = useState(null);

  const [instituteErr, setInstituteErr] = useState("");
  const [locationErr, setLocationErr] = useState("");
  const [stateErr, setStateErr] = useState("");
  const [countryErr, setCountryErr] = useState("");
  const [yearErr, setYearErr] = useState("");
  const [monthErr, setMonthErr] = useState("");
  const [certErr, setCertErr] = useState("");

  const navigate = useNavigate();

  const handleAddExperience = async (e) => {
    e.preventDefault();

    const valuesRegex = /^[A-Za-z\s.-]+$/;
    const yearRegex = /^(0|[1-9][0-9]?)$/;
    const monthsRegex = /^(0?[1-9]|1[0-1])$/;

    setInstituteErr("");
    setLocationErr("");
    setStateErr("");
    setCountryErr("");
    setYearErr("");
    setMonthErr("");
    setCertErr("");

    if (!valuesRegex.test(institute)) {
      setInstituteErr("Invalid Institute Formate");
    } else if (!valuesRegex.test(location)) {
      setLocationErr("Invalid Location format");
    } else if (!valuesRegex.test(state)) {
      setStateErr("Invalid state formate");
    } else if (!valuesRegex.test(country)) {
      setCountryErr("Invalid Country format");
    } else if (year.trim() !== "" && !yearRegex.test(year)) {
      setYearErr("Invalid Year Format");
    } else if (month.trim() !== "" && !monthsRegex.test(month)) {
      setMonthErr("Invalid Month format");
    } else if (certificate === null) {
      setCertErr("Upload your certificate");
    } else if (month.trim() === "" && year.trim() === "") {
      toast.error("Either year or month is needed");
    } else {
      const token = getLocal("counselorJwt");
      const decoded = jwtDecode(token);
      const counselor = decoded.user_id;
      console.log("Counsilere id:", counselor);

      const expFormData = new FormData();
      expFormData.append("institute", institute);
      expFormData.append("location", location);
      expFormData.append("state", state);
      expFormData.append("country", country);
      expFormData.append("counselor", counselor);
      expFormData.append("certificate", certificate);
      {
        year.trim() !== "" && expFormData.append("years_of_experience", year);
      }
      {
        month.trim() !== "" &&
          expFormData.append("months_of_experience", month);
      }

      addCounselorExperience(expFormData)
        .then((res) => {
          if (res.status === 201) {
            toast.success("Experience addedd");
            navigate("/counselor/profile");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div
      className="bg-cover min-h-screen"
      style={{ backgroundImage: `url(${image})` }}
    >
      <Helmet>
        <title>Add Experience | MindEase</title>
      </Helmet>

      <div className="flex flex-row w-full h-screen">
        <div className="flex flex-col justify-center items-center align-middle text-gray-800 mt-20 w-full mx-4">
          <Card
            color="white"
            className="md:w-1/2 w-72  items-center bg-opacity-90"
            shadow={false}
          >
            <Typography
              variant="h4"
              className="text-center mt-10"
              color="blue-gray"
            >
              Add Experience
            </Typography>

            <Typography color="gray" className="text-center font-normal">
              Add your work experiences.
            </Typography>

            <form
              className="mt-4 mb-2 w-70 max-w-screen-lg md:w-96"
              onSubmit={handleAddExperience}
            >
              <div className="mb-4 flex flex-col gap-2 md:mx-0 mx-3">
                <div className="text-center">
                  <Input
                    size="lg"
                    label="Institute"
                    name="institute"
                    value={institute}
                    error={Boolean(instituteErr)}
                    onChange={(e) => setInstitute(e.target.value)}
                  />
                  {instituteErr && (
                    <span className="text-red-500 text-sm text-center rounded-lg p-2">
                      {instituteErr}
                    </span>
                  )}
                </div>

                <div className="text-center">
                  <Input
                    size="lg"
                    label="Location"
                    name="location"
                    value={location}
                    error={Boolean(locationErr)}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  {locationErr && (
                    <span className="text-red-500 text-sm text-center rounded-lg p-2">
                      {locationErr}
                    </span>
                  )}
                </div>

                <div className="text-center">
                  <Input
                    size="lg"
                    label="State"
                    name="state"
                    value={state}
                    error={Boolean(stateErr)}
                    onChange={(e) => setState(e.target.value)}
                  />
                  {stateErr && (
                    <span className="text-red-500 text-sm text-center rounded-lg p-2">
                      {stateErr}
                    </span>
                  )}
                </div>

                <div className="text-center">
                  <Input
                    size="lg"
                    label="Country"
                    name="country"
                    value={country}
                    error={Boolean(countryErr)}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  {countryErr && (
                    <span className="text-red-500 text-sm text-center rounded-lg p-2">
                      {countryErr}
                    </span>
                  )}
                </div>

                <div className="text-center">
                  <Input
                    size="lg"
                    label="Years of Experience"
                    name="year"
                    value={year}
                    error={Boolean(yearErr)}
                    onChange={(e) => setYear(e.target.value)}
                  />
                  {yearErr && (
                    <span className="text-red-500 text-sm text-center rounded-lg p-2">
                      {yearErr}
                    </span>
                  )}
                </div>

                <div className="text-center">
                  <Input
                    size="lg"
                    label="Months of Experience(If any)"
                    name="year"
                    value={month}
                    error={Boolean(monthErr)}
                    onChange={(e) => setMonth(e.target.value)}
                  />
                  {monthErr && (
                    <span className="text-red-500 text-sm text-center rounded-lg p-2">
                      {monthErr}
                    </span>
                  )}
                </div>

                <div className="text-center">
                  <Input
                    type="file"
                    size="lg"
                    label="Upload your Experience certificate"
                    name="certificate"
                    error={Boolean(certErr)}
                    onChange={(e) => setCertificate(e.target.files[0])}
                  />
                  {certErr && (
                    <span className="text-red-500 text-sm text-center rounded-lg p-2">
                      {certErr}
                    </span>
                  )}
                </div>
              </div>

              <Button className="my-6" type="submit" fullWidth>
                Add
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CounselorAddExperience;
