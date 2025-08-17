import { AppError, ConflictError } from "../middleware/appError.js";
import shorturlModel from "../models/shorturl.model.js";

export const saveShorturl = async (url, shortUrl, userId) => {
  try {
    const newUrl = new shorturlModel({
      long_url: url,
      short_url: shortUrl,
    });

    if (userId) {
      newUrl.user = userId;
    }

    await newUrl.save();
  } catch (error) {
    if (error.code === 11000) {
      // Check specifically for duplicate key error
      throw new ConflictError("This short URL already exists");
    }
    throw new AppError("Error saving URL", 500);
  }
};

export const findShorturl = async (id) => {
  return await shorturlModel.findOneAndUpdate(
    {
      short_url: id,
    },
    { $inc: { clicks: 1 } }
  );
};

export const findCustomUrl = async (slug) => {
  return await shorturlModel.findOne({
    short_url: slug,
  });
};
