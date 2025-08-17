import { generateNanoId } from "../utils/helper.js";
import { saveShorturl, findCustomUrl } from "../dao/shorturl.js";
import { AppError, ConflictError } from "../middleware/appError.js";

export const getWithoutUserShorturlService = async (url) => {
  try {
    if (!url) {
      throw new AppError("URL is required", 400);
    }

    const shortUrl = generateNanoId(6);

    try {
      await saveShorturl(url, shortUrl);
      return shortUrl;
    } catch (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

export const getWithUserShorturlService = async (url, userId, slug = null) => {
  try {
    // if (!url || !userId) {
    //   throw new AppError("URL and User ID are required", 400);
    // }

    const exists = await findCustomUrl(slug);
    if (exists) {
      throw new ConflictError("Custom URL already exists");
    }

    const shortUrl = slug || generateNanoId(6);

    await saveShorturl(url, shortUrl, userId);

    return shortUrl;
  } catch (error) {
    if (!(error instanceof AppError)) {
      throw new AppError(
        error.message || "Unexpected error in the Service",
        500
      );
    }
    throw error;
  }
};
