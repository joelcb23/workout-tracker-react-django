import api from "./api";

export const loginRequest = async (data) =>
  await api.post(`api/auth/login`, data);

export const registerRequest = async (data) =>
  await api.post(`/api/auth/register`, data);

export const logoutRequest = async () => await api.post(`/api/auth/logout`);

export const profileRequest = async () => await api.get(`/api/auth/profile`);
