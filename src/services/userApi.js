import { userAxiosInstance } from "../utils/axiosUtils";

const userSignup = (values) => {
  return userAxiosInstance.post("/api/register/", values, {
    withCredentials: true,
  });
};

const userLogin = (values) => {
  return userAxiosInstance.post("/api/token/", values, {
    withCredentials: true,
  });
};

const googleAuthentication = (value) => {
  const values = {
    email: value.email,
    first_name: value.given_name,
    last_name: value.family_name,
    password: value.id,
    is_google: true,
  };
  return userAxiosInstance.post("/api/google_authentication/", values, {
    withCredentials: true,
  });
};

const isUserAuth = (token) => {
  return userAxiosInstance.get(`/api/is-user-auth/`, token, {
    withCredentials: true,
  });
};

const getAllServices = () => {
  return userAxiosInstance.get("/user/services-list", {
    withCredentials: true,
  });
};

const listCounselors = () => {
  return userAxiosInstance.get(`/user/counselors-list/`, {
    withCredentials: true,
  });
};

const getCounselorProfile = (id) => {
  return userAxiosInstance.get(`/user/get-counselor-profile/${id}`, {
    withCredentials: true,
  });
};

const getCounselorEducation = (id) => {
  return userAxiosInstance.get(`/user/get-counselor-education/${id}/`, {
    withCredentials: true,
  });
};

const getCounselorExperience = (id) => {
  return userAxiosInstance.get(`/user/get-counselor-experience/${id}/`, {
    withCredentials: true,
  });
};

const listPsychologicalTasks = () => {
  return userAxiosInstance.get(`/user/list-psychological-tasks/`, {
    withCredentials: true,
  });
};

const getPsychologicalTaskDetails = (id) => {
  return userAxiosInstance.get(`/user/get-psychological-task/${id}/`, {
    withCredentials: true,
  });
};

const createCheckoutSession = (values) => {
  return userAxiosInstance.post(
    `user/task-subscription-checkout-session/`,
    values,
    { withCredentials: true }
  );
};

const createTaskSubscription = (values) => {
  return userAxiosInstance.post(`user/create-task-subscription/`, values, {
    withCredentials: true,
  });
};

const getUserProfile = (user_id) => {
  return userAxiosInstance.get(`/api/user-profile/${user_id}/`, {
    withCredentials: true,
  });
};

const updateUserProfile = (values, id) => {
  return userAxiosInstance.put(`/api/update-profile/${id}/`, values, {
    withCredentials: true,
  });
};

const updateUserImage = (id, image) => {
  return userAxiosInstance.patch(`/api/update-profile-photo/${id}/`, image, {
    withCredentials: true,
  });
};

const removeUserImage = (id) => {
  return userAxiosInstance.delete(`/api/remove-profile-photo/${id}/`, {
    withCredentials: true,
  });
};

const changeUserPassword = (values, id) => {
  return userAxiosInstance.post(`/api/change-password/${id}/`, values, {
    withCredentials: true,
  });
};

const addCallBackReqs = (values) => {
  return userAxiosInstance.post(`/user/add-callback-reqs/`, values, {
    withCredentials: true,
  });
};

export {
  googleAuthentication,
  getAllServices,
  userLogin,
  userSignup,
  isUserAuth,
  getUserProfile,
  changeUserPassword,
  updateUserProfile,
  removeUserImage,
  updateUserImage,
  listCounselors,
  listPsychologicalTasks,
  getPsychologicalTaskDetails,
  createCheckoutSession,
  createTaskSubscription,
  getCounselorProfile,
  getCounselorEducation,
  getCounselorExperience,
  addCallBackReqs,
};
