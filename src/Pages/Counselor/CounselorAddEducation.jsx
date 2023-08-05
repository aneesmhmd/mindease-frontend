import React, { useState } from 'react'
import image from '../../images/graduation.jpg'
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addCounselorEducation } from '../../Services/counselorApi';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../Context/auth'

function CounselorAddEducation() {
  const [qualification, setQualification] = useState('')
  const [university, setUcity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [year, setYear] = useState('')
  const [certificate, setCertificate] = useState('')

  const navigate = useNavigate()

  const [qualError, setQualError] = useState('')
  const [ucityError, setUcityError] = useState('')
  const [stateError, setStateError] = useState('')
  const [countryError, setCountryError] = useState('')
  const [yearError, setYearError] = useState('')
  const [certError, setCertError] = useState('')

  const handleAddEducation = async (e) => {
    e.preventDefault();

    const qualificationRegex = /^[A-Za-z\s.-]+$/;
    const universityRegex = /^[A-Za-z\s.-]+$/;
    const stateRegex = /^[A-Za-z\s.-]+$/;
    const countryRegex = /^[A-Za-z\s.-]+$/;
    const yearRegex = /^((19|20)\d{2}|(19|20)\d{2}-(19|20)\d{2})$/;

    setQualError('')
    setUcityError('')
    setStateError('')
    setCountryError('')
    setYearError('')
    setCertError('')

    if (!qualificationRegex.test(qualification)) {
      setQualError('Invalid qualification format')
    } else if (!universityRegex.test(university)) {
      setUcityError('Invalid university format')
    } else if (!stateRegex.test(state)) {
      setStateError('Invalid state format')
    } else if (!countryRegex.test(country)) {
      setCountryError('Invalid country format')
    } else if (!yearRegex.test(year)) {
      setYearError('Invalid academic year format')
    } else if (certificate === '') {
      setCertError('Upload certificate')
    } else {
      
      const token = getLocal('counselorJwt')
      const decoded = jwtDecode(token)
      const user_id = decoded.user_id

      const educationFormData = new FormData();
      educationFormData.append('qualification', qualification)
      educationFormData.append('university', university)
      educationFormData.append('state', state)
      educationFormData.append('country', country)
      educationFormData.append('year', year)
      educationFormData.append('certificate', certificate)
      educationFormData.append('counselor', user_id)


      console.log('Form data:', educationFormData);
      addCounselorEducation(educationFormData).then((res) => {
        toast.success('addedd succesfully')
        navigate('/counselor/profile')
      }).catch((err) => {
        console.log(err);
        toast.error(err.response)
      })
    }
  }


  return (
    <div className='bg-cover min-h-screen' style={{ backgroundImage: `url(${image})` }}>

      <Helmet>
        <title>
          Add Education | MindEase
        </title>
      </Helmet>

      <div className='flex flex-row w-full h-screen'>
        <div className='flex flex-col justify-center items-center align-middle text-gray-800 mt-20 w-full mx-4'>

          <Card color="white" className='w-1/2 items-center bg-opacity-90' shadow={false}>
            <Typography variant="h4" className="text-center mt-10" color="blue-gray">
              Add Education
            </Typography>

            <Typography color="gray" className="text-center font-normal">
              Add your educational qualifications.
            </Typography>

            <form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleAddEducation}>
              <div className="mb-4 flex flex-col gap-2">

                <Input
                  size="lg"
                  label="Qualification(Eg: MSc.Psychology)"
                  name='qualification'
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                />
                {qualError &&
                  <span className="text-red-900 text-sm bg-red-300 bg-opacity-40 text-center rounded-lg p-2">
                    {qualError}
                  </span>
                }

                <Input
                  size="lg"
                  label="University"
                  name='university'
                  value={university}
                  onChange={(e) => setUcity(e.target.value)}
                />
                {ucityError &&
                  <span className="text-red-900 text-sm bg-red-300 bg-opacity-40 text-center rounded-lg p-2">
                    {ucityError}
                  </span>
                }

                <Input
                  size="lg"
                  label="State"
                  name='state'
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
                {stateError &&
                  <span className="text-red-900 text-sm bg-red-300 bg-opacity-40 text-center rounded-lg p-2">
                    {stateError}
                  </span>
                }


                <Input
                  size="lg"
                  label="Country"
                  name='country'
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                {countryError &&
                  <span className="text-red-900 text-sm bg-red-300 bg-opacity-40 text-center rounded-lg p-2">
                    {countryError}
                  </span>
                }

                <Input
                  size="lg"
                  label="Academic Year"
                  name='year'
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
                {yearError &&
                  <span className="text-red-900 text-sm bg-red-300 bg-opacity-40 text-center rounded-lg p-2">
                    {yearError}
                  </span>
                }


                <Input
                  type="file"
                  size="lg"
                  label="Upload your certificate"
                  name='certificate'
                  onChange={(e) => setCertificate(e.target.files[0])}
                />
                {certError &&
                  <span className="text-red-900 text-sm bg-red-300 bg-opacity-40 text-center rounded-lg p-2">
                    {certError}
                  </span>
                }

              </div>

              {/* <Checkbox
                label={
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal"
                  >
                    I declare that all details provided here are correct.
                  </Typography>
                }
              /> */}

              <Button className="my-6" type='submit' fullWidth>
                Add
              </Button>

            </form>
          </Card>
        </div>

      </div>
    </div>
  )
}

export default CounselorAddEducation
