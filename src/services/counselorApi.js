import { counselorAxiosInstance } from "../utils/axiosUtils";

const counselorLogin = (values) => {
  return counselorAxiosInstance.post("/login/", values, {
    withCredentials: true,
  });
};

const getCounselorProfile = (id) => {
  return counselorAxiosInstance.get(`/counselor-profile/${id}/`, {
    withCredentials: true,
  });
};

const updateCounselorProfile = (id, values) => {
  return counselorAxiosInstance.patch(`/update-profile/${id}/`, values, {
    withCredentials: true,
  });
};

const updateCounselorImage = (id, image) => {
  return counselorAxiosInstance.put(`/update-profile-image/${id}/`, image, {
    withCredentials: true,
  });
};

const removeCounselorImage = (id) => {
  return counselorAxiosInstance.delete(`/remove-profile-image/${id}/`, {
    withCredentials: true,
  });
};

const addCounselorEducation = (values) => {
  console.log("Educational details:", values);
  return counselorAxiosInstance.post(`/add-education/`, values, {
    withCredentials: true,
  });
};

const getCounselorEducation = (id) => {
  return counselorAxiosInstance.get(`/get-education/${id}/`, {
    withCredentials: true,
  });
};

const addCounselorExperience = (values) => {
  console.log("Experience details:", values);
  return counselorAxiosInstance.post(`/add-experience/`, values, {
    withCredentials: true,
  });
};

const getCounselorExperience = (id) => {
  return counselorAxiosInstance.get(`/get-experience/${id}/`, {
    withCredentials: true,
  });
};

const changeCounselorPassword = (values, id) => {
  return counselorAxiosInstance.post(`/change-password/${id}/`, values, {
    withCredentials: true,
  });
};

const listCounselorServices = () => {
  return counselorAxiosInstance.get(`list-services/`, {
    withCredentials: true,
  });
};

const getCounselorAccount = (id) => {
  return counselorAxiosInstance.get(`get-counselor-account/${id}/`, {
    withCredentials: true,
  });
};

const updateCounselorAccount = (id, values) => {
  return counselorAxiosInstance.patch(
    `update-counselor-account/${id}/`,
    values,
    { withCredentials: true }
  );
};

// const isCounselorAuth = (values) =>{
//     return counselorAxiosInstance.post('/')
// }

export {
  counselorLogin,
  changeCounselorPassword,
  getCounselorProfile,
  addCounselorEducation,
  addCounselorExperience,
  getCounselorEducation,
  getCounselorExperience,
  updateCounselorImage,
  removeCounselorImage,
  updateCounselorProfile,
  listCounselorServices,
  getCounselorAccount,
  updateCounselorAccount,
};
