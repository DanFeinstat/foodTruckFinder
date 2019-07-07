import axios from "axios";
export default {
  signUp: userData => {
    return axios.post(`/api/owner/signup`, userData);
  },
  logIn: userData => {
    return axios.post(`/api/owner/login`, userData);
  },
  updateDescription: (userData, authToken) => {
    return axios.put(`/api/owner/description`, userData, {
      headers: { "x-access-token": authToken },
    });
  },
  updateLocation: (userData, authToken) => {
    return axios.put(`/api/owner/newlocation`, userData, {
      headers: { "x-access-token": authToken },
    });
  },
  getUser: (id, authToken) => {
    return axios.get(`/api/owner/userdata/${id}`, {
      headers: { "x-access-token": authToken },
    });
  },

  setActive: (userData, authToken) => {
    return axios.put(`/api/owner/active`, userData, {
      headers: { "x-access-token": authToken },
    });
  },
  setInactive: (userData, authToken) => {
    return axios.put(`/api/owner/inactive`, userData, {
      headers: { "x-access-token": authToken },
    });
  },
};
