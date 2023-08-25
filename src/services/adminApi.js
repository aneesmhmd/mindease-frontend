import { adminAxiosInstance } from "../utils/axiosUtils";

const adminLogin = (values) => {
  return adminAxiosInstance.post("/login/", values, {
    withCredentials: true,
  });
};

const isAdminAuth = (id) => {
  return adminAxiosInstance.get(`/is-admin-auth/${id}/`, {
    withCredentials: true,
  });
};

const adminDashboard = () => {
  return adminAxiosInstance.get(`dashboard-view/`, {
    withCredentials: true,
  });
};

const adminGetProfile = (id) => {
  return adminAxiosInstance.get(`get-admin-profile/${id}`, {
    withCredentials: true,
  });
};

const adminUpdateProfile = (id, values) => {
  return adminAxiosInstance.patch(`update-profile/${id}/`, values, {
    withCredentials: true,
  });
};

const adminUpdateProfilePic = (id, image) => {
  return adminAxiosInstance.patch(`update-profile-picture/${id}/`, image, {
    withCredentials: true,
  });
};

const adminChangePassword = (id, values) => {
  return adminAxiosInstance.post(`change-password/${id}/`, values, {
    withCredentials: true,
  });
};

const adminUserDetails = () => {
  return adminAxiosInstance.get("/list-users/", {
    withCredentials: true,
  });
};

const adminManageUser = (id) => {
  return adminAxiosInstance.patch(`/manage-user/${id}/`, {
    withCredentials: true,
  });
};

const addCounselor = (values) => {
  return adminAxiosInstance.post("/add-counselor/", values, {
    withCredentials: true,
  });
};

const adminCounselorDetails = () => {
  return adminAxiosInstance.get("/list-counselors/", {
    withCredentials: true,
  });
};

const adminManageCounselor = (id) => {
  return adminAxiosInstance.patch(`/manage-counselor/${id}/`, {
    withCredentials: true,
  });
};

const adminListServices = () => {
  return adminAxiosInstance.get("/list-services", {
    withCredentials: true,
  });
};

const adminAddService = (values) => {
  return adminAxiosInstance.post("/add-services/", values, {
    withCredentials: true,
  });
};

const adminUpdateService = (id, updatedData) => {
  return adminAxiosInstance.patch(`/update-service/${id}/`, updatedData, {
    withCredentials: true,
  });
};

const adminManageService = (id) => {
  return adminAxiosInstance.patch(`/manage-service/${id}/`, {
    withCredentials: true,
  });
};

const adminDeleteService = (id) => {
  return adminAxiosInstance.delete(`/delete-service/${id}/`, {
    withCredentials: true,
  });
};

const adminListEducationReqs = () => {
  return adminAxiosInstance.get(`/list-education-request/`, {
    withCredentials: true,
  });
};

const adminListExperienceReqs = () => {
  return adminAxiosInstance.get(`list-experience-request/`, {
    withCredentials: true,
  });
};

const adminGetEducationDetails = (id) => {
  return adminAxiosInstance.get(`get-education-details/${id}/`, {
    withCredentials: true,
  });
};

const adminGetExperienceDetails = (id) => {
  return adminAxiosInstance.get(`get-experience-details/${id}/`, {
    withCredentials: true,
  });
};

const adminVerifyEducationReqs = (id) => {
  return adminAxiosInstance.patch(`verify-education-request/${id}/`, {
    withCredentials: true,
  });
};

const adminVerifyExperienceReqs = (id) => {
  return adminAxiosInstance.patch(`verify-experience-request/${id}/`, {
    withCredentials: true,
  });
};

const adminDeclineEducationReqs = (id) => {
  return adminAxiosInstance.delete(`decline-education-request/${id}/`, {
    withCredentials: true,
  });
};

const adminDeclineExperienceReqs = (id) => {
  return adminAxiosInstance.delete(`decline-experience-request/${id}/`, {
    withCredentials: true,
  });
};

const adminListPsychologicalTasks = () => {
  return adminAxiosInstance.get(`list-psychological-tasks/`, {
    withCredentials: true,
  });
};

const adminGetTaskDetails = (id) => {
  return adminAxiosInstance.get(`get-psychological-task/${id}/`, {
    withCredentials: true,
  });
};

const adminGetTaskItems = (id) => {
  return adminAxiosInstance.get(`get-task-items/${id}/`, {
    withCredentials: true,
  });
};

const adminAddPsychologicalTasks = (values) => {
  return adminAxiosInstance.post(`add-psychological-tasks/`, values, {
    withCredentials: true,
  });
};

const adminAddTaskItem = (id, values) => {
  console.log("api details", id);
  return adminAxiosInstance.post(`add-task-items/${id}/`, values, {
    withCredentials: true,
  });
};

const adminUpdatePsyhcologicalTasks = (id, values) => {
  return adminAxiosInstance.patch(`update-psychological-tasks/${id}/`, values, {
    withCredentials: true,
  });
};

const adminUpdateTaskItems = (id, values) => {
  return adminAxiosInstance.patch(`update-task-items/${id}/`, values, {
    withCredentials: true,
  });
};

const adminManagePsychologicalTasks = (id) => {
  return adminAxiosInstance.patch(`manage-psychological-task/${id}/`, {
    withCredentials: true,
  });
};

const adminDeletePsychologicalTask = (id) => {
  return adminAxiosInstance.delete(`delete-psychological-tasks/${id}/`, {
    withCredentials: true,
  });
};

const adminDeleteTaskItems = (id) => {
  return adminAxiosInstance.delete(`delete-task-items/${id}/`, {
    withCredentials: true,
  });
};

const adminListTaskSubscriptions = () => {
  return adminAxiosInstance.get(`list-task-subscriptions/`, {
    withCredentials: true,
  });
};

const adminListCallbackReqs = () => {
  return adminAxiosInstance.get(`/list-callback-reqs/`, {
    withCredentials: true,
  });
};

const adminUpdateCallBackReqs = (id) => {
  return adminAxiosInstance.patch(`/update-callback-reqs/${id}/`, {
    withCredentials: true,
  });
};

const adminListAppointments = () => {
  return adminAxiosInstance.get(`list-all-appointments/`, {
    withCredentials: true,
  });
};

export {
  adminLogin,
  isAdminAuth,
  adminDashboard,
  addCounselor,
  adminUserDetails,
  adminManageUser,
  adminCounselorDetails,
  adminManageCounselor,
  adminListServices,
  adminAddService,
  adminUpdateService,
  adminManageService,
  adminDeleteService,
  adminListEducationReqs,
  adminListExperienceReqs,
  adminVerifyEducationReqs,
  adminVerifyExperienceReqs,
  adminGetEducationDetails,
  adminGetExperienceDetails,
  adminDeclineEducationReqs,
  adminDeclineExperienceReqs,
  adminListPsychologicalTasks,
  adminAddPsychologicalTasks,
  adminAddTaskItem,
  adminDeletePsychologicalTask,
  adminManagePsychologicalTasks,
  adminUpdatePsyhcologicalTasks,
  adminGetTaskDetails,
  adminGetTaskItems,
  adminUpdateTaskItems,
  adminDeleteTaskItems,
  adminListTaskSubscriptions,
  adminGetProfile,
  adminUpdateProfile,
  adminUpdateProfilePic,
  adminChangePassword,
  adminListCallbackReqs,
  adminUpdateCallBackReqs,
  adminListAppointments,
};
