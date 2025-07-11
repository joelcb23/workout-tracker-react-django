import api from "./api";

export const loginRequest = async (data) => await api.post(`/auth/login`, data);

export const registerRequest = async (data) =>
  await api.post(`/auth/register`, data);

export const logoutRequest = async () => await api.post(`/auth/logout`);

export const profileRequest = async () => await api.get(`/auth/profile`);

export const refreshRequest = async () =>
  await api.post(`/auth/token/refresh`, null, {
    withCredentials: true,
  });
