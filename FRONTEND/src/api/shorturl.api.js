import axiosInstance from "../utils/axiosInstance";

export const getShorturl = async (url) => {
  const { data } = await axiosInstance.post("/api/create", {
    url,
  });
  return data.shortUrl;
};

export const getCustomShorturl = async (url, slug) => {
  const { data } = await axiosInstance.post("/api/create/custom", {
    url,
    slug,
  });
  return data.shortUrl;
};
