import api from "./api";

// Get all posts with pagination, category, search
export const getPosts = async ({ page = 1, limit = 6, category, search }) => {
  const params = { page, limit };
  if (category) params.category = category;
  if (search) params.search = search;

  const res = await api.get("/api/v1/blogs", { params });
  return res.data;
};   