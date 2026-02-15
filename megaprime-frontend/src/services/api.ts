import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),
  register: (email: string, password: string) =>
    api.post("/auth/register", { email, password }),
  verifyToken: () => api.get("/auth/verify"),
};

export const contentService = {
  getContent: (sectionId: string) => api.get(`/content/${sectionId}`),
  getAllContent: () => api.get("/content"),
  updateContent: (sectionId: string, data: any) =>
    api.put(`/content/${sectionId}`, data),
  createInitialContent: () => api.post("/content/init"),
};

export const contactService = {
  submitContact: (data: any) => api.post("/contact", data),
};

export default api;
