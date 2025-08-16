import {
  getWithoutUserShorturlService,
  getWithUserShorturlService,
} from "../services/shorturl.service.js";
import { findShorturl } from "../dao/shorturl.js";

export const createShorturl = async (req, res, next) => {
  try {
    const data = req.body;
    let shorturl = "";
    console.log(req.user);

    if (req.user) {
      shorturl = await getWithUserShorturlService(
        data.url,
        req.user._id,
        data.slug
      );
    } else {
      shorturl = await getWithoutUserShorturlService(data.url);
    }

    // res.status(403).send("Not allowed");

    res.status(200).json({ shortUrl: process.env.APP_URL + shorturl });
  } catch (error) {
    next(error);
  }
};

export const createCustomShorturl = async (req, res, next) => {
  try {
    const { url, slug } = req.body;
    const user = req.user._id;
    console.log("this", user);

    const shorturl = await getWithUserShorturlService(url, user, slug);

    res.status(200).json({ shortUrl: process.env.APP_URL + shorturl });
  } catch (error) {
    next(error);
  }
};

export const redirectFromShorturl = async (req, res) => {
  const { id } = req.params;

  console.log("id:", id);

  try {
    const url = await findShorturl(id);

    console.log(url);

    res.redirect("http://" + url.long_url);
  } catch (err) {
    res.send("Error occured");
  }
};
